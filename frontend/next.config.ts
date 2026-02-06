import type { NextConfig } from "next";

/**
 * Next.js Configuration
 * 
 * This file configures how Next.js builds and runs your app.
 * 
 * images.remotePatterns:
 * - Tells Next.js which external domains can serve images
 * - Required for security - prevents loading images from untrusted sources
 * - We're allowing placehold.co for placeholder images
 * - Later we'll add our Django backend URL here for product images
 */

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Add your Django backend / Cloudinary here later:
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "your-django-api.com",
      //   pathname: "/media/**",
      // },
    ],
  },
};

export default nextConfig;
