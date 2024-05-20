import type { Metadata } from "next";
import { Lilita_One, Poppins } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/providers/solana-wallet";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ModalProvider } from "@/providers/model-provider";
import "react-toastify/dist/ReactToastify.css";
import { DESCRIPTION, NAME } from "@/data/constants";
import ShowPopUp from "@/components/pop-up";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark" attribute="class">
          <SolanaProvider>
            {children}
            <ShowPopUp />
            <ModalProvider />
            <ToastProvider />
          </SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
