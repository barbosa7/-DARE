"use client";

import { Login } from "@/components/login/login";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { useWallet } from "@solana/wallet-adapter-react";

export default function LoginModal() {
  const { type, onClose, isOpen } = useModal();
  const { connected, disconnect } = useWallet();

  const isModalOpen = isOpen && type === "login";
  const handleClose = () => {
    if (connected) {
      disconnect();
    }
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <Login />
      </DialogContent>
    </Dialog>
  );
}
