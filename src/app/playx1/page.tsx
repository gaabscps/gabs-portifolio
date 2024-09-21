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
import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export type CredentialsType = {
  title: string;
  value: string;
  type: "email" | "password";
  state?: boolean;
};

export default function PlayX1() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const { translations } = useLanguage();

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
      <Box width={isDesktop ? "auto" : "100%"}>
        <Box maxWidth="1040px" className="body-content" as="section">
          <Flex
            gap="40px"
            width="100%"
            paddingBottom="160px"
            flexDirection={isDesktop ? "row" : "column"}
          >
            <Box as="aside">
              <Image
                border={"2px solid #C3ACDA"}
                objectFit="cover"
                height="600px"
                borderRadius="10px"
                src={
                  "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png"
                }
                alt=""
              />
            </Box>
            <Box as="aside" width={isDesktop ? "50%" : "100%"}>
              <Flex height="100%" alignItems="center">
                <Text
                  dangerouslySetInnerHTML={{
                    __html: translations?.playx1?.text1,
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
                    __html: translations?.playx1?.text2,
                  }}
                  lineHeight="40px"
                  textAlign="center"
                  fontSize="24px"
                />
              </Flex>
            </Box>
            <Box as="aside">
              <Image
                border={"2px solid #C3ACDA"}
                objectFit="cover"
                height="600px"
                borderRadius="10px"
                src={
                  "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/home.png"
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
              dangerouslySetInnerHTML={{ __html: translations?.playx1?.text3 }}
              textAlign="center"
              fontSize="24px"
              margin="40px 0"
            />
            <Image
              border={"2px solid #C3ACDA"}
              objectFit="cover"
              height="600px"
              borderRadius="10px"
              src={
                "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/match.png"
              }
              alt=""
            />
          </Flex>
        </Box>

        <hr></hr>

        <Flex
          width="100%"
          gap="32px"
          padding="80px 0"
          alignItems="center"
          flexDirection={isDesktop ? "row" : "column"}
        >
          <Box width="100%">
            <Text
              dangerouslySetInnerHTML={{
                __html: translations?.playx1?.navigate,
              }}
              fontSize="24px"
              fontWeight="700"
            />
            <Text
              dangerouslySetInnerHTML={{
                __html: translations?.playx1?.credentialsTitle,
              }}
            />
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

          <Box width="100%">
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
          </Box>
        </Flex>
      </Box>
    </>
  );
}
