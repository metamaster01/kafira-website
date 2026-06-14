"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SEA    = "#2d8f7b";
const SEA_DK = "#1a6b58";
const SEA_LT = "#3db89e";

// ─────────────────────────────────────────────────────
//  CategoryHero
//  Gradient banner for category-based listing pages
//  (Weekend Getaways, Group Tours). Shows an icon badge,
//  large title, subtitle, breadcrumb, and a row of
//  quick stat chips.
// ─────────────────────────────────────────────────────
export default function CategoryHero({
  icon,
  eyebrow,
  title,
  highlight,
  subtitle,
  breadcrumbLabel,
  stats,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  breadcrumbLabel: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <div
      style={{
        position: "relative",
        background: `linear-gradient(125deg, ${SEA} 0%, ${SEA_DK} 65%, #103a32 100%)`,
        overflow: "hidden",
        padding: "clamp(56px,9vw,104px) clamp(20px,5vw,48px) clamp(64px,8vw,100px)",
      }}
    >
      {/* decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: "10%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.045)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          background:
            "repeating-linear-gradient(115deg, transparent 0 40px, rgba(255,255,255,0.5) 40px 41px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "rgba(255,255,255,0.12)",
            border: "1.5px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 22px",
            color: "#ffffff",
          }}
        >
          {icon}
        </motion.div>

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div style={{ height: 1.5, width: 22, background: "rgba(255,255,255,0.45)" }} />
          <span
            style={{
              fontFamily: '"Outfit",sans-serif',
              fontSize: 10.5,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
          <div style={{ height: 1.5, width: 22, background: "rgba(255,255,255,0.45)" }} />
        </div>

        {/* title */}
        <h1
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800,
            fontSize: "clamp(32px,6vw,58px)",
            lineHeight: 1.08,
            color: "#ffffff",
            margin: "0 0 14px",
            letterSpacing: "-0.02em",
          }}
        >
          {title}{" "}
          <span style={{ color: "#fff" }}>{highlight}</span>
        </h1>

        {/* subtitle */}
        <p
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: "clamp(13px,1.3vw,16px)",
            fontWeight: 400,
            color: "rgba(220,245,240,0.78)",
            lineHeight: 1.75,
            maxWidth: 540,
            margin: "0 auto 22px",
          }}
        >
          {subtitle}
        </p>

        {/* breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginBottom: "clamp(28px,4vw,40px)",
            fontFamily: '"Outfit", sans-serif',
            fontSize: 12.5,
            fontWeight: 500,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <Link
            href="/"
            style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.65)";
            }}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: "#fff" }}>{breadcrumbLabel}</span>
        </div>

        {/* stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(10px,2vw,16px)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                borderRadius: 14,
                padding: "12px 22px",
                minWidth: 110,
              }}
            >
              <div
                style={{
                  fontFamily: '"Outfit",sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(18px,2.2vw,24px)",
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: 3,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: '"Outfit",sans-serif',
                  fontWeight: 500,
                  fontSize: 10.5,
                  color: "rgba(220,245,240,0.65)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
