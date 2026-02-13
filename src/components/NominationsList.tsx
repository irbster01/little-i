import { useState } from 'react'
import type { Expert } from './ExpertDirectory'
import { X, UserPlus, Send, Loader2, CheckCircle } from 'lucide-react'
import './NominationsList.css'

interface NominationsListProps {
  nominations: Expert[]
  onRemove: (expertId: string) => void
  onClear: () => void
  userRole?: 'seeker' | 'expert' | 'nominator'
}

export default function NominationsList({ nominations, onRemove, onClear, userRole = 'seeker' }: NominationsListProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  if (nominations.length === 0 && !submitSuccess) {
    return null
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submitNominations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experts: nominations.map((e) => ({
            id: e.id,
            name: e.name,
            title: e.title,
            department: e.department,
            email: e.email,
          })),
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setTimeout(() => {
          onClear()
          setSubmitSuccess(false)
        }, 2500)
      } else {
        console.error('Failed to submit nominations')
      }
    } catch (error) {
      console.error('Error submitting nominations:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="nominations-panel success">
        <div className="success-message">
          <CheckCircle size={24} />
          <span>{userRole === 'seeker' ? 'Expert request submitted!' : 'Nominations submitted successfully!'}</span>
        </div>
      </div>
    )
  }

  const panelTitle = userRole === 'seeker' ? 'My Expert Requests' : 'My Nominations'

  return (
    <div className="nominations-panel">
      <div className="nominations-header">
        <div className="nominations-title">
          <UserPlus size={20} />
          <h3>{panelTitle} ({nominations.length})</h3>
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
        <button 
          className={`submit-nominations ${isSubmitting ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="spinning" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} />
              {userRole === 'seeker' ? 'Submit Request' : 'Submit Nominations'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
