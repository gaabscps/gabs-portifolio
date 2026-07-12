import { fonts } from "../themes/fonts/fonts";
import { Providers } from "./providers";
import "../styles/reset.css";
import "../styles/tokens.css";
import Script from "next/script";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Gabriel Andrade",
    "Front-end Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Chakra UI",
    "React Native",
    "Portfólio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: siteConfig.jobTitle,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.telegram,
    ],
  };

  return (
    <html lang="en" className={fonts.montserrat.variable}>
      <head>
        {/* Runs before the body paints: marks JS so CSS can hide the static
            journey fallback and avoid a flash of pre-animation content. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{document.documentElement.classList.add('has-js')}catch(e){}",
          }}
        />
        <script type="application/ld+json">
          {JSON.stringify(personJsonLd)}
        </script>
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
