"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PdfDeckViewer from "./PdfDeckViewer";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const PDF_SRC = "/projects/content-design/content-design-samples.pdf";

const SAMPLES = [
  {
    id: "onboarding",
    title: "AI Product Onboarding Guide",
    page: 1,
    blurb: "Guiding new users through an AI product with clear, contextual onboarding copy.",
  },
  {
    id: "faq",
    title: "Product Help & FAQ",
    page: 2,
    blurb: "Structured help content that answers questions before users need to ask.",
  },
  {
    id: "financial",
    title: "Complex Financial Problem",
    page: 3,
    blurb: "Breaking down a dense financial scenario into scannable, trustworthy language.",
  },
] as const;

export default function ContentDesignCaseStudy() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(4);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".cd-hero-banner");
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      setNavSolid(heroBottom <= 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpToSample = (page: number) => {
    setPageIndex(page);
    document.getElementById("cd-deck")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="cd-case">
      <header className="cd-hero-banner">
        <div className={`cd-sticky-nav${navSolid ? " cd-sticky-nav-solid" : ""}`}>
          <SiteHeader active="work" />
        </div>

        <div className="cd-hero-content">
          <p className="cd-hero-badge">Content Design</p>
          <h1 className="cd-hero-name">Content Design</h1>
          <p className="cd-hero-lead">
            Writing samples across onboarding, help content, and complex product scenarios.
          </p>
        </div>
      </header>

      <div className="cd-case-body">
        <section className="cd-samples" aria-label="Content design samples">
          <p className="cd-section-eyebrow">samples</p>
          <h2 className="cd-section-title">Three types of content work</h2>

          <div className="cd-sample-list">
            {SAMPLES.map((sample, index) => (
              <button
                key={sample.id}
                type="button"
                className={`cd-sample-card${pageIndex === sample.page ? " cd-sample-card--active" : ""}`}
                onClick={() => jumpToSample(sample.page)}
              >
                <span className="cd-sample-num">0{index + 1}</span>
                <span className="cd-sample-copy">
                  <span className="cd-sample-title">{sample.title}</span>
                  <span className="cd-sample-blurb">{sample.blurb}</span>
                </span>
                <span className="cd-sample-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="cd-deck-section" id="cd-deck" aria-label="PDF deck">
          <div className="cd-deck-header">
            <p className="cd-section-eyebrow">deck</p>
            <h2 className="cd-section-title">Swipe through the samples</h2>
            <p className="cd-deck-hint">Use arrows or swipe left / right</p>
          </div>

          <PdfDeckViewer
            src={PDF_SRC}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onPageCount={setPageCount}
          />

          <div className="cd-deck-meta">
            <p className="cd-deck-counter">
              Slide {pageIndex + 1} of {pageCount}
            </p>
            <div className="cd-deck-dots" role="tablist" aria-label="Deck slides">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === pageIndex}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`cd-deck-dot${i === pageIndex ? " cd-deck-dot--active" : ""}`}
                  onClick={() => setPageIndex(i)}
                />
              ))}
            </div>
            <a
              href={PDF_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="cd-deck-download"
            >
              Open full PDF ↗
            </a>
          </div>
        </section>

        <div className="cd-back-wrap">
          <Link href="/#work" className="cd-back-link">
            ← back to work
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
