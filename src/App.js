import * as THREE from 'three'
import { useRef, useReducer, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Text } from '@react-three/drei'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'
import { Effects } from './Effects'

// Expanded color palette with more personality
const accents = [
  '#ff6b6b', // Coral Red
  '#4ecdc4', // Turquoise
  '#45b7d1', // Sky Blue
  '#f9ca24', // Sunny Yellow
  '#f0932b', // Orange
  '#eb4d4b', // Deep Red
  '#6c5ce7', // Purple
  '#a29bfe', // Lavender
  '#fd79a8', // Pink
  '#00b894', // Teal
  '#e17055', // Salmon
  '#fdcb6e'  // Gold
]

const shuffle = (accent = 0) => [
  // Darker spheres for contrast
  { color: '#2c2c54', roughness: 0.1, metalness: 0.8 },
  { color: '#40407a', roughness: 0.2, metalness: 0.6 },
  { color: '#2c2c54', roughness: 0.1, metalness: 0.7 },
  
  // Light spheres
  { color: '#f1f2f6', roughness: 0.1, metalness: 0.1 },
  { color: '#ddd', roughness: 0.2, metalness: 0.05 },
  { color: '#fff', roughness: 0.05, metalness: 0.1 },
  
  // Accent spheres with personality
  { color: accents[accent], roughness: 0.1, accent: true, metalness: 0.3 },
  { color: accents[accent], roughness: 0.05, accent: true, metalness: 0.4 },
  { color: accents[(accent + 1) % accents.length], roughness: 0.1, accent: true, metalness: 0.5 },
  { color: accents[(accent + 2) % accents.length], roughness: 0.15, accent: true, metalness: 0.2 },
  
  // Metallic collection
  { color: '#718096', roughness: 0.1, metalness: 0.9 },
  { color: '#4a5568', roughness: 0.3, metalness: 0.8 },
  
  // Glass-like spheres
  { color: accents[(accent + 3) % accents.length], roughness: 0.05, accent: true, metalness: 0.1 },
  { color: accents[(accent + 4) % accents.length], roughness: 0.1, accent: true, metalness: 0.3 },
]

// Enhanced information overlay with personal touch
function InfoOverlay() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="info-overlay">
      <h3>🎯 Physics Playground</h3>
      <div className="controls-section">
        <p><strong>🖱️ Mouse:</strong> Influence physics</p>
        <p><strong>Click:</strong> Change colors</p>
        <p><strong>Space:</strong> Shake things up!</p>
        <p><strong>R:</strong> Reset spheres</p>
      </div>
      
      <div className="stats-section">
        <p className="accent-text">✨ Interactive Physics Simulation</p>
        <p className="small-text">Built with React Three Fiber</p>
      </div>

      <button 
        className="toggle-btn"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? '🔽 Less Info' : '🔼 More Info'}
      </button>

      {showAdvanced && (
        <div className="advanced-info">
          <p><strong>🌟 Features:</strong></p>
          <ul>
            <li>Real-time SSGI lighting</li>
            <li>Rapier physics engine</li>
            <li>12 color themes</li>
            <li>Bloom post-processing</li>
          </ul>
        </div>
      )}
    </div>
  )
}

// Floating 3D text component
function FloatingText({ position, children, ...props }) {
  const mesh = useRef()
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Text
      ref={mesh}
      position={position}
      fontSize={1}
      color="#4ecdc4"
      anchorX="center"
      anchorY="middle"
      {...props}
    >
      {children}
    </Text>
  )
}

export default function App(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const [isShaking, setIsShaking] = useState(false)
  const connectors = useMemo(() => shuffle(accent), [accent])

  // Enhanced keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch(event.code) {
        case 'Space':
          event.preventDefault()
          setIsShaking(true)
          setTimeout(() => setIsShaking(false), 500)
          break
        case 'KeyR':
          // Reset will be handled in Spheres component
          window.dispatchEvent(new CustomEvent('resetSpheres'))
          break
        case 'KeyC':
          click() // Change colors with C key
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [click])

  return (
    <>
      <InfoOverlay />
      <Canvas 
        flat 
        shadows 
        onClick={click} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false }} 
        camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }} 
        {...props}
      >
        <color attach="background" args={['#0a0a0f']} />
        
        {/* Ambient lighting for better atmosphere */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        <Physics /*debug*/ timeStep="vary" gravity={[0, isShaking ? -10 : -2, 0]}>
          <Pointer />
          {connectors.map((props, i) => (
            <Sphere key={i} {...props} isShaking={isShaking} />
          ))}
        </Physics>
        
        {/* Floating 3D text */}
        <FloatingText position={[0, 15, -10]}>
          Physics Playground
        </FloatingText>
        
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={120} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
            <Lightformer form="circle" intensity={4} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
            <Lightformer form="ring" color={accents[accent]} intensity={100} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
          </group>
        </Environment>
        <Effects />
      </Canvas>
    </>
  )
}

function Sphere({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, color = 'white', isShaking, ...props }) {
  const api = useRef()
  const ref = useRef()
  const pos = useMemo(() => position || [r(12), r(12), r(12)], [])
  const [hovered, setHovered] = useState(false)
  const [originalScale] = useState(1)
  
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    
    // Enhanced physics with personality
    const shake = isShaking ? (Math.random() - 0.5) * 5 : 0
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.15 + shake))
    
    // Smooth color transitions
    easing.dampC(ref.current.material.color, color, 0.25, delta)
    
    // Hover effects
    const targetScale = hovered ? originalScale * 1.2 : originalScale
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5)
    
    // Gentle rotation for accent spheres
    if (accent) {
      ref.current.rotation.y += delta * 0.5
    }
  })

  // Reset spheres on custom event
  useEffect(() => {
    const handleReset = () => {
      api.current?.setTranslation({ x: r(12), y: r(12), z: r(12) })
      api.current?.setLinvel({ x: 0, y: 0, z: 0 })
    }

    window.addEventListener('resetSpheres', handleReset)
    return () => window.removeEventListener('resetSpheres', handleReset)
  }, [r])
  
  return (
    <RigidBody 
      linearDamping={3} 
      angularDamping={1} 
      friction={0.2} 
      position={pos} 
      ref={api} 
      colliders={false}
    >
      <BallCollider args={[1]} />
      <mesh 
        ref={ref} 
        castShadow 
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          {...props} 
          envMapIntensity={accent ? 1.5 : 1}
          emissive={accent ? color : '#000000'}
          emissiveIntensity={accent ? 0.1 : 0}
        />
        {children}
      </mesh>
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)))
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1.5]} />
    </RigidBody>
  )
}
