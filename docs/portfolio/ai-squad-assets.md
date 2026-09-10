# AI Squad portfolio assets

These 1440×900 assets are an editorial overview of AI Squad's V3 delivery workflow. They are not screenshots of a GUI: AI Squad is a CLI and hook system. The composition embeds the repository's current `docs/assets/build-pipeline.svg` and displays output captured from the real `squads/sdd/hooks/block-git-write.py` classifier against a disposable local fixture.

Every frame is labeled **WORKFLOW ILLUSTRATION · REAL HOOK OUTPUT · LOCAL FIXTURE**. The fixture contains no secrets or user data. The script classifies command strings only; it does not execute `git commit` or `git push`, modify a source checkout, deploy squads, or contact an external service.

## Outputs

- `cover.webp` — workflow overview, source pipeline, and hook evidence.
- `workflow.webp` — final highlighted deny/allow/deny classifier state.
- `walkthrough.mp4` — staged editorial replay of the workflow and guardrail evidence.

## Genuine hook evidence

Fixture: active `/implementer` transcript plus `.agent-session/FEAT-001/session.yml`.

```text
before seal · git commit -m demo
permissionDecision: deny
reason: commit-per-task unlocks only AFTER the Checkpoint B seal

after final_approved_at · git commit -m demo
exit=0 · stdout=<empty> · decision=allow

after final_approved_at · git push origin main
permissionDecision: deny
reason: git push is not permitted for the implementer
```

The silence on allow is the hook's contract: it emits JSON only for a denial and exits zero otherwise.

## Reproduce

From this portfolio repository:

```sh
node scripts/capture/ai-squad.cjs
```

The script reads the current AI Squad checkout at `/Volumes/KINGSTON/Developer/ai-squad`, creates and removes its fixture under the operating system's temporary directory, uses the workspace Playwright installation at `/Volumes/KINGSTON/Developer/projects/soundwave-summit/node_modules`, and converts captures with `ffmpeg`.

## Source-backed claims and limits

The source pipeline defines a per-task loop of reuse mapping, Checkpoint A, implementation, command verification, fresh-eyes review, and Checkpoint B. The current hook source enforces that the implementer may add or commit only after a non-empty `final_approved_at`; other git writes such as push remain denied. The CLI reports version `0.11.1`.

The assets demonstrate documented workflow structure and local hook classification. They do not demonstrate an autonomous implementation run, actual commits, remote pushes, model quality, or production deployment.
