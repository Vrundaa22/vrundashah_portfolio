"use client";

import { useEffect, useRef, useState } from "react";

type PhotoSlide = {
  id: string;
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
  scale?: number;
  vibe?: string;
};

const SLIDES: PhotoSlide[] = [
  {
    id: "me",
    src: "/about/vrunda.jpg",
    alt: "Vrunda waving in a red top at a sunny Toronto park",
    label: "hi, it's me",
    objectPosition: "50% 54%",
    scale: 1.0,
    vibe: "that's me :)",
  },
  {
    id: "headshot",
    src: "/about/headshot.png",
    alt: "Vrunda smiling in a white top, professional headshot",
    label: "headshot",
    objectPosition: "50% 22%",
    vibe: "hire me pls",
  },
  {
    id: "central-park",
    src: "/about/central-park.png",
    alt: "Vrunda standing on rocks in Central Park with the NYC skyline behind her",
    label: "central park, nyc",
    objectPosition: "50% 38%",
    vibe: "nyc girl era",
  },
  {
    id: "lakeside",
    src: "/about/lakeside.jpg",
    alt: "Vrunda by the water on a rocky lakeshore",
    label: "by the water",
    objectPosition: "42% 45%",
    scale: 1.08,
    vibe: "touch grass",
  },
  {
    id: "sunset",
    src: "/about/sunset.png",
    alt: "Vrunda walking on the beach at sunset",
    label: "sunset person",
    objectPosition: "center 20%",
    vibe: "golden hour",
  },
  {
    id: "hockey",
    src: "/about/hockey.png",
    alt: "Playing ball hockey on an outdoor rink",
    label: "playing hockey",
    objectPosition: "center 35%",
    vibe: "puck life",
  },
  {
    id: "paint",
    src: "/about/paint-nights.png",
    alt: "Paint night at a studio with sunset canvases",
    label: "paint nights",
    objectPosition: "center center",
    vibe: "canvas girl",
  },
  {
    id: "ramen",
    src: "/about/ramen.png",
    alt: "Bowls of ramen on a wooden table",
    label: "ramen nights",
    objectPosition: "center center",
    vibe: "munch o'clock",
  },
];

const FLOAT_STICKERS = [
  { id: "sparkle", text: "✦", tone: "blush", style: { top: "4%", left: "-6%" } as const },
  { id: "toronto", text: "toronto", tone: "sky", style: { top: "18%", right: "-10%" } as const },
  { id: "figma", text: "on figma", tone: "lavender", style: { bottom: "28%", left: "-12%" } as const },
  { id: "hockey", text: "🏒", tone: "mint", style: { top: "52%", right: "-8%" } as const },
  { id: "heart", text: "♡", tone: "peach", style: { bottom: "12%", right: "-4%" } as const },
  { id: "paint", text: "🎨", tone: "lemon", style: { bottom: "4%", left: "8%" } as const },
];

export default function AboutCarousel() {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const activeSlide = SLIDES[active];

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
      <div className="about-carousel-stickers" aria-hidden="true">
        {FLOAT_STICKERS.map((sticker, index) => (
          <span
            key={sticker.id}
            className={`about-float-sticker about-float-sticker--${sticker.tone}`}
            style={{
              ...sticker.style,
              animationDelay: `${index * 0.45}s`,
            }}
          >
            {sticker.text}
          </span>
        ))}
      </div>

      <p className="about-carousel-vibe" key={activeSlide.id}>
        {activeSlide.vibe}
      </p>

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
