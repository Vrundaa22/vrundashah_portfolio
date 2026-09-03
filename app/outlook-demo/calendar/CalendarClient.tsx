"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/outlook-demo/AppShell";
import {
  IMPORTED_SCHEDULE_LABEL,
  KIND_LABEL,
  eventsOnDate,
  upcomingEvents,
  type CalEvent,
} from "@/lib/outlook-demo/calendar-data";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MAX_CHIPS = 3;

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function formatDayLabel(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function shortTitle(title: string) {
  return title.length > 22 ? `${title.slice(0, 20)}…` : title;
}

function buildMonthGrid(viewYear: number, viewMonth: number) {
  const first = new Date(viewYear, viewMonth, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: { day: number | null; dateStr: string | null }[] = [];
  for (let i = 0; i < startPad; i++) cells.push({ day: null, dateStr: null });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, dateStr: toDateStr(viewYear, viewMonth, d) });
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, dateStr: null });
  return cells;
}

export default function CalendarClient() {
  const today = new Date(2026, 8, 3);
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const [expanded, setExpanded] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(todayStr);
  const [imported, setImported] = useState(true);
  const [importMsg, setImportMsg] = useState<string | null>(null);

  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const dayEvents = eventsOnDate(selected);
  const comingUp = upcomingEvents(today, 6);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }

  function selectDate(dateStr: string) {
    setSelected(dateStr);
    const [y, mo] = dateStr.split("-").map(Number);
    setViewYear(y);
    setViewMonth(mo - 1);
  }

  function handleImport() {
    setImported(true);
    setImportMsg("Schedule imported — your classes and deadlines are on the calendar.");
    setTimeout(() => setImportMsg(null), 4000);
  }

  return (
    <AppShell>
      <div className={`ol-cal${expanded ? " ol-cal--expanded" : ""}`}>
        <header className="ol-cal-head">
          <div>
            <h1>{MONTHS[viewMonth]} {viewYear}</h1>
            <p className="ol-cal-sub">
              {imported ? IMPORTED_SCHEDULE_LABEL : "Build your schedule or import from school."}
            </p>
          </div>
          <div className="ol-cal-head-actions">
            <button
              type="button"
              className="ol-cal-layout-toggle"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "← Compact calendar" : "Expand month board →"}
            </button>
            <label className="ol-cal-import">
              <input
                type="file"
                accept=".ics,.csv,.pdf"
                className="ol-cal-import-input"
                onChange={handleImport}
              />
              Import schedule
            </label>
            <button type="button" className="ol-btn ol-btn--primary">
              + New event
            </button>
          </div>
        </header>

        {importMsg && <p className="ol-cal-toast">{importMsg}</p>}

        <div className="ol-cal-body">
          {expanded ? (
            <section className="ol-cal-board" aria-label="Month calendar">
              <div className="ol-cal-board-head">
                <div className="ol-cal-month-nav">
                  <button type="button" onClick={prevMonth} aria-label="Previous month">‹</button>
                  <span>{MONTHS[viewMonth]} {viewYear}</span>
                  <button type="button" onClick={nextMonth} aria-label="Next month">›</button>
                </div>
              </div>
              <div className="ol-cal-weekdays">
                {WEEKDAYS_SHORT.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="ol-cal-board-grid">
                {grid.map((cell, i) => {
                  if (!cell.day || !cell.dateStr) {
                    return <div key={`empty-${i}`} className="ol-cal-day ol-cal-day--empty" />;
                  }

                  const events = eventsOnDate(cell.dateStr);
                  const isSelected = cell.dateStr === selected;
                  const isToday = cell.dateStr === todayStr;
                  const visible = events.slice(0, MAX_CHIPS);
                  const overflow = events.length - MAX_CHIPS;

                  return (
                    <button
                      key={cell.dateStr}
                      type="button"
                      className={`ol-cal-day${isSelected ? " ol-cal-day--selected" : ""}${isToday ? " ol-cal-day--today" : ""}`}
                      onClick={() => selectDate(cell.dateStr!)}
                    >
                      <span className="ol-cal-day-num">{cell.day}</span>
                      <span className="ol-cal-day-events">
                        {visible.map((ev) => (
                          <span
                            key={ev.id}
                            className={`ol-cal-chip ol-cal-chip--${ev.kind}`}
                            title={`${ev.start} · ${ev.title}`}
                          >
                            <span className="ol-cal-chip-time">
                              {ev.start.replace(" AM", "a").replace(" PM", "p")}
                            </span>
                            {shortTitle(ev.title)}
                          </span>
                        ))}
                        {overflow > 0 && (
                          <span className="ol-cal-chip ol-cal-chip--more">+{overflow} more</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="ol-cal-legend">
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--class" />Class</span>
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--meeting" />Meeting</span>
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--deadline" />Deadline</span>
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--personal" />Personal</span>
              </div>
            </section>
          ) : (
            <aside className="ol-cal-month" aria-label="Month picker">
              <div className="ol-cal-month-nav">
                <button type="button" onClick={prevMonth} aria-label="Previous month">‹</button>
                <span>{MONTHS[viewMonth]} {viewYear}</span>
                <button type="button" onClick={nextMonth} aria-label="Next month">›</button>
              </div>
              <div className="ol-cal-weekdays">
                {WEEKDAYS_SHORT.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="ol-cal-grid">
                {grid.map((cell, i) => {
                  if (!cell.day || !cell.dateStr) {
                    return <div key={`empty-${i}`} className="ol-cal-cell ol-cal-cell--empty" />;
                  }

                  const hasEvents = eventsOnDate(cell.dateStr).length > 0;
                  const isSelected = cell.dateStr === selected;
                  const isToday = cell.dateStr === todayStr;

                  return (
                    <button
                      key={cell.dateStr}
                      type="button"
                      className={`ol-cal-cell${isSelected ? " ol-cal-cell--selected" : ""}${isToday ? " ol-cal-cell--today" : ""}`}
                      onClick={() => selectDate(cell.dateStr!)}
                    >
                      {cell.day}
                      {hasEvents && <i className="ol-cal-dot" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
              <div className="ol-cal-legend">
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--class" />Class</span>
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--meeting" />Meeting</span>
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--deadline" />Deadline</span>
                <span><i className="ol-cal-legend-dot ol-cal-legend-dot--personal" />Personal</span>
              </div>
            </aside>
          )}

          <section className="ol-cal-detail">
            <div className="ol-cal-day-block">
              <p className="ol-cal-side-label">{WEEKDAYS[new Date(selected + "T12:00:00").getDay()]}</p>
              <h2>{formatDayLabel(selected)}</h2>
              {dayEvents.length === 0 ? (
                <p className="ol-cal-empty">Clear day — no events scheduled.</p>
              ) : (
                <ul className="ol-cal-events">
                  {dayEvents.map((ev) => (
                    <EventCard key={ev.id} event={ev} />
                  ))}
                </ul>
              )}
            </div>

            <div className="ol-cal-upcoming">
              <h3>Keep in mind</h3>
              <p className="ol-cal-upcoming-hint">Tap an event to jump to that day.</p>
              <ul className="ol-cal-upcoming-list">
                {comingUp.map((ev) => (
                  <li key={`up-${ev.id}`}>
                    <button
                      type="button"
                      className={`ol-cal-upcoming-item${ev.date === selected ? " ol-cal-upcoming-item--active" : ""}`}
                      onClick={() => selectDate(ev.date)}
                    >
                      <span className={`ol-cal-kind ol-cal-kind--${ev.kind}`}>
                        {KIND_LABEL[ev.kind]}
                      </span>
                      <span className="ol-cal-upcoming-title">{ev.title}</span>
                      <span className="ol-cal-upcoming-when">
                        {ev.date === todayStr ? "Today" : ev.date.slice(5).replace("-", "/")} · {ev.start}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function EventCard({ event }: { event: CalEvent }) {
  return (
    <li className={`ol-cal-event ol-cal-event--${event.kind}`}>
      <div className="ol-cal-event-time">
        <span>{event.start}</span>
        {event.end && <span className="ol-cal-event-end">{event.end}</span>}
      </div>
      <div className="ol-cal-event-body">
        <span className={`ol-cal-kind ol-cal-kind--${event.kind}`}>{KIND_LABEL[event.kind]}</span>
        <p className="ol-cal-event-title">{event.title}</p>
        {event.location && <p className="ol-cal-event-loc">{event.location}</p>}
        {event.note && <p className="ol-cal-event-note">{event.note}</p>}
        {event.reminder && (
          <p className="ol-cal-event-reminder">Reminder · {event.reminder}</p>
        )}
      </div>
    </li>
  );
}
