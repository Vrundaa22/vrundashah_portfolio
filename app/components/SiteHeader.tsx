"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

type SiteHeaderProps = {
  active?: "work" | "about";
};

const FLOAT_THRESHOLD = 80;

export default function SiteHeader({ active }: SiteHeaderProps) {
  const { dark, toggle, ready } = useTheme();
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setFloating(window.scrollY > FLOAT_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="home-topbar">
      <Link href="/#home" className="home-brand">
        vrunda shah
      </Link>

      <div className="nav-pill-wrap">
        <nav
          className={`nav-pill${floating ? " nav-pill--floating" : ""}`}
          aria-label="Main"
        >
          <Link href="/#home" className={active === "work" ? "nav-active" : undefined}>
            Work
          </Link>
          <Link href="/about" className={active === "about" ? "nav-active" : undefined}>
            About
          </Link>
          <a
            href="https://drive.google.com/file/d/16vkGJUA0phzR8ltzjVlyBwKRZO7K3AA8/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/vrunda22/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </nav>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggle}
        aria-label={dark ? "Light mode" : "Dark mode"}
        suppressHydrationWarning
      >
        {ready ? (dark ? "☀" : "☾") : "☾"}
      </button>
    </header>
  );
}
