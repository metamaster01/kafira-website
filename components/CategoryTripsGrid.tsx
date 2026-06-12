"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridCard from "./GridCard";
import TripModal from "./TripModal";
import type { Trip } from "../data/types";

// ─────────────────────────────────────────────────────
//  CategoryTripsGrid
//  Generic grid of trip cards for category-based pages
//  (Weekend Getaways, Group Tours, etc.) where trips are
//  shown directly — no destination grouping.
//
//  Grid: 2 cols on mobile, 4 cols from 768px up.
// ─────────────────────────────────────────────────────
export default function CategoryTripsGrid({
  trips,
  heading,
  subheading,
  emptyMessage,
}: {
  trips: Trip[];
  heading: string;
  subheading?: string;
  emptyMessage: string;
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
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            {heading}
          </h2>
          <p
            style={{
              fontFamily: '"Outfit",sans-serif',
              fontSize: 13,
              color: "rgba(15,39,32,0.45)",
              margin: 0,
            }}
          >
            {subheading ??
              `${trips.length} curated ${
                trips.length === 1 ? "package" : "packages"
              } to choose from`}
          </p>
        </motion.div>

        {/* grid — 2 cols mobile, 4 cols desktop */}
        <div className="cards-grid">
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
            {emptyMessage}
          </div>
        )}
      </div>

      {/* Trip detail modal */}
      <AnimatePresence>
        {selected && (
          <TripModal trip={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

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
      `}</style>
    </section>
  );
}
