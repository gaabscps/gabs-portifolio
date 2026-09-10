# Squadhouse portfolio assets

These assets were captured from the running Squadhouse applications at a 1440 × 720 viewport:

- `platform.webp` and `cover.webp`: the real `squadhouse-web` `/modelo` route, which is the built-in fictional-model demo surface.
- `crm.webp`: the real Squadhouse CRM board components running from an isolated copy of `squadhouse-crm`, with synthetic leads and a persistent `DEMO DATA · PORTFOLIO CAPTURE` banner. No production database or WhatsApp process was used.
- `walkthrough.mp4`: an 11.08 second H.264 screen recording from Playwright. It scrolls the platform demo, navigates to the CRM, scrolls the board horizontally, and returns across the board; the CRM fixture banner remains visible during its recorded segment. Scroll positions are asserted by the capture script.

The CRM harness changes only the isolated copy's board loader and open-request lookup. The source repository remains unchanged. The media contains no real customer names, phone numbers, messages, or contact details.

Validation: `ffprobe` reports an 11.080 second H.264 MP4; the WebP files are 1440 × 720 and decode successfully. The capture script requires an explicit `SQUADHOUSE_CRM_URL` and verifies the fixture marker before taking a CRM screenshot or recording.
