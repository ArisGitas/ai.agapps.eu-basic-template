// agapps.eu basic template — https://agapps.eu
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Company",
  description: "High-quality professional services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Base language is English (en). The visitor can switch to Greek via the
  // header language toggle; LanguageProvider then updates <html lang> to match.
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
