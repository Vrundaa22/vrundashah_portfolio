"use client";

import CopilotLogo from "@/components/outlook-demo/CopilotLogo";
import { DEMO_USER, type Email } from "@/lib/outlook-demo/mock-data";

export default function ReadingPane({ email }: { email: Email }) {
  const tagClass = email.tagTone
    ? `ol-read-tag ol-read-tag--${email.tagTone}`
    : "ol-read-tag ol-read-tag--blue";

  return (
    <section className="ol-read" aria-label="Reading pane">
      <header className="ol-read-header">
        <div className="ol-read-sender">
          <span
            className="ol-avatar ol-avatar--md"
            style={{ background: email.avatarColor }}
          >
            {email.fromShort}
          </span>
          <div className="ol-read-meta">
            <div className="ol-read-name-row">
              <p className="ol-read-name">{email.from}</p>
              {email.tag && <span className={tagClass}>{email.tag}</span>}
            </div>
            <p className="ol-read-email">
              {email.from.toLowerCase().replace(/\s/g, "")}@mail.edu
            </p>
          </div>
        </div>
        <div className="ol-read-actions">
          <button type="button" aria-label="Delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
            </svg>
          </button>
          <button type="button" aria-label="Star">
            {email.tag === "Interview" ? "★" : "☆"}
          </button>
          <button type="button" aria-label="Reply">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M9 14L4 9l5-5M4 9h11a5 5 0 010 10h-2" />
            </svg>
          </button>
        </div>
      </header>

      <div className="ol-read-scroll">
        <h1 className="ol-read-subject">{email.subject}</h1>

        {email.copilotSummary && (
          <div className="ol-copilot-inline">
            <div className="ol-copilot-inline-head">
              <CopilotLogo size={16} />
              Copilot summary
            </div>
            <p>{email.copilotSummary}</p>
          </div>
        )}

        <div className="ol-read-body">
          {email.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {email.copilotReply && (
          <div className="ol-copilot-reply">
            <div className="ol-copilot-reply-label">
              <CopilotLogo size={16} />
              Suggested reply
            </div>
            <p className="ol-copilot-reply-text">{email.copilotReply}</p>
            <div className="ol-copilot-reply-btns">
              <button type="button" className="ol-btn ol-btn--primary">
                Reply with this
              </button>
              <button type="button" className="ol-btn ol-btn--ghost">
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="ol-compose-bar">
        <span className="ol-avatar ol-avatar--sm">{DEMO_USER.initials}</span>
        <div className="ol-compose-input">
          <span>Message here</span>
          <div className="ol-compose-icons">
            <span>☺</span>
            <span>📎</span>
          </div>
        </div>
        <button type="button" className="ol-send" aria-label="Send">
          ➤
        </button>
      </footer>
    </section>
  );
}
