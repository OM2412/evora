import './SiteDetailPanel.css'

function SiteDetailPanel({
  site,
  safetyChecks = {},
  onToggleSafetyCheck,
  isDisqualified = false,
}) {
  if (!site) {
    return (
      <aside className="site-detail-panel">
        <div className="site-detail-panel__empty">
          <span>SITE INTELLIGENCE</span>
          <p>
            Select a recommended site from the map
            to inspect its suitability factors.
          </p>
        </div>
      </aside>
    )
  }

  const factors = [
    { label: 'demand potential', value: site.demandScore },
    { label: 'road accessibility', value: site.accessibilityScore },
    { label: 'charging coverage gap', value: site.chargingGapScore },
    { label: 'renewable integration potential', value: site.renewableScore },
  ]

  const strongestFactors = [...factors]
    .sort((firstFactor, secondFactor) => secondFactor.value - firstFactor.value)
    .slice(0, 2)

  const recommendationReason = isDisqualified
    ? `${site.name} has been disqualified from recommendation due to a critical safety or site feasibility failure.`
    : `${site.name} performs strongly in ${strongestFactors[0].label} and ${strongestFactors[1].label}, while satisfying spatial spacing constraints.`

  const safetyItems = [
    { key: 'electrical', label: 'Electrical protection & earthing' },
    { key: 'fire', label: 'Fire safety arrangements' },
    { key: 'security', label: 'Physical security & lighting' },
    { key: 'access', label: 'Emergency road access' },
    { key: 'zoning', label: 'Ownership & zoning feasibility' },
  ]

  return (
    <aside className="site-detail-panel">
      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="site-detail-panel__header">
        <span
          className="site-detail-panel__eyebrow"
          style={{ color: isDisqualified ? '#ff5f6d' : undefined }}
        >
          {isDisqualified
            ? 'DISQUALIFIED (SAFETY FAILURE)'
            : site.recommendationRank
            ? 'RECOMMENDED SITE'
            : 'CANDIDATE SITE'}
        </span>
        <div className="site-detail-panel__title-row">
          <div>
            <h2>{site.id}</h2>
            <p>{site.name}</p>
          </div>
          <span className="site-detail-panel__rank">
            #{site.recommendationRank || site.rank}
          </span>
        </div>
        <span className="site-detail-panel__location">
          {site.area}, Gwalior
          {site.nearestExistingKm != null
            ? ` · ${site.nearestExistingKm} km to nearest charger`
            : ''}
        </span>
      </div>

      {/* ==========================================
          SUITABILITY SCORE
      ========================================== */}
      <div className="site-detail-panel__score">
        <strong>{site.overallScore}</strong>
        <div>
          <span>Suitability</span>
          <span>Index</span>
        </div>
      </div>

      {/* ==========================================
          DECISION FACTORS
      ========================================== */}
      <div className="site-detail-panel__section">
        <span className="site-detail-panel__section-label">
          DECISION FACTORS
        </span>
        <ScoreBar
          label="Demand Potential"
          score={site.demandScore}
          weightPct={site.activeWeights?.demand}
        />
        <ScoreBar
          label="Accessibility"
          score={site.accessibilityScore}
          weightPct={site.activeWeights?.accessibility}
        />
        <ScoreBar
          label="Charging Gap"
          score={site.chargingGapScore}
          weightPct={site.activeWeights?.chargingGap}
        />
        <ScoreBar
          label="Renewable Potential"
          score={site.renewableScore}
          weightPct={site.activeWeights?.renewable}
        />
      </div>

      {/* ==========================================
          EXPLANATION
      ========================================== */}
      <div className="site-detail-panel__section">
        <span className="site-detail-panel__section-label">
          WHY RECOMMENDED
        </span>
        <p className="site-detail-panel__reason">
          {recommendationReason}
        </p>
      </div>

      {/* ==========================================
          SAFETY & SITE FEASIBILITY (INTERACTIVE)
      ========================================== */}
      <div className="site-detail-panel__section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="site-detail-panel__section-label">
            SAFETY & SITE FEASIBILITY
          </span>
          <span style={{ fontSize: '10px', color: '#9ca3af' }}>
            Click badge to verify
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          {safetyItems.map((item) => (
            <SafetyRow
              key={item.key}
              label={item.label}
              status={safetyChecks[item.key] || 'Pending'}
              onClick={() => onToggleSafetyCheck && onToggleSafetyCheck(item.key)}
            />
          ))}
        </div>
      </div>

      {/* ==========================================
          VALIDATION
      ========================================== */}
      <div className="site-detail-panel__section">
        <span className="site-detail-panel__section-label">
          VALIDATION REQUIRED
        </span>
        <div className="site-detail-panel__note">
          <span className="site-detail-panel__note-dot" />
          <p>Grid capacity & parcel availability require field validation.</p>
        </div>
      </div>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <div className="site-detail-panel__footer">
        <span>Prototype recommendation</span>
        <strong>{site.id}</strong>
      </div>
    </aside>
  )
}

function ScoreBar({ label, score, weightPct }) {
  return (
    <div className="site-score-bar">
      <div className="site-score-bar__header">
        <span>
          {label} {weightPct ? `(${weightPct}%)` : ''}
        </span>
        <strong>{score}</strong>
      </div>
      <div className="site-score-bar__track">
        <div
          className="site-score-bar__fill"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function SafetyRow({ label, status, onClick }) {
  const styles = {
    Verified: {
      color: '#72f595',
      bg: 'rgba(114, 245, 149, 0.15)',
    },
    Pending: {
      color: '#f4da64',
      bg: 'rgba(244, 218, 100, 0.15)',
    },
    'Not Suitable': {
      color: '#ff5f6d',
      bg: 'rgba(255, 95, 109, 0.18)',
    },
  }

  const currentStyle = styles[status] || styles.Pending

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        padding: '8px 10px',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <span style={{ color: '#d1d5db' }}>{label}</span>
      <span
        style={{
          color: currentStyle.color,
          fontWeight: '700',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          backgroundColor: currentStyle.bg,
          padding: '3px 6px',
          borderRadius: '4px',
        }}
      >
        {status}
      </span>
    </div>
  )
}

export default SiteDetailPanel