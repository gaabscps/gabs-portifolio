import { Flex, Icon, List, ListItem, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import image from "../../assets/image/2.png";
import useWindow from "@/hooks/useWindows";

interface NavbarProps {
  setLoading: (loading: boolean) => void;
}

export const Navbar = ({ setLoading }: NavbarProps) => {
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const window = useWindow();

  const logoLink =
    "https://www.linkedin.com/dms/prv/vid/D4D06AQHpHHaKatH8VA/messaging-attachmentFile/0/1706853683476?m=AQLBxWdFjkVc-gAAAY1oaFnu9ep-Nyyi2vUmqfFwQX9VJma5sHY4YbtT0A&ne=1&v=beta&t=aT4m825EckIdAVF4ywTKBciaoaKZTGS8fgO1jBFmAFo";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuItems = [
    {
      name: isMenuOpen ? "" : logoLink,
      link: "/",
    },
    {
      name: "Projetos",
      link: "/",
    },
    {
      name: "Sobre mim",
      link: "/about",
    },
    {
      name: "Contato",
      link: "/contact",
    },
  ];

  const page = window?.location.pathname;
  useEffect(() => {
    const pageName = page?.split("/")[1];
    console.log(pageName);
    const menuItemIndex = menuItems.findIndex(
      (item) => item.link.split("/")[1] === pageName
    );
    if (menuItemIndex !== -1) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [menuItems, page]);

  return (
    <Flex
      alignItems={"center"}
      position="absolute"
      padding={isMenuOpen ? "24px 0" : "0"}
      borderBottom={isMenuOpen ? "" : "solid 1px #AC6BED"}
      width="100%"
      className="menu-container"
      flexDirection={"column"}
      gap="24px"
    >
      <Flex
        alignItems="center"
        width={isMenuOpen ? "100%" : "0%"}
        justifyContent="center"
      >
        <Image
          alt="Gabriel Andrade"
          src="https://www.linkedin.com/dms/prv/vid/D4D06AQHpHHaKatH8VA/messaging-attachmentFile/0/1706853683476?m=AQLBxWdFjkVc-gAAAY1oaFnu9ep-Nyyi2vUmqfFwQX9VJma5sHY4YbtT0A&ne=1&v=beta&t=aT4m825EckIdAVF4ywTKBciaoaKZTGS8fgO1jBFmAFo"
          width={300}
        />
      </Flex>
      <Flex>
        <List width="100%" className="menuItemsContainer">
          <ListItem display="flex" gap={36} className="menuItems">
            {menuItems.map((item, index) =>
              item.name === logoLink ? (
                <Image
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
                      setLoading(true);
                      setSelectedMenuItemIndex(index);
                    }}
                    borderBottom={
                      selectedMenuItemIndex === index ? "solid 1px #AC6BED" : ""
                    }
                    color={
                      selectedMenuItemIndex === index ? "#AC6BED" : "#c6c6c6"
                    }
                    className={`menuItemName-${index}`}
                    fontSize={"24px"}
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
      <Flex display={isMenuOpen ? "flex" : "none"} gap="25px">
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
  );
};
