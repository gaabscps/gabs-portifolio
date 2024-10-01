"use client";

import {
  Container,
  Box,
  Flex,
  Text,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { useLanguage } from "../../context/language";
import { Card } from "@/components/Card";
import { FaReact } from "react-icons/fa";
import {
  TbBrandNextjs,
  TbBrandReactNative,
  TbBrandTypescript,
  TbBrandJavascript,
  TbBrandGithub,
} from "react-icons/tb";
import { CiMobile1 } from "react-icons/ci";
import { SiFigma, SiSwagger } from "react-icons/si";
import { DiScrum } from "react-icons/di";

export default function About() {
  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  const skills = [
    {
      name: "React",
      icon: <FaReact size="40px" />,
      color: "#61DAFB",
    },
    {
      name: "React Native",
      icon: <TbBrandReactNative size="40px" />,
      color: "#3a8296",
    },
    {
      name: "Next.js",
      icon: <TbBrandNextjs size="40px" />,
      color: "#fff",
    },
    {
      name: "TypeScript",
      icon: <TbBrandTypescript size="40px" />,
      color: "#3178C6",
    },
    {
      name: "Javascript",
      icon: <TbBrandJavascript size="40px" />,
      color: "#FF9900",
    },
    {
      name: "Responsive Design",
      icon: <CiMobile1 size="40px" />,
      color: "#AC6BED",
    },
    {
      name: "GitHub",
      icon: <TbBrandGithub size="20px" />,
      color: "#c6c6c6",
    },
    {
      name: "Swagger",
      icon: <SiSwagger size="20px" />,
      color: "#85ea2d",
    },
    {
      name: "Figma",
      icon: <SiFigma size="20px" />,
      color: "#0ACF83",
    },
    {
      name: "Scrum",
      icon: <DiScrum size="20px" />,
      color: "#ff6666",
    },
  ];

  const { translations } = useLanguage();
  return (
    <Box
      as="section"
      width="100%"
      display="flex"
      flexDirection="column"
      className="body-content"
      maxWidth="1040px"
    >
      <Image
        _hover={{ transform: "scale(1.05)" }}
        transition={"all 0.2s ease"}
        margin="0 auto"
        width={"200px"}
        border={"2px solid #AC6BED"}
        borderRadius={"50%"}
        src="https://gabsportifolio.s3.amazonaws.com/img/About/perfil.png"
        alt="Gabriel Andrade"
      />
      <Container maxWidth="1040px" justifyContent="center" padding="32px 0">
        <Text
          marginBottom={"16px"}
          dangerouslySetInnerHTML={{ __html: translations?.about?.text1 }}
        />
        <Text
          marginBottom={"16px"}
          dangerouslySetInnerHTML={{ __html: translations?.about?.text2 }}
        />
        <Text
          marginBottom={"16px"}
          dangerouslySetInnerHTML={{ __html: translations?.about?.text3 }}
        />
        <Text
          marginBottom={"16px"}
          dangerouslySetInnerHTML={{ __html: translations?.about?.text4 }}
        />
      </Container>
      <Flex
        flexWrap="wrap"
        gap={isDesktop ? "37px" : "56px"}
        justifyContent={isDesktop ? "space-between" : "center"}
        padding="32px 0"
      >
        {skills?.map((skill, i) => (
          <Card
            boxShadow={`0px 0px 10px 0px ${skill.color}`}
            key={i}
            width="150px"
            height="auto"
            roundBorder
            borderColor="#c6c6c6"
            hoverColor={skill.color}
            hoverTextColor={skill.color}
          >
            {skill.icon}
            <Text textAlign="center">{skill.name}</Text>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}
