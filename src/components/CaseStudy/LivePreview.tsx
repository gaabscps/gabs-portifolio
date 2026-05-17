"use client";

import { Box } from "@chakra-ui/react";
import { COVER_COMPONENTS } from "@/components/CoverVisuals";

export const LivePreview = ({ component }: { component?: string }) => {
  const Cover = component ? COVER_COMPONENTS[component] : null;
  return (
    <Box
      mb={10}
      p={3.5}
      bg="brand.bg"
      border="1px solid rgba(172,107,237,.3)"
      borderRadius="10px"
      position="relative"
      overflow="hidden"
      minH="200px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="border-color 300ms, box-shadow 300ms"
      _hover={{ borderColor: "brand.accent", boxShadow: "0 0 24px -8px rgba(172,107,237,.4)" }}
      _before={{
        content: '"▶ LIVE PREVIEW"',
        position: "absolute",
        top: "8px",
        right: "10px",
        fontSize: "8px",
        color: "var(--accent-hover)",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: "0.15em",
        opacity: 0.7,
      }}
    >
      {Cover && <Cover />}
    </Box>
  );
};
