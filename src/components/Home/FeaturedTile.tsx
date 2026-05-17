"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { COVER_COMPONENTS } from "@/components/CoverVisuals";

type Props = {
  slug: string;
  status: string;
  year: string;
  name: string;
  blurb: string;
  stack: string[];
  aiTool?: string;
  coverComponent?: string;
};

export const FeaturedTile = ({ slug, status, year, name, blurb, stack, aiTool, coverComponent }: Props) => {
  const Cover = coverComponent ? COVER_COMPONENTS[coverComponent] : null;
  return (
    <Link href={`/work/${slug}`} style={{ textDecoration: "none" }}>
      <Box
        bg="brand.surface1"
        border="1px solid"
        borderColor="brand.border"
        borderRadius="12px"
        overflow="hidden"
        transition="all var(--duration-base) var(--ease-apple)"
        boxShadow="var(--inset-highlight)"
        _hover={{
          transform: "translateY(-1px)",
          borderColor: "brand.borderStrong",
          bg: "brand.surface2",
        }}
      >
        <Flex
          h="120px"
          bg="brand.bg"
          borderBottom="1px solid"
          borderColor="brand.borderSubtle"
          alignItems="center"
          justifyContent="center"
          position="relative"
          px={4}
        >
          {Cover && <Cover />}
          <Text
            position="absolute"
            top="10px"
            left="12px"
            fontSize="9px"
            color="brand.textMeta"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            {status.toUpperCase()} · {year}
          </Text>
        </Flex>
        <Box px={4} pt={4} pb={4}>
          <Text fontSize="15px" fontWeight="600" color="brand.text" mb={2}>{name}</Text>
          <Text fontSize="12px" color="brand.textSecondary" lineHeight={1.5} mb={4}>{blurb}</Text>
          <Flex gap={2} flexWrap="wrap">
            {stack.map((s) => (
              <Box
                key={s}
                as="span"
                fontSize="9px"
                color="brand.textMeta"
                border="1px solid"
                borderColor="brand.border"
                px={2}
                py="2px"
                borderRadius="4px"
                fontFamily="var(--font-mono)"
                letterSpacing="0.05em"
              >
                {s.toUpperCase()}
              </Box>
            ))}
            {aiTool && (
              <Box
                as="span"
                fontSize="9px"
                color="brand.accentHover"
                border="1px solid"
                borderColor="var(--accent-quiet)"
                bg="var(--accent-soft)"
                px={2}
                py="2px"
                borderRadius="4px"
                fontFamily="var(--font-mono)"
                letterSpacing="0.05em"
              >
                {aiTool.toUpperCase()}
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};
