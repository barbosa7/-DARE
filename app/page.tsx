import Content from "@/components/home/content";
import User from "@/components/user";
import { POWERED_LINK } from "@/data/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden relative">
      <Image
        src={"/background.png"}
        alt="background"
        fill
        sizes={"100vw"}
        className="object-cover -z-30"
        priority
      />
      <div className="absolute -z-20 bg-gradient-to-t from-black to-transparent w-full h-full"></div>
      <div className="absolute bg-black opacity-50 w-full h-full -z-10"></div>
      <div className="w-full h-full flex items-center flex-col relative ">
        <header className="w-full p-4  flex items-center justify-end">
          <User />
        </header>
        <Content />
        <footer className="p-4 bg-black w-full absolute bottom-0 flex items-center justify-center">
          <span>
            Powered by{" "}
            <Link
              target="_blank"
              className="underline text-blue-500"
              href={POWERED_LINK}
            >
              Jiggas
            </Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
