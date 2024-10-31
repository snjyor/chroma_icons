/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    turbotrace: {
      contextDirectory: process.cwd(),
    },
    serverComponentsExternalPackages: ['ws'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['your-domain.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'bufferutil': 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
      })
    }
    return config
  }
};

module.exports = nextConfig; 