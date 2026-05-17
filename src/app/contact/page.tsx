import type { Metadata } from "next";
import ContactContent from "./ContactContent";

const description =
  "Entre em contato com Gabriel Andrade por WhatsApp, Telegram ou email para novos projetos e oportunidades.";

export const metadata: Metadata = {
  title: "Contato",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contato · Gabriel Andrade",
    description,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato · Gabriel Andrade",
    description,
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
