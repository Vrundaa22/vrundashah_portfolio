"use client";

import { useEffect } from "react";

/** Keeps desktop layout when the prototype runs inside the portfolio iframe. */
export default function EmbedDetector() {
  useEffect(() => {
    const embedded =
      window.self !== window.top || window.location.search.includes("embed=1");
    if (embedded) {
      document.documentElement.classList.add("ol-embed");
    }
    return () => {
      document.documentElement.classList.remove("ol-embed");
    };
  }, []);

  return null;
}
