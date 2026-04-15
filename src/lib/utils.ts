import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Site-wide configuration constants */
export const SITE_CONFIG = {
  basePath: "/swe",
  repoUrl: "https://github.com/hemu1808/",
  linkedinUrl: "https://www.linkedin.com/in/mangalapurapu/",
  email: "hemanth.mangalapurapu@gmail.com",
} as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a path with the site basePath in production.
 * Required for static assets when deploying to GitHub Pages with a basePath.
 */
export function getAssetPath(path: string): string;
export function getAssetPath(path: string | undefined): string | undefined;
export function getAssetPath(path: string | undefined): string | undefined {
  if (!path) return undefined;

  const isProd = process.env.NODE_ENV === "production";
  const { basePath } = SITE_CONFIG;

  if (isProd && path.startsWith("/") && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }

  return path;
}