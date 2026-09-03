"use client";

import { useId } from "react";

export default function CopilotLogo({ size = 20 }: { size?: number }) {
  const gradId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="ol-copilot-logo"
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="4" x2="20" y2="20">
          <stop offset="0%" stopColor="#4d9fff" />
          <stop offset="45%" stopColor="#7b6fd4" />
          <stop offset="100%" stopColor="#5ec4b6" />
        </linearGradient>
      </defs>
      <path
        d="M12 3c-1.2 2.8-3.4 4.2-6 4.8 2.6.6 4.8 2 6 4.8 1.2-2.8 3.4-4.2 6-4.8-2.6-.6-4.8-2-6-4.8z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M6 14.5c-.8 1.8-2.2 2.8-4 3.2 1.8.4 3.2 1.4 4 3.2.8-1.8 2.2-2.8 4-3.2-1.8-.4-3.2-1.4-4-3.2z"
        fill={`url(#${gradId})`}
        opacity="0.85"
      />
      <path
        d="M16 14.5c-.8 1.8-2.2 2.8-4 3.2 1.8.4 3.2 1.4 4 3.2.8-1.8 2.2-2.8 4-3.2-1.8-.4-3.2-1.4-4-3.2z"
        fill={`url(#${gradId})`}
        opacity="0.65"
      />
    </svg>
  );
}
