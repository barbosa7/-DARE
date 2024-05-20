import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { useWallet } from "@solana/wallet-adapter-react";

const useUmi = () => {
  const wallet = useWallet();

  const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!)
    .use(mplTokenMetadata())
    .use(walletAdapterIdentity(wallet));

  return umi;
};

export default useUmi;
