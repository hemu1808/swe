"use client";
import React, { useRef, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

import { HeroSection } from "@/components/showcase/HeroSection";
import { FoundationSection } from "@/components/showcase/FoundationSection";
import { ArsenalSection } from "@/components/showcase/ArsenalSection";
import { StrategicImpactSection } from "@/components/showcase/StrategicImpactSection";
import { BentoShowcase } from "@/components/showcase/BentoShowcase";
import { EndJourneySection } from "@/components/showcase/EndJourneySection";
// --- Custom 3D Objects for Background Journey ---
function FloatingNode({ position, color, speed, scale = 1 }: { position: [number, number, number], color: string, speed: number, scale?: number }) {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * speed;
            mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.8;
        }
    });
    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={2} position={position}>
            <mesh ref={mesh} scale={scale}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={color} wireframe />
            </mesh>
        </Float>
    );
}

// Giant Wireframe Pyramid for the Background
const BackgroundPyramid = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });
    return (
        <Float speed={1} rotationIntensity={1} floatIntensity={2} position={[8, 0, -40]}>
            <mesh ref={meshRef}>
                <coneGeometry args={[6, 9, 4]} />
                <meshBasicMaterial color="#a78bfa" wireframe={true} transparent opacity={0.2} />
                <mesh scale={0.95}>
                    <coneGeometry args={[6, 9, 4]} />
                    <meshBasicMaterial color="#4c1d95" opacity={0.3} transparent />
                </mesh>
            </mesh>
        </Float>
    );
};

// --- The Camera Controller ---
function WebGLJourney() {
    const scroll = useScroll();
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        // Move camera forward based on scroll
        const zTarget = 5 - scroll.offset * 120;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, zTarget, 0.1);

        if (groupRef.current) {
            // Slight rotation of the universe as you scroll
            groupRef.current.rotation.z = scroll.offset * Math.PI * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <FloatingNode position={[4, 2, -10]} color="#3b82f6" speed={0.5} />
            <FloatingNode position={[-5, -3, -20]} color="#8b5cf6" speed={0.3} scale={1.5} />
            <FloatingNode position={[6, 4, -30]} color="#10b981" speed={0.4} scale={0.8} />
            <BackgroundPyramid />
            <FloatingNode position={[-6, -1, -50]} color="#f59e0b" speed={0.6} scale={2} />
            <FloatingNode position={[3, 5, -70]} color="#e11d48" speed={0.7} />
            <FloatingNode position={[-8, 2, -90]} color="#3b82f6" speed={0.4} scale={3} />
            <FloatingNode position={[5, -4, -110]} color="#8b5cf6" speed={0.5} scale={1.5} />
        </group>
    );
}

// --- HTML Overlay Content ---
function HTMLContent() {
    return (
        <Scroll html style={{ width: '100vw' }}>
            <HeroSection />
            <FoundationSection />
            <ArsenalSection />
            <StrategicImpactSection />
            <BentoShowcase />
            <EndJourneySection />
        </Scroll>
    );
}

// --- Main Page Component ---
export default function ShowcasePage() {
    return (
        <div className="relative h-screen w-full bg-[#050505] overflow-hidden selection:bg-blue-500/30 font-sans">
            {/* Global Floating Dock Header */}
            <Navbar />

            {/* Down Arrow Guide */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none fade-in">
                <div className="px-6 py-2 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-md text-xs font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-2 shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Scroll Down
                </div>
            </div>

            {/* Full Screen WebGL Canvas */}
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['#050505']} />

                {/* Immersive Fog */}
                <fog attach="fog" args={['#050505', 10, 45]} />

                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* 
                  ScrollControls manages the scroll state. 
                  Pages=8 means the scroll height is 8x the viewport height. 
                */}
                <ScrollControls pages={8.5} damping={0.2}>
                    <WebGLJourney />
                    <HTMLContent />
                </ScrollControls>

            </Canvas>
        </div>
    );
}
