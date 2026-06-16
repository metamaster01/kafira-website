import { notFound } from 'next/navigation';
import RegionHero from '../../../components/RegionHero';
import DestinationsGrid from '../../../components/DestinationsGrid';
import { getDestinationsByRegion } from '../../../data/destinations';
import { regionParams } from '../../../data/navigation';
import type { RegionSlug } from '../../../data/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTABanner from '@/components/CTABanner';
import WhyChooseUs from '@/components/WhyChooseUs';

// ─────────────────────────────────────────────────────
//  /destinations/[region]
//  e.g. /destinations/india  or  /destinations/international
//
//  Shows: photo banner + search bar (RegionHero)
//         + grid of destination cards (DestinationsGrid)
//
//  Clicking a destination card navigates to:
//    /destinations/[region]/[destination]
// ─────────────────────────────────────────────────────

// Pre-render both region pages at build time
export function generateStaticParams(): Array<{ region: RegionSlug }> {
  return [...regionParams()];
}

// Per-region content config
const REGION_CONFIG: Record<RegionSlug, {
  title: string;
  breadcrumb: string;
  bannerImage: string;
}> = {
  india: {
    title: 'Explore India Packages',
    breadcrumb: 'India Trips',
    bannerImage: '/images/banner/client-india.avif',
  },
  international: {
    title: 'Explore International Packages',
    breadcrumb: 'International Trips',
    bannerImage: '/images/banner/client-international.jpeg',
  },
};

export default async function RegionPage({ params }: { params: any }) {
  const { region } = (await params) as { region: RegionSlug };

  if (region !== 'india' && region !== 'international') {
    notFound();
  }

  const config       = REGION_CONFIG[region];
  const destinations = getDestinationsByRegion(region);

  return (
    <main style={{ background: '#ffffff' }}>
        <Navbar />
      <RegionHero
        bannerImage={config.bannerImage}
        title={config.title}
        breadcrumbLabel={config.breadcrumb}
      />
      <DestinationsGrid
        destinations={destinations}
        regionSlug={region}
      />
      {/* <WhyChooseUs /> */}
      <CTABanner />
      <Footer />
    </main>
  );
}