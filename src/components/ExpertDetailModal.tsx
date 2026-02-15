import type { Expert } from './ExpertDirectory'
import { X, Mail, Award, Star, Zap, TrendingUp, MessageCircle, Sparkles, Heart, Clock, Users, Lightbulb, Calendar, ThumbsUp } from 'lucide-react'
import './ExpertDetailModal.css'

const flairConfig: Record<string, { icon: typeof Zap; color: string; label: string }> = {
  responsive: { icon: Zap, color: '#16a34a', label: 'Responsive' },
  'frequently-requested': { icon: TrendingUp, color: '#ea580c', label: 'Frequently Requested' },
  'rising-star': { icon: Sparkles, color: '#8b5cf6', label: 'Rising Star' },
  'top-contributor': { icon: Award, color: '#0891b2', label: 'Top Contributor' },
  'mentor': { icon: Heart, color: '#db2777', label: 'Mentor' },
  'thought-leader': { icon: MessageCircle, color: '#2563eb', label: 'Thought Leader' },
}

interface ExpertDetailModalProps {
  expert: Expert | null
  isOpen: boolean
  onClose: () => void
}

export default function ExpertDetailModal({ expert, isOpen, onClose }: ExpertDetailModalProps) {
  if (!isOpen || !expert) return null

  const endorsements = expert.endorsements || {}
  const maxEndorsement = Math.max(...Object.values(endorsements), 1)
  const requestCount = expert.requestCount || 0
  const highlights = expert.highlights || []
  const totalEndorsements = Object.values(endorsements).reduce((sum, count) => sum + count, 0)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="expert-detail-backdrop" onClick={handleBackdropClick}>
      <div className="expert-detail-modal">
        <button className="detail-close-button" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Hero Section */}
        <div className="detail-hero">
          <div className="detail-avatar">
            {expert.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="detail-identity">
            <h2 className="detail-name">{expert.name}</h2>
            <p className="detail-title">{expert.title}</p>
            <p className="detail-department">{expert.department}</p>
            <p className="detail-affiliate">{expert.affiliate}</p>
          </div>
        </div>

        {/* Flair Badges */}
        {expert.flair && expert.flair.length > 0 && (
          <div className="detail-flair">
            {expert.flair.map((f) => {
              const config = flairConfig[f]
              if (!config) return null
              const FlairIcon = config.icon
              return (
                <span 
                  key={f} 
                  className={`detail-flair-badge flair-${f}`}
                  style={{ '--flair-color': config.color } as React.CSSProperties}
                >
                  <FlairIcon size={14} />
                  {config.label}
                </span>
              )
            })}
          </div>
        )}

        {/* Stats Row */}
        <div className="detail-stats">
          <div className="stat-card">
            <Users size={20} />
            <span className="stat-value">{requestCount}</span>
            <span className="stat-label">Times Requested</span>
          </div>
          <div className="stat-card">
            <ThumbsUp size={20} />
            <span className="stat-value">{totalEndorsements}</span>
            <span className="stat-label">Endorsements</span>
          </div>
          <div className="stat-card">
            <Star size={20} />
            <span className="stat-value">{expert.skills.length}</span>
            <span className="stat-label">Skills</span>
          </div>
          {expert.responseTime && (
            <div className="stat-card">
              <Clock size={20} />
              <span className="stat-value">{expert.responseTime}</span>
              <span className="stat-label">Avg. Response</span>
            </div>
          )}
        </div>

        {/* Availability */}
        {expert.availability && (
          <div className="detail-availability">
            <Calendar size={16} />
            <span>{expert.availability}</span>
          </div>
        )}

        {/* Bio */}
        <div className="detail-section">
          <h3 className="detail-section-title">About</h3>
          <p className="detail-bio">{expert.bio}</p>
        </div>

        {/* Expert Highlights */}
        {highlights.length > 0 && (
          <div className="detail-section">
            <h3 className="detail-section-title">
              <Lightbulb size={16} />
              Why Work With Me
            </h3>
            <ul className="detail-highlights">
              {highlights.map((highlight, index) => (
                <li key={index} className="highlight-item">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Endorsements */}
        {Object.keys(endorsements).length > 0 && (
          <div className="detail-section">
            <h3 className="detail-section-title">
              <ThumbsUp size={16} />
              Skill Endorsements
            </h3>
            <div className="detail-endorsements">
              {Object.entries(endorsements)
                .sort(([, a], [, b]) => b - a)
                .map(([skill, count]) => (
                  <div key={skill} className="endorsement-row">
                    <span className="endorsement-skill">{skill}</span>
                    <div className="endorsement-bar-track">
                      <div 
                        className="endorsement-bar-fill"
                        style={{ width: `${(count / maxEndorsement) * 100}%` }}
                      />
                    </div>
                    <span className="endorsement-count">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Skills */}
        <div className="detail-section">
          <h3 className="detail-section-title">All Skills</h3>
          <div className="detail-skills">
            {expert.skills.map((skill) => (
              <span key={skill} className="detail-skill-tag">
                {skill}
                {endorsements[skill] && (
                  <span className="skill-endorsement-badge">{endorsements[skill]}</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="detail-actions">
          <a href={`mailto:${expert.email}`} className="detail-request-button">
            <Mail size={18} />
            Request Help from {expert.name.split(' ')[0]}
          </a>
        </div>
      </div>
    </div>
  )
}
