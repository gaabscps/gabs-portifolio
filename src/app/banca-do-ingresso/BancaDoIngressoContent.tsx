"use client";

import { Card } from "@/components/Card";
import { FullSizeImageModal } from "@/components/FullSizeImageModal";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ProjectPlaceholder } from "@/components/ProjectPlaceholder";
import { useLanguage } from "@/context/language";
import { useFullSize } from "@/hooks/useFullSize";
import { useProjects } from "@/hooks/useProjects";
import useWindow from "@/hooks/useWindows";
import { renderRichText } from "@/lib/renderRichText";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

export type CredentialsType = {
  title: string;
  value: string;
  type: "email" | "password";
  state?: boolean;
};

export default function BancaDoIngressoContent() {
  const window = useWindow();
  const { openImageFullSize, setIsOpenedImage, openedImage, isOpenedImage } =
    useFullSize();

  const { translations } = useLanguage();
  const projects = useProjects();
  const skills =
    projects.find((p) => p.slug === "banca-do-ingresso")?.skills ?? [];

  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  return (
    <>
      {isOpenedImage && (
        <FullSizeImageModal
          borderColor="#d0726d"
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

      <Box height="100%" width={isDesktop ? "auto" : "100%"}>
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
            {translations?.bancaDoIngresso?.h1}
          </Heading>
          <Heading
            as="h2"
            fontSize="24px"
            fontWeight="700"
            paddingTop="32px"
            textAlign={isDesktop ? "left" : "center"}
          >
            {translations?.bancaDoIngresso?.h2About}
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
              border="2px solid #d0726d"
              overflow="hidden"
              _hover={{
                boxShadow: "0px 0px 25px #d0726d",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
              flex={isDesktop ? "1" : "unset"}
              minWidth="0"
              width={isDesktop ? "auto" : "100%"}
              position="relative"
              height="600px"
              onClick={() =>
                openImageFullSize(
                  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/dashboard+bdi.png"
                )
              }
            >
              <ImageWithFallback
                fill
                sizes="(min-width: 1023px) 50vw, 100vw"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src="https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/dashboard+bdi.png"
                alt="Banca do Ingresso admin dashboard"
                fallback={
                  <ProjectPlaceholder
                    height="600px"
                    borderColor="#d0726d"
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
                  {renderRichText(translations?.bancaDoIngresso?.text1)}
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
                  {renderRichText(translations?.bancaDoIngresso?.text2)}
                </Text>
              </Flex>
            </Box>
            <Box
              cursor="pointer"
              borderRadius="10px"
              border="2px solid #d0726d"
              overflow="hidden"
              _hover={{
                boxShadow: "0px 0px 25px #d0726d",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
              flex={isDesktop ? "1" : "unset"}
              minWidth="0"
              width={isDesktop ? "auto" : "100%"}
              position="relative"
              height="600px"
              onClick={() =>
                openImageFullSize(
                  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/eventos.png"
                )
              }
            >
              <ImageWithFallback
                fill
                sizes="(min-width: 1023px) 50vw, 100vw"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src="https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/eventos.png"
                alt="Banca do Ingresso events list"
                fallback={
                  <ProjectPlaceholder
                    height="600px"
                    borderColor="#d0726d"
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
              {renderRichText(translations?.bancaDoIngresso?.text3)}
            </Text>
            <Box
              cursor="pointer"
              borderRadius="10px"
              border="2px solid #d0726d"
              overflow="hidden"
              _hover={{
                boxShadow: "0px 0px 25px #d0726d",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
              flex={isDesktop ? "1" : "unset"}
              minWidth="0"
              width={isDesktop ? "auto" : "100%"}
              position="relative"
              height="600px"
              onClick={() =>
                openImageFullSize(
                  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/relatorios.png"
                )
              }
            >
              <ImageWithFallback
                fill
                sizes="(min-width: 1023px) 1040px, 100vw"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src="https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/relatorios.png"
                alt="Banca do Ingresso reports view"
                fallback={
                  <ProjectPlaceholder
                    height="600px"
                    borderColor="#d0726d"
                  />
                }
              />
            </Box>
          </Flex>
          <hr></hr>
          <Heading as="h2" fontSize="24px" fontWeight="700" paddingTop="40px">
            {translations?.bancaDoIngresso?.h2Code}
          </Heading>
          <Flex
            width="100%"
            gap="32px"
            padding="24px 0 80px"
            alignItems="center"
            flexDirection={isDesktop ? "row" : "column"}
          >
            <Flex width="100%" flexDirection="column" gap="16px">
              <Button
                onClick={() => {
                  window?.open(
                    "https://github.com/gaabscps/BancaDoIngresso",
                    "_blank"
                  );
                }}
                border={"1px solid #ac6bed"}
                backgroundColor="transparent"
                height="60px"
                className="buttonOutline"
                width="100%"
              >
                <Text width="80%">{translations?.bancaDoIngresso?.github}</Text>
                <FaGithub />
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
