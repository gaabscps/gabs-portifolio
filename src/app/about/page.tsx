"use client";

import { Container, Box, Flex, Text, Image } from "@chakra-ui/react";
import { useLanguage } from "../../context/language";

export default function About() {
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
        src="https://gabsportifolio.s3.amazonaws.com/img/perfil.png"
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
      <Flex flexWrap="wrap" gap="48px" justifyContent="center" padding="32px 0">
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
        <Text textAlign="center">SkillsSkillsSkillsSkills</Text>
      </Flex>
    </Box>
  );
}
