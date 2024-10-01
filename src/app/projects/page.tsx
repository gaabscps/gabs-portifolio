"use client";

import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { ProjectCard } from "./Components/ProjectCard";
import { useProjects } from "@/hooks/useProjects";

export default function Projects() {
  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  const mockedProjects = useProjects();

  return (
    <Box as="section" height="100%" className="body-content" maxWidth="1040px">
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
