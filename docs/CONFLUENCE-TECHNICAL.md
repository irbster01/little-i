# Expertise Marketplace - Technical Documentation

**Document Type:** Technical Architecture & Implementation Guide  
**Audience:** Developers, DevOps Engineers, Solution Architects  
**Last Updated:** January 29, 2026  
**Status:** Active Development

---

## Overview

The Expertise Marketplace is a full-stack web application that enables employees to discover colleagues based on their skills and expertise. The system is built on Microsoft Azure's serverless architecture, providing scalability, security, and cost efficiency.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Azure Static Web Apps                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────┐    ┌──────────────────────┐                   │
│  │   React Frontend     │    │   Azure Functions    │                   │
│  │   (Vite + TypeScript)│◄──►│   (Node.js API)      │                   │
│  └──────────────────────┘    └──────────┬───────────┘                   │
│                                          │                               │
└──────────────────────────────────────────┼───────────────────────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
         ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
         │  Microsoft       │   │  Azure Cosmos DB │   │  Microsoft       │
         │  Entra ID        │   │  (NoSQL Data)    │   │  Graph API       │
         │  (Auth)          │   │                  │   │  (User Profiles) │
         └──────────────────┘   └──────────────────┘   └──────────────────┘
```

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.x | UI Framework |
| **Build Tool** | Vite | 5.x | Fast development builds |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Backend** | Azure Functions | v4 | Serverless API |
| **Database** | Azure Cosmos DB | - | NoSQL document storage |
| **Authentication** | Microsoft Entra ID | - | Enterprise SSO |
| **Hosting** | Azure Static Web Apps | - | CDN-backed hosting |

---

## Project Structure

```
little-i/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── Header.tsx            # Navigation header
│   │   ├── SearchBar.tsx         # Search input with filters
│   │   ├── ExpertDirectory.tsx   # Expert listing container
│   │   ├── ExpertCard.tsx        # Individual expert display
│   │   └── SubmitExpertModal.tsx # Add new expert form
│   ├── App.tsx                   # Root component
│   ├── App.css                   # Global styles
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Base styles
│
├── api/                          # Azure Functions API
│   ├── src/functions/
│   │   ├── getExperts.ts         # GET /api/getExperts
│   │   └── searchExperts.ts      # GET /api/searchExperts
│   ├── host.json                 # Functions host configuration
│   ├── package.json              # API dependencies
│   └── tsconfig.json             # API TypeScript config
│
├── public/                       # Static assets
├── staticwebapp.config.json      # SWA routing & security
├── vite.config.ts                # Vite bundler config
├── package.json                  # Frontend dependencies
└── tsconfig.json                 # Frontend TypeScript config
```

---

## API Endpoints

### GET /api/getExperts

Retrieves all experts from the database.

**Authentication:** Required (Entra ID)  
**Response:**
```json
{
  "experts": [
    {
      "id": "string",
      "name": "string",
      "title": "string",
      "department": "string",
      "affiliate": "string",
      "skills": ["string"],
      "email": "string"
    }
  ]
}
```

### GET /api/searchExperts

Searches experts by query string.

**Authentication:** Required (Entra ID)  
**Query Parameters:**
- `q` (string): Search query matching name, title, department, or skills

**Response:** Same structure as `/api/getExperts`

---

## Data Model

### Expert Entity

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `id` | string | Unique identifier (GUID) | Yes |
| `name` | string | Full name of expert | Yes |
| `title` | string | Job title | Yes |
| `department` | string | Department name | Yes |
| `affiliate` | string | VOA affiliate organization | Yes |
| `skills` | string[] | Array of expertise areas | Yes |
| `email` | string | Work email address | Yes |

### Cosmos DB Configuration

- **Partition Key:** `/department`
- **Consistency Level:** Session
- **Container:** `experts`
- **Database:** `expertise-marketplace`

---

## Authentication & Authorization

### Microsoft Entra ID Integration

The application uses Azure Static Web Apps built-in authentication with Microsoft Entra ID (formerly Azure AD).

**Configuration (`staticwebapp.config.json`):**
```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/.auth/login/aad",
      "statusCode": 302
    }
  }
}
```

**Authentication Flow:**
1. User accesses the application
2. API calls require authentication
3. Unauthenticated users redirected to Entra ID login
4. Post-authentication, user returned to application with session token

---

## Local Development

### Prerequisites

- Node.js 18 or later
- npm 9.x or later
- Azure Functions Core Tools v4
- Azure Static Web Apps CLI (optional)

### Setup Commands

```bash
# Clone and install frontend dependencies
cd little-i
npm install

# Start frontend dev server
npm run dev
# Available at http://localhost:5173

# Install and run API (separate terminal)
cd api
npm install
npm start
# Available at http://localhost:7071
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `COSMOS_CONNECTION_STRING` | Azure Cosmos DB connection | Production |
| `COSMOS_DATABASE_NAME` | Database name | Production |
| `COSMOS_CONTAINER_NAME` | Container name | Production |

---

## Deployment

### Azure Static Web Apps Deployment

1. **GitHub Integration:** Connect repository to Azure SWA
2. **Build Configuration:**
   - App location: `/`
   - API location: `/api`
   - Output location: `/dist`

3. **GitHub Actions Workflow** (auto-generated):
   - Triggers on push to `main`
   - Builds React frontend with Vite
   - Packages Azure Functions
   - Deploys to Azure edge locations

### Production Checklist

- [ ] Configure Cosmos DB connection string in SWA Application Settings
- [ ] Register application in Microsoft Entra ID
- [ ] Configure allowed redirect URIs
- [ ] Enable CORS for custom domains
- [ ] Set up Application Insights for monitoring

---

## Security Considerations

| Control | Implementation |
|---------|----------------|
| **Authentication** | Microsoft Entra ID (mandatory) |
| **Authorization** | Role-based via `allowedRoles` in routes |
| **Transport** | HTTPS enforced by Azure SWA |
| **CSP** | Content Security Policy headers configured |
| **Data** | Cosmos DB encryption at rest |

---

## Monitoring & Logging

- **Application Insights:** Integrated telemetry for Functions
- **Azure Monitor:** Infrastructure metrics
- **Function Logs:** Available in Azure Portal > Function App > Logs

---

## Future Roadmap

| Phase | Feature | Status |
|-------|---------|--------|
| Phase 1 | Core search functionality | ✅ Complete |
| Phase 2 | Cosmos DB integration | 🔄 In Progress |
| Phase 3 | Microsoft Graph integration | 📋 Planned |
| Phase 4 | Advanced filtering & facets | 📋 Planned |
| Phase 5 | Expert messaging system | 📋 Planned |

---

## Support & Contacts

- **Repository:** [GitHub - little-i]
- **Technical Lead:** TBD
- **Azure Subscription:** TBD

---

*This document is maintained by the development team. For questions, please contact the technical lead.*
