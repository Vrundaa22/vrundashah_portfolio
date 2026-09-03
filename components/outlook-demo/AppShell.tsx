"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { noiseCount, DEMO_USER } from "@/lib/outlook-demo/mock-data";
import CopilotLogo from "@/components/outlook-demo/CopilotLogo";
import OutlookLogo from "@/components/outlook-demo/OutlookLogo";
import { ComposeProvider, useCompose } from "@/components/outlook-demo/ComposeContext";
import { OUTLOOK_CALENDAR, OUTLOOK_MAIL } from "@/lib/outlook-demo/paths";

function SideIcon({ children }: { children: React.ReactNode }) {
  return <span className="ol-side-icon">{children}</span>;
}

const FOLDERS = [
  {
    id: "inbox",
    label: "Inbox",
    href: OUTLOOK_MAIL,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16v12H4z" />
        <path d="M4 6l8 6 8-6" />
      </svg>
    ),
  },
  {
    id: "junk",
    label: "Junk",
    href: `${OUTLOOK_MAIL}?folder=junk`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M5 5l14 14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "drafts",
    label: "Drafts",
    href: `${OUTLOOK_MAIL}?folder=drafts`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" strokeLinecap="round" />
        <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id: "sent",
    label: "Sent",
    href: `${OUTLOOK_MAIL}?folder=sent`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2L11 13" strokeLinecap="round" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    id: "deleted",
    label: "Deleted",
    href: `${OUTLOOK_MAIL}?folder=deleted`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
      </svg>
    ),
  },
  {
    id: "archive",
    label: "Archive",
    href: `${OUTLOOK_MAIL}?folder=archive`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <path d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
        <path d="M10 12h4" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

function AppShellInner({
  children,
  mailFolder = "inbox",
}: {
  children: React.ReactNode;
  mailFolder?: string;
}) {
  const { openCompose } = useCompose();
  const pathname = usePathname();
  const hidden = noiseCount();
  const onMail = pathname.startsWith(OUTLOOK_MAIL);
  const onCalendar = pathname.startsWith(OUTLOOK_CALENDAR);
  const folder = mailFolder;

  return (
    <div className="ol-frame">
      <div className="ol-shell">
        <header className="ol-topbar">
          <Link href={OUTLOOK_MAIL} className="ol-topbar-brand">
            <span className="ol-topbar-logo">
              <OutlookLogo size={28} />
            </span>
            <span className="ol-topbar-name">Outlook</span>
          </Link>

          <div className="ol-topbar-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" strokeLinecap="round" />
            </svg>
            Search mail, people, events…
          </div>

          <div className="ol-topbar-right">
            <button type="button" className="ol-topbar-profile">
              <span className="ol-avatar ol-avatar--xs ol-topbar-avatar">{DEMO_USER.initials}</span>
              <span className="ol-topbar-profile-name">{DEMO_USER.name}</span>
            </button>
          </div>
        </header>

        <div className="ol-desk">
          <aside className="ol-sidebar">
            <button type="button" className="ol-new-mail" onClick={openCompose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New mail
            </button>

            <button type="button" className="ol-copilot-nav">
              <CopilotLogo size={22} />
              <span>Copilot</span>
            </button>

            <p className="ol-sidebar-label">Folders</p>
            <nav className="ol-sidebar-nav ol-sidebar-folders" aria-label="Mail folders">
              {FOLDERS.map((item) => {
                const active = onMail && folder === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`ol-side-link${active ? " ol-side-link--active" : ""}`}
                  >
                    <SideIcon>{item.icon}</SideIcon>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <nav className="ol-sidebar-nav ol-sidebar-apps" aria-label="Apps">
              <Link
                href={OUTLOOK_CALENDAR}
                className={`ol-side-link${onCalendar ? " ol-side-link--active" : ""}`}
              >
                <SideIcon>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </SideIcon>
                Calendar
              </Link>
            </nav>

            <div className="ol-sidebar-copilot">
              <CopilotLogo size={18} />
              <p>
                Copilot tucked {hidden} campus newsletters into News. Ask Copilot to summarize
                any thread.
              </p>
            </div>

            <div className="ol-sidebar-foot">
              <span className="ol-avatar ol-avatar--sm">{DEMO_USER.initials}</span>
              <div>
                <p className="ol-sidebar-user">{DEMO_USER.name}</p>
                <p className="ol-sidebar-email">{DEMO_USER.email}</p>
              </div>
            </div>
          </aside>

          {children}
        </div>
      </div>
    </div>
  );
}

export default function AppShell(props: { children: React.ReactNode; mailFolder?: string }) {
  return (
    <ComposeProvider>
      <AppShellInner {...props} />
    </ComposeProvider>
  );
}
