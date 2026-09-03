"use client";

import { emailsForCategory, type MailCategory } from "@/lib/outlook-demo/mock-data";

const CATEGORIES: { id: MailCategory; label: string }[] = [
  { id: "unread", label: "Unread" },
  { id: "important", label: "Important" },
  { id: "news", label: "News" },
];

export default function CategoryCards({
  active,
  onSelect,
}: {
  active: MailCategory;
  onSelect: (cat: MailCategory) => void;
}) {
  return (
    <div className="ol-cat-chips" role="tablist" aria-label="Filter by category">
      {CATEGORIES.map((cat) => {
        const count = emailsForCategory(cat.id).length;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={active === cat.id}
            className={`ol-cat-chip${active === cat.id ? " ol-cat-chip--active" : ""}`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.label}
            <span className="ol-cat-chip-n">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
