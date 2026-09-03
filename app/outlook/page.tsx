import type { Metadata } from "next";
import OutlookCaseStudy from "../components/OutlookCaseStudy";

export const metadata: Metadata = {
  title: "A New Look to Outlook",
  description:
    "A chic personal Outlook UX concept — focused inbox, saved contacts, and Copilot-assisted replies. Case study in progress; interactive prototype live.",
};

export default function OutlookPage() {
  return <OutlookCaseStudy />;
}
