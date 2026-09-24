import './OptimizationStory.css'

const steps = [
  {
    id: '01',
    title: 'Collect Signals',
    description:
      'Combine demand, accessibility, charging coverage and renewable-energy indicators.',
  },
  {
    id: '02',
    title: 'Generate Candidates',
    description:
      'Evaluate plausible charging zones instead of arbitrary map coordinates.',
  },
  {
    id: '03',
    title: 'Score Suitability',
    description:
      'Normalize each factor and calculate an explainable multi-criteria suitability index.',
  },
  {
    id: '04',
    title: 'Apply Spatial Constraints',
    description:
      'Avoid redundant placements by enforcing minimum spacing between selected sites.',
  },
  {
    id: '05',
    title: 'Recommend Sites',
    description:
      'Return a balanced set of locations with strong coverage and infrastructure potential.',
  },
]

function OptimizationStory() {
  return (
    <section className="optimization-section">
      <div className="optimization-section__container">

        <div className="optimization-section__header">
          <div className="optimization-section__eyebrow">
            <span>03</span>
            OPTIMIZATION WORKFLOW
          </div>

          <h2>
            From city signals
            <span>to site decisions.</span>
          </h2>

          <p>
            EVORA transforms multiple spatial indicators into ranked candidate
            locations and then selects a balanced charging network.
          </p>
        </div>

        <div className="optimization-flow">
          <div className="optimization-flow__line"></div>

          {steps.map((step, index) => (
            <article className="optimization-step" key={step.id}>
              <div className="optimization-step__node">
                <span>{step.id}</span>
              </div>

              <div className="optimization-step__content">
                <span className="optimization-step__label">
                  STEP {step.id}
                </span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <span className="optimization-step__arrow">→</span>
              )}
            </article>
          ))}
        </div>

        <div className="optimization-demo">

          <div className="optimization-demo__header">
            <div>
              <span>SPATIAL SELECTION</span>
              <h3>Candidate network optimization</h3>
            </div>

            <span className="optimization-demo__status">
              BALANCED MODE
            </span>
          </div>

          <div className="optimization-demo__canvas">

            <div className="candidate candidate--1"></div>
            <div className="candidate candidate--2"></div>
            <div className="candidate candidate--3"></div>
            <div className="candidate candidate--4"></div>
            <div className="candidate candidate--5"></div>
            <div className="candidate candidate--6"></div>
            <div className="candidate candidate--7"></div>
            <div className="candidate candidate--8"></div>
            <div className="candidate candidate--9"></div>
            <div className="candidate candidate--10"></div>

            <div className="selected-site selected-site--1">1</div>
            <div className="selected-site selected-site--2">2</div>
            <div className="selected-site selected-site--3">3</div>

            <div className="coverage-ring coverage-ring--1"></div>
            <div className="coverage-ring coverage-ring--2"></div>
            <div className="coverage-ring coverage-ring--3"></div>

          </div>

          <div className="optimization-demo__footer">
            <div>
              <span>Candidate Zones</span>
              <strong>16</strong>
            </div>

            <div>
              <span>Sites Selected</span>
              <strong>05</strong>
            </div>

            <div>
              <span>Minimum Spacing</span>
              <strong>2 km</strong>
            </div>

            <div>
              <span>Mode</span>
              <strong>Balanced</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default OptimizationStory