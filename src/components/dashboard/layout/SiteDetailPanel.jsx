import './SiteDetailPanel.css'

function SiteDetailPanel({ site }) {
  /* --------------------------------------------------
     EMPTY STATE
  -------------------------------------------------- */

  if (!site) {
    return (
      <aside className="site-detail-panel">

        <div className="site-detail-panel__empty">

          <span>
            SITE INTELLIGENCE
          </span>

          <p>
            Select a recommended site from the map
            to inspect its suitability factors.
          </p>

        </div>

      </aside>
    )
  }

  /* --------------------------------------------------
     GENERATE EXPLAINABLE RECOMMENDATION
  -------------------------------------------------- */

  const factors = [
    {
      label: 'demand potential',
      value: site.demandScore,
    },
    {
      label: 'road accessibility',
      value: site.accessibilityScore,
    },
    {
      label: 'charging coverage gap',
      value: site.chargingGapScore,
    },
    {
      label: 'renewable integration potential',
      value: site.renewableScore,
    },
  ]

  const strongestFactors = [...factors]
    .sort(
      (firstFactor, secondFactor) =>
        secondFactor.value - firstFactor.value,
    )
    .slice(0, 2)

  const recommendationReason =
    `${site.name} performs strongly in ` +
    `${strongestFactors[0].label} and ` +
    `${strongestFactors[1].label}, while satisfying ` +
    `the current spatial selection constraints.`

  return (
    <aside className="site-detail-panel">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="site-detail-panel__header">

        <span className="site-detail-panel__eyebrow">
          RECOMMENDED SITE
        </span>

        <div className="site-detail-panel__title-row">

          <div>

            <h2>
              {site.id}
            </h2>

            <p>
              {site.name}
            </p>

          </div>

          <span className="site-detail-panel__rank">
            #{site.recommendationRank}
          </span>

        </div>

        <span className="site-detail-panel__location">
          {site.area}, Gwalior
        </span>

      </div>

      {/* ==========================================
          SUITABILITY SCORE
      ========================================== */}

      <div className="site-detail-panel__score">

        <strong>
          {site.overallScore}
        </strong>

        <div>
          <span>
            Suitability
          </span>

          <span>
            Index
          </span>
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
        />

        <ScoreBar
          label="Accessibility"
          score={site.accessibilityScore}
        />

        <ScoreBar
          label="Charging Gap"
          score={site.chargingGapScore}
        />

        <ScoreBar
          label="Renewable Potential"
          score={site.renewableScore}
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
          VALIDATION
      ========================================== */}

      <div className="site-detail-panel__section">

        <span className="site-detail-panel__section-label">
          VALIDATION REQUIRED
        </span>

        <div className="site-detail-panel__note">

          <span className="site-detail-panel__note-dot" />

          <p>
            Grid capacity requires field validation.
          </p>

        </div>

        <div className="site-detail-panel__note">

          <span className="site-detail-panel__note-dot" />

          <p>
            Parcel and parking availability require
            site-level verification.
          </p>

        </div>

      </div>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="site-detail-panel__footer">

        <span>
          Prototype recommendation
        </span>

        <strong>
          {site.id}
        </strong>

      </div>

    </aside>
  )
}

/* =====================================================
   SCORE BAR COMPONENT
===================================================== */

function ScoreBar({
  label,
  score,
}) {
  return (
    <div className="site-score-bar">

      <div className="site-score-bar__header">

        <span>
          {label}
        </span>

        <strong>
          {score}
        </strong>

      </div>

      <div className="site-score-bar__track">

        <div
          className="site-score-bar__fill"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  )
}

export default SiteDetailPanel