"use client";

import Link from "next/link";
import { useTheme } from "../hooks/useTheme";

type SiteHeaderProps = {
  active?: "work" | "about";
};

export default function SiteHeader({ active }: SiteHeaderProps) {
  const { dark, toggle, ready } = useTheme();

  return (
    <header className="home-topbar">
      <Link
        href="/"
        className="home-brand"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
      >
        vrunda shah
      </Link>

      <nav className="nav-pill" aria-label="Main">
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
