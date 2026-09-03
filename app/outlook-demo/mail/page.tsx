import { Suspense } from "react";
import MailClient from "./MailClient";

export default function MailPage() {
  return (
    <Suspense fallback={<div className="ol-loading">Loading…</div>}>
      <MailClient />
    </Suspense>
  );
}
