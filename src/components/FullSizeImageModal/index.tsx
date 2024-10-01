"use client";

import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface FullSizeImageModalProps {
  openedImage: string;
  closeIcon: React.ReactNode;
  borderColor: string;
}

export const FullSizeImageModal: React.FC<FullSizeImageModalProps> = ({
  openedImage,
  closeIcon,
  borderColor,
}) => {
  const [isPortrait, setIsPortrait] = useState(
    window?.matchMedia("(orientation: portrait)").matches
  );

  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  useEffect(() => {
    const handleResize = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      if (!portrait) {
        setIsPortrait(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      transform={!isDesktop ? "scale(0.95)" : ""}
      top={"56px"}
      position="absolute"
      zIndex="100"
    >
      <Box
        borderRadius={"16px"}
        border={`1px solid ${borderColor || "black"}`}
        position="relative"
      >
        <Image borderRadius="16px" src={openedImage} />
        {closeIcon}
      </Box>
      {!isDesktop && (
        <Box>
          {isPortrait && (
            <Box>
              <Text fontWeight="700" color="white" mt="24px" textAlign="center">
                Gire o dispositivo para melhor visibilidade
              </Text>
              <Image
                width={"160px"}
                margin="0 auto"
                src={
                  "https://gabsportifolio.s3.amazonaws.com/img/assets/rotate.gif"
                }
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
