"use server";

import { MINT_ADDRESS } from "@/data/constants";
import {
  Token,
  fetchToken,
  findAssociatedTokenPda,
} from "@metaplex-foundation/mpl-toolbox";
import { PublicKey, publicKey } from "@metaplex-foundation/umi";
import { getUmi } from "../lib/umi";
import { SplTokenAccountResult } from "../lib/types";

export async function getSplTokenAccountAddress(
  address: string,
  mint: string = MINT_ADDRESS
): Promise<SplTokenAccountResult> {
  try {
    const tokenAccount = await createOrFetchAssociatedToken(
      publicKey(address),
      publicKey(mint)
    );

    if (!tokenAccount.found) {
      return {
        found: false,
        address: tokenAccount.address,
        mint: tokenAccount.mint,
        owner: tokenAccount.owner,
      };
    } else {
      const tokenAddress = tokenAccount.token.publicKey.toString();

      return {
        found: true,
        address: tokenAddress,
      };
    }
  } catch (error) {
    console.error("Error getting SplTokenAccountAddress:", error);
    throw error;
  }
}

type CreateOrFetch =
  | {
      found: true;
      token: Token;
    }
  | {
      found: false;
      owner: string;
      mint: string;
      address: string;
    };

export async function createOrFetchAssociatedToken(
  owner: PublicKey,
  mint: PublicKey = publicKey(MINT_ADDRESS)
): Promise<CreateOrFetch> {
  try {
    const umi = getUmi();
    const associatedToken = findAssociatedTokenPda(umi, { owner, mint });
    console.log("associatedToken", associatedToken);
    const result = await fetchToken(umi, associatedToken);

    console.log("result", result);
    return {
      found: true,
      token: result,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.constructor.name === "AccountNotFoundError") {
        const umi = getUmi();
        const [associatedToken] = findAssociatedTokenPda(umi, { owner, mint });
        return {
          found: false,
          owner: owner.toString(),
          mint: mint.toString(),
          address: associatedToken.toString(),
        };
      }
    }

    throw error;
  }
}
