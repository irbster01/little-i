import type { Expert } from './ExpertDirectory'
import { Award, Star, UserPlus, Check } from 'lucide-react'
import './ExpertCard.css'

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
