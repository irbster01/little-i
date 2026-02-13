import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import './SubmitExpertModal.css'

interface ConsultantFormProps {
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
  { value: 'brief', label: 'Brief Support (Q&A)' },
  { value: 'detailed', label: 'Projects' },
  { value: 'both', label: 'Both Brief Support and Projects' },
]

export default function ConsultantForm({ isOpen, onClose, onSuccess }: ConsultantFormProps) {
  const [formData, setFormData] = useState({
    // Consultant info
    companyName: '',
    contactName: '',
    contactEmail: '',
    title: '',
    description: '',
    skills: [] as string[],
    availabilityType: 'both',
    responseTime: '24-48 hours',
    // Endorser info
    endorserName: '',
    endorserEmail: '',
    endorserAffiliate: '',
    endorserRelationship: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const resetForm = () => {
    setFormData({
      companyName: '',
      contactName: '',
      contactEmail: '',
      title: '',
      description: '',
      skills: [],
      availabilityType: 'both',
      responseTime: '24-48 hours',
      endorserName: '',
      endorserEmail: '',
      endorserAffiliate: '',
      endorserRelationship: '',
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
    if (!formData.endorserName || !formData.endorserEmail || !formData.endorserAffiliate) {
      setErrorMessage('Please provide your endorser information. We need a VOA staff member to vouch for this consultant.')
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
          name: formData.companyName || formData.contactName,
          email: formData.contactEmail,
          title: formData.title,
          department: formData.companyName,
          affiliate: formData.endorserAffiliate,
          skills: formData.skills,
          bio: formData.description || undefined,
          type: 'consultant',
          availabilityType: formData.availabilityType,
          responseTime: formData.responseTime,
          endorserName: formData.endorserName,
          endorserEmail: formData.endorserEmail,
          endorserAffiliate: formData.endorserAffiliate,
          endorserRelationship: formData.endorserRelationship,
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
        setErrorMessage(result.error || 'Failed to add consultant')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting consultant:', error)
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
        <div className="modal-header modal-header-consultant">
          <div>
            <h2>Share a Trusted Consultant</h2>
            <p className="modal-subtitle">Recommend an external partner to the village</p>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close">&times;</button>
        </div>

        {submitStatus === 'success' && (
          <div className="status-message success">
            <CheckCircle size={20} />
            <span>Consultant added to the Village! They'll now appear in the directory as an external partner.</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="status-message error">
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="expert-form">
          <div className="form-section-label">Consultant Information</div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-company">Company / Organization Name *</label>
              <input type="text" id="cf-company" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="e.g., Summit Strategy Group" />
            </div>
            <div className="form-group">
              <label htmlFor="cf-title">Service Type *</label>
              <input type="text" id="cf-title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Strategic Consulting Firm" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-contact">Contact Person</label>
              <input type="text" id="cf-contact" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Primary contact name" />
            </div>
            <div className="form-group">
              <label htmlFor="cf-email">Contact Email *</label>
              <input type="email" id="cf-email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required placeholder="contact@company.com" />
            </div>
          </div>

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
            <label htmlFor="cf-desc">What do they specialize in?</label>
            <textarea
              id="cf-desc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the consultant's specializations and how they've helped VOA..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-avail">Availability Type</label>
              <select id="cf-avail" name="availabilityType" value={formData.availabilityType} onChange={handleChange}>
                {AVAILABILITY_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cf-response">Typical Response Time</label>
              <select id="cf-response" name="responseTime" value={formData.responseTime} onChange={handleChange}>
                <option value="Same Day">Same Day</option>
                <option value="24-48 hours">24-48 hours</option>
                <option value="3-5 days">3-5 days</option>
                <option value="1-2 weeks">1-2 weeks</option>
              </select>
            </div>
          </div>

          <div className="form-section-label section-endorser">Your Endorsement</div>
          <p className="form-section-desc">As the recommender, tell us about your experience with this consultant. Your name will be displayed as the primary endorser.</p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-ename">Your Name *</label>
              <input type="text" id="cf-ename" name="endorserName" value={formData.endorserName} onChange={handleChange} required placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="cf-eemail">Your Email *</label>
              <input type="email" id="cf-eemail" name="endorserEmail" value={formData.endorserEmail} onChange={handleChange} required placeholder="you@voa.org" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-eaffiliate">Your VOA Affiliate *</label>
              <select id="cf-eaffiliate" name="endorserAffiliate" value={formData.endorserAffiliate} onChange={handleChange} required>
                <option value="">Select your affiliate...</option>
                {VOA_AFFILIATES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cf-erel">How did you work with them?</label>
              <input type="text" id="cf-erel" name="endorserRelationship" value={formData.endorserRelationship} onChange={handleChange} placeholder="e.g., Led our capital campaign" />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="button-secondary" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="button-primary button-consultant" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={16} className="spinning" /> Submitting...</>
              ) : (
                'Add to the Village'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
