// ─────────────────────────────────────────────────────────────────
//  regions.ts  —  top-level region definitions
// ─────────────────────────────────────────────────────────────────
import type { Region } from "./types";

const REGIONS: Region[] = [
  {
    slug: "india",
    label: "India",
    description:
      "From snow-capped Himalayan passes to tropical backwaters — India holds every kind of adventure within its borders.",
  },
  {
    slug: "international",
    label: "International",
    description:
      "Handcrafted packages across Europe, Southeast Asia, and the Middle East — fully escorted, stress-free, and packed with experiences.",
  },
];

export default REGIONS;
