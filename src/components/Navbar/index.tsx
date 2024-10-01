"use client";

import {
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/language";
import { Internationalization } from "../Internationalization";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);

  const { translations, setLanguage, language } = useLanguage();

  const path = usePathname();

  const logoLink =
    "https://www.linkedin.com/dms/prv/vid/D4D06AQHpHHaKatH8VA/messaging-attachmentFile/0/1706853683476?m=AQLBxWdFjkVc-gAAAY1oaFnu9ep-Nyyi2vUmqfFwQX9VJma5sHY4YbtT0A&ne=1&v=beta&t=aT4m825EckIdAVF4ywTKBciaoaKZTGS8fgO1jBFmAFo";

  const menuItems = [
    {
      name: isDesktop[0] ? "" : logoLink,
      link: "/",
    },
    {
      name: translations?.menu.projects,
      link: "/projects",
    },
    {
      name: translations?.menu?.about,
      link: "/about",
    },
    {
      name: translations?.menu?.contact,
      link: "/contact",
    },
  ];

  useEffect(() => {
    if (path === "/") {
      setSelectedMenuItemIndex(2);
    }
  }, [path]);

  return (
    <>
      <Internationalization language={language} setLanguage={setLanguage} />
      <Flex
        alignItems={"center"}
        position="absolute"
        padding={isDesktop[0] ? "24px 0" : "0"}
        borderBottom={isDesktop[0] ? "" : "solid 1px #AC6BED"}
        width="100%"
        className="menu-container"
        flexDirection={"column"}
        gap="24px"
      >
        <Flex
          alignItems="center"
          width={isDesktop[0] ? "100%" : "0%"}
          justifyContent="center"
        >
          <Image
            alt="Gabriel Andrade"
            src="https://gabsportifolio.s3.amazonaws.com/img/About/logo.png"
            width={300}
          />
        </Flex>
        <Flex>
          <List width="100%" className="menuItemsContainer">
            <ListItem display="flex" gap={"36px"} className="menuItems">
              {menuItems.map((item, index) =>
                item.name === logoLink ? (
                  <Image
                    visibility={isMobile[0] ? "hidden" : "visible"}
                    alt="Gabriel Andrade"
                    src={logoLink}
                    width={100}
                    key={item.name + index}
                    position="absolute"
                    left="80px"
                  />
                ) : (
                  <Link key={index} href={item.link}>
                    <Text
                      onClick={() => {
                        setSelectedMenuItemIndex(index);
                      }}
                      borderBottom={
                        selectedMenuItemIndex === index
                          ? "solid 1px #AC6BED"
                          : ""
                      }
                      color={
                        selectedMenuItemIndex === index ? "#AC6BED" : "#c6c6c6"
                      }
                      className={`menuItemName-${index}`}
                      fontSize={isMobile[0] ? "16px" : "24px"}
                      _hover={{
                        textDecoration: "none",
                        color: "#AC6BED",
                      }}
                      key={item.name + index}
                    >
                      {item.name}
                    </Text>
                  </Link>
                )
              )}
            </ListItem>
          </List>
        </Flex>
        <Flex display={isDesktop[0] ? "flex" : "none"} gap="25px">
          <Link target="_blank" href="https://github.com/gaabscps">
            <Icon
              cursor="pointer"
              _hover={{
                opacity: "0.4",
              }}
              fontSize="24px"
              as={FaGithub}
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/gabriel-andrade-199601a2/"
          >
            <Icon
              cursor="pointer"
              _hover={{
                opacity: "0.4",
              }}
              fontSize="24px"
              as={FaLinkedin}
              href=""
            />
          </Link>
        </Flex>
        <Flex></Flex>
      </Flex>
    </>
  );
};
