import { Link } from 'react-router-dom'
import './FinalCTA.css'

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta__container">

        <div className="final-cta__grid"></div>

        <div className="final-cta__content">
          <div className="final-cta__eyebrow">
            <span className="final-cta__dot"></span>
            GWALIOR CASE STUDY
          </div>

          <h2>
            Where should the next
            <span>charger go?</span>
          </h2>

          <p>
            Explore candidate zones, compare spatial decision layers, and
            inspect the reasoning behind every recommended EV charging site.
          </p>

          <div className="final-cta__actions">
            <Link to="/decision-map" className="final-cta__primary">
  Open Decision Map
  <span>→</span>
</Link>

            <a href="#methodology" className="final-cta__secondary">
              Review Methodology
            </a>
          </div>
        </div>

        <div className="final-cta__visual">

          <div className="final-cta__ring final-cta__ring--outer"></div>
          <div className="final-cta__ring final-cta__ring--middle"></div>

          <div className="final-cta__node">
            <span>01</span>
            <strong>85</strong>
            <small>Suitability</small>
          </div>

          <div className="final-cta__signal final-cta__signal--one">
            Demand
            <strong>91</strong>
          </div>

          <div className="final-cta__signal final-cta__signal--two">
            Access
            <strong>92</strong>
          </div>

          <div className="final-cta__signal final-cta__signal--three">
            Renewable
            <strong>72</strong>
          </div>

        </div>

      </div>
    </section>
  )
}

export default FinalCTA