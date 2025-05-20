import { Canvas } from '@react-three/fiber'
import { Airplane } from './Airplane'

export function Scene() {
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to bottom, #1a2f1a, #0a1f0a)'
    }}>
      <Canvas>
        <color attach="background" args={['#0a1f0a']} />
        <ambientLight intensity={1} />
        <directionalLight position={[0, 5, -5]} intensity={1} />
        <Airplane />
      </Canvas>
    </div>
  )
} 