/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7188", // Your API's port
        pathname: "/images/**", // Allow all images from this path
      },
    ],
    unoptimized: true, // Disable Next.js image optimization for external images
  },
};

module.exports = nextConfig;
