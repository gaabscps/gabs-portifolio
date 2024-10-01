/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Card } from "@/components/Card";
import { FullSizeImageModal } from "@/components/FullSizeImageModal";
import { useLanguage } from "@/context/language";
import { useFullSize } from "@/hooks/useFullSize";
import { useProjects } from "@/hooks/useProjects";
import useWindow from "@/hooks/useWindows";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

export type CredentialsType = {
  title: string;
  value: string;
  type: "email" | "password";
  state?: boolean;
};

export default function BancaDoIngresso() {
  const window = useWindow();
  const { openImageFullSize, setIsOpenedImage, openedImage, isOpenedImage } =
    useFullSize();

  const { translations } = useLanguage();
  const projects = useProjects();
  const skills = projects[1].skills;

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
          <Flex
            flexWrap="wrap"
            padding={isDesktop ? "40px 0 80px" : "0 0 24px"}
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
              _hover={{
                boxShadow: "0px 0px 25px #d0726d",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
            >
              <Image
                onClick={() =>
                  openImageFullSize(
                    "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/dashboard+bdi.png"
                  )
                }
                border={"2px solid #d0726d"}
                objectFit="cover"
                height="600px"
                borderRadius="10px"
                src={
                  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/dashboard+bdi.png"
                }
                alt=""
              />
            </Box>
            <Box as="aside" width={isDesktop ? "50%" : "100%"}>
              <Flex height="100%" alignItems="center">
                <Text
                  dangerouslySetInnerHTML={{
                    __html: translations?.bancaDoIngresso?.text1,
                  }}
                  lineHeight="40px"
                  textAlign="center"
                  fontSize="24px"
                />
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
                  dangerouslySetInnerHTML={{
                    __html: translations?.bancaDoIngresso?.text2,
                  }}
                  lineHeight="40px"
                  textAlign="center"
                  fontSize="24px"
                />
              </Flex>
            </Box>
            <Box
              cursor="pointer"
              borderRadius="10px"
              _hover={{
                boxShadow: "0px 0px 25px #d0726d",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
            >
              <Image
                onClick={() =>
                  openImageFullSize(
                    "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/eventos.png"
                  )
                }
                border={"2px solid #d0726d"}
                objectFit="cover"
                height="600px"
                borderRadius="10px"
                src={
                  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/eventos.png"
                }
                alt=""
              />
            </Box>
          </Flex>
          <Flex
            paddingBottom="80px"
            flexDirection={isDesktop ? "column" : "column-reverse"}
          >
            <Text
              dangerouslySetInnerHTML={{
                __html: translations?.bancaDoIngresso?.text3,
              }}
              textAlign="center"
              fontSize="24px"
              margin="40px 0"
            />
            <Box
              cursor="pointer"
              borderRadius="10px"
              _hover={{
                boxShadow: "0px 0px 25px #d0726d",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              as="aside"
            >
              <Image
                onClick={() =>
                  openImageFullSize(
                    "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/relatorios.png"
                  )
                }
                w="100%"
                objectFit="cover"
                height="600px"
                borderRadius="10px"
                src={
                  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/relatorios.png"
                }
                alt=""
              />
            </Box>
          </Flex>
          <hr></hr>
          <Flex
            width="100%"
            gap="32px"
            padding="80px 0"
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
