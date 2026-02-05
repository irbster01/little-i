const { CosmosClient } = require("@azure/cosmos");

const connectionString = process.env.COSMOS_CONNECTION_STRING || process.argv[2];

if (!connectionString) {
  console.error("Please provide COSMOS_CONNECTION_STRING environment variable or pass as argument");
  process.exit(1);
}

const client = new CosmosClient(connectionString);
const database = client.database("ExpertiseMarketplace");
const container = database.container("Experts");

const mockExperts = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Community Outreach Coordinator",
    department: "Community Programs",
    affiliate: "VOA Northern California & Northern Nevada",
    skills: ["Crisis Intervention", "Case Management", "Trauma-Informed Care", "Spanish Language"],
    email: "sarah.johnson@voa.org",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Grant Writer",
    department: "Development",
    affiliate: "VOA Greater New York",
    skills: ["Grant Writing", "Federal Funding", "Budget Planning", "Microsoft Excel"],
    email: "michael.chen@voa.org",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Housing Services Manager",
    department: "Housing & Shelter",
    affiliate: "VOA Los Angeles",
    skills: ["Affordable Housing", "HUD Regulations", "Client Advocacy", "Conflict Resolution"],
    email: "emily.rodriguez@voa.org",
  },
  {
    id: "4",
    name: "David Kim",
    title: "Volunteer Coordinator",
    department: "Volunteer Services",
    affiliate: "VOA Texas",
    skills: ["Volunteer Management", "Training Development", "Event Planning", "Social Media"],
    email: "david.kim@voa.org",
  },
  {
    id: "5",
    name: "Patricia Williams",
    title: "Licensed Clinical Social Worker",
    department: "Mental Health Services",
    affiliate: "VOA Minnesota",
    skills: ["Mental Health Counseling", "Substance Abuse", "Family Therapy", "Crisis Assessment"],
    email: "patricia.williams@voa.org",
  },
  {
    id: "6",
    name: "James Martinez",
    title: "Youth Programs Director",
    department: "Youth Services",
    affiliate: "VOA Florida",
    skills: ["Youth Development", "Mentoring Programs", "Educational Support", "Gang Prevention"],
    email: "james.martinez@voa.org",
  },
];

async function seed() {
  console.log("Seeding Cosmos DB with mock experts...\n");
  
  for (const expert of mockExperts) {
    try {
      const { resource } = await container.items.upsert(expert);
      console.log(`  Created: ${resource.name}`);
    } catch (error) {
      console.error(`  Failed to create ${expert.name}: ${error.message}`);
    }
  }
  
  console.log("\nSeeding complete!");
}

seed().catch(console.error);
