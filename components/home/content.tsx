import { AMOUNT, TOKEN_NAME } from "@/data/constants";
import Image from "next/image";
import MainCard from "./main-card";
import { cn } from "@/lib/utils";

const Content = () => {
  return (
    <div className="bg-gradient-to-t from-black/30 to-transparent backdrop-blur opacity-80 w-full max-w-5xl rounded-lg mx-auto md:p-12 pt-2 border-none md:border flex flex-col md:flex-row gap-x-12 my-auto">
      <div className="flex flex-col space-y-7 p-2 lg:p-4 basis-1/2">
        <div className="flex space-x-2 md:space-x-4 items-center">
          <div className="size-12 sm:size-16 md:size-24 relative">
            <Image
              src={"/logo.jpg"}
              alt="logo"
              fill
              sizes="100%"
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className={cn("text-2xl md:text-4xl")}>Truth and dare</h1>
          </div>
        </div>
        <div className="max-h-24 sm:max-h-36  w-full overflow-auto">
          <p className="font-normal leading-5 md:leading-6 max-w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            ducimus quidem veritatis est veniam debitis dolor odit, non quod
            totam dolorem maxime, ipsam fugiat iure cum sed, vitae a blanditiis.
          </p>
        </div>
        <div>
          <span>
            <span className="text-xs">
              {" "}
              per{" "}
              <span className="capitalize font-bold">
                {TOKEN_NAME.toLowerCase()}
              </span>
            </span>{" "}
            <span className="text-lg">
              <span className="font-mono uppercase text-md">{AMOUNT}</span>{" "}
              <span className="font-bold">${TOKEN_NAME}</span>
            </span>
          </span>
        </div>
      </div>
      <div className="w-0.5 h-[80%] m-auto bg-white/60 backdrop-blur-sm"></div>
      <MainCard />
    </div>
  );
};

export default Content;
