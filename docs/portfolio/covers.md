# Project covers — 2026-09-10

Four original editorial covers generated with the built-in ImageGen tool. They are conceptual brand artwork, not screenshots or evidence of product functionality. Exact generation prompts are saved in [cover-prompts.json](./cover-prompts.json).

| Project | Direction | Final asset |
| --- | --- | --- |
| ai-squad | Cyan route through two amber checkpoints on graphite | [brand-cover.webp](../../public/projects/ai-squad/brand-cover.webp) |
| SoundWave Summit | Cyan sculptural sound wave on charcoal, following the product palette | [brand-cover.webp](../../public/projects/soundwave/brand-cover.webp) |
| aiOS | Ivory observation rings and terracotta core, following the UI palette | [brand-cover.webp](../../public/projects/aios/brand-cover.webp) |
| Squadhouse | Purple folded ribbon and a wordmark arrangement derived from its identity | [brand-cover.webp](../../public/projects/squadhouse/brand-cover.webp) |

The covers appear on home cards and at the opening of each case. The galleries and video posters keep actual captured product imagery, so the cover does not repeat as demonstration media. The cover type is explicitly `artwork`, and case openings label it “PROJECT COVER”. Original screenshots remain available.

Each image is 1586 × 992 WebP; the four files total 401,770 bytes. Conversion preserves the complete composition. Original generated PNGs remain under `/Users/gabrielandrade/.codex/generated_images/01a08a5e-fdb9-7621-b790-1a6a0c93a45b/`.

Brand inputs reviewed: SoundWave's `public/logo.png` and cyan/charcoal CSS tokens; Squadhouse's `public/images/logo.svg`, `shicon.png`, purple palette and Montserrat typography; current aiOS screenshots and the ai-squad workflow evidence.

Validation: production build, TypeScript, ESLint and diff whitespace checks passed. All four new covers decoded on the home page and their corresponding case pages. Desktop and 390 px mobile visual inspection confirmed full compositions and readable titles; mobile document width stayed within the viewport. Case video posters still reference captured product screens rather than the generated covers.
