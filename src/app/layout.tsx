import "./globals.css";
import { Inter } from "next/font/google";

import PlausibleProvider from "next-plausible";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "70Check",
  description: "Check if you're eligible for Twitch's 70/30 split",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <PlausibleProvider domain="70.t3.gg" />
      </head>
      <body className={`${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
