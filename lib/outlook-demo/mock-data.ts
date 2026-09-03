export type EmailPriority = "important" | "inbox" | "noise";

export type Email = {
  id: string;
  from: string;
  fromShort: string;
  subject: string;
  preview: string;
  body: string[];
  time: string;
  priority: EmailPriority;
  tag?: string;
  tagTone?: "blue" | "green" | "amber";
  avatarColor: string;
  copilotSummary?: string;
  copilotReply?: string;
};

export type SavedContact = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  context: string;
  avatarColor: string;
  lastContact?: string;
};

/** Fictional inbox owner — safe for public prototype demos */
export const DEMO_USER = {
  name: "Alex Morgan",
  initials: "AM",
  email: "alex.morgan@studentmail.ca",
} as const;

export const EMAILS: Email[] = [
  {
    id: "gracie-adams",
    from: "Gracie Adams",
    fromShort: "GA",
    subject: "Marketing Director interview invite — UX Laurier",
    preview: "Hi Alex, thanks for applying. We'd love to chat about the UX Laurier role…",
    body: [
      "Hi Alex,",
      "Thank you for your interest in the Marketing Director role with UX Laurier. We'd love to schedule a 30-minute conversation this week.",
      "Would Thursday at 2 PM work? Happy to adjust if needed.",
      "Best,\nGracie Adams\nMarketing Director, UX Laurier",
    ],
    time: "Jul 25",
    priority: "important",
    tag: "Interview",
    tagTone: "blue",
    avatarColor: "#1e4d7b",
    copilotSummary:
      "Gracie is inviting you to a 30-min interview for the Marketing Director role at UX Laurier. She suggested Thursday 2 PM and is open to other times.",
    copilotReply:
      "Hi Gracie,\n\nThank you for reaching out — I'm excited about the opportunity. Thursday at 2 PM works perfectly for me.\n\nLooking forward to speaking with you.\n\nBest,\nAlex",
  },
  {
    id: "prof-renner",
    from: "Prof. A. Renner",
    fromShort: "AR",
    subject: "Re: Extension approved through Friday",
    preview: "Approved — submit the lab report by Friday 11:59 PM.",
    body: [
      "Hi Alex,",
      "Approved — submit the lab report by Friday 11:59 PM.",
      "Prof. Renner",
    ],
    time: "9:14 AM",
    priority: "important",
    tag: "Reply needed",
    tagTone: "green",
    avatarColor: "#3d6b52",
    copilotSummary: "Your extension is approved. Submit the lab report by Friday at 11:59 PM.",
    copilotReply:
      "Hi Professor Renner,\n\nThank you for approving the extension — I'll submit the lab report by Friday 11:59 PM.\n\nBest,\nAlex",
  },
  {
    id: "career-services",
    from: "Career Services",
    fromShort: "CS",
    subject: "Interview confirmed — Thursday 2:00 PM",
    preview: "Your co-op interview is confirmed. Review prep materials attached.",
    body: [
      "Your co-op interview is confirmed for Thursday at 2:00 PM.",
      "Review the prep materials in the portal before your session.",
    ],
    time: "Yesterday",
    priority: "important",
    tag: "Confirmed",
    tagTone: "amber",
    avatarColor: "#b8860b",
    copilotSummary: "Co-op interview confirmed Thursday 2 PM. Prep materials are in the portal.",
  },
  {
    id: "lab-ta",
    from: "T. Adeyemi, Lab TA",
    fromShort: "TA",
    subject: "Updated rubric for Thursday's lab",
    preview: "Rubric v2 is posted — focus on the methodology section.",
    body: [
      "Hi everyone,",
      "Rubric v2 is posted on MyLS. Focus on the methodology section for Thursday's lab.",
      "T. Adeyemi",
    ],
    time: "Yesterday",
    priority: "inbox",
    avatarColor: "#5a7a9e",
    copilotSummary: "Lab rubric updated — check methodology section before Thursday.",
  },
  {
    id: "campus-wellness",
    from: "Campus Wellness",
    fromShort: "CW",
    subject: "This week's drop-in hours",
    preview: "Drop-in counselling hours Mon–Thu 10 AM – 4 PM.",
    body: ["Drop-in counselling hours this week: Mon–Thu 10 AM – 4 PM."],
    time: "Mon",
    priority: "noise",
    avatarColor: "#9aa3ad",
  },
  {
    id: "residence-life",
    from: "Residence Life",
    fromShort: "RL",
    subject: "Fire alarm test notice",
    preview: "Scheduled test Tuesday 11 AM. No action needed.",
    body: ["Scheduled fire alarm test Tuesday 11 AM. No action needed."],
    time: "Mon",
    priority: "noise",
    avatarColor: "#9aa3ad",
  },
  {
    id: "faculty-news",
    from: "Laurier Faculty News",
    fromShort: "LN",
    subject: "Weekly campus update — events & announcements",
    preview: "Highlights from this week across campus departments…",
    body: ["Weekly roundup of campus events and department announcements."],
    time: "Mon",
    priority: "noise",
    avatarColor: "#b0b8c0",
  },
];

export const SAVED_CONTACTS: SavedContact[] = [
  {
    id: "gracie",
    name: "Gracie Adams",
    initials: "GA",
    role: "Marketing Director, UX Laurier",
    email: "gracie.adams@uxlaurier.org",
    context: "Interview follow-up — Marketing Director role",
    avatarColor: "#1e4d7b",
    lastContact: "Jul 25",
  },
  {
    id: "renner",
    name: "Prof. A. Renner",
    initials: "AR",
    role: "Course Instructor",
    email: "a.renner@university.edu",
    context: "Design methods — saved for course reference",
    avatarColor: "#3d6b52",
    lastContact: "Today",
  },
  {
    id: "adeyemi",
    name: "T. Adeyemi",
    initials: "TA",
    role: "Lab TA",
    email: "t.adeyemi@university.edu",
    context: "Lab section — rubric & office hours",
    avatarColor: "#5a7a9e",
    lastContact: "Yesterday",
  },
  {
    id: "fiona",
    name: "Fiona Alvarez",
    initials: "FA",
    role: "Design Lead @ Startup",
    email: "f.alvarez@startup.io",
    context: "Networking event — send thank-you note",
    avatarColor: "#c96a5a",
    lastContact: "Aug 20",
  },
];

export function getEmail(id: string) {
  return EMAILS.find((e) => e.id === id);
}

export function importantEmails() {
  return EMAILS.filter((e) => e.priority === "important");
}

export function inboxEmails() {
  return EMAILS.filter((e) => e.priority === "inbox");
}

export function noiseCount() {
  return EMAILS.filter((e) => e.priority === "noise").length;
}

export function unreadEmails() {
  return EMAILS.filter((e) => e.priority === "important" || e.priority === "inbox");
}

export function newsEmails() {
  return EMAILS.filter((e) => e.priority === "noise");
}

export function pendingResponseEmails() {
  return EMAILS.filter(
    (e) =>
      e.tag === "Reply needed" ||
      e.tag === "Interview" ||
      Boolean(e.copilotReply)
  );
}

export type MailCategory = "unread" | "important" | "news";

export function emailsForCategory(category: MailCategory) {
  if (category === "important") return importantEmails();
  if (category === "news") return newsEmails();
  return unreadEmails();
}
