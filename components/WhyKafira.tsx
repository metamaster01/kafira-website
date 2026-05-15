
'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Palette (mirrors TripModal/C) ─────────────────────
const C = {
  bg:     '#f4f9f8',
  bgAlt:  '#eaf3f1',
  white:  '#ffffff',
  text:   '#0e1e1b',
  sub:    '#2d5a52',
  muted:  '#6b9e94',
  border: 'rgba(45,143,123,0.12)',
  sea:    '#2d8f7b',
  seaDk:  '#1a6b58',
  seaLt:  '#3db89e',
  accent: '#0f4f42',
  seaBg:  'rgba(45,143,123,0.09)',
  seaBd:  'rgba(45,143,123,0.22)',
};

// ── USP data ──────────────────────────────────────────
const USPS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
    title: 'Handcrafted Itineraries',
    body: 'Every trip is built from scratch around your interests, pace, and budget — never a copy-paste package.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Zero Hidden Fees',
    body: 'The price you see is the price you pay. Full transparency from booking to boarding.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z"/>
      </svg>
    ),
    title: '24/7 On-ground Support',
    body: "Our team is reachable round the clock — whether you're in Leh or Lisbon, help is one call away.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: '12 Years of Expertise',
    body: 'Over a decade of crafting memorable journeys across India and beyond for 50,000+ travelers.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: 'Best Price Guarantee',
    body: 'We match or beat any comparable itinerary price. Save an average of ₹4,200 per trip vs booking alone.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    title: 'Sustainable Travel',
    body: 'We partner only with eco-conscious operators and contribute to local communities at every destination.',
  },
];

// ── Stats ─────────────────────────────────────────────
const STATS = [
  { value: 50000, suffix: '+',   label: 'Happy Travelers' },
  { value: 120,   suffix: '+',   label: 'Destinations'    },
  { value: 4.9,   suffix: '★',  label: 'Average Rating'  },
  { value: 12,    suffix: ' Yrs',label: 'of Excellence'   },
];

function useCounter(target: number, decimals = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obj = { n: 0 };
    gsap.to(obj, {
      n: target, duration: 2.2, ease: 'power2.out',
      onUpdate: () => setVal(parseFloat(obj.n.toFixed(decimals))),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }, [target, decimals]);
  return { ref, val };
}

function StatItem({ stat }: { stat: typeof STATS[0] }) {
  const decimals = stat.value % 1 !== 0 ? 1 : 0;
  const { ref, val } = useCounter(stat.value, decimals);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '0 8px' }}>
      <div style={{
        fontFamily: '"DM Serif Display",serif',
        fontWeight: 400,
        fontSize: 'clamp(30px,3.5vw,46px)',
        lineHeight: 1,
        background: `linear-gradient(135deg,${C.seaLt},${C.seaDk})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {decimals ? val.toFixed(1) : val.toLocaleString('en-IN')}{stat.suffix}
      </div>
      <div style={{
        fontFamily: '"Montserrat",sans-serif',
        fontSize: 11,
        fontWeight: 500,
        color: C.muted,
        marginTop: 7,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        {stat.label}
      </div>
    </div>
  );
}

// ── USP Card ──────────────────────────────────────────
function UspCard({ usp, index }: { usp: typeof USPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.set(el, { opacity: 0, y: 28, scale: 0.96 });
    gsap.to(el, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.72, delay: 0.07 * index,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.white : C.bgAlt,
        border: `1.5px solid ${hovered ? C.seaBd : C.border}`,
        borderRadius: 18,
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'all 0.32s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered
          ? `0 18px 44px rgba(45,143,123,0.14), 0 0 0 1px ${C.seaBd}`
          : '0 2px 8px rgba(0,0,0,0.03)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle inner glow on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 120, height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle,${C.seaBg} 0%,transparent 70%)`,
          pointerEvents: 'none',
        }}/>
      )}

      {/* icon box */}
      <div style={{
        width: 46, height: 46, borderRadius: 13,
        background: hovered ? C.seaBg : 'rgba(45,143,123,0.06)',
        border: `1.5px solid ${hovered ? C.seaBd : C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.sea, flexShrink: 0,
        transition: 'all 0.32s ease',
      }}>
        {usp.icon}
      </div>

      <div>
        <div style={{
          fontFamily: '"DM Serif Display",serif',
          fontWeight: 400,
          fontSize: 17,
          color: hovered ? C.text : C.sub,
          lineHeight: 1.25,
          marginBottom: 6,
          transition: 'color 0.25s',
        }}>
          {usp.title}
        </div>
        <div style={{
          fontFamily: '"Montserrat",sans-serif',
          fontSize: 13,
          fontWeight: 400,
          color: C.muted,
          lineHeight: 1.7,
          transition: 'color 0.25s',
        }}>
          {usp.body}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────
export default function WhyKafira() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    const head    = headRef.current;
    const stats   = statsRef.current;
    const line    = lineRef.current;
    const badge   = badgeRef.current;
    if (!section || !img || !head || !stats || !line || !badge) return;

    gsap.set(img, { opacity: 0, x: -60, scale: 0.94 });
    gsap.to(img, { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: img, start: 'top 82%', once: true } });

    // subtle parallax on the image
    gsap.to(img, {
      y: -36, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    });

    gsap.set(head, { opacity: 0, y: 36 });
    gsap.to(head, { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', scrollTrigger: { trigger: head, start: 'top 85%', once: true } });

    gsap.set(badge, { opacity: 0, scale: 0.82, y: 20 });
    gsap.to(badge, { opacity: 1, scale: 1, y: 0, duration: 0.72, delay: 0.12, ease: 'back.out(1.6)', scrollTrigger: { trigger: badge, start: 'top 88%', once: true } });

    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(line, { scaleX: 1, duration: 1.1, ease: 'power2.inOut', scrollTrigger: { trigger: line, start: 'top 90%', once: true } });

    gsap.set(stats, { opacity: 0, y: 24 });
    gsap.to(stats, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: stats, start: 'top 90%', once: true } });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: C.bg,
        padding: '110px 0 90px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Background glow orbs ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* top-left large orb */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: 560, height: 560, borderRadius: '50%',
          background: `radial-gradient(circle,rgba(45,143,123,0.13) 0%,rgba(45,143,123,0.04) 50%,transparent 70%)`,
          filter: 'blur(2px)',
        }}/>
        {/* bottom-right orb */}
        <div style={{
          position: 'absolute', bottom: '-6%', right: '-6%',
          width: 480, height: 480, borderRadius: '50%',
          background: `radial-gradient(circle,rgba(61,184,158,0.11) 0%,rgba(61,184,158,0.03) 55%,transparent 70%)`,
          filter: 'blur(2px)',
        }}/>
        {/* center accent orb */}
        <div style={{
          position: 'absolute', top: '42%', left: '46%',
          width: 320, height: 320, borderRadius: '50%',
          background: `radial-gradient(circle,rgba(15,79,66,0.07) 0%,transparent 65%)`,
        }}/>
        {/* small top-right spark */}
        <div style={{
          position: 'absolute', top: '8%', right: '12%',
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle,rgba(45,143,123,0.10) 0%,transparent 70%)`,
        }}/>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* ── TWO COLUMN ── */}
        <div className="wk-two-col" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72,
          alignItems: 'center',
          marginBottom: 80,
        }}>

          {/* ── LEFT: image ── */}
          <div ref={imgRef} style={{ position: 'relative'}}>
            <div style={{
              borderRadius: 26,
              overflow: 'hidden',
              boxShadow: `0 28px 64px rgba(14,30,27,0.2), 0 0 0 1px ${C.seaBd}`,
              position: 'relative',
              aspectRatio: '4/5',
            }}>
              <img
                src="/why-us.webp"
                alt="Kafira journey"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  (el.parentElement as HTMLDivElement).style.background =
                    `linear-gradient(145deg,${C.bgAlt} 0%,#c2deda 40%,${C.sea}44 100%)`;
                }}
              />
              {/* dark-to-transparent gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(14,30,27,0.62) 0%,transparent 55%)', pointerEvents: 'none' }}/>
              {/* quote overlay */}
              <div style={{
                position: 'absolute', bottom: 22, left: 20, right: 20,
                fontFamily: '"DM Serif Display",serif',
                fontStyle: 'italic',
                fontSize: 18,
                color: 'rgba(236,255,252,0.92)',
                lineHeight: 1.5,
              }}>
                "Every journey we craft is a story only you can tell."
              </div>
            </div>

            {/* floating badge — top right */}
            <div ref={badgeRef} style={{
              position: 'absolute', top: -20, right: -20,
              background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
              borderRadius: 18, padding: '16px 18px',
              boxShadow: `0 14px 36px rgba(45,143,123,0.38)`,
              textAlign: 'center', minWidth: 90,
            }}>
              <div style={{ fontFamily: '"DM Serif Display",serif', fontWeight: 400, fontSize: 30, color: '#fff', lineHeight: 1 }}>12</div>
              <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.82)', marginTop: 4, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Years</div>
              <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 8, fontWeight: 400, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em' }}>of Excellence</div>
            </div>

            {/* floating mini card — bottom left */}
            {/* <div style={{
              position: 'absolute', bottom: -18, left: -18,
              background: 'rgba(244,249,248,0.97)',
              border: `1px solid ${C.seaBd}`,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 14, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 28px rgba(14,30,27,0.1)',
            }}>
              <div style={{ display: 'flex' }}>
                {['P','R','K','S','M'].map((l, i) => (
                  <div key={i} style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: `linear-gradient(135deg,${C.seaLt},${C.seaDk})`,
                    border: '2px solid #fff',
                    marginLeft: i ? -7 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 700,
                    color: '#fff', zIndex: 5 - i,
                  }}>{l}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 700, fontSize: 12, color: C.text, lineHeight: 1 }}>50,000+ travelers</div>
                <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 400, color: C.muted, marginTop: 3 }}>trust Kafira every year</div>
              </div>
            </div> */}

            {/* decorative outer ring */}
            <div style={{
              position: 'absolute', top: '8%', left: '-6%',
              width: '112%', height: '112%',
              borderRadius: 30,
              border: `1px solid ${C.seaBd}`,
              zIndex: -1, pointerEvents: 'none',
            }}/>
          </div>

          {/* ── RIGHT: text ── */}
          <div ref={headRef}>
            {/* eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                Why Choose Us
              </span>
            </div>

            {/* main headline — DM Serif Display, bigger + bold */}
            <h2 style={{
              fontFamily: '"DM Serif Display",serif',
              fontWeight: 400,           /* DM Serif Display's regular weight reads as bold already */
              fontSize: 'clamp(34px,4vw,58px)',
              lineHeight: 1.08,
              color: C.text,
              marginBottom: 20,
              letterSpacing: '-0.01em',
            }}>
              We don't sell trips.<br/>
              <span style={{ fontStyle: 'italic', color: C.sea }}>We craft journeys.</span>
            </h2>

            <p style={{
              fontFamily: '"Montserrat",sans-serif',
              fontSize: 15,
              fontWeight: 400,
              color: C.sub,
              lineHeight: 1.8,
              marginBottom: 34,
            }}>
              At Kafira, every trip is personal. Since 2012, we've been building travel experiences that go beyond the ordinary — from remote Himalayan trails to royal Rajasthan forts, from misty Coorg hills to Kerala's golden backwaters. We listen first, then plan.
            </p>

            {/* 3 inline highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 38 }}>
              {[
                { title: 'Fully customised', desc: 'No two Kafira trips are alike — each is built around you.' },
                { title: 'Local expertise',  desc: 'Our on-ground teams know every shortcut, hidden gem, and best-kept secret.' },
                { title: 'End-to-end care',  desc: "From first enquiry to safe return — we're with you every step." },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: C.seaBg,
                    border: `1.5px solid ${C.seaBd}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: C.sea, fontSize: 14, marginTop: 1,
                  }}>✦</div>
                  <div>
                    <div style={{ fontFamily: '"DM Serif Display",serif', fontWeight: 400, fontSize: 16, color: C.text, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 400, color: C.muted, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#tours"
                style={{
                  padding: '13px 28px', borderRadius: 999,
                  background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
                  color: '#fff',
                  fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 700,
                  textDecoration: 'none', transition: 'all 0.25s ease',
                  boxShadow: `0 6px 20px rgba(45,143,123,0.32)`,
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 12px 30px rgba(45,143,123,0.42)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = `0 6px 20px rgba(45,143,123,0.32)`; }}
              >
                Explore Packages
              </a>
              <a
                href="https://wa.me/919253289347"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '13px 24px', borderRadius: 999,
                  background: 'transparent',
                  border: `1.5px solid ${C.seaBd}`,
                  color: C.sub,
                  fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 500,
                  textDecoration: 'none', transition: 'all 0.25s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = C.sea; el.style.color = C.sea; el.style.background = C.seaBg; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = C.seaBd; el.style.color = C.sub; el.style.background = 'transparent'; }}
              >
                Chat with us →
              </a>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div ref={lineRef} style={{ height: 1, background: C.seaBd, marginBottom: 60 }}/>

        {/* ── USP GRID ── */}
        <div style={{ marginBottom: 68 }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            {/* eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ height: 1, width: 32, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.24em', textTransform: 'uppercase' }}>The Kafira Difference</span>
              <div style={{ height: 1, width: 32, background: `linear-gradient(to left,transparent,${C.sea})` }}/>
            </div>

            {/* section title — larger, DM Serif Display */}
            <h3 style={{
              fontFamily: '"DM Serif Display",serif',
              fontWeight: 400,
              fontSize: 'clamp(30px,3.6vw,52px)',
              color: C.text,
              lineHeight: 1.1,
              marginBottom: 12,
              letterSpacing: '-0.01em',
            }}>
              Six reasons travelers{' '}
              <span style={{ fontStyle: 'italic', color: C.sea }}>choose us</span>
            </h3>
            <p style={{
              fontFamily: '"Montserrat",sans-serif',
              fontSize: 15, fontWeight: 400,
              color: C.muted, maxWidth: 480, margin: '0 auto', lineHeight: 1.7,
            }}>
              Over 50,000 happy travelers can't be wrong. Here's what sets Kafira apart.
            </p>
          </div>

          <div className="wk-usp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {USPS.map((usp, i) => <UspCard key={i} usp={usp} index={i}/>)}
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div ref={statsRef} style={{
          
          background: `linear-gradient(135deg,rgba(45,143,123,0.08),rgba(26,107,88,0.05))`,
          border: `1.5px solid ${C.seaBd}`,
          borderRadius: 22,
          padding: '36px 44px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* inner glow */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%,rgba(45,143,123,0.06) 0%,transparent 65%)`, pointerEvents: 'none' }}/>
          {/* top border accent line */}
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, borderRadius: 999, background: `linear-gradient(to right,transparent,${C.sea},transparent)`}}/>

          {STATS.map((s, i) => <StatItem key={i} stat={s}/>)}
        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@400;500;600;700&display=swap');

        @media (max-width: 1024px) {
          .wk-two-col { grid-template-columns: 1fr !important; gap: 52px !important; }
        }
        @media (max-width: 768px) {
          .wk-usp-grid { grid-template-columns: 1fr 1fr !important; }
          #about > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
            padding: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .wk-usp-grid { grid-template-columns: 1fr !important; }
          #about > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}