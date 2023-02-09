/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.googleapis.com", "cdn.shopify.com", "lh3.googleusercontent.com", "i.pravatar.cc"],
  },
  experimental: {
    appDir: true,
  },
  modularizeImports: {
    "@heroicons/react/24/outline": {
      transform: "@heroicons/react/24/outline/{{member}}"
    }
  }
};

export default nextConfig;
