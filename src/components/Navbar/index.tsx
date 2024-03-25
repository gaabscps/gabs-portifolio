import { Flex, Icon, List, ListItem, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import image from "../../assets/image/2.png";

interface NavbarProps {
  setLoading: (loading: boolean) => void;
}

console.log(image);
export const Navbar = ({ setLoading }: NavbarProps) => {
  const menuItems = [
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

  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);

  return (
    <Flex
      alignItems={"center"}
      position="absolute"
      padding="24px 0"
      width="100%"
      className="menu-container"
      flexDirection={"column"}
      gap="24px"
    >
      <Flex alignItems="center" width="100%" justifyContent="center">
        <Image
          alt="Gabriel Andrade"
          src="https://www.linkedin.com/dms/prv/vid/D4D06AQHpHHaKatH8VA/messaging-attachmentFile/0/1706853683476?m=AQLBxWdFjkVc-gAAAY1oaFnu9ep-Nyyi2vUmqfFwQX9VJma5sHY4YbtT0A&ne=1&v=beta&t=aT4m825EckIdAVF4ywTKBciaoaKZTGS8fgO1jBFmAFo"
          width={300}
        />
      </Flex>
      <Flex>
        <List width="100%" className="menuItemsContainer">
          <ListItem display="flex" gap={36} className="menuItems">
            {menuItems.map((item, index) => (
              <Text
                onClick={() => {
                  setLoading(true);
                  setSelectedMenuItemIndex(index);
                }}
                borderBottom={
                  selectedMenuItemIndex === index ? "solid 1px #AC6BED" : ""
                }
                color={selectedMenuItemIndex === index ? "#AC6BED" : "#c6c6c6"}
                className={`menuItemName-${index}`}
                fontSize={"24px"}
                _hover={{
                  textDecoration: "none",
                  color: "#AC6BED",
                }}
                key={item.name + index}
              >
                <Link href={item.link}>{item.name}</Link>
              </Text>
            ))}
          </ListItem>
        </List>
      </Flex>
      <Flex gap="25px">
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
