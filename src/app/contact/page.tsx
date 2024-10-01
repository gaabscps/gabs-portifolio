"use client";

import { useLanguage } from "@/context/language";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
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

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Box minWidth="600px" className="body-content" as="section">
      <Text fontSize="24px" fontWeight="700">
        {translations?.contact?.title}
      </Text>
      <Box padding="24px 0" as="section">
        <Flex flexDirection="column" gap="20px">
          <Input
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
            value={form.name}
            w="100%"
            placeholder={translations?.contact?.nameInputLabel}
          />
          <Input
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
            value={form.email}
            w="100%"
            placeholder={translations?.contact?.emailInputLabel}
          />
          <Textarea
            onChange={(e) => {
              setForm({ ...form, message: e.target.value });
            }}
            value={form.message}
            height="180px"
            w="100%"
            placeholder={translations?.contact?.messageInputLabel}
          />
          <Flex p="40px 0" gap={"20px"}>
            <Button
              fontSize="14px"
              w="100%"
              bg="transparent"
              color="white"
              border={"solid 1px white"}
              _hover={{ border: "solid 1px #36c26a", color: "#36c26a" }}
              _active={{ border: "solid 1px #0fe961", color: "#0fe961" }}
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
              w="100%"
              bg="transparent"
              color="white"
              border={"solid 1px white"}
              _hover={{ border: "solid 1px #6699ff", color: "#6699ff" }}
              _active={{ border: "solid 1px #3366ff", color: "#3366ff" }}
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
              w="100%"
              backgroundColor={'transparent'}
              color="white"
              border={"solid 1px white"}
              _hover={{ border: "solid 1px #AC6BED", color: "#AC6BED" }}
              _active={{ border: "solid 1px #C3ACDA", color: "#C3ACDA" }}
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
        </Flex>
      </Box>
    </Box>
  );
}
