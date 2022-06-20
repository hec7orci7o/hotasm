/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});

module.exports = nextConfig;
