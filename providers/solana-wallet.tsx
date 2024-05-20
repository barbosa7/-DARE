"use client";

import { WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { FC, ReactNode, useCallback, useMemo } from "react";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC_URL!, []);
  const wallets = useMemo(() => [], []);

  const onError = useCallback((error: WalletError) => {
    try {
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect
        // autoConnect={autoSignIn}
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const SolanaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <WalletContextProvider>{children}</WalletContextProvider>;
};
