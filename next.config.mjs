import withBundleAnalyzerImport from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerImport({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Author-owned S3 bucket — locked hostname, no wildcard.
      { protocol: "https", hostname: "gabsportifolio.s3.amazonaws.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/banca-do-ingresso", destination: "/work/banca-do-ingresso", permanent: true },
      { source: "/playx1", destination: "/work/playx1", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
