import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

const SignMessage = ({
  address,
  onSignMessageClick,
  loading,
}: {
  address: string;
  onSignMessageClick: () => void;
  loading: boolean;
}) => {
  const { disconnect } = useWallet();

  return (
    <div className="flex flex-col space-y-4 items-center w-full">
      <div>
        <h1 className="text-lg text-center px-4 font-semibold">
          To Prove wallet ownership, please confirm by signing the message
        </h1>
      </div>
      <div>
        <div
          className="flex mx-auto items-center justify-center w-full
         bg-[#2c2c2c] px-4 py-2 rounded-lg"
        >
          <span>{address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}</span>
        </div>
      </div>

      <div className="flex gap-x-3">
        <Button
          className="px-10 dark:text-white"
          variant="outline"
          disabled={loading}
          onClick={onSignMessageClick}
        >
          Sign Message {loading && <span>(signing...)</span>}
        </Button>
        <Button
          className="px-10 dark:text-white"
          variant="outline"
          disabled={loading}
          onClick={() => disconnect()}
        >
          Change wallet
        </Button>
      </div>
    </div>
  );
};

export default SignMessage;
