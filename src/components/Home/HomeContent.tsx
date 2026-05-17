"use client";

import { Box } from "@chakra-ui/react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Featured } from "./Featured";
import { Workshop } from "./Workshop";
import { ArchiveList } from "./ArchiveList";
import { Footer } from "./Footer";
import { projects } from "@/data/projects";

export default function HomeContent() {
  const archive = projects.slice(0, 3).map((p) => ({
    slug: p.slug,
    name: p.id,
    category: p.category ?? "project",
    year: p.year,
  }));

  return (
    <Box className="bg-textured" minH="100vh" color="brand.text">
      <Nav active="work" />
      <Hero />
      <Featured />
      <Workshop />
      <ArchiveList rows={archive} total={projects.length} />
      <Footer />
    </Box>
  );
}
