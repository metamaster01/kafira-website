'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const SEA    = '#2d8f7b';
const SEA_DK = '#1a6b58';

// ─────────────────────────────────────────────────────
//  DestinationHero
//  Gradient banner with title + breadcrumb, followed by
//  a centered description block with "Read More" toggle.
//  Matches reference image 1 ("International Tour Packages 2026").
// ─────────────────────────────────────────────────────
export default function DestinationHero({
  title,
  breadcrumbs,
  description,
}: {
  title: string;
  breadcrumbs: { label: string; href: string }[];
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);

  // split description into paragraphs
  const paragraphs = description.split('\n').filter(Boolean);
  const isLong = description.length > 220;

  return (
    <div style={{ background: '#ffffff' }}>
      {/* ── GRADIENT BANNER ── */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(120deg, ${SEA} 0%, ${SEA_DK} 70%, #103a32 100%)`,
        padding: 'clamp(36px,6vw,64px) clamp(20px,5vw,48px)',
        overflow: 'hidden',
      }}>
        {/* decorative tree-line texture via subtle radial shapes */}
        <div style={{ position:'absolute', inset:0, opacity:0.08, background:'repeating-linear-gradient(115deg, transparent 0 40px, rgba(255,255,255,0.4) 40px 41px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:-60, right:-60, width:220, height:220, borderRadius:'50%', background:'rgba(255,255,255,0.05)', pointerEvents:'none' }}/>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          <h1 style={{
            fontFamily: '"Inter",serif',
            fontWeight: 600,
            fontSize: 'clamp(24px,4vw,46px)',
            color: '#ffffff',
            lineHeight: 1.25,
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}>
            {title}
          </h1>

          {/* breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap',
            fontFamily: '"Inter", sans-serif',
            fontSize: 12.5, fontWeight: 600,
            color: 'rgba(255,255,255,0.78)',
          }}>
            {breadcrumbs.map((b, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && <ChevronRight size={13}/>}
                {i === breadcrumbs.length - 1 ? (
                  <span style={{ color: '#fff' }}>{b.label}</span>
                ) : (
                  <Link href={b.href} style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.78)'; }}
                  >
                    {b.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── DESCRIPTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: 'clamp(28px,5vw,48px) clamp(20px,5vw,40px) clamp(8px,2vw,16px)',
          textAlign: 'center',
        }}
      >
        <h2 style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(18px,2.4vw,26px)',
          color: '#0f2720',
          margin: '0 0 16px',
          letterSpacing: '-0.01em',
        }}>
          Best {title.split(':')[0].replace(/\d{4}/, '').trim()} Packages
        </h2>

        <div style={{
          position: 'relative',
          maxHeight: expanded || !isLong ? 'none' : 70,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(12.5px,1.1vw,14px)',
              color: 'rgba(15,39,32,0.55)',
              lineHeight: 1.8,
              margin: '0 0 10px',
            }}>
              {p}
            </p>
          ))}
          {!expanded && isLong && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
              background: 'linear-gradient(to bottom, transparent, #ffffff)',
            }}/>
          )}
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              marginTop: 14,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 22px', borderRadius: 999,
              background: `linear-gradient(135deg,${SEA},${SEA_DK})`,
              color: '#fff', border: 'none', cursor: 'pointer',
              fontFamily: '"Montserrat",sans-serif', fontSize: 12.5, fontWeight: 700,
              boxShadow: `0 4px 14px ${SEA}40`,
              transition: 'all 0.2s ease',
            }}
          >
            {expanded ? 'Show Less' : 'Read More'}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'flex' }}>
              <ChevronDown size={14}/>
            </motion.span>
          </button>
        )}
      </motion.div>
    </div>
  );
}
