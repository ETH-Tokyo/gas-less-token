/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
      use: [defaultLoaders.babel],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://polygon-mumbai.g.alchemy.com/v2/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
