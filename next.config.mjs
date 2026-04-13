/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloudflare Workers deployment
  experimental: {
    serverComponentsExternalPackages: ["three"],
  },
  // Output standalone for Cloudflare
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
