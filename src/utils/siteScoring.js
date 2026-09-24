const weightProfiles = {
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

export function calculateSuitability(site, optimizationGoal = 'balanced') {
  const weights =
    weightProfiles[optimizationGoal] || weightProfiles.balanced

  const score =
    site.demandScore * weights.demand +
    site.accessibilityScore * weights.accessibility +
    site.chargingGapScore * weights.chargingGap +
    site.renewableScore * weights.renewable

  return Math.round(score * 10) / 10
}

export function rankCandidateSites(
  sites,
  optimizationGoal = 'balanced',
) {
  return sites
    .map((site) => ({
      ...site,
      overallScore: calculateSuitability(
        site,
        optimizationGoal,
      ),
    }))
    .sort((a, b) => b.overallScore - a.overallScore)
    .map((site, index) => ({
      ...site,
      rank: index + 1,
    }))
}