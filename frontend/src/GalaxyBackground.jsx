// frontend/src/GalaxyBackground.jsx
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';

function RotatingSphere() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;  // 회전 속도 조절
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#ff7f50" />
    </mesh>
  );
}

export default function GalaxyBackground() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -2 }}
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <Suspense fallback={<Html>Loading...</Html>}>
        <RotatingSphere />
      </Suspense>
    </Canvas>
  );
}
