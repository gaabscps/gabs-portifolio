"use client";

import { Card } from "@/components/Card";
import { ProjectPlaceholder } from "@/components/ProjectPlaceholder";
import type { ProjectView } from "@/hooks/useProjects";
import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";

interface ProjectCardProps {
  project: ProjectView;
  isDesktop?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDesktop }) => {
  const { title, description, coverImage, year, links, status, skills } =
    project;
  const underConstruction = status === "under-construction";
  const href = links.route ?? "";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 768px)")[0];

  useEffect(() => {
    if (!isDesktop) {
      onOpen();
    } else {
      onClose();
    }
  }, [isDesktop, onOpen, onClose]);

  return (
    <Card>
      <Link
        href={href}
        onClick={(e) => {
          if (underConstruction) {
            e.preventDefault();
          }
        }}
      >
        <Box
          cursor={underConstruction ? "not-allowed" : "pointer"}
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
            opacity={isOpen ? 0.2 : 1}
            transition="opacity 0.3s ease"
          >
            <Image
              objectFit="cover"
              height="600px"
              width={isDesktop ? "1040px" : "auto"}
              borderRadius="10px"
              src={coverImage}
              alt=""
              fallback={
                <ProjectPlaceholder
                  height="600px"
                  width={isDesktop ? "1040px" : "100%"}
                />
              }
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
              width={isDesktop ? "620px" : "100%"}
              color="white"
              top="0"
              left={isDesktop ? "225px" : "0"}
              transition="all 0.3s ease"
              zIndex="100"
              height="100%"
              padding={"48px 16px"}
              gap={isDesktop ? "0" : "8px"}
              marginBottom={isDesktop ? "0" : "16px"}
            >
              <Text
                color="white"
                fontSize={isDesktop ? "32px" : "24px"}
                fontWeight="700"
                maxWidth={isDesktop ? "60%" : "100%"}
              >
                {title}
              </Text>
              <Text
                fontSize={isDesktop ? "16px" : "14px"}
                transition="margin 0.3s ease"
              >
                {description}
              </Text>
              <Text fontWeight="700" transition="margin-bottom 0.3s ease">
                {year}
              </Text>

              {!isMobile && (
                <Flex flexWrap="wrap" gap="16px" justifyContent="center">
                  {skills?.map((skill, i) => (
                    <Card
                      boxShadow={`0px 0px 10px 0px ${skill.color}`}
                      key={i}
                      width={isDesktop ? "100px" : "80px"}
                      minHeight={isDesktop ? "100px" : "80px"}
                      roundBorder
                      borderColor="#c6c6c6"
                      hoverColor={skill.color}
                      hoverTextColor={skill.color}
                    >
                      {skill.icon}
                      <Text fontSize="12px" textAlign="center">
                        {skill.name}
                      </Text>
                    </Card>
                  ))}
                </Flex>
              )}
            </Flex>
          )}
        </Box>
      </Link>
    </Card>
  );
};

export { ProjectCard };
