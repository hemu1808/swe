import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Make sure you import 'cn' if you use it, or just use strings

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Hemanth Kumar | Portfolio",
  description: "Full Stack Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          outfit.className,
          "bg-zinc-950 text-zinc-50 antialiased selection:bg-blue-500/30 overflow-x-hidden"
        )}
      >
        {children}
      </body>
    </html>
  );
}