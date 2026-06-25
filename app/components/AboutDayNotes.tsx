"use client";

import { useState } from "react";

type DayNote = {
  id: string;
  time: string;
  tag: string;
  label: string;
  teaser: string;
  body: string;
  color: "yellow" | "pink" | "mint" | "peach" | "lavender";
  rotate: number;
  offset: { x: number; y: number };
};

const DAY_NOTES: DayNote[] = [
  {
    id: "morning",
    time: "8:00 am",
    tag: "pre-figma",
    label: "open the file",
    teaser: "yogurt bowl → duplicate yesterday's chaos",
    body: "Yogurt bowl first, always. Then I open Figma and duplicate yesterday's messy frame — honestly it's my version of a warm-up. I skim Slack, check what's due, and pick one flow to push from 'fine' to 'shippable' before my first class.",
    color: "yellow",
    rotate: -3,
    offset: { x: 0, y: 0 },
  },
  {
    id: "crit",
    time: "10:30 am",
    tag: "crit · laurier",
    label: "present the wires",
    teaser: "cs × design class, pins out",
    body: "Wilfrid Laurier CS × Design — presenting mid-fi wireframes to classmates who will absolutely tell me if something feels off (which I want). Crit days teach me to explain my thinking out loud, not just make pretty screens.",
    color: "pink",
    rotate: 4,
    offset: { x: 10, y: 6 },
  },
  {
    id: "intern",
    time: "1:00 pm",
    tag: "intern · rbc",
    label: "component mode",
    teaser: "SaveUp, tokens, auto-layout",
    body: "Internship at RBC — tightening SaveUp flows, nudging components in the design system, asking 'does this feel approachable or like banking homework?' Student brain meets real product constraints. Best part: seeing work that might actually ship.",
    color: "mint",
    rotate: -2,
    offset: { x: -6, y: 4 },
  },
  {
    id: "library",
    time: "4:00 pm",
    tag: "deep work",
    label: "library frame",
    teaser: "headphones, 12 tabs, one user flow",
    body: "Campus library or a quiet corner — headphones on, lo-fi playing, Figma at 110% zoom. This is where I map edge cases, rewrite microcopy, and pretend I won't rename every layer (I will). The unglamorous pixels that make UX feel seamless.",
    color: "peach",
    rotate: 5,
    offset: { x: 8, y: -4 },
  },
  {
    id: "night",
    time: "9:30 pm",
    tag: "after hours",
    label: "ship or ramen",
    teaser: "portfolio tweak · then log off",
    body: "Evening split: case study polish, a paint night with friends, or ramen while I tell myself 'one last tweak.' I jot what I'd iterate tomorrow — then close the laptop before I start redesigning buttons for fun.",
    color: "lavender",
    rotate: -4,
    offset: { x: -4, y: 8 },
  },
];

export default function AboutDayNotes() {
  const [unlocked, setUnlocked] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const handleNoteClick = (index: number) => {
    if (index > unlocked) return;

    setActive(index);

    if (index === unlocked && index < DAY_NOTES.length - 1) {
      setUnlocked(index + 1);
    }

    if (index === DAY_NOTES.length - 1) {
      setDone(true);
    }
  };

  const activeNote = active !== null ? DAY_NOTES[active] : null;

  return (
    <section className="about-day" aria-label="Day in the life of a design student">
      <div className="about-day-header">
        <p className="about-day-eyebrow">day in the life</p>
        <h2 className="about-day-title">design student edition</h2>
        <p className="about-day-sub">
          click through my tuesday — one sticky at a time, left to right
        </p>
      </div>

      <div className="about-day-board">
        <div className="about-day-canvas">
          <div className="about-day-frame-label" aria-hidden="true">
            <span className="about-day-frame-dot" />
            vrunda_day.fig
          </div>

          <div className="about-day-cluster" role="list">
            {DAY_NOTES.map((note, index) => {
              const isLocked = index > unlocked;
              const isNext = index === unlocked && !done;
              const isRead = active !== null && index <= active;
              const isActive = active === index;

              return (
                <button
                  key={note.id}
                  type="button"
                  role="listitem"
                  className={`about-sticky about-sticky--${note.color}${
                    isLocked ? " about-sticky--locked" : ""
                  }${isNext ? " about-sticky--next" : ""}${
                    isRead ? " about-sticky--read" : ""
                  }${isActive ? " about-sticky--active" : ""}`}
                  style={
                    {
                      "--sticky-rotate": `${note.rotate}deg`,
                      "--sticky-x": `${note.offset.x}px`,
                      "--sticky-y": `${note.offset.y}px`,
                    } as React.CSSProperties
                  }
                  onClick={() => handleNoteClick(index)}
                  disabled={isLocked}
                  aria-expanded={isActive}
                  aria-label={`${note.time}: ${note.label}${isLocked ? " (locked)" : ""}`}
                >
                  <span className="about-sticky-tag">{note.tag}</span>
                  <span className="about-sticky-time">{note.time}</span>
                  <span className="about-sticky-label">{note.label}</span>
                  <span className="about-sticky-teaser">{note.teaser}</span>
                  {isRead && !isLocked && (
                    <span className="about-sticky-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="about-day-inspector" aria-live="polite">
          <div className="about-day-inspector-bar">
            <span>frame details</span>
            <span className="about-day-inspector-step">
              {active !== null ? `${active + 1}/${DAY_NOTES.length}` : "—"}
            </span>
          </div>

          {activeNote ? (
            <div className="about-day-inspector-body">
              <p className="about-day-inspector-tag">{activeNote.tag}</p>
              <p className="about-day-inspector-time">{activeNote.time}</p>
              <h3 className="about-day-inspector-title">{activeNote.label}</h3>
              <p className="about-day-inspector-text">{activeNote.body}</p>
              {active !== null && unlocked > active && (
                <p className="about-day-detail-hint">→ next sticky unlocked</p>
              )}
              {done && active === DAY_NOTES.length - 1 && (
                <p className="about-day-detail-hint about-day-detail-hint--done">
                  end of frame — see you tomorrow :)
                </p>
              )}
            </div>
          ) : (
            <p className="about-day-detail-empty">
              pick the 8:00 am note to start the path ↑
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
