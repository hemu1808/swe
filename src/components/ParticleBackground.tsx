"use client";
import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  const { resolvedTheme } = useTheme();
  const particleCount = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const r = 15 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        pos[i * 3 + 2] = r * Math.cos(phi); // z
    }
    return pos;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_state: any, delta: number) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 20;
        ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={resolvedTheme === "light" ? 0.2 : 0.6}
      />
    </Points>
  );
}

export const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-transparent">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
          <ParticleCloud />
        </Canvas>
      </Suspense>
    </div>
  );
};