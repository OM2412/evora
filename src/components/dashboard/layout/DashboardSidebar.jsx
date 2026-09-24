import './DashboardSidebar.css'

function DashboardSidebar({
  activeLayers,
  setActiveLayers,

  stationCount,
  setStationCount,

  optimizationGoal,
  setOptimizationGoal,

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

            <span>
              Demand Potential
            </span>

          </div>

          <input
            type="checkbox"
            checked={activeLayers.demand}
            onChange={() =>
              toggleLayer('demand')
            }
          />

        </label>

        {/* RENEWABLE */}

        <label className="dashboard-layer">

          <div className="dashboard-layer__left">

            <span className="dashboard-layer__dot dashboard-layer__dot--yellow" />

            <span>
              Renewable Potential
            </span>

          </div>

          <input
            type="checkbox"
            checked={activeLayers.renewable}
            onChange={() =>
              toggleLayer('renewable')
            }
          />

        </label>

        {/* CHARGING GAP */}

        <label className="dashboard-layer">

          <div className="dashboard-layer__left">

            <span
              className="dashboard-layer__dot"
              style={{
                background: '#ff5f6d',
              }}
            />

            <span>
              Charging Gap
            </span>

          </div>

          <input
            type="checkbox"
            checked={activeLayers.chargingGap}
            onChange={() =>
              toggleLayer('chargingGap')
            }
          />

        </label>

        {/* EXISTING CHARGERS */}

        <label className="dashboard-layer">

          <div className="dashboard-layer__left">

            <span className="dashboard-layer__dot dashboard-layer__dot--cyan" />

            <span>
              Existing Chargers
            </span>

          </div>

          <input
            type="checkbox"
            checked={activeLayers.existingChargers}
            onChange={() =>
              toggleLayer('existingChargers')
            }
          />

        </label>

        {/* ACCESSIBILITY */}

        <label className="dashboard-layer">

          <div className="dashboard-layer__left">

            <span className="dashboard-layer__dot dashboard-layer__dot--purple" />

            <span>
              Accessibility
            </span>

          </div>

          <input
            type="checkbox"
            checked={activeLayers.accessibility}
            onChange={() =>
              toggleLayer('accessibility')
            }
          />

        </label>

        {/* CANDIDATE SITES */}

        <label className="dashboard-layer">

          <div className="dashboard-layer__left">

            <span className="dashboard-layer__dot dashboard-layer__dot--gray" />

            <span>
              Candidate Sites
            </span>

          </div>

          <input
            type="checkbox"
            checked={activeLayers.candidateSites}
            onChange={() =>
              toggleLayer('candidateSites')
            }
          />

        </label>

        {/* RECOMMENDED SITES */}

        <label className="dashboard-layer">

          <div className="dashboard-layer__left">

            <span className="dashboard-layer__dot dashboard-layer__dot--green" />

            <span>
              Recommended Sites
            </span>

          </div>

          <input
            type="checkbox"
            checked={activeLayers.recommendedSites}
            onChange={() =>
              toggleLayer('recommendedSites')
            }
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

          <span>
            New Stations
          </span>

          <div className="dashboard-sidebar__counter">

            <button
              type="button"
              disabled={isRunningAnalysis}
              onClick={() =>
                setStationCount(
                  (count) =>
                    Math.max(1, count - 1),
                )
              }
            >
              −
            </button>

            <strong>
              {stationCount}
            </strong>

            <button
              type="button"
              disabled={isRunningAnalysis}
              onClick={() =>
                setStationCount(
                  (count) =>
                    Math.min(10, count + 1),
                )
              }
            >
              +
            </button>

          </div>

        </div>

        {/* OPTIMIZATION GOAL */}

        <div className="dashboard-sidebar__field">

          <span>
            Optimization Goal
          </span>

          <select
            value={optimizationGoal}
            disabled={isRunningAnalysis}
            onChange={(event) =>
              setOptimizationGoal(
                event.target.value,
              )
            }
          >
            <option value="balanced">
              Balanced
            </option>

            <option value="demand">
              Demand Priority
            </option>

            <option value="renewable">
              Renewable Priority
            </option>

            <option value="coverage">
              Coverage Priority
            </option>
          </select>

        </div>

        {/* MINIMUM SPACING */}

        <div className="dashboard-sidebar__field">

          <span>
            Minimum Site Spacing
          </span>

          <select
            value={minimumSpacing}
            disabled={isRunningAnalysis}
            onChange={(event) =>
              setMinimumSpacing(
                event.target.value,
              )
            }
          >
            <option value="1">
              1 km
            </option>

            <option value="2">
              2 km
            </option>

            <option value="3">
              3 km
            </option>
          </select>

        </div>

        {/* RUN ANALYSIS */}

        <button
          type="button"
          className="dashboard-sidebar__run"
          onClick={onRunAnalysis}
          disabled={isRunningAnalysis}
        >
          {isRunningAnalysis
            ? 'Analyzing...'
            : 'Run Site Analysis'}
        </button>

      </div>

    </aside>
  )
}

export default DashboardSidebar