"use client";

import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Nav } from "@/components/Home/Nav";
import { Footer } from "@/components/Home/Footer";

const fieldStyle = {
  bg: "brand.surface1",
  border: "1px solid",
  borderColor: "brand.border",
  color: "brand.text",
  _placeholder: { color: "brand.textMeta" },
  _focus: { borderColor: "brand.accent", boxShadow: "0 0 0 1px var(--accent)" },
};

const buttonStyle = {
  bg: "transparent",
  color: "brand.text",
  border: "1px solid",
  borderColor: "brand.border",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  transition: "all 200ms var(--ease-out-quart)",
};

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const reset = () => setForm({ name: "", email: "", message: "" });

  return (
    <Box className="bg-textured" minH="100vh" color="brand.text">
      <Nav />

      <Box as="section" px={{ base: 5, md: 8 }} pt={{ base: 12, md: 16 }} pb={{ base: 8, md: 10 }} maxW="640px">
        <Text
          fontSize="10px"
          color="brand.textSecondary"
          letterSpacing="0.22em"
          textTransform="uppercase"
          fontFamily="var(--font-mono)"
          fontWeight="700"
          mb={3.5}
        >
          Contact
        </Text>
        <Box
          fontSize={{ base: "38px", md: "48px" }}
          fontWeight="800"
          letterSpacing="-0.04em"
          lineHeight="0.95"
          mb={4}
          color="brand.text"
        >
          Let&apos;s{" "}
          <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">talk</Box>.
        </Box>
        <Text fontSize="14px" color="brand.textSecondary" lineHeight={1.6} mb={8}>
          Drop a message and I&apos;ll get back to you. Or use one of the direct channels below.
        </Text>

        <Flex flexDirection="column" gap={4}>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            {...fieldStyle}
          />
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your email"
            type="email"
            {...fieldStyle}
          />
          <Textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="What's up?"
            minH="160px"
            {...fieldStyle}
          />
          <Flex gap={3} pt={4} flexWrap="wrap" flexDirection={{ base: "column", md: "row" }}>
            <Button
              w={{ base: "100%", md: "auto" }}
              flex={{ md: 1 }}
              {...buttonStyle}
              _hover={{ borderColor: "#36c26a", color: "#36c26a" }}
              onClick={() => {
                window.open(
                  `https://wa.me/5519999388761?text=${encodeURIComponent(`${form.name} ${form.email}\n\n${form.message}`)}`
                );
                reset();
              }}
            >
              WhatsApp <Box as="span" pl={2}><BsWhatsapp /></Box>
            </Button>
            <Button
              w={{ base: "100%", md: "auto" }}
              flex={{ md: 1 }}
              {...buttonStyle}
              _hover={{ borderColor: "#6699ff", color: "#6699ff" }}
              onClick={() => {
                window.open("https://t.me/gaabscps");
                reset();
              }}
            >
              Telegram <Box as="span" pl={2}><BsTelegram /></Box>
            </Button>
            <Button
              w={{ base: "100%", md: "auto" }}
              flex={{ md: 1 }}
              {...buttonStyle}
              _hover={{ borderColor: "brand.accent", color: "brand.accentHover" }}
              onClick={() => {
                window.open(
                  `mailto:gaabscps@gmail.com?subject=Contact&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
                );
                reset();
              }}
            >
              Email <Box as="span" pl={2}><MdEmail /></Box>
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Box flex="1" />
      <Footer />
    </Box>
  );
}
