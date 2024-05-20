"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Flip, ToastContainer } from "react-toastify";

export function ToastProvider() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      className={"z-[2000]"}
      toastStyle={{
        zIndex: "2000",
      }}
      theme={theme === "dark" ? "dark" : "light"}
      transition={Flip}
    />
  );
}
