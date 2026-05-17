"use client";

import { Box, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { ProjectCard } from "./Components/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { useLanguage } from "@/context/language";

export default function ProjectsContent() {
  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  const mockedProjects = useProjects();
  const { translations } = useLanguage();

  return (
    <Box as="section" height="100%" className="body-content" maxWidth="1040px">
      <Heading
        as="h1"
        fontSize={{ base: "28px", md: "32px" }}
        fontWeight="700"
        textAlign="center"
        paddingBottom="32px"
      >
        {translations?.projects?.h1}
      </Heading>
      <Flex
        justify="center"
        flexWrap="wrap"
        gap={isDesktop ? "37px" : "56px"}
        paddingBottom="60px"
      >
        {mockedProjects &&
          mockedProjects.map((project, i) => (
            <ProjectCard isDesktop={isDesktop} key={i} project={project} />
          ))}
      </Flex>
    </Box>
  );
}
