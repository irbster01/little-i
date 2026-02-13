import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import './SubmitExpertModal.css'

interface SubmitExpertModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const VOA_AFFILIATES = [
  'VOA Northern California & Northern Nevada',
  'VOA Greater New York',
  'VOA Los Angeles',
  'VOA Texas',
  'VOA Minnesota',
  'VOA Oregon',
  'VOA Michigan',
  'VOA Florida',
  'VOA Chesapeake & Carolinas',
  'VOA Colorado',
  'VOA Illinois',
  'VOA Indiana',
  'VOA Mid-States',
  'VOA National Services',
  'VOA Southwest',
  'VOA Alaska',
  'VOA Western Washington',
]

const EXPERTISE_AREAS = [
  'Crisis Intervention',
  'Case Management',
  'Trauma-Informed Care',
  'Grant Writing',
  'Federal Funding',
  'Budget Planning',
  'Affordable Housing',
  'HUD Regulations',
  'Client Advocacy',
  'Conflict Resolution',
  'Volunteer Management',
  'Training Development',
  'Event Planning',
  'Mental Health Counseling',
  'Substance Abuse',
  'Family Therapy',
  'Crisis Assessment',
  'Youth Development',
  'Mentoring Programs',
  'Educational Support',
  'Gang Prevention',
  'Spanish Language',
  'Microsoft Excel',
  'Microsoft Word',
  'Social Media',
  'Database Management',
  'Community Outreach',
  'Program Development',
  'Policy Advocacy',
  'Legal Services',
]

export default function SubmitExpertModal({ isOpen, onClose, onSuccess }: SubmitExpertModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    department: '',
    affiliate: '',
    skills: [] as string[],
    reason: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      title: '',
      department: '',
      affiliate: '',
      skills: [],
      reason: '',
    })
    setSubmitStatus('idle')
    setErrorMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.skills.length === 0) {
      setErrorMessage('Please select at least one area of expertise.')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/addExpert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          title: formData.title,
          department: formData.department,
          affiliate: formData.affiliate,
          skills: formData.skills,
          bio: formData.reason || undefined,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          resetForm()
          if (onSuccess) onSuccess()
        }, 2000)
      } else {
        setErrorMessage(result.error || 'Failed to add expert')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting expert:', error)
      setErrorMessage('Network error. Please try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const toggleSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.includes(skill)
        ? formData.skills.filter((s) => s !== skill)
        : [...formData.skills, skill],
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header modal-header-nominate">
          <div>
            <h2>Nominate an Expert</h2>
            <p className="modal-subtitle">Recommend a colleague for the directory</p>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="status-message success">
            <CheckCircle size={20} />
            <span>Expert added successfully! They will now appear in the directory.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="status-message error">
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="expert-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter expert's full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="expert@voa.org"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Case Manager"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Community Programs"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="affiliate">VOA Affiliate *</label>
            <select
              id="affiliate"
              name="affiliate"
              value={formData.affiliate}
              onChange={handleChange}
              required
            >
              <option value="">Select an affiliate...</option>
              {VOA_AFFILIATES.map((affiliate) => (
                <option key={affiliate} value={affiliate}>
                  {affiliate}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Areas of Expertise * (Select at least 1)</label>
            <div className="skills-grid">
              {EXPERTISE_AREAS.map((skill) => (
                <label key={skill} className="skill-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  <span className="skill-badge">{skill}</span>
                </label>
              ))}
            </div>
            {formData.skills.length > 0 && (
              <div className="selected-skills">
                <strong>Selected ({formData.skills.length}):</strong>
                <div className="selected-badges">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="selected-badge">
                      {skill}
                      <button
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="remove-badge"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reason">Why are you nominating this person?</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us what makes this person an expert..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="button-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="button-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spinning" />
                  Adding Expert...
                </>
              ) : (
                'Submit Nomination'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
