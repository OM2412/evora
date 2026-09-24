import './DashboardSummary.css'

function DashboardSummary({
  candidateCount,
  recommendedCount,
  decisionFactorCount,
  optimizationGoal,
  minimumSpacing,
  isRunningAnalysis,
}) {
  const formatGoal = (goal) => {
    const labels = {
      balanced: 'Balanced',
      demand: 'Demand Priority',
      renewable: 'Renewable Priority',
      coverage: 'Coverage Priority',
    }

    return labels[goal] || 'Balanced'
  }

  return (
    <div className="dashboard-summary">

      <div className="dashboard-summary__item">
        <span>
          Candidate Sites
        </span>

        <strong>
          {candidateCount}
        </strong>
      </div>

      <div className="dashboard-summary__divider" />

      <div className="dashboard-summary__item">
        <span>
          Recommended
        </span>

        <strong>
          {recommendedCount}
        </strong>
      </div>

      <div className="dashboard-summary__divider" />

      <div className="dashboard-summary__item">
        <span>
          Decision Factors
        </span>

        <strong>
          {decisionFactorCount}
        </strong>
      </div>

      <div className="dashboard-summary__divider" />

      <div className="dashboard-summary__item dashboard-summary__item--wide">
        <span>
          Optimization
        </span>

        <strong>
          {formatGoal(optimizationGoal)}
        </strong>
      </div>

      <div className="dashboard-summary__divider" />

      <div className="dashboard-summary__item">
        <span>
          Min. Spacing
        </span>

        <strong>
          {minimumSpacing} km
        </strong>
      </div>

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
          <span>
            Analysis Status
          </span>

          <strong>
            {isRunningAnalysis
              ? 'Running'
              : 'Ready'}
          </strong>
        </div>
      </div>

    </div>
  )
}

export default DashboardSummary