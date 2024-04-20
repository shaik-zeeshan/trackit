import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "trackit",
  description: "track your favorite blogs",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className=" flex flex-col min-h-screen w-full ">
            {children}
            {modal}
            <Toaster />
            <div className="fixed z-50 left-5 bottom-5">
              <ModeToggle />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
