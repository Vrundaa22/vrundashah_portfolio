"use client";

import { useEffect, useRef, useState } from "react";

type PhotoSlide = {
  id: string;
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
  scale?: number;
};

const SLIDES: PhotoSlide[] = [
  {
    id: "me",
    src: "/about/vrunda.jpg",
    alt: "Vrunda smiling in a red top and jeans at a sunny Toronto park",
    label: "hi, it's me",
    objectPosition: "48% 54%",
    scale: 1.04,
  },
  {
    id: "sunset",
    src: "/about/sunset.png",
    alt: "Vrunda walking on the beach at sunset",
    label: "sunset person",
    objectPosition: "center 20%",
  },
  {
    id: "hockey",
    src: "/about/hockey.png",
    alt: "Playing ball hockey on an outdoor rink",
    label: "playing hockey",
    objectPosition: "center 35%",
  },
  {
    id: "paint",
    src: "/about/paint-nights.png",
    alt: "Paint night at a studio with sunset canvases",
    label: "paint nights",
    objectPosition: "center center",
  },
  {
    id: "ramen",
    src: "/about/ramen.png",
    alt: "Bowls of ramen on a wooden table",
    label: "ramen nights",
    objectPosition: "center center",
  },
];

function StickerRamen() {
  return (
    <svg className="carousel-sticker carousel-sticker-ramen" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <ellipse cx="24" cy="28" rx="16" ry="10" stroke="currentColor" strokeWidth="2" />
      <path d="M10 28C10 28 14 18 24 18C34 18 38 28 38 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 24H20M26 22H30M22 30H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 14L34 10M34 14L30 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function StickerSunset() {
  return (
    <svg className="carousel-sticker carousel-sticker-sunset" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 32C14 26 34 26 40 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 10V16M12 14L16 18M36 14L32 18M8 24H14M34 24H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="22" r="6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function StickerHeart() {
  return (
    <svg className="carousel-sticker carousel-sticker-heart" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 38C24 38 8 26 8 16C8 11 12 7 17 7C20 7 23 9 24 12C25 9 28 7 31 7C36 7 40 11 40 16C40 26 24 38 24 38Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StickerSmiley() {
  return (
    <svg className="carousel-sticker carousel-sticker-smiley" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="17" cy="20" r="2" fill="currentColor" />
      <circle cx="31" cy="20" r="2" fill="currentColor" />
      <path d="M16 30C18 34 30 34 32 30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function StickerSparkle() {
  return (
    <svg className="carousel-sticker carousel-sticker-sparkle" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4V10M24 38V44M4 24H10M38 24H44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 10L14 14M34 34L38 38M38 10L34 14M14 34L10 38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutCarousel() {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const pickSlide = (index: number) => {
    pausedRef.current = true;
    setActive(index);
    window.setTimeout(() => {
      pausedRef.current = false;
    }, 8000);
  };

  return (
    <div className="about-carousel-wrap">
      <StickerSparkle />
      <StickerHeart />
      <StickerRamen />
      <StickerSunset />
      <StickerSmiley />

      <div className="about-carousel">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`carousel-slide${i === active ? " carousel-slide-active" : ""}`}
            aria-hidden={i !== active}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="carousel-slide-img"
              style={{
                objectPosition: slide.objectPosition ?? "center center",
                transform: slide.scale ? `scale(${slide.scale})` : undefined,
                transformOrigin: slide.scale
                  ? slide.objectPosition ?? "center center"
                  : undefined,
              }}
              draggable={false}
            />
            <p className="carousel-slide-label">{slide.label}</p>
          </div>
        ))}

        <div className="carousel-dots" role="tablist" aria-label="Photo carousel">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}: ${slide.label}`}
              className={`carousel-dot${i === active ? " carousel-dot-active" : ""}`}
              onClick={() => pickSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
