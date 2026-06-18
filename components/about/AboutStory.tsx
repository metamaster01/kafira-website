"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Montserrat setup reminder ────────────────────────────────────────────────
// app/layout.tsx:
//   import { Montserrat } from "next/font/google";
//   const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
//   <body className={`${montserrat.variable}`}>
//
// tailwind.config.ts:
//   fontFamily: { montserrat: ["var(--font-montserrat)", "sans-serif"] }
// ─────────────────────────────────────────────────────────────────────────────

const paragraphs = [
  {
    text: "Remember when travel was simply about visiting a destination and coming back with photographs? We believed there was something more. Every journey has the power to create stories, friendships, confidence, and memories that stay with you forever.",
    highlight: false,
  },
  {
    text: "That's how Kafira was born.",
    highlight: true,
  },
  {
    text: "Founded by passionate travelers, Kafira was created with a simple mission — to make travel more accessible, transparent, and experience-driven. We saw a need for a travel community where people could explore the world without worrying about complicated planning, hidden surprises, or missing out on authentic experiences.",
    highlight: false,
  },
  {
    text: "Today, Kafira is more than a travel company. We are a community of explorers, dreamers, adventurers, and storytellers who believe that every trip should leave a lasting impact. Inspired by community-driven travel experiences, transparency, and meaningful connections among travelers.",
    highlight: false,
  },
];

export default function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", paddingTop: "2rem", paddingBottom: "2rem" }}
      className="w-full bg-[#f5f0e8]"
    >
      {/* Single centred column — inline styles used as override guarantee */}
      <div
        style={{
          maxWidth: "780px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          textAlign: "center",
        }}
      >
        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#111827",
            lineHeight: 1.35,
            marginBottom: "2rem",
            fontSize: 'clamp(24px,4vw,46px)',
            textAlign: "center",
          }}
        >
          What do we stand for and how did we get here?
        </motion.h2>

        {/* ── Paragraphs ── */}
        {paragraphs.map(({ text, highlight }, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.18 + i * 0.13,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontFamily: '"Montserrat", sans-serif',
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.75,
              marginBottom: i < paragraphs.length - 1 ? "1.25rem" : 0,
              fontSize: highlight ? "1rem" : "clamp(0.82rem, 1.5vw, 0.94rem)",
              fontWeight: highlight ? 500 : 300,
              color: highlight ? "#1f2937" : "#4b5563",
              maxWidth: "840px",
            }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      
    </section>
  );
}