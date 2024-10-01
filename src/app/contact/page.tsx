"use client";

import { useLanguage } from "@/context/language";
import { Box, Button, Flex, Input, Text, Textarea, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { translations } = useLanguage();
  const isDesktop = useMediaQuery("(min-width: 1023px)")[0];

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Box className="body-content" as="section">
      <Text fontSize="24px" fontWeight="700">
        {translations?.contact?.title}
      </Text>
      <Box padding="24px 0" as="section">
        <Flex flexDirection="column" gap="16px">
          <Input
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
            value={form.name}
          w={isDesktop ? "35%" : "100%"}
            placeholder={translations?.contact?.nameInputLabel}
          />
          <Input
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
            value={form.email}
          w={isDesktop ? "35%" : "100%"}
            placeholder={translations?.contact?.emailInputLabel}
          />
          <Textarea
            onChange={(e) => {
              setForm({ ...form, message: e.target.value });
            }}
            value={form.message}
            height="180px"
            w={isDesktop ? "70%" : "100%"}
            placeholder={translations?.contact?.messageInputLabel}
          />
          <Button
            w={isDesktop ? "50%" : "100%"}
            bg="#25D366"
            color="white"
            _hover={{ bg: "#36c26a" }}
            _active={{ bg: "#0fe961" }}
            onClick={() => {
              window.open(
                `https://wa.me/5519999388761?text=%20${form.name}%20${form.email}%0AMensagem:%20${form.message}`
              );
              resetForm();
            }}
          >
            {translations?.contact?.whatsappButton}
            <Box paddingLeft="8px">
              <BsWhatsapp />
            </Box>
          </Button>
          <Button
            w={isDesktop ? "50%" : "100%"}
            bg="#6666ff"
            color="white"
            _hover={{ bg: "#6699ff" }}
            _active={{ bg: "#6633ff" }}
            onClick={() => {
              window.open("https://t.me/gaabscps");
              resetForm();
            }}
          >
            Telegram
            <Box paddingLeft="8px">
              <BsTelegram />
            </Box>
          </Button>
          <Button
            w={isDesktop ? "50%" : "100%"}
            bg="#6666ff"
            color="white"
            _hover={{ bg: "#6699ff" }}
            _active={{ bg: "#6633ff" }}
            onClick={() => {
              window.open(
                `mailto:gaabscps@gmail.com?subject=Contato&body=Nome:%20${form.name}%0AEmail:%20${form.email}%0AMensagem:%20${form.message}`
              );
              resetForm();
            }}
          >
            {translations?.contact?.emailButton}
            <Box paddingLeft="8px">
              <MdEmail />
            </Box>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
