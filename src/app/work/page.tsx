import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import { Nav } from "@/components/Home/Nav";
import { ArchiveList } from "@/components/Home/ArchiveList";
import { Footer } from "@/components/Home/Footer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "All projects, in production and archived.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const rows = projects.map((p) => ({
    slug: p.slug,
    name: p.id,
    category: p.category ?? "project",
    year: p.year,
  }));
  return (
    <Box className="bg-textured" minH="100vh" color="brand.text" display="flex" flexDirection="column">
      <Nav active="work" />
      <Box maxW="1200px" w="100%" mx="auto" flex="1">
        <Box px={{ base: 5, md: 8 }} pt={12} pb={4}>
          <Box fontSize={{ base: "32px", md: "42px" }} fontWeight="800" letterSpacing="-0.035em" lineHeight={1} color="brand.text">
            Work
          </Box>
          <Box mt={3} fontSize="14px" color="brand.textSecondary" maxW="500px">
            Every project, in production or shipped. Click for the case study.
          </Box>
        </Box>
        <ArchiveList rows={rows} total={projects.length} />
      </Box>
      <Footer />
    </Box>
  );
}
