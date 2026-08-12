"use client";

import { useEffect, useState } from "react";

export type ScrollGradientTheme =
  | "home"
  | "saveup"
  | "releaf"
  | "content-design"
  | "outlook";

type GradientLine = {
  top: string;
  rotate: number;
  speed: number;
  hue: string;
};

const LINE_THEMES: Record<ScrollGradientTheme, GradientLine[]> = {
  home: [
    { top: "8%", rotate: -14, speed: 0.12, hue: "rgba(255, 198, 210" },
    { top: "22%", rotate: -8, speed: -0.08, hue: "rgba(198, 218, 255" },
    { top: "38%", rotate: -18, speed: 0.06, hue: "rgba(255, 224, 198" },
    { top: "54%", rotate: -10, speed: -0.1, hue: "rgba(220, 198, 255" },
    { top: "70%", rotate: -16, speed: 0.09, hue: "rgba(198, 240, 220" },
    { top: "86%", rotate: -6, speed: -0.05, hue: "rgba(255, 210, 230" },
  ],
  saveup: [
    { top: "6%", rotate: -12, speed: 0.1, hue: "rgba(210, 228, 248" },
    { top: "24%", rotate: -7, speed: -0.07, hue: "rgba(198, 218, 255" },
    { top: "42%", rotate: -15, speed: 0.05, hue: "rgba(220, 234, 252" },
    { top: "58%", rotate: -9, speed: -0.09, hue: "rgba(186, 210, 240" },
    { top: "74%", rotate: -14, speed: 0.08, hue: "rgba(200, 222, 245" },
    { top: "90%", rotate: -5, speed: -0.04, hue: "rgba(176, 200, 232" },
  ],
  releaf: [
    { top: "6%", rotate: -12, speed: 0.1, hue: "rgba(210, 232, 214" },
    { top: "24%", rotate: -7, speed: -0.07, hue: "rgba(198, 230, 208" },
    { top: "42%", rotate: -15, speed: 0.05, hue: "rgba(220, 240, 218" },
    { top: "58%", rotate: -9, speed: -0.09, hue: "rgba(190, 220, 198" },
    { top: "74%", rotate: -14, speed: 0.08, hue: "rgba(205, 232, 210" },
    { top: "90%", rotate: -5, speed: -0.04, hue: "rgba(180, 215, 192" },
  ],
  "content-design": [
    { top: "8%", rotate: -13, speed: 0.11, hue: "rgba(248, 228, 210" },
    { top: "26%", rotate: -8, speed: -0.07, hue: "rgba(255, 236, 220" },
    { top: "44%", rotate: -16, speed: 0.06, hue: "rgba(240, 218, 198" },
    { top: "62%", rotate: -10, speed: -0.08, hue: "rgba(252, 232, 214" },
    { top: "78%", rotate: -12, speed: 0.07, hue: "rgba(245, 224, 205" },
    { top: "92%", rotate: -6, speed: -0.05, hue: "rgba(255, 240, 225" },
  ],
  outlook: [
    { top: "8%", rotate: -12, speed: 0.1, hue: "rgba(200, 224, 248" },
    { top: "26%", rotate: -8, speed: -0.07, hue: "rgba(186, 214, 245" },
    { top: "44%", rotate: -14, speed: 0.06, hue: "rgba(210, 230, 252" },
    { top: "62%", rotate: -9, speed: -0.08, hue: "rgba(175, 205, 240" },
    { top: "78%", rotate: -13, speed: 0.07, hue: "rgba(195, 220, 248" },
    { top: "92%", rotate: -5, speed: -0.04, hue: "rgba(180, 210, 238" },
  ],
};

type ScrollGradientLinesProps = {
  theme?: ScrollGradientTheme;
};

export default function ScrollGradientLines({
  theme = "home",
}: ScrollGradientLinesProps) {
  const [scrollY, setScrollY] = useState(0);
  const lines = LINE_THEMES[theme];

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`scroll-gradient-lines scroll-gradient-lines--${theme}`}
      aria-hidden="true"
    >
      {lines.map((line, index) => (
        <div
          key={index}
          className="scroll-gradient-line"
          style={{
            top: line.top,
            transform: `translateY(${scrollY * line.speed}px) rotate(${line.rotate}deg)`,
            background: `linear-gradient(90deg, transparent 0%, ${line.hue}, 0.42) 18%, ${line.hue}, 0.26) 50%, ${line.hue}, 0.42) 82%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
}
