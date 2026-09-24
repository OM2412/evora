import { Link } from 'react-router-dom'
import './DashboardTopbar.css'

function DashboardTopbar() {
  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar__left">
        <Link to="/" className="dashboard-topbar__brand">
          EVORA
        </Link>

        <span className="dashboard-topbar__divider"></span>

        <span className="dashboard-topbar__page">
          Decision Map
        </span>
      </div>

      <div className="dashboard-topbar__location">
        <span className="dashboard-topbar__location-dot"></span>

        <div>
          <span>Study Area</span>
          <strong>Gwalior, Madhya Pradesh</strong>
        </div>
      </div>

      <div className="dashboard-topbar__right">
        <span className="dashboard-topbar__prototype">
          Research Prototype
        </span>

        <Link to="/" className="dashboard-topbar__back">
          ← Back to Overview
        </Link>
      </div>
    </header>
  )
}

export default DashboardTopbar