"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import type { Project } from "@/types/project";

type Section = { id: string; label: string };
const SECTIONS: Section[] = [
  { id: "intro", label: "intro" },
  { id: "why", label: "why we built it" },
  { id: "build-log", label: "build log" },
  { id: "what-shipped", label: "what shipped" },
  { id: "what-id-change", label: "what i'd change" },
];

const TocLink = ({ id, label }: Section) => (
  <Flex
    as="a"
    href={`#${id}`}
    align="center"
    gap={2}
    py={2}
    fontSize="11px"
    color="brand.textMeta"
    fontFamily="var(--font-mono)"
    cursor="pointer"
    transition="color var(--duration-fast) var(--ease-apple)"
    _hover={{ color: "brand.text" }}
    sx={{
      "&::before": {
        content: '""',
        width: "16px",
        height: "1px",
        background: "var(--bg-surface-2)",
        transition: "width var(--duration-fast), background var(--duration-fast)",
      },
      "&:hover::before": { width: "24px", background: "var(--accent)" },
    }}
  >
    {label}
  </Flex>
);

export const StickySidebar = ({ project }: { project: Project }) => (
  <Box position="sticky" top="80px" height="fit-content" fontSize="11px">
    <Text
      fontSize="9px"
      color="brand.textMuted"
      letterSpacing="0.2em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={3}
    >
      on this page
    </Text>
    {SECTIONS.map((s) => (
      <TocLink key={s.id} {...s} />
    ))}

    <Box mt={8} pt={6} borderTop="1px solid" borderColor="brand.borderSubtle">
      <Text
        fontSize="9px"
        color="brand.textMuted"
        letterSpacing="0.2em"
        textTransform="uppercase"
        fontFamily="var(--font-mono)"
        fontWeight="700"
        mb={3}
      >
        meta
      </Text>
      <Box fontSize="10px" color="brand.textMeta" fontFamily="var(--font-mono)" lineHeight={2}>
        {project.startedAt && (
          <Box>
            started <Box as="span" color="brand.textSecondary">{project.startedAt}</Box>
          </Box>
        )}
        <Box>
          status <Box as="span" color="brand.accentHover">{project.status}</Box>
        </Box>
        {project.stackChips && (
          <Box>
            stack{" "}
            <Box as="span" color="brand.textSecondary">
              {project.stackChips.slice(0, 2).join("/").toLowerCase()}
            </Box>
          </Box>
        )}
        {project.aiTool && (
          <Box>
            ai <Box as="span" color="brand.accentHover">{project.aiTool.toLowerCase()}</Box>
          </Box>
        )}
      </Box>
    </Box>
  </Box>
);
