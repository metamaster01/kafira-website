'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const SEA    = '#2d8f7b';
const SEA_DK = '#1a6b58';

// ─────────────────────────────────────────────────────
//  RegionHero
//  Photo banner with dark overlay + centered title +
//  breadcrumb, with a floating search bar that overlaps
//  the bottom edge of the banner.
//  Matches reference image 2 ("Explore Packages").
// ─────────────────────────────────────────────────────
export default function RegionHero({
  bannerImage,
  title,
  breadcrumbLabel,
}: {
  bannerImage: string;
  title: string;
  breadcrumbLabel: string;
}) {
  const [dest, setDest] = useState('');

  return (
    <div style={{ position: 'relative', background: '#fff' }}>
      {/* ── BANNER ── */}
      <div style={{
        position: 'relative',
        height: 'clamp(220px,32vw,340px)',
        overflow: 'hidden',
      }}>
        <img
          src={bannerImage}
          alt={title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
            (el.parentElement as HTMLDivElement).style.background =
              `linear-gradient(135deg,#0c2822,#1a4038,#0c2822)`;
          }}
        />
        {/* dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,18,16,0.50)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,18,16,0.30) 0%, rgba(8,18,16,0.55) 100%)' }}/>

        {/* content */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 20px',
          }}
        >
          <h1 style={{
            fontFamily: '"Playfair Display",serif',
            fontWeight: 800,
            fontSize: 'clamp(26px,4.5vw,46px)',
            color: '#ffffff',
            margin: '0 0 10px',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}>
            {title}
          </h1>

          {/* breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: '"Inter",sans-serif',
            fontSize: 12.5, fontWeight: 500,
            color: 'rgba(255,255,255,0.80)',
          }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.80)', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.80)'; }}
            >
              Home
            </Link>
            <ChevronRight size={13}/>
            <span style={{ color: '#fff' }}>{breadcrumbLabel}</span>
          </div>
        </motion.div>
      </div>

      {/* ── SEARCH BAR — floats over banner bottom edge ── */}
      {/* <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 clamp(16px,4vw,40px)',
        position: 'relative',
        zIndex: 5,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#ffffff',
            borderRadius: 14,
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            marginTop: 'clamp(-28px,-4vw,-30px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            overflow: 'hidden',
          }}
        >
        
          <SearchField
            icon={<MapPin size={15} color={SEA}/>}
            label="Where do you want to go?"
            value={dest}
            placeholder="Choose from Here"
            onChange={setDest}
            grow
          />
    
          <SearchField
            icon={<Calendar size={15} color={SEA}/>}
            label="Dates"
            value=""
            placeholder="DD-MM-YYYY"
            readOnly
          />
        
          <SearchField
            icon={<Users size={15} color={SEA}/>}
            label="Guests"
            value=""
            placeholder="2 Persons"
            readOnly
          />

          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg,${SEA},${SEA_DK})`,
            border: 'none', cursor: 'pointer',
            padding: '0 clamp(20px,3vw,32px)',
            margin: 'clamp(8px,1.5vw,12px)',
            borderRadius: 10,
            flexShrink: 0,
            transition: 'all 0.22s ease',
            boxShadow: `0 4px 14px ${SEA}50`,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
          >
            <Search size={17} color="#fff"/>
          </button>
        </motion.div>
      </div> */}
    </div>
  );
}

// ── Single search field ────────────────────────────────
function SearchField({
  icon, label, value, placeholder, onChange, readOnly, grow,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  grow?: boolean;
}) {
  return (
    <div style={{
      flex: grow ? '2 1 220px' : '1 1 150px',
      display: 'flex', alignItems: 'center', gap: 10,
      padding: 'clamp(12px,2vw,18px) clamp(14px,2.5vw,22px)',
      borderRight: '1px solid rgba(0,0,0,0.06)',
      minWidth: 0,
    }}>
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontFamily: '"Outfit",sans-serif',
          fontSize: 9.5, fontWeight: 700,
          color: '#0f2720',
          letterSpacing: '0.10em', textTransform: 'uppercase',
          marginBottom: 2,
        }}>
          {label}
        </div>
        {readOnly ? (
          <div style={{
            fontFamily: '"Outfit",sans-serif',
            fontSize: 12.5, color: 'rgba(0,0,0,0.40)',
          }}>
            {placeholder}
          </div>
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            onChange={e => onChange?.(e.target.value)}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontFamily: '"Outfit",sans-serif', fontSize: 12.5,
              color: '#1a1a1a', width: '100%', padding: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}
