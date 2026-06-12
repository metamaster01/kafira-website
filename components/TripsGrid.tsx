"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GridCard from "./GridCard";
import TripModal from "./TripModal";
import type { Trip } from "../data/types";

// ─────────────────────────────────────────────────────
//  TripsGrid
//  Grid of trip cards for a destination's trips page
//  (e.g. /destinations/india/himalayas).
//  Clicking a card opens the TripModal with that trip's
//  full details — no navigation, modal overlay only.
// ─────────────────────────────────────────────────────
export default function TripsGrid({
  trips,
  destinationName,
}: {
  trips: Trip[];
  destinationName: string;
}) {
  const [selected, setSelected] = useState<Trip | null>(null);

  return (
    <section
      style={{
        background: "#f7f5f0",
        padding:
          "clamp(36px,5vw,64px) clamp(20px,5vw,48px) clamp(56px,7vw,90px)",
      }}
    >
      <div style={{ maxWidth: 1450, margin: "0 auto" }}>
        {/* heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(24px,3.5vw,40px)",
          }}
        >
          <h2
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: "clamp(20px,2.8vw,32px)",
              color: "#0f2720",
              margin: "0 0 8px",
              letterSpacing: "-0.01em",
            }}
          >
            Trips in {destinationName}
          </h2>
          <p
            style={{
              fontFamily: '"Outfit",sans-serif',
              fontSize: 13,
              color: "rgba(15,39,32,0.45)",
              margin: 0,
            }}
          >
            {trips.length} curated {trips.length === 1 ? "package" : "packages"}{" "}
            to choose from
          </p>
        </div>

        {/* grid — 4 cols desktop, 2 cols mobile */}
        <div
          style={{
            display: "grid",
            // gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',

            gap: "clamp(12px,2vw,20px)",
          }}
          className="cards-grid"
        >
          {trips.map((trip, i) => (
            <GridCard
              key={trip.id}
              image={trip.image}
              title={trip.name}
              subtitle={trip.duration}
              badge={`₹${trip.discountedPrice.toLocaleString("en-IN")}/-`}
              index={i}
              onClick={() => setSelected(trip)}
            />
          ))}
        </div>

        {trips.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              fontFamily: '"Outfit",sans-serif',
              fontSize: 14,
              color: "rgba(0,0,0,0.4)",
            }}
          >
            No trips available for {destinationName} yet. Check back soon!
          </div>
        )}
      </div>

      {/* Trip detail modal */}
      <AnimatePresence>
        {selected && (
          <TripModal trip={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <style>
        {`
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
      `}
      </style>
    </section>
  );
}
