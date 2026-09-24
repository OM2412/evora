import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import DecisionMapPage from './pages/DecisionMapPage'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/decision-map" element={<DecisionMapPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App