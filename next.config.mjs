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
      { source: "/banca-do-ingresso", destination: "/work", permanent: true },
      { source: "/playx1", destination: "/work", permanent: true },
      { source: "/work/banca-do-ingresso", destination: "/work", permanent: true },
      { source: "/work/playx1", destination: "/work", permanent: true },
      { source: "/work/bettersmp", destination: "/work", permanent: true },
      { source: "/work/calendarfr", destination: "/work", permanent: true },
      { source: "/work/dashboard", destination: "/work", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
