// agapps.eu basic template — https://agapps.eu
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Η Εταιρεία Μας",
  description: "Επαγγελματικές υπηρεσίες υψηλής ποιότητας.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" className={dmSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
