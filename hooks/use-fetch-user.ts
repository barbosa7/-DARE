import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

export function useFetchUser() {
  const wallet = useWallet();

  const publicKey = useMemo(() => {
    if (!wallet.connected || !wallet.publicKey) {
      return null;
    }
    return wallet.publicKey.toString();
  }, [wallet.connected, wallet.publicKey]);

  return publicKey;
}
