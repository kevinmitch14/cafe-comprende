/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.googleapis.com", "cdn.shopify.com"],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
