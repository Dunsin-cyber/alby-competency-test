// next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  // Required for font optimization on Vercel
  experimental: {
    // Removed optimizeFonts as it is not a valid property
    optimizeCss: true, // Minimizes CSS
  },

  // Cache fonts aggressively
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // Only needed if using basePath (e.g., GitHub Pages)
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default config;
