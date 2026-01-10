import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function getExperts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // TODO: Replace with Microsoft Lists/Graph API query
    // For now, return mock data
    const experts = [
        {
            id: '1',
            name: 'Sarah Johnson',
            title: 'Community Outreach Coordinator',
            department: 'Community Programs',
            skills: ['Crisis Intervention', 'Case Management', 'Trauma-Informed Care', 'Spanish Language'],
            email: 'sarah.johnson@voa.gov',
        },
        {
            id: '2',
            name: 'Michael Chen',
            title: 'Grant Writer',
            department: 'Development',
            skills: ['Grant Writing', 'Federal Funding', 'Budget Planning', 'Microsoft Excel'],
            email: 'michael.chen@voa.gov',
        },
    ];

    return {
        status: 200,
        jsonBody: { experts }
    };
}

app.http('getExperts', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getExperts
});
