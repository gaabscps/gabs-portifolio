"use client";

import { Box } from "@chakra-ui/react";
import { COVER_COMPONENTS } from "@/components/CoverVisuals";

export const LivePreview = ({ component }: { component?: string }) => {
  const Cover = component ? COVER_COMPONENTS[component] : null;
  return (
    <Box
      mb={10}
      p={4}
      bg="brand.bg"
      border="1px solid"
      borderColor="brand.border"
      borderRadius="12px"
      position="relative"
      overflow="hidden"
      minH="240px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="var(--shadow-md), var(--inset-highlight)"
      transition="all var(--duration-base) var(--ease-apple)"
      _hover={{ borderColor: "brand.borderStrong" }}
      _before={{
        content: '"▶ LIVE PREVIEW"',
        position: "absolute",
        top: "12px",
        right: "12px",
        fontSize: "8px",
        color: "var(--text-meta)",
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        letterSpacing: "0.15em",
      }}
    >
      {Cover && <Cover />}
    </Box>
  );
};
