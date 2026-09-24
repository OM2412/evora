import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero-section" id="overview">
  <div className="hero-section__container">

    {/* LEFT COLUMN */}
    <div className="hero-section__content">

      <div className="hero-section__eyebrow">
        <span className="hero-section__eyebrow-dot"></span>
        EV INFRASTRUCTURE INTELLIGENCE
      </div>

      <h1 className="hero-section__title">
        <span className="hero-section__title-line">
          PLAN SMARTER.
        </span>

        <span className="hero-section__title-line hero-section__title-line--accent">
          CHARGE GREENER.
        </span>
      </h1>

      <p className="hero-section__description">
        Identify high-potential EV charging locations by combining
        mobility demand, accessibility, existing infrastructure,
        and renewable-energy potential.
      </p>

      <div className="hero-section__actions">
        <Link to="/decision-map" className="hero-section__primary-button">
  Explore Gwalior
  <span aria-hidden="true">→</span>
</Link>

        <a href="#methodology" className="hero-section__secondary-button">
          View Methodology
        </a>
      </div>

      <div className="hero-section__location">
        <span className="hero-section__location-dot"></span>

        <div>
          <span>Prototype Study Area</span>
          <strong>Gwalior, Madhya Pradesh</strong>
        </div>
      </div>

    </div>

    {/* RIGHT COLUMN */}
    <div className="hero-visual">

      <div className="hero-visual__grid"></div>

      <div className="hero-visual__coordinates hero-visual__coordinates--top">
        26.2183° N
      </div>

      <div className="hero-visual__coordinates hero-visual__coordinates--side">
        78.1828° E
      </div>

      <div className="city-platform">

        <div className="city-platform__surface"></div>

        <div className="city-road city-road--horizontal"></div>
        <div className="city-road city-road--vertical"></div>

        <div className="city-block city-block--one"></div>
        <div className="city-block city-block--two"></div>
        <div className="city-block city-block--three"></div>
        <div className="city-block city-block--four"></div>

        <div className="parking-zone">
          <span>P</span>
        </div>
        <div className="site-card">

  <div className="site-card__header">
    <div>
      <span className="site-card__eyebrow">
        RECOMMENDED SITE
      </span>

      <h3>Site 01</h3>
    </div>

    <span className="site-card__status">
      HIGH POTENTIAL
    </span>
  </div>

  <div className="site-card__score">
    <strong>85</strong>

    <div>
      <span>Suitability</span>
      <span>Index</span>
    </div>
  </div>

  <div className="site-card__divider"></div>

  <div className="site-card__metrics">

    <div className="site-card__metric">
      <span>Demand</span>
      <strong>91</strong>
    </div>

    <div className="site-card__metric">
      <span>Access</span>
      <strong>92</strong>
    </div>

    <div className="site-card__metric">
      <span>Gap</span>
      <strong>80</strong>
    </div>

    <div className="site-card__metric">
      <span>Renewable</span>
      <strong>72</strong>
    </div>

  </div>

</div>
{/* Solar rooftops */}
<div className="solar-roof solar-roof--one">
  <span></span>
  <span></span>
  <span></span>
</div>

<div className="solar-roof solar-roof--two">
  <span></span>
  <span></span>
  <span></span>
</div>

{/* Existing charger */}
<div className="ev-charger">
  <div className="ev-charger__icon">⚡</div>
</div>

{/* Recommended site */}
<div className="site-marker">
  <div className="site-marker__pulse"></div>

  <div className="site-marker__core">
    1
  </div>
</div>
      </div>

    </div>

  </div>
  <div className="hero-strip">
  <div className="hero-strip__item">
    <span>Study Area</span>
    <strong>Gwalior</strong>
  </div>

  <div className="hero-strip__divider"></div>

  <div className="hero-strip__item">
    <span>Analysis</span>
    <strong>Multi-Criteria</strong>
  </div>

  <div className="hero-strip__divider"></div>

  <div className="hero-strip__item">
    <span>Decision Layers</span>
    <strong>04</strong>
  </div>

  <div className="hero-strip__divider"></div>

  <div className="hero-strip__item">
    <span>Model Stage</span>
    <strong>Prototype</strong>
  </div>
</div>
</section>
  )
}

export default Hero