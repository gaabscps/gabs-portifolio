import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} · ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "96px",
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2a1147 55%, #AC6BED 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 44,
            fontWeight: 400,
            color: "#E6D7FB",
          }}
        >
          {siteConfig.jobTitle}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 32,
            fontWeight: 500,
            color: "#ffffff",
            opacity: 0.92,
          }}
        >
          React · Next.js · TypeScript
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 96,
            fontSize: 24,
            color: "#E6D7FB",
            opacity: 0.8,
          }}
        >
          gabrielandrade.net
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
