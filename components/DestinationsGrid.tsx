'use client';
import { useRouter } from 'next/navigation';
import GridCard from './GridCard';
import type { Destination, RegionSlug } from '../data/types';

const SEA = '#2d8f7b';

// ─────────────────────────────────────────────────────
//  DestinationsGrid
//  Grid of destination cards for a region listing page.
//  Clicking a card navigates to /destinations/[region]/[slug]
// ─────────────────────────────────────────────────────
export default function DestinationsGrid({
  destinations,
  regionSlug,
}: {
  destinations: Destination[];
  regionSlug: RegionSlug;
}) {
  const router = useRouter();

  return (
    <section style={{ background: '#f7f5f0', padding: 'clamp(36px,5vw,64px) clamp(20px,5vw,48px) clamp(56px,7vw,90px)' }}>
      <div style={{ maxWidth: 1450, margin: '0 auto' }}>

        {/* heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,3.5vw,40px)' }}>
          <h2 style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(20px,2.8vw,32px)',
            color: '#0f2720',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            Destinations
          </h2>
        </div>

        {/* grid — 4 cols desktop, 2 cols mobile */}
        <div style={{
          display: 'grid',
          // gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'clamp(12px,2vw,20px)',
        }} className="cards-grid">
          {destinations.map((dest, i) => (
            <GridCard
              key={dest.slug}
              image={dest.image}
              title={dest.name}
              badge={`From ₹${dest.startingPrice.toLocaleString('en-IN')}`}
              index={i}
              onClick={() => router.push(`/destinations/${regionSlug}/${dest.slug}`)}
            />
          ))}
        </div>

        {destinations.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            fontFamily: '"Montserrat",sans-serif', fontSize: 14, color: 'rgba(0,0,0,0.4)',
          }}>
            No destinations found in this region yet.
          </div>
        )}
      </div>

      <style>{`
        .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(14px, 2vw, 24px);
  }

  @media (min-width: 768px) {
    .cards-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
