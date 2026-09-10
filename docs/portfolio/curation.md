# Portfolio curation — 2026-09-10

The portfolio now presents four complementary engineering cases. The existing purple terminal visual identity remains, with actual product media and direct case-study navigation.

| Case | Why it belongs | Evidence |
| --- | --- | --- |
| ai-squad | Engineering the process around AI development: specifications, scoped tasks, executable verification, human checkpoints and hooks. | Local `ai-squad/README.md`, `docs/v3/migration.md`, `squads/sdd/hooks/block-git-write.py`, `guard-write-scope.py`, CLI package and a real isolated hook-classification run. |
| SoundWave Summit | Full-product React experience backed by asynchronous audio processing, Supabase, model fallback, resumable uploads and billing. | `soundwave-summit/README.md`, `src/features`, `worker-audio`, `supabase/functions`, `PERFIL.md`. |
| aiOS | A distinct frontend/observability product: live snapshots, overview metrics, work triage and session evidence. | `ai-squad/packages/os/src/store/types.ts`, `web/src/components/Board.tsx`, `web/src/lib/overview.ts`, `web/src/state/useLiveProjects.ts`. |
| Squadhouse | An operational product joining Next.js pages, bounded agents, evaluation, CRM and a separate WhatsApp bridge. | `squadhouse-web/.claude/skills`, `proposta-de-lead/evals/evals.json` (19 assertions), platform components, `squadhouse-crm/README.md` and workspace code. |

aiOS is separate because it demonstrates React product and information-design work; ai-squad demonstrates workflow and enforcement. The Squadhouse platform and CRM are one case because the integration is the stronger story.

BetterSMP, CalendarFR, the generic dashboard, PlayX1 and Banca do Ingresso were removed from the curated catalog. They either dilute the stated frontend/fullstack/AI position or offer less relevant evidence than the four selected cases. Existing incoming project URLs redirect to `/work`.

## Profile and source verification

The profile source is `/Volumes/KINGSTON/Developer/projects/gabriel-linkedin/PERFIL.md`, including its 2026-09-09 Squadhouse update, plus `MATERIA-PRIMA.md` and `cv/FATOS.yml`. The chosen title remains Software Engineer, with a frontend foundation and full-stack work demonstrated by the products. The copy does not claim a formal AI Engineer job or invent adoption, revenue, clients, or performance gains.

Public LinkedIn fetching returned HTTP 999; the local maintained profile material supplied that evidence instead. GitHub repositories and privacy were checked with `gh repo list gaabscps --limit 100`. SoundWave and Squadhouse source repositories are private, so their cases link to their public products. Both product URLs returned HTTP 200 during the task.

The ai-squad local checkout was `ddcf5eb81631520f267a9cf13c6aa3c8cb5edc29`; public GitHub main was `12b5457ef4ea9d8921d7c82e95ab5f6df7ef5918`. The local V3 evolution is disclosed as local work, and was not pushed as part of this task. aiOS media also comes from that local checkout.

## Media and delivery

See the per-project `*-assets.md` files for capture provenance, fixture disclosures, commands and limits. Product screenshots depict actual application components. Private operational data is replaced by fictional examples. The ai-squad illustration is explicitly an editorial composition using the source workflow diagram and actual hook output, not a fabricated product GUI.

All new assets live under `public/projects/`; capture scripts live under `scripts/capture/`. Images are WebP; videos are H.264 MP4 with explicit controls, posters and deferred loading. Source application repositories were preserved; CRM preparation used an isolated copy under `/Volumes/KINGSTON/Developer/portfolio-capture/crm`.

The work is delivered in the local portfolio repository. Deployment and Git pushes are not part of this change.

## Review trail

Scope analysis and bounded implementation/capture work used integrated workers after the preferred Cursor scope CLI required authentication. Pattern review retained the existing Chakra, component and data conventions. Logic review caught inherited unsupported community-verification wording and an inaccurate static-media label; both were corrected and the reviewer confirmed LGTM. Browser QA additionally checks mobile layout, media decoding, playback, keyboard behavior and legacy redirects.

## Final validation

- Production build passed, including TypeScript and ESLint checks; `git diff --check` passed.
- Browser QA passed all seven routes at desktop (1440 px) and mobile (390 px) widths: home, work index, four cases and about. It checks headings, image decoding, overflow, project links, actual video playback, controls and keyboard behavior. No runtime exceptions were reported.
- All eight legacy paths returned redirects to `/work`.
- After the final aiOS trim and Squadhouse recording, both updated videos and their gallery/enlargement flows passed additional browser checks at both widths.
- Eleven WebP files and four H.264 videos total 6.28 MB. Dimensions, durations and sizes are recorded in `media-manifest.json`.
- QA screenshots and results are available locally under `/tmp/gabs-portfolio-qa`; `scripts/verify-portfolio.cjs` reproduces the main browser checks against a running portfolio server.
