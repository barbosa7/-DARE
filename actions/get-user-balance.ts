"use server";

import { MINT_ADDRESS } from "@/data/constants";
import { getUmi } from "@/lib/umi";
import { formatAmountWithDecimals } from "@/lib/utils";
import {
  fetchToken,
  findAssociatedTokenPda,
} from "@metaplex-foundation/mpl-toolbox";
import { publicKey } from "@metaplex-foundation/umi";

export async function getUserBalance(
  owner: string,
  mint: string = MINT_ADDRESS
): Promise<number> {
  try {
    const umi = getUmi();
    const associatedToken = findAssociatedTokenPda(umi, {
      owner: publicKey(owner),
      mint: publicKey(mint),
    });
    const result = await fetchToken(umi, associatedToken);
    const rawBalance = Number(result.amount);
    const balance = formatAmountWithDecimals(rawBalance);

    return balance;
  } catch (error) {
    return 0;
  }
}
