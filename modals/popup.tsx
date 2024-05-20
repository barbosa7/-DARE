"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DISCLAIMER } from "@/data/constants";
import { useModal } from "@/hooks/use-modal";

export default function PopUp() {
  const { type, onClose, isOpen } = useModal();

  const isModalOpen = isOpen && type === "popup";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:w-[400px] bg-black/60 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>DISCLAIMER</DialogTitle>
        </DialogHeader>
        <DialogDescription>{DISCLAIMER}</DialogDescription>
        <DialogFooter>
          <Button
            onClick={onClose}
            variant={"outline"}
            className="mx-auto w-72"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
