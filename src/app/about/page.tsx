import type { Metadata } from "next";
import AboutContent from "@/components/About/AboutContent";

const description =
  "Gabriel Andrade is a software engineer in São Paulo building product interfaces, full-stack systems, and dependable AI-assisted workflows since 2022.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Gabriel Andrade",
    description,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About · Gabriel Andrade",
    description,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
