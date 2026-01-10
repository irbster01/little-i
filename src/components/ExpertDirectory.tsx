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
}

interface ExpertDirectoryProps {
  searchQuery: string
}

// Mock data - will be replaced with Microsoft Lists queries
const mockExperts: Expert[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Community Outreach Coordinator',
    department: 'Community Programs',
    affiliate: 'VOA Northern California & Northern Nevada',
    skills: ['Crisis Intervention', 'Case Management', 'Trauma-Informed Care', 'Spanish Language'],
    email: 'sarah.johnson@voa.gov',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Grant Writer',
    department: 'Development',
    affiliate: 'VOA Greater New York',
    skills: ['Grant Writing', 'Federal Funding', 'Budget Planning', 'Microsoft Excel'],
    email: 'michael.chen@voa.gov',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Housing Services Manager',
    department: 'Housing & Shelter',
    affiliate: 'VOA Los Angeles',
    skills: ['Affordable Housing', 'HUD Regulations', 'Client Advocacy', 'Conflict Resolution'],
    email: 'emily.rodriguez@voa.gov',
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Volunteer Coordinator',
    department: 'Volunteer Services',
    affiliate: 'VOA Texas',
    skills: ['Volunteer Management', 'Training Development', 'Event Planning', 'Social Media'],
    email: 'david.kim@voa.gov',
  },
  {
    id: '5',
    name: 'Patricia Williams',
    title: 'Licensed Clinical Social Worker',
    department: 'Mental Health Services',
    affiliate: 'VOA Minnesota',
    skills: ['Mental Health Counseling', 'Substance Abuse', 'Family Therapy', 'Crisis Assessment'],
    email: 'patricia.williams@voa.gov',
  },
  {
    id: '6',
    name: 'James Martinez',
    title: 'Youth Programs Director',
    department: 'Youth Services',
    affiliate: 'VOA Florida',
    skills: ['Youth Development', 'Mentoring Programs', 'Educational Support', 'Gang Prevention'],
    email: 'james.martinez@voa.gov',
  },
]

export default function ExpertDirectory({ searchQuery }: ExpertDirectoryProps) {
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
            <p>No experts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
