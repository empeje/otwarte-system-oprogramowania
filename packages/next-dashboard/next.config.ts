import { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: isDev
    ? {
      turbo: {
        rules: {
          "*.svg": {
            loaders: ["@svgr/webpack"],
            as: "*.js",
          },
        },
      },
    }
    : {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/9.x/**",
      },
    ],
  },

  webpack(config) {
    if (!isDev) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
    }
    return config;
  },
};

export default nextConfig;
