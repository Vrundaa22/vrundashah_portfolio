"use client";

import { useEffect, useRef, useState } from "react";

const DROP_DEAD_SPOTIFY =
  "https://open.spotify.com/embed/track/6HcL9Jd6mcH8F9ebUl28J5?utm_source=generator";

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

function RecordPlayerArt({ spinning }: { spinning?: boolean }) {
  return (
    <svg viewBox="0 0 130 108" aria-hidden="true" className="about-sticker-art">
      <rect x="10" y="58" width="110" height="40" rx="7" fill="#3a3a40" />
      <rect x="16" y="64" width="98" height="28" rx="5" fill="#252528" />
      <rect x="22" y="70" width="12" height="10" rx="2" fill="#555" />
      <rect x="96" y="70" width="12" height="10" rx="2" fill="#555" />
      <g className={spinning ? "about-sticker-vinyl-spin" : undefined}>
        <circle cx="65" cy="34" r="28" fill="#141416" stroke="#444" strokeWidth="1.5" />
        <circle cx="65" cy="34" r="20" fill="#c25e64" opacity="0.9" />
        <circle cx="65" cy="34" r="14" fill="#1a1a1e" opacity="0.35" />
        <circle cx="65" cy="34" r="4.5" fill="#eee" />
        <path d="M65 14 L65 54 M45 34 L85 34" stroke="#222" strokeWidth="0.6" opacity="0.4" />
      </g>
      <g
        className={spinning ? "about-sticker-tonearm--playing" : undefined}
        style={{ transformOrigin: "84px 16px" }}
      >
        <path
          d="M84 16 L98 8 L94 26 Z"
          fill="#777"
          stroke="#555"
          strokeWidth="0.5"
        />
      </g>
      <text x="65" y="88" textAnchor="middle" fill="#888" fontSize="5.5" fontFamily="monospace">
        drop dead
      </text>
    </svg>
  );
}

function BreakfastArt() {
  return (
    <svg viewBox="0 0 160 102" aria-hidden="true" className="about-sticker-art">
      <rect x="8" y="68" width="144" height="10" rx="3" fill="#b8956f" />
      <rect x="6" y="76" width="148" height="8" rx="2" fill="#9a7858" opacity="0.85" />

      <ellipse cx="38" cy="58" rx="24" ry="15" fill="#faf7f2" stroke="#ddd" strokeWidth="0.8" />
      <ellipse cx="38" cy="58" rx="20" ry="12" fill="#fff" opacity="0.5" />
      <ellipse cx="31" cy="54" rx="9" ry="7" fill="#fff" stroke="#f0ebe3" strokeWidth="0.5" />
      <circle cx="31" cy="55" r="4.2" fill="#f4c430" />
      <circle cx="30" cy="54" r="1.2" fill="#fff8dc" opacity="0.8" />
      <ellipse cx="46" cy="56" rx="9" ry="7" fill="#fff" stroke="#f0ebe3" strokeWidth="0.5" />
      <circle cx="46" cy="57" r="4.2" fill="#f4c430" />
      <circle cx="45" cy="56" r="1.2" fill="#fff8dc" opacity="0.8" />

      <rect x="62" y="48" width="34" height="20" rx="5" fill="#c9924a" />
      <rect x="64" y="50" width="30" height="16" rx="4" fill="#e8b86d" />
      <path d="M68 52 Q78 48 88 52 Q78 58 68 54 Z" fill="#6aab37" opacity="0.95" />
      <path d="M72 51 Q78 49 84 51 Q78 55 72 53 Z" fill="#8bc34a" opacity="0.7" />
      <circle cx="70" cy="54" r="0.8" fill="#fff" opacity="0.5" />
      <circle cx="82" cy="53" r="0.7" fill="#d32f2f" opacity="0.8" />
      <circle cx="86" cy="55" r="0.6" fill="#d32f2f" opacity="0.7" />
      <circle cx="74" cy="56" r="0.5" fill="#333" opacity="0.5" />
      <circle cx="80" cy="57" r="0.5" fill="#333" opacity="0.45" />

      <path d="M108 78 L108 42 Q108 34 116 34 L124 34 Q132 34 132 42 L132 78 Z" fill="#e8edf2" opacity="0.9" />
      <path d="M110 78 L110 44 Q110 38 116 38 L124 38 Q130 38 130 44 L130 78 Z" fill="#fff" opacity="0.35" />
      <rect x="111" y="52" width="18" height="14" rx="2" fill="#f48fb1" opacity="0.75" />
      <rect x="111" y="66" width="18" height="10" rx="2" fill="#ce93d8" opacity="0.65" />
      <rect x="128" y="36" width="3" height="28" rx="1.5" fill="#e53935" transform="rotate(12 128 36)" />
      <ellipse cx="116" cy="40" rx="3" ry="1.5" fill="#fff" opacity="0.4" />
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

function FifaArt({ kickKey }: { kickKey: number }) {
  return (
    <svg viewBox="0 0 170 100" aria-hidden="true" className="about-sticker-art">
      <path
        d="M4 78 Q42 62 86 68 Q128 74 166 60 L166 100 L4 100 Z"
        fill="#a89282"
        opacity="0.65"
      />
      <path
        d="M12 76 Q48 62 88 66 Q130 72 158 64"
        fill="none"
        stroke="#8a7568"
        strokeWidth="2.5"
        opacity="0.35"
      />

      <rect x="72" y="14" width="88" height="54" rx="5" fill="#1c1c1e" />
      <rect x="76" y="18" width="80" height="44" rx="2" fill="#2d6a3e" />
      <rect x="76" y="38" width="80" height="1.5" fill="#fff" opacity="0.55" />
      <ellipse cx="116" cy="40" rx="10" ry="7" fill="none" stroke="#fff" strokeWidth="1" opacity="0.45" />
      <rect x="76" y="18" width="12" height="44" fill="#fff" opacity="0.08" />
      <rect x="144" y="18" width="12" height="44" fill="#fff" opacity="0.08" />

      <ellipse cx="98" cy="48" rx="3" ry="5" fill="#1a237e" />
      <rect x="95" y="52" width="6" height="8" rx="1" fill="#fff" />
      <ellipse cx="108" cy="46" rx="3" ry="5" fill="#b71c1c" />
      <rect x="105" y="50" width="6" height="8" rx="1" fill="#fff" />

      <g key={kickKey} className="about-sticker-ball-kick">
        <path
          d="M118 42 Q128 28 142 22"
          fill="none"
          stroke="#fff"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          opacity="0.7"
        />
        <circle cx="118" cy="42" r="5" fill="#fff" stroke="#222" strokeWidth="0.8" />
        <path d="M116 40 L120 44 M120 40 L116 44" stroke="#222" strokeWidth="0.6" />
        <path d="M118 37 L118 47 M113 42 L123 42" stroke="#222" strokeWidth="0.5" opacity="0.5" />
      </g>

      <rect x="88" y="72" width="36" height="14" rx="4" fill="#333" />
      <circle cx="96" cy="79" r="3" fill="#555" />
      <circle cx="116" cy="79" r="3" fill="#555" />
      <rect x="104" y="76" width="4" height="6" rx="1" fill="#c25e64" opacity="0.8" />

      <text x="80" y="30" fill="#7cff6b" fontSize="7" fontFamily="monospace" opacity="0.85">
        FIFA
      </text>
    </svg>
  );
}

export default function AboutDayNotes() {
  const [active, setActive] = useState<string | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [fifaKick, setFifaKick] = useState(0);
  const spotifyRef = useRef<HTMLIFrameElement>(null);

  const activeItem = BOARD_ITEMS.find((item) => item.id === active);

  useEffect(() => {
    return () => setMusicPlaying(false);
  }, []);

  const handleStickerClick = (item: BoardItem) => {
    if (item.id === "music") {
      if (active === "music" && musicPlaying) {
        setMusicPlaying(false);
        setActive(null);
      } else {
        setActive("music");
        setMusicPlaying(true);
      }
      return;
    }

    setMusicPlaying(false);

    if (item.id === "cozy") {
      setFifaKick((k) => k + 1);
    }

    setActive(active === item.id ? null : item.id);
  };

  const renderArt = (item: BoardItem) => {
    switch (item.id) {
      case "music":
        return <RecordPlayerArt spinning={musicPlaying} />;
      case "breakfast":
        return <BreakfastArt />;
      case "laptop":
        return <LaptopArt />;
      case "cozy":
        return <FifaArt kickKey={fifaKick} />;
      default:
        return null;
    }
  };

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
              const isActive = active === item.id;
              const isBg = item.id === "cozy";

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`about-sticker ${item.className}${
                    isActive ? " about-sticker--active" : ""
                  }${isBg ? " about-sticker--bg" : ""}${
                    item.id === "music" && musicPlaying ? " about-sticker--playing" : ""
                  }`}
                  style={
                    {
                      "--sticker-rotate": `${item.rotate}deg`,
                    } as React.CSSProperties
                  }
                  onClick={() => handleStickerClick(item)}
                  aria-pressed={isActive}
                  aria-label={
                    item.id === "music"
                      ? `${item.label}: ${item.caption}${musicPlaying ? " (playing)" : " (tap to play)"}`
                      : `${item.label}: ${item.caption}`
                  }
                >
                  {renderArt(item)}
                  <p className="about-sticker-caption">{item.caption}</p>
                  <span className="about-sticker-tag">
                    {item.id === "music" && musicPlaying ? "now playing ♪" : item.label}
                  </span>
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
                {activeItem.id === "music" &&
                  (musicPlaying
                    ? "Drop Dead — spinning on repeat until Figma opens."
                    : "Tap the record player to play Drop Dead.")}
                {activeItem.id === "breakfast" && "Eggs, avo toast, smoothie. Always."}
                {activeItem.id === "laptop" && "The three tabs that start every morning."}
                {activeItem.id === "cozy" &&
                  "Blanket and FIFA in the background — tap to kick the ball."}
              </p>

              {activeItem.id === "music" && musicPlaying && (
                <div className="about-day-spotify">
                  <iframe
                    ref={spotifyRef}
                    title="Drop Dead by Olivia Rodrigo on Spotify"
                    src={`${DROP_DEAD_SPOTIFY}&autoplay=1`}
                    width="100%"
                    height="80"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="about-day-spotify-embed"
                  />
                </div>
              )}
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
