"use client";

import { useEffect, useState } from "react";
import DissolveCanvas from "./DissolveCanvas";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useTheme } from "../hooks/useTheme";

const PROJECTS = [
  {
    id: "rbc-save-up",
    title: "RBC Save Up",
    tag: "internship",
    variant: "save-up" as const,
    description:
      "AI-powered financial planning web app that goes beyond tracking—helping users understand their spending, plan with intention, and turn everyday decisions into meaningful progress toward their goals.",
    visualGradient: "linear-gradient(145deg, #1a3a6e 0%, #003168 100%)",
    keywords: ["budgeting", "development", "data"],
    delay: "0.35s",
    href: "/saveup",
  },
  {
    id: "releaf",
    title: "Releaf",
    tag: "case study",
    variant: "releaf" as const,
    description:
      "IBD-focused digital health experience that helps users identify symptom patterns and triggers by turning fragmented daily data into meaningful, actionable insights.",
    image: "/projects/releaf-cover.png",
    href: "/releaf",
    keywords: ["product design", "health", "AI"],
    delay: "0.5s",
  },
  {
    id: "microsoft-outlook",
    title: "Microsoft Outlook",
    tag: "redesign",
    variant: "outlook" as const,
    description:
      "Enterprise email and calendar experience focused on clarity, connection, and helping teams stay organized across their day-to-day workflow.",
    visualGradient: "linear-gradient(145deg, #0078d4 0%, #005a9e 100%)",
    keywords: ["redesign", "ui/ux", "seamless"],
    delay: "0.65s",
    href: "/outlook",
  },
];

function getTorontoHour(): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Toronto",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
}

function getStatus(hour: number) {
  if (hour >= 22 || hour < 8) {
    return { text: "sleeping", emoji: "😴" };
  }
  return { text: "i'm up", emoji: "☀️" };
}

function useTorontoClock() {
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(() => getStatus(getTorontoHour()));

  useEffect(() => {
    const tick = () => {
      const hour = getTorontoHour();
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Toronto",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
      setStatus(getStatus(hour));
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return { time, status };
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
}

export default function HomeView() {
  const { time, status } = useTorontoClock();
  const scrollY = useScrollY();
  const { dark } = useTheme();
  const [hasSketched, setHasSketched] = useState(false);

  return (
    <div className={`home${dark ? " home-dark" : ""}`}>
      <div className="pastel-aurora" aria-hidden="true">
        <div
          className="pastel-blob pastel-blob-1"
          style={{
            transform: `translate(calc(-50% + ${scrollY * 0.035}px), ${scrollY * 0.1}px)`,
          }}
        />
        <div
          className="pastel-blob pastel-blob-2"
          style={{
            transform: `translate(${scrollY * -0.05}px, ${scrollY * -0.07}px)`,
          }}
        />
        <div
          className="pastel-blob pastel-blob-3"
          style={{
            transform: `translate(${scrollY * 0.04}px, ${scrollY * 0.06}px)`,
          }}
        />
      </div>

      <DissolveCanvas dark={dark} onDraw={() => setHasSketched(true)} />

      {!hasSketched && (
        <p className="sketch-hint" aria-hidden="true">
          sketch anywhere ✏️ — it fades away
        </p>
      )}

      <div className="home-layer">
        <SiteHeader active="work" />

        <section className="hero" id="home">
          <p className="hero-eyebrow">
            hiii, i&apos;m{" "}
            <span className="hero-name">Vrunda</span>
          </p>
          <h1 className="hero-headline">
            i love turning everyday problems into{" "}
            <em>fun, seamless</em> and <em>impactful</em> product experiences.
          </h1>

          <div className="live-status live-status-centered">
            <span className="live-status-label">status:</span>
            <span className="live-status-mood">
              {status.text} <span aria-hidden="true">{status.emoji}</span>
            </span>
            <span className="live-status-sep" aria-hidden="true">
              ·
            </span>
            <span className="live-status-time">{time || "—"}</span>
            <span className="live-status-sep" aria-hidden="true">
              ·
            </span>
            <span className="live-status-open">
              <span className="status-dot" aria-hidden="true" />
              open to product experiences
            </span>
          </div>
        </section>

        <section className="work-section" id="work" aria-label="Work">
          <div className="work-section-header">
            <p className="work-label">selected work</p>
            <div className="work-scroll-arrow" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 4V15M10 15L5.5 10.5M10 15L14.5 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="project-list">
            {PROJECTS.map((project) => (
              <a
                key={project.id}
                href={project.href}
                className={`project-row project-row--${project.variant}`}
                style={{ animationDelay: project.delay }}
              >
                <div className="project-row-copy">
                  <h2 className="project-row-title">{project.title}</h2>
                  <span className="project-row-tag">{project.tag}</span>
                  <p className="project-row-desc">{project.description}</p>
                </div>
                <div className="project-row-visual">
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image} alt="" draggable={false} />
                  ) : (
                    <div
                      className={`project-row-visual-fill project-row-visual-fill--${project.variant}`}
                      style={{ background: project.visualGradient }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="project-row-hover" aria-hidden="true">
                  <ul className="project-row-keywords">
                    {project.keywords.map((word) => (
                      <li key={word}>{word}</li>
                    ))}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  );
}
