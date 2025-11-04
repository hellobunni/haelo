import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "productimages.nimbledeals.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "techcrunch.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images-wp.stockx.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
