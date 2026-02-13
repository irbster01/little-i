import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import './SubmitExpertModal.css'

interface ExpertProfileFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const VOA_AFFILIATES = [
  'VOA National Office',
  'VOA Alaska',
  'VOA Chesapeake & Carolinas',
  'VOA Colorado',
  'VOA Delaware Valley',
  'VOA Florida',
  'VOA Greater New York',
  'VOA Illinois',
  'VOA Indiana',
  'VOA Los Angeles',
  'VOA Massachusetts',
  'VOA Michigan',
  'VOA Mid-States',
  'VOA Minnesota & Wisconsin',
  'VOA National Services',
  'VOA North Louisiana',
  'VOA Northern California & Northern Nevada',
  'VOA Northern Rockies',
  'VOA Ohio & Indiana',
  'VOA Oregon',
  'VOA Southeast',
  'VOA Southeast Louisiana',
  'VOA Southwest',
  'VOA Texas',
  'VOA Upstate New York',
  'VOA Utah',
  'VOA Western Washington',
]

const EXPERTISE_DOMAINS = [
  'Addiction Treatment',
  'Behavioral Health',
  'Finance',
  'Homeless Services',
  'Housing Development',
  'Housing Management',
  'Human Resources',
  'Strategic Planning',
  'Thrift',
  'Veterans',
]

const AVAILABILITY_OPTIONS = [
  { value: 'brief', label: 'Brief Support (Q&A)', description: 'Quick questions, email exchanges, phone calls' },
  { value: 'detailed', label: 'Projects', description: 'Longer-term collaboration, project consulting' },
  { value: 'both', label: 'Both Brief Support and Projects', description: 'Available for any type of engagement' },
]

const RESPONSE_TIMES = [
  'Same Day',
  '24-48 hours',
  '3-5 days',
  '1-2 weeks',
]

export default function ExpertProfileForm({ isOpen, onClose, onSuccess }: ExpertProfileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    department: '',
    affiliate: '',
    skills: [] as string[],
    description: '',
    availabilityType: 'both',
    responseTime: '24-48 hours',
    yearsExperience: '',
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
      description: '',
      availabilityType: 'both',
      responseTime: '24-48 hours',
      yearsExperience: '',
    })
    setSubmitStatus('idle')
    setErrorMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.skills.length === 0) {
      setErrorMessage('Please select at least one domain of expertise.')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/addExpert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          title: formData.title,
          department: formData.department,
          affiliate: formData.affiliate,
          skills: formData.skills,
          bio: formData.description || undefined,
          type: 'internal',
          availabilityType: formData.availabilityType,
          responseTime: formData.responseTime,
          yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : undefined,
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
        setErrorMessage(result.error || 'Failed to add your profile')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting profile:', error)
      setErrorMessage('Network error. Please try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
        <div className="modal-header modal-header-contribute">
          <div>
            <h2>List Your Expertise</h2>
            <p className="modal-subtitle">Share what you know with the village</p>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close">&times;</button>
        </div>

        {submitStatus === 'success' && (
          <div className="status-message success">
            <CheckCircle size={20} />
            <span>Your profile has been added to the Village! You'll now appear in the directory.</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="status-message error">
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="expert-form">
          <div className="form-section-label">About You</div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ep-name">Your Name *</label>
              <input type="text" id="ep-name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="ep-email">Your Email *</label>
              <input type="email" id="ep-email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@voa.org" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ep-title">Job Title *</label>
              <input type="text" id="ep-title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Director of Housing" />
            </div>
            <div className="form-group">
              <label htmlFor="ep-department">Department</label>
              <input type="text" id="ep-department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g., Housing Management" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ep-affiliate">VOA Affiliate *</label>
              <select id="ep-affiliate" name="affiliate" value={formData.affiliate} onChange={handleChange} required>
                <option value="">Select your affiliate...</option>
                {VOA_AFFILIATES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ep-years">Years of Experience</label>
              <input type="number" id="ep-years" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} placeholder="e.g., 10" min="0" max="50" />
            </div>
          </div>

          <div className="form-section-label">Your Expertise</div>

          <div className="form-group">
            <label>Domains of Expertise * (Select all that apply)</label>
            <div className="skills-grid compact">
              {EXPERTISE_DOMAINS.map((skill) => (
                <label key={skill} className="skill-checkbox">
                  <input type="checkbox" checked={formData.skills.includes(skill)} onChange={() => toggleSkill(skill)} />
                  <span className="skill-badge">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ep-desc">What can you help with?</label>
            <textarea
              id="ep-desc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your areas of specialization and what types of questions or projects you can help with..."
            />
          </div>

          <div className="form-section-label">Availability</div>

          <div className="form-group">
            <label>How would you like to contribute?</label>
            <div className="availability-options">
              {AVAILABILITY_OPTIONS.map((opt) => (
                <label key={opt.value} className={`availability-option ${formData.availabilityType === opt.value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="availabilityType"
                    value={opt.value}
                    checked={formData.availabilityType === opt.value}
                    onChange={handleChange}
                  />
                  <div className="availability-content">
                    <strong>{opt.label}</strong>
                    <span>{opt.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ep-response">Typical Response Time</label>
            <select id="ep-response" name="responseTime" value={formData.responseTime} onChange={handleChange}>
              {RESPONSE_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="button-secondary" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="button-primary button-contribute" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={16} className="spinning" /> Adding Profile...</>
              ) : (
                'Join the Village'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
