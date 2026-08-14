import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from "next";
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

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const siteUrl = getSiteUrl();
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Vrunda Shah — Product Designer portfolio homepage",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vrunda Shah — Product Designer",
  description:
    "Product design portfolio — case studies, about, and work from Vrunda Shah.",
  openGraph: {
    title: "Vrunda Shah — Product Designer",
    description:
      "Product design portfolio — case studies, about, and work from Vrunda Shah.",
    type: "website",
    siteName: "Vrunda Shah",
    url: siteUrl,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrunda Shah — Product Designer",
    description:
      "Product design portfolio — case studies, about, and work from Vrunda Shah.",
    images: [ogImage.url],
  },
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
        <Analytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
