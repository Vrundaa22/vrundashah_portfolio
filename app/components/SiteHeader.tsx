"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { useTheme } from "../hooks/useTheme";

type SiteHeaderProps = {
  active?: "work" | "about";
  variant?: "default" | "elegant";
};

const FLOAT_THRESHOLD = 80;
const INTRO_SEEN_KEY = "portfolio-intro-seen";

function ThemeIcon({ dark }: { dark: boolean }) {
  if (dark) {
    return (
      <svg
        className="theme-toggle-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }

  return (
    <svg
      className="theme-toggle-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function SiteHeader({
  active,
  variant = "default",
}: SiteHeaderProps) {
  const { dark, toggle, ready } = useTheme();
  const pathname = usePathname();
  const [floating, setFloating] = useState(false);
  const elegant = variant === "elegant";

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");

    if (pathname === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", "/#home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setFloating(window.scrollY > FLOAT_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (elegant) {
    return (
      <header className="home-topbar home-topbar--elegant">
        <Link
          href="/#home"
          onClick={handleBrandClick}
          className="home-brand home-brand--elegant"
        >
          vrunda shah
        </Link>

        <nav className="home-nav-elegant" aria-label="Main">
          <Link href="/#work" className={active === "work" ? "nav-active" : undefined}>
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
        </nav>

        <button
          type="button"
          className="theme-toggle theme-toggle--elegant"
          onClick={toggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          suppressHydrationWarning
        >
          {ready ? <ThemeIcon dark={dark} /> : <ThemeIcon dark={false} />}
        </button>
      </header>
    );
  }

  return (
    <header className="home-topbar">
      <Link href="/#home" onClick={handleBrandClick} className="home-brand">
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
