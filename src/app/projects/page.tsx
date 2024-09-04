"use client";

import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { ProjectCard } from "./Components/ProjectCard";
import { useLanguage } from "../../context/language";

export default function Projects() {
  const { translations } = useLanguage();
  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  const mockedProjects = [
    {
      projectName: translations?.projects?.playx1?.title,
      projectDescription: translations?.projects?.playx1?.description,
      projectDate: "2023",
      projectImage: "https://picsum.photos/1901",
      link: "/playx1",
    },
    {
      projectName: translations?.projects?.bancaDoIngresso?.title,
      projectDescription: translations?.projects?.bancaDoIngresso?.description,
      projectDate: "2022",
      projectImage: "https://picsum.photos/1900",
      link: "/banca-do-ingresso",
    },
  ];

  return (
    <Box as="section" height="100%" className="body-content">
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
