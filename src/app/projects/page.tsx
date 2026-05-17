import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

const description =
  "Projetos selecionados de Gabriel Andrade — incluindo PlayX1, Banca do Ingresso e mais.";

export const metadata: Metadata = {
  title: "Projetos",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projetos · Gabriel Andrade",
    description,
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos · Gabriel Andrade",
    description,
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
