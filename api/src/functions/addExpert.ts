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

interface NewExpert {
    name: string;
    email: string;
    title: string;
    department: string;
    affiliate: string;
    skills: string[];
    bio?: string;
}

export async function addExpert(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed add expert request for url "${request.url}"`);

    try {
        const body = await request.json() as NewExpert;
        
        // Validate required fields
        if (!body.name || !body.email || !body.title || !body.department || !body.affiliate) {
            return {
                status: 400,
                jsonBody: { error: "Missing required fields: name, email, title, department, affiliate" }
            };
        }

        if (!body.skills || body.skills.length === 0) {
            return {
                status: 400,
                jsonBody: { error: "At least one skill is required" }
            };
        }

        const client = getCosmosClient();
        const database = client.database(databaseName);
        const container = database.container(containerName);

        // Check if expert with this email already exists
        const querySpec = {
            query: "SELECT * FROM c WHERE c.email = @email",
            parameters: [{ name: "@email", value: body.email }]
        };
        const { resources: existing } = await container.items.query(querySpec).fetchAll();
        
        if (existing.length > 0) {
            return {
                status: 409,
                jsonBody: { error: "An expert with this email already exists" }
            };
        }

        // Create new expert record
        const expert = {
            id: `expert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: body.name,
            email: body.email,
            title: body.title,
            department: body.department,
            affiliate: body.affiliate,
            skills: body.skills,
            bio: body.bio || `${body.name} is a ${body.title} in ${body.department} at ${body.affiliate}.`,
            createdAt: new Date().toISOString(),
            status: "active"
        };

        await container.items.create(expert);

        context.log(`Successfully added expert ${expert.id}: ${expert.name}`);

        return {
            status: 201,
            jsonBody: { 
                success: true,
                expertId: expert.id,
                message: `Successfully added ${expert.name} to the expert directory`
            }
        };
    } catch (error) {
        context.log(`Error adding expert: ${error}`);
        return {
            status: 500,
            jsonBody: { error: "Failed to add expert" }
        };
    }
}

app.http('addExpert', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: addExpert
});
