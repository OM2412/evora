import './MethodologySection.css'

const pipeline = [
  {
    id: '01',
    title: 'Data Collection',
    description:
      'Roads, POIs, mapped charging infrastructure, urban activity indicators and renewable-energy inputs.',
  },
  {
    id: '02',
    title: 'Geospatial Processing',
    description:
      'Convert raw datasets into spatial features around candidate charging zones.',
  },
  {
    id: '03',
    title: 'Feature Normalization',
    description:
      'Transform different indicators into comparable 0–100 decision scores.',
  },
  {
    id: '04',
    title: 'Suitability Scoring',
    description:
      'Combine demand, accessibility, coverage gap and renewable integration potential.',
  },
  {
    id: '05',
    title: 'Spatial Optimization',
    description:
      'Select high-value sites while reducing redundant placement through spacing constraints.',
  },
  {
    id: '06',
    title: 'Validation',
    description:
      'Compare recommendations, test sensitivity and verify assumptions with stronger datasets.',
  },
]

const dataTypes = [
  {
    type: 'Observed',
    className: 'observed',
    description: 'Mapped or directly sourced information.',
    examples: ['Road network', 'Public charger locations', 'POIs'],
  },
  {
    type: 'Derived',
    className: 'derived',
    description: 'Calculated from observed spatial inputs.',
    examples: ['Accessibility', 'Charging gap', 'Demand potential'],
  },
  {
    type: 'Prototype',
    className: 'prototype',
    description: 'Preliminary assumptions pending final validation.',
    examples: ['Initial weights', 'Grid feasibility', 'Parcel feasibility'],
  },
]

function MethodologySection() {
  return (
    <section className="methodology-section" id="methodology">
      <div className="methodology-section__container">

        <div className="methodology-section__header">
          <div className="methodology-section__eyebrow">
            <span>05</span>
            EXPLAINABLE METHODOLOGY
          </div>

          <div className="methodology-section__heading-row">
            <h2>
              Built for decisions
              <span>you can explain.</span>
            </h2>

            <p>
              EVORA keeps the decision pipeline transparent so every
              recommendation can be traced back to measurable spatial factors.
            </p>
          </div>
        </div>

        <div className="methodology-pipeline">
          {pipeline.map((step, index) => (
            <article className="methodology-step" key={step.id}>
              <div className="methodology-step__top">
                <span className="methodology-step__number">{step.id}</span>

                {index < pipeline.length - 1 && (
                  <span className="methodology-step__connector">→</span>
                )}
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="methodology-insight">

          <div className="methodology-insight__left">
            <span className="methodology-insight__label">
              DATA CONFIDENCE
            </span>

            <h3>
              We separate what is known
              <span>from what is estimated.</span>
            </h3>

            <p>
              The prototype distinguishes directly sourced information from
              derived indicators and preliminary assumptions instead of
              presenting every value as equally certain.
            </p>
          </div>

          <div className="methodology-confidence">
            {dataTypes.map((item) => (
              <article
                className={`confidence-card confidence-card--${item.className}`}
                key={item.type}
              >
                <div className="confidence-card__header">
                  <span className="confidence-card__indicator"></span>
                  <strong>{item.type}</strong>
                </div>

                <p>{item.description}</p>

                <ul>
                  {item.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

        </div>

        <div className="methodology-explain">

          <div className="methodology-explain__score">
            <span>EXAMPLE RECOMMENDATION</span>

            <strong>85</strong>

            <small>Suitability Index</small>
          </div>

          <div className="methodology-explain__equation">
            <div>
              <span>Demand</span>
              <strong>35%</strong>
            </div>

            <span className="methodology-explain__plus">+</span>

            <div>
              <span>Accessibility</span>
              <strong>25%</strong>
            </div>

            <span className="methodology-explain__plus">+</span>

            <div>
              <span>Charging Gap</span>
              <strong>25%</strong>
            </div>

            <span className="methodology-explain__plus">+</span>

            <div>
              <span>Renewable</span>
              <strong>15%</strong>
            </div>
          </div>

          <p className="methodology-explain__note">
            Current weights are prototype values and will be calibrated during
            the validation stage.
          </p>

        </div>

      </div>
    </section>
  )
}

export default MethodologySection