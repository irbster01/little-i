import type { Expert } from './ExpertDirectory'
import './ExpertCard.css'

interface ExpertCardProps {
  expert: Expert
}

export default function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="expert-card">
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
      </div>
    </div>
  )
}
