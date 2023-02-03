/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.googleapis.com", "cdn.shopify.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
