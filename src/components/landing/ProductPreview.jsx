import { Link } from 'react-router-dom'
import './ProductPreview.css'

function ProductPreview() {
  return (
    <section className="product-preview" id="decision-map">
      <div className="product-preview__container">

        <div className="product-preview__header">
          <div className="product-preview__eyebrow">
            <span>04</span>
            DECISION MAP
          </div>

          <div className="product-preview__heading-row">
            <h2>
              Explore the city.
              <span>Explain every recommendation.</span>
            </h2>

            <p>
              Compare spatial layers, inspect candidate zones, and understand
              why each recommended charging location is selected.
            </p>
          </div>
        </div>

        <div className="dashboard-preview">

          <div className="dashboard-preview__topbar">
            <div className="dashboard-preview__brand">
              <strong>EVORA</strong>
              <span>Decision Map</span>
            </div>

            <div className="dashboard-preview__location">
              <span className="dashboard-preview__status-dot"></span>
              Gwalior Study Area
            </div>

            <span className="dashboard-preview__prototype">
              RESEARCH PROTOTYPE
            </span>
          </div>

          <div className="dashboard-preview__body">

            <aside className="dashboard-preview__sidebar">
              <span className="dashboard-preview__section-label">
                ANALYSIS LAYERS
              </span>

              <div className="preview-layer">
                <span className="preview-layer__dot preview-layer__dot--orange"></span>
                <span>Demand Potential</span>
                <span className="preview-toggle preview-toggle--active"></span>
              </div>

              <div className="preview-layer">
                <span className="preview-layer__dot preview-layer__dot--yellow"></span>
                <span>Renewable</span>
                <span className="preview-toggle"></span>
              </div>

              <div className="preview-layer">
                <span className="preview-layer__dot preview-layer__dot--cyan"></span>
                <span>Existing Chargers</span>
                <span className="preview-toggle preview-toggle--active"></span>
              </div>

              <div className="preview-layer">
                <span className="preview-layer__dot preview-layer__dot--purple"></span>
                <span>Accessibility</span>
                <span className="preview-toggle"></span>
              </div>

              <div className="preview-layer">
                <span className="preview-layer__dot preview-layer__dot--green"></span>
                <span>Recommended Sites</span>
                <span className="preview-toggle preview-toggle--active"></span>
              </div>

              <div className="dashboard-preview__scenario">
                <span className="dashboard-preview__section-label">
                  SCENARIO
                </span>

                <div className="dashboard-preview__scenario-row">
                  <span>New stations</span>
                  <strong>05</strong>
                </div>

                <div className="dashboard-preview__scenario-row">
                  <span>Mode</span>
                  <strong>Balanced</strong>
                </div>
              </div>

              <button type="button" className="dashboard-preview__run">
                Run Site Analysis
              </button>
            </aside>

            <div className="dashboard-preview__map">

              <div className="dashboard-preview__map-grid"></div>

              <div className="preview-road preview-road--one"></div>
              <div className="preview-road preview-road--two"></div>
              <div className="preview-road preview-road--three"></div>

              <div className="preview-demand preview-demand--one"></div>
              <div className="preview-demand preview-demand--two"></div>

              <div className="preview-charger preview-charger--one">⚡</div>
              <div className="preview-charger preview-charger--two">⚡</div>

              <div className="preview-candidate preview-candidate--1"></div>
              <div className="preview-candidate preview-candidate--2"></div>
              <div className="preview-candidate preview-candidate--3"></div>
              <div className="preview-candidate preview-candidate--4"></div>
              <div className="preview-candidate preview-candidate--5"></div>

              <div className="preview-recommended preview-recommended--1">1</div>
              <div className="preview-recommended preview-recommended--2">2</div>
              <div className="preview-recommended preview-recommended--3">3</div>

              <div className="dashboard-preview__map-label">
                GWALIOR
                <span>MADHYA PRADESH</span>
              </div>

              <div className="dashboard-preview__legend">
                <span>
                  <i className="legend-dot legend-dot--cyan"></i>
                  Existing
                </span>

                <span>
                  <i className="legend-dot legend-dot--green"></i>
                  Recommended
                </span>

                <span>
                  <i className="legend-dot legend-dot--orange"></i>
                  Demand
                </span>
              </div>
            </div>

            <aside className="dashboard-preview__detail">

              <span className="dashboard-preview__section-label">
                RECOMMENDED SITE
              </span>

              <div className="preview-site__header">
                <div>
                  <h3>Site 01</h3>
                  <span>Central Gwalior</span>
                </div>

                <span className="preview-site__rank">
                  #1
                </span>
              </div>

              <div className="preview-site__score">
                <strong>85</strong>

                <span>
                  Suitability
                  <br />
                  Index
                </span>
              </div>

              <div className="preview-site__bars">

                <div className="preview-score">
                  <div>
                    <span>Demand</span>
                    <strong>91</strong>
                  </div>
                  <div className="preview-score__track">
                    <span style={{ width: '91%' }}></span>
                  </div>
                </div>

                <div className="preview-score">
                  <div>
                    <span>Accessibility</span>
                    <strong>92</strong>
                  </div>
                  <div className="preview-score__track">
                    <span style={{ width: '92%' }}></span>
                  </div>
                </div>

                <div className="preview-score">
                  <div>
                    <span>Charging Gap</span>
                    <strong>80</strong>
                  </div>
                  <div className="preview-score__track">
                    <span style={{ width: '80%' }}></span>
                  </div>
                </div>

                <div className="preview-score">
                  <div>
                    <span>Renewable</span>
                    <strong>72</strong>
                  </div>
                  <div className="preview-score__track">
                    <span style={{ width: '72%' }}></span>
                  </div>
                </div>

              </div>

              <div className="preview-site__why">
                <span>WHY RECOMMENDED</span>
                <p>
                  Strong urban activity, high road accessibility and a
                  meaningful charging-coverage gap.
                </p>
              </div>

            </aside>

          </div>

          <div className="dashboard-preview__footer">
            <div>
              <span>Candidate Zones</span>
              <strong>16</strong>
            </div>

            <div>
              <span>Recommended</span>
              <strong>05</strong>
            </div>

            <div>
              <span>Decision Factors</span>
              <strong>04</strong>
            </div>

            <div>
              <span>Optimization</span>
              <strong>Balanced</strong>
            </div>
          </div>

        </div>

        <div className="product-preview__cta">
          <div>
            <span>READY TO EXPLORE?</span>
            <p>
              Open the full decision interface and inspect candidate locations.
            </p>
          </div>

          <Link to="/decision-map">
  Launch Decision Map
  <span>→</span>
</Link>
        </div>

      </div>
    </section>
  )
}

export default ProductPreview