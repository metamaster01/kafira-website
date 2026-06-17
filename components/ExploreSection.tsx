"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const PLACES = [
  { id: 1, name: "Shimla hills", tag: "Serene Waters", emoji: "🌊" },
  { id: 2, name: "Goa Beaches", tag: "Sun & Sand", emoji: "🏖" },
  { id: 3, name: "Leh Ladakh", tag: "High Altitude", emoji: "🏔" },
  { id: 4, name: "Manali Valleys", tag: "Alpine Escape", emoji: "🌲" },
  { id: 5, name: "Maldives inland", tag: "Misty Highlands", emoji: "☁️" },
  { id: 6, name: "Maharastra Forts", tag: "Royal Heritage", emoji: "🏰" },
];

// Left column: videos 1,2,3 — scroll DOWN continuously
// Right column: videos 4,5  — scroll UP continuously (opposite)
const VIDEOS_L = [1, 2, 3, 1, 2, 3]; // doubled for seamless loop
const VIDEOS_R = [4, 5, 4, 5, 4, 5];

// ─────────────────────────────────────────────────────────────────
// VIDEO STRIP — vertical auto-scroll, seamless loop
// ─────────────────────────────────────────────────────────────────
function VideoStrip({
  videos,
  reverse,
}: {
  videos: number[];
  reverse: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Each video card is 220px tall + 12px gap = 232px
    const CARD_H = 220;
    const GAP_H = 12;
    const UNIT = CARD_H + GAP_H; // 232px per card
    const HALF = UNIT * (videos.length / 2); // scroll one full set then reset

    // Start position
    gsap.set(track, { y: reverse ? -HALF : 0 });

    animRef.current = gsap.to(track, {
      y: reverse ? 0 : -HALF,
      duration: videos.length * 6, // 6s per video = smooth
      ease: "none",
      repeat: -1,
    });

    return () => {
      animRef.current?.kill();
    };
  }, [videos, reverse]);

  // Pause on hover
  const pause = () => animRef.current?.pause();
  const resume = () => animRef.current?.resume();

  return (
    <div
      style={{
        overflow: "hidden",
        height: "100%",
        position: "relative",
        borderRadius: 20,
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* top/bottom fade masks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom,#f5f0e8,transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to top,#f5f0e8,transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <div
        ref={trackRef}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {videos.map((n, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              height: 220,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            >
              <source src={`/explore-${n}.mp4`} type="video/mp4" />
            </video>
            {/* subtle dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.18)",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PLACE CARD — 2×3 grid item
// ─────────────────────────────────────────────────────────────────
function PlaceCard({
  place,
  index,
}: {
  place: (typeof PLACES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Staggered appear: odd rows from left, even from right
    const fromX = index % 2 === 0 ? -30 : 30;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40, x: fromX, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.85,
        delay: 0.08 * index,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        aspectRatio: "2/1",
        cursor: "pointer",
        background: `linear-gradient(145deg, hsl(${index * 40},35%,22%), hsl(${index * 40 + 20},40%,15%))`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        transition:
          "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "scale(1.04) translateY(-4px)";
        el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.22)";
        // zoom the image inside
        const img = el.querySelector("img") as HTMLImageElement;
        if (img) img.style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "scale(1) translateY(0)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)";
        const img = el.querySelector("img") as HTMLImageElement;
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* place image */}
      <img
        src={`/place-${place.id}.jpg`}
        alt={place.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />

      {/* gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* top tag */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          borderRadius: 999,
          padding: "4px 10px",
          fontFamily: "Outfit,sans-serif",
          fontSize: 10,
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "0.06em",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {place.emoji} {place.tag}
      </div>

      {/* bottom info */}
      <div style={{ position: "absolute", bottom: 12, left: 14, right: 14 }}>
        <div
          style={{
            fontFamily: "Playfair Display,serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {place.name}
        </div>
        {/* gold underline — slides in on hover */}
        <div
          style={{
            height: 2,
            width: 28,
            borderRadius: 1,
            background: "linear-gradient(to right,#c9a84c,#e8d5a3)",
            marginTop: 6,
            transition: "width 0.35s ease",
          }}
          className="place-underline"
        />
      </div>

      {/* explore button — fades in on hover */}
      {/* <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        className="place-overlay"
      >
        <div
          style={{
            background: "linear-gradient(135deg,#c9a84c,#8b6914)",
            color: "#fff",
            fontFamily: "Outfit,sans-serif",
            fontSize: 12,
            fontWeight: 700,
            padding: "8px 18px",
            borderRadius: 999,
            boxShadow: "0 4px 16px rgba(201,168,76,0.4)",
          }}
        >
          Explore →
        </div>
      </div> */}

      <style>{`
        div:hover .place-overlay { opacity: 1 !important; }
        div:hover .place-underline { width: 48px !important; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION HEADING — scroll-triggered
// ─────────────────────────────────────────────────────────────────
function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 52px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            height: 1,
            width: 26,
            background: "linear-gradient(to right,transparent,#c9a84c)",
          }}
        />
        <span
          style={{
            fontFamily: "Outfit,sans-serif",
            fontSize: 10,
            fontWeight: 700,
            color: "#2d8f7b",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Step 02 — Explore
        </span>
        <div
          style={{
            height: 1,
            width: 26,
            background: "linear-gradient(to left,transparent,#c9a84c)",
          }}
        />
      </div>

      <h2
        style={{
          fontFamily: "Playfair Display,serif",
          fontWeight: 800,
          fontSize: "clamp(28px,3.5vw,52px)",
          lineHeight: 1.1,
          color: "#1a1510",
          marginBottom: 14,
        }}
      >
        Every destination,
        <br />
        <span style={{ fontStyle: "italic", color: "#2d8f7b" }}>
          a world of its own
        </span>
      </h2>

      <p
        style={{
          fontFamily: "Montserrat,serrif",
          fontSize: 16,
          color: "#6b5e4e",
          lineHeight: 1.7,
        }}
      >
        From snow-capped Himalayan passes to sun-drenched Goan shores — Kafira
        takes you exactly where your heart calls.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// COUNTER STRIP — animated numbers
// ─────────────────────────────────────────────────────────────────
function CounterStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  }, []);

  const STATS = [
    { val: "120+", label: "Destinations" },
    { val: "5,000+", label: "Trips Completed" },
    { val: "50K+", label: "Happy Travelers" },
    { val: "12 Yrs", label: "of Expertise" },
  ];

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        marginTop: 52,
        background: "#fff",
        borderRadius: 20,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "22px 16px",
            borderRight:
              i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
            transition: "background 0.25s ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(201,168,76,0.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "transparent";
          }}
        >
          <div
            style={{
              fontFamily: "Playfair Display,serif",
              fontWeight: 800,
              fontSize: "clamp(22px,2.5vw,32px)",
              color: "#c9a84c",
              lineHeight: 1,
            }}
          >
            {s.val}
          </div>
          <div
            style={{
              fontFamily: "Outfit,sans-serif",
              fontSize: 12,
              color: "#6b5e4e",
              marginTop: 6,
              letterSpacing: "0.04em",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function ExploreSection() {
  const STRIP_H = 680; // total height of the video strip + grid area

  return (
    <section
      id="explore"
      style={{
        background: "#f5f0e8",
        padding: "96px 0 80px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeading />

        {/* ─── THREE COLUMN LAYOUT ─── */}
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
            height: STRIP_H,
          }}
        >
          {/* ── LEFT: video strip scrolls DOWN ── */}
          <div style={{ width: 170, flexShrink: 0, height: "100%" }}>
            <VideoStrip videos={VIDEOS_L} reverse={false} />
          </div>

          {/* ── CENTRE: 2×3 place grid ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr",
                gap: 14,
                height: STRIP_H,
              }}
            >
              {PLACES.map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: video strip scrolls UP ── */}
          <div style={{ width: 170, flexShrink: 0, height: "100%" }}>
            <VideoStrip videos={VIDEOS_R} reverse={true} />
          </div>
        </div>

        {/* ─── STATS STRIP ─── */}
        {/* <CounterStrip/> */}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          #explore > div > div:nth-child(2) {
            flex-direction: column !important;
            height: auto !important;
          }
          #explore > div > div:nth-child(2) > div:first-child,
          #explore > div > div:nth-child(2) > div:last-child {
            display: none !important;
          }
          #explore > div > div:nth-child(2) > div:nth-child(2) {
            height: auto !important;
          }
          #explore > div > div:nth-child(2) > div:nth-child(2) > div {
            grid-template-rows: auto !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
