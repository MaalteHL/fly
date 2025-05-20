import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { Group } from 'three'
import { useFrame, useThree } from '@react-three/fiber'

export function Airplane() {
  const groupRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('/plane_take_off_animation.glb')
  const { actions } = useAnimations(animations, groupRef)
  const [scrollProgress, setScrollProgress] = useState(0.2) // Start at 20% into the animation
  const { camera } = useThree()

  // Initialize animation and set fixed camera position
  useEffect(() => {
    const action = actions[Object.keys(actions)[0]]
    if (action) {
      action.reset().play()
      action.paused = true
      // Set initial animation time
      action.time = action.getClip().duration * 0.2 // Start at 20% into the animation
    }

    // Set fixed camera position
    camera.position.set(0, 12, -100)
    camera.lookAt(0, 0, 0)
  }, [actions, camera])

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight * 2 // Total height of plane section (200vh)
      const progress = window.scrollY / viewportHeight
      
      // Make the animation complete by the end of the scroll
      // Start from 20% and go to 100%
      const acceleratedProgress = Math.min(0.2 + (progress * 0.8), 1)
      setScrollProgress(acceleratedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update animation
  useFrame(() => {
    if (!groupRef.current) return

    // Update animation
    const action = actions[Object.keys(actions)[0]]
    if (action) {
      action.time = action.getClip().duration * scrollProgress
      action.play()
    }

    // Keep scene rotated
    groupRef.current.rotation.y = Math.PI
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/plane_take_off_animation.glb') 