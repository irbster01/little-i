import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const connectionString = process.env.COSMOS_CONNECTION_STRING || "";
const databaseName = process.env.COSMOS_DATABASE_NAME || "ExpertiseMarketplace";
const nominationsContainerName = "Nominations";

let cosmosClient: CosmosClient | null = null;

function getCosmosClient(): CosmosClient {
    if (!cosmosClient && connectionString) {
        cosmosClient = new CosmosClient(connectionString);
    }
    return cosmosClient!;
}

interface NominatedExpert {
    id: string;
    name: string;
    title: string;
    department: string;
    email: string;
}

interface NominationRequest {
    experts: NominatedExpert[];
    submittedBy?: string;
    notes?: string;
}

export async function submitNominations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed nomination submission for url "${request.url}"`);

    try {
        const body = await request.json() as NominationRequest;
        
        if (!body.experts || body.experts.length === 0) {
            return {
                status: 400,
                jsonBody: { error: "No experts provided for nomination" }
            };
        }

        const client = getCosmosClient();
        const database = client.database(databaseName);
        
        // Create container if it doesn't exist
        const { container } = await database.containers.createIfNotExists({
            id: nominationsContainerName,
            partitionKey: { paths: ["/id"] }
        });

        // Create nomination record
        const nomination = {
            id: `nom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            experts: body.experts,
            submittedBy: body.submittedBy || "anonymous",
            notes: body.notes || "",
            submittedAt: new Date().toISOString(),
            status: "pending"
        };

        await container.items.create(nomination);

        context.log(`Successfully created nomination ${nomination.id} with ${body.experts.length} experts`);

        return {
            status: 201,
            jsonBody: { 
                success: true,
                nominationId: nomination.id,
                message: `Successfully submitted ${body.experts.length} nomination(s)`
            }
        };
    } catch (error) {
        context.log(`Error submitting nominations: ${error}`);
        return {
            status: 500,
            jsonBody: { error: "Failed to submit nominations" }
        };
    }
}

app.http('submitNominations', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: submitNominations
});
