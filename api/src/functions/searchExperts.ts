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

export async function searchExperts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const query = request.query.get('q') || '';

    if (!query) {
        return {
            status: 400,
            jsonBody: { error: 'Query parameter "q" is required' }
        };
    }

    try {
        const client = getCosmosClient();
        const database = client.database(databaseName);
        const container = database.container(containerName);

        const searchQuery = query.toLowerCase();
        const { resources: experts } = await container.items
            .query({
                query: `SELECT * FROM c WHERE 
                    CONTAINS(LOWER(c.name), @search) OR 
                    CONTAINS(LOWER(c.title), @search) OR 
                    CONTAINS(LOWER(c.department), @search) OR
                    ARRAY_CONTAINS(c.skills, @search, true)`,
                parameters: [{ name: "@search", value: searchQuery }]
            })
            .fetchAll();

        return {
            status: 200,
            jsonBody: { 
                query,
                experts 
            }
        };
    } catch (error) {
        context.log(`Error searching experts: ${error}`);
        return {
            status: 500,
            jsonBody: { error: "Failed to search experts" }
        };
    }
}

app.http('searchExperts', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: searchExperts
});
