"use client";

import { useEffect, useState } from "react";

const LINES = [
  "I see a problem.",
  "Get a little too excited.",
  "And start designing :)",
] as const;

const START_DELAY_MS = 650;
const LINE_PAUSE_MS = 580;

function delayForChar(char: string, indexInLine: number): number {
  if (char === " ") return 64;
  if (char === ".") return 420;
  if (char === ":") return 280;
  if (char === ")") return 240;
  const wobble = (indexInLine % 4) * 7;
  return 56 + wobble;
}

export default function HeroTaglineTypewriter() {
  const [visibleLines, setVisibleLines] = useState<string[]>(() =>
    LINES.map(() => "")
  );
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [settledLines, setSettledLines] = useState<Set<number>>(() => new Set());
  const [typingDone, setTypingDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    if (mq.matches) {
      setVisibleLines([...LINES]);
      setActiveLineIndex(LINES.length - 1);
      setSettledLines(new Set(LINES.map((_, i) => i)));
      setTypingDone(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let charTimeout = 0;
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

    const finishLine = () => {
      setSettledLines((prev) => new Set(prev).add(lineIndex));

      if (lineIndex >= LINES.length - 1) {
        setTypingDone(true);
        return;
      }

      pauseTimeout = window.setTimeout(() => {
        lineIndex += 1;
        charIndex = 0;
        render();
        typeNextChar();
      }, LINE_PAUSE_MS);
    };

    const typeNextChar = () => {
      const line = LINES[lineIndex];
      if (charIndex >= line.length) {
        finishLine();
        return;
      }

      const char = line[charIndex];
      const wait = delayForChar(char, charIndex);

      charTimeout = window.setTimeout(() => {
        charIndex += 1;
        render();

        if (charIndex >= line.length) {
          finishLine();
        } else {
          typeNextChar();
        }
      }, wait);
    };

    const startTimeout = window.setTimeout(typeNextChar, START_DELAY_MS);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(pauseTimeout);
      window.clearTimeout(charTimeout);
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
        const isSettled = settledLines.has(index);

        return (
          <span
            key={line}
            className={`hero-headline-line${isSettled ? " hero-headline-line--settled" : ""}${isActive ? " hero-headline-line--active" : ""}`}
          >
            {text}
            {isActive ? (
              <span className="hero-tagline-cursor" aria-hidden="true" />
            ) : null}
          </span>
        );
      })}
    </h1>
  );
}
