# SoundWave portfolio assets

These assets were captured from the real SoundWave Summit React application running locally at `http://127.0.0.1:4181`.

The analysis shown is deterministic demonstration data supplied at the app's public-analysis RPC boundary. It uses fictional participants and a fictional product-strategy meeting. Every captured frame includes a visible **DEMO DATA · PORTFOLIO CAPTURE** badge. No account was used, no message was sent, no paid API was called, and no production data was read or written.

## Outputs

- `cover.webp` — public analysis header and primary analysis workspace at 1440×900.
- `analysis.webp` — deeper view of the transcript and analysis cards at 1440×900.
- `walkthrough.mp4` — short H.264 walkthrough of the analysis screen, including scrolling and transcript search.

## Reproduce

From the SoundWave source repository:

```sh
npm run dev -- --host 127.0.0.1 --port 4181
```

Then, from this portfolio repository:

```sh
node scripts/capture/soundwave.cjs
```

The script depends on Playwright installed in `/Volumes/KINGSTON/Developer/projects/soundwave-summit/node_modules` and `ffmpeg` on `PATH`. It replaces the three outputs in `public/projects/soundwave/` and does not modify the SoundWave source repository.

## Capture limits

The captures demonstrate the implemented UI and its client-side interaction with a contract-compatible API fixture. They do not demonstrate live transcription accuracy, model output quality, authentication, billing, file upload, or production service availability.
