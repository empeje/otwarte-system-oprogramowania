import {NextConfig} from "next";

const isDev = process.env.NODE_ENV === "development";

// use turbo on dev only

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
