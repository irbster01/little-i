import { useState } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (query: string) => void
  onSubmitExpert: () => void
  submitLabel?: string
}

export default function SearchBar({ onSearch, onSubmitExpert, submitLabel = '+ Nominate Expert' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

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
            onChange={handleChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <button onClick={onSubmitExpert} className="submit-expert-button">
          {submitLabel}
        </button>
      </div>
    </div>
  )
}
