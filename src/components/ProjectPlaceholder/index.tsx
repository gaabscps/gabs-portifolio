"use client";

import { Box, Flex, Icon } from "@chakra-ui/react";
import { TbPhoto } from "react-icons/tb";

interface ProjectPlaceholderProps {
  height?: string | number;
  width?: string | number;
  borderRadius?: string;
  borderColor?: string;
  iconSize?: string;
}

const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({
  height = "600px",
  width = "100%",
  borderRadius = "10px",
  borderColor = "#AC6BED",
  iconSize = "80px",
}) => {
  return (
    <Flex
      height={height}
      width={width}
      minWidth="200px"
      flex="1 1 auto"
      borderRadius={borderRadius}
      border={`2px solid ${borderColor}`}
      background="linear-gradient(135deg, #1a1a1a 0%, #221a2d 100%)"
      alignItems="center"
      justifyContent="center"
    >
      <Box opacity="0.35">
        <Icon as={TbPhoto} boxSize={iconSize} color={borderColor} />
      </Box>
    </Flex>
  );
};

export { ProjectPlaceholder };
