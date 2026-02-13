import './WelcomeView.css'

interface WelcomeViewProps {
  onSeekWisdom: () => void
  onContribute: () => void
  onShareConsultant: () => void
}

// Icons
const UserSearch = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10" cy="8" r="5"></circle>
    <path d="M2 21c0-3.5 3-6 8-6"></path>
    <circle cx="18" cy="18" r="3"></circle>
    <path d="m22 22-1.5-1.5"></path>
  </svg>
)

const UserPlus = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <line x1="19" x2="19" y1="8" y2="14"></line>
    <line x1="22" x2="16" y1="11" y2="11"></line>
  </svg>
)

const Briefcase = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
)

export default function WelcomeView({ onSeekWisdom, onContribute, onShareConsultant }: WelcomeViewProps) {
  return (
    <div className="welcome-view">
      <div className="welcome-content">
        <img src="/logo.svg" className="welcome-logo" alt="VOA Expertise Village Logo" />
        <h1 className="welcome-title">VOA Expertise Village</h1>
        <p className="welcome-tagline">It takes a village, sharing our collective knowledge.</p>
        
        <div className="role-cards">
          <button onClick={onSeekWisdom} className="role-card role-card-seek">
            <div className="role-icon">
              <UserSearch />
            </div>
            <h2 className="role-title">Seek Wisdom</h2>
            <p className="role-description">Locate skills and knowledge within our network.</p>
          </button>

          <button onClick={onContribute} className="role-card role-card-contribute">
            <div className="role-icon">
              <UserPlus />
            </div>
            <h2 className="role-title">Contribute to the Village</h2>
            <p className="role-description">Offer specific expertise and availability to help colleagues succeed.</p>
          </button>

          <button onClick={onShareConsultant} className="role-card role-card-nominate">
            <div className="role-icon">
              <Briefcase />
            </div>
            <h2 className="role-title">Share a Trusted Consultant</h2>
            <p className="role-description">Add trusted external partners to the village.</p>
          </button>
        </div>

        <div className="disclaimer">
          <strong className="disclaimer-title">Important Disclaimer</strong>
          <p className="disclaimer-text">
            VOA Expertise Village facilitates voluntary knowledge sharing across our network. 
            Before listing your expertise or providing consultation, please ensure you have approval 
            from your supervisor and CEO to provide support. This platform is informational only 
            and does not create formal work assignments or obligations.
          </p>
        </div>
      </div>
    </div>
  )
}
