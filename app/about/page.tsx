"use client";

import AboutCarousel from "../components/AboutCarousel";
import AboutDayNotes from "../components/AboutDayNotes";
import AboutPolaroids from "../components/AboutPolaroids";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-layer">
        <SiteHeader active="about" />

        <div className="about-layout">
          <article className="about-copy">
            <h1 className="about-thanks">
              thanks for stopping by{" "}
              <svg
                className="about-heart"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </h1>
            <h2 className="about-heading">a little bit about me</h2>

            <p className="about-text">
              I&apos;m a third-year Computer Science and Design student at
              Wilfrid Laurier University and a Product Design Analyst intern at
              RBC. I&apos;ve worked on visual assets, design systems, and the
              AI-powered tool{" "}
              <strong>RBC SaveUp</strong>. I&apos;m currently seeking{" "}
              <strong>Fall 2026 product opportunities</strong>.
            </p>

            <p className="about-text">
              I love solving real-world problems — from prototyping a laundry
              folder as a kid to using Figma today. Design, for me, is about
              making everyday things feel a little more{" "}
              <em>fun and seamless</em>.
            </p>

            <p className="about-text">
              When I&apos;m not designing, you&apos;ll find me playing hockey,
              painting, or singing my heart out.
            </p>

            <p className="about-contact">
              Feel free to reach out at{" "}
              <a href="mailto:vrundashah22@gmail.com">vrundashah22@gmail.com</a>
              — let&apos;s build something impactful.
            </p>
          </article>

          <AboutCarousel />
        </div>

        <AboutDayNotes />

        <AboutPolaroids />

        <SiteFooter />
      </div>
    </div>
  );
}
