import { useEffect, useState } from 'react'
import ExpertCard from './ExpertCard'
import './ExpertDirectory.css'

export interface Expert {
  id: string
  name: string
  title: string
  department: string
  affiliate: string
  skills: string[]
  email: string
  bio: string
}

interface ExpertDirectoryProps {
  searchQuery: string
  onClearSearch: () => void
}

// Mock data - will be replaced with Cosmos DB queries
const mockExperts: Expert[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Community Outreach Coordinator',
    department: 'Community Programs',
    affiliate: 'VOA Northern California & Northern Nevada',
    skills: ['Crisis Intervention', 'Case Management', 'Trauma-Informed Care', 'Spanish Language'],
    email: 'sarah.johnson@voa.org',
    bio: 'Leads community crisis response initiatives and coordinates trauma-informed care programs. Specializes in bilingual outreach to underserved Spanish-speaking communities.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Grant Writer',
    department: 'Development',
    affiliate: 'VOA Greater New York',
    skills: ['Grant Writing', 'Federal Funding', 'Budget Planning', 'Microsoft Excel'],
    email: 'michael.chen@voa.org',
    bio: 'Secures federal and foundation funding for social service programs. Has successfully obtained over $5M in grants for housing and workforce development initiatives.',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Housing Services Manager',
    department: 'Housing & Shelter',
    affiliate: 'VOA Los Angeles',
    skills: ['Affordable Housing', 'HUD Regulations', 'Client Advocacy', 'Conflict Resolution'],
    email: 'emily.rodriguez@voa.org',
    bio: 'Manages affordable housing programs and ensures HUD compliance across multiple properties. Expert in navigating complex housing regulations to help clients find stable housing.',
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Volunteer Coordinator',
    department: 'Volunteer Services',
    affiliate: 'VOA Texas',
    skills: ['Volunteer Management', 'Training Development', 'Event Planning', 'Social Media'],
    email: 'david.kim@voa.org',
    bio: 'Recruits, trains, and manages a network of 500+ volunteers across Texas. Creates engaging training programs and coordinates large-scale community service events.',
  },
  {
    id: '5',
    name: 'Patricia Williams',
    title: 'Licensed Clinical Social Worker',
    department: 'Mental Health Services',
    affiliate: 'VOA Minnesota',
    skills: ['Mental Health Counseling', 'Substance Abuse', 'Family Therapy', 'Crisis Assessment'],
    email: 'patricia.williams@voa.org',
    bio: 'Provides clinical mental health services specializing in substance abuse recovery and family therapy. Conducts crisis assessments and develops treatment plans for at-risk populations.',
  },
  {
    id: '6',
    name: 'James Martinez',
    title: 'Youth Programs Director',
    department: 'Youth Services',
    affiliate: 'VOA Florida',
    skills: ['Youth Development', 'Mentoring Programs', 'Educational Support', 'Gang Prevention'],
    email: 'james.martinez@voa.org',
    bio: 'Directs youth development programs focused on education and gang prevention. Builds mentoring relationships that help at-risk teens stay in school and pursue positive futures.',
  },
]

export default function ExpertDirectory({ searchQuery, onClearSearch }: ExpertDirectoryProps) {
  const [experts] = useState<Expert[]>(mockExperts)
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>(mockExperts)

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredExperts(experts)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = experts.filter(
      (expert) =>
        expert.name.toLowerCase().includes(query) ||
        expert.title.toLowerCase().includes(query) ||
        expert.department.toLowerCase().includes(query) ||
        expert.skills.some((skill) => skill.toLowerCase().includes(query))
    )
    setFilteredExperts(filtered)
  }, [searchQuery, experts])

  return (
    <div className="expert-directory">
      <div className="results-header">
        <h2>Experts ({filteredExperts.length})</h2>
      </div>
      <div className="expert-grid">
        {filteredExperts.length > 0 ? (
          filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))
        ) : (
          <div className="no-results">
            <p>No experts found matching "{searchQuery}"</p>
            <button onClick={onClearSearch} className="clear-search-button">
              View All Experts
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
