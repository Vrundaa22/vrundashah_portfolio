"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import type { PortfolioUpdate } from "@/lib/portfolio-updates";

const DISMISS_PREFIX = "portfolio-whisper-dismissed:";

type PortfolioWhisperProps = {
  update: PortfolioUpdate;
};

export default function PortfolioWhisper({ update }: PortfolioWhisperProps) {
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

  return (
    <p className="hero-whisper" role="note">
      <span className="hero-whisper-text">
        {update.messageBefore}
        <Link href={update.href} className="hero-whisper-link">
          {update.highlight}
        </Link>
        {update.messageAfter ?? ""}
      </span>
      <button
        type="button"
        className="hero-whisper-dismiss"
        onClick={dismiss}
        aria-label="Dismiss update"
      >
        ×
      </button>
    </p>
  );
}
