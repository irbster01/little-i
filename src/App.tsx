import { useState } from 'react'
import './App.css'
import ExpertDirectory from './components/ExpertDirectory'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import SubmitExpertModal from './components/SubmitExpertModal'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <SearchBar 
            onSearch={setSearchQuery} 
            onSubmitExpert={() => setIsModalOpen(true)}
          />
          <ExpertDirectory 
            searchQuery={searchQuery} 
            onClearSearch={() => setSearchQuery('')}
          />
        </div>
      </main>
      <SubmitExpertModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default App
