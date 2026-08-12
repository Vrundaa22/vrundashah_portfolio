import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Caveat, DM_Sans, Instrument_Serif, Montserrat } from "next/font/google";
import MicrosoftClarity from "./components/MicrosoftClarity";
import "./globals.css";
import "./elegant-overrides.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Vrunda",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${montserrat.variable} ${dmSans.variable} ${caveat.variable} ${instrumentSerif.variable}`}
      >
        {children}
        <MicrosoftClarity />
      </body>
    </html>
  );
}
