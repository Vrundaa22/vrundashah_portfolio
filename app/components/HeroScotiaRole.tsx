"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PREFIX = "Product Design @ ";
const BRAND = "Scotia Digital";
const FULL = `${PREFIX}${BRAND}`;
const CHAR_MS = 42;
const START_DELAY_MS = 720;

export default function HeroScotiaRole() {
  const [charCount, setCharCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    if (mq.matches) {
      setCharCount(FULL.length);
      setTypingDone(true);
      return;
    }

    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCharCount((prev) => {
          const next = prev + 1;
          if (next >= FULL.length) {
            window.clearInterval(intervalId);
            setTypingDone(true);
            return FULL.length;
          }
          return next;
        });
      }, CHAR_MS);
    }, START_DELAY_MS);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, []);

  const visible = FULL.slice(0, charCount);
  const prefixText = typingDone
    ? PREFIX
    : visible.slice(0, Math.min(visible.length, PREFIX.length));
  const brandText = typingDone
    ? BRAND
    : visible.length > PREFIX.length
      ? visible.slice(PREFIX.length)
      : "";
  const showBrand = brandText.length > 0;
  const showCursor = !typingDone && !reducedMotion;

  return (
    <p
      className={`hero-role${typingDone ? " hero-role--ready" : ""}`}
      aria-live="polite"
    >
      <span className="hero-role-type" aria-label={typingDone ? FULL : undefined}>
        {prefixText}
        {showBrand ? (
            <span
              className="hero-scotia-trigger"
              tabIndex={typingDone ? 0 : undefined}
            >
              {typingDone ? (
                <span className="hero-scotia-logo" aria-hidden="true">
                  <Image
                    src="/logos/scotiabank-mark.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="hero-scotia-logo-img"
                  />
                </span>
              ) : null}
              <span className="hero-brand hero-brand--scotia">{brandText}</span>
            </span>
        ) : null}
        {showCursor ? <span className="hero-role-cursor" aria-hidden="true" /> : null}
      </span>
    </p>
  );
}
