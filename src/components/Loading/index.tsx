import { Container } from "@chakra-ui/react";
import Image from "next/image";

interface LoadingProps {
  loading: boolean;
}

export default function Loading({ loading }: LoadingProps) {
  return (
    <Container
      position="absolute"
      width="100vw"
      height={"100vh"}
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
        }}
        src="https://i.gifer.com/YlWC.gif"
        alt="loading"
        width={150}
        height={150}
      />
    </Container>
  );
}
