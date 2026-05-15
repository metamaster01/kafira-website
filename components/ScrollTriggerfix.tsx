"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerFix() {
  useEffect(() => {
    // ── Force scroller to window — never an overflow parent ──
    ScrollTrigger.defaults({ scroller: window });

    // ── Double RAF: waits for paint + layout to fully settle ──
    // Single RAF fires before Next.js finishes hydrating fonts/images
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });
    });

    // ── Refresh after ALL assets load (images, fonts, video posters) ──
    const handleLoad = () => {
      ScrollTrigger.refresh(true);
    };
    window.addEventListener("load", handleLoad);

    // ── Refresh on resize AND orientation change ──
    // Mobile orientation flip completely invalidates all trigger positions
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 150); // debounce — don't hammer on every pixel
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);

    // ── Safety net: after 3s, force-show anything still invisible ──
    // Catches every case where ScrollTrigger silently fails on mobile
    const safetyTimer = setTimeout(() => {
      // Target elements by the inline opacity:0 gsap sets
      document.querySelectorAll<HTMLElement>("*").forEach((el) => {
        const style = el.getAttribute("style") || "";
        // Only touch elements GSAP set to opacity:0 (has inline style)
        if (
          style.includes("opacity: 0") &&
          !el.closest("[data-keep-hidden]") // escape hatch if you need something truly hidden
        ) {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.visibility = "visible";
        }
      });
    }, 3000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return null;
}