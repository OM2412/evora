function toRadians(value) {
  return (value * Math.PI) / 180
}

export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371

  const latitudeDifference = toRadians(lat2 - lat1)
  const longitudeDifference = toRadians(lon2 - lon1)

  const latitude1 = toRadians(lat1)
  const latitude2 = toRadians(lat2)

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(longitudeDifference / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusKm * c
}

/**
 * Finds the distance (in km) and name of the nearest existing charging station
 */
export function getNearestChargerInfo(site, existingChargers = []) {
  if (!existingChargers || existingChargers.length === 0) {
    return { distanceKm: null, nearestChargerName: null }
  }

  let minDistance = Infinity
  let nearestName = null

  for (const charger of existingChargers) {
    const dist = calculateDistanceKm(
      site.latitude,
      site.longitude,
      charger.latitude,
      charger.longitude,
    )
    if (dist < minDistance) {
      minDistance = dist
      nearestName = charger.name
    }
  }

  return {
    distanceKm: Math.round(minDistance * 100) / 100,
    nearestChargerName: nearestName,
  }
}

export function selectRecommendedSites(
  rankedSites,
  stationCount = 5,
  minimumSpacingKm = 2,
  options = {},
) {
  const {
    existingChargers = [],
    disqualifiedSiteIds = [],
    avoidRedundancy = true,
    minExistingChargerDistanceKm = 0.5, // 500m redundancy threshold from blueprint
  } = options

  const selectedSites = []

  for (const candidate of rankedSites) {
    // 1. Check if disqualified by safety / feasibility inspection
    if (disqualifiedSiteIds.includes(candidate.id)) {
      continue
    }

    // 2. Check proximity to existing chargers (<500m redundancy check)
    const { distanceKm: nearestExistingKm, nearestChargerName } =
      getNearestChargerInfo(candidate, existingChargers)

    if (
      avoidRedundancy &&
      nearestExistingKm !== null &&
      nearestExistingKm < minExistingChargerDistanceKm
    ) {
      continue
    }

    // 3. Check minimum spacing constraint between newly selected sites
    const isFarEnough =
      selectedSites.length === 0 ||
      selectedSites.every((selectedSite) => {
        const distance = calculateDistanceKm(
          candidate.latitude,
          candidate.longitude,
          selectedSite.latitude,
          selectedSite.longitude,
        )

        return distance >= minimumSpacingKm
      })

    if (isFarEnough) {
      selectedSites.push({
        ...candidate,
        nearestExistingKm,
        nearestChargerName,
      })
    }

    if (selectedSites.length >= stationCount) {
      break
    }
  }

  return selectedSites.map((site, index) => ({
    ...site,
    recommendationRank: index + 1,
  }))
}

/**
 * Computes Spatial Validation Metrics (Section 9 of EVORA Blueprint):
 * - Demand Covered (% before vs after within serviceRadiusKm)
 * - Average distance to nearest charger (before vs after)
 * - Average Renewable Score of selected portfolio
 */
export function calculateValidationMetrics(
  allCandidates,
  existingChargers = [],
  recommendedSites = [],
  serviceRadiusKm = 2.5,
) {
  if (!allCandidates || allCandidates.length === 0) {
    return {
      demandCoveredBeforePct: 0,
      demandCoveredAfterPct: 0,
      coverageGainPct: 0,
      avgDistBeforeKm: 0,
      avgDistAfterKm: 0,
      avgSuitabilityScore: 0,
      avgRenewableScore: 0,
    }
  }

  const combinedNetwork = [...existingChargers, ...recommendedSites]

  let totalDemandWeight = 0
  let coveredDemandBefore = 0
  let coveredDemandAfter = 0
  let totalDistBefore = 0
  let totalDistAfter = 0

  for (const zone of allCandidates) {
    const demandWeight = zone.demandScore || 1
    totalDemandWeight += demandWeight

    // Distance to nearest existing charger (Baseline)
    const beforeInfo = getNearestChargerInfo(zone, existingChargers)
    const distBefore = beforeInfo.distanceKm ?? 5.0
    totalDistBefore += distBefore

    if (distBefore <= serviceRadiusKm) {
      coveredDemandBefore += demandWeight
    }

    // Distance to nearest charger after adding EVORA recommendations
    const afterInfo = getNearestChargerInfo(zone, combinedNetwork)
    const distAfter = afterInfo.distanceKm ?? distBefore
    totalDistAfter += distAfter

    if (distAfter <= serviceRadiusKm) {
      coveredDemandAfter += demandWeight
    }
  }

  const demandCoveredBeforePct = Math.round(
    (coveredDemandBefore / totalDemandWeight) * 100,
  )
  const demandCoveredAfterPct = Math.round(
    (coveredDemandAfter / totalDemandWeight) * 100,
  )

  const avgSuitabilityScore =
    recommendedSites.length > 0
      ? Math.round(
          (recommendedSites.reduce((sum, s) => sum + s.overallScore, 0) /
            recommendedSites.length) *
            10,
        ) / 10
      : 0

  const avgRenewableScore =
    recommendedSites.length > 0
      ? Math.round(
          recommendedSites.reduce((sum, s) => sum + s.renewableScore, 0) /
            recommendedSites.length,
        )
      : 0

  return {
    demandCoveredBeforePct,
    demandCoveredAfterPct,
    coverageGainPct: Math.max(0, demandCoveredAfterPct - demandCoveredBeforePct),
    avgDistBeforeKm:
      Math.round((totalDistBefore / allCandidates.length) * 100) / 100,
    avgDistAfterKm:
      Math.round((totalDistAfter / allCandidates.length) * 100) / 100,
    avgSuitabilityScore,
    avgRenewableScore,
  }
}