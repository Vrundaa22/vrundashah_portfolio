import { ImageResponse } from "next/og";

export const alt = "Vrunda Shah — product design portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [montserratMedium, montserratSemiBold, caveatSemiBold, instrumentSerifItalic] =
    await Promise.all([
      fetch(
        "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-.ttf"
      ).then((res) => res.arrayBuffer()),
      fetch(
        "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-.ttf"
      ).then((res) => res.arrayBuffer()),
      fetch(
        "https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SII.ttf"
      ).then((res) => res.arrayBuffer()),
      fetch(
        "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf"
      ).then((res) => res.arrayBuffer()),
    ]);

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Toronto",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
  const sleeping = hour >= 22 || hour < 8;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8f6f4",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 80,
              left: 340,
              width: 520,
              height: 520,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(248,168,178,0.75) 0%, rgba(252,220,224,0.45) 45%, transparent 72%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 120,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,210,195,0.65) 0%, rgba(255,235,225,0.35) 50%, transparent 75%)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "44px 56px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Caveat",
                fontSize: 42,
                fontWeight: 600,
                color: "#c25e64",
              }}
            >
              vrunda shah
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#c25e64",
                  background: "rgba(194,94,100,0.1)",
                }}
              >
                Work
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#666",
                }}
              >
                About
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#666",
                }}
              >
                Resume
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#666",
                }}
              >
                LinkedIn ↗
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.65)",
                fontSize: 22,
                color: "#666",
              }}
            >
              ☾
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              textAlign: "center",
              padding: "0 80px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Montserrat",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c25e64",
                marginBottom: 28,
              }}
            >
              hiii, i&apos;m Vrunda
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: 860,
                fontFamily: "Montserrat",
                fontSize: 52,
                fontWeight: 500,
                lineHeight: 1.18,
                letterSpacing: "-0.025em",
                color: "#1a1a1a",
              }}
            >
              I love turning everyday problems into{" "}
              <span
                style={{
                  fontFamily: "Instrument Serif",
                  fontStyle: "italic",
                  color: "#b04e58",
                }}
              >
                fun, seamless
              </span>{" "}
              and{" "}
              <span
                style={{
                  fontFamily: "Instrument Serif",
                  fontStyle: "italic",
                  color: "#b04e58",
                }}
              >
                impactful
              </span>{" "}
              product experiences.
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 36,
                fontFamily: "Montserrat",
                fontSize: 18,
                fontWeight: 500,
                color: "#888",
              }}
            >
              <span style={{ display: "flex", color: "#aaa", marginRight: 10 }}>status:</span>
              <span style={{ display: "flex", color: "#1a1a1a", marginRight: 10 }}>
                {sleeping ? "sleeping 😴" : "i'm up ☀️"}
              </span>
              <span style={{ display: "flex", color: "#ccc", marginRight: 10 }}>·</span>
              <span style={{ display: "flex", color: "#999", marginRight: 10 }}>{time}</span>
              <span style={{ display: "flex", color: "#ccc", marginRight: 10 }}>·</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#3a9d52",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#34c759",
                    marginRight: 8,
                  }}
                />
                open to product experiences
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: 36,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Montserrat",
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "lowercase",
                color: "#bbb",
              }}
            >
              selected work
            </div>
            <div style={{ display: "flex", color: "#c25e64", fontSize: 28, marginTop: 8 }}>↓</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: montserratMedium, weight: 500, style: "normal" },
        { name: "Montserrat", data: montserratSemiBold, weight: 600, style: "normal" },
        { name: "Caveat", data: caveatSemiBold, weight: 600, style: "normal" },
        { name: "Instrument Serif", data: instrumentSerifItalic, weight: 400, style: "italic" },
      ],
    }
  );
}
