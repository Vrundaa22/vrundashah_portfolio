"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/outlook-demo/AppShell";
import CategoryCards from "@/components/outlook-demo/CategoryCards";
import ReadingPane from "@/components/outlook-demo/ReadingPane";
import { OUTLOOK_MAIL } from "@/lib/outlook-demo/paths";
import {
  EMAILS,
  SAVED_CONTACTS,
  emailsForCategory,
  pendingResponseEmails,
  type Email,
  type MailCategory,
} from "@/lib/outlook-demo/mock-data";

type ViewTab = "mail" | "contacts" | "pending";

export default function MailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const view: ViewTab =
    searchParams.get("view") === "contacts"
      ? "contacts"
      : searchParams.get("view") === "pending"
        ? "pending"
        : "mail";

  const category: MailCategory =
    searchParams.get("cat") === "important" ||
    searchParams.get("cat") === "news"
      ? (searchParams.get("cat") as MailCategory)
      : "unread";

  const folder = searchParams.get("folder") ?? "inbox";
  const onInbox = folder === "inbox";

  const list = useMemo(() => {
    if (!onInbox) return [];
    if (view === "pending") return pendingResponseEmails();
    if (view === "contacts") return [];
    return emailsForCategory(category);
  }, [view, category, onInbox]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeId = selectedId ?? list[0]?.id ?? null;
  const selected: Email | undefined = EMAILS.find((e) => e.id === activeId);

  function setView(next: ViewTab) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "mail") params.delete("view");
    else params.set("view", next);
    router.push(`${OUTLOOK_MAIL}?${params.toString()}`, { scroll: false });
    setSelectedId(null);
  }

  function setCategory(next: MailCategory) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cat", next);
    router.push(`${OUTLOOK_MAIL}?${params.toString()}`, { scroll: false });
    setSelectedId(null);
  }

  function openContactEmail(name: string) {
    const match = EMAILS.find((e) => e.from === name);
    if (match) {
      setSelectedId(match.id);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("view");
      params.delete("folder");
      router.push(`${OUTLOOK_MAIL}?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <AppShell mailFolder={folder}>
      <div className={`ol-main${selected ? " ol-main--has-selection" : ""}`}>
        <section className="ol-list" aria-label="Message list">
          <div className="ol-view-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={view === "mail"}
              className={`ol-view-tab${view === "mail" ? " ol-view-tab--active" : ""}`}
              onClick={() => setView("mail")}
            >
              Mail
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "contacts"}
              className={`ol-view-tab${view === "contacts" ? " ol-view-tab--active" : ""}`}
              onClick={() => setView("contacts")}
            >
              Saved contacts
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "pending"}
              className={`ol-view-tab${view === "pending" ? " ol-view-tab--active" : ""}`}
              onClick={() => setView("pending")}
            >
              Pending response
            </button>
          </div>

          {view === "mail" && (
            <>
              <div className="ol-frequent">
                <span className="ol-frequent-label">Frequent</span>
                <div className="ol-frequent-row">
                  {SAVED_CONTACTS.map((contact) => (
                    <button
                      key={contact.id}
                      type="button"
                      className="ol-frequent-contact"
                      onClick={() => openContactEmail(contact.name)}
                      title={contact.name}
                    >
                      <span
                        className="ol-avatar ol-avatar--frequent"
                        style={{ background: contact.avatarColor }}
                      >
                        {contact.initials}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <CategoryCards active={category} onSelect={setCategory} />
            </>
          )}

          {view === "pending" && (
            <p className="ol-list-note">
              Threads waiting on your reply — Copilot can draft responses for you.
            </p>
          )}

          {view === "contacts" && (
            <ul className="ol-contacts-list">
              {SAVED_CONTACTS.map((contact) => (
                <li key={contact.id}>
                  <button
                    type="button"
                    className="ol-contact-row"
                    onClick={() => openContactEmail(contact.name)}
                  >
                    <span
                      className="ol-avatar ol-avatar--sm"
                      style={{ background: contact.avatarColor }}
                    >
                      {contact.initials}
                    </span>
                    <span className="ol-contact-body">
                      <span className="ol-contact-name">{contact.name}</span>
                      <span className="ol-contact-role">{contact.role}</span>
                      <span className="ol-contact-context">{contact.context}</span>
                    </span>
                    {contact.lastContact && (
                      <span className="ol-message-time">{contact.lastContact}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {(view === "mail" || view === "pending") && !onInbox && (
            <p className="ol-list-note ol-list-note--folder">
              {folder === "junk" && "Nothing in Junk — Copilot filters campus promos here."}
              {folder === "drafts" && "No drafts yet."}
              {folder === "sent" && "Sent mail will show up here."}
              {folder === "deleted" && "Deleted items are empty."}
              {folder === "archive" && "Archived threads live here when you file them away."}
            </p>
          )}

          {(view === "mail" || view === "pending") && onInbox && (
            <ul className="ol-messages">
              {list.map((email) => (
                <li key={email.id}>
                  <button
                    type="button"
                    className={`ol-message${activeId === email.id ? " ol-message--active" : ""}`}
                    onClick={() => setSelectedId(email.id)}
                  >
                    <span
                      className="ol-avatar ol-avatar--sm"
                      style={{ background: email.avatarColor }}
                    >
                      {email.fromShort}
                    </span>
                    <span className="ol-message-body">
                      <span className="ol-message-top">
                        <span className="ol-message-from">{email.from}</span>
                        <span className="ol-message-time">{email.time}</span>
                      </span>
                      <span className="ol-message-subject">{email.subject}</span>
                      <span className="ol-message-preview">{email.preview}</span>
                    </span>
                    <span className="ol-message-star" aria-hidden="true">
                      {email.tag === "Interview" ? "★" : "☆"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {selected ? (
          <ReadingPane email={selected} />
        ) : (
          <section className="ol-read ol-read--empty">
            <p>
              {view === "contacts"
                ? "Pick a contact to open their latest mail"
                : view === "pending"
                  ? "Select a thread to reply"
                  : "Select a message"}
            </p>
          </section>
        )}
      </div>
    </AppShell>
  );
}
