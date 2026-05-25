'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search, X, Clock, MapPin, Users, Star, Calendar,
  ArrowRight, Mountain, Compass, Palmtree, Camera,
  SlidersHorizontal, ChevronDown,
} from 'lucide-react';
import TRIPS from '../../data/upcomingTrips';
import type { Trip } from '../../data/upcomingTrips';
import TripModal, { C, DIFF_COLOR } from '../../components/TripModal';
import Navbar from '@/components/Navbar';
import InternationalTrips from '@/components/InternationalTrips';
import MemoriesSection from '@/components/MemoriesSection';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

// ── Category icon ─────────────────────────────────────
function CatIcon({ cat, size = 11 }: { cat: string; size?: number }) {
  const p = { size, strokeWidth: 1.8 };
  if (cat === 'trek')      return <Mountain {...p}/>;
  if (cat === 'road-trip') return <Compass {...p}/>;
  if (cat === 'nature')    return <Palmtree {...p}/>;
  if (cat === 'cultural')  return <Camera {...p}/>;
  return <Compass {...p}/>;
}

// ── Filter options ────────────────────────────────────
const DURATIONS = [
  { label: 'All',        fn: (_: Trip) => true },
  { label: 'Weekend (≤4D)', fn: (t: Trip) => t.days <= 4 },
  { label: 'Short (5–7D)', fn: (t: Trip) => t.days >= 5 && t.days <= 7 },
  { label: 'Week+ (8–12D)', fn: (t: Trip) => t.days >= 8 && t.days <= 12 },
  { label: 'Long (13D+)', fn: (t: Trip) => t.days >= 13 },
];

const TRAVEL_TYPES = ['All', 'trek', 'road-trip', 'nature', 'cultural', 'adventure'];

const BUDGETS = [
  { label: 'All',          fn: (_: Trip) => true },
  { label: 'Under ₹10K',  fn: (t: Trip) => t.discountedPrice < 10000 },
  { label: '₹10K–₹25K',  fn: (t: Trip) => t.discountedPrice >= 10000 && t.discountedPrice <= 25000 },
  { label: '₹25K–₹60K',  fn: (t: Trip) => t.discountedPrice > 25000 && t.discountedPrice <= 60000 },
  { label: 'Above ₹60K',  fn: (t: Trip) => t.discountedPrice > 60000 },
];

// collect unique states/regions
const ALL_DESTINATIONS = ['All', ...Array.from(new Set(TRIPS.map(t => t.state))).sort()];

// ── Pill filter tab ───────────────────────────────────
function FilterPill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 18px', borderRadius: 999,
        border: active ? 'none' : `1.5px solid ${C.border}`,
        background: active ? `linear-gradient(135deg,${C.sea},${C.seaDk})` : C.white,
        color: active ? '#fff' : C.sub,
        fontFamily: '"Montserrat",sans-serif',
        fontSize: 12, fontWeight: 600,
        cursor: 'pointer', whiteSpace: 'nowrap',
        boxShadow: active ? `0 4px 14px rgba(45,143,123,0.3)` : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.22s ease',
        transform: active ? 'scale(1.04)' : 'scale(1)',
      }}
      onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = C.seaBd; el.style.color = C.sea; } }}
      onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = C.border; el.style.color = C.sub; } }}
    >
      {label}
    </button>
  );
}

// ── Dropdown filter ───────────────────────────────────
function FilterDropdown({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const isActive = value !== 'All' && value !== '';

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '9px 16px', borderRadius: 999,
          border: `1.5px solid ${isActive ? C.sea : C.border}`,
          background: isActive ? C.seaBg : C.white,
          color: isActive ? C.sea : C.sub,
          fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', whiteSpace: 'nowrap',
          boxShadow: isActive ? `0 0 0 2px ${C.seaBd}` : '0 1px 4px rgba(0,0,0,0.05)',
          transition: 'all 0.22s',
        }}
      >
        {label}{isActive ? `: ${value}` : ''}
        <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', color: C.muted }}/>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 100,
          background: C.white, border: `1.5px solid ${C.seaBd}`,
          borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(14,30,27,0.14)',
          minWidth: 180,
        }}>
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none',
                background: value === opt ? C.seaBg : 'transparent',
                fontFamily: '"Montserrat",sans-serif', fontSize: 13,
                color: value === opt ? C.sea : C.sub,
                fontWeight: value === opt ? 600 : 400,
                cursor: 'pointer', transition: 'background 0.15s',
                borderBottom: `1px solid ${C.border}`,
              }}
              onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = C.seaBg; }}
              onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Trip Card ─────────────────────────────────────────
function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 95%', once: true } }
    );
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 18, overflow: 'hidden',
        background: C.white,
        border: `1.5px solid ${hover ? C.seaBd : C.border}`,
        cursor: 'pointer',
        transition: 'all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover
          ? `0 20px 48px rgba(45,143,123,0.14), 0 0 0 1px ${C.seaBd}`
          : '0 3px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* image */}
      <div style={{ position: 'relative', height: 190, overflow: 'hidden', background: 'linear-gradient(145deg,#0a2520,#0d3028)', flexShrink: 0 }}>
        <img
          src={trip.image} alt={trip.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hover ? 'scale(1.07)' : 'scale(1)' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.08) 55%,transparent 100%)', pointerEvents: 'none' }}/>

        {/* top badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '3px 9px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <CatIcon cat={trip.category} size={11}/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 600, color: '#fff', textTransform: 'capitalize' }}>{trip.category.replace('-', ' ')}</span>
          </div>
          <div style={{ background: DIFF_COLOR[trip.difficulty], borderRadius: 999, padding: '3px 9px', fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 700, color: '#fff' }}>{trip.difficulty}</div>
        </div>

        <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={10} color="rgba(255,255,255,0.85)"/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{trip.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: `${C.sea}dd`, borderRadius: 999, padding: '2px 7px' }}>
            <Star size={9} fill="#fff" color="#fff"/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 700, color: '#fff' }}>{trip.rating}</span>
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ padding: '14px 16px' }}>
        <h3 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 15, color: C.text, lineHeight: 1.2, marginBottom: 2 }}>{trip.name}</h3>
        <p style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, color: C.muted, lineHeight: 1.35, marginBottom: 10, fontWeight: 400 }}>{trip.subtitle}</p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          {[
            { icon: <Clock size={11}/>,    text: trip.duration },
            { icon: <Calendar size={11}/>, text: trip.months  },
            { icon: <Users size={11}/>,    text: trip.groupSize },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ color: C.sea }}>{m.icon}</span>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, color: C.sub }}>{m.text}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
          {trip.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 600, color: C.seaDk, background: C.seaBg, border: `1px solid ${C.seaBd}`, borderRadius: 999, padding: '2px 7px' }}>{tag}</span>
          ))}
        </div>

        <div style={{ height: 1, background: C.border, marginBottom: 10 }}/>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#ef4444', borderRadius: 5, padding: '1px 6px', fontFamily: '"Montserrat",sans-serif', fontSize: 8, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{trip.discountLabel}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, color: C.muted, textDecoration: 'line-through' }}>₹{trip.originalPrice.toLocaleString('en-IN')}</span>
              <span style={{ fontFamily: '"Playfair Display",serif', fontWeight: 800, fontSize: 17, color: C.text }}>₹{trip.discountedPrice.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, color: C.muted }}>per person</div>
          </div>

          <button style={{
            padding: '8px 14px', borderRadius: 10,
            background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
            color: '#fff', fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 700,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            transition: 'box-shadow 0.25s',
            boxShadow: hover ? `0 5px 16px ${C.sea}55` : 'none',
          }}>
            View <ArrowRight size={12}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Tours Page ───────────────────────────────────
export default function ToursPage() {
  const [query,       setQuery]       = useState('');
  const [destination, setDestination] = useState('All');
  const [durationIdx, setDurationIdx] = useState(0);
  const [travelType,  setTravelType]  = useState('All');
  const [budgetIdx,   setBudgetIdx]   = useState(0);
  const [selected,    setSelected]    = useState<Trip | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const headRef   = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  // heading reveal
  useEffect(() => {
    const el = headRef.current; if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  // filter + search logic
  const filtered = useMemo(() => {
    let list = TRIPS;

    // text search — name, location, state, tags, subtitle
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.state.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
      );
    }

    // destination filter
    if (destination !== 'All') {
      list = list.filter(t => t.state === destination);
    }

    // duration filter
    list = list.filter(DURATIONS[durationIdx].fn);

    // travel type
    if (travelType !== 'All') {
      list = list.filter(t => t.category === travelType);
    }

    // budget
    list = list.filter(BUDGETS[budgetIdx].fn);

    return list;
  }, [query, destination, durationIdx, travelType, budgetIdx]);

  const hasFilters = query || destination !== 'All' || durationIdx !== 0 || travelType !== 'All' || budgetIdx !== 0;

  const clearAll = () => {
    setQuery(''); setDestination('All');
    setDurationIdx(0); setTravelType('All'); setBudgetIdx(0);
  };

  return (
    <>
      <main style={{ background: C.bg, minHeight: '100vh' }}>
        <Navbar />

        {/* ── HERO HEADER ── */}
        <div style={{
          background: `#071a16`,
          position: 'relative', overflow: 'hidden',
          padding: 'clamp(80px,10vw,130px) 24px clamp(56px,8vw,100px)',
          textAlign: 'center',
        }}>
          {/* orbs */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-15%', left: '5%',  width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(45,143,123,0.2) 0%,transparent 65%)' }}/>
            <div style={{ position: 'absolute', bottom: '-15%', right: '5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(61,184,158,0.14) 0%,transparent 65%)' }}/>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(to right,transparent,${C.sea},transparent)`, opacity: 0.4 }}/>
          </div>

          <div ref={headRef} style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
            {/* eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ height: 1, width: 24, background: `linear-gradient(to right,transparent,${C.seaLt})` }}/>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.seaLt, letterSpacing: '0.26em', textTransform: 'uppercase' }}>All Trips & Packages</span>
              <div style={{ height: 1, width: 24, background: `linear-gradient(to left,transparent,${C.seaLt})` }}/>
            </div>

            {/* title */}
            <h1 style={{
              fontFamily: '"Playfair Display",serif',
              fontWeight: 800,
              fontSize: 'clamp(32px,5.5vw,66px)',
              lineHeight: 1.05,
              color: '#e8f7f4',
              marginBottom: 14,
              letterSpacing: '-0.01em',
            }}>
              Explore The World With{' '}
              <span style={{ fontStyle: 'italic', color: C.seaLt, display: 'block' }}>Perfect Tours</span>
            </h1>

            <p style={{
              fontFamily: '"Montserrat",sans-serif', fontWeight: 400,
              fontSize: 'clamp(13px,1.4vw,16px)',
              color: 'rgba(180,230,220,0.62)',
              lineHeight: 1.72, marginBottom: 28,
            }}>
              Discover handpicked destinations, unforgettable experiences, and affordable travel packages designed for every traveler.
            </p>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#trips-grid" style={{
                padding: '12px 28px', borderRadius: 999,
                background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
                color: '#fff', fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 700,
                textDecoration: 'none', boxShadow: `0 6px 20px rgba(45,143,123,0.38)`,
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 12px 30px rgba(45,143,123,0.5)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = `0 6px 20px rgba(45,143,123,0.38)`; }}
              >
                Explore Destinations
              </a>
              <a href="/contact" style={{
                padding: '12px 24px', borderRadius: 999,
                background: 'transparent',
                border: `1.5px solid rgba(45,143,123,0.4)`,
                color: 'rgba(180,230,220,0.8)',
                fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = C.sea; el.style.color = C.seaLt; el.style.background = C.seaBg; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(45,143,123,0.4)'; el.style.color = 'rgba(180,230,220,0.8)'; el.style.background = 'transparent'; }}
              >
                Plan Your Trip
              </a>
            </div>
          </div>
        </div>

        {/* ── SEARCH + FILTERS STICKY BAR ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          boxShadow: '0 2px 16px rgba(14,30,27,0.06)',
          padding: '16px 24px',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            {/* filter type tabs */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14, alignItems: 'center' }}>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: 4, flexShrink: 0 }}>
                <SlidersHorizontal size={12} style={{ display: 'inline', marginRight: 4 }}/>
                Filter
              </span>

              {/* destination dropdown */}
              <FilterDropdown label="Destination" options={ALL_DESTINATIONS} value={destination} onChange={setDestination}/>

              {/* duration pills */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {DURATIONS.map((d, i) => (
                  <FilterPill key={d.label} label={d.label} active={durationIdx === i} onClick={() => setDurationIdx(i)}/>
                ))}
              </div>

              {/* travel type dropdown */}
              <FilterDropdown
                label="Travel Type"
                options={TRAVEL_TYPES.map(t => t === 'All' ? 'All' : t.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()))}
                value={travelType === 'All' ? 'All' : travelType.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                onChange={v => setTravelType(v === 'All' ? 'All' : v.toLowerCase().replace(' ', '-'))}
              />

              {/* budget dropdown */}
              <FilterDropdown label="Budget" options={BUDGETS.map(b => b.label)} value={BUDGETS[budgetIdx].label} onChange={v => setBudgetIdx(BUDGETS.findIndex(b => b.label === v))}/>

              {/* clear all */}
              {hasFilters && (
                <button
                  onClick={clearAll}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 999, border: `1.5px solid rgba(239,68,68,0.3)`, background: 'rgba(239,68,68,0.06)', color: '#ef4444', fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)'; }}
                >
                  <X size={12}/> Clear all
                </button>
              )}
            </div>

            {/* ── search bar ── */}
            <div ref={searchRef} style={{ position: 'relative' }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                background: C.bgAlt,
                border: `1.5px solid ${C.border}`,
                borderRadius: 14,
                padding: '0 16px',
                transition: 'all 0.25s',
              }}
                onFocusCapture={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = C.seaBd; el.style.background = C.white; el.style.boxShadow = `0 0 0 3px rgba(45,143,123,0.08)`; }}
                onBlurCapture={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = C.border; el.style.background = C.bgAlt; el.style.boxShadow = 'none'; }}
              >
                <Search size={17} style={{ color: C.sea, flexShrink: 0, marginRight: 10 }}/>
                <input
                  type="text"
                  placeholder="Type destination, trip name, or activity…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    padding: '14px 0',
                    fontFamily: '"Montserrat",sans-serif', fontSize: 14, fontWeight: 400,
                    color: C.text,
                  }}
                />
                {query && (
                  <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '50%' }}>
                    <X size={15}/>
                  </button>
                )}
                <div style={{ width: 1, height: 24, background: C.border, margin: '0 12px', flexShrink: 0 }}/>
                <button style={{
                  padding: '8px 20px', borderRadius: 10,
                  background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
                  color: '#fff', fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 700,
                  border: 'none', cursor: 'pointer', flexShrink: 0,
                  display: 'flex', alignItems: 'center', gap: 6,
                  boxShadow: `0 4px 12px rgba(45,143,123,0.3)`,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 18px rgba(45,143,123,0.45)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 12px rgba(45,143,123,0.3)`; }}
                >
                  <Search size={14}/> Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── GRID ── */}
        <div id="trips-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' }}>

          {/* results header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,30px)', color: C.text, lineHeight: 1.1, marginBottom: 4 }}>
                {query
                  ? <>Results for <span style={{ color: C.sea, fontStyle: 'italic' }}>"{query}"</span></>
                  : destination !== 'All'
                    ? <>{destination} <span style={{ color: C.sea, fontStyle: 'italic' }}>Trips</span></>
                    : <>Every journey, <span style={{ color: C.sea, fontStyle: 'italic' }}>one place.</span></>
                }
              </h2>
              <p style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 13, color: C.muted, fontWeight: 500 }}>
                {filtered.length === 0
                  ? 'No trips match your filters'
                  : `${filtered.length} trip${filtered.length !== 1 ? 's' : ''} found`}
              </p>
            </div>

            {hasFilters && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {query && <ActiveTag label={`"${query}"`} onRemove={() => setQuery('')}/>}
                {destination !== 'All' && <ActiveTag label={destination} onRemove={() => setDestination('All')}/>}
                {durationIdx !== 0 && <ActiveTag label={DURATIONS[durationIdx].label} onRemove={() => setDurationIdx(0)}/>}
                {travelType !== 'All' && <ActiveTag label={travelType} onRemove={() => setTravelType('All')}/>}
                {budgetIdx !== 0 && <ActiveTag label={BUDGETS[budgetIdx].label} onRemove={() => setBudgetIdx(0)}/>}
              </div>
            )}
          </div>

          {/* empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 24, color: C.text, marginBottom: 8 }}>No trips found</div>
              <p style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 14, color: C.muted, marginBottom: 20 }}>Try adjusting your search or filters</p>
              <button onClick={clearAll} style={{ padding: '11px 28px', borderRadius: 999, background: `linear-gradient(135deg,${C.sea},${C.seaDk})`, color: '#fff', fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                Clear all filters
              </button>
            </div>
          )}

          {/* grid */}
          {filtered.length > 0 && (
            <div
              ref={gridRef}
              className="tours-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}
            >
              {filtered.map(trip => (
                <TripCard key={trip.id} trip={trip} onClick={() => setSelected(trip)}/>
              ))}
            </div>
          )}
        </div>

        <InternationalTrips />
        <MemoriesSection />
        <Footer />
      </main>

      {selected && <TripModal trip={selected} onClose={() => setSelected(null)}/>}

      <style>{`
        @media (max-width:1100px) { .tours-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width:768px)  { .tours-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:480px)  { .tours-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

// ── Active filter tag ─────────────────────────────────
function ActiveTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 999,
      background: C.seaBg, border: `1px solid ${C.seaBd}`,
      fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 600, color: C.sea,
    }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.sea, display: 'flex', alignItems: 'center', padding: 0, lineHeight: 1 }}>
        <X size={11}/>
      </button>
    </div>
  );
}