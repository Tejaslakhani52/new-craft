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
  images: {
    domains: ["panel.craftyartapp.com", "beta.craftyartapp.com"],
  },
});
