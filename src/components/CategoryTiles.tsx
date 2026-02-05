import { 
  Home, 
  DollarSign, 
  Heart, 
  Users, 
  GraduationCap, 
  Scale,
  HandHeart,
  FileText
} from 'lucide-react'
import './CategoryTiles.css'

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  keywords: string[]
  color: string
}

const CATEGORIES: Category[] = [
  {
    id: 'housing',
    name: 'Housing & Shelter',
    icon: <Home size={32} />,
    keywords: ['housing', 'shelter', 'hud', 'affordable', 'homeless'],
    color: '#2563eb',
  },
  {
    id: 'funding',
    name: 'Grants & Funding',
    icon: <DollarSign size={32} />,
    keywords: ['grant', 'funding', 'federal', 'budget', 'development'],
    color: '#16a34a',
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: <Heart size={32} />,
    keywords: ['mental health', 'counseling', 'therapy', 'substance', 'crisis'],
    color: '#dc2626',
  },
  {
    id: 'volunteers',
    name: 'Volunteers',
    icon: <Users size={32} />,
    keywords: ['volunteer', 'training', 'event', 'management'],
    color: '#9333ea',
  },
  {
    id: 'youth',
    name: 'Youth Services',
    icon: <GraduationCap size={32} />,
    keywords: ['youth', 'mentoring', 'education', 'gang', 'teen'],
    color: '#ea580c',
  },
  {
    id: 'advocacy',
    name: 'Client Advocacy',
    icon: <Scale size={32} />,
    keywords: ['advocacy', 'legal', 'conflict', 'resolution', 'client'],
    color: '#0891b2',
  },
  {
    id: 'outreach',
    name: 'Community Outreach',
    icon: <HandHeart size={32} />,
    keywords: ['community', 'outreach', 'crisis', 'intervention', 'trauma'],
    color: '#be185d',
  },
  {
    id: 'admin',
    name: 'Administration',
    icon: <FileText size={32} />,
    keywords: ['excel', 'database', 'planning', 'management', 'social media'],
    color: '#4b5563',
  },
]

interface CategoryTilesProps {
  onCategorySelect: (keywords: string[]) => void
  selectedCategory: string | null
}

export default function CategoryTiles({ onCategorySelect, selectedCategory }: CategoryTilesProps) {
  const handleClick = (category: Category) => {
    onCategorySelect(category.keywords)
  }

  return (
    <div className="category-section">
      <h2 className="category-heading">I need help with...</h2>
      <div className="category-grid">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-tile ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleClick(category)}
            style={{ '--tile-color': category.color } as React.CSSProperties}
          >
            <div className="category-icon">{category.icon}</div>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export { CATEGORIES }
export type { Category }
