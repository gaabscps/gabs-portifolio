// src/components/Terminal/commands.ts
import { siteConfig } from "@/config/site";

export type Tone = "default" | "accent" | "green" | "dim" | "error";
export type TerminalLine = { text: string; tone?: Tone };
export type CommandContext = { clear: () => void };
export type CommandHandler = (args: string[], ctx: CommandContext) => TerminalLine[];

const line = (text: string, tone?: Tone): TerminalLine => ({ text, tone });

export const COMMANDS: Record<string, CommandHandler> = {
  help: () => [
    line("available commands:", "dim"),
    line("  whoami        who is this"),
    line("  stack         the tools I build with"),
    line("  contact       how to reach me"),
    line('  ask "..."     ask me something (scripted for now)'),
    line("  sudo hire-me  ;)"),
    line("  clear         wipe the screen"),
  ],
  whoami: () => [
    line("gabriel andrade · front-end engineer", "green"),
    line("São Paulo, BR · three years shipping before the AI boom", "dim"),
    line("now shipping with AI as leverage, not as the demo"),
  ],
  stack: () => [
    line("front-end   React · Next.js · TypeScript · Chakra UI"),
    line("data        Supabase · Node · SQLite"),
    line("game/server Java · Spigot · Purpur"),
    line("ai          Claude", "accent"),
  ],
  contact: () => [
    line("email     contact@gabrielandrade.net", "accent"),
    line(`github    ${siteConfig.social.github.replace("https://", "")}`),
    line(`linkedin  ${siteConfig.social.linkedin.replace("https://www.", "")}`),
  ],
  clear: (_args, ctx) => {
    ctx.clear();
    return [];
  },
  "sudo hire-me": () => [
    line("[sudo] password for recruiter: ********", "dim"),
    line("access granted.", "green"),
    line("opening contact… (just email me: contact@gabrielandrade.net)"),
  ],
  ask: (args) => {
    const q = args.join(" ").toLowerCase();
    let answer: string;
    if (!q) return [line('usage: ask "your question"', "error")];
    if (q.includes("hire") || q.includes("why")) answer = "I ship. Three years of production work before the AI wave, and now I use AI to move faster without shipping the demo.";
    else if (q.includes("stack") || q.includes("tech")) answer = "React, Next.js and TypeScript up front; Supabase and Node behind. Run 'stack' for the full list.";
    else if (q.includes("ai")) answer = "AI writes a lot of my code now. My job is the architecture, the tests, and knowing when to stop it before it ships something that breaks.";
    else answer = "Good question. The short version: I like shipping small, correct things and improving them in the open.";
    return [line(answer), line("[scripted answer · the real AI is coming soon]", "dim")];
  },
};

export const COMMAND_NAMES = Object.keys(COMMANDS);

// Closest command by simple prefix / inclusion, for the "did you mean" hint.
function closest(cmd: string): string | null {
  const base = cmd.split(" ")[0];
  return COMMAND_NAMES.find((n) => n.startsWith(base) || n.split(" ")[0] === base) ?? null;
}

// Parse a raw input line, dispatch to a handler, and produce output lines.
// Handles empty input, the overlong-input joke, and the unknown-command joke.
export function runCommand(input: string, ctx: CommandContext): TerminalLine[] {
  const raw = input.trim();
  if (!raw) return [];
  if (raw.length > 60) {
    return [line("usage limit exceeded. resets when you scroll. (kidding, keep it short)", "error")];
  }
  // Match the two-word command first, else the first token.
  const lower = raw.toLowerCase();
  const twoWord = raw.split(/\s+/).slice(0, 2).join(" ").toLowerCase();
  const key = COMMANDS[twoWord] ? twoWord : COMMANDS[lower.split(/\s+/)[0]] ? lower.split(/\s+/)[0] : null;
  if (!key) {
    const guess = closest(lower);
    return [
      line(`command not found: ${raw.split(/\s+/)[0]}`, "error"),
      line("our harness flagged this as a non-treated message. escalating to a human (that's you).", "error"),
      ...(guess ? [line(`did you mean '${guess}'? or try 'help'.`, "dim")] : [line("try 'help'.", "dim")]),
    ];
  }
  // args = everything after the matched command
  const consumed = key.split(" ").length;
  const args = raw.split(/\s+/).slice(consumed);
  return COMMANDS[key](args, ctx);
}

// Tab autocomplete: return the single completion for a prefix, or null.
export function completeCommand(prefix: string): string | null {
  const p = prefix.trim().toLowerCase();
  if (!p) return null;
  const matches = COMMAND_NAMES.filter((n) => n.startsWith(p));
  return matches.length === 1 ? matches[0] : null;
}
