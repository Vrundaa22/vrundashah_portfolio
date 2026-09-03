"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import type { PortfolioUpdate } from "@/lib/portfolio-updates";

const DISMISS_PREFIX = "portfolio-whisper-dismissed:";

type PortfolioWhisperProps = {
  update: PortfolioUpdate;
  /** "hero" sits between hero and work; "project" floats on a case-study row */
  variant?: "hero" | "project";
  className?: string;
};

export default function PortfolioWhisper({
  update,
  variant = "hero",
  className = "",
}: PortfolioWhisperProps) {
  const [visible, setVisible] = useState(false);
  const storageKey = `${DISMISS_PREFIX}${update.id}`;

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === "1") return;
    } catch {
      /* private browsing */
    }
    setVisible(true);
  }, [storageKey]);

  const dismiss = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  const content = (
    <>
      <span className="portfolio-whisper-text">{update.message}</span>
      <span className="portfolio-whisper-arrow" aria-hidden="true">
        →
      </span>
    </>
  );

  return (
    <div
      className={`portfolio-whisper portfolio-whisper--${variant}${className ? ` ${className}` : ""}`}
      role="note"
    >
      {variant === "hero" ? (
        <Link href={update.href} className="portfolio-whisper-link">
          {content}
        </Link>
      ) : (
        <span className="portfolio-whisper-link">{content}</span>
      )}
      <button
        type="button"
        className="portfolio-whisper-dismiss"
        onClick={dismiss}
        aria-label="Dismiss update"
      >
        ×
      </button>
    </div>
  );
}

export function PortfolioFreshTag() {
  return <span className="portfolio-fresh-tag">Just updated</span>;
}
