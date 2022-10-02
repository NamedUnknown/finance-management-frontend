/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    springboot: "http://localhost:8080",
  },
}

module.exports = nextConfig
