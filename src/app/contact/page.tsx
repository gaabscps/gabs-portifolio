import type { Metadata } from "next";
import ContactContent from "@/components/Contact/ContactContent";

const description =
  "Get in touch with Gabriel Andrade — WhatsApp, Telegram, or email for new projects and opportunities.";

export const metadata: Metadata = {
  title: "Contact · Gabriel Andrade",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Gabriel Andrade",
    description,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Gabriel Andrade",
    description,
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
