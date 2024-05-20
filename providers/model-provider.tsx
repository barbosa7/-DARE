"use client";

import { useEffect, useState } from "react";
import LoginModal from "../modals/login-modal";
import PopUp from "@/modals/popup";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <PopUp />
    </>
  );
};
