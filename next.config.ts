import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: true,
};

export default nextConfig;
