import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { siteConfig } from "@/config/site";

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
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    title: "Contato · Gabriel Andrade",
    description,
    images: [siteConfig.ogImage],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
