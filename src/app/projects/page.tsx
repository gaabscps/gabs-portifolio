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
      projectImage:
        "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png",
      link: "/playx1",
    },
    {
      projectName: translations?.projects?.bancaDoIngresso?.title,
      projectDescription: translations?.projects?.bancaDoIngresso?.description,
      projectDate: "2022",
      projectImage:
        "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/home.png",
      link: "/banca-do-ingresso",
    },
    {
      projectName: translations?.projects?.dashboard?.title,
      projectDescription: translations?.projects?.dashboard?.description,
      projectDate: "2024",
      projectImage:
        "https://gabsportifolio.s3.amazonaws.com/img/Dashboard/dashboard.png",
      link: "/",
    },
  ];

  return (
    <Box as="section" height="100%" className="body-content" maxWidth='1040px'>
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
