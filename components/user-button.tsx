"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DisconnectBtn from "./disconnect";

const UserButton = ({ address }: { address: string }) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="flex items-center justify-center
         bg-[#2c2c2c] px-4 py-2 rounded-lg"
      >
        <button className="dark:text-white">
          {address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <DisconnectBtn />
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
