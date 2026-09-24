import './ProblemSection.css'

function ProblemSection() {
  return (
    <section className="problem-section" id="intelligence">
      <div className="problem-section__container">

        <div className="problem-section__content">

          <div className="problem-section__eyebrow">
            <span>01</span>
            THE PLANNING PROBLEM
          </div>

          <h2 className="problem-section__title">
            Charging infrastructure
            <span>is a location problem.</span>
          </h2>

          <p className="problem-section__description">
            A charging station performs well only when demand,
            accessibility, infrastructure coverage, and renewable-energy
            potential align at the same location.
          </p>

        </div>

        <div className="problem-diagram">

          <div className="problem-diagram__factor problem-diagram__factor--top">
            <span>Demand</span>
            <small>Where charging activity is likely</small>
          </div>

          <div className="problem-diagram__factor problem-diagram__factor--left">
            <span>Accessibility</span>
            <small>How easily drivers can reach the site</small>
          </div>

          <div className="problem-diagram__center">
            <div className="problem-diagram__center-ring"></div>

            <div className="problem-diagram__center-core">
              <span>OPTIMAL</span>
              <strong>SITE</strong>
            </div>
          </div>

          <div className="problem-diagram__factor problem-diagram__factor--right">
            <span>Renewable</span>
            <small>Potential for cleaner energy integration</small>
          </div>

          <div className="problem-diagram__factor problem-diagram__factor--bottom">
            <span>Coverage Gap</span>
            <small>Where current charging supply is insufficient</small>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ProblemSection