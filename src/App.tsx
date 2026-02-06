import { useState } from 'react'
import './App.css'
import ExpertDirectory from './components/ExpertDirectory'
import type { Expert } from './components/ExpertDirectory'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import SubmitExpertModal from './components/SubmitExpertModal'
import CategoryTiles from './components/CategoryTiles'
import NominationsList from './components/NominationsList'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryKeywords, setCategoryKeywords] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [nominations, setNominations] = useState<Expert[]>([])
  const [refreshKey, setRefreshKey] = useState(0)

  const handleExpertAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleNominate = (expert: Expert) => {
    if (!nominations.find((n) => n.id === expert.id)) {
      setNominations([...nominations, expert])
    }
  }

  const handleRemoveNomination = (expertId: string) => {
    setNominations(nominations.filter((n) => n.id !== expertId))
  }

  const handleClearNominations = () => {
    setNominations([])
  }

  const handleCategorySelect = (keywords: string[]) => {
    setCategoryKeywords(keywords)
    setSearchQuery('')
    setSelectedCategory(keywords.length > 0 ? keywords[0] : null)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setCategoryKeywords([])
    setSelectedCategory(null)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      setCategoryKeywords([])
      setSelectedCategory(null)
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <CategoryTiles 
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          <SearchBar 
            onSearch={handleSearch} 
            onSubmitExpert={() => setIsModalOpen(true)}
          />
          <ExpertDirectory 
            searchQuery={searchQuery}
            categoryKeywords={categoryKeywords}
            onClearSearch={handleClearSearch}
            onNominate={handleNominate}
            nominatedIds={nominations.map((n) => n.id)}
            refreshKey={refreshKey}
          />
        </div>
      </main>
      <SubmitExpertModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleExpertAdded}
      />
      <NominationsList
        nominations={nominations}
        onRemove={handleRemoveNomination}
        onClear={handleClearNominations}
      />
    </div>
  )
}

export default App
