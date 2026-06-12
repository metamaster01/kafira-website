// ─────────────────────────────────────────────────────────────────
//  destinations.ts  —  all destinations, grouped by region
//
//  startingPrice and tripCount are auto-computed at the bottom
//  of trips.ts after both arrays are defined, so you never need
//  to keep them in sync manually.
//
//  URL: /destinations/india/himalayas
//       /destinations/international/europe
// ─────────────────────────────────────────────────────────────────
import type { Destination } from "./types";

const DESTINATIONS: Destination[] = [
  // ── INDIA ──────────────────────────────────────────────────────
  {
    slug: "himalayas",
    region: "india",
    name: "Himalayas",
    tagline: "Where the Earth Touches the Sky",
    description:
      "Snow peaks, ancient monasteries, high-altitude lakes, and passes that defy imagination. The Himalayas are not just a place — they are an emotion.",
    image: "/images/destinations/himalayas.jpg",
    accent: "#3db89e",
    highlights: [
      "High-altitude treks & mountain passes",
      "Ancient monasteries & remote villages",
      "Star-drenched night skies at 14,000 ft",
    ],
    bestMonths: "Jun – Oct",
    startingPrice: 0,   // auto-computed in trips.ts
    tripCount: 0,       // auto-computed in trips.ts
    featured: true,
  },
  {
    slug: "rajasthan",
    region: "india",
    name: "Rajasthan",
    tagline: "Land of Forts, Deserts & Royalty",
    description:
      "Majestic forts, camel safaris across golden dunes, vibrant bazaars, and the most photogenic palaces on earth. Rajasthan is India at its most vivid.",
    image: "/images/destinations/rajasthan.jpg",
    accent: "#f59e0b",
    highlights: [
      "Mehrangarh & Amber Fort",
      "Sam Sand Dunes camel safari",
      "Desert camp under the stars",
    ],
    bestMonths: "Oct – Mar",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "kerala",
    region: "india",
    name: "Kerala",
    tagline: "God's Own Country",
    description:
      "Misty tea estates, silent backwater canals, and sun-drenched shores. Kerala is nature at its most serene — perfect for couples, families, and solo wanderers alike.",
    image: "/images/destinations/kerala.jpg",
    accent: "#22c55e",
    highlights: [
      "Alleppey overnight houseboat",
      "Munnar sunrise tea gardens",
      "Periyar wildlife sanctuary",
    ],
    bestMonths: "Sep – Feb",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "northeast",
    region: "india",
    name: "Northeast India",
    tagline: "The Unexplored Paradise",
    description:
      "Living root bridges, crystal rivers, the wettest place on earth, and Asia's cleanest village. Northeast India is India's best-kept secret.",
    image: "/images/destinations/northeast.jpg",
    accent: "#a78bfa",
    highlights: [
      "Double-decker living root bridges",
      "Dawki crystal-clear river",
      "Mawlynnong — Asia's cleanest village",
    ],
    bestMonths: "Oct – May",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "uttarakhand",
    region: "india",
    name: "Uttarakhand",
    tagline: "The Land of Gods",
    description:
      "Devbhoomi — from the roaring rapids of Rishikesh to the snow-dusted peaks of Kedarkantha, Uttarakhand packs divine landscapes into every kilometre.",
    image: "/images/destinations/uttarakhand.jpg",
    accent: "#38bdf8",
    highlights: [
      "Kedarkantha winter summit",
      "Ganga white-water rafting",
      "Campfire under Himalayan stars",
    ],
    bestMonths: "Sep – Jun",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "karnataka",
    region: "india",
    name: "Karnataka",
    tagline: "Misty Hills & Ancient Temples",
    description:
      "Coffee-scented hills, ancient temple ruins, and verdant wildlife reserves. Karnataka is India's most underrated state.",
    image: "/images/destinations/karnataka.jpg",
    accent: "#fb923c",
    highlights: [
      "Coorg coffee estate walk",
      "Abbey Falls & Iruppu Falls",
      "Raja's Seat sunset viewpoint",
    ],
    bestMonths: "Oct – Jun",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },

  // ── INTERNATIONAL ──────────────────────────────────────────────
  {
    slug: "europe",
    region: "international",
    name: "Europe",
    tagline: "Icons, Culture & Timeless Cities",
    description:
      "Walk the Champs-Élysées, toss a coin in the Trevi Fountain, and cruise Amsterdam's canals — Europe's most iconic capitals, fully escorted and stress-free.",
    image: "/images/destinations/europe.jpg",
    accent: "#6366f1",
    highlights: [
      "Paris, Rome, Amsterdam & Barcelona",
      "Skip-the-line monument access",
      "Swiss Alps scenic rail journey",
    ],
    bestMonths: "Apr – Oct",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "southeast-asia",
    region: "international",
    name: "Southeast Asia",
    tagline: "Temples, Beaches & Street Food",
    description:
      "Ha Long Bay cruises, Bali rice terraces, Bangkok night markets, and Hoi An lantern festivals — Southeast Asia packs the world's most diverse experiences into one region.",
    image: "/images/destinations/southeast-asia.jpg",
    accent: "#f43f5e",
    highlights: [
      "Ha Long Bay luxury cruise",
      "Bali temples & Nusa Penida",
      "Phi Phi Islands & Krabi beaches",
    ],
    bestMonths: "Oct – Apr",
    startingPrice: 0,
    tripCount: 0,
    featured: true,
  },
  {
    slug: "japan",
    region: "international",
    name: "Japan",
    tagline: "Cherry Blossoms & Bullet Trains",
    description:
      "Neon skylines and bamboo groves, bullet trains and ancient shrines, Michelin-starred ramen and Mt. Fuji at dawn — Japan is unlike anywhere else on earth.",
    image: "/images/destinations/japan.jpg",
    accent: "#ec4899",
    highlights: [
      "Shinkansen bullet train pass",
      "Fushimi Inari & Arashiyama bamboo",
      "Mt. Fuji & Hakone onsen",
    ],
    bestMonths: "Mar – Apr, Oct – Nov",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
  {
    slug: "middle-east",
    region: "international",
    name: "Middle East",
    tagline: "Luxury, Desert & Heritage",
    description:
      "Scale the Burj Khalifa, ride camels at sunset over dunes, marvel at the Sheikh Zayed Grand Mosque, and cruise Dubai Creek on a traditional dhow.",
    image: "/images/destinations/middle-east.jpg",
    accent: "#d97706",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari & dune bashing",
      "Sheikh Zayed Grand Mosque",
    ],
    bestMonths: "Oct – Mar",
    startingPrice: 0,
    tripCount: 0,
    featured: false,
  },
];

export default DESTINATIONS;

// ── Helpers ───────────────────────────────────────────────────────
export const getDestination = (slug: string) =>
  DESTINATIONS.find((d) => d.slug === slug);

export const getDestinationsByRegion = (region: string) =>
  DESTINATIONS.filter((d) => d.region === region);

export const getFeaturedDestinations = () =>
  DESTINATIONS.filter((d) => d.featured);
