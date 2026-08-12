"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const APPEAR_GAP_MS = 700;

const PHOTOS = [
  {
    id: "lakeside",
    src: "/about/lakeside.jpg",
    alt: "Vrunda by the water on a rocky lakeshore",
    objectPosition: "42% 45%",
    slot: "lakeside" as const,
  },
  {
    id: "sunset",
    src: "/about/sunset.png",
    alt: "Vrunda walking on the beach at sunset",
    objectPosition: "center 22%",
    slot: "sunset" as const,
  },
  {
    id: "vrunda-red",
    src: "/about/vrunda.jpg",
    alt: "Vrunda waving in a red top at a sunny Toronto park",
    objectPosition: "50% 54%",
    slot: "vrunda" as const,
  },
];

function SparkleBurst() {
  return (
    <span className="hero-clicks-sparkle" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className="hero-clicks-sparkle-star"
          style={{ "--star-i": i } as React.CSSProperties}
        />
      ))}
    </span>
  );
}

export default function HeroClicks() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timers = PHOTOS.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), 450 + index * APPEAR_GAP_MS)
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <div className="hero-clicks" aria-label="it's mee">
      <div className="hero-clicks-stack">
        {PHOTOS.map((photo, index) => {
          const isVisible = visibleCount > index;

          return (
            <figure
              key={photo.id}
              className={`hero-clicks-polaroid hero-clicks-polaroid--${photo.slot}${isVisible ? " hero-clicks-polaroid--in" : ""}`}
            >
              {isVisible && <SparkleBurst />}
              <div className="hero-clicks-photo">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 520px) 140px, 240px"
                  className="hero-clicks-img"
                  style={{ objectPosition: photo.objectPosition }}
                  draggable={false}
                  priority={photo.slot === "lakeside"}
                />
              </div>
            </figure>
          );
        })}
      </div>
      <p
        className={`hero-clicks-label${visibleCount >= PHOTOS.length ? " hero-clicks-label--in" : ""}`}
      >
        it&apos;s mee
      </p>
    </div>
  );
}
