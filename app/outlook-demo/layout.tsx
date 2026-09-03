import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import EmbedDetector from "@/components/outlook-demo/EmbedDetector";
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
  title: "Outlook — Prototype",
  robots: { index: false, follow: false },
};

export default function OutlookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`outlook-demo-root ${dmSans.variable} ${outfit.variable}`}>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "(function(){if(window.self!==window.top||/embed=1/.test(location.search))document.documentElement.classList.add('ol-embed');})();",
        }}
      />
      <EmbedDetector />
      {children}
    </div>
  );
}
