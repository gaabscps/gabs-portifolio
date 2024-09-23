/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useLanguage } from "@/context/language";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCopy, FaCheck, FaGithub } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

export type CredentialsType = {
  title: string;
  value: string;
  type: "email" | "password";
  state?: boolean;
};

export default function BancaDoIngresso() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpenedImage, setIsOpenedImage] = useState<boolean>(false);
  const [openedImage, setOpenedImage] = useState<string>("");
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  const { translations } = useLanguage();

  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  const openImageFullSize = (imageClick: string) => {
    setIsOpenedImage(true);
    setOpenedImage(imageClick);
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };
    window.addEventListener("resize", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (isOpenedImage) {
      // Store the current scroll position
      setScrollPosition(window.scrollY);
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpenedImage]);

  return (
    <>
      {isOpenedImage && (
        <Box
          transform={!isDesktop ? "scale(0.95)" : ""}
          top={"56px"}
          position="absolute"
          zIndex="100"
        >
          <Box position="relative">
            <Image borderRadius="16px" src={openedImage} />
            <RiCloseLine
              color="black"
              fill="black"
              className="closeIcon"
              size="24px"
              onClick={() => setIsOpenedImage(false)}
            />
          </Box>
          {!isDesktop && (
            <Box>
              {isPortrait && (
                <>
                  <Text
                    fontWeight="700"
                    color="white"
                    mt="24px"
                    textAlign="center"
                  >
                    Gire o dispositivo para melhor visibilidade
                  </Text>
                  <Image
                    width={"160px"}
                    margin="0 auto"
                    src={
                      "https://gabsportifolio.s3.amazonaws.com/img/assets/rotate.gif"
                    }
                  />
                </>
              )}
            </Box>
          )}
        </Box>
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
            <Image
              onClick={() =>
                openImageFullSize(
                  "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/relatorios.png"
                )
              }
              cursor="pointer"
              _hover={{
                boxShadow: "0px 0px 25px #d0726d",
                transform: "scale(1.01)",
              }}
              transition={"all ease 0.2s"}
              border={"2px solid #d0726d"}
              objectFit="cover"
              height="600px"
              borderRadius="10px"
              src={
                "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/relatorios.png"
              }
              alt=""
            />
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
                  window.open(
                    "https://github.com/gaabscps/ProjetoX1",
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
