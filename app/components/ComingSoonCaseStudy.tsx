"use client";

import Link from "next/link";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type ComingSoonCaseStudyProps = {
  title: string;
  tag?: string;
  accent?: "outlook" | "default";
  blurb?: string;
};

export default function ComingSoonCaseStudy({
  title,
  tag = "case study",
  accent = "default",
  blurb = "I'm still putting the finishing touches on this one — documenting the process, polishing screens, and writing it all up. Check back soon!",
}: ComingSoonCaseStudyProps) {
  return (
    <div className={`coming-soon-case coming-soon-case--${accent}`}>
      <header className="coming-soon-hero">
        <div className="coming-soon-nav">
          <SiteHeader active="work" />
        </div>

        <div className="coming-soon-content">
          <p className="coming-soon-tag">{tag}</p>
          <h1 className="coming-soon-title">{title}</h1>

          <div className="coming-soon-card">
            <p className="coming-soon-status">
              <span className="coming-soon-pulse" aria-hidden="true" />
              in progress
            </p>
            <p className="coming-soon-headline">case study coming soon...</p>
            <p className="coming-soon-blurb">{blurb}</p>
            <Link href="/#work" className="coming-soon-back">
              ← back to work
            </Link>
          </div>
        </div>
      </header>

      <SiteFooter />
    </div>
  );
}
