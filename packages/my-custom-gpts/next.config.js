/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Since we're not using Next.js's Image component in our app, we can disable it
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 