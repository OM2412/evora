import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__brand">
          <strong>EVORA</strong>

          <p>
            Data-driven EV charging site intelligence for more accessible
            and sustainable infrastructure planning.
          </p>
        </div>

        <div className="footer__meta">
          <div>
            <span>Study Area</span>
            <strong>Gwalior, Madhya Pradesh</strong>
          </div>

          <div>
            <span>Project Stage</span>
            <strong>Research Prototype</strong>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            EVORA · Semester Project · 2026
          </span>

          <span>
            EV Charging Site Optimization
          </span>
        </div>

      </div>
    </footer>
  )
}

export default Footer