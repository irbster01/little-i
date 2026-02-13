import './Header.css'

interface HeaderProps {
  onHomeClick?: () => void
}

export default function Header({ onHomeClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <img 
              src="/logo.svg" 
              alt="VOA Expertise Village" 
              className="header-logo" 
              onClick={onHomeClick}
              style={{ cursor: onHomeClick ? 'pointer' : 'default' }}
            />
            <div className="header-text">
              <h1 className="header-title">VOA Expertise Village</h1>
            </div>
          </div>
          {onHomeClick && (
            <button className="header-home-btn" onClick={onHomeClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Village Square
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
