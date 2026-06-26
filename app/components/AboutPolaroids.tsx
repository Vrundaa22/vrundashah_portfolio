"use client";

import Image from "next/image";

type Polaroid = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  objectPosition?: string;
};

const POLAROIDS: Polaroid[] = [
  {
    id: "figma",
    src: "/about/life/figma.png",
    alt: "MacBook open to a Figma design session",
    caption: "designing away",
    rotate: -2.5,
    objectPosition: "center 40%",
  },
  {
    id: "friends-park",
    src: "/about/life/friends-park.png",
    alt: "Friends at a Toronto park with the CN Tower in the background",
    caption: "park days",
    rotate: 3,
    objectPosition: "center 55%",
  },
  {
    id: "dance",
    src: "/about/life/dance.png",
    alt: "Dance group rehearsing in a hallway",
    caption: "rehearsal nights",
    rotate: -4,
    objectPosition: "center center",
  },
  {
    id: "marin",
    src: "/about/life/marin.png",
    alt: "Vrunda at Marin Headlands overlooking the bay",
    caption: "marin headlands",
    rotate: 2,
    objectPosition: "center 30%",
  },
  {
    id: "birthday",
    src: "/about/life/birthday.png",
    alt: "Birthday celebration with friends",
    caption: "birthday crew",
    rotate: -3,
    objectPosition: "center 35%",
  },
  {
    id: "oranges",
    src: "/about/life/oranges.png",
    alt: "Small canvas painting of orange slices",
    caption: "when life gives you oranges",
    rotate: 4,
    objectPosition: "center center",
  },
  {
    id: "sketch",
    src: "/about/life/sketch.png",
    alt: "Pencil sketch of an eye",
    caption: "sketching",
    rotate: -1.5,
    objectPosition: "center center",
  },
  {
    id: "cafe",
    src: "/about/life/cafe.png",
    alt: "Hand-drawn doodles on coffee cup sleeves at a cafe",
    caption: "snowday cafe",
    rotate: 3.5,
    objectPosition: "center 45%",
  },
  {
    id: "sf",
    src: "/about/life/sf.png",
    alt: "View down a steep San Francisco street toward the bay",
    caption: "sf hills",
    rotate: -3.5,
    objectPosition: "center 40%",
  },
  {
    id: "fall",
    src: "/about/life/fall.png",
    alt: "Autumn portrait with orange leaves and a plaid scarf",
    caption: "fall walks",
    rotate: 2.5,
    objectPosition: "center 25%",
  },
  {
    id: "spark",
    src: "/about/life/spark.png",
    alt: "Large group photo at a SPARK student event",
    caption: "spark",
    rotate: -2,
    objectPosition: "center 40%",
  },
  {
    id: "quest",
    src: "/about/life/quest.png",
    alt: "Quest student program completion photo with certificates",
    caption: "quest program",
    rotate: 3,
    objectPosition: "center 35%",
  },
  {
    id: "udaipur",
    src: "/about/life/udaipur.png",
    alt: "View through a decorated window in Udaipur, India",
    caption: "udaipur",
    rotate: -4.5,
    objectPosition: "center center",
  },
];

export default function AboutPolaroids() {
  return (
    <div className="about-polaroids" aria-label="Life photos">
      <div className="about-polaroids-intro">
        <p className="about-polaroids-eyebrow">camera roll</p>
        <p className="about-polaroids-lead">
          friends, side projects, and little moments in between
        </p>
      </div>

      <div className="about-polaroids-rail">
        <div className="about-polaroids-track">
          {POLAROIDS.map((photo) => (
            <figure
              key={photo.id}
              className="about-polaroid"
              style={{ "--polaroid-rotate": `${photo.rotate}deg` } as React.CSSProperties}
            >
              <div className="about-polaroid-photo">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 520px) 160px, 190px"
                  className="about-polaroid-img"
                  style={{ objectPosition: photo.objectPosition ?? "center center" }}
                />
              </div>
              <figcaption className="about-polaroid-caption">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
