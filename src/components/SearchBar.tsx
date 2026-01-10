import { useState } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (query: string) => void
  onSubmitExpert: () => void
}

export default function SearchBar({ onSearch, onSubmitExpert }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className="search-bar">
      <div className="search-bar-header">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search by skill, expertise, or name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <button onClick={onSubmitExpert} className="submit-expert-button">
          + Nominate Expert
        </button>
      </div>
    </div>
  )
}
