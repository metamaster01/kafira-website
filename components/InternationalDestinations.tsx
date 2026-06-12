// 'use client';
// // ─────────────────────────────────────────────────────
// //  InternationalDestinations.tsx
// // ─────────────────────────────────────────────────────
// import DestinationsSection from './DestinationsSection';
// import { getDestinationsByRegion } from '../data/destinations';

// const INTL_DESTINATIONS = getDestinationsByRegion('international');

// export default function InternationalDestinations() {
//   return (
//     <DestinationsSection
//       id="international-destinations"
//       regionSlug="international"
//       bannerVideo="/international-bg.mp4"
//       bannerPoster="/international-poster.jpg"
//       eyebrow="International Packages"
//       heading="International Trips"
//       subline="Discover the world, one destination at a time. Fully escorted packages across Europe, Asia & beyond."
//       exploreHref="/destinations/international"
//       destinations={INTL_DESTINATIONS}
//       accent="#2d8f7b"
//     />
//   );
// }


'use client';
// ─────────────────────────────────────────────────────
//  InternationalDestinations.tsx
// ─────────────────────────────────────────────────────
import DestinationsSection from './DestinationsSection';
import { getDestinationsByRegion } from '../data/destinations';

const INTL_DESTINATIONS = getDestinationsByRegion('international');

export default function InternationalDestinations() {
  return (
    <DestinationsSection
      id="international-destinations"
      regionSlug="international"
      bannerVideo="/international-bg.mp4"
      bannerPoster="/international-poster.jpg"
      rotateVideo={false}
      eyebrow="International Packages"
      heading="International Trips"
      subline="Discover the world, one destination at a time. Fully escorted packages across Europe, Asia & beyond."
      exploreHref="/destinations/international"
      destinations={INTL_DESTINATIONS}
      accent="#2d8f7b"
    />
  );
}

