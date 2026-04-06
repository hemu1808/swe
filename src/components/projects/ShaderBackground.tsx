"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ProjectCategory } from "@/data/projects";
import { useTheme } from "next-themes";

// Advanced Fluid Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  // Ashima Simplex Noise 3D
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Slow, billowing wave distortion
    float noiseFreq = 0.8;
    float noiseAmp = 0.6;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.2, pos.y * noiseFreq + uTime * 0.3, pos.z);
    
    // Add multiple octaves for detail
    pos.z += snoise(noisePos) * noiseAmp;
    pos.z += snoise(noisePos * 2.0 - uTime * 0.5) * (noiseAmp * 0.3);
    
    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fluid Fragment Shader for organic color blending
const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  // 2D Rotation
  mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
  }

  void main() {
    vec2 st = vUv;
    
    // Create organic fluid flows by distorting UVs
    vec2 stSlow = st * rotate2d(uTime * 0.05);
    vec2 stFast = st * rotate2d(-uTime * 0.1);
    
    // Generate complex blending masks based on distorted UVs and Z position
    float flow1 = sin(stSlow.x * 4.0 + stFast.y * 3.0 + vPosition.z * 2.0) * 0.5 + 0.5;
    float flow2 = cos(stFast.x * 5.0 - stSlow.y * 2.0 - vPosition.z * 1.5) * 0.5 + 0.5;
    
    // Smoothstep for tighter bands of color
    flow1 = smoothstep(0.1, 0.9, flow1);
    flow2 = smoothstep(0.2, 0.8, flow2);
    
    // Mix the palette
    vec3 colorMix = mix(uColor1, uColor2, flow1);
    vec3 finalColor = mix(colorMix, uColor3, flow2);
    
    // Subtle vignette to fade into background without harsh black boundaries
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.9, 0.1, dist);

    gl_FragColor = vec4(finalColor, alpha * 0.9);
  }
`;

interface ShaderPlaneProps {
    category: ProjectCategory;
}

const ShaderPlane: React.FC<ShaderPlaneProps> = ({ category }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { resolvedTheme } = useTheme();

    // Upgraded, highly saturated and vivid fluid palettes using specific depth color dependent on Theme
    const palettes: Record<ProjectCategory, [THREE.Color, THREE.Color, THREE.Color]> = useMemo(() => {
        const isLight = resolvedTheme === "light";
        const depth = isLight ? new THREE.Color("#f1f5f9") : new THREE.Color("#020617"); // Slate 100 vs Slate 950

        return {
            "All": [
                new THREE.Color("#2563eb"), // Blue 600
                new THREE.Color("#c026d3"), // Fuchsia 600
                depth,
            ],
            "Backend & Systems": [
                new THREE.Color("#059669"), // Emerald 600
                new THREE.Color("#0ea5e9"), // Sky 500
                depth,
            ],
            "Full Stack": [
                new THREE.Color("#9333ea"), // Purple 600
                new THREE.Color("#e11d48"), // Rose 600
                depth,
            ],
            "AI & Data": [
                new THREE.Color("#d97706"), // Amber 600
                new THREE.Color("#b91c1c"), // Red 700
                depth,
            ],
        };
    }, [resolvedTheme]);

    // Set up uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor1: { value: palettes[category][0] },
            uColor2: { value: palettes[category][1] },
            uColor3: { value: palettes[category][2] },
        }),
        [category, palettes]
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            // Smoothly interpolate colors when category changes
            const targetColors = palettes[category];
            materialRef.current.uniforms.uColor1.value.lerp(targetColors[0], 0.05);
            materialRef.current.uniforms.uColor2.value.lerp(targetColors[1], 0.05);
            materialRef.current.uniforms.uColor3.value.lerp(targetColors[2], 0.05);
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={2.8}>
            <planeGeometry args={[10, 10, 128, 128]} />
            <shaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe={false}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
};

export const ShaderBackground: React.FC<{ category: ProjectCategory }> = ({ category }) => {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }} gl={{ antialias: false }}>
                <ShaderPlane category={category} />
            </Canvas>
        </div>
    );
};
