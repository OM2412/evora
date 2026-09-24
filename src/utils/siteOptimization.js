function toRadians(value) {
  return (value * Math.PI) / 180
}

export function calculateDistanceKm(
  lat1,
  lon1,
  lat2,
  lon2,
) {
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

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a),
    )

  return earthRadiusKm * c
}

export function selectRecommendedSites(
  rankedSites,
  stationCount = 5,
  minimumSpacingKm = 2,
) {
  const selectedSites = []

  for (const candidate of rankedSites) {
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
      selectedSites.push(candidate)
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