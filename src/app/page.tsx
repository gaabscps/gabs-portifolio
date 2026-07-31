import type { Metadata } from "next";
import HomeContent from "@/components/Home/HomeContent";

const description =
  "Front-end engineer in São Paulo. Three years shipping production software before the AI boom, now shipping with it as leverage.";

export const metadata: Metadata = {
  title: { absolute: "Gabriel Andrade · Front-end Engineer" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gabriel Andrade · Front-end Engineer",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Andrade · Front-end Engineer",
    description,
  },
};

export default function Page() {
  return <HomeContent />;
}
