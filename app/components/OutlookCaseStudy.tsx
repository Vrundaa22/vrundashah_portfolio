"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollGradientLines from "./ScrollGradientLines";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { OUTLOOK_DEMO_BASE, OUTLOOK_MAIL } from "@/lib/outlook-demo/paths";

const HIGHLIGHTS = [
  "Animated intro that unfolds into a focused inbox for everyday uni life",
  "Pull-down saved contacts, Gmail-style compose, and Copilot-assisted replies",
  "Warm white + cream selection states with a calmer three-column mail layout",
];

export default function OutlookCaseStudy() {
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

  return (
    <div className="home home--elegant case-study-page case-study-page--outlook">
      <ScrollGradientLines theme="outlook" />

      <div className="outlook-case">
        <header className="outlook-hero-banner">
          <div className={`outlook-sticky-nav${navSolid ? " outlook-sticky-nav-solid" : ""}`}>
            <SiteHeader active="work" variant="elegant" />
          </div>

          <div className="outlook-hero-grid">
            <div className="outlook-hero-main">
              <p className="outlook-hero-badge">UX concept · personal Outlook</p>
              <h1 className="outlook-hero-name">A New Look to Outlook</h1>
              <p className="outlook-hero-lead">
                A chic redesign concept for everyday mail — focused inbox, saved contacts,
                minimized compose, and Copilot when you need it.
              </p>
            </div>

            <aside className="outlook-hero-aside" aria-label="Project status">
              <div className="outlook-status-card">
                <p className="outlook-status-label">
                  <span className="outlook-status-pulse" aria-hidden="true" />
                  Still in the works
                </p>
                <p className="outlook-status-headline">Case study coming soon</p>
                <p className="outlook-status-copy">
                  The full write-up is being polished — research, flows, and narrative are
                  on the way. Try the interactive prototype below to see how it looks and
                  behaves today.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <div className="outlook-case-body">
          <section className="outlook-demo" aria-label="Outlook prototype preview">
            <div className="outlook-demo-inner">
              <div className="outlook-demo-head">
                <p className="outlook-demo-eyebrow">Prototype</p>
                <h2>See how it works</h2>
                <p>Inbox, compose minimize, saved contacts drawer, and Copilot replies.</p>
              </div>

              <div className="outlook-demo-frame-wrap">
                <iframe
                  title="A New Look to Outlook — prototype"
                  src={`${OUTLOOK_MAIL}`}
                  className="outlook-demo-frame"
                  loading="lazy"
                />
              </div>
              <div className="outlook-demo-links">
                <Link href={OUTLOOK_MAIL} className="outlook-demo-open">
                  Open inbox →
                </Link>
                <Link
                  href={OUTLOOK_DEMO_BASE}
                  className="outlook-demo-open outlook-demo-open--secondary"
                >
                  Watch intro animation →
                </Link>
              </div>

              <ul className="outlook-demo-highlights">
                {HIGHLIGHTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <Link href="/#work" className="outlook-back">
            ← back to work
          </Link>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
