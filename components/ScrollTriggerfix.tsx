"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerFix() {
  useEffect(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const handleLoad = () => {
      ScrollTrigger.refresh(true);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}