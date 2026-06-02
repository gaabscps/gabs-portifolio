import { useEffect, useState } from "react";

export const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? Math.min(100, Math.round((scrolled / height) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
};
