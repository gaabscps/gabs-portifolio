import type { Metadata } from "next";
import HomeContent from "@/components/Home/HomeContent";

const description =
  "Software engineer in São Paulo building product interfaces, full-stack systems, and AI-assisted workflows since 2022.";

export const metadata: Metadata = {
  title: { absolute: "Gabriel Andrade · Software Engineer" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gabriel Andrade · Software Engineer",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Andrade · Software Engineer",
    description,
  },
};

export default function Page() {
  return <HomeContent />;
}
