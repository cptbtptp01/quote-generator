/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Other Next.js config options...
};

const webpackConfig = (config) => {
  config.resolve.alias['styled-components'] = require.resolve(
    'styled-components'
  );
  return config;
};

module.exports = {
  ...nextConfig,
  webpack: webpackConfig,
};