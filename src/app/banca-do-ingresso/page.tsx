import type { Metadata } from "next";
import BancaDoIngressoContent from "./BancaDoIngressoContent";

const description =
  "Banca do Ingresso: painel administrativo white-label para gestão de eventos, ingressos e relatórios, construído com React e TypeScript.";
const ogImage =
  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/dashboard+bdi.png";

export const metadata: Metadata = {
  title: "Banca do Ingresso",
  description,
  alternates: { canonical: "/banca-do-ingresso" },
  openGraph: {
    title: "Banca do Ingresso · Gabriel Andrade",
    description,
    url: "/banca-do-ingresso",
    images: [{ url: ogImage, alt: "Banca do Ingresso admin dashboard" }],
  },
  twitter: {
    title: "Banca do Ingresso · Gabriel Andrade",
    description,
    images: [ogImage],
  },
};

export default function BancaDoIngressoPage() {
  return <BancaDoIngressoContent />;
}
