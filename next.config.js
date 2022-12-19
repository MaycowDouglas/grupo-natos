/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'woocommerce.quantico.cc',
      },
    ],
  },
}

module.exports = nextConfig
