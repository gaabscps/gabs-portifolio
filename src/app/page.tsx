// app/page.tsx
"use client";

import Home from "./home/page";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Home />
      {children}
    </>
  );
}
