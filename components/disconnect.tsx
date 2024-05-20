"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./ui/button";

const DisconnectBtn = () => {
  const wallet = useWallet();
  return (
    <Button
      className="w-full"
      variant={"destructive"}
      onClick={() => {
        console.log("disconnect");
        wallet.disconnect();
      }}
    >
      Disconnect
    </Button>
  );
};

export default DisconnectBtn;
