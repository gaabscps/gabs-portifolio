/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";

interface LoadingProps {
  loading: boolean;
}

export default function Loading({ loading }: LoadingProps) {
  //scrolla a tela para o topo e desabilita o scroll
  const onScroll = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = loading ? "hidden" : "auto";
  };

  useEffect(() => {
    onScroll();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Container
      position={"absolute"}
      width="100vw"
      height="100vh"
      backgroundColor="#000"
      zIndex={loading ? "100" : "0"}
      opacity={loading ? "0.8" : "0"}
      transition={"opacity 0.2s ease-in-out"}
    >
      <img
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: loading ? "block" : "none",
        }}
        src="https://i.gifer.com/YlWC.gif"
        alt="loading"
        width={150}
        height={150}
      />
    </Container>
  );
}
