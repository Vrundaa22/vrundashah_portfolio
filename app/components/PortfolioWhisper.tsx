import Link from "next/link";
import type { PortfolioUpdate } from "@/lib/portfolio-updates";

type PortfolioWhisperProps = {
  update: PortfolioUpdate;
};

export default function PortfolioWhisper({ update }: PortfolioWhisperProps) {
  return (
    <p className="hero-whisper" role="note">
      <span className="hero-whisper-text">
        {update.messageBefore}
        <Link href={update.href} className="hero-whisper-link">
          {update.highlight}
        </Link>
        {update.messageAfter ?? ""}
      </span>
    </p>
  );
}
