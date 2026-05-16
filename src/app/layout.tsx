import { fonts } from "../themes/fonts/fonts";
import { Providers } from "./providers";
import "../styles/reset.css";
import { Navbar } from "@/components/Navbar/index";
import { Flex } from "@chakra-ui/react";
import Script from "next/script";

export const metadata = {
  title: "Gabriel Andrade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.montserrat.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="page-body">
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });
            `}
        </Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=GTM-WM6VX29L`}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WM6VX29L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Analytics (gtag.js) */}
        <Script
          id="gtag-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-6K63FFPK8S"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6K63FFPK8S');
            `}
        </Script>

        <Providers>
          <Navbar />
          <Flex
            justifyContent="center"
            width="100%"
            padding="94px 32px 0px 32px"
            height="100vh"
          >
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
