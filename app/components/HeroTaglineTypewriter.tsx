"use client";

import { useEffect, useState } from "react";

const LINES = [
  "I see a problem.",
  "Get a little too excited.",
  "And start designing.",
] as const;

const CHAR_MS = 40;
const LINE_PAUSE_MS = 320;
const START_DELAY_MS = 480;

export default function HeroTaglineTypewriter() {
  const [visibleLines, setVisibleLines] = useState<string[]>(() =>
    LINES.map(() => "")
  );
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    if (mq.matches) {
      setVisibleLines([...LINES]);
      setActiveLineIndex(LINES.length - 1);
      setTypingDone(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let charInterval = 0;
    let pauseTimeout = 0;

    const render = () => {
      setActiveLineIndex(lineIndex);
      setVisibleLines(
        LINES.map((line, i) => {
          if (i < lineIndex) return line;
          if (i === lineIndex) return line.slice(0, charIndex);
          return "";
        })
      );
    };

    const typeLine = () => {
      charInterval = window.setInterval(() => {
        charIndex += 1;
        render();

        if (charIndex >= LINES[lineIndex].length) {
          window.clearInterval(charInterval);

          if (lineIndex >= LINES.length - 1) {
            setTypingDone(true);
            return;
          }

          pauseTimeout = window.setTimeout(() => {
            lineIndex += 1;
            charIndex = 0;
            render();
            typeLine();
          }, LINE_PAUSE_MS);
        }
      }, CHAR_MS);
    };

    const startTimeout = window.setTimeout(typeLine, START_DELAY_MS);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(pauseTimeout);
      window.clearInterval(charInterval);
    };
  }, []);

  const showCursor = !typingDone && !reducedMotion;

  return (
    <h1
      className="hero-headline hero-headline--mockup hero-headline--typewriter"
      aria-live="polite"
    >
      {LINES.map((line, index) => {
        const text = visibleLines[index];
        if (!text && index > activeLineIndex) {
          return null;
        }

        const isActive = index === activeLineIndex && showCursor;

        return (
          <span key={line} className="hero-headline-line">
            {text}
            {isActive ? (
              <span className="hero-role-cursor hero-tagline-cursor" aria-hidden="true" />
            ) : null}
          </span>
        );
      })}
    </h1>
  );
}
