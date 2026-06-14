"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── REQUIRED IMAGE ───────────────────────────────────────────────────────────
// /public/about-hero.png  — 1600×700px recommended
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".about-hero-img", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[52vh] min-h-[300px] md:h-[60vh] md:min-h-[380px] overflow-hidden"
    >
      {/* Parallax image */}
      <img
        src="/about-hero-2.jpg"
        alt="Two travelers laughing outdoors"
        className="about-hero-img absolute inset-0 w-full h-[120%] object-cover object-center"
      />

      {/* Transparent green tint overlay */}
      <div className="absolute inset-0 bg-[#2d6a5a]/45" />

      {/* ABOUT US heading — centred */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.22em] uppercase text-center"
        >
          About Us
        </motion.h1>
      </div>
    </section>
  );
}