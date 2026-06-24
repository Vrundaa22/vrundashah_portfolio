"use client";

import { useEffect, useState } from "react";
import HomeView from "./components/HomeView";

const LETTERS = ["V", "R", "U", "N", "D", "A"];

const PROMPTS = [
  "Always need my yogurt bowl before I start anything 🥣",
  "Currently have 47 tabs open. Probably 48 by now.",
  "Big heart for ramen 🍜, bigger heart for good UX.",
  "Turning everyday problems into fun experiences.",
  "I'm always ready to have a little hockey match 🏒 ",
  "Avocado toast is a personality trait at this point 🥑",
  "Sketching ideas on paper before they ever hit Figma ✏️",
  "Building interfaces that feel invisible to the user.",
  "Will dance through a problem before I wireframe it 💃",
  "Designing with empathy, every screen tells a story.",
  "My browser has more tabs than my sketchbook has pages.",
  "Finding elegance in the details that make software feel human.",
  "Powered by smoothies, curiosity, and a nice cozy nap 😴",
  "Making thoughtful products people actually enjoy using.",
  "If it's not fun to use, I'm not done yet.",
];

const INTRO_BEFORE_EXIT_MS = 2800;
const INTRO_EXIT_MS = 450;

export default function Home() {
  const [prompt] = useState(
    () => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]
  );
  const [showPrompt, setShowPrompt] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [wipeToHome, setWipeToHome] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [drawDone, setDrawDone] = useState(false);

  useEffect(() => {
    const goToHome = () => {
      const hash = window.location.hash;
      if (hash === "#home" || hash === "#work") {
        setShowHome(true);
        setShowPrompt(false);
        setExiting(false);
        setWipeToHome(false);
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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#home" || hash === "#work") return;

    let promptTimer: ReturnType<typeof setTimeout>;

    const introTimer = setTimeout(() => {
      setExiting(true);
      promptTimer = setTimeout(() => setShowPrompt(true), INTRO_EXIT_MS);
    }, INTRO_BEFORE_EXIT_MS);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(promptTimer);
    };
  }, []);

  useEffect(() => {
    if (!showPrompt) {
      setDrawDone(false);
      return;
    }

    setTypedText("");
    setTypingDone(false);
    setDrawDone(false);
    setWipeToHome(false);
  }, [showPrompt]);

  useEffect(() => {
    if (!drawDone) return;

    let i = 0;
    const intervalId = setInterval(() => {
      i += 1;
      setTypedText(prompt.slice(0, i));
      if (i >= prompt.length) {
        clearInterval(intervalId);
        setTypingDone(true);
      }
    }, 42);

    return () => clearInterval(intervalId);
  }, [drawDone, prompt]);

  useEffect(() => {
    if (!typingDone) return;

    const wipeId = setTimeout(() => {
      setShowHome(true);
      setWipeToHome(true);
    }, 1100);

    return () => clearTimeout(wipeId);
  }, [typingDone]);

  const handleWipeComplete = () => {
    setShowPrompt(false);
    setWipeToHome(false);
  };

  return (
    <main className={`app${showHome ? " app-home" : ""}`}>
      {showHome && <HomeView />}

      {!showPrompt && !showHome && (
        <div className={`intro-screen${exiting ? " intro-exit" : ""}`}>
          <div className="intro-inner">
            <div className="letters" aria-label="VRUNDA">
              {LETTERS.map((letter) => (
                <span key={letter} className="letter">
                  {letter}
                </span>
              ))}
            </div>

            <p className="intro-role">product designer</p>
          </div>
        </div>
      )}

      {showPrompt && (
        <section
          className={`prompt-screen${wipeToHome ? " prompt-screen-wipe" : ""}`}
          aria-live="polite"
          onAnimationEnd={(e) => {
            if (e.animationName === "promptWipeAway") handleWipeComplete();
          }}
        >
          {wipeToHome && (
            <div className="prompt-wipe-wand" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M4 24L22 6"
                  stroke="#c25e64"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M22 6L24.5 3.5L26 8L21.5 6.5L22 6Z"
                  fill="#ffd978"
                  stroke="#e8a840"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          <div className="prompt-draw">
            <div
              className="prompt-box"
              onAnimationEnd={(e) => {
                if (e.animationName === "drawBox") setDrawDone(true);
              }}
            >
              <p className={`prompt-text${drawDone ? " prompt-text-visible" : ""}`}>
                {typedText}
                {drawDone && !typingDone && (
                  <span className="type-caret" aria-hidden="true" />
                )}
              </p>

              <div className="figma-handle" aria-hidden="true">
                <svg
                  className="cursor-arrow"
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L1 18.5L5.5 14.5L9 21L11.5 19.5L8 13.5H16L1 1Z"
                    fill="white"
                    stroke="#1a1a1a"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="name-tag">vrunda</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
