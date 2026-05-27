"use client";
// ─────────────────────────────────────────────────────────────
//  /destinations/page.tsx
//  Shows all destination cards. Click → /destinations/[slug]/trips
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  Globe2,
  Mountain,
  Trees,
  Compass,
} from "lucide-react";
import { DESTINATIONS } from "../../data/upcomingTrips";
import type { Destination } from "../../data/upcomingTrips";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── Design tokens (matches rest of site) ──────────────
const C = {
  bg: "#f5f7f6",
  white: "#ffffff",
  text: "#0e2620",
  sub: "#2d5248",
  muted: "#7a9e96",
  sea: "#2d8f7b",
  seaDk: "#1d6b5c",
  seaLt: "#3db89e",
  seaBg: "#eaf5f2",
  seaBd: "#b3ddd5",
  border: "#e8efed",
};

// ── Tiny icon per destination ──────────────────────────
function DestIcon({ slug, size = 16 }: { slug: string; size?: number }) {
  const p = { size, strokeWidth: 1.8, color: "currentColor" };
  if (slug === "himalayas" || slug === "uttarakhand")
    return <Mountain {...p} />;
  if (slug === "international") return <Globe2 {...p} />;
  if (slug === "northeast" || slug === "kerala" || slug === "karnataka")
    return <Trees {...p} />;
  return <Compass {...p} />;
}

// ── Single destination card ───────────────────────────
function DestCard({ dest, index }: { dest: Destination; index: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 36, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
        delay: index * 0.07,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      },
    );
  }, [index]);

  return (
    <Link
      href={`/destinations/${dest.slug}/trips`}
      style={{ textDecoration: "none" }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 22,
          overflow: "hidden",
          background: C.white,
          border: `1px solid ${hov ? dest.accent + "55" : C.border}`,
          cursor: "pointer",
          transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hov ? "translateY(-8px)" : "none",
          boxShadow: hov
            ? `0 24px 56px ${dest.accent}22, 0 0 0 1px ${dest.accent}44`
            : "0 3px 14px rgba(0,0,0,0.05)",
        }}
      >
        {/* ── Image area ── */}
        <div
          style={{
            position: "relative",
            height: 220,
            overflow: "hidden",
            background: `linear-gradient(145deg,${dest.accent}33,#0a2520)`,
          }}
        >
          <img
            src={dest.image}
            alt={dest.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.55s ease",
              transform: hov ? "scale(1.08)" : "scale(1)",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          {/* gradient overlays */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.1) 55%,transparent 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top,${dest.accent}33 0%,transparent 55%)`,
              opacity: hov ? 1 : 0,
              transition: "opacity 0.35s",
              pointerEvents: "none",
            }}
          />

          {/* top-left: trip count pill */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(0,0,0,0.48)",
              backdropFilter: "blur(10px)",
              borderRadius: 999,
              padding: "4px 11px",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <DestIcon slug={dest.slug} size={11} />
            <span
              style={{
                fontFamily: "Outfit,sans-serif",
                fontSize: 10,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {dest.tripCount} {dest.tripCount === 1 ? "trip" : "trips"}
            </span>
          </div>

          {/* top-right: best months */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: `${dest.accent}cc`,
              backdropFilter: "blur(8px)",
              borderRadius: 999,
              padding: "4px 10px",
            }}
          >
            <Calendar size={9} color="#fff" />
            <span
              style={{
                fontFamily: "Outfit,sans-serif",
                fontSize: 9,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {dest.bestMonths}
            </span>
          </div>

          {/* bottom overlay text */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 18px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "Outfit,sans-serif",
                fontSize: 10,
                fontWeight: 600,
                color: `${dest.accent}dd`,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              {dest.tagline}
            </div>
            <div
              style={{
                fontFamily: '"Playfair Display",serif',
                fontStyle: "italic",
                fontSize: "clamp(28px,3.5vw,36px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                transition: "transform 0.3s ease",
                transform: hov ? "translateY(-3px)" : "none",
                textShadow: `0 3px 16px ${dest.accent}44`,
              }}
            >
              {dest.name}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "16px 18px 18px" }}>
          <p
            style={{
              fontFamily: "Outfit,sans-serif",
              fontSize: 12,
              color: C.sub,
              lineHeight: 1.6,
              marginBottom: 14,
            }}
          >
            {dest.description}
          </p>

          {/* highlights */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              marginBottom: 14,
            }}
          >
            {dest.highlights.map((h, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 7 }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: dest.accent,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Outfit,sans-serif",
                    fontSize: 11,
                    color: C.muted,
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: C.border, marginBottom: 14 }} />

          {/* footer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Outfit,sans-serif",
                  fontSize: 9,
                  color: C.muted,
                  marginBottom: 2,
                }}
              >
                Starting from
              </div>
              <div
                style={{
                  fontFamily: '"Playfair Display",serif',
                  fontWeight: 800,
                  fontSize: 18,
                  color: C.text,
                }}
              >
                ₹{dest.startingPrice.toLocaleString("en-IN")}
                <span
                  style={{
                    fontFamily: "Outfit,sans-serif",
                    fontWeight: 400,
                    fontSize: 10,
                    color: C.muted,
                  }}
                >
                  {" "}
                  / person
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 16px",
                borderRadius: 12,
                background: hov
                  ? `linear-gradient(135deg,${dest.accent},${dest.accent}cc)`
                  : C.seaBg,
                border: `1.5px solid ${hov ? "transparent" : C.seaBd}`,
                color: hov ? "#fff" : C.seaDk,
                fontFamily: "Outfit,sans-serif",
                fontSize: 12,
                fontWeight: 700,
                transition: "all 0.3s ease",
                boxShadow: hov ? `0 8px 20px ${dest.accent}44` : "none",
              }}
            >
              View trips <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Page header ────────────────────────────────────────
function PageHero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: `linear-gradient(135deg,${C.text} 0%,#1a4a3d 60%,#0d3028 100%)`,
        padding:
          "clamp(64px,10vw,120px) clamp(20px,5vw,80px) clamp(48px,7vw,80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative orbs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.sea}28 0%,transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.seaLt}18 0%,transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              height: 1,
              width: 28,
              background: `linear-gradient(to right,transparent,${C.seaLt})`,
            }}
          />
          <span
            style={{
              fontFamily: "Outfit,sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: C.seaLt,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Explore Destinations
          </span>
        </div>

        <h1
          style={{
            fontFamily: '"Playfair Display",serif',
            fontWeight: 800,
            fontSize: "clamp(32px,5vw,68px)",
            lineHeight: 1.05,
            color: "#e8f7f4",
            marginBottom: 16,
            letterSpacing: "-0.01em",
          }}
        >
          Where will your next
          <br />
          <span style={{ fontStyle: "italic", color: C.seaLt }}>
            adventure
          </span>{" "}
          take you?
        </h1>

        <p
          style={{
            fontFamily: "Outfit,sans-serif",
            fontSize: "clamp(14px,1.6vw,17px)",
            color: "rgba(180,230,220,0.7)",
            lineHeight: 1.7,
            maxWidth: 520,
            marginBottom: 32,
          }}
        >
          Browse handcrafted packages across {DESTINATIONS.length} destinations
          — from the Himalayas to Southeast Asia, from Rajasthan's desert forts
          to Kerala's silent backwaters.
        </p>

        {/* stats row */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[
            { num: DESTINATIONS.length, label: "Destinations" },
            {
              num: DESTINATIONS.reduce((s, d) => s + (d.tripCount ?? 0), 0),
              label: "Packages",
            },
            { num: "10k+", label: "Happy Travelers" },
          ].map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: '"Playfair Display",serif',
                  fontWeight: 800,
                  fontSize: 28,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "Outfit,sans-serif",
                  fontSize: 11,
                  color: "rgba(180,220,210,0.6)",
                  marginTop: 2,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────
export default function DestinationsPage() {
  return (
    <>
      <div>
        <Navbar />
        <PageHero />

        <section style={{ background: C.bg, padding: "72px 0 96px" }}>
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 clamp(16px,4vw,32px)",
            }}
          >
            {/* section label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 24,
                  background: `linear-gradient(to right,transparent,${C.sea})`,
                }}
              />
              <span
                style={{
                  fontFamily: "Outfit,sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.sea,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                All Destinations
              </span>
            </div>

            {/* 3-col responsive grid */}
            <div
              className="dest-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 24,
              }}
            >
              {DESTINATIONS.map((dest, i) => (
                <DestCard key={dest.slug} dest={dest} index={i} />
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>

      <style>{`
        @media (max-width:1100px) { .dest-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:640px)  { .dest-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
