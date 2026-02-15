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
    endorsements: { "Crisis Intervention": 24, "Trauma-Informed Care": 18, "Spanish Language": 15, "Case Management": 12 },
    requestCount: 47,
    highlights: [
      "Bilingual (English/Spanish) — can assist with Spanish-speaking client programs",
      "Developed the affiliate's crisis response playbook now used across 3 regions",
      "Available for same-day consultations on urgent crisis situations"
    ],
    availability: "Mon–Fri, 8am–5pm PST",
    responseTime: "< 4 hrs",
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
    endorsements: { "Grant Writing": 31, "Federal Funding": 22, "Budget Planning": 14, "Microsoft Excel": 8 },
    requestCount: 63,
    highlights: [
      "Over $5M in grants secured — happy to review your proposals before submission",
      "Can walk you through the full federal grant lifecycle from LOI to close-out",
      "Maintains a template library of successful grant narratives you can reference"
    ],
    availability: "Mon–Thu, 9am–6pm EST",
    responseTime: "< 24 hrs",
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
    endorsements: { "HUD Regulations": 19, "Affordable Housing": 16, "Client Advocacy": 11, "Conflict Resolution": 7 },
    requestCount: 34,
    highlights: [
      "Deep knowledge of HUD compliance — can help you avoid common audit findings",
      "Led the transition to Housing First model across 4 LA properties",
      "Monthly office hours open to all affiliates for housing-related questions"
    ],
    availability: "Tue–Fri, 8am–4pm PST",
    responseTime: "< 8 hrs",
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
    endorsements: { "Volunteer Management": 15, "Event Planning": 12, "Training Development": 10, "Social Media": 6 },
    requestCount: 28,
    highlights: [
      "Built a 500+ volunteer network from scratch — can share recruitment playbook",
      "Created a volunteer training toolkit that reduced onboarding time by 40%",
      "Experienced with large-scale events (1,000+ attendees)"
    ],
    availability: "Mon–Fri, flexible hours CST",
    responseTime: "< 6 hrs",
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
    endorsements: { "Mental Health Counseling": 27, "Substance Abuse": 21, "Crisis Assessment": 16, "Family Therapy": 13 },
    requestCount: 52,
    highlights: [
      "LCSW with 12+ years of clinical experience in substance abuse recovery",
      "Can provide peer consultation on complex client cases (anonymized)",
      "Developed a family therapy framework adopted by 5 VOA affiliates"
    ],
    availability: "Mon–Wed, 9am–5pm CST",
    responseTime: "< 12 hrs",
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
    endorsements: { "Youth Development": 20, "Gang Prevention": 14, "Mentoring Programs": 12, "Educational Support": 9 },
    requestCount: 31,
    highlights: [
      "Reduced program dropout rate by 60% through innovative mentoring model",
      "Can connect you with a network of youth program directors across the Southeast",
      "Experienced with evidence-based gang prevention curricula (GREAT, CeaseFire)"
    ],
    availability: "Mon–Fri, 8am–4pm EST",
    responseTime: "< 24 hrs",
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
