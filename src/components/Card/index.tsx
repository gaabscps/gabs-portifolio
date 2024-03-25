import { Box, Flex, Image } from "@chakra-ui/react";

interface CardProps {
  children?: React.ReactNode;
  justify?: string;
  align?: string;
  height?: string;
  roundBorder?: boolean;
  borderRadius?: string;
  borderColor?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  width?: string;
  image?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  image,
  justify = "center",
  align = "center",
  height,
  roundBorder = false,
  borderRadius,
  borderColor = "#c6c6c6",
  hoverColor,
  hoverTextColor,
  width = "820px",
}) => {
  return (
    <Flex
      flexDirection="column"
      objectFit="cover"
      justify={justify}
      align={align}
      width={width}
      height={height}
      minHeight="150"
      // border={`solid 1px ${borderColor}`}
      borderRadius={roundBorder ? "10px" : borderRadius}
      _hover={
        hoverColor || hoverTextColor
          ? { color: hoverTextColor, borderColor: hoverColor }
          : {}
      }
    >
      {children || image ? children : "Card"}
      {image && (
        <Image
          borderRadius={roundBorder ? "10px" : "0"}
          alt=""
          objectFit="fill"
          src={image}
        />
      )}
    </Flex>
  );
};
