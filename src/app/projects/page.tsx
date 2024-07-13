import { Container, Flex } from "@chakra-ui/react";
import { ProjectCard } from "./Components/ProjectCard";

export default function Projects() {
  const mockedProjects = [
    {
      projectName: "Banca do ingresso Painel Administrativo",
      projectDescription:
        "O projeto Banca do Ingresso é um sistema de gestão de ingressos para eventos. O painel administrativo é uma aplicação web que permite a gestão de eventos, ingressos e usuários. O sistema foi desenvolvido utilizando react e typescript.",
      projectDate: "2022",
      projectImage: "https://picsum.photos/200",
      link: "/banca-do-ingresso",
    },
    {
      projectName: "PlayX1",
      projectDescription:
        "O PlayX1 é o projeto de uma plataforma de apostas em jogos online. O projeto foi desenvolvido utilizando ReactJS, NextJS, Typescript",
      projectDate: "2023",
      projectImage: "https://picsum.photos/200",
      link: "/playx1",
    },
  ];

  return (
    <Container height="100%" className="body-content">
      <Flex justify="center" flexWrap="wrap" gap="37px" paddingBottom="60px">
        {mockedProjects &&
          mockedProjects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
      </Flex>
    </Container>
  );
}
