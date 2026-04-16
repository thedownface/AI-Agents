"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function HeartMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.4;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });

  // Build a heart shape using THREE.Shape
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  heartShape.moveTo(x + 0.5, y + 0.5);
  heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
  heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
  heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
  heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
  heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
  heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

  const extrudeSettings = {
    depth: 0.35,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 2,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, -0.5, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <MeshDistortMaterial
          color="#dc2626"
          distort={0.12}
          speed={2}
          roughness={0.15}
          metalness={0.3}
          emissive="#7f1d1d"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function HeartScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff5f5" />
        <pointLight position={[-4, -4, -4]} intensity={0.4} color="#fca5a5" />
        <HeartMesh />
      </Canvas>
    </div>
  );
}
