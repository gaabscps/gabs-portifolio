"use client";

import { Card } from "@/components/Card";
import { FullSizeImageModal } from "@/components/FullSizeImageModal";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ProjectPlaceholder } from "@/components/ProjectPlaceholder";
import { useLanguage } from "@/context/language";
import { useFullSize } from "@/hooks/useFullSize";
import { useProjects } from "@/hooks/useProjects";
import { renderRichText } from "@/lib/renderRichText";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCopy, FaCheck, FaGithub } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

export type CredentialsType = {
  title: string;
  value: string;
  type: "email" | "password";
  state?: boolean;
};

export default function PlayX1Content() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const { isOpenedImage, openImageFullSize, setIsOpenedImage, openedImage } =
    useFullSize();
  const { translations } = useLanguage();
  const projects = useProjects();
  const skills = projects.find((p) => p.slug === "playx1")?.skills ?? [];

  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  const credentials: CredentialsType[] = [
    {
      title: translations?.playx1?.email,
      value: "playx1@admin.com",
      type: "email",
      state: copiedEmail,
    },
    {
      title: translations?.playx1?.password,
      value: "123",
      type: "password",
      state: copiedPassword,
    },
  ];

  const copyToClipboard = (text: string, type: "email" | "password") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
      }, 2000);
    } else {
      setCopiedPassword(true);
      setTimeout(() => {
        setCopiedPassword(false);
      }, 2000);
    }
  };

  return (
    <>
      {isOpenedImage && (
        <FullSizeImageModal
          borderColor="#C3ACDA"
          openedImage={openedImage}
          closeIcon={
            <RiCloseLine
              color="black"
              fill="black"
              className="closeIcon"
              size="24px"
              onClick={() => setIsOpenedImage(false)}
            />
          }
        />
      )}
      <Box width={isDesktop ? "auto" : "100%"}>
        <Box
          pointerEvents={isOpenedImage ? "none" : "auto"}
          opacity={isOpenedImage ? "0.2" : ""}
          maxWidth="1040px"
          className="body-content"
          as="section"
        >
          <Heading
            as="h1"
            fontSize={{ base: "32px", md: "40px" }}
            fontWeight="700"
            textAlign="center"
            paddingTop={isDesktop ? "16px" : "8px"}
          >
            {translations?.playx1?.h1}
          </Heading>
          <Heading
            as="h2"
            fontSize="24px"
            fontWeight="700"
            paddingTop="32px"
            textAlign={isDesktop ? "left" : "center"}
          >
            {translations?.playx1?.h2About}
          </Heading>
          <Flex
            flexWrap="wrap"
            padding={isDesktop ? "16px 0 80px" : "16px 0 24px"}
            justifyContent={isDesktop ? "space-between" : "center"}
            gap="8px"
          >
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
          <Flex
            gap="40px"
            width="100%"
            paddingBottom="160px"
            flexDirection={isDesktop ? "row" : "column"}
          >
            <Box
              cursor="pointer"
              borderRadius="10px"
              border="2px solid #C3ACDA"
              _hover={{
                boxShadow: "0px 0px 25px #C3ACDA",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
              flex={isDesktop ? "1" : "unset"}
              minWidth="0"
              width={isDesktop ? "auto" : "100%"}
              position="relative"
              height="600px"
              overflow="hidden"
              onClick={() =>
                openImageFullSize(
                  "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png"
                )
              }
            >
              <ImageWithFallback
                fill
                sizes="(min-width: 1023px) 50vw, 100vw"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src="https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png"
                alt="PlayX1 landing page"
                fallback={
                  <ProjectPlaceholder
                    height="600px"
                    borderColor="#C3ACDA"
                  />
                }
              />
            </Box>
            <Box as="aside" width={isDesktop ? "50%" : "100%"}>
              <Flex height="100%" alignItems="center">
                <Text
                  lineHeight="40px"
                  textAlign="center"
                  fontSize="24px"
                >
                  {renderRichText(translations?.playx1?.text1)}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex
            flexDirection={isDesktop ? "row" : "column-reverse"}
            gap="40px"
            width="100%"
            paddingBottom="160px"
          >
            <Box as="aside" width={isDesktop ? "30%" : "100%"}>
              <Flex height="100%" alignItems="center">
                <Text
                  lineHeight="40px"
                  textAlign="center"
                  fontSize="24px"
                >
                  {renderRichText(translations?.playx1?.text2)}
                </Text>
              </Flex>
            </Box>
            <Box
              cursor="pointer"
              borderRadius="10px"
              border="2px solid #C3ACDA"
              _hover={{
                boxShadow: "0px 0px 25px #C3ACDA",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
              flex={isDesktop ? "1" : "unset"}
              minWidth="0"
              width={isDesktop ? "auto" : "100%"}
              position="relative"
              height="600px"
              overflow="hidden"
              onClick={() =>
                openImageFullSize(
                  "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/home.png"
                )
              }
            >
              <ImageWithFallback
                fill
                sizes="(min-width: 1023px) 50vw, 100vw"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src="https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/home.png"
                alt="PlayX1 home screen"
                fallback={
                  <ProjectPlaceholder
                    height="600px"
                    borderColor="#C3ACDA"
                  />
                }
              />
            </Box>
          </Flex>
          <Flex
            paddingBottom="80px"
            flexDirection={isDesktop ? "column" : "column-reverse"}
          >
            <Text textAlign="center" fontSize="24px" margin="40px 0">
              {renderRichText(translations?.playx1?.text3)}
            </Text>
            <Box
              cursor="pointer"
              borderRadius="10px"
              border="2px solid #C3ACDA"
              _hover={{
                boxShadow: "0px 0px 25px #C3ACDA",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
              flex={isDesktop ? "1" : "unset"}
              minWidth="0"
              width={isDesktop ? "auto" : "100%"}
              position="relative"
              height="600px"
              overflow="hidden"
              onClick={() =>
                openImageFullSize(
                  "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/match.png"
                )
              }
            >
              <ImageWithFallback
                fill
                sizes="(min-width: 1023px) 1040px, 100vw"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src="https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/match.png"
                alt="PlayX1 match screen"
                fallback={
                  <ProjectPlaceholder
                    height="600px"
                    borderColor="#C3ACDA"
                  />
                }
              />
            </Box>
          </Flex>
        </Box>

        <hr></hr>

        <Heading as="h2" fontSize="24px" fontWeight="700" paddingTop="32px">
          {translations?.playx1?.h2Access}
        </Heading>
        <Flex
          width="100%"
          gap="32px"
          padding="24px 0 40px"
          alignItems="center"
          flexDirection={isDesktop ? "row" : "column"}
        >
          <Box width="100%">
            <Text fontSize="24px" fontWeight="700">
              {translations?.playx1?.navigate}
            </Text>
            <Text>{translations?.playx1?.credentialsTitle}</Text>
            {credentials.map((credential, i) => (
              <Flex key={i} gap="16px" alignItems="center">
                <>
                  <Text>
                    {credential.title}: {credential.value}
                  </Text>
                  <Box
                    _hover={{
                      color: "#ac6bed",
                    }}
                    _active={{
                      color: "#C3ACDA",
                    }}
                  >
                    {credential.state ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaCopy
                        cursor="pointer"
                        onClick={() => {
                          copyToClipboard(credential.value, credential.type);
                        }}
                      />
                    )}
                  </Box>
                </>
              </Flex>
            ))}
          </Box>

          <Flex width="100%" flexDirection="column" gap="16px">
            <Button
              onClick={() => {
                window.open(
                  "https://projeto-x1-git-mock-landing-gaabscps-projects.vercel.app/",
                  "_blank"
                );
              }}
              border={"1px solid #C3ACDA"}
              height="60px"
              className="buttonDefault"
              width="100%"
            >
              {translations?.playx1?.buttonLabel}
            </Button>
            <Button
              onClick={() => {
                window.open("https://github.com/gaabscps/ProjetoX1", "_blank");
              }}
              border={"1px solid #ac6bed"}
              backgroundColor="transparent"
              height="60px"
              className="buttonOutline"
              width="100%"
            >
              <Text width="80%">{translations?.playx1?.github}</Text>
              <FaGithub />
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
