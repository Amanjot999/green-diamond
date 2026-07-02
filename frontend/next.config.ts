import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Phase 1 uses local SVG placeholders; allow them through the optimizer.
    // TODO(phase-6): add Cloudinary remotePatterns + real raster product imagery.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
