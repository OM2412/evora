import { useState } from 'react'

import DashboardTopbar from '../components/dashboard/layout/DashboardTopbar'
import DashboardSidebar from '../components/dashboard/layout/DashboardSidebar'
import SiteDetailPanel from '../components/dashboard/layout/SiteDetailPanel'
import DashboardSummary from '../components/dashboard/layout/DashboardSummary'
import MapCanvas from '../components/dashboard/MapCanvas'

import candidateSites from '../data/candidateSites'

import {
  rankCandidateSites,
} from '../utils/siteScoring'

import {
  selectRecommendedSites,
} from '../utils/siteOptimization'

import './DecisionMapPage.css'

function DecisionMapPage() {
  /* ==================================================
     MAP LAYERS
  ================================================== */

  const [activeLayers, setActiveLayers] = useState({
    demand: true,
    renewable: false,
    chargingGap: false,
    existingChargers: true,
    accessibility: false,
    candidateSites: true,
    recommendedSites: true,
  })

  /* ==================================================
     DRAFT SCENARIO
  ================================================== */

  const [stationCount, setStationCount] = useState(5)

  const [optimizationGoal, setOptimizationGoal] =
    useState('balanced')

  const [minimumSpacing, setMinimumSpacing] =
    useState('2')

  /* ==================================================
     APPLIED SCENARIO
  ================================================== */

  const [appliedScenario, setAppliedScenario] = useState({
    stationCount: 5,
    optimizationGoal: 'balanced',
    minimumSpacing: 2,
  })

  /* ==================================================
     SELECTED SITE
  ================================================== */

  const [selectedSite, setSelectedSite] =
    useState(null)

  /* ==================================================
     ANALYSIS STATUS
  ================================================== */

  const [isRunningAnalysis, setIsRunningAnalysis] =
    useState(false)

  /* ==================================================
     SCORE + RANK CANDIDATES
  ================================================== */

  const rankedSites = rankCandidateSites(
    candidateSites,
    appliedScenario.optimizationGoal,
  )

  /* ==================================================
     SPATIAL OPTIMIZATION
  ================================================== */

  const recommendedSites =
    selectRecommendedSites(
      rankedSites,
      appliedScenario.stationCount,
      appliedScenario.minimumSpacing,
    )

  /* ==================================================
     ACTIVE RIGHT PANEL SITE
  ================================================== */

  const currentSelectedSite =
    recommendedSites.find(
      (site) => site.id === selectedSite?.id,
    ) ||
    recommendedSites[0] ||
    null

  /* ==================================================
     RUN ANALYSIS
  ================================================== */

  const handleRunAnalysis = () => {
    setIsRunningAnalysis(true)

    setTimeout(() => {
      setAppliedScenario({
        stationCount,
        optimizationGoal,
        minimumSpacing: Number(minimumSpacing),
      })

      setSelectedSite(null)

      setIsRunningAnalysis(false)
    }, 700)
  }

  return (
    <div className="decision-map-page">

      {/* ================= TOPBAR ================= */}

      <DashboardTopbar />

      {/* ================= WORKSPACE ================= */}

      <div className="decision-map-page__workspace">

        {/* LEFT CONTROL PANEL */}

        <DashboardSidebar
          activeLayers={activeLayers}
          setActiveLayers={setActiveLayers}

          stationCount={stationCount}
          setStationCount={setStationCount}

          optimizationGoal={optimizationGoal}
          setOptimizationGoal={setOptimizationGoal}

          minimumSpacing={minimumSpacing}
          setMinimumSpacing={setMinimumSpacing}

          onRunAnalysis={handleRunAnalysis}

          isRunningAnalysis={isRunningAnalysis}
        />

        {/* MAP */}

        <main className="decision-map-page__map">

          <MapCanvas
            activeLayers={activeLayers}
            rankedSites={rankedSites}
            recommendedSites={recommendedSites}
            onSelectSite={setSelectedSite}
            isRunningAnalysis={isRunningAnalysis}
          />

        </main>

        {/* RIGHT SITE INTELLIGENCE PANEL */}

        <SiteDetailPanel
          site={currentSelectedSite}
        />

      </div>

      {/* ================= BOTTOM SUMMARY ================= */}

      <DashboardSummary
        candidateCount={candidateSites.length}
        recommendedCount={recommendedSites.length}
        decisionFactorCount={4}
        optimizationGoal={
          appliedScenario.optimizationGoal
        }
        minimumSpacing={
          appliedScenario.minimumSpacing
        }
        isRunningAnalysis={isRunningAnalysis}
      />

    </div>
  )
}

export default DecisionMapPage