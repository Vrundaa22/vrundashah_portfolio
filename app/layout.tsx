import type { Metadata } from "next";
import { Caveat, Instrument_Serif, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body
        className={`${montserrat.className} ${caveat.variable} ${instrumentSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
