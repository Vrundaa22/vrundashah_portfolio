export type EventKind = "class" | "meeting" | "deadline" | "personal";

export type CalEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  start: string;
  end?: string;
  kind: EventKind;
  location?: string;
  reminder?: string;
  note?: string;
};

export const CALENDAR_EVENTS: CalEvent[] = [
  {
    id: "ps360-lec",
    title: "PS360 — Lecture",
    date: "2026-09-03",
    start: "10:00 AM",
    end: "11:20 AM",
    kind: "class",
    location: "BA201",
    reminder: "30 min before",
  },
  {
    id: "ux-laurier-interview",
    title: "Marketing Director interview — UX Laurier",
    date: "2026-09-04",
    start: "2:00 PM",
    end: "2:30 PM",
    kind: "meeting",
    location: "Zoom",
    reminder: "1 hour before",
    note: "From Gracie Adams — prep portfolio talking points",
  },
  {
    id: "lab-ps360",
    title: "PS360 Lab",
    date: "2026-09-04",
    start: "4:00 PM",
    end: "5:50 PM",
    kind: "class",
    location: "N1048",
    reminder: "15 min before",
  },
  {
    id: "lab-report",
    title: "Lab report due",
    date: "2026-09-05",
    start: "11:59 PM",
    kind: "deadline",
    reminder: "Evening of Sep 4",
    note: "Extension approved — submit on MyLS",
  },
  {
    id: "coop-interview",
    title: "Co-op interview",
    date: "2026-09-04",
    start: "3:30 PM",
    end: "4:15 PM",
    kind: "meeting",
    location: "Career Centre",
    reminder: "1 day before",
  },
  {
    id: "office-hours",
    title: "Prof office hours",
    date: "2026-09-03",
    start: "1:00 PM",
    end: "2:00 PM",
    kind: "class",
    location: "BA301",
  },
  {
    id: "group-study",
    title: "Study group — PS360",
    date: "2026-09-03",
    start: "5:00 PM",
    end: "6:30 PM",
    kind: "personal",
    location: "Library 4th floor",
  },
  {
    id: "coffee-fiona",
    title: "Coffee chat — Fiona",
    date: "2026-09-06",
    start: "11:00 AM",
    kind: "personal",
    location: "Starbucks on King",
    reminder: "Morning of",
  },
  {
    id: "ps360-lec-2",
    title: "PS360 — Lecture",
    date: "2026-09-08",
    start: "10:00 AM",
    end: "11:20 AM",
    kind: "class",
    location: "BA201",
  },
  {
    id: "midterm-prep",
    title: "Midterm study block",
    date: "2026-09-10",
    start: "6:00 PM",
    end: "8:00 PM",
    kind: "personal",
    reminder: "1 hour before",
  },
];

export const KIND_LABEL: Record<EventKind, string> = {
  class: "Class",
  meeting: "Meeting",
  deadline: "Deadline",
  personal: "Personal",
};

export function eventsOnDate(date: string, events = CALENDAR_EVENTS) {
  return events
    .filter((e) => e.date === date)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function eventsInMonth(year: number, month: number, events = CALENDAR_EVENTS) {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return events.filter((e) => e.date.startsWith(prefix));
}

export function datesWithEvents(year: number, month: number, events = CALENDAR_EVENTS) {
  return new Set(
    eventsInMonth(year, month, events).map((e) => e.date)
  );
}

export function upcomingEvents(from: Date, limit = 6, events = CALENDAR_EVENTS) {
  const fromStr = from.toISOString().slice(0, 10);
  return events
    .filter((e) => e.date >= fromStr)
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`))
    .slice(0, limit);
}

export const IMPORTED_SCHEDULE_LABEL = "Winter 2026 — course schedule + electives";
