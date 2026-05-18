"use client";

import { useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import type { Project } from "@/types/project";
import { useActiveSection } from "@/hooks/useActiveSection";

type Section = { id: string; label: string };

const buildSections = (project: Project): Section[] => {
  const sections: Section[] = [{ id: "intro", label: "intro" }];
  if (project.motivation) sections.push({ id: "why", label: "why we built it" });
  if (project.buildLog?.length) sections.push({ id: "build-log", label: "build log" });
  if (project.plugins?.length) sections.push({ id: "plugins", label: "plugins" });
  if (project.results?.length) sections.push({ id: "what-shipped", label: "what shipped" });
  if (project.retrospective) sections.push({ id: "what-id-change", label: "what i'd change" });
  if (project.server) sections.push({ id: "join", label: "join the server" });
  return sections;
};

const TocLink = ({ id, label, isActive }: Section & { isActive: boolean }) => (
  <Flex
    as="a"
    href={`#${id}`}
    align="center"
    gap={2}
    py={2}
    fontSize="11px"
    color={isActive ? "brand.text" : "brand.textMeta"}
    fontWeight={isActive ? "600" : "400"}
    fontFamily="var(--font-mono)"
    cursor="pointer"
    transition="color var(--duration-fast) var(--ease-apple)"
    aria-current={isActive ? "location" : undefined}
    _hover={{ color: "brand.text" }}
    sx={{
      "&::before": {
        content: '""',
        width: isActive ? "28px" : "16px",
        height: "1px",
        background: isActive ? "var(--accent)" : "var(--bg-surface-2)",
        transition: "width var(--duration-base) var(--ease-apple), background var(--duration-fast)",
      },
      "&:hover::before": { width: "24px", background: "var(--accent)" },
    }}
  >
    {label}
  </Flex>
);

export const StickySidebar = ({ project }: { project: Project }) => {
  const sections = useMemo(() => buildSections(project), [project]);
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const activeId = useActiveSection(ids);

  return (
  <Box height="fit-content" fontSize="11px">
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
    {sections.map((s) => (
      <TocLink key={s.id} {...s} isActive={s.id === activeId} />
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
};
