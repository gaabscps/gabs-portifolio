import type { Metadata } from "next";
import AboutContent from "./about/AboutContent";
import { siteConfig } from "@/config/site";

const description =
  "Sou Gabriel Andrade, desenvolvedor front-end (React, Next.js, TypeScript) focado em interfaces dinâmicas, limpas e em ótimas experiências de usuário.";

export const metadata: Metadata = {
  title: "Gabriel Andrade · Front-end Developer",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gabriel Andrade · Front-end Developer",
    description,
    url: "/",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    title: "Gabriel Andrade · Front-end Developer",
    description,
    images: [siteConfig.ogImage],
  },
};

export default function Page() {
  return <AboutContent />;
}
