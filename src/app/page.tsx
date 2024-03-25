// app/page.tsx
"use client";

import Projects from "./projects/page";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Projects />
      {children}
    </>
  );
}
