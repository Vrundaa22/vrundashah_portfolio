import { Suspense } from "react";
import CalendarClient from "./CalendarClient";

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="ol-loading">Loading…</div>}>
      <CalendarClient />
    </Suspense>
  );
}
