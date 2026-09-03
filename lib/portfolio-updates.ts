/**
 * Call out fresh portfolio work on the homepage hero.
 * Add an entry here whenever you ship something new — remove or expire when it feels old.
 */
export type PortfolioUpdate = {
  /** Unique id for dismiss storage */
  id: string;
  messageBefore: string;
  /** Teal link text — usually the project name */
  highlight: string;
  messageAfter?: string;
  href: string;
  /** Optional ISO date — hidden after this day (local) */
  expiresAt?: string;
};

export const PORTFOLIO_UPDATES: PortfolioUpdate[] = [
  {
    id: "outlook-redesign-mar-2026",
    messageBefore: "psss… just added something new on my ",
    highlight: "Outlook redesign",
    href: "/outlook",
  },
];

export function getActivePortfolioUpdates(now = new Date()): PortfolioUpdate[] {
  return PORTFOLIO_UPDATES.filter((update) => {
    if (!update.expiresAt) return true;
    const end = new Date(`${update.expiresAt}T23:59:59`);
    return now <= end;
  });
}

export function getLatestPortfolioUpdate(now = new Date()): PortfolioUpdate | undefined {
  return getActivePortfolioUpdates(now)[0];
}
