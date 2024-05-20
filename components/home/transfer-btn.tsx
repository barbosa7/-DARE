"use client";

import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AMOUNT, DESTINATION_ADDRESS } from "@/data/constants";
import { useFetchUser } from "@/hooks/use-fetch-user";
import { transferWithNotification } from "@/actions/transfer";
import LoginButton from "../login-btn";
import { toast } from "react-toastify";
import useUmi from "@/hooks/use-umi";
import { reverseFormatAmountWithDecimals, serialize } from "@/lib/utils";
import {
  createNoopSigner,
  publicKey,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import {
  createTokenIfMissing,
  setComputeUnitLimit,
  setComputeUnitPrice,
  transferTokens,
} from "@metaplex-foundation/mpl-toolbox";
import { getSplTokenAccountAddress } from "@/actions/get-spl-token-account";
import { getUserBalance } from "@/actions/get-user-balance";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";

const TransferButton = ({
  message,
  reset,
}: {
  message: string;
  reset: () => void;
}) => {
  const user = useFetchUser();
  const [isPending, startTransition] = useTransition();
  const umi = useUmi();

  if (!user) {
    return <LoginButton className="w-full" />;
  }

  const handleClick = async () => {
    try {
      if (message.length === 0) {
        toast.warning("Please enter a dare");
        return;
      }

      const balance = await getUserBalance(user);

      if (balance < AMOUNT) {
        toast.error("Insufficient balance");
        return;
      }

      const sourceTokenAccount = await getSplTokenAccountAddress(user);
      const destinationTokenAccount = await getSplTokenAccountAddress(
        DESTINATION_ADDRESS
      );

      let transactionBuild = transactionBuilder();

      if (!destinationTokenAccount.found) {
        transactionBuild = transactionBuild
          .add(
            createTokenIfMissing(umi, {
              owner: publicKey(destinationTokenAccount.owner),
              mint: publicKey(destinationTokenAccount.mint),
            })
          )
          .setFeePayer(createNoopSigner(publicKey(user)));
      }

      transactionBuild = transactionBuild
        .add(
          setComputeUnitLimit(umi, {
            units: 800000,
          })
        )
        .add(
          setComputeUnitPrice(umi, {
            microLamports: 75000,
          })
        )
        .add(
          transferTokens(umi, {
            source: publicKey(sourceTokenAccount.address),
            destination: publicKey(destinationTokenAccount.address),
            amount: reverseFormatAmountWithDecimals(AMOUNT),
          })
        )
        .setFeePayer(createNoopSigner(publicKey(user)));

      const tx = await transactionBuild.buildWithLatestBlockhash(umi);
      const signed = await umi.identity.signTransaction(tx);
      // Serialize the transaction
      const transaction = serialize(signed);

      // Send the transaction with notification
      transferWithNotification(user, message, transaction).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        reset();
      });
    } catch (error) {
      if (error instanceof WalletSignTransactionError) {
        toast.error("Transaction was rejected.");
        return;
      }
      toast.error("An error occured. Please try again");
    }
  };

  return (
    <Button
      disabled={isPending}
      variant={"mybtn"}
      className="w-full"
      onClick={() => startTransition(() => handleClick())}
    >
      Send
    </Button>
  );
};

export default TransferButton;
