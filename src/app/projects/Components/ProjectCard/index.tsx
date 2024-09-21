"use client";

import { Card } from "@/components/Card";
import { Text, Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";

interface ProjectCardProps {
  project: {
    projectName: string;
    projectDescription: string;
    projectImage: string;
    projectDate: string;
    link: string;
  };
  isDesktop?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDesktop }) => {
  const { projectName, projectDescription, projectImage, projectDate, link } =
    project;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isDesktop) {
      onOpen();
    } else {
      onClose();
    }
  }, [isDesktop, onOpen, onClose]);

  return (
    <Card>
      <Link href={link}>
        <Box
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          position="relative"
          transition="all 0.3s ease"
          display={isDesktop ? "block" : "flex"}
          flexDirection="column-reverse"
          alignItems="center"
        >
          <Box
            position="relative"
            cursor="pointer"
            opacity={isDesktop && isOpen ? 0.2 : 1}
            transition="opacity 0.3s ease"
          >
            <Image
              objectFit="cover"
              height="600px"
              minWidth={isDesktop ? "820px" : "auto"}
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
              position={isDesktop ? "absolute" : "relative"}
              textAlign="center"
              width={isDesktop ? "620px" : "auto"}
              color="white"
              top="0"
              left={isDesktop ? "105px" : "0"}
              transition="all 0.3s ease"
              zIndex="100"
              height="100%"
              padding={isDesktop ? "48px 0" : " 0"}
              gap={isDesktop ? "0" : "8px"}
              marginBottom={isDesktop ? "0" : "16px"}
            >
              <Text
                color="white"
                fontSize={isDesktop ? "32px" : "24px"}
                fontWeight="700"
                maxWidth={isDesktop ? "60%" : "100%"}
              >
                {projectName}
              </Text>
              <Text
                fontSize={isDesktop ? "16px" : "14px"}
                transition="margin 0.3s ease"
              >
                {projectDescription}
              </Text>
              <Text fontWeight="700" transition="margin-bottom 0.3s ease">
                {projectDate}
              </Text>
            </Flex>
          )}
        </Box>
      </Link>
    </Card>
  );
};

export { ProjectCard };
