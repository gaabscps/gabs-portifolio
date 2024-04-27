import { useEffect, useState } from "react";

function useWindow() {
  const [windowObject, setWindowObject] = useState<
    null | (Window & typeof globalThis)
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowObject(window);
    }
  }, []);

  return windowObject;
}

export default useWindow;
