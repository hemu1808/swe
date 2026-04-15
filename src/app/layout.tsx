import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Hemanth Kumar | Portfolio",
  description: "Full Stack Engineer specializing in AI infrastructure, distributed systems, and data-driven product development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          outfit.className,
          "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased selection:bg-blue-500/30 overflow-x-hidden min-h-screen transition-colors duration-500"
        )}
      >
        {/* Accessibility: Skip to main content */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}