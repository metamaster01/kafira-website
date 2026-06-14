// import { notFound } from 'next/navigation';
// import DestinationHero from '../../../../components/DestinationHero';
// import TripsGrid from '../../../../components/TripsGrid';
// import { getDestination } from '../../../../data/destinations';
// import { getTripsByDestination } from '../../../../data/trips';
// import { destinationParams, buildBreadcrumbs } from '../../../../data/navigation';
// import type { RegionSlug } from '../../../../data/types';
// import Navbar from '@/components/Navbar';
// import CTABanner from '@/components/CTABanner';
// import Footer from '@/components/Footer';

// // ─────────────────────────────────────────────────────
// //  /destinations/[region]/[destination]
// //  e.g. /destinations/india/himalayas
// //
// //  Shows: gradient banner + description + Read More
// //         (DestinationHero)
// //         + grid of trip cards (TripsGrid)
// //
// //  Clicking a trip card opens TripModal with full
// //  itinerary, inclusions, and a WhatsApp enquiry form.
// // ─────────────────────────────────────────────────────

// // Pre-render every destination page at build time
// export function generateStaticParams() {
//   return destinationParams();
// }

// export default async function DestinationPage({
//   params,
// }: {
//   params: Promise<{ region: string; destination: string }>;
// }) {
//   const { region: regionParam, destination: destinationParam } = await params;
//   const region = regionParam as RegionSlug;
//   const slug   = destinationParam;

//   if (region !== 'india' && region !== 'international') {
//     notFound();
//   }

//   const destination = getDestination(slug);
//   if (!destination || destination.region !== region) {
//     notFound();
//   }

//   const trips = getTripsByDestination(slug);
//   const breadcrumbs = buildBreadcrumbs(region, slug);

//   // build a richer description block — combines the
//   // destination's own description with a second paragraph
//   // about flexibility, mirroring the reference copy style
//   const fullDescription = [
//     destination.description,
//     `${destination.name} packages typically range from ${
//       trips.length
//         ? `${Math.min(...trips.map(t => t.days))} to ${Math.max(...trips.map(t => t.days))} days`
//         : '3 to 12 days'
//     }, so you can always find the right trip for however much time you have. Best time to visit: ${destination.bestMonths}. Choose between a group tour or a fully personalised itinerary — either way, our team handles every detail.`,
//   ].join('\n');

//   return (
//     <main style={{ background: '#ffffff' }}>
//         <Navbar />
//       <DestinationHero
//         title={`${destination.name} Tour Packages: Best Deals & Itineraries`}
//         breadcrumbs={breadcrumbs}
//         description={fullDescription}
//       />
//       <TripsGrid
//         trips={trips}
//         destinationName={destination.name}
//       />
//       <CTABanner />
//       <Footer />
//     </main>
//   );
// }




'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import DestinationHero from '../../../../components/DestinationHero';
import TripsGrid from '../../../../components/TripsGrid';
import TripModal from '../../../../components/TripModal';
import { getDestination } from '../../../../data/destinations';
import { getTripsByDestination, getTripById } from '../../../../data/trips';
import { buildBreadcrumbs } from '../../../../data/navigation';
import type { RegionSlug, Trip } from '../../../../data/types';
import Navbar from '@/components/Navbar';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

// ─────────────────────────────────────────────────────
//  /destinations/[region]/[destination]
//
//  Two entry points:
//  1. Normal visit → show hero + trip grid
//  2. ?trip=ID     → same page + auto-open TripModal
//     (triggered when user clicks a trip from search)
// ─────────────────────────────────────────────────────

export default function DestinationPage({
  params,
}: {
  params: Promise<{ region: string; destination: string }>;
}) {
  const { region, destination: slug } = React.use(params) as {
    region: string;
    destination: string;
  };
  const regionSlug = region as RegionSlug;

  if (regionSlug !== 'india' && regionSlug !== 'international') {
    notFound();
  }

  const destination = getDestination(slug);
  if (!destination || destination.region !== region) {
    notFound();
  }

  const trips       = getTripsByDestination(slug);
  const breadcrumbs = buildBreadcrumbs(region, slug);

  const fullDescription = [
    destination.description,
    `${destination.name} packages typically range from ${
      trips.length
        ? `${Math.min(...trips.map(t => t.days))} to ${Math.max(...trips.map(t => t.days))} days`
        : '3 to 12 days'
    }, so you can always find the right trip for however much time you have. Best time to visit: ${destination.bestMonths}. Choose between a group tour or a fully personalised itinerary — either way, our team handles every detail.`,
  ].join('\n');

  // ── Read ?trip=ID from URL and auto-open modal ──────
  const searchParams  = useSearchParams();
  const [autoTrip, setAutoTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const tripId = searchParams.get('trip');
    if (!tripId) return;
    const found = getTripById(tripId);
    if (found) setAutoTrip(found);
  }, [searchParams]);

  return (
    <main style={{ background: '#ffffff' }}>
      <Navbar />
      <DestinationHero
        title={`${destination.name} Tour Packages: Best Deals & Itineraries`}
        breadcrumbs={breadcrumbs}
        description={fullDescription}
      />

      {/* TripsGrid handles card-click modals internally */}
      <TripsGrid
        trips={trips}
        destinationName={destination.name}
      />
      <CTABanner />
      <Footer />

      {/* Auto-open modal when arriving via ?trip=ID (from search) */}
      <AnimatePresence>
        {autoTrip && (
          <TripModal
            trip={autoTrip}
            onClose={() => {
              setAutoTrip(null);
              // strip the param from URL without re-navigating
              const url = new URL(window.location.href);
              url.searchParams.delete('trip');
              window.history.replaceState({}, '', url.pathname);
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}