import { Container, Flex } from "@chakra-ui/react";
import { ProjectCard } from "./Components/ProjectCard";
import { useLanguage } from "../../context/language";

export default function Projects() {
  const { translations } = useLanguage();

  const mockedProjects = [
    {
      projectName: translations?.projects?.bancaDoIngresso?.title,
      projectDescription: translations?.projects?.bancaDoIngresso?.description,
      projectDate: "2022",
      projectImage: "https://picsum.photos/200",
      link: "/banca-do-ingresso",
    },
    {
      projectName: translations?.projects?.playx1?.title,
      projectDescription: translations?.projects?.playx1?.description,
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
