import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./outlook-demo.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "A New Look to Outlook — Prototype",
  robots: { index: false, follow: false },
};

export default function OutlookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`outlook-demo-root ${dmSans.variable} ${outfit.variable}`}>
      {children}
    </div>
  );
}
