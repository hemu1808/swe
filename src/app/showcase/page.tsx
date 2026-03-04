"use client";
import React, { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Stars, Float } from "@react-three/drei";
import * as THREE from "three";
import { Github, Linkedin, Target, Activity, ShieldCheck } from "lucide-react";

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

            {/* HERO SECTION */}
            <div className="h-screen w-full flex flex-col items-center justify-center px-4 relative">
                <div className="text-center z-10 fade-in cursor-default">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-none drop-shadow-2xl">
                        A Journey Through <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Code & Systems</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto">
                        Scroll down to dive into the architecture.
                    </p>
                </div>
            </div>

            {/* ABOUT SECTION */}
            <div className="h-screen w-full flex items-center justify-start px-4 md:px-20 lg:px-40">
                <div className="bg-zinc-950/60 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl max-w-2xl transform transition-transform hover:scale-[1.02]">
                    <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4 flex items-center gap-2">
                        <span className="w-8 h-px bg-blue-500"></span> 01. The Foundation
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8">
                        I am a Full Stack Developer specializing in highly scalable backends, interactive frontends, and AI pipelines.
                        My obsession lies in bridging complex system design with pixel-perfect user experiences.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <a href="/resume.pdf" className="inline-block px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            View Complete Résumé
                        </a>
                        <a href="https://github.com/hemu1808/" target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Github className="w-5 h-5 text-white" />
                        </a>
                        <a href="https://www.linkedin.com/in/mangalapurapu/" target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Linkedin className="w-5 h-5 text-white" />
                        </a>
                    </div>
                </div>
            </div>

            {/* SKILLS SECTION */}
            <div className="h-screen w-full flex items-center justify-end px-4 md:px-20 lg:px-40">
                <div className="bg-zinc-950/60 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl max-w-2xl transform transition-transform hover:scale-[1.02]">
                    <h2 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-8 flex items-center justify-end gap-2">
                        02. Technical Arsenal <span className="w-8 h-px bg-emerald-500"></span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-4 border-b border-white/10 pb-2">Core Systems</h3>
                            <ul className="text-zinc-300 space-y-3 text-base font-medium">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> Go (Golang) / gRPC</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> Python / Node.js</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> PostgreSQL / Redis</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> AWS / Docker / Fargate</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-4 border-b border-white/10 pb-2">Frontend & AI</h3>
                            <ul className="text-zinc-300 space-y-3 text-base font-medium">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> React / Next.js</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> WebGL / Three.js / GSAP</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> LangChain / Llama 3</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> Vector Databases</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* PITCHES / CASE STUDIES SECTION */}
            <div className="min-h-[150vh] w-full flex flex-col justify-center px-4 md:px-20 lg:px-40 py-20">
                <div className="max-w-4xl">
                    <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-16 flex items-center gap-2">
                        <span className="w-8 h-px bg-blue-400"></span> 03. Strategic Impact
                    </h2>

                    <div className="space-y-24">
                        {/* HGPT Pitch */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 transition-colors group-hover:bg-blue-500/20">
                                    <Target className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">HGPT: Enterprise RAG</h3>
                            </div>
                            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed border-l-2 border-white/10 pl-6 group-hover:border-blue-500/50 transition-colors">
                                I built an Enterprise RAG system to solve the inaccuracy of standard keyword searches across massive document stores. By designing a hybrid search pipeline with ChromaDB and Cross-Encoder re-ranking, I boosted search accuracy by <strong className="text-white">50%</strong>. It asynchronously processes over <strong className="text-white">10,000 documents</strong> without blocking the UI, providing users with real-time, highly relevant answers.
                            </p>
                        </div>

                        {/* Deploy Pitch */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 transition-colors group-hover:bg-emerald-500/20">
                                    <Activity className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">Deploy: Container Engine</h3>
                            </div>
                            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed border-l-2 border-white/10 pl-6 group-hover:border-emerald-500/50 transition-colors">
                                I developed a custom container orchestration engine in Go to tackle inefficient hardware use and slow failure recovery in distributed clusters. I engineered a custom scheduler that improved hardware utilization by <strong className="text-white">25%</strong>, and a high-frequency heartbeat mechanism that cuts node failure detection down to <strong className="text-white">under 30 milliseconds</strong>. It&apos;s built for high resilience with a PostgreSQL Write-Ahead Log to guarantee crash recovery.
                            </p>
                        </div>

                        {/* Shuttle Pitch */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 transition-colors group-hover:bg-rose-500/20">
                                    <ShieldCheck className="w-6 h-6 text-rose-400" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-rose-400 transition-colors">Shuttle: Transit Reservation</h3>
                            </div>
                            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed border-l-2 border-white/10 pl-6 group-hover:border-rose-500/50 transition-colors">
                                I engineered a transit reservation system specifically to eliminate the critical issue of double-booking during heavy traffic spikes. By implementing Redis distributed locks and optimistic concurrency control, I reduced booking conflicts by <strong className="text-white">95%</strong>. It securely handles payments and scales real-time seat inventory updates to over <strong className="text-white">1,000 concurrent users</strong> with sub-50ms latency.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BENTO GRID (PROJECTS / HIGHLIGHTS) SECTION */}
            <div className="min-h-screen w-full flex flex-col justify-center px-4 md:px-8 py-32 max-w-[1400px] mx-auto">
                <header className="mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-4 flex items-center gap-2">
                        <span className="w-8 h-px bg-purple-400"></span> 04. Engineering Highlights
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
                        Capabilities Showcase
                    </h3>
                </header>

                {/* THE RESTORED BENTO GRID */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-[1px] bg-white/10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                    {/* ROW 1: TOP LEFT - Full Stack Aurora Box (1x1) */}
                    <div className="bg-[#0c0c0c]/80 backdrop-blur-md relative p-8 flex flex-col justify-center overflow-hidden group hover:bg-[#111] transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-900/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100 blur-xl"></div>
                        <h3 className="text-sm font-bold tracking-widest text-zinc-300 uppercase relative z-10 leading-relaxed text-center">
                            Full Stack <br /> Engineering
                        </h3>
                    </div>

                    {/* ROW 1: MIDDLE TOP - Cross/Isolated Box (1x1) */}
                    <div className="bg-[#0c0c0c]/80 backdrop-blur-md p-8 flex flex-col justify-center text-center hover:bg-[#111] transition-colors">
                        <h3 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                            Distributed / Microservice <br /> Architectures
                        </h3>
                    </div>

                    {/* ROW 1: TOP RIGHT - Enterprise RAG (2x1) */}
                    <div className="bg-[#0c0c0c]/80 backdrop-blur-md md:col-span-2 relative overflow-hidden flex flex-col justify-end p-8 group">
                        {/* Matrix Grid Pattern Background */}
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Enterprise RAG Data Pipelines</h3>
                            <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-4">Real-Time Search & Retrieval</p>
                            <p className="text-sm text-zinc-400 max-w-sm">Built high-throughput vector embedding microservices leveraging Llama 3 for sub-second semantic queries across 10,000+ documents.</p>
                        </div>
                    </div>

                    {/* ROW 2: LEFT SUNBURST (1x1) */}
                    <div className="bg-[#0c0c0c]/80 backdrop-blur-md relative overflow-hidden flex items-center justify-center p-8 group">
                        <svg className="absolute inset-0 w-full h-full opacity-20 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            <circle cx="50" cy="50" r="50" fill="url(#grad)" mask="url(#rays)" />
                            <mask id="rays">
                                <g stroke="#fff" strokeWidth="0.5">
                                    {Array.from({ length: 36 }).map((_, i) => (
                                        <line key={i} x1="50" y1="50" x2={50 + 50 * Math.cos(i * 10 * Math.PI / 180)} y2={50 + 50 * Math.sin(i * 10 * Math.PI / 180)} />
                                    ))}
                                </g>
                            </mask>
                        </svg>
                    </div>

                    {/* ROW 2: HUGE TYPOGRAPHY - Latency (2x1) */}
                    <div className="bg-[#090909]/80 backdrop-blur-md md:col-span-2 p-8 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }} />
                        <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2 relative z-10 group-hover:text-zinc-400 transition-colors">Orchestration Latency</span>
                        <h2 className="text-7xl md:text-8xl font-bold tracking-tighter text-white relative z-10 leading-none">
                            &lt;30MS
                        </h2>
                    </div>

                    {/* ROW 2: RIGHT PILL (1x1) */}
                    <div className="bg-[#0c0c0c]/80 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center hover:bg-[#111] transition-colors">
                        <h3 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                            Redis Redlock <br /> Concurrency
                        </h3>
                    </div>

                    {/* ROW 3: HUGE TYPOGRAPHY - Uptime (2x1) */}
                    <div className="bg-[#090909]/80 backdrop-blur-md md:col-span-2 p-8 flex flex-col justify-end relative overflow-hidden group">
                        <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2 relative z-10 group-hover:text-zinc-400 transition-colors">Target Validation Uptime</span>
                        <h2 className="text-7xl md:text-8xl font-bold tracking-tighter text-white relative z-10 leading-none mb-2">
                            99.99%
                        </h2>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-[1px] border-white/20 flex items-center justify-center bg-gradient-to-tr from-blue-900/10 to-indigo-500/10 backdrop-blur-3xl transition-transform group-hover:scale-110">
                            <div className="w-24 h-24 rounded-full border-[1px] border-white/20 flex items-center justify-center">
                                <span className="text-3xl font-light text-zinc-500">$</span>
                            </div>
                        </div>
                    </div>

                    {/* ROW 3: MIDDLE BOTTOM (1x1) */}
                    <div className="bg-[#0c0c0c]/80 backdrop-blur-md p-8 flex items-center justify-center text-center hover:bg-[#111] transition-colors">
                        <h3 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                            AWS Fargate <br /> Executions
                        </h3>
                    </div>

                    {/* ROW 3: RIGHT CONCENTRIC SQUARES (1x1) */}
                    <div className="bg-[#0c0c0c]/80 backdrop-blur-md relative overflow-hidden p-8 flex items-center justify-center group">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl rounded-full group-hover:bg-indigo-600/20 transition-colors" />

                        <svg width="100%" height="100%" viewBox="0 0 100 100" className="opacity-40 group-hover:opacity-60 transition-opacity">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
                            <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <rect x="40" y="40" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="25" cy="25" r="1" fill="currentColor" />
                            <circle cx="40" cy="40" r="1" fill="currentColor" />
                            <circle cx="60" cy="60" r="1" fill="currentColor" />
                            <circle cx="75" cy="75" r="1" fill="currentColor" />
                            <circle cx="75" cy="25" r="1" fill="currentColor" />
                            <circle cx="60" cy="40" r="1" fill="currentColor" />
                            <circle cx="40" cy="60" r="1" fill="currentColor" />
                            <circle cx="25" cy="75" r="1" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* END OF JOURNEY */}
            <div className="h-screen w-full flex items-center justify-center px-4 bg-gradient-to-t from-zinc-950/80 to-transparent">
                <div className="text-center text-white bg-zinc-950/40 p-12 rounded-3xl border border-white/5 backdrop-blur-xl max-w-3xl transform transition-transform hover:scale-[1.02]">
                    <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-8">End of Journey</h2>
                    <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">Let&apos;s Build <br /> The Future</h3>
                    <p className="text-lg md:text-xl text-zinc-400 mb-10">
                        Ready to dig into the code or discuss full-time roles?
                    </p>
                    <a href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Return Home
                    </a>
                </div>
            </div>

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
