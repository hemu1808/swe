import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  reactStrictMode: false, // Fixes @react-three/drei createRoot double-mount bug
  // Only apply basePath during production builds (e.g., GitHub Pages)
  basePath: process.env.NODE_ENV === "production" ? "/swe" : "",
  images: { unoptimized: true },
};

export default nextConfig;
