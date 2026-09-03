import type { Metadata } from "next";
import OutlookCaseStudy from "../components/OutlookCaseStudy";

export const metadata: Metadata = {
  title: "Microsoft Outlook — Redesign",
  description:
    "A personal Outlook redesign concept with an interactive prototype — focused inbox, saved contacts, and Copilot-assisted replies.",
};

export default function OutlookPage() {
  return <OutlookCaseStudy />;
}
