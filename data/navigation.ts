// ─────────────────────────────────────────────────────────────────
//  navigation.ts  —  URL builders & Next.js path generators
//
//  URL structure
//  ─────────────────────────────────────────────────────────────────
//  /destinations                                  → all regions + destinations
//  /destinations/india                            → India region page
//  /destinations/india/himalayas                  → Himalayas destination page
//  /destinations/india/himalayas/spiti-road-trip  → Trip detail
//
//  International follows the same pattern:
//  /destinations/international/europe/european-highlights
// ─────────────────────────────────────────────────────────────────
import DESTINATIONS from "./destinations";
import TRIPS from "./trips";
import type { RegionSlug } from "./types";

// ── URL builders ──────────────────────────────────────────────────

export const urlRegion = (region: RegionSlug) =>
  `/destinations/${region}`;

export const urlDestination = (region: RegionSlug, destinationSlug: string) =>
  `/destinations/${region}/${destinationSlug}`;

export const urlTrip = (
  region: RegionSlug,
  destinationSlug: string,
  tripId: string
) => `/destinations/${region}/${destinationSlug}/${tripId}`;

// ── Breadcrumb builder ────────────────────────────────────────────
// Returns an array of { label, href } ready to render as breadcrumbs.

export function buildBreadcrumbs(
  region: RegionSlug,
  destinationSlug?: string,
  tripId?: string
) {
  const crumbs: { label: string; href: string }[] = [
    { label: "Destinations", href: "/destinations" },
    { label: region === "india" ? "India" : "International", href: urlRegion(region) },
  ];

  if (destinationSlug) {
    const dest = DESTINATIONS.find((d) => d.slug === destinationSlug);
    if (dest) {
      crumbs.push({ label: dest.name, href: urlDestination(region, destinationSlug) });
    }
  }

  if (destinationSlug && tripId) {
    const trip = TRIPS.find((t) => t.id === tripId);
    if (trip) {
      crumbs.push({
        label: trip.name,
        href: urlTrip(region, destinationSlug, tripId),
      });
    }
  }

  return crumbs;
}

// ── Next.js generateStaticParams helpers ─────────────────────────
// Drop these directly into your page.tsx files.

/** /destinations/[region] */
export function regionParams() {
  return [{ region: "india" }, { region: "international" }] as const;
}

/** /destinations/[region]/[destination] */
export function destinationParams() {
  return DESTINATIONS.map((d) => ({
    region: d.region,
    destination: d.slug,
  }));
}

/** /destinations/[region]/[destination]/[tripId] */
export function tripParams() {
  return TRIPS.map((t) => {
    const dest = DESTINATIONS.find((d) => d.slug === t.destinationSlug);
    return {
      region: t.region,
      destination: t.destinationSlug,
      tripId: t.id,
    };
  });
}
