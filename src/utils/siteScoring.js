export const weightProfiles = {
  balanced: {
    demand: 0.35,
    accessibility: 0.25,
    chargingGap: 0.25,
    renewable: 0.15,
  },

  demand: {
    demand: 0.50,
    accessibility: 0.20,
    chargingGap: 0.20,
    renewable: 0.10,
  },

  renewable: {
    demand: 0.25,
    accessibility: 0.20,
    chargingGap: 0.20,
    renewable: 0.35,
  },

  coverage: {
    demand: 0.25,
    accessibility: 0.20,
    chargingGap: 0.40,
    renewable: 0.15,
  },
}

/**
 * Normalizes any raw weight object so factors always sum to 1.0
 */
export function normalizeWeights(rawWeights) {
  if (!rawWeights) return weightProfiles.balanced

  const d = Number(rawWeights.demand) || 0
  const a = Number(rawWeights.accessibility) || 0
  const g = Number(rawWeights.chargingGap) || 0
  const r = Number(rawWeights.renewable) || 0

  const total = d + a + g + r
  if (total <= 0) return weightProfiles.balanced

  return {
    demand: d / total,
    accessibility: a / total,
    chargingGap: g / total,
    renewable: r / total,
  }
}

export function resolveWeights(optimizationGoal = 'balanced', customWeights = null) {
  if (optimizationGoal === 'custom' && customWeights) {
    return normalizeWeights(customWeights)
  }
  return weightProfiles[optimizationGoal] || weightProfiles.balanced
}

export function calculateSuitability(
  site,
  optimizationGoal = 'balanced',
  customWeights = null,
) {
  const weights = resolveWeights(optimizationGoal, customWeights)

  const demandContribution = site.demandScore * weights.demand
  const accessContribution = site.accessibilityScore * weights.accessibility
  const gapContribution = site.chargingGapScore * weights.chargingGap
  const renewableContribution = site.renewableScore * weights.renewable

  const score =
    demandContribution +
    accessContribution +
    gapContribution +
    renewableContribution

  return Math.round(score * 10) / 10
}

export function rankCandidateSites(
  sites,
  optimizationGoal = 'balanced',
  customWeights = null,
) {
  const activeWeights = resolveWeights(optimizationGoal, customWeights)

  return sites
    .map((site) => ({
      ...site,
      overallScore: calculateSuitability(
        site,
        optimizationGoal,
        customWeights,
      ),
      activeWeights: {
        demand: Math.round(activeWeights.demand * 100),
        accessibility: Math.round(activeWeights.accessibility * 100),
        chargingGap: Math.round(activeWeights.chargingGap * 100),
        renewable: Math.round(activeWeights.renewable * 100),
      },
    }))
    .sort((a, b) => b.overallScore - a.overallScore)
    .map((site, index) => ({
      ...site,
      rank: index + 1,
    }))
}