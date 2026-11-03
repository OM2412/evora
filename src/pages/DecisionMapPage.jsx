import { useState, useMemo } from 'react'

import DashboardTopbar from '../components/dashboard/layout/DashboardTopbar'
import DashboardSidebar from '../components/dashboard/layout/DashboardSidebar'
import SiteDetailPanel from '../components/dashboard/layout/SiteDetailPanel'
import DashboardSummary from '../components/dashboard/layout/DashboardSummary'
import MapCanvas from '../components/dashboard/MapCanvas'

import { mpRegions } from '../data/mpRegions'

import {
  rankCandidateSites,
  weightProfiles,
} from '../utils/siteScoring'

import {
  selectRecommendedSites,
  calculateValidationMetrics,
} from '../utils/siteOptimization'

import './DecisionMapPage.css'

function DecisionMapPage() {
  /* ==================================================
     ACTIVE MP REGION (GWALIOR / INDORE / BHOPAL / NH-46)
  ================================================== */
  const [selectedRegionId, setSelectedRegionId] = useState('gwalior')
  const currentRegion = mpRegions[selectedRegionId] || mpRegions.gwalior

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
     DRAFT SCENARIO & CUSTOM MCDA WEIGHTS
  ================================================== */
  const [stationCount, setStationCount] = useState(5)
  const [optimizationGoal, setOptimizationGoal] = useState('balanced')
  const [minimumSpacing, setMinimumSpacing] = useState('2')

  const [customWeights, setCustomWeights] = useState({
    demand: 35,
    accessibility: 25,
    chargingGap: 25,
    renewable: 15,
  })

  /* ==================================================
     APPLIED SCENARIO
  ================================================== */
  const [appliedScenario, setAppliedScenario] = useState({
    stationCount: 5,
    optimizationGoal: 'balanced',
    minimumSpacing: 2,
    customWeights: {
      demand: 35,
      accessibility: 25,
      chargingGap: 25,
      renewable: 15,
    },
  })

  /* ==================================================
     SAFETY & FEASIBILITY OVERRIDES (PER SITE)
  ================================================== */
  const [siteSafetyStatus, setSiteSafetyStatus] = useState({})

  const handleToggleSafetyItem = (siteId, checkKey) => {
    const cycle = {
      Pending: 'Verified',
      Verified: 'Not Suitable',
      'Not Suitable': 'Pending',
    }

    setSiteSafetyStatus((prev) => {
      const currentSiteChecks = prev[siteId] || {}
      const currentStatus = currentSiteChecks[checkKey] || 'Pending'
      return {
        ...prev,
        [siteId]: {
          ...currentSiteChecks,
          [checkKey]: cycle[currentStatus],
        },
      }
    })
  }

  const disqualifiedSiteIds = useMemo(() => {
    return Object.entries(siteSafetyStatus)
      .filter(([, checks]) =>
        Object.values(checks).includes('Not Suitable'),
      )
      .map(([siteId]) => siteId)
  }, [siteSafetyStatus])

  /* ==================================================
     SELECTED SITE & ANALYSIS STATUS
  ================================================== */
  const [selectedSite, setSelectedSite] = useState(null)
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false)

  /* ==================================================
     HANDLE REGION SWITCH
  ================================================== */
  const handleSelectRegion = (newRegionId) => {
    const nextRegion = mpRegions[newRegionId]
    if (!nextRegion) return

    setSelectedRegionId(newRegionId)
    setSelectedSite(null)

    const defaultSpacing = nextRegion.defaultSpacingKm || 2
    const defaultCount = Math.min(5, nextRegion.candidateSites.length)

    setMinimumSpacing(String(defaultSpacing))
    setStationCount(defaultCount)

    setAppliedScenario((prev) => ({
      ...prev,
      stationCount: defaultCount,
      minimumSpacing: defaultSpacing,
    }))
  }

  /* ==================================================
     MEMOIZED SCORE + RANK CANDIDATES
  ================================================== */
  const rankedSites = useMemo(() => {
    return rankCandidateSites(
      currentRegion.candidateSites,
      appliedScenario.optimizationGoal,
      appliedScenario.customWeights,
    )
  }, [
    currentRegion,
    appliedScenario.optimizationGoal,
    appliedScenario.customWeights,
  ])

  /* ==================================================
     MEMOIZED SPATIAL OPTIMIZATION
  ================================================== */
  const recommendedSites = useMemo(() => {
    return selectRecommendedSites(
      rankedSites,
      appliedScenario.stationCount,
      appliedScenario.minimumSpacing,
      {
        existingChargers: currentRegion.existingChargers,
        disqualifiedSiteIds,
        avoidRedundancy: true,
        minExistingChargerDistanceKm:
          currentRegion.scenarioType === 'highway' ? 5.0 : 0.5,
      },
    )
  }, [
    rankedSites,
    currentRegion,
    appliedScenario.stationCount,
    appliedScenario.minimumSpacing,
    disqualifiedSiteIds,
  ])

  /* ==================================================
     MEMOIZED VALIDATION METRICS
  ================================================== */
  const validationMetrics = useMemo(() => {
    return calculateValidationMetrics(
      rankedSites,
      currentRegion.existingChargers,
      recommendedSites,
      currentRegion.serviceRadiusKm || 2.5,
    )
  }, [rankedSites, currentRegion, recommendedSites])

  /* ==================================================
     ACTIVE RIGHT PANEL SITE
  ================================================== */
  const currentSelectedSite = useMemo(() => {
    if (selectedSite) {
      return (
        recommendedSites.find((s) => s.id === selectedSite.id) ||
        rankedSites.find((s) => s.id === selectedSite.id) ||
        selectedSite
      )
    }
    return recommendedSites[0] || rankedSites[0] || null
  }, [selectedSite, recommendedSites, rankedSites])

  /* ==================================================
     HANDLE GOAL CHANGE, RUN ANALYSIS & EXPORT CSV
  ================================================== */
  const handleOptimizationGoalChange = (newGoal) => {
    setOptimizationGoal(newGoal)
    if (newGoal !== 'custom' && weightProfiles[newGoal]) {
      setCustomWeights({
        demand: Math.round(weightProfiles[newGoal].demand * 100),
        accessibility: Math.round(weightProfiles[newGoal].accessibility * 100),
        chargingGap: Math.round(weightProfiles[newGoal].chargingGap * 100),
        renewable: Math.round(weightProfiles[newGoal].renewable * 100),
      })
    }
  }

  const handleRunAnalysis = () => {
    setIsRunningAnalysis(true)

    setTimeout(() => {
      setAppliedScenario({
        stationCount,
        optimizationGoal,
        minimumSpacing: Number(minimumSpacing),
        customWeights: { ...customWeights },
      })

      setSelectedSite(null)
      setIsRunningAnalysis(false)
    }, 550)
  }

  const handleExportReport = () => {
    const headers = [
      'Site ID',
      'Name',
      'Area',
      'Region',
      'Overall Score',
      'MCDA Rank',
      'Recommended',
      'Recommendation Rank',
      'Demand Score',
      'Accessibility Score',
      'Charging Gap Score',
      'Renewable Score',
      'Safety Status',
    ]

    const recommendedMap = new Map(
      recommendedSites.map((s) => [s.id, s.recommendationRank]),
    )

    const rows = rankedSites.map((site) => {
      const isDisq = disqualifiedSiteIds.includes(site.id)
      const recRank = recommendedMap.get(site.id)
      return [
        site.id,
        `"${site.name}"`,
        `"${site.area}"`,
        `"${currentRegion.name}"`,
        site.overallScore,
        site.rank,
        recRank ? 'YES' : 'NO',
        recRank || '-',
        site.demandScore,
        site.accessibilityScore,
        site.chargingGapScore,
        site.renewableScore,
        isDisq ? 'DISQUALIFIED' : 'PENDING FIELD VERIFICATION',
      ].join(',')
    })

    const csvContent = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `EVORA_${currentRegion.id}_Decision_Report.csv`,
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="decision-map-page">
      {/* ================= TOPBAR ================= */}
      <DashboardTopbar
        selectedRegionId={selectedRegionId}
        onSelectRegion={handleSelectRegion}
        onExportReport={handleExportReport}
      />

      {/* ================= WORKSPACE ================= */}
      <div className="decision-map-page__workspace">
        {/* LEFT CONTROL PANEL */}
        <DashboardSidebar
          activeLayers={activeLayers}
          setActiveLayers={setActiveLayers}
          stationCount={stationCount}
          setStationCount={setStationCount}
          optimizationGoal={optimizationGoal}
          setOptimizationGoal={handleOptimizationGoalChange}
          customWeights={customWeights}
          setCustomWeights={setCustomWeights}
          minimumSpacing={minimumSpacing}
          setMinimumSpacing={setMinimumSpacing}
          onRunAnalysis={handleRunAnalysis}
          isRunningAnalysis={isRunningAnalysis}
        />

        {/* MAP */}
        <main className="decision-map-page__map">
          <MapCanvas
            region={currentRegion}
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
          safetyChecks={
            currentSelectedSite
              ? siteSafetyStatus[currentSelectedSite.id] || {}
              : {}
          }
          onToggleSafetyCheck={(checkKey) =>
            currentSelectedSite &&
            handleToggleSafetyItem(currentSelectedSite.id, checkKey)
          }
          isDisqualified={
            currentSelectedSite
              ? disqualifiedSiteIds.includes(currentSelectedSite.id)
              : false
          }
        />
      </div>

      {/* ================= BOTTOM SUMMARY ================= */}
      <DashboardSummary
        candidateCount={currentRegion.candidateSites.length}
        recommendedCount={recommendedSites.length}
        decisionFactorCount={4}
        optimizationGoal={appliedScenario.optimizationGoal}
        minimumSpacing={appliedScenario.minimumSpacing}
        validationMetrics={validationMetrics}
        disqualifiedCount={disqualifiedSiteIds.length}
        isRunningAnalysis={isRunningAnalysis}
      />
    </div>
  )
}

export default DecisionMapPage