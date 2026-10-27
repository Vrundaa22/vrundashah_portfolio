"use client";

import Image from "next/image";

export default function HeroScotiaRole() {
  return (
    <p className="hero-role hero-role--ready">
      Product Design @{" "}
      <span className="hero-scotia-trigger" tabIndex={0}>
        <span className="hero-scotia-logo" aria-hidden="true">
          <Image
            src="/logos/scotiabank-mark.svg"
            alt=""
            width={20}
            height={20}
            className="hero-scotia-logo-img"
          />
        </span>
        <span className="hero-brand hero-brand--scotia">Scotia Digital</span>
      </span>
    </p>
  );
}
