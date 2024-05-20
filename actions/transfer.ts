"use server";

import { getUmi } from "@/lib/umi";
import { deserialize } from "@/lib/utils";
import { sendWebhook } from "@/lib/send-webhook";
import { base58 } from "@metaplex-foundation/umi/serializers";

type Success = {
  success: true;
  message: string;
};

type Error = {
  success: false;
  message: string;
};

export async function transferWithNotification(
  userAddress: string,
  message: string,
  transaction: string
): Promise<Success | Error> {
  try {
    if (!userAddress || !message || !transaction) {
      return {
        success: false,
        message: "Missing data. Please try again.",
      };
    }

    if (message.length > 2000) {
      return {
        success: false,
        message: "Message must be less than 2000 characters. Please try again.",
      };
    }

    if (message.length === 0) {
      return {
        success: false,
        message: "Please enter a dare.",
      };
    }

    const umi = getUmi();

    const tx = await umi.rpc.sendTransaction(deserialize(transaction));
    const confirmResult = await umi.rpc.confirmTransaction(tx, {
      strategy: { type: "blockhash", ...(await umi.rpc.getLatestBlockhash()) },
      commitment: "confirmed",
    });

    if (confirmResult.value.err) {
      return {
        success: false,
        message:
          "Transaction was not confirmed. Please try again or contact support.",
      };
    }

    await sendWebhook({
      title: "Transaction Successful",
      description: "Message: \n" + message,
      fields: [
        {
          name: "Transaction Hash",
          value:
            "[" +
            base58.deserialize(tx)[0] +
            "](https://solscan.io/tx/" +
            base58.deserialize(tx)[0] +
            ")",
        },
        {
          name: "From",
          value:
            "[" +
            userAddress +
            "](https://solscan.io/address/" +
            userAddress +
            ")",
        },
      ],
      color: 0x00ff00,
      footer: new Date().toLocaleString(),
    });

    return {
      success: true,
      message: "Transaction successful.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
}
