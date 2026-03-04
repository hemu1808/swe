<div align="center">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09fcc05cbdb9a63e1/icons/NextJS-Dark.svg" width="80" alt="Next.js" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09fcc05cbdb9a63e1/icons/React-Dark.svg" width="80" alt="React" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09fcc05cbdb9a63e1/icons/TailwindCSS-Dark.svg" width="80" alt="TailwindCSS" />
  <br/>
  <h1>High-Performance 3D Developer Portfolio</h1>
  <p>A premium, interactive web portfolio built with Next.js 14, React Three Fiber, Framer Motion, and Tailwind CSS.</p>
</div>

---

## 🌟 Overview

This project is a state-of-the-art developer portfolio designed to showcase software engineering capabilities through a deeply interactive, visually striking, and technically complex user interface. 

Rejecting standard static layouts, this portfolio utilizes a **Modern Glassmorphic UI**, **WebGL/3D rendering**, and **Scroll-driven Cinematic Experiences** to prove frontend mastery while maintaining an enterprise-grade dark aesthetic focused on high information density.

## ✨ Key Features

- **Cinematic 3D Scroll Journey (`/showcase`)**: A full-screen `<Canvas>` environment powered by `@react-three/fiber` and `@react-three/drei`. As the user scrolls, the camera flies along the Z-axis through a field of stars, fog, and interactive 3D nodes, while HTML content seamlessly locks to the DOM scroll flow (via Drei's `<Scroll html>`).
- **Advanced Bento Grid System**: 
  - Restored Level-5 styling featuring an ultra-crisp CSS Grid layout (`gap-[1px]` on `bg-white/10`) for precise hairlines.
  - Native embedded SVGs (Sunburst, Concentric Arrays) with CSS-driven micro-animations.
  - Granular typography with bold statistical highlights (`<30MS`, `99.99%`).
- **Interactive Project Cards (`/projects`)**: A dashboard-style feed mimicking enterprise tools (like Novu Inbox). Project cards feature real-time 3D tilt effects (`framer-motion`), glowing radioactive hovers, and strict metadata grids tracking `Role`, `Time`, `Status`, and `Focus`.
- **GSAP-Inspired Skills Polygraph (`/skills`)**: Utilizes custom SVG filters (`feColorMatrix`, `feGaussianBlur`) to create a "Prism Spotlight" effect that follows the cursor, illuminating a complex skill distribution radar chart.
- **Unified "Glass UI" Aesthetic**: Global implementation of `rounded-3xl` borders (`border-white/5`), thick backdrop blurs, and the modern `Outfit` typography suite across the entire routing tree to create a cohesive, premium feel.

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [Next.js 14](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript (`.tsx`)
- **Styling constraints**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animation Engine**: [Framer Motion](https://www.framer.com/motion/)
- **WebGL / 3D**: `three`, `@react-three/fiber`, `@react-three/drei`
- **Typography Integration**: `next/font/google` (`Outfit`)

### 🧠 Application Flow Diagram

```text
[ User Client ] 
       │ 
       ▼ 
[ Next.js App Router ]
       │
       ├─► ( / ) Home Page
       │    ├─ Navbar (Floating Glass Pill)
       │    ├─ Hero Section & About snippet
       │    └─ Static High-level Project Cards
       │
       ├─► ( /projects ) 
       │    ├─ Interactive Shader Background
       │    ├─ Sidebar Sticky Navigation
       │    └─ 3D Glowing Dashboard Project Cards (Framer Motion)
       │
       ├─► ( /skills )
       │    ├─ ParticleWavesBackground (R3F implementation)
       │    ├─ GSAP-style Prism Spotlight Effect
       │    └─ SVG Polygraph Distribution Chart
       │
       └─► ( /showcase ) ──> *The Flagship Experience*
            │
            ├─ [ WebGL Canvas via R3F ]
            │   ├─ Z-Axis Camera Controller (Lerp interpolation)
            │   ├─ Animated Wireframe Nodes / Pyramids
            │   └─ Fog / Stars Depth Engine
            │
            └─ [ <Scroll html> Overlay ]
                ├─ 01. About Me Card
                ├─ 02. Technical Arsenal
                ├─ 03. Engineering Highlights
                └─ 04. The Bento Grid (Grid-based CSS Mastery)
```

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: Highly recommend `npm` for this project to maintain lockfile parity with the WebGL packages.
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🎨 Design Philosophy

The aesthetic choices heavily emphasize **"Information Density via Dark Mode."** By constraining the color palette to deep zincs (`#050505`, `zinc-950`) and stark, pure white text, accent colors (`blue-500`, `emerald-500`, `rose-500`) are allowed to command attention perfectly. 

The structural redesign removed excessive padding (`mb-40` -> `mb-12`) to push content closer together, mimicking the density of professional developer tools (IDEs, Grafana dashboards, AWS consoles) rather than typical spaced-out consumer landing pages.
