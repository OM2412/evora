import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
  <Link to="/" className="navbar__brand">
  EVORA
</Link>
<nav className="navbar__links" aria-label="Primary navigation">
  <a href="#overview">Overview</a>
  <a href="#intelligence">Intelligence</a>
  <a href="#methodology">Methodology</a>
</nav>
<Link to="/decision-map" className="navbar__cta">
  Explore Map
  <span aria-hidden="true">→</span>
</Link>
</div>
    </header>
  )
}

export default Navbar