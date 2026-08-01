import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  // Only apply basePath during production builds (e.g., GitHub Pages)
  basePath: process.env.NODE_ENV === "production" ? "/swe" : "",
  images: { unoptimized: true },
};

export default nextConfig;
