import type { TerminalLine } from "./commands";

export type Entry = { prompt?: string; cwd?: string; line?: TerminalLine };
export type SessionState = { entries: Entry[]; past: string[] };

export const SESSION_KEY = "gabriel:terminal";
export const USED_KEY = "gabriel:terminal:used";

// All sessionStorage access is guarded: private-browsing modes throw.
function safeGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* persistence unavailable; ignore */
  }
}
function safeRemove(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function loadSession(): SessionState | null {
  const raw = safeGet(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionState;
    if (parsed && Array.isArray(parsed.entries) && Array.isArray(parsed.past)) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function saveSession(s: SessionState): void {
  safeSet(SESSION_KEY, JSON.stringify(s));
}

export function clearSession(): void {
  safeRemove(SESSION_KEY);
  setUsed(false);
}

export function isUsed(): boolean {
  return safeGet(USED_KEY) === "1";
}

// Set the "used" flag and notify same-tab listeners (hint <-> chip sync).
export function setUsed(v: boolean): void {
  if (v) safeSet(USED_KEY, "1");
  else safeRemove(USED_KEY);
  try {
    window.dispatchEvent(new CustomEvent("terminal:used-change"));
  } catch {
    /* ignore */
  }
}
