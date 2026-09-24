import './LayersSection.css'

const layers = [
  {
    id: '01',
    title: 'Demand Potential',
    description:
      'Estimates where EV charging activity is likely to concentrate.',
    points: [
      'Population & activity',
      'Commercial destinations',
      'Mobility intensity',
      'Key urban POIs',
    ],
    className: 'demand',
  },
  {
    id: '02',
    title: 'Accessibility',
    description:
      'Measures how easily drivers can reach and use a candidate site.',
    points: [
      'Major-road proximity',
      'Transport access',
      'Road connectivity',
      'Nearby destinations',
    ],
    className: 'access',
  },
  {
    id: '03',
    title: 'Charging Gap',
    description:
      'Identifies underserved areas relative to existing charging coverage.',
    points: [
      'Existing chargers',
      'Nearest-station distance',
      'Coverage overlap',
      'Underserved zones',
    ],
    className: 'gap',
  },
  {
    id: '04',
    title: 'Renewable Potential',
    description:
      'Evaluates the opportunity for cleaner local energy integration.',
    points: [
      'Solar resource',
      'Usable site area',
      'Land suitability',
      'Integration potential',
    ],
    className: 'renewable',
  },
]

function LayersSection() {
  return (
    <section className="layers-section">
      <div className="layers-section__container">

        <div className="layers-section__header">
          <div className="layers-section__eyebrow">
            <span>02</span>
            DECISION INTELLIGENCE
          </div>

          <div className="layers-section__heading-row">
            <h2>
              One city.
              <span>Multiple decision layers.</span>
            </h2>

            <p>
              EVORA combines spatial signals instead of relying on a single
              metric to identify high-potential charging locations.
            </p>
          </div>
        </div>

        <div className="layers-grid">
          {layers.map((layer) => (
            <article
              className={`layer-card layer-card--${layer.className}`}
              key={layer.id}
            >
              <div className="layer-card__top">
                <span className="layer-card__number">{layer.id}</span>
                <span className="layer-card__signal"></span>
              </div>

              <h3>{layer.title}</h3>

              <p>{layer.description}</p>

              <ul>
                {layer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="layer-card__visual">
                <div className="layer-card__visual-grid"></div>
                <div className="layer-card__visual-node"></div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default LayersSection