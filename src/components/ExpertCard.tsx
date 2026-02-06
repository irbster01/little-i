import type { Expert } from './ExpertDirectory'
import { Award, Star, UserPlus, Check, Zap, TrendingUp, MessageCircle, Sparkles, Heart } from 'lucide-react'
import './ExpertCard.css'

const flairConfig: Record<string, { icon: typeof Zap; color: string; label: string }> = {
  responsive: { icon: Zap, color: '#16a34a', label: 'Responsive' },
  'frequently-requested': { icon: TrendingUp, color: '#ea580c', label: 'Frequently Requested' },
  'rising-star': { icon: Sparkles, color: '#8b5cf6', label: 'Rising Star' },
  'top-contributor': { icon: Award, color: '#0891b2', label: 'Top Contributor' },
  'mentor': { icon: Heart, color: '#db2777', label: 'Mentor' },
  'thought-leader': { icon: MessageCircle, color: '#2563eb', label: 'Thought Leader' },
}

interface ExpertCardProps {
  expert: Expert
  matchType?: 'best' | 'recommended' | null
  onNominate: () => void
  isNominated: boolean
}

export default function ExpertCard({ expert, matchType, onNominate, isNominated }: ExpertCardProps) {
  return (
    <div className={`expert-card ${matchType ? `match-${matchType}` : ''}`}>
      {matchType && (
        <div className={`match-badge ${matchType}`}>
          {matchType === 'best' ? (
            <>
              <Award size={14} />
              <span>Best Match</span>
            </>
          ) : (
            <>
              <Star size={14} />
              <span>Recommended</span>
            </>
          )}
        </div>
      )}
      <div className="expert-header">
        <div className="expert-avatar">
          {expert.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="expert-info">
          <h3 className="expert-name">{expert.name}</h3>
          <p className="expert-title">{expert.title}</p>
          <p className="expert-department">{expert.department}</p>
          <p className="expert-affiliate">{expert.affiliate}</p>
        </div>
      </div>
      <div className="expert-bio">
        <p>{expert.bio}</p>
      </div>
      {expert.flair && expert.flair.length > 0 && (
        <div className="expert-flair">
          {expert.flair.map((f) => {
            const config = flairConfig[f]
            if (!config) return null
            const FlairIcon = config.icon
            return (
              <span 
                key={f} 
                className={`flair-badge flair-${f}`}
                style={{ '--flair-color': config.color } as React.CSSProperties}
              >
                <FlairIcon size={12} />
                {config.label}
              </span>
            )
          })}
        </div>
      )}
      <div className="expert-skills">
        {expert.skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
      <div className="expert-footer">
        <a href={`mailto:${expert.email}`} className="contact-button">
          Contact
        </a>
        <button 
          onClick={onNominate} 
          className={`nominate-button ${isNominated ? 'nominated' : ''}`}
          disabled={isNominated}
        >
          {isNominated ? (
            <>
              <Check size={16} />
              Nominated
            </>
          ) : (
            <>
              <UserPlus size={16} />
              Nominate
            </>
          )}
        </button>
      </div>
    </div>
  )
}
