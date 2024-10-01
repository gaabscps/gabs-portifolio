/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const useFullSize = () => {
  const [isOpenedImage, setIsOpenedImage] = useState<boolean>(false);
  const [openedImage, setOpenedImage] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const openImageFullSize = (imageClick: string) => {
    setIsOpenedImage(true);
    setOpenedImage(imageClick);
  };

  useEffect(() => {
    if (isOpenedImage) {
      // Store the current scroll position
      setScrollPosition(window?.scrollY || 0);
      window?.scrollTo(0, 0);
    } else {
      window?.scrollTo(0, scrollPosition);
    }
  }, [isOpenedImage]);

  return {
    openImageFullSize,
    setIsOpenedImage,
    isOpenedImage,
    openedImage,
  };
};
