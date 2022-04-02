/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "cdn-images.farfetch-contents.com"],
  }
}

module.exports = nextConfig
