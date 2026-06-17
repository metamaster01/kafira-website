'use client';
// ─────────────────────────────────────────────────────
//  AllDestinations.tsx
//  Circular avatar grid — white background
//  matching the WanderOn reference screenshot (image 1)
// ─────────────────────────────────────────────────────
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DESTINATIONS from '../data/destinations';
import { DEST_ACCENT, C } from './DestinationsSection';

// Sort: featured first → india → international
const ALL = [...DESTINATIONS].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  if (a.region  !== b.region)   return a.region === 'india' ? -1 : 1;
  return 0;
});

// ── Circular avatar ────────────────────────────────────
function DestAvatar({
  dest,
  index,
}: {
  dest: (typeof DESTINATIONS)[number];
  index: number;
}) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const accent = DEST_ACCENT[dest.slug] ?? '#2d8f7b';
  const CIRCLE = 88; // px — matches reference

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.82, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.82 }}
      transition={{ duration: 0.42, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/destinations/${dest.region}/${dest.slug}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        width: CIRCLE,
      }}
    >
      {/* circle */}
      <div style={{
        width: CIRCLE, height: CIRCLE,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        border: `2.5px solid ${hov ? accent : 'rgba(0,0,0,0.10)'}`,
        boxShadow: hov
          ? `0 0 0 4px ${accent}20, 0 8px 24px rgba(0,0,0,0.18)`
          : '0 2px 10px rgba(0,0,0,0.12)',
        transform: hov ? 'translateY(-5px) scale(1.06)' : 'none',
        transition: 'all 0.30s cubic-bezier(0.22,1,0.36,1)',
        background: '#e8f0ee',
        flexShrink: 0,
      }}>
        <img
          src={dest.image}
          alt={dest.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hov ? 'scale(1.10)' : 'scale(1)',
            transition: 'transform 0.42s ease',
            display: 'block',
          }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
        />
      </div>

      {/* label */}
      <span style={{
        fontFamily: '"Inter",sans-serif',
        fontSize: 11.5, fontWeight: hov ? 600 : 500,
        color: hov ? accent : '#444',
        textAlign: 'center',
        lineHeight: 1.25,
        transition: 'color 0.22s',
        letterSpacing: '0.005em',
        userSelect: 'none',
      }}>
        {dest.name}
      </span>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────
export default function AllDestinations() {
  const [filter, setFilter] = useState<'all' | 'india' | 'international'>('all');

  const shown = filter === 'all'
    ? ALL
    : ALL.filter(d => d.region === filter);

  const tabs: { key: typeof filter; label: string }[] = [
    { key: 'all',           label: 'All' },
    { key: 'india',         label: 'India' },
    { key: 'international', label: 'International' },
  ];

  return (
    <section
      id="all-destinations"
      style={{
        background: C.bg,           // white
        padding: 'clamp(48px,6vw,80px) 0 clamp(56px,7vw,96px)',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>

        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div>
            {/* eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ height: 1.5, width: 20, background: C.sea, borderRadius: 1 }}/>
              <span style={{
                fontFamily: '"Inter",sans-serif',
                fontSize: 10, fontWeight: 700, color: C.sea,
                letterSpacing: '0.24em', textTransform: 'uppercase',
              }}>
                Where to go
              </span>
            </div>

            <h2 style={{
              fontFamily: '"Inter",sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(24px,4vw,46px)',
              color: C.text,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-0.015em',
            }}>
              All{' '}
              <span style={{ color: C.sea }}>Destinations</span>
            </h2>
          </div>

          {/* filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <motion.button
                key={t.key}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(t.key)}
                style={{
                  padding: '7px 20px',
                  borderRadius: 999,
                  fontFamily: '"Inter",sans-serif',
                  fontSize: 12, fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.20s ease',
                  outline: 'none',
                  ...(filter === t.key
                    ? {
                        background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
                        color: '#fff',
                        border: 'none',
                        boxShadow: `0 4px 14px ${C.sea}45`,
                      }
                    : {
                        background: 'transparent',
                        color: C.muted,
                        border: `1.5px solid rgba(0,0,0,0.14)`,
                      }
                  ),
                }}
              >
                {t.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── avatar grid ── */}
        <motion.div
          layout
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            // gap matches reference — generous horizontal, tighter vertical
            rowGap: 'clamp(22px,3.5vw,36px)',
            columnGap: 'clamp(16px,3vw,40px)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {shown.map((dest, i) => (
              <DestAvatar key={dest.slug} dest={dest} index={i}/>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* count line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: 36,
            paddingTop: 20,
            borderTop: '1px solid rgba(0,0,0,0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{
            fontFamily: '"Montserrat",sans-serif',
            fontSize: 12, color: 'rgba(0,0,0,0.38)',
          }}>
            {shown.length} destination{shown.length !== 1 ? 's' : ''}
            {filter !== 'all' && ` · ${filter === 'india' ? 'India' : 'International'}`}
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,rgba(0,0,0,0.07),transparent)' }}/>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@300;400;500;700&display=swap');
       
      `}</style>
    </section>
  );
}
