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
      {/* Sidebar is viewport-fixed so it never scrolls away; left edge tracks the 1200px container */}
      <Box
        display={{ base: "none", lg: "block" }}
        position="fixed"
        top="92px"
        left="max(32px, calc(50vw - 568px))"
        w="180px"
        maxH="calc(100vh - 112px)"
        overflowY="auto"
        zIndex={5}
        sx={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
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
