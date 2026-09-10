# aiOS media provenance

Captured 2026-09-10 from the actual React app in `ai-squad/packages/os`, local revision `ddcf5eb`. Vite serves the existing UI at port 4182. `scripts/capture/aios.cjs` serves synthetic session snapshots through a separate local WebSocket server on port 4717; it does not launch the real collector, read private sessions, or call a model.

- `cover.webp` / `overview.webp`: overview with delivery, attention and cost sections.
- `board.webp`: feature Kanban showing distinct work states.
- `session.webp`: session drawer with a recorded decision, timeline and cost information.
- `walkthrough.mp4`: actual browser navigation from overview to board and session drawer, encoded as H.264 with no audio. The initial 1.5 seconds of loading are trimmed; the delivered video runs for 17.292 seconds.

Every image and video has a persistent disclosure: “PORTFOLIO DEMO · SYNTHETIC SESSIONS AND COSTS”. Names, costs, verification entries and session states are illustrative fixtures, not historical performance or evidence of product usage. The capture demonstrates the interface, not the collector or paid AI summaries. The original source app is unchanged.

Run the Vite command noted at the top of the script, then `node scripts/capture/aios.cjs`. Requires local ai-squad and SoundWave dependencies, Playwright Chromium, Sharp and ffmpeg. The script uses a disposable local WebSocket endpoint; port 4717 must be free.
