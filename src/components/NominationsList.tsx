import type { Expert } from './ExpertDirectory'
import { X, UserPlus, Send } from 'lucide-react'
import './NominationsList.css'

interface NominationsListProps {
  nominations: Expert[]
  onRemove: (expertId: string) => void
  onClear: () => void
}

export default function NominationsList({ nominations, onRemove, onClear }: NominationsListProps) {
  if (nominations.length === 0) {
    return null
  }

  return (
    <div className="nominations-panel">
      <div className="nominations-header">
        <div className="nominations-title">
          <UserPlus size={20} />
          <h3>My Nominations ({nominations.length})</h3>
        </div>
        <button onClick={onClear} className="clear-nominations">
          Clear All
        </button>
      </div>
      <div className="nominations-list">
        {nominations.map((expert) => (
          <div key={expert.id} className="nomination-chip">
            <div className="nomination-avatar">
              {expert.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="nomination-info">
              <span className="nomination-name">{expert.name}</span>
              <span className="nomination-title">{expert.title}</span>
            </div>
            <button
              onClick={() => onRemove(expert.id)}
              className="remove-nomination"
              title="Remove nomination"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="nominations-actions">
        <button className="submit-nominations">
          <Send size={16} />
          Submit Nominations
        </button>
      </div>
    </div>
  )
}
