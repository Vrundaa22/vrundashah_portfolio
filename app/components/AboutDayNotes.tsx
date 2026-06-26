"use client";

import { useState } from "react";

type BoardItem = {
  id: string;
  label: string;
  caption: string;
  rotate: number;
  className: string;
};

const BOARD_ITEMS: BoardItem[] = [
  {
    id: "music",
    label: "on repeat",
    caption: "drop dead · olivia rodrigo",
    rotate: -4,
    className: "about-sticker--music",
  },
  {
    id: "breakfast",
    label: "breakfast table",
    caption: "eggs · avo toast · smoothie",
    rotate: 3,
    className: "about-sticker--breakfast",
  },
  {
    id: "laptop",
    label: "tabs open",
    caption: "linkedin · figma · portfolio",
    rotate: -2,
    className: "about-sticker--laptop",
  },
  {
    id: "cozy",
    label: "in the background",
    caption: "blanket + fifa",
    rotate: 5,
    className: "about-sticker--cozy",
  },
];

function RecordPlayerArt() {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className="about-sticker-art">
      <rect x="8" y="52" width="104" height="38" rx="6" fill="#3d3d42" />
      <rect x="14" y="58" width="92" height="26" rx="4" fill="#2a2a2e" />
      <circle cx="60" cy="32" r="26" fill="#1a1a1e" stroke="#555" strokeWidth="2" />
      <circle cx="60" cy="32" r="18" fill="#c25e64" opacity="0.85" />
      <circle cx="60" cy="32" r="4" fill="#f0f0f0" />
      <text x="60" y="78" textAnchor="middle" fill="#666" fontSize="6" fontFamily="monospace">
        drop dead
      </text>
      <path
        d="M78 18 L92 8 L88 28 Z"
        fill="#888"
        stroke="#666"
        strokeWidth="0.5"
      />
      <rect x="22" y="64" width="8" height="8" rx="2" fill="#666" />
      <rect x="90" y="64" width="8" height="8" rx="2" fill="#666" />
    </svg>
  );
}

function BreakfastArt() {
  return (
    <svg viewBox="0 0 140 90" aria-hidden="true" className="about-sticker-art">
      <rect x="10" y="58" width="120" height="8" rx="2" fill="#c4a882" />
      <rect x="8" y="64" width="124" height="6" rx="1" fill="#a8896a" />
      <ellipse cx="38" cy="48" rx="22" ry="14" fill="#f5f0e6" stroke="#ddd" strokeWidth="1" />
      <circle cx="32" cy="44" r="5" fill="#fff8e7" stroke="#e8dcc8" strokeWidth="0.8" />
      <circle cx="44" cy="46" r="5" fill="#fff8e7" stroke="#e8dcc8" strokeWidth="0.8" />
      <rect x="58" y="38" width="28" height="18" rx="4" fill="#d4a574" />
      <ellipse cx="72" cy="38" rx="12" ry="5" fill="#7cb342" />
      <circle cx="68" cy="36" r="2" fill="#fff" opacity="0.6" />
      <rect x="98" y="32" width="14" height="28" rx="7" fill="#e8b4bc" opacity="0.9" />
      <rect x="100" y="34" width="10" height="8" rx="2" fill="#f48fb1" />
      <rect x="101" y="44" width="8" height="12" rx="2" fill="#ce93d8" opacity="0.7" />
    </svg>
  );
}

function LaptopArt() {
  return (
    <svg viewBox="0 0 150 100" aria-hidden="true" className="about-sticker-art">
      <rect x="20" y="12" width="110" height="68" rx="6" fill="#2a2a2e" />
      <rect x="26" y="18" width="98" height="54" rx="3" fill="#f5f5f5" />
      <rect x="26" y="18" width="98" height="12" fill="#e8e8e8" />
      <circle cx="34" cy="24" r="2.5" fill="#ff5f57" />
      <circle cx="42" cy="24" r="2.5" fill="#febc2e" />
      <circle cx="50" cy="24" r="2.5" fill="#28c840" />
      <rect x="58" y="21" width="28" height="6" rx="2" fill="#fff" stroke="#ddd" strokeWidth="0.5" />
      <rect x="30" y="34" width="22" height="5" rx="1.5" fill="#0a66c2" opacity="0.9" />
      <rect x="54" y="34" width="18" height="5" rx="1.5" fill="#a259ff" opacity="0.9" />
      <rect x="74" y="34" width="20" height="5" rx="1.5" fill="#c25e64" opacity="0.85" />
      <rect x="30" y="42" width="88" height="24" rx="2" fill="#fff" stroke="#eee" strokeWidth="0.5" />
      <rect x="34" y="46" width="40" height="3" rx="1" fill="#ddd" />
      <rect x="34" y="52" width="56" height="2" rx="1" fill="#eee" />
      <rect x="34" y="57" width="48" height="2" rx="1" fill="#eee" />
      <path d="M12 80 L138 80 L148 92 L2 92 Z" fill="#3d3d42" />
      <rect x="12" y="80" width="126" height="4" fill="#555" />
    </svg>
  );
}

function CozyArt() {
  return (
    <svg viewBox="0 0 160 90" aria-hidden="true" className="about-sticker-art">
      <rect x="0" y="0" width="160" height="90" fill="transparent" />
      <path
        d="M8 70 Q40 55 80 62 Q120 70 152 58 L152 90 L8 90 Z"
        fill="#9e8b7e"
        opacity="0.55"
      />
      <path
        d="M20 68 Q50 52 90 58 Q130 65 140 60"
        fill="none"
        stroke="#7d6b5f"
        strokeWidth="3"
        opacity="0.4"
      />
      <rect x="88" y="28" width="64" height="40" rx="4" fill="#1a472a" opacity="0.75" />
      <rect x="92" y="32" width="56" height="32" rx="2" fill="#2d5a3d" />
      <text x="98" y="52" fill="#7cff6b" fontSize="9" fontFamily="monospace" opacity="0.9">
        FIFA
      </text>
      <rect x="96" y="56" width="12" height="4" rx="1" fill="#444" />
      <rect x="112" y="56" width="12" height="4" rx="1" fill="#444" />
      <rect x="128" y="56" width="12" height="4" rx="1" fill="#444" />
    </svg>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  music: RecordPlayerArt,
  breakfast: BreakfastArt,
  laptop: LaptopArt,
  cozy: CozyArt,
};

export default function AboutDayNotes() {
  const [active, setActive] = useState<string | null>(null);

  const activeItem = BOARD_ITEMS.find((item) => item.id === active);

  return (
    <section className="about-day" aria-label="Morning mood board">
      <div className="about-day-header">
        <p className="about-day-eyebrow">morning frame</p>
        <h2 className="about-day-title">what gets my day started</h2>
        <p className="about-day-sub">
          a little fig board — tap a sticker if you&apos;re curious
        </p>
      </div>

      <div className="about-day-board">
        <div className="about-day-canvas">
          <div className="about-day-frame-label" aria-hidden="true">
            <span className="about-day-frame-dot" />
            vrunda_morning.fig
          </div>

          <div className="about-day-scene">
            {BOARD_ITEMS.map((item) => {
              const Art = ART[item.id];
              const isActive = active === item.id;
              const isBg = item.id === "cozy";

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`about-sticker ${item.className}${
                    isActive ? " about-sticker--active" : ""
                  }${isBg ? " about-sticker--bg" : ""}`}
                  style={
                    {
                      "--sticker-rotate": `${item.rotate}deg`,
                    } as React.CSSProperties
                  }
                  onClick={() => setActive(isActive ? null : item.id)}
                  aria-pressed={isActive}
                  aria-label={`${item.label}: ${item.caption}`}
                >
                  <Art />
              <p className="about-sticker-caption">{item.caption}</p>
              <span className="about-sticker-tag">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="about-day-inspector" aria-live="polite">
          <div className="about-day-inspector-bar">
            <span>frame details</span>
            <span className="about-day-inspector-step">
              {activeItem ? activeItem.id : "overview"}
            </span>
          </div>

          {activeItem ? (
            <div className="about-day-inspector-body">
              <p className="about-day-inspector-tag">{activeItem.label}</p>
              <h3 className="about-day-inspector-title">{activeItem.caption}</h3>
              <p className="about-day-inspector-text">
                {activeItem.id === "music" && "Drop Dead — on repeat until Figma opens."}
                {activeItem.id === "breakfast" && "Eggs, avo toast, smoothie. Always."}
                {activeItem.id === "laptop" && "The three tabs that start every morning."}
                {activeItem.id === "cozy" && "Blanket and FIFA running quietly behind everything."}
              </p>
            </div>
          ) : (
            <div className="about-day-inspector-body">
              <p className="about-day-inspector-tag">layer 01</p>
              <h3 className="about-day-inspector-title">morning essentials</h3>
              <p className="about-day-inspector-text">
                Music, breakfast, three tabs, and something cozy in the background. That&apos;s
                it.
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
