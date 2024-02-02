"use client";

import { fonts } from "../themes/fonts/fonts";
import { Providers } from "./providers";
import "../styles/reset.css";
import { Menu } from "@/components/Menu";
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
    }, 500);
  }
  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <html lang="en" className={fonts.roboto.variable}>
        <body className="page-body">
          <Loading loading={loading} />
          <Menu setLoading={load} />
          <Flex
            justifyContent="center"
            width="100%"
            padding="94px 32px 94px 32px"
          >
            <Providers>{children}</Providers>
          </Flex>
        </body>
      </html>
    </>
  );
}
