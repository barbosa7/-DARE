"use client";

import { useModal } from "@/hooks/use-modal";
import { useEffect } from "react";

const ShowPopUp = () => {
  const { onOpen } = useModal();

  useEffect(() => {
    onOpen("popup");
  }, [onOpen]);

  return null;
};

export default ShowPopUp;
