import type { Metadata } from "next";
import AboutContent from "./AboutContent";

const description =
  "Conheça Gabriel Andrade: desenvolvedor front-end com experiência em React, Next.js, TypeScript, Chakra UI e React Native.";

export const metadata: Metadata = {
  title: "Sobre mim",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Sobre mim · Gabriel Andrade",
    description,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre mim · Gabriel Andrade",
    description,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
