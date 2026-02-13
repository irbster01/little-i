import './Header.css'

// Embedded logo SVG - village/house theme
const LOGO_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23b91c1c' stroke='white' stroke-width='2'/%3E%3Cpath d='M15,60 L50,25 L85,60' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Crect x='30' y='60' width='40' height='25' fill='white'/%3E%3Cpath d='M50,25 L50,15' stroke='white' stroke-width='3'/%3E%3C/svg%3E`

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
              src={LOGO_SVG} 
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
