'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const C = {
  bg:    '#f4f9f8', bgAlt: '#eaf3f1', white: '#ffffff',
  text:  '#0e1e1b', sub:   '#2d5a52', muted: '#6b9e94',
  border:'rgba(45,143,123,0.12)',
  sea:   '#2d8f7b', seaDk: '#1a6b58', seaLt: '#3db89e',
  seaBg: 'rgba(45,143,123,0.09)', seaBd: 'rgba(45,143,123,0.22)',
};

const USPS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    title: 'Handcrafted Itineraries',
    body: 'Every trip is built from scratch around your interests, pace, and budget — never a copy-paste package.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Zero Hidden Fees',
    body: 'The price you see is the price you pay. Full transparency from booking to boarding.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z"/></svg>,
    title: '24/7 On-ground Support',
    body: "Our team is reachable round the clock — whether you're in Leh or Lisbon, help is one call away.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    title: '12 Years of Expertise',
    body: 'Over a decade of crafting memorable journeys across India and beyond for 50,000+ travelers.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    title: 'Best Price Guarantee',
    body: 'We match or beat any comparable itinerary. Save an average of ₹4,200 per trip vs booking alone.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    title: 'Sustainable Travel',
    body: 'We partner only with eco-conscious operators and contribute to local communities at every destination.',
  },
];

const STATS = [
  { target: 38600, suffix: '+',   label: 'Happy Travelers',  decimals: 0 },
  { target: 93,    suffix: '+',   label: 'Destinations',     decimals: 0 },
  { target: 3.8,   suffix: '★',  label: 'Average Rating',   decimals: 1 },
  { target: 9,     suffix: ' Yrs',label: 'of Excellence',    decimals: 0 },
];

function StatItem({ stat }: { stat: typeof STATS[0] }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obj = { n: 0 };
    gsap.to(obj, {
      n: stat.target, duration: 2.2, ease: 'power2.out',
      onUpdate: () => setVal(parseFloat(obj.n.toFixed(stat.decimals))),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }, [stat]);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '0 8px' }}>
      <div style={{
        fontFamily: '"Inter",sans-serif', fontWeight: 600,
        fontSize: 'clamp(28px,3.5vw,44px)', lineHeight: 1,
        background: `linear-gradient(135deg,${C.seaLt},${C.seaDk})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {stat.decimals ? val.toFixed(1) : val.toLocaleString('en-IN')}{stat.suffix}
      </div>
      <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 600, color: C.muted, marginTop: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {stat.label}
      </div>
    </div>
  );
}

function UspCard({ usp, index }: { usp: typeof USPS[0]; index: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 28, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.72, delay: 0.07 * index, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
    );
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.white : C.bgAlt,
        border: `1.5px solid ${hov ? C.seaBd : C.border}`,
        borderRadius: 18, padding: 'clamp(18px,2.5vw,26px)',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'all 0.3s ease',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? `0 18px 44px rgba(45,143,123,0.13)` : '0 2px 8px rgba(0,0,0,0.03)',
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* hover inner glow */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle,${C.seaBg},transparent 70%)`, opacity: hov ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none' }}/>

      <div style={{ width: 44, height: 44, borderRadius: 12, background: hov ? C.seaBg : 'rgba(45,143,123,0.05)', border: `1.5px solid ${hov ? C.seaBd : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.sea, transition: 'all 0.3s' }}>
        {usp.icon}
      </div>
      <div>
        <div style={{ fontFamily: '"Inter",sans-serif', fontWeight: 600, fontSize: 16, color: hov ? C.text : C.sub, marginBottom: 6, transition: 'color 0.25s' }}>{usp.title}</div>
        <div style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{usp.body}</div>
      </div>
    </div>
  );
}

export default function AboutWhyUs() {
  const headRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 88%', once: true } }
    );
    gsap.fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 90%', once: true } }
    );
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, ease: 'power2.inOut',
          scrollTrigger: { trigger: lineRef.current, start: 'top 90%', once: true } }
      );
    }
  }, []);

  return (
    <section style={{ background: C.bg, padding: 'clamp(60px,8vw,100px) 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* heading */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.26em', textTransform: 'uppercase' }}>The Kafira Difference</span>
            <div style={{ height: 1, width: 28, background: `linear-gradient(to left,transparent,${C.sea})` }}/>
          </div>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 800, fontSize: 'clamp(28px,3.8vw,52px)', color: C.text, lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.01em' }}>
            Six reasons travelers <span style={{  color: C.sea }}>choose us</span>
          </h2>
          <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 15, color: C.muted, maxWidth: 480, margin: '0 auto' }}>
            Over 50,000 happy travelers can't be wrong. Here's what sets Kafira apart.
          </p>
        </div>

        {/* USP grid */}
        <div className="usp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 52 }}>
          {USPS.map((u, i) => <UspCard key={i} usp={u} index={i}/>)}
        </div>

        {/* divider */}
        <div ref={lineRef} style={{ height: 1, background: C.seaBd, marginBottom: 52 }}/>

        {/* stats */}
        <div
          ref={statsRef}
          style={{
            background: `linear-gradient(135deg,rgba(45,143,123,0.07),rgba(26,107,88,0.04))`,
            border: `1.5px solid ${C.seaBd}`, borderRadius: 22,
            padding: 'clamp(28px,4vw,44px)',
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24,
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* top accent line */}
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, borderRadius: 999, background: `linear-gradient(to right,transparent,${C.sea},transparent)`, opacity: 0.5 }}/>
          {/* inner glow */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%,rgba(45,143,123,0.05) 0%,transparent 65%)`, pointerEvents: 'none' }}/>

          {STATS.map((s, i) => (
            <div key={i} style={{ position: 'relative', zIndex: 1 }}>
              <StatItem stat={s}/>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .usp-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 540px) { .usp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}