import { Scene } from './components/Scene'
import { FinalSection } from './components/FinalSection'
import { useState, useEffect } from 'react'
import './App.css'

// Easing function for smoother transitions
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function App() {
  const [planeOpacity, setPlaneOpacity] = useState(1)
  const [finalSectionOpacity, setFinalSectionOpacity] = useState(0)
  const planeSection = window.innerHeight * 2 // 200vh for plane section

  const handleScroll = () => {
    // Get current scroll position
    const scrollPosition = window.scrollY
    const progress = scrollPosition / planeSection

    // Start transitioning at 70% scroll
    const fadeProgress = (progress - 0.7) / 0.3 // Normalize to 0-1 over 30% of scroll
    const easedProgress = easeInOutQuad(Math.max(0, Math.min(1, fadeProgress)))
    
    // Plane section fades out while final section fades in
    setPlaneOpacity(1 - easedProgress)
    setFinalSectionOpacity(easedProgress)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <div style={{ 
        height: '200vh',
        position: 'relative'
      }}>
        <Scene />
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          opacity: planeOpacity,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'white',
          fontSize: '0.875rem'
        }}>
          <div style={{
            width: '24px',
            height: '40px',
            border: '2px solid white',
            borderRadius: '12px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: 'white',
              borderRadius: '2px',
              position: 'absolute',
              top: '6px',
              animation: 'scrollDown 1.5s infinite'
            }}/>
          </div>
          <span>Scroll</span>
        </div>
      </div>

      {/* Final section */}
      <div style={{ 
        position: 'relative',
        width: '100%'
      }}>
        <FinalSection opacity={finalSectionOpacity} />
      </div>
    </div>
  )
}

export default App
