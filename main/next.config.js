/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "cdn-images.farfetch-contents.com", "bigmapapparel.com"],
  }
}

module.exports = nextConfig
