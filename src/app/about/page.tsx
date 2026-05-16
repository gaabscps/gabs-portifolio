import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { siteConfig } from "@/config/site";

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
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    title: "Sobre mim · Gabriel Andrade",
    description,
    images: [siteConfig.ogImage],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
