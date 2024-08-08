import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800']});

export const metadata: Metadata = {
  title: "BracketBuzz",
  description: "Tournament generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={poppins.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
