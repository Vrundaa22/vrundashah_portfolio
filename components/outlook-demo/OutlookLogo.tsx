"use client";

import { useId } from "react";

type OutlookLogoProps = {
  size?: number;
  intro?: boolean;
};

export default function OutlookLogo({ size = 30, intro = false }: OutlookLogoProps) {
  const bodyId = useId();
  const flapId = useId();
  const foldId = useId();

  const defs = (
    <defs>
      <linearGradient id={bodyId} x1="18" y1="15" x2="18" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6eb5e8" />
        <stop offset="50%" stopColor="#3d7eb8" />
        <stop offset="100%" stopColor="#1e4468" />
      </linearGradient>
      <linearGradient id={flapId} x1="8" y1="10" x2="28" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7ec8f0" />
        <stop offset="30%" stopColor="#8fd4a8" />
        <stop offset="58%" stopColor="#e8d48a" />
        <stop offset="100%" stopColor="#e8a898" />
      </linearGradient>
      <linearGradient id={foldId} x1="18" y1="8" x2="18" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
      </linearGradient>
    </defs>
  );

  const body = (
    <>
      <path
        d="M5.5 15.2V26.5a2.2 2.2 0 002.2 2.2h20.6a2.2 2.2 0 002.2-2.2V15.2"
        fill={`url(#${bodyId})`}
      />
      <path
        d="M5.5 15.2h25v11.3a2.2 2.2 0 01-2.2 2.2H7.7a2.2 2.2 0 01-2.2-2.2V15.2z"
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="0.55"
      />
      <path
        d="M5.5 15.2L18 23.8L30.5 15.2"
        stroke="#ffffff"
        strokeOpacity="0.32"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
    </>
  );

  const diamond = (
    <>
      <path
        d="M5.5 15.2L18 8.2L30.5 15.2L18 23.8Z"
        fill={`url(#${flapId})`}
      />
      <path
        d="M5.5 15.2L18 8.2L30.5 15.2"
        fill={`url(#${foldId})`}
      />
    </>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={`ol-logo-env${intro ? " ol-logo-env--intro" : ""}`}
    >
      {defs}
      {intro ? (
        <>
          <g className="ol-logo-body">{body}</g>
          <g className="ol-logo-diamond">{diamond}</g>
        </>
      ) : (
        <>
          {body}
          {diamond}
        </>
      )}
    </svg>
  );
}
