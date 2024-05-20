import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletConnectionError,
  WalletName,
  WalletReadyState,
  WalletSignMessageError,
} from "@solana/wallet-adapter-base";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal";
import nacl from "tweetnacl";
import SignMessage from "./sign-message";
import { toast } from "react-toastify";
import { SIGNATURE_MESSAGE } from "@/data/constants";
import WalletBtn from "./wallet-btn";

export const Login = () => {
  const {
    wallets,
    select,
    connected,
    publicKey,
    connect,
    connecting,
    disconnect,
    signMessage,
  } = useWallet();
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onClose } = useModal();

  useEffect(() => {
    const handleSolanaConnect = async () => {
      try {
        await connect();
        console.log("Connecting to wallet...");
      } catch (error: any) {
        if (
          error instanceof WalletConnectionError &&
          error.message === "User rejected the request."
        ) {
          console.log("User rejected the connection request");
        } else {
          console.error("Wallet connection error:", error.message);
        }
      }
    };
    if (selected) {
      handleSolanaConnect();
    }
  }, [selected, connect]);

  const handleSolanaWalletConnect = async (name: WalletName) => {
    try {
      if (!connected) {
        select(name);
        setSelected(true);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (publicKey) {
    const sign = async () => {
      const message = new TextEncoder().encode(SIGNATURE_MESSAGE);
      if (!signMessage)
        throw new Error("Wallet does not support message signing");
      try {
        setLoading(true);
        const uint8arraySignature = await signMessage(message);
        const walletIsSigner = nacl.sign.detached.verify(
          message,
          uint8arraySignature,
          publicKey.toBuffer()
        );

        if (walletIsSigner) {
          toast.success("Wallet connected successfully", {
            autoClose: 2000,
          });
          onClose();
          return;
        }

        toast.error("Invalid signature. Please try again", {
          autoClose: 2000,
        });
      } catch (error) {
        if (error instanceof WalletSignMessageError) {
          if (error.message.includes("not connected")) {
            onClose();
          }
          if (error.message.includes("invalid account")) {
            toast.warning("Invalid account. Please try again", {
              autoClose: 2000,
            });
            disconnect();
          }
          if (error.message.includes("User rejected the request.")) {
            toast.warning("User rejected the request. Please try again", {
              autoClose: 2000,
            });
          }
        }
      } finally {
        setLoading(false);
      }
    };
    return (
      <SignMessage
        loading={loading}
        onSignMessageClick={sign}
        address={publicKey.toBase58()}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {wallets.map((wallet) => (
        <WalletBtn
          key={wallet.adapter.name}
          icon={wallet.adapter.icon}
          name={wallet.adapter.name}
          id={wallet.adapter.name}
          isLoading={connecting}
          onClick={() => handleSolanaWalletConnect(wallet.adapter.name)}
          isDisable={wallet.readyState === WalletReadyState.NotDetected}
        />
      ))}
    </div>
  );
};
