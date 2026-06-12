// 'use client';
// // ─────────────────────────────────────────────────────
// //  IndianDestinations.tsx
// // ─────────────────────────────────────────────────────
// import DestinationsSection from './DestinationsSection';
// import { getDestinationsByRegion } from '../data/destinations';

// const INDIA_DESTINATIONS = getDestinationsByRegion('india');

// export default function IndianDestinations() {
//   return (
//     <DestinationsSection
//       id="india-destinations"
//       regionSlug="india"
//       bannerVideo="/india-bg.mp4"
//       bannerPoster="/india-poster.jpg"
//       eyebrow="Explore India"
//       heading="India Trips"
//       subline="From snow-capped Himalayan passes to tropical backwaters — India holds every kind of adventure within its borders."
//       exploreHref="/destinations/india"
//       destinations={INDIA_DESTINATIONS}
//       accent="#2d8f7b"
//     />
//   );
// }



'use client';
// ─────────────────────────────────────────────────────
//  IndianDestinations.tsx
//  rotateVideo=true → rotates portrait video 90deg
//  which converts it to landscape orientation
// ─────────────────────────────────────────────────────
import DestinationsSection from './DestinationsSection';
import { getDestinationsByRegion } from '../data/destinations';

const INDIA_DESTINATIONS = getDestinationsByRegion('india');

export default function IndianDestinations() {
  return (
    <DestinationsSection
      id="india-destinations"
      regionSlug="india"
      bannerVideo="/india-bg.mp4"
      bannerPoster="/india-poster.jpg"
      rotateVideo={false}
      eyebrow="Explore India"
      heading="India Trips"
      subline="From snow-capped Himalayan passes to tropical backwaters — India holds every kind of adventure within its borders."
      exploreHref="/destinations/india"
      destinations={INDIA_DESTINATIONS}
      accent="#2d8f7b"
    />
  );
}