import type { Metadata } from "next";
import PlayX1Content from "./PlayX1Content";

const description =
  "PlayX1: plataforma de duelos de jogos online desenvolvida com React, Next.js, TypeScript e Chakra UI.";
const ogImage =
  "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png";

export const metadata: Metadata = {
  title: "PlayX1",
  description,
  alternates: { canonical: "/playx1" },
  openGraph: {
    title: "PlayX1 · Gabriel Andrade",
    description,
    url: "/playx1",
    images: [{ url: ogImage, alt: "PlayX1 landing page" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlayX1 · Gabriel Andrade",
    description,
    images: [ogImage],
  },
};

export default function PlayX1Page() {
  return <PlayX1Content />;
}
