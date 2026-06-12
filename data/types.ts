// ─────────────────────────────────────────────────────────────────
//  types.ts  —  shared interfaces for destinations + trips
// ─────────────────────────────────────────────────────────────────

// ── Region ────────────────────────────────────────────────────────
// Top-level grouping shown as tabs / filter on the Destinations page.
// e.g.  "india"  |  "international"
export type RegionSlug = "india" | "international";

export interface Region {
  slug: RegionSlug;
  label: string;           // "India"  |  "International"
  description: string;
}

// ── Destination ───────────────────────────────────────────────────
// Second level — e.g. "himalayas", "kerala", "europe", "bali"
// URL pattern:  /destinations/[regionSlug]/[destinationSlug]
export interface Destination {
  slug: string;
  region: RegionSlug;      // which region this belongs to
  name: string;
  tagline: string;
  description: string;
  image: string;           // /public/images/destinations/<slug>.jpg
  accent: string;          // hex — used for UI highlights
  highlights: string[];    // 3 short bullet points (card hover)
  bestMonths: string;      // "Jun – Oct"
  startingPrice: number;   // auto-set from trips below
  tripCount: number;       // auto-set from trips below
  featured: boolean;       // show on homepage destinations strip
}

// ── Trip ──────────────────────────────────────────────────────────
// Leaf level — e.g. "spiti-road-trip"
// URL pattern:  /destinations/[regionSlug]/[destinationSlug]/[tripId]
export interface TripDay {
  day: number;
  title: string;
  activities: string[];
}

export type TripCategory = "adventure" | "cultural" | "nature" | "road-trip" | "trek";
export type TripDifficulty = "Easy" | "Moderate" | "Challenging" | "Extreme";

export interface Trip {
  id: string;
  destinationSlug: string;   // foreign key → Destination.slug
  region: RegionSlug;        // denormalised for easy filtering
  featured: boolean;                 // shown on homepage UpcomingTrips
  weekend?: boolean;                 // shown on homepage WeekendTrips — default: false
  groupTour?: boolean;         // shown on homepage GroupTours

  name: string;
  subtitle: string;
  image: string;             // /public/images/trips/<id>.jpg
  category: TripCategory;
  difficulty: TripDifficulty;
  location: string;          // human label e.g. "Delhi to Delhi"
  state: string;             // "Himachal Pradesh" | "International"
  duration: string;          // "7N/8D"
  nights: number;
  days: number;
  months: string;            // "Jun – Oct"
  monthTags: string[];       // ["Jun","Jul","Aug","Sep","Oct"]
  groupSize: string;         // "10 – 20"
  minAge: number;

  originalPrice: number;
  discountedPrice: number;
  discountLabel: string;

  rating: number;
  reviews: string;
  tags: string[];

  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TripDay[];

  meetingPoint: string;
  endPoint: string;
  thingsToCarry: string[];
  terms: string[];
}
