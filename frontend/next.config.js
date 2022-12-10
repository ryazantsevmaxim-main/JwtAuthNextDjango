/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_API_KEY: process.env.BACKEND_API_KEY,
    ACCESS_TOKEN_LIFETIME_IN_MINUTES: 10,
    REFRESH_TOKEN_LIFETIME_IN_DAYS: 30
  }
}


module.exports = nextConfig
