function FooterHeart() {
  return (
    <svg
      className="site-footer-heart"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="love"
      role="img"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer-headline">
        let&apos;s build something together :)
      </p>

      <nav className="site-footer-tab" aria-label="Contact">
        <a
          href="https://www.linkedin.com/in/vrunda22/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        <a href="mailto:vrundashah22@gmail.com">Email</a>
      </nav>

      <div className="site-footer-meta">
        <p className="site-footer-credit">
          made with <FooterHeart /> by vrunda
        </p>
        <p className="site-footer-copy">© 2026 Vrunda Shah&apos;s Portfolio</p>
      </div>
    </footer>
  );
}
