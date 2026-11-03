import { Link } from 'react-router-dom'
import { mpRegions, plannedExpansionCities } from '../../../data/mpRegions'
import './DashboardTopbar.css'

function DashboardTopbar({
  selectedRegionId = 'gwalior',
  onSelectRegion,
  onExportReport,
}) {
  const activeRegion = mpRegions[selectedRegionId] || mpRegions.gwalior

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

        <span
          style={{
            marginLeft: '8px',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor:
              activeRegion.scenarioType === 'highway'
                ? 'rgba(244, 218, 100, 0.16)'
                : 'rgba(82, 214, 255, 0.14)',
            color:
              activeRegion.scenarioType === 'highway'
                ? '#f4da64'
                : '#52d6ff',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {activeRegion.scenarioType === 'highway'
            ? 'Highway Corridor (25 km)'
            : 'Urban Cluster (3 km)'}
        </span>
      </div>

      {/* MULTI-CITY MP & CORRIDOR SELECTOR */}
      <div className="dashboard-topbar__location">
        <span className="dashboard-topbar__location-dot"></span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span>Study Area · MP Expansion</span>
          <select
            value={selectedRegionId}
            onChange={(e) =>
              onSelectRegion && onSelectRegion(e.target.value)
            }
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none',
              padding: 0,
            }}
          >
            <optgroup label="Active & Simulated Regions (MP)" style={{ background: '#111615', color: '#9ca3af' }}>
              {Object.values(mpRegions).map((region) => (
                <option
                  key={region.id}
                  value={region.id}
                  style={{ background: '#111615', color: '#ffffff' }}
                >
                  {region.name}, {region.state} ({region.status})
                </option>
              ))}
            </optgroup>
            <optgroup label="Phase 2 Pipeline (Data Ingestion Pending)" style={{ background: '#111615', color: '#9ca3af' }}>
              {plannedExpansionCities.map((city) => (
                <option
                  key={city.id}
                  value={city.id}
                  disabled
                  style={{ background: '#111615', color: '#6b7280' }}
                >
                  {city.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      <div className="dashboard-topbar__right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {onExportReport && (
          <button
            type="button"
            onClick={onExportReport}
            style={{
              background: 'rgba(114, 245, 149, 0.12)',
              color: '#72f595',
              border: '1px solid rgba(114, 245, 149, 0.35)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Export ranked sites, MCDA scores, and safety verification checklist as CSV"
          >
            ↓ Export CSV Report
          </button>
        )}

        <span className="dashboard-topbar__prototype">
          {activeRegion.status}
        </span>

        <Link to="/" className="dashboard-topbar__back">
          ← Back to Overview
        </Link>
      </div>
    </header>
  )
}

export default DashboardTopbar