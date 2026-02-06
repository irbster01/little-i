import { useEffect, useState, useCallback } from 'react'
import ExpertCard from './ExpertCard'
import { Loader2 } from 'lucide-react'
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
  flair?: string[]
}

interface ExpertDirectoryProps {
  searchQuery: string
  categoryKeywords: string[]
  onClearSearch: () => void
  onNominate: (expert: Expert) => void
  nominatedIds: string[]
  refreshKey?: number
}

export interface ExpertWithMatch extends Expert {
  matchScore: number
  matchType: 'best' | 'recommended' | null
}

export default function ExpertDirectory({ searchQuery, categoryKeywords, onClearSearch, onNominate, nominatedIds, refreshKey }: ExpertDirectoryProps) {
  const [experts, setExperts] = useState<Expert[]>([])
  const [filteredExperts, setFilteredExperts] = useState<ExpertWithMatch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchExperts = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/getExperts')
      if (response.ok) {
        const data = await response.json()
        setExperts(data.experts || [])
      }
    } catch (error) {
      console.error('Error fetching experts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchExperts()
  }, [fetchExperts, refreshKey])

  useEffect(() => {
    // Calculate match score based on category keywords
    const calculateMatchScore = (expert: Expert, keywords: string[]): number => {
      if (keywords.length === 0) return 0
      
      let score = 0
      const expertText = [
        expert.name,
        expert.title,
        expert.department,
        expert.bio,
        ...expert.skills
      ].join(' ').toLowerCase()
      
      for (const keyword of keywords) {
        if (expertText.includes(keyword.toLowerCase())) {
          score += 1
        }
      }
      return score
    }

    // If category is selected, filter and sort by match score
    if (categoryKeywords.length > 0) {
      const scoredExperts: ExpertWithMatch[] = experts
        .map((expert) => {
          const score = calculateMatchScore(expert, categoryKeywords)
          return {
            ...expert,
            matchScore: score,
            matchType: score >= 2 ? 'best' as const : score >= 1 ? 'recommended' as const : null
          }
        })
        .filter((expert) => expert.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
      
      setFilteredExperts(scoredExperts)
      return
    }

    // If search query, filter by text match
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const filtered = experts
        .filter(
          (expert) =>
            expert.name.toLowerCase().includes(query) ||
            expert.title.toLowerCase().includes(query) ||
            expert.department.toLowerCase().includes(query) ||
            expert.skills.some((skill) => skill.toLowerCase().includes(query))
        )
        .map((expert) => ({ ...expert, matchScore: 0, matchType: null }))
      setFilteredExperts(filtered)
      return
    }

    // Default: show all experts
    setFilteredExperts(experts.map((expert) => ({ ...expert, matchScore: 0, matchType: null })))
  }, [searchQuery, categoryKeywords, experts])

  const isFiltering = searchQuery.trim() || categoryKeywords.length > 0

  return (
    <div className="expert-directory">
      <div className="results-header">
        <h2>
          {categoryKeywords.length > 0 ? 'Matching Experts' : 'Experts'} ({filteredExperts.length})
        </h2>
        {isFiltering && (
          <button onClick={onClearSearch} className="clear-filter-link">
            Clear filters
          </button>
        )}
      </div>
      <div className="expert-grid">
        {isLoading ? (
          <div className="loading-state">
            <Loader2 size={32} className="spinning" />
            <p>Loading experts...</p>
          </div>
        ) : filteredExperts.length > 0 ? (
          filteredExperts.map((expert) => (
            <ExpertCard 
              key={expert.id} 
              expert={expert} 
              matchType={expert.matchType}
              onNominate={() => onNominate(expert)}
              isNominated={nominatedIds.includes(expert.id)}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No experts found matching your criteria</p>
            <button onClick={onClearSearch} className="clear-search-button">
              View All Experts
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
