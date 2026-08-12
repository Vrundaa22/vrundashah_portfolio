"use client";

import { useEffect, useState } from "react";

const LETTERS = ["V", "R", "U", "N", "D", "A"];
const BOUNCE_MS = 2000;
const LOAD_MS = 2600;
const EXIT_MS = 850;

type Phase = "enter" | "loading" | "exit";

type IntroSplashProps = {
  onLoadComplete: () => void;
  onComplete: () => void;
};

function IntroLoader({ progress, visible }: { progress: number; visible: boolean }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className={`intro-loader${visible ? " intro-loader--visible" : ""}`}>
      <svg className="intro-loader-svg" viewBox="0 0 44 44" aria-hidden="true">
        <defs>
          <linearGradient id="intro-loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc6d2" />
            <stop offset="50%" stopColor="#c6daff" />
            <stop offset="100%" stopColor="#ffe0c6" />
          </linearGradient>
        </defs>
        <circle className="intro-loader-track" cx="22" cy="22" r={radius} fill="none" strokeWidth="2.5" />
        <circle
          className="intro-loader-progress"
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          strokeWidth="2.5"
          stroke="url(#intro-loader-gradient)"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 22 22)"
        />
      </svg>
      <span className="intro-loader-label">{Math.round(progress)}%</span>
    </div>
  );
}

export default function IntroSplash({ onLoadComplete, onComplete }: IntroSplashProps) {
  const [phase, setPhase] = useState<Phase>("enter");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => setPhase("loading"), BOUNCE_MS);
    return () => window.clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / LOAD_MS) * 100);
      setProgress(next);

      if (next < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        onLoadComplete();
        setPhase("exit");
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [phase, onLoadComplete]);

  useEffect(() => {
    if (phase !== "exit") return;

    const exitTimer = window.setTimeout(onComplete, EXIT_MS);
    return () => window.clearTimeout(exitTimer);
  }, [phase, onComplete]);

  return (
    <div className={`intro-screen${phase === "exit" ? " intro-screen--exit" : ""}`}>
      <div className="intro-screen-bg" aria-hidden="true" />

      <div className="intro-inner">
        <div className="letters" aria-label="VRUNDA">
          {LETTERS.map((letter, index) => (
            <span
              key={letter}
              className="letter"
              style={{ animationDelay: `${index * 0.14}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        <p className="intro-role">product designer</p>

        <IntroLoader progress={progress} visible={phase === "loading" || phase === "exit"} />
      </div>
    </div>
  );
}
