import type { Metadata } from "next";
import AboutContent from "./about/AboutContent";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Andrade · Front-end Developer",
    description,
  },
};

export default function Page() {
  return <AboutContent />;
}
