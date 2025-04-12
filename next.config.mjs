import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "src"
    );
    return config;
  },
};

export default nextConfig;
