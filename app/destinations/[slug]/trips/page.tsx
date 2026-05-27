'use client';
// ──────────────────────────────────────────────────────────────────
//  /destination/[slug]/trips/page.tsx
//  Shows all trips for a given destination, with filters + TripModal
// ──────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, Clock, MapPin, Users, Star, Calendar,
  ArrowRight, Mountain, Compass, Trees, Globe2, Filter, X,
} from 'lucide-react';
import TRIPS, { DESTINATIONS, getTripsByDestination, getDestination } from '../../../../data/upcomingTrips';
import type { Trip, Destination } from '../../../../data/upcomingTrips';
import TripModal, { C, DIFF_COLOR } from '../../../../components/TripModal';  // adjust path as needed
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

// ── Category icon ──────────────────────────────────────
function CatIcon({ cat, size = 13 }: { cat: string; size?: number }) {
  const p = { size, strokeWidth: 1.8 };
  if (cat === 'trek')      return <Mountain {...p}/>;
  if (cat === 'road-trip') return <Compass {...p}/>;
  if (cat === 'nature')    return <Trees {...p}/>;
  if (cat === 'cultural')  return <Globe2 {...p}/>;
  return <Compass {...p}/>;
}

// ── Trip card — matches AllTrips design ───────────────
function TripCard({ trip, accent, onClick }: { trip: Trip; accent: string; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 24, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        background: C.white,
        border: `1px solid ${hover ? accent + '55' : C.border}`,
        cursor: 'pointer',
        transition: 'all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: hover ? 'translateY(-7px)' : 'none',
        boxShadow: hover
          ? `0 20px 48px ${accent}22, 0 0 0 1px ${accent}44`
          : '0 3px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* image */}
      <div style={{ position: 'relative', height: 196, overflow: 'hidden', background: `linear-gradient(145deg,${accent}22,#0a2520)` }}>
        <img
          src={trip.image} alt={trip.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.55s ease', transform: hover ? 'scale(1.07)' : 'scale(1)' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.08) 55%,transparent 100%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top,${accent}33,transparent 55%)`, opacity: hover ? 1 : 0, transition: 'opacity 0.35s', pointerEvents: 'none' }}/>

        {/* badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '3px 9px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <CatIcon cat={trip.category} size={10}/>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 600, color: '#fff', textTransform: 'capitalize' }}>{trip.category.replace('-', ' ')}</span>
          </div>
          <div style={{ background: DIFF_COLOR[trip.difficulty], borderRadius: 999, padding: '3px 9px', fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 700, color: '#fff' }}>{trip.difficulty}</div>
        </div>

        <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={10} color="rgba(255,255,255,0.85)"/>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{trip.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: `${accent}dd`, borderRadius: 999, padding: '2px 7px' }}>
            <Star size={9} fill="#fff" color="#fff"/>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 700, color: '#fff' }}>{trip.rating}</span>
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ padding: '14px 16px' }}>
        <h3 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 16, color: C.text, lineHeight: 1.2, marginBottom: 2 }}>{trip.name}</h3>
        <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted, lineHeight: 1.35, marginBottom: 10 }}>{trip.subtitle}</p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          {[
            { icon: <Clock size={11}/>, text: trip.duration },
            { icon: <Calendar size={11}/>, text: trip.months },
            { icon: <Users size={11}/>, text: trip.groupSize },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ color: accent }}>{m.icon}</span>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: C.sub }}>{m.text}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
          {trip.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 500,
              color: accent, background: accent + '18',
              border: `1px solid ${accent}44`, borderRadius: 999, padding: '2px 7px',
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ height: 1, background: C.border, marginBottom: 10 }}/>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#ef4444', borderRadius: 5, padding: '1px 6px', fontFamily: 'Outfit,sans-serif', fontSize: 8, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{trip.discountLabel}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted, textDecoration: 'line-through' }}>₹{trip.originalPrice.toLocaleString('en-IN')}</span>
              <span style={{ fontFamily: '"Playfair Display",serif', fontWeight: 800, fontSize: 18, color: C.text }}>₹{trip.discountedPrice.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, color: C.muted }}>per person</div>
          </div>

          <button style={{
            padding: '9px 15px', borderRadius: 11,
            background: hover ? `linear-gradient(135deg,${accent},${accent}cc)` : `${accent}18`,
            border: `1.5px solid ${hover ? 'transparent' : accent + '44'}`,
            color: hover ? '#fff' : accent,
            fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            transition: 'all 0.25s',
            boxShadow: hover ? `0 6px 18px ${accent}44` : 'none',
          }}>
            View <ArrowRight size={12}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Filter pill ────────────────────────────────────────
function FilterPill({ label, active, accent, onClick }: { label: string; active: boolean; accent: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 16px', borderRadius: 999,
        background: active ? `linear-gradient(135deg,${accent},${accent}cc)` : C.white,
        border: `1.5px solid ${active ? 'transparent' : C.border}`,
        color: active ? '#fff' : C.sub,
        fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: active ? 700 : 500,
        cursor: 'pointer', transition: 'all 0.22s',
        boxShadow: active ? `0 4px 14px ${accent}44` : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

// ── Hero for the destination ───────────────────────────
function DestHero({ dest }: { dest: Destination }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
  }, []);

  return (
    <div style={{
      position: 'relative',
      height: 'clamp(280px,40vw,440px)',
      overflow: 'hidden',
      background: `linear-gradient(135deg,${C.text},#1a4a3d,${dest.accent}33)`,
    }}>
      <img
        src={dest.image} alt={dest.name}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.5) saturate(1.1)' }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(7,26,22,0.85) 0%,rgba(7,26,22,0.35) 60%,transparent 100%)' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(7,26,22,0.55) 0%,transparent 55%)' }}/>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 50%,${dest.accent}22,transparent 60%)` }}/>

      {/* decorative grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }}/>

      <div ref={ref} style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(20px,4vw,56px) clamp(16px,5vw,64px) clamp(24px,4vw,48px)', maxWidth: 1280, margin: '0 auto' }}>
        {/* back link */}
        <Link href="/destination" style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 16,
          fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 600,
          color: 'rgba(180,230,220,0.7)', textDecoration: 'none',
          transition: 'color 0.2s',
        }}>
          <ChevronLeft size={14}/> All Destinations
        </Link>

        {/* eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ height: 1, width: 22, background: `linear-gradient(to right,transparent,${dest.accent})` }}/>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: dest.accent, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {dest.tagline}
          </span>
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display",serif',
          fontWeight: 800,
          fontSize: 'clamp(32px,5vw,64px)',
          lineHeight: 1.04,
          color: '#e8f7f4',
          letterSpacing: '-0.01em',
          marginBottom: 10,
        }}>
          {dest.name}
        </h1>

        <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(13px,1.4vw,15px)', color: 'rgba(180,220,210,0.7)', lineHeight: 1.65, maxWidth: 460 }}>
          {dest.description}
        </p>

        {/* stats */}
        <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
          {[
            { val: dest.tripCount,      label: 'Packages' },
            { val: dest.bestMonths,     label: 'Best Season' },
            { val: `₹${dest.startingPrice.toLocaleString('en-IN')}+`, label: 'Starting From' },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${dest.accent}66`, paddingLeft: 12 }}>
              <div style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 18, color: '#fff' }}>{s.val}</div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: 'rgba(180,210,200,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────
export default function DestinationTripsPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : (params?.slug as string[])?.[0] ?? '';

  const dest = getDestination(slug);
  const allTrips = getTripsByDestination(slug);

  const [selected, setSelected] = useState<Trip | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const accent = dest?.accent ?? C.sea;

  // collect unique categories & difficulties for this destination
  const categories  = ['All', ...Array.from(new Set(allTrips.map(t => t.category)))];
  const difficulties = ['All', ...Array.from(new Set(allTrips.map(t => t.difficulty)))];

  const filtered = allTrips.filter(t => {
    const catOk  = activeCategory  === 'All' || t.category   === activeCategory;
    const diffOk = activeDifficulty === 'All' || t.difficulty === activeDifficulty;
    return catOk && diffOk;
  });

  // 404 guard
  if (!dest) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit,sans-serif', color: C.muted }}>
        Destination not found. <Link href="/destination" style={{ color: C.sea, marginLeft: 8 }}>← Back</Link>
      </div>
    );
  }

  return (
    <>
    <div>
    <Navbar />
      <DestHero dest={dest}/>

      <section style={{ background: C.bg, padding: '56px 0 96px', minHeight: '60vh' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }}>

          {/* Filter bar */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,28px)', color: C.text, lineHeight: 1.1 }}>
                  {filtered.length} {filtered.length === 1 ? 'Package' : 'Packages'}{' '}
                  <span style={{ fontStyle: 'italic', color: accent }}>in {dest.name}</span>
                </div>
              </div>

              {/* filter toggle (mobile) */}
              <button
                onClick={() => setShowFilters(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 10,
                  background: showFilters ? accent : C.white,
                  border: `1.5px solid ${showFilters ? 'transparent' : C.border}`,
                  color: showFilters ? '#fff' : C.sub,
                  fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.22s',
                }}
              >
                {showFilters ? <X size={14}/> : <Filter size={14}/>}
                Filters
              </button>
            </div>

            {/* filter pills */}
            <div style={{
              display: showFilters ? 'flex' : 'none',
              flexWrap: 'wrap', gap: 8, paddingTop: 8,
              borderTop: `1px solid ${C.border}`,
            }}
              className="filter-row"
            >
              {/* category */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 2 }}>Type</span>
                {categories.map(cat => (
                  <FilterPill key={cat} label={cat.replace('-', ' ')} active={activeCategory === cat} accent={accent} onClick={() => setActiveCategory(cat)}/>
                ))}
              </div>

              <div style={{ width: 1, background: C.border, alignSelf: 'stretch', margin: '0 4px' }}/>

              {/* difficulty */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 2 }}>Difficulty</span>
                {difficulties.map(d => (
                  <FilterPill key={d} label={d} active={activeDifficulty === d} accent={accent} onClick={() => setActiveDifficulty(d)}/>
                ))}
              </div>
            </div>

            {/* always-visible quick pills (category only) */}
            <div className="quick-pills" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: showFilters ? 0 : 0 }}>
              {categories.map(cat => (
                <FilterPill key={cat} label={cat.replace('-', ' ')} active={activeCategory === cat} accent={accent} onClick={() => setActiveCategory(cat)}/>
              ))}
            </div>
          </div>

          {/* Trip grid — 3 cols */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', fontFamily: 'Outfit,sans-serif', color: C.muted, fontSize: 15 }}>
              No trips match your filters.
              <button onClick={() => { setActiveCategory('All'); setActiveDifficulty('All'); }} style={{ display: 'block', margin: '12px auto 0', color: accent, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Outfit,sans-serif' }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="trips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
              {filtered.map(trip => (
                <TripCard key={trip.id} trip={trip} accent={accent} onClick={() => setSelected(trip)}/>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      </div>

      {selected && <TripModal trip={selected} onClose={() => setSelected(null)}/>}

      <style>{`
        .filter-row  { display: flex !important; }
        .quick-pills { display: flex; margin-top: 12px; }
        @media (max-width:1100px) { .trips-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:600px)  { .trips-grid { grid-template-columns: 1fr !important; }
                                    .quick-pills { display: none !important; }
                                    .filter-row  { display: flex !important; } }
      `}</style>
    </>
  );
}