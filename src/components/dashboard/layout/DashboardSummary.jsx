import './DashboardSummary.css'

function DashboardSummary({
  candidateCount,
  recommendedCount,
  optimizationGoal,
  minimumSpacing,
  validationMetrics,
  disqualifiedCount = 0,
  isRunningAnalysis,
}) {
  const formatGoal = (goal) => {
    const labels = {
      balanced: 'Balanced',
      demand: 'Demand Priority',
      renewable: 'Renewable Priority',
      coverage: 'Coverage Priority',
      custom: 'Custom MCDA',
    }

    return labels[goal] || 'Balanced'
  }

  return (
    <div className="dashboard-summary">
      <div className="dashboard-summary__item">
        <span>Candidates</span>
        <strong>
          {candidateCount}
          {disqualifiedCount > 0 ? ` (${disqualifiedCount} excl.)` : ''}
        </strong>
      </div>

      <div className="dashboard-summary__divider" />

      <div className="dashboard-summary__item">
        <span>Recommended</span>
        <strong style={{ color: '#72f595' }}>{recommendedCount}</strong>
      </div>

      <div className="dashboard-summary__divider" />

      <div className="dashboard-summary__item dashboard-summary__item--wide">
        <span>Optimization</span>
        <strong>{formatGoal(optimizationGoal)} ({minimumSpacing} km)</strong>
      </div>

      {validationMetrics && (
        <>
          <div className="dashboard-summary__divider" />

          <div className="dashboard-summary__item dashboard-summary__item--wide">
            <span>Demand Covered (2.5km)</span>
            <strong>
              {validationMetrics.demandCoveredBeforePct}% →{' '}
              <span style={{ color: '#72f595' }}>
                {validationMetrics.demandCoveredAfterPct}% (+{validationMetrics.coverageGainPct}%)
              </span>
            </strong>
          </div>

          <div className="dashboard-summary__divider" />

          <div className="dashboard-summary__item">
            <span>Avg Charger Dist</span>
            <strong>
              {validationMetrics.avgDistBeforeKm} → {validationMetrics.avgDistAfterKm} km
            </strong>
          </div>

          <div className="dashboard-summary__divider" />

          <div className="dashboard-summary__item">
            <span>Portfolio Solar</span>
            <strong style={{ color: '#f4da64' }}>
              {validationMetrics.avgRenewableScore}/100
            </strong>
          </div>
        </>
      )}

      <div className="dashboard-summary__divider" />

      <div className="dashboard-summary__status">
        <span
          className={`dashboard-summary__status-dot ${
            isRunningAnalysis
              ? 'dashboard-summary__status-dot--running'
              : ''
          }`}
        />
        <div>
          <span>Analysis Status</span>
          <strong>{isRunningAnalysis ? 'Running' : 'Ready'}</strong>
        </div>
      </div>
    </div>
  )
}

export default DashboardSummary