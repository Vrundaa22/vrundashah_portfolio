"use client";

import { useEffect, useState } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const SECTIONS = [
  { id: "overview", label: "Overview", num: "01" },
  { id: "problem", label: "Problem", num: "02" },
  { id: "research", label: "Research", num: "03" },
  { id: "users", label: "Users", num: "04" },
  { id: "journey", label: "Journey", num: "05" },
  { id: "designs", label: "Designs", num: "06" },
  { id: "solution", label: "Solution", num: "07" },
] as const;

const JOURNEY_PHASES = [
  {
    title: "Dream to Decision",
    situation: "Carl decides on the dream of moving his house to Paradise Falls.",
    action: "Estimates costs for balloons, fuel, food, and travel.",
    app: "Helps define the goal and break it into sub-goals.",
  },
  {
    title: "Plan the Goal",
    situation: "Sets up a Paradise Falls goal in the app.",
    action: "Enters target amount, deadline, and frequency.",
    app: "Provides suggestions and a realistic timeline.",
  },
  {
    title: "Shape the Budget",
    situation: "App analyzes current finances — bills, groceries, and more.",
    action: "Reviews spending categories and adjusts allocations.",
    app: "Recommends budget adjustments to stay on track.",
  },
  {
    title: "Live the Journey",
    situation: "Day-to-day and month-to-month saving.",
    action: "Tracks spending vs. budget across goal cards.",
    app: "Shows progress bars, alerts, and milestone celebrations.",
  },
  {
    title: "Arrival & New Chapter",
    situation: "Goal reached 100%. Carl is ready to move his house.",
    action: "Reviews completed goals and sets new ones.",
    app: "Celebrates milestones and suggests next steps.",
  },
];

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

export default function SaveUpCaseStudy() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".saveup-hero-banner");
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      setNavSolid(heroBottom <= 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="saveup-case">
      <header className="saveup-hero-banner">
        <div
          className={`saveup-sticky-nav${navSolid ? " saveup-sticky-nav-solid" : ""}`}
        >
          <SiteHeader active="work" />
        </div>

        <div className="saveup-hero-content">
          <p className="saveup-hero-badge">Case Study</p>
          <h1 className="saveup-hero-name">RBC SaveUp</h1>
          <div className="saveup-hero-screens">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/saveup/screen-goals.png"
              alt="RBC SaveUp goals dashboard"
              className="saveup-screen saveup-screen-side saveup-screen-left"
              draggable={false}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/saveup/screen-insights.png"
              alt="RBC SaveUp AI insights dashboard"
              className="saveup-screen saveup-screen-center"
              draggable={false}
            />
          </div>
        </div>
      </header>

      <div className="saveup-case-body">
        <div className="saveup-meta">
          <div className="saveup-meta-item">
            <span className="saveup-meta-label">Role</span>
            <span className="saveup-meta-value">Product Designer</span>
          </div>
          <div className="saveup-meta-item">
            <span className="saveup-meta-label">Timeline</span>
            <span className="saveup-meta-value">4 hours</span>
          </div>
          <div className="saveup-meta-item">
            <span className="saveup-meta-label">Team</span>
            <span className="saveup-meta-value">6 members</span>
          </div>
        </div>

        <div className="saveup-intro-box">
          <p>
            Simple and secure AI-powered financial planning web app designed to
            help users track spending, create personalized budgets, and set
            meaningful goals — going beyond tracking to motivate real progress.
          </p>
        </div>
      </div>

      <div className="saveup-study-layout">
        <aside className="saveup-progress" aria-label="Case study sections">
          <nav className="saveup-progress-nav">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`saveup-progress-link${
                  active === section.id ? " saveup-progress-link-active" : ""
                }`}
                onClick={() => scrollToSection(section.id)}
                aria-current={active === section.id ? "true" : undefined}
              >
                <span className="saveup-progress-num">{section.num}</span>
                <span className="saveup-progress-label">{section.label}</span>
              </button>
            ))}
          </nav>
          <div className="saveup-progress-track" aria-hidden="true">
            <div
              className="saveup-progress-fill"
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

        <main className="saveup-sections">
          <section id="overview" className="saveup-section">
            <p className="saveup-section-eyebrow">01 — Overview</p>
            <h2 className="saveup-section-title">The what &amp; why</h2>
            <blockquote className="saveup-quote">
              How might we help users understand their financial habits while
              motivating them to achieve short- and long-term goals in a way
              that feels approachable, not overwhelming?
            </blockquote>
            <p className="saveup-section-text">
              Most budgeting tools focus on tracking — but they fail to address
              the psychological barriers that keep people stuck: lack of
              motivation, financial anxiety, and the feeling that saving is
              abstract and far away.
            </p>
            <p className="saveup-section-text">
              SaveUp takes a goal-first, psychology-driven approach — starting
              with what the user is actually saving for, then supporting them
              with AI-driven recommendations that feel personal, not robotic.
            </p>
          </section>

          <section id="problem" className="saveup-section">
            <p className="saveup-section-eyebrow">02 — Problem</p>
            <h2 className="saveup-section-title">Understanding our goal</h2>
            <div className="saveup-split">
              <div>
                <h3 className="saveup-subtitle">The problem</h3>
                <p className="saveup-section-text">
                  Existing financial tools treat money like a spreadsheet. Users
                  track transactions but never connect spending to the life
                  goals that actually matter to them.
                </p>
              </div>
              <div>
                <h3 className="saveup-subtitle">The goal</h3>
                <p className="saveup-section-text">
                  Create a financial planning tool that goes beyond tracking by
                  motivating users with personalized insights, clear goals, and
                  ongoing support.
                </p>
              </div>
            </div>
          </section>

          <section id="research" className="saveup-section">
            <p className="saveup-section-eyebrow">03 — Research</p>
            <h2 className="saveup-section-title">Understanding RBC&apos;s NOMI app</h2>
            <p className="saveup-section-text">
              NOMI is RBC&apos;s current AI assistant — but its experience is
              system-driven rather than goal-first, leaving room for more
              personalized, emotionally resonant financial planning.
            </p>
            <ul className="saveup-hmw-list">
              <li>
                How might we move beyond passive savings automation to actively
                guide users with personalized, goal-driven recommendations?
              </li>
              <li>
                How might we help users better understand why they spend the way
                they do by combining behavioral insights with real-time financial
                data?
              </li>
              <li>
                How might we keep users motivated over time by making saving
                feel rewarding, emotional, and connected to meaningful life
                goals — not just numbers?
              </li>
            </ul>
          </section>

          <section id="users" className="saveup-section">
            <p className="saveup-section-eyebrow">04 — Users</p>
            <h2 className="saveup-section-title">Meet Carl Fredricksen</h2>
            <p className="saveup-section-text">
              We wanted to think outside the box and ground our idea in something
              emotionally familiar — the story of <em>UP</em>. Carl became our
              anchor persona: someone with clear dreams, limited resources, and
              uncertainty about where to start.
            </p>
            <div className="saveup-persona">
              <div className="saveup-persona-card">
                <p className="saveup-persona-name">Carl Fredricksen</p>
                <p className="saveup-persona-role">78 · Retired Balloon Salesman</p>
              </div>
              <div>
                <p className="saveup-section-text">
                  Carl grew up believing he could reach his dreams with proper
                  planning, but life changes left him overwhelmed and lost. A
                  recently-retired widow, he wants clarity and a simple life —
                  not complexity.
                </p>
                <div className="saveup-tags">
                  <span>Scenario-focused</span>
                  <span>Smart Alerts</span>
                  <span>Context-Aware</span>
                </div>
              </div>
            </div>
            <div className="saveup-split saveup-split-tight">
              <div>
                <h3 className="saveup-subtitle">Goals</h3>
                <ul className="saveup-bullet-list">
                  <li>Fly house to Paradise Falls — $25k</li>
                  <li>Save his home</li>
                  <li>Simplify his financial life</li>
                </ul>
              </div>
              <div>
                <h3 className="saveup-subtitle">Pain points</h3>
                <ul className="saveup-bullet-list">
                  <li>Ellie&apos;s passing &amp; emotional spending</li>
                  <li>Difficulty managing unexpected expenses</li>
                  <li>Overwhelm during major life transitions</li>
                </ul>
              </div>
            </div>
            <div className="saveup-insight-cards">
              <div className="saveup-insight-card">
                <h3 className="saveup-subtitle">Financial overwhelm</h3>
                <p>
                  Carl&apos;s situation showed how sudden life changes disrupt
                  well-planned finances — pushing us to design for guidance, not
                  complexity.
                </p>
              </div>
              <div className="saveup-insight-card">
                <h3 className="saveup-subtitle">Emotional spending</h3>
                <p>
                  His attachment to memories revealed a need for support that
                  feels both practical and emotionally aware.
                </p>
              </div>
              <div className="saveup-insight-card">
                <h3 className="saveup-subtitle">Simplicity over complexity</h3>
                <p>
                  Carl doesn&apos;t want to optimize every dollar — he wants
                  peace, clarity, and a simple life without disruptions.
                </p>
              </div>
            </div>
          </section>

          <section id="journey" className="saveup-section">
            <p className="saveup-section-eyebrow">05 — Journey</p>
            <h2 className="saveup-section-title">Dream to decision</h2>
            <p className="saveup-section-text">
              Based on Carl&apos;s needs, we mapped a primary user flow to reduce
              cognitive load and guide users from onboarding to meaningful
              financial action with minimal friction.
            </p>
            <div className="saveup-journey-scroll">
              <div className="saveup-journey-track">
                {JOURNEY_PHASES.map((phase) => (
                  <article key={phase.title} className="saveup-journey-card">
                    <h3 className="saveup-journey-title">{phase.title}</h3>
                    <dl className="saveup-journey-dl">
                      <div>
                        <dt>Situation</dt>
                        <dd>{phase.situation}</dd>
                      </div>
                      <div>
                        <dt>Actions</dt>
                        <dd>{phase.action}</dd>
                      </div>
                      <div>
                        <dt>App role</dt>
                        <dd>{phase.app}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="designs" className="saveup-section">
            <p className="saveup-section-eyebrow">06 — Designs</p>
            <h2 className="saveup-section-title">Key screens</h2>
            <p className="saveup-section-text">
              The Set Goals view lets Carl break Paradise Falls into themed
              sub-goals — balloons, fuel, food — each with its own progress
              tracker. AI Insights surfaces spending trends against global
              benchmarks so he understands the &ldquo;why&rdquo; behind his
              habits.
            </p>
            <div className="saveup-design-stack">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/saveup/screen-goals.png"
                alt="RBC SaveUp set goals screen with Paradise Falls goal cards"
                draggable={false}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/saveup/screen-insights.png"
                alt="RBC SaveUp AI market intelligence insights screen"
                draggable={false}
              />
            </div>
          </section>

          <section id="solution" className="saveup-section saveup-section-last">
            <p className="saveup-section-eyebrow">07 — Solution</p>
            <h2 className="saveup-section-title">SaveUP for your next adventure</h2>
            <div className="saveup-story-banner">
              <p className="saveup-story-banner-title">
                Discover the Story of SaveUP → UP
              </p>
              <p className="saveup-story-banner-sub">SaveUP for your next adventure</p>
            </div>
            <p className="saveup-section-text">
              Just as Carl saves spare change toward a meaningful goal, SaveUp
              focuses on helping users move from vague intentions to purposeful
              and mindful saving :)
            </p>
            <p className="saveup-section-text">
              The result is a financial companion that meets people where they
              are — goal-first on day one, intelligent over time, and always
              connected to the life they&apos;re building toward.
            </p>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
