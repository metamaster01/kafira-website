"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import CategoryHero from "@/components/CategoryHero";
import CategoryTripsGrid from "@/components/CategoryTripsGrid";
import TRIPS from "@/data/trips";
import { Users } from "lucide-react";

// ─────────────────────────────────────────────────────
//  /group-tours
//  Shows trips where `groupTour: true`, directly as a
//  flat grid — no destination grouping.
// ─────────────────────────────────────────────────────
export default function GroupToursPage() {
  const trips = TRIPS.filter((t) => t.groupTour);

  // quick stats for the hero
  const maxGroup = trips.length
    ? trips
        .map((t) => {
          const match = t.groupSize.match(/\d+/g);
          return match ? Math.max(...match.map(Number)) : 0;
        })
        .reduce((a, b) => Math.max(a, b), 0)
    : 0;

  const minPrice = trips.length
    ? Math.min(...trips.map((t) => t.discountedPrice))
    : 0;

  return (
    <main style={{ background: "#f7f5f0", minHeight: "100vh" }}>
      <Navbar />

      <CategoryHero
        icon={<Users size={28} />}
        eyebrow="Better Together"
        title="Group"
        highlight="Tours"
        subtitle="Travel with like-minded explorers on our curated group departures — make new friends, split costs, and share unforgettable memories along the way."
        breadcrumbLabel="Group Tours"
        stats={[
          { label: "Packages", value: `${trips.length}+` },
          {
            label: "Group Size",
            value: maxGroup ? `Up to ${maxGroup}` : "—",
          },
          {
            label: "Starting At",
            value: trips.length ? `₹${minPrice.toLocaleString("en-IN")}` : "—",
          },
        ]}
      />

      <CategoryTripsGrid
        trips={trips}
        heading="Join a Group Departure"
        emptyMessage="No group tours available right now. Check back soon — new departures are added regularly!"
      />

      <CTABanner />
      <Footer />
    </main>
  );
}