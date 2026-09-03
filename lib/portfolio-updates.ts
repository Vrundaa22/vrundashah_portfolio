/**
 * Call out fresh portfolio work on the homepage.
 * Add an entry here whenever you ship something new — remove or expire when it feels old.
 */
export type PortfolioUpdate = {
  /** Unique id for dismiss storage */
  id: string;
  /** Matches `PROJECTS[].id` in HomeView */
  projectId: string;
  message: string;
  href: string;
  /** Optional ISO date — hidden after this day (local) */
  expiresAt?: string;
};

export const PORTFOLIO_UPDATES: PortfolioUpdate[] = [
  {
    id: "outlook-redesign-mar-2026",
    projectId: "microsoft-outlook",
    message: "psss… just added something new on my Outlook redesign",
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

export function getPortfolioUpdateForProject(
  projectId: string,
  now = new Date()
): PortfolioUpdate | undefined {
  return getActivePortfolioUpdates(now).find((u) => u.projectId === projectId);
}

export function getLatestPortfolioUpdate(now = new Date()): PortfolioUpdate | undefined {
  return getActivePortfolioUpdates(now)[0];
}
