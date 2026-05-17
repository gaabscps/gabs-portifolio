"use client";

import { Box, Grid } from "@chakra-ui/react";
import type { Project } from "@/types/project";
import { StickyBar } from "./StickyBar";
import { StickySidebar } from "./StickySidebar";

export const CaseStudyLayout = ({ project, children }: { project: Project; children: React.ReactNode }) => (
  <Box className="bg-textured" minH="100vh" color="brand.text">
    <StickyBar />
    <Grid
      templateColumns={{ base: "1fr", md: "160px 1fr" }}
      gap={{ base: 6, md: 8 }}
      px={{ base: 5, md: 8 }}
      pt={9}
    >
      <Box display={{ base: "none", md: "block" }}>
        <StickySidebar project={project} />
      </Box>
      <Box maxW="560px">{children}</Box>
    </Grid>
  </Box>
);
