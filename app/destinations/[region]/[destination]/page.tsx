import { notFound } from 'next/navigation';
import DestinationHero from '../../../../components/DestinationHero';
import TripsGrid from '../../../../components/TripsGrid';
import { getDestination } from '../../../../data/destinations';
import { getTripsByDestination } from '../../../../data/trips';
import { destinationParams, buildBreadcrumbs } from '../../../../data/navigation';
import type { RegionSlug } from '../../../../data/types';
import Navbar from '@/components/Navbar';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

// ─────────────────────────────────────────────────────
//  /destinations/[region]/[destination]
//  e.g. /destinations/india/himalayas
//
//  Shows: gradient banner + description + Read More
//         (DestinationHero)
//         + grid of trip cards (TripsGrid)
//
//  Clicking a trip card opens TripModal with full
//  itinerary, inclusions, and a WhatsApp enquiry form.
// ─────────────────────────────────────────────────────

// Pre-render every destination page at build time
export function generateStaticParams() {
  return destinationParams();
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ region: string; destination: string }>;
}) {
  const { region: regionParam, destination: destinationParam } = await params;
  const region = regionParam as RegionSlug;
  const slug   = destinationParam;

  if (region !== 'india' && region !== 'international') {
    notFound();
  }

  const destination = getDestination(slug);
  if (!destination || destination.region !== region) {
    notFound();
  }

  const trips = getTripsByDestination(slug);
  const breadcrumbs = buildBreadcrumbs(region, slug);

  // build a richer description block — combines the
  // destination's own description with a second paragraph
  // about flexibility, mirroring the reference copy style
  const fullDescription = [
    destination.description,
    `${destination.name} packages typically range from ${
      trips.length
        ? `${Math.min(...trips.map(t => t.days))} to ${Math.max(...trips.map(t => t.days))} days`
        : '3 to 12 days'
    }, so you can always find the right trip for however much time you have. Best time to visit: ${destination.bestMonths}. Choose between a group tour or a fully personalised itinerary — either way, our team handles every detail.`,
  ].join('\n');

  return (
    <main style={{ background: '#ffffff' }}>
        <Navbar />
      <DestinationHero
        title={`${destination.name} Tour Packages: Best Deals & Itineraries`}
        breadcrumbs={breadcrumbs}
        description={fullDescription}
      />
      <TripsGrid
        trips={trips}
        destinationName={destination.name}
      />
      <CTABanner />
      <Footer />
    </main>
  );
}