# Expertise Marketplace - Product Overview

**Document Type:** Business Overview & User Guide  
**Audience:** Business Stakeholders, End Users, Project Managers  
**Last Updated:** January 29, 2026  
**Status:** Active Development

---

## What is the Expertise Marketplace?

The **Expertise Marketplace** is an internal web application designed to help employees discover and connect with colleagues who have specific skills and expertise across the organization. Think of it as an "internal LinkedIn" that makes it easy to find the right person for any project, question, or collaboration.

---

## Why Do We Need This?

### The Problem

In large organizations, valuable expertise often goes untapped because employees simply don't know who has the skills they need. This leads to:

- ⏰ **Wasted time** searching for the right person to help
- 🔄 **Duplicated efforts** when people solve problems others have already solved
- 🚧 **Siloed knowledge** trapped within departments
- 📉 **Missed collaboration opportunities** between affiliates

### The Solution

The Expertise Marketplace creates a searchable, up-to-date directory of employee skills, making it easy to:

- 🔍 **Find experts instantly** by searching for specific skills
- 🤝 **Connect across departments** and affiliate organizations
- 💡 **Share knowledge** and reduce duplicated work
- 📈 **Accelerate projects** by quickly assembling the right team

---

## Key Features

### 🔎 Smart Search

Search for colleagues by:
- **Name** - Find a specific person
- **Skills** - Search for expertise like "Grant Writing" or "Crisis Intervention"
- **Department** - Browse experts by functional area
- **Job Title** - Find people in similar roles

### 👤 Expert Profiles

Each expert profile displays:
- Full name and job title
- Department and affiliate organization
- List of skills and expertise areas
- Contact information

### ➕ Submit Your Expertise

Employees can add themselves to the directory by submitting their skills and areas of expertise through a simple form.

### 🔐 Secure Access

The application uses your existing Microsoft work account for login - no new passwords to remember. Only authenticated employees can access the directory.

---

## How to Use the Expertise Marketplace

### Finding an Expert

1. **Open the application** in your web browser
2. **Sign in** with your Microsoft work account (automatic if already signed in)
3. **Enter your search** in the search bar (e.g., "Spanish Language" or "HUD Regulations")
4. **Browse results** - matching experts appear as cards below
5. **Contact the expert** using the email link on their card

### Adding Yourself to the Directory

1. Click the **"Submit Your Expertise"** button
2. Fill in your information:
   - Name
   - Job Title
   - Department
   - Affiliate Organization
   - Skills (list your areas of expertise)
   - Work Email
3. Submit the form
4. Your profile will appear in the directory

---

## Example Use Cases

| Scenario | How the Marketplace Helps |
|----------|---------------------------|
| Writing a federal grant and need budget expertise | Search "Federal Funding" or "Budget Planning" to find experienced grant writers |
| Need a Spanish-speaking case manager for a client | Search "Spanish Language" to find bilingual staff |
| Starting a youth mentoring program | Search "Youth Development" or "Mentoring Programs" to learn from others |
| Implementing new HUD regulations | Search "HUD Regulations" to connect with housing experts |
| Planning a volunteer event | Search "Event Planning" or "Volunteer Management" for guidance |

---

## Benefits by Role

### For Individual Employees
- Find help quickly when facing new challenges
- Learn from colleagues with relevant experience
- Build your professional network across the organization
- Showcase your own skills and expertise

### For Managers
- Identify internal talent for projects
- Build cross-functional teams efficiently
- Reduce reliance on external consultants
- Foster knowledge sharing within your team

### For The Organization
- Maximize existing expertise across affiliates
- Reduce knowledge silos between departments
- Accelerate project delivery
- Improve employee engagement and collaboration

---

## Frequently Asked Questions

### Who can access the Expertise Marketplace?
All employees with a valid Microsoft work account can access the application. No special permissions are required.

### Is my information secure?
Yes. The application uses Microsoft's enterprise security (Entra ID) and all data is stored securely in Azure with encryption.

### How do I update my profile?
Currently, please contact your administrator to update profile information. Self-service profile editing is planned for a future release.

### Can I remove myself from the directory?
Yes, contact your administrator to have your profile removed.

### Who maintains the directory?
The directory is community-driven - employees add and update their own expertise. Administrators oversee data quality.

### What if I can't find an expert for my need?
If your search returns no results, try broader search terms or different keywords. You can also reach out to department heads who may know of relevant experts.

---

## Estimated Monthly Costs

The Expertise Marketplace is built on Azure's serverless architecture, which means you only pay for what you use. Here's an estimated cost breakdown for a typical deployment:

| Service | Purpose | Estimated Monthly Cost |
|---------|---------|------------------------|
| **Azure Static Web Apps** | Hosting the website | Free (Standard tier: ~$9/month) |
| **Azure Functions** | Backend API | Free tier covers ~1M requests/month |
| **Azure Cosmos DB** | Database storage | ~$25/month (Serverless, light usage) |
| **Microsoft Entra ID** | Authentication | Included with Microsoft 365 |
| **Total (Light Usage)** | Up to 500 users | **~$25-35/month** |
| **Total (Moderate Usage)** | 500-2,000 users | **~$50-75/month** |

**Notes:**
- Costs scale with usage - quiet periods cost less
- Microsoft 365 licenses (already owned) include Entra ID
- No per-user licensing fees for this application
- Azure Functions free tier includes 1 million executions/month

---

## Roadmap - What's Coming Next

| Feature | Expected | Description |
|---------|----------|-------------|
| **Profile Photos** | Q2 2026 | Integration with Microsoft 365 profile pictures |
| **Direct Messaging** | Q2 2026 | Contact experts directly through the app |
| **Advanced Filters** | Q3 2026 | Filter by affiliate, department, years of experience |
| **Skill Endorsements** | Q3 2026 | Colleagues can endorse your skills |
| **Mobile App** | Q4 2026 | Native mobile experience for iOS and Android |

---

## Getting Help

### Technical Issues
If you experience login problems or the application isn't working, please contact the IT Help Desk.

### Feature Requests
Have an idea to improve the Expertise Marketplace? Submit your suggestion through the feedback form or contact the project team.

### Questions About This Document
For questions about this documentation, please contact the project manager.

---

## Quick Reference Card

| Action | How To |
|--------|--------|
| **Access the app** | Navigate to the application URL and sign in |
| **Search for skills** | Type keywords in the search bar |
| **Clear search** | Delete text from search bar or refresh page |
| **Contact an expert** | Click the email link on their profile card |
| **Add your profile** | Click "Submit Your Expertise" button |

---

*Last updated: January 29, 2026*  
*For the latest version of this document, please check the project Confluence space.*
