import type { Metadata } from "next";
import AboutContent from "@/components/About/AboutContent";

const description =
  "Gabriel Andrade, front-end engineer in São Paulo. Late pivot to code, on time for AI. Four years building production software before the AI boom.";

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
