import { Container, Flex } from "@chakra-ui/react";
import { ProjectsComponent } from "./Components/Projects";

export default function Projects() {
  const mockedProjects = [
    {
      projectName: "Banca do ingresso Painel Administrativo",
      projectDescription:
        "O projeto Banca do Ingresso é um sistema de gestão de ingressos para eventos. O painel administrativo é uma aplicação web que permite a gestão de eventos, ingressos e usuários. O sistema foi desenvolvido utilizando ReactJS, NodeJS e MongoDB.",
      projectDate: "2022",
      projectImage:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZRCqJlGTwm2IAcCZmyRQ8t9hWq4kBSz8-0uvbTfOKgyi0YyLBOYBNAlsiuWDMMR8jyQQ7Q2BjA0mhtDCR_X91_YviBQw=w2560-h953",
      borderColor: "#D9241B",
    },
    {
      projectName: "PlayX1",
      projectDescription:
        "O PlayX1 é um projeto de uma plataforma de apostas em jogos online. O projeto foi desenvolvido utilizando ReactJS, NextJS, Typescript, NodeJS e MongoDB",
      projectDate: "2023",
      projectImage:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYG-EWuED3JKnCyFp0Zbnfugp-weQlSYTAwqXH3WaDtV4rh9szw-KsrlOtuAXOJGYMhxIIW8iL5WFuLNrLJkhTHB8O7sA=w1600-h773",
      borderColor: "#AC6BED",
    },
  ];

  return (
    <Container height="100%" className="body-content">
      <Flex justify="center" flexWrap="wrap" gap="37px" paddingBottom="60px">
        {mockedProjects &&
          mockedProjects.map((project, i) => (
            <ProjectsComponent key={i} project={project} />
          ))}
      </Flex>
    </Container>
  );
}
