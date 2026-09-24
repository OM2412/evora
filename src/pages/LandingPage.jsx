import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

import Hero from '../components/landing/Hero'
import ProblemSection from '../components/landing/ProblemSection'
import LayersSection from '../components/landing/LayersSection'
import OptimizationStory from '../components/landing/OptimizationStory'
import ProductPreview from '../components/landing/ProductPreview'
import MethodologySection from '../components/landing/MethodologySection'
import FinalCTA from '../components/landing/FinalCTA'

function LandingPage() {
  return (
    <>
      <Navbar />

      <Hero />
      <ProblemSection />
      <LayersSection />
      <OptimizationStory />
      <ProductPreview />
      <MethodologySection />
      <FinalCTA />

      <Footer />
    </>
  )
}

export default LandingPage