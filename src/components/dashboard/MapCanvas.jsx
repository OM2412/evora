import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  useMap,
} from 'react-leaflet'

import defaultExistingChargers from '../../data/existingChargers'

import 'leaflet/dist/leaflet.css'
import './MapCanvas.css'

/**
 * Smoothly flies the Leaflet camera whenever the user switches MP cities or highway corridors
 */
function MapCameraController({ center, zoom }) {
  const map = useMap()

  useEffect(() => {
    if (center && center.length === 2) {
      map.flyTo(center, zoom || 13, {
        animate: true,
        duration: 1.2,
      })
    }
  }, [map, center, zoom])

  return null
}

function MapCanvas({
  region,
  activeLayers,
  rankedSites,
  recommendedSites,
  onSelectSite,
  isRunningAnalysis,
}) {
  const mapCenter = region?.center || [26.2183, 78.1828]
  const mapZoom = region?.zoom || 13
  const cityName = region?.name || 'Gwalior'
  const activeExistingChargers =
    region?.existingChargers || defaultExistingChargers
  const coverageRadiusMeters = region?.coverageCircleMeters || 1400
  const layerScale = region?.scenarioType === 'highway' ? 45 : 6

  const getLayerRadius = (score) => {
    return score * layerScale
  }

  return (
    <div className="map-canvas">
      {/* =================================================
          LEAFLET MAP
      ================================================= */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={6}
        maxZoom={18}
        zoomControl={false}
        className="map-canvas__map"
      >
        <MapCameraController center={mapCenter} zoom={mapZoom} />

        {/* =================================================
            BASE MAP
        ================================================= */}
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* =================================================
            DEMAND POTENTIAL
        ================================================= */}
        {activeLayers.demand &&
          rankedSites.map((site) => (
            <Circle
              key={`demand-${site.id}`}
              center={[site.latitude, site.longitude]}
              radius={getLayerRadius(site.demandScore)}
              pathOptions={{
                color: '#ff7657',
                fillColor: '#ff7657',
                fillOpacity: 0.07,
                opacity: 0.18,
                weight: 1,
              }}
              interactive={false}
            />
          ))}

        {/* =================================================
            RENEWABLE POTENTIAL
        ================================================= */}
        {activeLayers.renewable &&
          rankedSites.map((site) => (
            <Circle
              key={`renewable-${site.id}`}
              center={[site.latitude, site.longitude]}
              radius={getLayerRadius(site.renewableScore)}
              pathOptions={{
                color: '#f4da64',
                fillColor: '#f4da64',
                fillOpacity: 0.065,
                opacity: 0.18,
                weight: 1,
              }}
              interactive={false}
            />
          ))}

        {/* =================================================
            ACCESSIBILITY
        ================================================= */}
        {activeLayers.accessibility &&
          rankedSites.map((site) => (
            <Circle
              key={`accessibility-${site.id}`}
              center={[site.latitude, site.longitude]}
              radius={getLayerRadius(site.accessibilityScore)}
              pathOptions={{
                color: '#9d8cff',
                fillColor: '#9d8cff',
                fillOpacity: 0.06,
                opacity: 0.18,
                weight: 1,
              }}
              interactive={false}
            />
          ))}

        {/* =================================================
            CHARGING GAP + EXISTING COVERAGE
        ================================================= */}
        {activeLayers.chargingGap && (
          <>
            {activeExistingChargers.map((charger) => (
              <Circle
                key={`coverage-${charger.id}`}
                center={[charger.latitude, charger.longitude]}
                radius={coverageRadiusMeters * 0.85}
                pathOptions={{
                  color: '#52d6ff',
                  fillColor: '#52d6ff',
                  fillOpacity: 0.025,
                  opacity: 0.35,
                  weight: 1,
                  dashArray: '5 7',
                }}
                interactive={false}
              />
            ))}
            {rankedSites.map((site) => (
              <Circle
                key={`gap-${site.id}`}
                center={[site.latitude, site.longitude]}
                radius={site.chargingGapScore * (layerScale * 0.85)}
                pathOptions={{
                  color: '#ff5f6d',
                  fillColor: '#ff5f6d',
                  fillOpacity: 0.03 + (site.chargingGapScore / 100) * 0.06,
                  opacity: 0.16,
                  weight: 1,
                }}
                interactive={false}
              />
            ))}
          </>
        )}

        {/* =================================================
            EXISTING CHARGERS
        ================================================= */}
        {activeLayers.existingChargers &&
          activeExistingChargers.map((charger) => (
            <CircleMarker
              key={charger.id}
              center={[charger.latitude, charger.longitude]}
              radius={7}
              pathOptions={{
                color: '#52d6ff',
                fillColor: '#52d6ff',
                fillOpacity: 0.22,
                weight: 2,
              }}
            >
              <Popup>
                <div className="charger-popup">
                  <span className="charger-popup__label">EXISTING CHARGER</span>
                  <h3>{charger.name}</h3>
                  <p>{charger.area}, {cityName}</p>
                  <div className="charger-popup__details">
                    <div><span>Operator</span><strong>{charger.operator}</strong></div>
                    <div><span>Type</span><strong>{charger.type}</strong></div>
                    <div><span>Data</span><strong>{charger.status}</strong></div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* =================================================
            CANDIDATE SITES
        ================================================= */}
        {activeLayers.candidateSites &&
          rankedSites.map((site) => (
            <CircleMarker
              key={site.id}
              center={[site.latitude, site.longitude]}
              radius={5}
              pathOptions={{
                color: '#7a847f',
                fillColor: '#7a847f',
                fillOpacity: 0.2,
                weight: 1.5,
              }}
              eventHandlers={{
                click: () => {
                  onSelectSite(site)
                },
              }}
            >
              <Popup>
                <div className="candidate-popup">
                  <span className="candidate-popup__label">CANDIDATE ZONE</span>
                  <h3>{site.name}</h3>
                  <p>{site.area}, {cityName}</p>
                  <div className="candidate-popup__score">
                    <strong>{site.overallScore}</strong>
                    <div>
                      <span>Suitability</span>
                      <span>Index</span>
                    </div>
                  </div>
                  <div className="candidate-popup__factors">
                    <div><span>Demand</span><strong>{site.demandScore}</strong></div>
                    <div><span>Access</span><strong>{site.accessibilityScore}</strong></div>
                    <div><span>Gap</span><strong>{site.chargingGapScore}</strong></div>
                    <div><span>Renewable</span><strong>{site.renewableScore}</strong></div>
                  </div>
                  <div className="candidate-popup__meta">
                    <span>{site.id}</span>
                    <strong>Rank #{site.rank}</strong>
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '10px', color: '#888', textAlign: 'center' }}>
                    Click to view in Intelligence Panel
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* =================================================
            PROPOSED RECOMMENDATION COVERAGE
        ================================================= */}
        {activeLayers.recommendedSites &&
          recommendedSites.map((site) => (
            <Circle
              key={`recommended-coverage-${site.id}`}
              center={[site.latitude, site.longitude]}
              radius={coverageRadiusMeters}
              pathOptions={{
                color: '#72f595',
                fillColor: '#72f595',
                fillOpacity: 0.025,
                opacity: 0.22,
                weight: 1,
                dashArray: '4 8',
              }}
              interactive={false}
            />
          ))}

        {/* =================================================
            RECOMMENDED SITES
        ================================================= */}
        {activeLayers.recommendedSites &&
          recommendedSites.map((site) => (
            <CircleMarker
              key={`recommended-${site.id}`}
              center={[site.latitude, site.longitude]}
              radius={10}
              pathOptions={{
                color: '#72f595',
                fillColor: '#72f595',
                fillOpacity: 0.82,
                weight: 2.2,
              }}
              eventHandlers={{
                click: () => {
                  onSelectSite(site)
                },
              }}
            >
              <Popup>
                <div className="recommended-popup">
                  <span className="recommended-popup__label">RECOMMENDED SITE</span>
                  <h3>{site.name}</h3>
                  <p>{site.area}, {cityName}</p>
                  <div className="recommended-popup__rank">
                    <span>Recommendation Rank</span>
                    <strong>#{site.recommendationRank}</strong>
                  </div>
                  <div className="recommended-popup__score">
                    <strong>{site.overallScore}</strong>
                    <span>Suitability Index</span>
                  </div>
                  <div className="candidate-popup__factors">
                    <div><span>Demand</span><strong>{site.demandScore}</strong></div>
                    <div><span>Access</span><strong>{site.accessibilityScore}</strong></div>
                    <div><span>Gap</span><strong>{site.chargingGapScore}</strong></div>
                    <div><span>Renewable</span><strong>{site.renewableScore}</strong></div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* =================================================
          ANALYSIS LOADING OVERLAY
      ================================================= */}
      {isRunningAnalysis && (
        <div className="map-canvas__analysis-overlay">
          <div className="analysis-loader">
            <div className="analysis-loader__rings">
              <span />
              <span />
              <span />
            </div>
            <div className="analysis-loader__content">
              <span>EVORA ANALYSIS ENGINE</span>
              <strong>Optimizing {cityName} locations...</strong>
              <p>Evaluating suitability scores and spatial constraints</p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          MAP LEGEND
      ================================================= */}
      <div className="map-canvas__legend">
        <div className="map-canvas__legend-header">
          <span>MAP INTELLIGENCE</span>
          <strong>Live Layers</strong>
        </div>
        <div className="map-canvas__legend-grid">
          <div className={`map-canvas__legend-item ${activeLayers.demand ? 'map-canvas__legend-item--active' : ''}`}>
            <span className="legend-dot legend-dot--orange" />
            <span>Demand Potential</span>
          </div>
          <div className={`map-canvas__legend-item ${activeLayers.renewable ? 'map-canvas__legend-item--active' : ''}`}>
            <span className="legend-dot legend-dot--yellow" />
            <span>Renewable Potential</span>
          </div>
          <div className={`map-canvas__legend-item ${activeLayers.chargingGap ? 'map-canvas__legend-item--active' : ''}`}>
            <span className="legend-dot legend-dot--red" />
            <span>Charging Gap</span>
          </div>
          <div className={`map-canvas__legend-item ${activeLayers.accessibility ? 'map-canvas__legend-item--active' : ''}`}>
            <span className="legend-dot legend-dot--purple" />
            <span>Accessibility</span>
          </div>
          <div className={`map-canvas__legend-item ${activeLayers.existingChargers ? 'map-canvas__legend-item--active' : ''}`}>
            <span className="legend-dot legend-dot--cyan" />
            <span>Existing Chargers</span>
          </div>
          <div className={`map-canvas__legend-item ${activeLayers.candidateSites ? 'map-canvas__legend-item--active' : ''}`}>
            <span className="legend-dot legend-dot--gray" />
            <span>Candidate Sites</span>
          </div>
          <div className={`map-canvas__legend-item ${activeLayers.recommendedSites ? 'map-canvas__legend-item--active' : ''}`}>
            <span className="legend-dot legend-dot--green" />
            <span>Recommended Sites</span>
          </div>
        </div>
        <div className="map-canvas__legend-note">
          {region?.status || 'Prototype visualization'} · {cityName}
        </div>
      </div>
    </div>
  )
}

export default MapCanvas