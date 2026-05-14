'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react';
import TRIPS from '../data/upcomingTrips';
import type { Trip } from '../data/upcomingTrips';
import TripModal, { C } from './TripModal';

gsap.registerPlugin(ScrollTrigger);

// Pull only international trips
const INTL_TRIPS = TRIPS.filter(t => t.state === 'International');

// Country display labels — concise, matches the card design
const COUNTRY_LABEL: Record<string, string> = {
  'intl-europe-01':  'EUROPE',
  'intl-vietnam-01': 'VIETNAM',
  'intl-bali-01':    'BALI',
  'intl-thailand-01':'THAILAND',
  'intl-japan-01':   'JAPAN',
  'intl-dubai-01':   'DUBAI',
};

// Taglines shown above country name (like "The Land of The Rising Sun" in design)
const COUNTRY_TAGLINE: Record<string, string> = {
  'intl-europe-01':  'Timeless & Grand',
  'intl-vietnam-01': 'Breathtaking & Vibrant',
  'intl-bali-01':    'The Island of the Gods',
  'intl-thailand-01':'Land of Smiles',
  'intl-japan-01':   'The Land of the Rising Sun',
  'intl-dubai-01':   'Where Dreams are Built',
};

// Per-card accent colours — each destination gets a signature tint
const CARD_ACCENT: Record<string, string> = {
  'intl-europe-01':  '#a78bfa',   // soft violet — European elegance
  'intl-vietnam-01': '#34d399',   // emerald green — lush Vietnam
  'intl-bali-01':    '#fb923c',   // warm orange — tropical Bali
  'intl-thailand-01':'#38bdf8',   // sky blue — Thai beaches
  'intl-japan-01':   '#f472b6',   // sakura pink — cherry blossoms
  'intl-dubai-01':   '#fbbf24',   // gold — Dubai luxury
};

// ── Single destination card ────────────────────────────
function DestCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const accent  = CARD_ACCENT[trip.id]  ?? C.seaLt;
  const tagline = COUNTRY_TAGLINE[trip.id] ?? '';
  const country = COUNTRY_LABEL[trip.id]  ?? trip.location.toUpperCase();

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 260,
        height: 340,
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'linear-gradient(145deg,#0a2520,#0d3028)',
        boxShadow: hov
          ? `0 24px 56px rgba(0,0,0,0.55), 0 0 0 2px ${accent}55`
          : '0 8px 28px rgba(0,0,0,0.35)',
        transform: hov ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.38s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {/* background image */}
      <img
        src={trip.image}
        alt={trip.name}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transform: hov ? 'scale(1.09)' : 'scale(1)',
          transition: 'transform 0.55s ease',
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* base dark gradient — always present */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.08) 100%)', pointerEvents: 'none' }}/>

      {/* hover colour wash from accent */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to top, ${accent}22 0%, transparent 60%)`,
        opacity: hov ? 1 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }}/>

      {/* top-right: discount badge */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        background: '#ef4444',
        borderRadius: 8, padding: '3px 9px',
        fontFamily: '"Montserrat",sans-serif',
        fontSize: 9, fontWeight: 700, color: '#fff',
        letterSpacing: '0.04em',
      }}>
        {trip.discountLabel}
      </div>

      {/* top-left: location pill */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
        borderRadius: 999, padding: '4px 10px',
        border: '1px solid rgba(255,255,255,0.14)',
      }}>
        <MapPin size={9} color={accent}/>
        <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
          {trip.duration}
        </span>
      </div>

      {/* bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 20px' }}>

        {/* tagline */}
        <div style={{
          fontFamily: '"Montserrat",sans-serif',
          fontSize: 10, fontWeight: 500,
          color: `${accent}cc`,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 4,
          opacity: hov ? 1 : 0.75,
          transition: 'opacity 0.3s',
        }}>
          {tagline}
        </div>

        {/* ── COUNTRY NAME — big, editorial, like the design ── */}
        <div style={{
          fontFamily: '"DM Serif Display",serif',
          fontStyle: 'italic',
          fontSize: 'clamp(36px,5vw,44px)',
          fontWeight: 400,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: accent,
          marginBottom: 10,
          textShadow: `0 2px 20px ${accent}55`,
          transition: 'all 0.3s ease',
          transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        }}>
          {country}
        </div>

        {/* price row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: `1px solid rgba(255,255,255,0.12)`,
          paddingTop: 10,
        }}>
          <div>
            <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginBottom: 1 }}>
              Starting Price
            </div>
            <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 17, color: '#fff', lineHeight: 1 }}>
              ₹{trip.discountedPrice.toLocaleString('en-IN')}
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.45)', fontWeight: 400, marginLeft: 3 }}>/-</span>
            </div>
          </div>

          {/* explore arrow */}
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: hov ? accent : 'rgba(255,255,255,0.12)',
            border: `1.5px solid ${hov ? accent : 'rgba(255,255,255,0.2)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.28s ease',
            boxShadow: hov ? `0 4px 14px ${accent}55` : 'none',
          }}>
            <ArrowRight size={14} color={hov ? '#000' : 'rgba(255,255,255,0.7)'}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────
export default function InternationalTrips() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [selected, setSelected]   = useState<Trip | null>(null);
  const [vidReady, setVidReady]   = useState(false);
  const [canLeft,  setCanLeft]    = useState(false);
  const [canRight, setCanRight]   = useState(true);

  const CARD_W   = 260;
  const CARD_GAP = 18;
  const STEP     = (CARD_W + CARD_GAP) * 2; // scroll 2 cards at a time

  // video autoplay
  useEffect(() => {
    const vid = videoRef.current; if (!vid) return;
    vid.muted = true; vid.playsInline = true;
    const play = () => { setVidReady(true); vid.play().catch(() => {}); };
    vid.readyState >= 2 ? play() : vid.addEventListener('canplay', play, { once: true });
  }, []);

  // heading scroll reveal
  useEffect(() => {
    const el = headRef.current; if (!el) return;
    gsap.set(el, { opacity: 0, y: 36 });
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
  }, []);

  // cards stagger reveal
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('.intl-card');
    gsap.set(cards, { opacity: 0, y: 32, scale: 0.95 });
    gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: track, start: 'top 88%', once: true } });
  }, []);

  // update arrow states
  const updateArrows = () => {
    const el = trackRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir * STEP, behavior: 'smooth' });
    setTimeout(updateArrows, 450);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="international-trips"
        style={{ background: C.bg, overflow: 'hidden', paddingBottom: 80 }}
      >
        {/* ── VIDEO BANNER ── */}
        <div style={{ position: 'relative', height: 'clamp(280px, 38vw, 420px)', overflow: 'hidden', marginBottom: 48 }}>

          {/* fallback gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#071a16,#0d3028,#0a2520)', zIndex: 0 }}/>

          {/* ambient orbs */}
          <div style={{ position: 'absolute', zIndex: 1, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(45,143,123,0.18) 0%,transparent 65%)', top: -120, left: -100, pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', zIndex: 1, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(61,184,158,0.12) 0%,transparent 65%)', bottom: -60, right: -60, pointerEvents: 'none' }}/>

          {/* video */}
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="auto"
            poster="/international-poster.jpg"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              zIndex: 2,
              opacity: vidReady ? 1 : 0,
              transition: 'opacity 1.4s ease',
              filter: 'brightness(0.72) saturate(1.1)',
            }}
          >
            <source src="/international-bg.mp4" type="video/mp4"/>
          </video>

          {/* dark overlays */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to right,rgba(7,26,22,0.88) 0%,rgba(7,26,22,0.35) 55%,rgba(7,26,22,0.1) 100%)' }}/>
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to top,rgba(7,26,22,0.65) 0%,transparent 55%)' }}/>

          {/* text content */}
          <div ref={headRef} style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(24px,5vw,72px)' }}>
            {/* eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.seaLt})` }}/>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.seaLt, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                International Packages
              </span>
            </div>

            {/* title */}
            <h2 style={{
              fontFamily: '"DM Serif Display",serif',
              fontWeight: 400,
              fontSize: 'clamp(32px,5vw,62px)',
              lineHeight: 1.05,
              color: '#e8f7f4',
              marginBottom: 12,
              letterSpacing: '-0.01em',
            }}>
              International<br/>
              <span style={{ fontStyle: 'italic', color: C.seaLt }}>Trips</span>
            </h2>

            <p style={{
              fontFamily: '"Montserrat",sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(13px,1.4vw,16px)',
              color: 'rgba(180,230,220,0.65)',
              lineHeight: 1.65,
              maxWidth: 380,
              marginBottom: 28,
            }}>
              Discover the world, one destination at a time.
            </p>

            {/* explore button */}
            <div>
              <a
                href="#"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 999,
                  background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
                  color: '#fff',
                  fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: `0 6px 20px rgba(45,143,123,0.38)`,
                  transition: 'all 0.25s',
                  letterSpacing: '0.03em',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 12px 32px rgba(45,143,123,0.5)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = `0 6px 20px rgba(45,143,123,0.38)`; }}
              >
                Explore <ArrowRight size={15}/>
              </a>
            </div>
          </div>
        </div>

        {/* ── CARDS ROW ── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

          {/* row header with arrows */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ height: 1, width: 24, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
                <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Destinations</span>
              </div>
              <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(22px,2.5vw,34px)', color: C.text, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Where do you want to <span style={{ fontStyle: 'italic', color: C.sea }}>go next?</span>
              </h3>
            </div>

            {/* prev / next arrows */}
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              {([[-1, <ChevronLeft size={18}/>, canLeft], [1, <ChevronRight size={18}/>, canRight]] as const).map(([dir, icon, active], i) => (
                <button
                  key={i}
                  onClick={() => scrollBy(dir as -1|1)}
                  disabled={!active}
                  style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: active ? C.white : 'rgba(45,143,123,0.04)',
                    border: `1.5px solid ${active ? C.seaBd : C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: active ? 'pointer' : 'default',
                    color: active ? C.sea : C.muted,
                    transition: 'all 0.25s',
                    boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    opacity: active ? 1 : 0.4,
                  }}
                  onMouseEnter={e => { if (active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = `linear-gradient(135deg,${C.sea},${C.seaDk})`; el.style.color = '#fff'; el.style.borderColor = 'transparent'; el.style.boxShadow = `0 6px 18px rgba(45,143,123,0.4)`; } }}
                  onMouseLeave={e => { if (active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = C.white; el.style.color = C.sea; el.style.borderColor = C.seaBd; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; } }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* scrollable track */}
          <div style={{ position: 'relative' }}>
            {/* left fade */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to right,${C.bg},transparent)`, zIndex: 5, pointerEvents: 'none', opacity: canLeft ? 1 : 0, transition: 'opacity 0.3s' }}/>
            {/* right fade */}
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to left,${C.bg},transparent)`, zIndex: 5, pointerEvents: 'none' }}/>

            <div
              ref={trackRef}
              onScroll={updateArrows}
              style={{
                display: 'flex',
                gap: CARD_GAP,
                overflowX: 'auto',
                paddingBottom: 16,
                paddingTop: 8,
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
              }}
            >
              {INTL_TRIPS.map(trip => (
                <div key={trip.id} className="intl-card" style={{ scrollSnapAlign: 'start', opacity: 0 }}>
                  <DestCard trip={trip} onClick={() => setSelected(trip)}/>
                </div>
              ))}
            </div>
          </div>

          {/* scrollbar hide */}
          <style>{`
            #international-trips div::-webkit-scrollbar { display: none; }
          `}</style>
        </div>
      </section>

      {selected && (
        <TripModal trip={selected} onClose={() => setSelected(null)}/>
      )}
    </>
  );
}