"use client";

import { fonts } from "../themes/fonts/fonts";
import { Providers } from "./providers";
import "../styles/reset.css";
import { Navbar } from "@/components/Navbar/index";
import { Flex } from "@chakra-ui/react";
import Loading from "@/components/Loading";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <html lang="en" className={fonts.montserrat.variable}>
        <head>
          <title>Gabriel Andrade</title>
        </head>
        <body className="page-body">
          {loading && <Loading loading={loading} />}
          <Navbar setLoading={load} />
          <Flex
            justifyContent="center"
            width="100%"
            padding="94px 32px 0px 32px"
            height="100vh"
          >
            <Providers>{children}</Providers>
          </Flex>
        </body>
      </html>
    </>
  );
}
