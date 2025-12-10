/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7188",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "pub-ff7d91c76708455393e73ce049051059.r2.dev",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
