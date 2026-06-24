"use client";

import { useEffect, useState } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const SECTIONS = [
  { id: "overview", label: "Overview", num: "01" },
  { id: "problem", label: "Problem", num: "02" },
  { id: "research", label: "Research", num: "03" },
  { id: "users", label: "Users", num: "04" },
  { id: "iteration", label: "Iteration", num: "05" },
  { id: "designs", label: "Designs", num: "06" },
  { id: "solution", label: "Solution", num: "07" },
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

export default function ReleafCaseStudy() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".releaf-hero-banner");
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      setNavSolid(heroBottom <= 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="releaf-case">
      <header className="releaf-hero-banner">
        <div
          className={`releaf-sticky-nav${navSolid ? " releaf-sticky-nav-solid" : ""}`}
        >
          <SiteHeader active="work" />
        </div>

        <div className="releaf-hero-content">
          <h1 className="releaf-hero-name">Releaf</h1>
          <div className="releaf-hero-screens">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/releaf/screen-onboarding.png"
            alt="Releaf onboarding screen"
            className="releaf-screen releaf-screen-side releaf-screen-left"
            draggable={false}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/releaf/screen-dashboard.png"
            alt="Releaf dashboard screen"
            className="releaf-screen releaf-screen-center"
            draggable={false}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/releaf/screen-flare.png"
            alt="Releaf flare mode screen"
            className="releaf-screen releaf-screen-side releaf-screen-right"
            draggable={false}
          />
          </div>
        </div>
      </header>

      <div className="releaf-case-body">
        <div className="releaf-meta">
          <div className="releaf-meta-item">
            <span className="releaf-meta-label">Role</span>
            <span className="releaf-meta-value">Product Designer</span>
          </div>
          <div className="releaf-meta-item">
            <span className="releaf-meta-label">Timeline</span>
            <span className="releaf-meta-value">Nov 2025 – Present</span>
          </div>
          <div className="releaf-meta-item">
            <span className="releaf-meta-label">Team</span>
            <span className="releaf-meta-value">Solo Project</span>
          </div>
        </div>

        <div className="releaf-intro-box">
          <p>
            Releaf is an AI-driven health companion for people living with
            Inflammatory Bowel Disease. Instead of cold clinical forms, it turns
            daily tracking into a gentle conversation — so patients can spot
            patterns, feel in control, and get relief without the mental load.
          </p>
        </div>
      </div>

      <div className="releaf-study-layout">
        <aside className="releaf-progress" aria-label="Case study sections">
          <nav className="releaf-progress-nav">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`releaf-progress-link${
                  active === section.id ? " releaf-progress-link-active" : ""
                }`}
                onClick={() => scrollToSection(section.id)}
                aria-current={active === section.id ? "true" : undefined}
              >
                <span className="releaf-progress-num">{section.num}</span>
                <span className="releaf-progress-label">{section.label}</span>
              </button>
            ))}
          </nav>
          <div className="releaf-progress-track" aria-hidden="true">
            <div
              className="releaf-progress-fill"
              style={
                {
                  height: `${
                    ((SECTIONS.findIndex((s) => s.id === active) + 1) /
                      SECTIONS.length) *
                    100
                  }%`,
                  "--progress": `${
                    ((SECTIONS.findIndex((s) => s.id === active) + 1) /
                      SECTIONS.length) *
                    100
                  }%`,
                } as React.CSSProperties
              }
            />
          </div>
        </aside>

        <main className="releaf-sections">
          <section id="overview" className="releaf-section">
            <p className="releaf-section-eyebrow">01 — Overview</p>
            <h2 className="releaf-section-title">The what &amp; why</h2>
            <p className="releaf-section-text">
              IBD patients juggle symptoms, food, stress, and meds — often across
              fragmented apps that feel like homework. Releaf brings it together
              in one calm space: log how you feel, talk to an AI companion, and
              slowly uncover what&apos;s triggering flares.
            </p>
            <p className="releaf-section-text">
              This case study walks through how I went from understanding the
              problem to designing flows that feel supportive, not clinical.
            </p>
          </section>

          <section id="problem" className="releaf-section">
            <p className="releaf-section-eyebrow">02 — Problem</p>
            <h2 className="releaf-section-title">Understanding our goal</h2>
            <div className="releaf-split">
              <div>
                <h3 className="releaf-subtitle">The problem</h3>
                <p className="releaf-section-text">
                  Managing IBD means paying attention to dozens of small signals
                  every day. Most tools treat tracking like data entry — which
                  burns people out and leads to incomplete logs.
                </p>
              </div>
              <div>
                <h3 className="releaf-subtitle">The goal</h3>
                <p className="releaf-section-text">
                  Design an experience that feels like checking in with someone
                  who understands — turning scattered notes into meaningful,
                  actionable insight over time.
                </p>
              </div>
            </div>
            <blockquote className="releaf-quote">
              How might we make health tracking feel human, not like filling out
              medical forms?
            </blockquote>
          </section>

          <section id="research" className="releaf-section">
            <p className="releaf-section-eyebrow">03 — Research</p>
            <h2 className="releaf-section-title">What patients actually said</h2>
            <p className="releaf-section-text">
              I interviewed IBD patients and reviewed existing health apps to
              understand where current tools fall short — too many taps, guilt
              when you skip a day, and zero emotional support.
            </p>
            <ul className="releaf-stat-cards">
              <li>
                <strong>72%</strong>
                <span>stop tracking within 2 weeks</span>
              </li>
              <li>
                <strong>3+</strong>
                <span>apps used on average</span>
              </li>
              <li>
                <strong>#1 ask</strong>
                <span>&ldquo;just tell me what&apos;s triggering this&rdquo;</span>
              </li>
            </ul>
          </section>

          <section id="users" className="releaf-section">
            <p className="releaf-section-eyebrow">04 — Users</p>
            <h2 className="releaf-section-title">Who I&apos;m designing for</h2>
            <div className="releaf-persona">
              <div className="releaf-persona-card">
                <p className="releaf-persona-name">Alisha, 24</p>
                <p className="releaf-persona-role">University student</p>
              </div>
              <div>
                <p className="releaf-section-text">
                  Recently diagnosed, overwhelmed by food lists and flare
                  unpredictability. Wants something quick between classes — not
                  another spreadsheet.
                </p>
                <div className="releaf-tags">
                  <span>needs simplicity</span>
                  <span>wants patterns</span>
                  <span>low energy days</span>
                </div>
              </div>
            </div>
          </section>

          <section id="iteration" className="releaf-section">
            <p className="releaf-section-eyebrow">05 — Iteration</p>
            <h2 className="releaf-section-title">Testing what felt right</h2>
            <p className="releaf-section-text">
              Early wireframes leaned too clinical. I iterated toward warmer
              copy, fewer required fields, and a conversational log flow —
              letting users type naturally instead of tapping through forms.
            </p>
            <p className="releaf-section-text">
              Flare Mode emerged from feedback: when symptoms spike, the UI
              strips back to only what matters — severity, key symptoms, and
              rest.
            </p>
          </section>

          <section id="designs" className="releaf-section">
            <p className="releaf-section-eyebrow">06 — Designs</p>
            <h2 className="releaf-section-title">Key screens</h2>
            <p className="releaf-section-text">
              The home dashboard gives an at-a-glance read on sleep, stress, and
              meds. Flare Mode simplifies everything when it&apos;s a bad day.
              Both share the same soft palette and rounded, approachable shapes.
            </p>
            <div className="releaf-design-grid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/releaf/screen-dashboard.png"
                alt="Releaf home dashboard screen"
                draggable={false}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/releaf/screen-flare.png"
                alt="Releaf flare mode screen"
                draggable={false}
              />
            </div>
          </section>

          <section id="solution" className="releaf-section releaf-section-last">
            <p className="releaf-section-eyebrow">07 — Solution</p>
            <h2 className="releaf-section-title">Where it landed</h2>
            <p className="releaf-section-text">
              Releaf combines gentle daily check-ins, AI-powered pattern
              detection, and a flare-aware interface — so tracking feels like
              self-care instead of admin work.
            </p>
            <p className="releaf-section-text">
              The result is a companion that meets people where they are: calm on
              good days, simplified when things get hard, and always focused on
              helping them feel a little more in control.
            </p>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
