"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WaveParticles = () => {
    const pointsRef = useRef<THREE.Points>(null);

    // Create a 50x50 grid of particles (2500 total)
    const count = 2500;
    const { positions, originalPositions } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        let i = 0;
        for (let ix = 0; ix < 50; ix++) {
            for (let iy = 0; iy < 50; iy++) {
                // Spread them out 
                const x = ix * 0.4 - 10;
                const z = iy * 0.4 - 10;
                // Y starts at 0, manipulated in useFrame
                const y = 0;

                positions[i] = x;
                positions[i + 1] = y;
                positions[i + 2] = z;

                originalPositions[i] = x;
                originalPositions[i + 1] = y;
                originalPositions[i + 2] = z;

                i += 3;
            }
        }
        return { positions, originalPositions };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const z = originalPositions[i3 + 2];

            // Complex overlapping sine waves to create organic motion
            const waveX1 = Math.sin((x + time * 0.5) * 0.5) * 0.5;
            const waveZ1 = Math.sin((z + time * 0.3) * 0.5) * 0.5;
            const waveXZ1 = Math.sin((x + z + time * 0.8) * 0.3) * 0.8;

            pointsRef.current!.geometry.attributes.position.array[i3 + 1] = waveX1 + waveZ1 + waveXZ1;
        }

        pointsRef.current!.geometry.attributes.position.needsUpdate = true;

        // Gentle rotation of the whole grid
        pointsRef.current!.rotation.y = time * 0.05;
        pointsRef.current!.rotation.z = Math.sin(time * 0.1) * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            {/* Soft, glowing blue/purple points */}
            <pointsMaterial
                size={0.06}
                color="#60a5fa"
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export const ParticleWavesBackground = () => {
    return (
        <div className="fixed inset-0 -z-20 h-full w-full bg-[#020617]"> {/* Slate 950 deep background */}
            <Canvas
                camera={{ position: [0, 5, 10], fov: 75 }}
                gl={{ antialias: false, alpha: false }}
            >
                {/* Fog to obscure the edges smoothly */}
                <fog attach="fog" args={['#020617', 5, 20]} />
                <WaveParticles />
            </Canvas>
        </div>
    );
};
