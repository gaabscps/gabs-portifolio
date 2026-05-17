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
        borderRadius="10px"
        overflow="hidden"
        transition="all 350ms var(--ease-out-quart)"
        _hover={{
          transform: "translateY(-3px)",
          borderColor: "brand.accent",
          boxShadow: "0 12px 32px -8px rgba(172,107,237,.25)",
        }}
      >
        <Flex
          h="100px"
          bg="brand.bg"
          borderBottom="1px solid"
          borderColor="brand.borderSubtle"
          alignItems="center"
          justifyContent="center"
          position="relative"
          px={3.5}
        >
          {Cover && <Cover />}
          <Text
            position="absolute"
            top="8px"
            left="10px"
            fontSize="8px"
            color="brand.accentHover"
            fontFamily="var(--font-mono)"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            {status.toUpperCase()} · {year}
          </Text>
        </Flex>
        <Box px={3.5} pt={3.5} pb={3.5}>
          <Text fontSize="14px" fontWeight="700" color="brand.text" mb={1.5}>{name}</Text>
          <Text fontSize="10.5px" color="brand.textSecondary" lineHeight={1.45} mb={2.5}>{blurb}</Text>
          <Flex gap="5px" flexWrap="wrap">
            {stack.map((s) => (
              <Box
                key={s}
                as="span"
                fontSize="8px"
                color="brand.textMeta"
                border="1px solid"
                borderColor="brand.border"
                px="6px"
                py="2px"
                borderRadius="3px"
                fontFamily="var(--font-mono)"
              >
                {s.toUpperCase()}
              </Box>
            ))}
            {aiTool && (
              <Box
                as="span"
                fontSize="8px"
                color="brand.accentHover"
                border="1px solid"
                borderColor="rgba(172,107,237,0.4)"
                px="6px"
                py="2px"
                borderRadius="3px"
                fontFamily="var(--font-mono)"
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
