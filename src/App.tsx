import { useState } from 'react'
import './App.css'
import ExpertDirectory from './components/ExpertDirectory'
import type { Expert } from './components/ExpertDirectory'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import SubmitExpertModal from './components/SubmitExpertModal'
import ExpertProfileForm from './components/ExpertProfileForm'
import ConsultantForm from './components/ConsultantForm'
import CategoryTiles from './components/CategoryTiles'
import NominationsList from './components/NominationsList'
import WelcomeView from './components/WelcomeView'

type ViewMode = 'welcome' | 'browse'
type UserRole = 'seeker' | 'expert' | 'nominator'

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('welcome')
  const [userRole, setUserRole] = useState<UserRole>('seeker')
  const [searchQuery, setSearchQuery] = useState('')
  const [isNominateModalOpen, setIsNominateModalOpen] = useState(false)
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false)
  const [isConsultantFormOpen, setIsConsultantFormOpen] = useState(false)
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

  // Welcome view handlers
  const handleSeekWisdom = () => {
    setUserRole('seeker')
    setCurrentView('browse')
  }

  const handleContribute = () => {
    setUserRole('expert')
    setCurrentView('browse')
    setIsProfileFormOpen(true)
  }

  const handleShareConsultant = () => {
    setUserRole('nominator')
    setCurrentView('browse')
    setIsConsultantFormOpen(true)
  }

  const handleHomeClick = () => {
    setCurrentView('welcome')
    setNominations([])
    setSearchQuery('')
    setCategoryKeywords([])
    setSelectedCategory(null)
  }

  // Determine which "add" action to show based on role
  const handleAddAction = () => {
    if (userRole === 'expert') {
      setIsProfileFormOpen(true)
    } else if (userRole === 'nominator') {
      setIsConsultantFormOpen(true)
    } else {
      setIsNominateModalOpen(true)
    }
  }

  const addButtonLabel = userRole === 'expert'
    ? '+ List Your Expertise'
    : userRole === 'nominator'
    ? '+ Add Consultant'
    : '+ Nominate Expert'

  // Render welcome view
  if (currentView === 'welcome') {
    return (
      <WelcomeView
        onSeekWisdom={handleSeekWisdom}
        onContribute={handleContribute}
        onShareConsultant={handleShareConsultant}
      />
    )
  }

  // Render browse view
  return (
    <div className="app">
      <Header onHomeClick={handleHomeClick} />
      <main className="main-content">
        <div className="container">
          <CategoryTiles 
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          <SearchBar 
            onSearch={handleSearch} 
            onSubmitExpert={handleAddAction}
            submitLabel={addButtonLabel}
          />
          <ExpertDirectory 
            searchQuery={searchQuery}
            categoryKeywords={categoryKeywords}
            onClearSearch={handleClearSearch}
            onNominate={handleNominate}
            nominatedIds={nominations.map((n) => n.id)}
            refreshKey={refreshKey}
            userRole={userRole}
          />
        </div>
      </main>
      <SubmitExpertModal 
        isOpen={isNominateModalOpen} 
        onClose={() => setIsNominateModalOpen(false)}
        onSuccess={handleExpertAdded}
      />
      <ExpertProfileForm
        isOpen={isProfileFormOpen}
        onClose={() => setIsProfileFormOpen(false)}
        onSuccess={handleExpertAdded}
      />
      <ConsultantForm
        isOpen={isConsultantFormOpen}
        onClose={() => setIsConsultantFormOpen(false)}
        onSuccess={handleExpertAdded}
      />
      <NominationsList
        nominations={nominations}
        onRemove={handleRemoveNomination}
        onClear={handleClearNominations}
        userRole={userRole}
      />
    </div>
  )
}

export default App
