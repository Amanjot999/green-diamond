import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Phase 1 demo imagery is hotlinked from free-license stock CDNs
    // (Unsplash/Pexels). TODO(phase-6): swap for owned product photography on
    // Cloudinary. Local SVGs remain as fallbacks; allow them through the optimizer.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
