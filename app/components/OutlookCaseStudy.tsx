"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollGradientLines from "./ScrollGradientLines";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { OUTLOOK_DEMO_BASE } from "@/lib/outlook-demo/paths";

const SECTIONS = [
  { id: "overview", label: "Overview", num: "01" },
  { id: "problem", label: "Problem", num: "02" },
  { id: "research", label: "Research", num: "03" },
  { id: "design", label: "Design", num: "04" },
  { id: "prototype", label: "Prototype", num: "05" },
  { id: "next", label: "Next steps", num: "06" },
] as const;

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function OutlookCaseStudy() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".outlook-hero-banner");
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      setNavSolid(heroBottom <= 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progressIndex = SECTIONS.findIndex((s) => s.id === active) + 1;

  return (
    <div className="home home--elegant case-study-page case-study-page--outlook">
      <ScrollGradientLines theme="outlook" />

      <div className="outlook-case">
        <header className="outlook-hero-banner">
          <div
            className={`outlook-sticky-nav${navSolid ? " outlook-sticky-nav-solid" : ""}`}
          >
            <SiteHeader active="work" variant="elegant" />
          </div>

          <div className="outlook-hero-content">
            <p className="outlook-hero-badge">Redesign</p>
            <h1 className="outlook-hero-title">Microsoft Outlook</h1>

            <div className="outlook-hero-prototype">
              <iframe
                title="Microsoft Outlook redesign — interactive prototype"
                src={`${OUTLOOK_DEMO_BASE}?embed=1`}
                className="outlook-hero-prototype-frame"
                loading="eager"
              />
            </div>
            <p className="outlook-hero-prototype-hint">
              Interactive — watch the intro, then explore inbox, compose, and saved contacts.
            </p>
          </div>
        </header>

        <div className="outlook-case-body">
          <div className="outlook-meta">
            <div className="outlook-meta-item">
              <span className="outlook-meta-label">Role</span>
              <span className="outlook-meta-value">Product Designer</span>
            </div>
            <div className="outlook-meta-item">
              <span className="outlook-meta-label">Timeline</span>
              <span className="outlook-meta-value">Concept · 2026</span>
            </div>
            <div className="outlook-meta-item">
              <span className="outlook-meta-label">Status</span>
              <span className="outlook-meta-value">Case study in progress</span>
            </div>
          </div>

          <div className="outlook-intro-box">
            <p>
              A personal Outlook concept built around everyday uni life — a calmer inbox,
              pull-down saved contacts, minimized compose, and Copilot when you actually
              need it. The prototype above runs the full intro → inbox flow; the write-up
              below is coming soon.
            </p>
          </div>
        </div>

        <div className="outlook-study-layout">
          <aside className="outlook-progress" aria-label="Case study sections">
            <nav className="outlook-progress-nav">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={`outlook-progress-link${
                    active === section.id ? " outlook-progress-link-active" : ""
                  }`}
                  onClick={() => scrollToSection(section.id)}
                  aria-current={active === section.id ? "true" : undefined}
                >
                  <span className="outlook-progress-num">{section.num}</span>
                  <span className="outlook-progress-label">{section.label}</span>
                </button>
              ))}
            </nav>
            <div className="outlook-progress-track" aria-hidden="true">
              <div
                className="outlook-progress-fill"
                style={{ height: `${(progressIndex / SECTIONS.length) * 100}%` }}
              />
            </div>
          </aside>

          <main className="outlook-sections">
            <section id="overview" className="outlook-section">
              <p className="outlook-section-eyebrow">01 — Overview</p>
              <h2 className="outlook-section-title">A new look to Outlook</h2>
              <p className="outlook-section-text">
                This concept reimagines Outlook for personal, everyday use — less enterprise
                chrome, more focus on the threads and people that matter. The goal is a mail
                rhythm that feels lighter: scan, reply, file away, move on.
              </p>
              <div className="outlook-coming-soon-card">
                <p className="outlook-coming-soon-label">Case study</p>
                <p className="outlook-coming-soon-text">
                  Full narrative, research, and flows are still being written. Check back
                  soon — or play with the prototype above in the meantime.
                </p>
              </div>
            </section>

            <section id="problem" className="outlook-section">
              <p className="outlook-section-eyebrow">02 — Problem</p>
              <h2 className="outlook-section-title">Why rethink the inbox?</h2>
              <p className="outlook-section-text outlook-section-text--muted">
                Section in progress — problem framing and HMW questions coming soon.
              </p>
            </section>

            <section id="research" className="outlook-section">
              <p className="outlook-section-eyebrow">03 — Research</p>
              <h2 className="outlook-section-title">Understanding daily mail habits</h2>
              <p className="outlook-section-text outlook-section-text--muted">
                Section in progress — insights and personas coming soon.
              </p>
            </section>

            <section id="design" className="outlook-section">
              <p className="outlook-section-eyebrow">04 — Design</p>
              <h2 className="outlook-section-title">Layout, color, and interaction</h2>
              <p className="outlook-section-text outlook-section-text--muted">
                Section in progress — visual system and key decisions coming soon.
              </p>
            </section>

            <section id="prototype" className="outlook-section">
              <p className="outlook-section-eyebrow">05 — Prototype</p>
              <h2 className="outlook-section-title">Try it yourself</h2>
              <p className="outlook-section-text">
                The hero prototype includes the animated intro, three-column inbox, saved
                contacts drawer, Gmail-style compose, and Copilot-assisted replies — all
                with fictional demo data.
              </p>
              <Link href={OUTLOOK_DEMO_BASE} className="outlook-section-link">
                Open full-screen prototype →
              </Link>
            </section>

            <section id="next" className="outlook-section outlook-section-last">
              <p className="outlook-section-eyebrow">06 — Next steps</p>
              <h2 className="outlook-section-title">What&apos;s ahead</h2>
              <p className="outlook-section-text outlook-section-text--muted">
                Calendar flows, mobile exploration, and the full case study write-up are
                on the roadmap.
              </p>
              <Link href="/#work" className="outlook-back-link">
                ← back to work
              </Link>
            </section>
          </main>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
