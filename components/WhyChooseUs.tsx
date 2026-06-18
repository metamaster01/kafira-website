'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SEA    = '#2d8f7b';
const SEA_LT = '#3db89e';
const SEA_BG = 'rgba(45,143,123,0.10)';
const SEA_DK = '#1f6454';

// ── Feature cards data ────────────────────────────────
const FEATURES = [
  {
    title: 'Travel Experts',
    body:  'Our travel specialists are more than planners — they are passionate explorers who understand what makes a journey unforgettable. From crafting personalized itineraries to providing expert recommendations, they ensure every trip is seamless, exciting, and memorable.',
    icon: (
      // Airplane SVG
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={SEA_DK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2 3.5 6.5l7 3L8 12H5l-1.5 1.5 4 2 2 4L11 18l3-3.5 3 7z"/>
      </svg>
    ),
  },
  {
    title: 'Trusted Partners',
    body:  'We collaborate with carefully selected hotels, transport providers, and local experience partners to deliver comfort, reliability, and quality at every step of your journey. Our trusted network helps create worry-free travel experiences.',
    icon: (
      // Group/people SVG
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={SEA_DK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Authentic Experiences',
    body:  'We believe travel is about more than visiting places. Through local guides, cultural activities, hidden gems, and immersive experiences, we help travelers connect with destinations in meaningful and unforgettable ways.',
    icon: (
      // Luggage/camera SVG
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={SEA_DK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H5a3 3 0 0 1 0-6"/>
        <circle cx="8.5" cy="9.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
];

// ── Single feature card ───────────────────────────────
function FeatureCard({
  title, body, icon, index, inView,
}: {
  title: string; body: string; icon: React.ReactNode;
  index: number; inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.60, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.10)' }}
      style={{
        flex: '1 1 260px',
        background: '#ffffff',
        borderRadius: 18,
        padding: 'clamp(28px,3.5vw,40px) clamp(20px,3vw,32px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.30s ease',
        maxWidth: 380,
      }}
    >
      {/* hexagon icon container */}
      <div style={{
        width: 72, height: 72,
        marginBottom: 24,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {/* hexagon SVG background */}
        <svg
          width="72" height="72"
          viewBox="0 0 72 72"
          style={{ position: 'absolute', inset: 0 }}
        >
          <polygon
            points="36,4 66,20 66,52 36,68 6,52 6,20"
            fill={SEA_BG}
            stroke="rgba(45,143,123,0.18)"
            strokeWidth="1.2"
          />
        </svg>
        {/* icon centered */}
        <div style={{ position: 'relative', zIndex: 1 }}>{icon}</div>
      </div>

      {/* title */}
      <div style={{
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(20px,1.6vw,30px)',
        color: '#1f6454',
        marginBottom: 14,
        letterSpacing: '-0.01em',
      }}>
        {title}
      </div>

      {/* body */}
      <p style={{
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 300,
        fontSize: 'clamp(13px,1.1vw,14.5px)',
        color: 'black',
        lineHeight: 1.75,
        margin: 0,
        maxWidth: 300,
      }}>
        {body}
      </p>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────
export default function WhyChooseUs() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      style={{
        background: '#f4f9f8',   // cream bg matching reference
        padding: 'clamp(48px,7vw,88px) clamp(20px,5vw,48px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* optional section header — add if you want it */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(28px,4vw,48px)' }}
        >
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ height: 1.5, width: 20, background: SEA, borderRadius: 2 }}/>
            <span style={{ fontFamily: '"Outfit",sans-serif', fontSize: 9.5, fontWeight: 700, color: SEA, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              Why Choose Us
            </span>
            <div style={{ height: 1.5, width: 20, background: SEA, borderRadius: 2 }}/>
          </div> */}
          <h2 style={{
            fontFamily: '"Inter",sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(24px,4vw,46px)',
            color: '#2d8f7b',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            What Makes Us <span style={{ color: '#2d8f7b' }}>Different</span>
          </h2>
        </motion.div>

        {/* cards row */}
        <div style={{
          display: 'flex',
          gap: 'clamp(16px,2.5vw,28px)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} inView={inView}/>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');
        
      `}</style>
    </section>
  );
}
