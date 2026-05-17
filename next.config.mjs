import withBundleAnalyzerImport from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerImport({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/banca-do-ingresso", destination: "/work/banca-do-ingresso", permanent: true },
      { source: "/playx1", destination: "/work/playx1", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
