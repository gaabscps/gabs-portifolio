import { Flex, Text } from "@chakra-ui/react";

interface InternationalizationProps {
  language: string;
  setLanguage: (language: string) => void;
}

export const Internationalization: React.FC<InternationalizationProps> = ({
  language,
  setLanguage,
}) => {
  return (
    <Flex gap={"8px"} position={"fixed"} padding="8px" zIndex={10}>
      <Text
        _hover={{ textShadow: "0px 0px 20px rgba(255,255,255,1)" }}
        cursor={"pointer"}
        backgroundImage={
          language === "ptbr"
            ? "linear-gradient(123deg, rgba(56,255,0,1) 0%, rgba(233,226,148,1) 63%)"
            : ""
        }
        color={language === "ptbr" ? "transparent" : "#c6c6c6"}
        backgroundClip={language === "ptbr" ? "text" : ""}
        fontWeight={700}
        onClick={() => setLanguage("ptbr")}
      >
        BR
      </Text>
      <Text
        _hover={{ textShadow: "0px 0px 20px rgba(255,255,255,1)" }}
        cursor={"pointer"}
        backgroundImage={
          language === "en"
            ? "linear-gradient(123deg, rgba(0,35,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 100%);"
            : ""
        }
        color={language === "en" ? "transparent" : "#c6c6c6"}
        backgroundClip={language === "en" ? "text" : ""}
        fontWeight={700}
        onClick={() => setLanguage("en")}
      >
        EN
      </Text>
    </Flex>
  );
};
