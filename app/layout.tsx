import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Caveat, Instrument_Serif, Montserrat } from "next/font/google";
import MicrosoftClarity from "./components/MicrosoftClarity";
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

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const siteDescription =
  "I love turning everyday problems into fun, seamless and impactful product experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Vrunda Shah — Product Designer",
  description: siteDescription,
  openGraph: {
    title: "Vrunda Shah — Product Designer",
    description: siteDescription,
    url: "/",
    siteName: "Vrunda Shah",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrunda Shah — Product Designer",
    description: siteDescription,
  },
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
        <Analytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
