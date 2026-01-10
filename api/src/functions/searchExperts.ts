import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function searchExperts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const query = request.query.get('q') || '';

    if (!query) {
        return {
            status: 400,
            jsonBody: { error: 'Query parameter "q" is required' }
        };
    }

    // TODO: Implement Cosmos DB search
    // For now, return empty results
    return {
        status: 200,
        jsonBody: { 
            query,
            experts: [] 
        }
    };
}

app.http('searchExperts', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: searchExperts
});
