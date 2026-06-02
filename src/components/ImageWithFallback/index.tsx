"use client";

import NextImage, { ImageProps } from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { ProjectPlaceholder } from "@/components/ProjectPlaceholder";

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ReactNode;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  fallback = <ProjectPlaceholder />,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [props.src]);

  if (hasError) {
    return <>{fallback}</>;
  }

  return (
    <NextImage
      {...props}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
    />
  );
};
