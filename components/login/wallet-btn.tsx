import { cn } from "@/lib/utils";
import Image from "next/image";

interface WalletProps {
  id: string;
  name: string;
  icon: string;
  isDisable?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

const WalletBtn = ({
  id,
  name,
  icon,
  isLoading,
  isDisable,
  onClick,
  className,
}: WalletProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-full flex-row sm:flex-col md:w-32 p-3 dark:hover:bg-[#7d5eda]/10 hover:bg-[#7d5eda]/10 hover:text-[#cfccd8] bg-transparent border border-[#838383] rounded-md",
        className
      )}
      disabled={isLoading}
      key={id}
      onClick={onClick}
    >
      <div className="flex flex-row sm:flex-col items-center justify-center mx-auto">
        <div className="relative w-6 h-6">
          <Image src={icon} alt="menu-icon" fill sizes={"24px"} />
        </div>
        <div className="ml-4 ">
          <span>{name}</span>
        </div>
        <div className="ms-auto me-3">
          {isLoading && <span>(loading...)</span>}
          {isDisable && <span className="ms-1"> (not detected)</span>}
        </div>
      </div>
    </button>
  );
};

export default WalletBtn;
