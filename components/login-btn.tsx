"use client";

import { useModal } from "@/hooks/use-modal";
import { Button } from "./ui/button";

const LoginButton = ({ className }: { className?: string }) => {
  const { onOpen } = useModal();
  return (
    <Button className={className} onClick={() => onOpen("login")}>
      Connect
    </Button>
  );
};

export default LoginButton;
