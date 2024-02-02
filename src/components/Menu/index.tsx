import { Container, List, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

interface MenuProps {
  setLoading: (loading: boolean) => void;
}

export const Menu = ({ setLoading }: MenuProps) => {
  const menuItems = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Projetos",
      link: "/projects",
    },
    {
      name: "Contato",
      link: "/contact",
    },
  ];

  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(-1);

  return (
    <Container
      position="absolute"
      padding="32px"
      width="100%"
      className="menu-container"
      borderBottom={"1px solid"}
      borderColor={"#222"}
    >
      <List className="menuItemsContainer">
        <ListItem display="flex" gap={36} className="menuItems">
          {menuItems.map((item, index) => (
            <Text
              onClick={() => {
                setLoading(true);
                setSelectedMenuItemIndex(index);
              }}
              fontWeight={selectedMenuItemIndex === index ? "700" : ""}
              color={selectedMenuItemIndex === index ? "#9370DB" : "#c6c6c6"}
              className={`menuItemName-${index}`}
              fontSize={"20px"}
              _hover={{
                textDecoration: "none",
                color: "#9370DB",
              }}
              key={item.name + index}
            >
              <Link href={item.link}>{item.name}</Link>
            </Text>
          ))}
        </ListItem>
      </List>
    </Container>
  );
};
