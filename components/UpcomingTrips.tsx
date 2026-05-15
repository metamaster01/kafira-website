'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clock, MapPin, Users, Star, Calendar,
  ChevronLeft, ChevronRight, ArrowRight,
  Mountain, Compass, Palmtree, Camera,
} from 'lucide-react';
import { getFeaturedTrips } from '../data/upcomingTrips';
import type { Trip } from '../data/upcomingTrips';
import TripModal, { C, DIFF_COLOR } from './TripModal';

gsap.registerPlugin(ScrollTrigger);

const ALL_MONTHS = ['All','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── Category icon ─────────────────────────────────────
function CatIcon({ cat, size = 13 }: { cat: string; size?: number }) {
  const p = { size, strokeWidth: 1.8 };
  if (cat === 'trek')      return <Mountain {...p}/>;
  if (cat === 'road-trip') return <Compass {...p}/>;
  if (cat === 'nature')    return <Palmtree {...p}/>;
  if (cat === 'cultural')  return <Camera {...p}/>;
  return <Compass {...p}/>;
}

// ── Trip Card ─────────────────────────────────────────
function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flexShrink: 0,
        width: 296,
        borderRadius: 20,
        overflow: 'hidden',
        background: C.white,
        border: `1.5px solid ${hover ? C.seaBd : C.border}`,
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: hover ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hover
          ? `0 24px 56px rgba(45,143,123,0.15), 0 0 0 1px ${C.seaBd}`
          : '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      {/* ── image ── */}
      <div style={{ position: 'relative', height: 196, overflow: 'hidden', background: 'linear-gradient(145deg,#0a2520,#0d3028)', flexShrink: 0 }}>
        <img
          src={trip.image}
          alt={trip.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.55s ease', transform: hover ? 'scale(1.08)' : 'scale(1)' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        {/* dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.08) 52%,transparent 100%)', pointerEvents: 'none' }}/>

        {/* top badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '4px 10px', border: '1px solid rgba(255,255,255,0.14)' }}>
            <CatIcon cat={trip.category} size={11}/>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 600, color: '#fff', textTransform: 'capitalize' }}>
              {trip.category.replace('-', ' ')}
            </span>
          </div>
          <div style={{ background: DIFF_COLOR[trip.difficulty], borderRadius: 999, padding: '4px 10px', fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#fff' }}>
            {trip.difficulty}
          </div>
        </div>

        {/* bottom row */}
        <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={11} color="rgba(255,255,255,0.82)"/>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{trip.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: `${C.sea}dd`, borderRadius: 999, padding: '3px 8px' }}>
            <Star size={9} fill="#fff" color="#fff"/>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#fff' }}>{trip.rating}</span>
          </div>
        </div>
      </div>

      {/* ── body ── */}
      <div style={{ padding: '16px 18px' }}>
        {/* name */}
        <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 17, color: C.text, lineHeight: 1.2, marginBottom: 3 }}>
          {trip.name}
        </h3>
        <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.muted, lineHeight: 1.4, marginBottom: 12 }}>
          {trip.subtitle}
        </p>

        {/* meta */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          {[
            { icon: <Clock size={12}/>,    text: trip.duration },
            { icon: <Calendar size={12}/>, text: trip.months },
            { icon: <Users size={12}/>,    text: trip.groupSize },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: C.sea }}>{m.icon}</span>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.sub }}>{m.text}</span>
            </div>
          ))}
        </div>

        {/* tags */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {trip.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 500, color: C.seaDk, background: C.seaBg, border: `1px solid ${C.seaBd}`, borderRadius: 999, padding: '3px 8px' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* divider */}
        <div style={{ height: 1, background: C.border, marginBottom: 12 }}/>

        {/* price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#ef4444', borderRadius: 6, padding: '2px 7px', fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              {trip.discountLabel}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.muted, textDecoration: 'line-through' }}>
                ₹{trip.originalPrice.toLocaleString('en-IN')}
              </span>
              <span style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 20, color: C.text }}>
                ₹{trip.discountedPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: C.muted }}>per person</div>
          </div>

          <button style={{
            padding: '9px 16px',
            borderRadius: 12,
            background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
            color: '#fff',
            fontFamily: 'Outfit,sans-serif',
            fontSize: 12,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all 0.25s',
            boxShadow: hover ? `0 6px 18px ${C.sea}55` : 'none',
          }}>
            View Details <ArrowRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────
export default function UpcomingTrips() {
  const [activeMonth, setActiveMonth]   = useState('All');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const trackRef  = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const headRef   = useRef<HTMLDivElement>(null);
  const animRef   = useRef<gsap.core.Tween | null>(null);
  const isPaused  = useRef(false);

  const CARD_W   = 296;
  const CARD_GAP = 20;
  const UNIT     = CARD_W + CARD_GAP;

  // filtered list
  const trips = activeMonth === 'All'
    ? getFeaturedTrips()
    : getFeaturedTrips().filter(t => t.monthTags.includes(activeMonth));

  // double for seamless loop
  const display = [...trips, ...trips];

  // ── auto-scroll ────────────────────────────────────
  const startScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || trips.length === 0) return;
    animRef.current?.kill();
    gsap.set(track, { x: 0 });
    animRef.current = gsap.to(track, {
      x: -(UNIT * trips.length),
      duration: trips.length * 4.5,
      ease: 'none',
      repeat: -1,
      paused: isPaused.current,
    });
  }, [trips, UNIT]);

  useEffect(() => { startScroll(); }, [startScroll]);

  // ── heading scroll-reveal ──────────────────────────
  useEffect(() => {
    const el = headRef.current; if (!el) return;
    gsap.set(el, { opacity: 0, y: 28 });
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  }, []);

  const pause  = () => { isPaused.current = true;  animRef.current?.pause(); };
  const resume = () => { isPaused.current = false; animRef.current?.resume(); };

  const step = (dir: 1 | -1) => {
    const track = trackRef.current; if (!track) return;
    pause();
    gsap.to(track, { x: `+=${UNIT * -dir}`, duration: 0.42, ease: 'power2.out' });
    setTimeout(resume, 2800);
  };

  return (
    <>
      <section
        id="upcoming-trips"
        style={{ background: C.bg, padding: '96px 0 80px', overflow: 'hidden', paddingLeft: 16, paddingRight: 16 }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

          {/* ── heading row ── */}
          <div
            ref={headRef}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}
          >
            <div>
              {/* eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  Upcoming Trips
                </span>
              </div>

              <h2 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 'clamp(26px,3vw,44px)', color: C.text, lineHeight: 1.1, marginBottom: 8 }}>
                Where will you go{' '}
                <span style={{ fontStyle: 'italic', color: C.sea }}>next?</span>
              </h2>
              <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, color: C.sub, lineHeight: 1.65, maxWidth: 480 }}>
                Handcrafted group departures across India — fixed dates, expert guides, memories guaranteed.
              </p>
            </div>

            {/* arrow nav */}
            <div style={{ display: 'flex', gap: 10 }}>
              {([[-1, <ChevronLeft size={18}/>], [1, <ChevronRight size={18}/>]] as const).map(([dir, icon], i) => (
                <button
                  key={i}
                  onClick={() => step(dir)}
                  style={{ width: 42, height: 42, borderRadius: '50%', background: C.white, border: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.text, transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = `linear-gradient(135deg,${C.sea},${C.seaDk})`; el.style.color = '#fff'; el.style.borderColor = 'transparent'; el.style.boxShadow = `0 6px 18px ${C.sea}44`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = C.white; el.style.color = C.text; el.style.borderColor = C.border; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── month filter pills ── */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 32 }}>
            {ALL_MONTHS.map(m => {
              const active = activeMonth === m;
              return (
                <button
                  key={m}
                  onClick={() => setActiveMonth(m)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 999,
                    border: active ? 'none' : `1.5px solid ${C.border}`,
                    cursor: 'pointer',
                    fontFamily: 'Outfit,sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    background: active ? `linear-gradient(135deg,${C.sea},${C.seaDk})` : C.white,
                    color: active ? '#fff' : C.sub,
                    boxShadow: active ? `0 4px 14px ${C.sea}44` : '0 1px 4px rgba(0,0,0,0.05)',
                    transition: 'all 0.22s',
                    transform: active ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = C.seaBd; el.style.color = C.sea; } }}
                  onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = C.border; el.style.color = C.sub; } }}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {/* ── carousel ── */}
          <div
            ref={wrapRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            style={{ overflow: 'hidden', position: 'relative' }}
          >
            {/* fade masks */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 56, background: `linear-gradient(to right,${C.bg},transparent)`, zIndex: 5, pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 56, background: `linear-gradient(to left,${C.bg},transparent)`, zIndex: 5, pointerEvents: 'none' }}/>

            <div
              ref={trackRef}
              style={{ display: 'flex', gap: CARD_GAP, width: 'max-content', padding: '8px 4px 28px' }}
            >
              {display.map((trip, i) => (
                <TripCard
                  key={`${trip.id}-${i}`}
                  trip={trip}
                  onClick={() => setSelectedTrip(trip)}
                />
              ))}
            </div>
          </div>

          {/* ── view all CTA ── */}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <a
              href="#all-trips"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 30px',
                borderRadius: 999,
                background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
                color: '#fff',
                fontFamily: 'Outfit,sans-serif',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.25s',
                boxShadow: `0 6px 20px ${C.sea}40`,
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = `0 14px 32px ${C.sea}55`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = `0 6px 20px ${C.sea}40`; }}
            >
              View All Trips <ArrowRight size={16}/>
            </a>
          </div>

        </div>
      </section>

      {/* ── Trip Modal ── */}
      {selectedTrip && (
        <TripModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          #upcoming-trips > div > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </>
  );
}