import { Box, Flex, Image } from "@chakra-ui/react";

interface CardProps {
  children?: React.ReactNode;
  justify?: string;
  align?: string;
  height?: string;
  minHeight?: string;
  roundBorder?: boolean;
  border?: boolean;
  borderRadius?: string;
  borderColor?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  width?: string;
  image?: string;
  boxShadow?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  image,
  justify = "center",
  align = "center",
  height,
  minHeight = "150px",
  border,
  roundBorder = false,
  borderRadius,
  borderColor = "#c6c6c6",
  hoverColor,
  hoverTextColor,
  width = "fit-content",
  boxShadow,
}) => {
  return (
    <Flex
      flexDirection="column"
      objectFit="cover"
      justify={justify}
      align={align}
      width={width}
      height={height}
      minHeight={minHeight}
      border={border || roundBorder ? ` solid 1px ${borderColor}` : "none"}
      borderRadius={roundBorder ? "16px" : borderRadius}
      _hover={
        hoverColor || hoverTextColor
          ? {
              color: hoverTextColor,
              borderColor: hoverColor,
              boxShadow: boxShadow,
            }
          : {}
      }
      transition={"all 0.2s ease"}
    >
      {children || image ? children : "Card"}
      {image && (
        <Image
          borderRadius={roundBorder ? "10px" : "0"}
          alt=""
          objectFit="contain"
          src={image}
        />
      )}
    </Flex>
  );
};
