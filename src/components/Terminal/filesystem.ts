import { projects } from "@/data/projects";

export type FsEntry = { name: string; route: string; dir: boolean };

// Entries listed by `ls` for a given route. null means a leaf page.
export function listDir(route: string): FsEntry[] | null {
  if (route === "/") {
    return [
      { name: "work", route: "/work", dir: true },
      { name: "about", route: "/about", dir: false },
      { name: "contact", route: "/contact", dir: false },
    ];
  }
  if (route === "/work") {
    return projects.map((p) => ({ name: p.slug, route: `/work/${p.slug}`, dir: false }));
  }
  return null;
}

export function isKnownRoute(route: string): boolean {
  if (route === "/" || route === "/work" || route === "/about" || route === "/contact") return true;
  if (route.startsWith("/work/")) {
    const slug = route.slice("/work/".length);
    return projects.some((p) => p.slug === slug);
  }
  return false;
}

// Resolve a cd target against cwd. Handles absolute (/work), home (~, ~/work),
// relative (work, ../about), "." and "..". Returns a known route or null.
export function resolvePath(cwd: string, target: string): string | null {
  const t = target.trim();
  if (t === "" || t === "~" || t === "/") return "/";

  let base: string[];
  if (t.startsWith("/") || t.startsWith("~/") || t === "~") base = [];
  else base = cwd.split("/").filter(Boolean);

  const rel = t.replace(/^~\/?/, "").replace(/^\//, "");
  for (const part of rel.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") base.pop();
    else base.push(part);
  }

  const route = base.length ? "/" + base.join("/") : "/";
  return isKnownRoute(route) ? route : null;
}

// Format a route as a terminal path.
export function promptPath(route: string): string {
  if (!route || route === "/") return "~";
  return "~" + route;
}
