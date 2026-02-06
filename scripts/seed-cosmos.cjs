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
    bio: "Leads community crisis response initiatives and coordinates trauma-informed care programs. Specializes in bilingual outreach to underserved Spanish-speaking communities.",
    flair: ["responsive", "frequently-requested"],
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Grant Writer",
    department: "Development",
    affiliate: "VOA Greater New York",
    skills: ["Grant Writing", "Federal Funding", "Budget Planning", "Microsoft Excel"],
    email: "michael.chen@voa.org",
    bio: "Secures federal and foundation funding for social service programs. Has successfully obtained over $5M in grants for housing and workforce development initiatives.",
    flair: ["top-contributor", "mentor"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Housing Services Manager",
    department: "Housing & Shelter",
    affiliate: "VOA Los Angeles",
    skills: ["Affordable Housing", "HUD Regulations", "Client Advocacy", "Conflict Resolution"],
    email: "emily.rodriguez@voa.org",
    bio: "Manages affordable housing programs and ensures HUD compliance across multiple properties. Expert in navigating complex housing regulations to help clients find stable housing.",
    flair: ["thought-leader"],
  },
  {
    id: "4",
    name: "David Kim",
    title: "Volunteer Coordinator",
    department: "Volunteer Services",
    affiliate: "VOA Texas",
    skills: ["Volunteer Management", "Training Development", "Event Planning", "Social Media"],
    email: "david.kim@voa.org",
    bio: "Recruits, trains, and manages a network of 500+ volunteers across Texas. Creates engaging training programs and coordinates large-scale community service events.",
    flair: ["rising-star", "responsive"],
  },
  {
    id: "5",
    name: "Patricia Williams",
    title: "Licensed Clinical Social Worker",
    department: "Mental Health Services",
    affiliate: "VOA Minnesota",
    skills: ["Mental Health Counseling", "Substance Abuse", "Family Therapy", "Crisis Assessment"],
    email: "patricia.williams@voa.org",
    bio: "Provides clinical mental health services specializing in substance abuse recovery and family therapy. Conducts crisis assessments and develops treatment plans for at-risk populations.",
    flair: ["mentor", "frequently-requested"],
  },
  {
    id: "6",
    name: "James Martinez",
    title: "Youth Programs Director",
    department: "Youth Services",
    affiliate: "VOA Florida",
    skills: ["Youth Development", "Mentoring Programs", "Educational Support", "Gang Prevention"],
    email: "james.martinez@voa.org",
    bio: "Directs youth development programs focused on education and gang prevention. Builds mentoring relationships that help at-risk teens stay in school and pursue positive futures.",
    flair: ["top-contributor"],
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
