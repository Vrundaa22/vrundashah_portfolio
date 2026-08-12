"use client";

import { useCallback, useEffect, useState } from "react";
import HomeView from "./components/HomeView";
import IntroSplash from "./components/IntroSplash";
import ScrollGradientLines from "./components/ScrollGradientLines";

const INTRO_SEEN_KEY = "portfolio-intro-seen";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const introSeen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    const hash = window.location.hash;
    const hashSkip =
      hash === "#home" || hash === "#work";

    if (introSeen || hashSkip) {
      setShowIntro(false);
      setShowHome(true);
      if (hashSkip) {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      }
    }
    setBooted(true);
  }, []);

  const handleIntroLoadComplete = useCallback(() => {
    setShowHome(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    setShowIntro(false);
  }, []);

  useEffect(() => {
    const goToHome = () => {
      const hash = window.location.hash;
      if (hash === "#home" || hash === "#work") {
        setShowIntro(false);
        setShowHome(true);
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      }
    };

    goToHome();
    window.addEventListener("hashchange", goToHome);
    return () => window.removeEventListener("hashchange", goToHome);
  }, []);

  useEffect(() => {
    if (!showHome || !window.location.hash) return;
    const id = window.setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(id);
  }, [showHome]);

  if (!booted) {
    return <main className="app" />;
  }

  return (
    <main className={`app${showHome ? " app-home" : ""}`}>
      {showIntro && !showHome && <ScrollGradientLines />}
      {showHome && <HomeView />}
      {showIntro && (
        <IntroSplash
          onLoadComplete={handleIntroLoadComplete}
          onComplete={handleIntroComplete}
        />
      )}
    </main>
  );
}
