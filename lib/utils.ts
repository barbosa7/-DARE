import { TOKEN_DECIMALS } from "@/data/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUmi } from "./umi";
import { Transaction } from "@metaplex-foundation/umi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatAmountWithDecimals(
  amount: number,
  decimals: number = TOKEN_DECIMALS
): number {
  const multiplier = 10 ** decimals;
  const formattedAmount = amount / multiplier;
  return formattedAmount;
}

export function reverseFormatAmountWithDecimals(
  formattedAmount: number,
  decimals: number = TOKEN_DECIMALS
): bigint {
  // Multiply the formatted amount by 10^decimals and round it to the nearest integer
  const rawAmount = BigInt(Math.round(formattedAmount * 10 ** decimals));

  return rawAmount;
}

export function serialize(transaction: Transaction) {
  const umi = getUmi();
  const serializedTransaction = umi.transactions.serialize(transaction);
  return Buffer.from(serializedTransaction).toString("base64");
}

export function deserialize(transaction: string) {
  const umi = getUmi();
  const decodedTransaction = Buffer.from(transaction, "base64");
  return umi.transactions.deserialize(decodedTransaction);
}
