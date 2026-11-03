import './DashboardSidebar.css'

function DashboardSidebar({
  activeLayers,
  setActiveLayers,

  stationCount,
  setStationCount,

  optimizationGoal,
  setOptimizationGoal,

  customWeights,
  setCustomWeights,

  minimumSpacing,
  setMinimumSpacing,

  onRunAnalysis,
  isRunningAnalysis,
}) {
  const toggleLayer = (layerName) => {
    setActiveLayers((currentLayers) => ({
      ...currentLayers,
      [layerName]: !currentLayers[layerName],
    }))
  }

  const handleWeightSliderChange = (factor, value) => {
    setOptimizationGoal('custom')
    setCustomWeights((prev) => ({
      ...prev,
      [factor]: Number(value),
    }))
  }

  const totalRawWeight =
    (customWeights?.demand || 0) +
    (customWeights?.accessibility || 0) +
    (customWeights?.chargingGap || 0) +
    (customWeights?.renewable || 0)

  const getNormalizedPct = (val) => {
    if (!totalRawWeight) return 25
    return Math.round(((val || 0) / totalRawWeight) * 100)
  }

  return (
    <aside className="dashboard-sidebar">
      {/* ==========================================
          ANALYSIS LAYERS
      ========================================== */}
      <div className="dashboard-sidebar__section">
        <span className="dashboard-sidebar__label">
          ANALYSIS LAYERS
        </span>

        {/* DEMAND */}
        <label className="dashboard-layer">
          <div className="dashboard-layer__left">
            <span className="dashboard-layer__dot dashboard-layer__dot--orange" />
            <span>Demand Potential</span>
          </div>
          <input
            type="checkbox"
            checked={activeLayers.demand}
            onChange={() => toggleLayer('demand')}
          />
        </label>

        {/* RENEWABLE */}
        <label className="dashboard-layer">
          <div className="dashboard-layer__left">
            <span className="dashboard-layer__dot dashboard-layer__dot--yellow" />
            <span>Renewable Potential</span>
          </div>
          <input
            type="checkbox"
            checked={activeLayers.renewable}
            onChange={() => toggleLayer('renewable')}
          />
        </label>

        {/* CHARGING GAP */}
        <label className="dashboard-layer">
          <div className="dashboard-layer__left">
            <span
              className="dashboard-layer__dot"
              style={{ background: '#ff5f6d' }}
            />
            <span>Charging Gap</span>
          </div>
          <input
            type="checkbox"
            checked={activeLayers.chargingGap}
            onChange={() => toggleLayer('chargingGap')}
          />
        </label>

        {/* EXISTING CHARGERS */}
        <label className="dashboard-layer">
          <div className="dashboard-layer__left">
            <span className="dashboard-layer__dot dashboard-layer__dot--cyan" />
            <span>Existing Chargers</span>
          </div>
          <input
            type="checkbox"
            checked={activeLayers.existingChargers}
            onChange={() => toggleLayer('existingChargers')}
          />
        </label>

        {/* ACCESSIBILITY */}
        <label className="dashboard-layer">
          <div className="dashboard-layer__left">
            <span className="dashboard-layer__dot dashboard-layer__dot--purple" />
            <span>Accessibility</span>
          </div>
          <input
            type="checkbox"
            checked={activeLayers.accessibility}
            onChange={() => toggleLayer('accessibility')}
          />
        </label>

        {/* CANDIDATE SITES */}
        <label className="dashboard-layer">
          <div className="dashboard-layer__left">
            <span className="dashboard-layer__dot dashboard-layer__dot--gray" />
            <span>Candidate Sites</span>
          </div>
          <input
            type="checkbox"
            checked={activeLayers.candidateSites}
            onChange={() => toggleLayer('candidateSites')}
          />
        </label>

        {/* RECOMMENDED SITES */}
        <label className="dashboard-layer">
          <div className="dashboard-layer__left">
            <span className="dashboard-layer__dot dashboard-layer__dot--green" />
            <span>Recommended Sites</span>
          </div>
          <input
            type="checkbox"
            checked={activeLayers.recommendedSites}
            onChange={() => toggleLayer('recommendedSites')}
          />
        </label>
      </div>

      {/* ==========================================
          SCENARIO
      ========================================== */}
      <div className="dashboard-sidebar__section dashboard-sidebar__scenario">
        <span className="dashboard-sidebar__label">
          SCENARIO
        </span>

        {/* NEW STATIONS */}
        <div className="dashboard-sidebar__field">
          <span>New Stations</span>
          <div className="dashboard-sidebar__counter">
            <button
              type="button"
              disabled={isRunningAnalysis}
              onClick={() =>
                setStationCount((count) => Math.max(1, count - 1))
              }
            >
              −
            </button>
            <strong>{stationCount}</strong>
            <button
              type="button"
              disabled={isRunningAnalysis}
              onClick={() =>
                setStationCount((count) => Math.min(10, count + 1))
              }
            >
              +
            </button>
          </div>
        </div>

        {/* OPTIMIZATION GOAL */}
        <div className="dashboard-sidebar__field">
          <span>Optimization Goal</span>
          <select
            value={optimizationGoal}
            disabled={isRunningAnalysis}
            onChange={(event) =>
              setOptimizationGoal(event.target.value)
            }
          >
            <option value="balanced">Balanced</option>
            <option value="demand">Demand Priority</option>
            <option value="renewable">Renewable Priority</option>
            <option value="coverage">Coverage Priority</option>
            <option value="custom">Custom Weights (MCDA)</option>
          </select>
        </div>

        {/* LIVE MCDA WEIGHT SLIDERS */}
        {customWeights && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.07)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10px',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              <span>MCDA Factor Weights</span>
              <span style={{ color: '#72f595' }}>Normalized 100%</span>
            </div>

            {[
              { key: 'demand', label: 'Demand', color: '#ff7657' },
              { key: 'accessibility', label: 'Accessibility', color: '#9d8cff' },
              { key: 'chargingGap', label: 'Charging Gap', color: '#ff5f6d' },
              { key: 'renewable', label: 'Solar / Renewable', color: '#f4da64' },
            ].map((factor) => (
              <div key={factor.key} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: '#d1d5db' }}>{factor.label}</span>
                  <strong style={{ color: factor.color }}>
                    {getNormalizedPct(customWeights[factor.key])}%
                  </strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  disabled={isRunningAnalysis}
                  value={customWeights[factor.key]}
                  onChange={(e) => handleWeightSliderChange(factor.key, e.target.value)}
                  style={{ width: '100%', accentColor: factor.color, cursor: 'pointer', height: '4px' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* MINIMUM SPACING */}
        <div className="dashboard-sidebar__field">
          <span>Minimum Site Spacing</span>
          <select
            value={minimumSpacing}
            disabled={isRunningAnalysis}
            onChange={(event) =>
              setMinimumSpacing(event.target.value)
            }
          >
            <option value="1">1 km</option>
            <option value="2">2 km</option>
            <option value="3">3 km</option>
          </select>
        </div>

        {/* RUN ANALYSIS */}
        <button
          type="button"
          className="dashboard-sidebar__run"
          onClick={onRunAnalysis}
          disabled={isRunningAnalysis}
        >
          {isRunningAnalysis ? 'Analyzing...' : 'Run Site Analysis'}
        </button>
      </div>
    </aside>
  )
}

export default DashboardSidebar