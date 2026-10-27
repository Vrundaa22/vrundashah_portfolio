"use client";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HeroClicks from "./HeroClicks";
import HeroScotiaRole from "./HeroScotiaRole";
import HeroTaglineTypewriter from "./HeroTaglineTypewriter";
import PortfolioWhisper from "./PortfolioWhisper";
import { getLatestPortfolioUpdate } from "@/lib/portfolio-updates";
import { useTheme } from "../hooks/useTheme";
import { useEffect, useState } from "react";

const PROJECTS = [
  {
    id: "rbc-save-up",
    title: "RBC Save Up",
    tags: ["financial", "AI", "web app"],
    variant: "save-up" as const,
    description:
      "AI-powered financial planning that goes beyond tracking—helping users understand spending, plan with intention, and turn everyday decisions into progress toward their goals.",
    visualGradient: "linear-gradient(145deg, #1a3a6e 0%, #003168 100%)",
    href: "/saveup",
  },
  {
    id: "content-design",
    title: "Content Design Samples",
    tags: ["ux samples"],
    variant: "content-design" as const,
    description:
      "UX writing across AI onboarding guides, product help, and complex financial scenarios—clear copy that helps users move forward with confidence.",
    image: "/projects/content-design/cover-preview.png",
    href: "/content-design",
  },
  {
    id: "releaf",
    title: "Releaf",
    tags: ["Personal project", "health", "comfort"],
    variant: "releaf" as const,
    description:
      "IBD-focused digital health experience that helps users identify symptom patterns and triggers by turning fragmented daily data into meaningful, actionable insights.",
    image: "/projects/releaf-cover.png",
    href: "/releaf",
  },
  {
    id: "microsoft-outlook",
    title: "Microsoft Outlook",
    tags: ["prototype", "redesign", "accessible"],
    variant: "outlook" as const,
    description:
      "A personal redesign concept — focused inbox, saved contacts, minimized compose, and Copilot when you need it. Interactive prototype on the case study page.",
    visualGradient: "linear-gradient(145deg, #7dd3e8 0%, #2a9daf 42%, #1a5080 100%)",
    href: "/outlook",
  },
];

function ProjectVisual({
  project,
  className,
}: {
  project: (typeof PROJECTS)[number];
  className?: string;
}) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt=""
        draggable={false}
        className={className}
      />
    );
  }

  return (
    <div
      className={`${className ?? ""} work-case-fill work-case-fill--${project.variant}`}
      style={{ background: project.visualGradient }}
      aria-hidden="true"
    />
  );
}

function useTorontoClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Toronto",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function HomeView() {
  const { dark } = useTheme();
  const time = useTorontoClock();
  const latestUpdate = getLatestPortfolioUpdate();

  return (
    <div className={`home home--elegant${dark ? " home-dark" : ""}`}>
      <div className="home-layer home-layer--elegant">
        <SiteHeader active="work" variant="elegant" />

        <section className="hero hero--mockup" id="home">
          <div className="hero-copy">
            {latestUpdate ? <PortfolioWhisper update={latestUpdate} /> : null}
            <p className="hero-eyebrow">
              <span aria-hidden="true">👋</span> HII, I&apos;M VRUNDA
            </p>
            <HeroTaglineTypewriter />
            <p className="hero-status">
              <time suppressHydrationWarning>{time || "—:—"}</time>
              <span className="hero-status-open">
                <span className="status-dot" aria-hidden="true" />
                open to product experiences
              </span>
            </p>
            <HeroScotiaRole />
          </div>

          <HeroClicks />
        </section>

        <section className="work-cases" id="work" aria-label="Work">
          {PROJECTS.map((project, index) => (
            <a
              key={project.id}
              href={project.href}
              className="work-case-row"
              style={{ animationDelay: `${0.12 + index * 0.08}s` }}
            >
              <div className="work-case-copy">
                <h2 className="work-case-title">{project.title}</h2>
                <ul className="work-case-tags" aria-label="Project tags">
                  {project.tags.map((tag) => (
                    <li key={tag} className={`work-case-tag work-case-tag--${project.variant}`}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="work-case-desc">{project.description}</p>
                <span className="work-case-cta">
                  View case study
                  <span aria-hidden="true">→</span>
                </span>
              </div>

              <div className={`work-case-visual work-case-visual--${project.variant}`}>
                <ProjectVisual
                  project={project}
                  className={`work-case-media work-case-media--${project.variant}`}
                />
              </div>
            </a>
          ))}
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
