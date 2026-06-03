import './Header.css'

export default function Header({ activePage = 'Home', onNavigate = () => {} }) {
  return (
    <header className="site-header">
      <div className="brand">
        <h1>Acme Bank</h1>
      </div>
      <nav className="header-nav" aria-label="Main navigation">
        <ul>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('Home')
              }}
              className={activePage === 'Home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('About')
              }}
              className={activePage === 'About' ? 'active' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('Contact')
              }}
              className={activePage === 'Contact' ? 'active' : ''}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('Data')
              }}
              className={activePage === 'Data' ? 'active' : ''}
            >
              Data
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
