"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import CategoryHero from "@/components/CategoryHero";
import CategoryTripsGrid from "@/components/CategoryTripsGrid";
import TRIPS from "@/data/trips";
import { Calendar } from "lucide-react";

// ─────────────────────────────────────────────────────
//  /weekend-getaways
//  Shows trips where `weekend: true`, directly as a
//  flat grid — no destination grouping.
// ─────────────────────────────────────────────────────
export default function WeekendGetawaysPage() {
  const trips = TRIPS.filter((t) => t.weekend);

  // quick stats for the hero
  const minNights = trips.length
    ? Math.min(...trips.map((t) => t.nights))
    : 0;
  const maxNights = trips.length
    ? Math.max(...trips.map((t) => t.nights))
    : 0;
  const minPrice = trips.length
    ? Math.min(...trips.map((t) => t.discountedPrice))
    : 0;

  return (
    <main style={{ background: "#f7f5f0", minHeight: "100vh" }}>
      <Navbar />

      <CategoryHero
        icon={<Calendar size={28} />}
        eyebrow="Short on Time?"
        title="Weekend"
        highlight="Getaways"
        subtitle="Quick escapes that fit into your weekend — pack light, leave Friday, come back recharged. Handpicked short trips perfect for a refreshing break."
        breadcrumbLabel="Weekend Getaways"
        stats={[
          { label: "Packages", value: `${trips.length}+` },
          {
            label: "Duration",
            value:
              trips.length > 0
                ? minNights === maxNights
                  ? `${minNights}N`
                  : `${minNights}–${maxNights}N`
                : "—",
          },
          {
            label: "Starting At",
            value: trips.length ? `₹${minPrice.toLocaleString("en-IN")}` : "—",
          },
        ]}
      />

      <CategoryTripsGrid
        trips={trips}
        heading="Pick Your Weekend Escape"
        emptyMessage="No weekend getaways available right now. Check back soon — new short trips are added regularly!"
      />

      <CTABanner />
      <Footer />
    </main>
  );
}