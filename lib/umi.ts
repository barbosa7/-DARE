import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

export function getUmi() {
  return createUmi(process.env.NEXT_PUBLIC_RPC_URL!, {
    httpHeaders: {
      Origin: process.env.NEXT_PUBLIC_ORIGIN!,
    },
  }).use(mplTokenMetadata());
}
