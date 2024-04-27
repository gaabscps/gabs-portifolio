"use client";

import { Card } from "@/components/Card";
import { Text, Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface ProjectCardProps {
  project: {
    projectName: string;
    projectDescription: string;
    projectImage: string;
    projectDate: string;
    link: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { projectName, projectDescription, projectImage, projectDate, link } =
    project;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card roundBorder>
      <a href={link}>
        <Box
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          position="relative"
          transition="all 0.3s ease"
        >
          <Box
            position="relative"
            cursor="pointer"
            opacity={isOpen ? 0.2 : 1}
            transition="opacity 0.3s ease"
          >
            <Image
              objectFit="cover"
              maxHeight="600px"
              minWidth="820px"
              borderRadius="10px"
              src={projectImage}
              alt=""
            />
          </Box>
          {isOpen && (
            <Flex
              flexDir="column"
              justifyContent="space-between"
              alignItems="center"
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              position="absolute"
              textAlign="center"
              width="620px"
              color="white"
              top="0"
              left="105px"
              transition="all 0.3s ease"
              zIndex="100"
              height="100%"
              padding="48px 0"
            >
              <Text
                color="white"
                fontSize="32px"
                fontWeight="700"
                maxWidth="60%"
              >
                {projectName}
              </Text>
              <Text transition="margin 0.3s ease">{projectDescription}</Text>
              <Text fontWeight="700" transition="margin-bottom 0.3s ease">
                {projectDate}
              </Text>
            </Flex>
          )}
        </Box>
      </a>
    </Card>
  );
};

export { ProjectCard };
