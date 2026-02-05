import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const connectionString = process.env.COSMOS_CONNECTION_STRING || "";
const databaseName = process.env.COSMOS_DATABASE_NAME || "ExpertiseMarketplace";
const containerName = process.env.COSMOS_CONTAINER_NAME || "Experts";

let cosmosClient: CosmosClient | null = null;

function getCosmosClient(): CosmosClient {
    if (!cosmosClient && connectionString) {
        cosmosClient = new CosmosClient(connectionString);
    }
    return cosmosClient!;
}

export async function getExperts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const client = getCosmosClient();
        const database = client.database(databaseName);
        const container = database.container(containerName);

        const { resources: experts } = await container.items
            .query("SELECT * FROM c")
            .fetchAll();

        return {
            status: 200,
            jsonBody: { experts }
        };
    } catch (error) {
        context.log(`Error fetching experts: ${error}`);
        return {
            status: 500,
            jsonBody: { error: "Failed to fetch experts" }
        };
    }
}

app.http('getExperts', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getExperts
});
