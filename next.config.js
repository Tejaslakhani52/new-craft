const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  env: {
    NEXT_PUBLIC_ENV: "PRODUCTION",
  },
  compilerOptions: {
    baseUrl: "src",
  },
  // images: {
  //   domains: ["firebasestorage.googleapis.com"],
  // },
  // images: {
  //   domains: ["panel.craftyartapp.com", "beta.craftyartapp.com"],
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panel.craftyartapp.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["panel.craftyartapp.com", "beta.craftyartapp.com"],
  },
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "panel.craftyartapp.com",
        },
      ],
    },
  },
});
