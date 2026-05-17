"use client";

import { Box } from "@chakra-ui/react";
import type { Project } from "@/types/project";
import { StickyBar } from "./StickyBar";
import { StickySidebar } from "./StickySidebar";

export const CaseStudyLayout = ({ project, children }: { project: Project; children: React.ReactNode }) => (
  <Box className="bg-textured" minH="100vh" color="brand.text">
    <StickyBar />

    <Box
      position="relative"
      maxW="1200px"
      w="100%"
      mx="auto"
      px={{ base: 4, md: 8 }}
      pt={10}
    >
      {/* Sidebar floats on left, doesn't affect main centering */}
      <Box
        display={{ base: "none", lg: "block" }}
        position="absolute"
        left={{ lg: 8 }}
        top={10}
        w="180px"
      >
        <StickySidebar project={project} />
      </Box>

      {/* Main column visually centered on the page */}
      <Box maxW="720px" mx="auto">
        {children}
      </Box>
    </Box>
  </Box>
);
