"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import OutlookLogo from "@/components/outlook-demo/OutlookLogo";
import { OUTLOOK_MAIL } from "@/lib/outlook-demo/paths";

/** Border draw → logo in → unfold → Outlook title → enter app */
const INTRO_EXIT_MS = 6000;

export default function OutlookIntro() {
  const router = useRouter();
  const borderId = useId();
  const doneRef = useRef(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      router.replace(`${OUTLOOK_MAIL}?embed=1`);
      return;
    }

    const exitTimer = window.setTimeout(() => setExiting(true), INTRO_EXIT_MS - 600);
    const navTimer = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      router.push(`${OUTLOOK_MAIL}?embed=1`);
    }, INTRO_EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <main
      className={`ol-intro${exiting ? " ol-intro--exit" : ""}`}
      aria-label="Outlook loading"
    >
      <div className="ol-intro-content">
        <div className="ol-intro-stage">
          <svg
            className="ol-intro-border-svg"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={borderId} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7dd3e8" />
                <stop offset="45%" stopColor="#2a9daf" />
                <stop offset="100%" stopColor="#1a5080" />
              </linearGradient>
            </defs>
            <rect
              className="ol-intro-border"
              x="10"
              y="10"
              width="100"
              height="100"
              rx="22"
              pathLength={1}
              stroke={`url(#${borderId})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="ol-intro-logo">
            <OutlookLogo intro size={140} />
          </div>
        </div>

        <p className="ol-intro-title">Outlook</p>
      </div>
    </main>
  );
}
