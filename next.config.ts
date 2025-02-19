import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: "via.placeholder.com",
      pathname: "/**"
    }],
    unoptimized: true,
  },
};

export default nextConfig;