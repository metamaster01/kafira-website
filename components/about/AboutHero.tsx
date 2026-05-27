'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const C = {
  bg:    '#f4f9f8', bgAlt: '#eaf3f1', white: '#ffffff',
  text:  '#0e1e1b', sub:   '#2d5a52', muted: '#6b9e94',
  border:'rgba(45,143,123,0.12)',
  sea:   '#2d8f7b', seaDk: '#1a6b58', seaLt: '#3db89e',
  seaBg: 'rgba(45,143,123,0.09)', seaBd: 'rgba(45,143,123,0.22)',
  darkBg:'#071a16',
};

const PILLARS = [
  {
    title: 'Fully customised',
    desc: 'No two Kafira trips are alike — each is built around you.',
  },
  {
    title: 'Local expertise',
    desc: 'Our on-ground teams know every shortcut, hidden gem, and best-kept secret.',
  },
  {
    title: 'End to end care',
    desc: "From first enquiry to safe return — we're with you every step.",
  },
];

export default function AboutHero() {
  const headRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const pillRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // heading
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
    );
    // image
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: imgRef.current, start: 'top 90%', once: true } }
    );
    // pillars stagger
    if (pillRef.current) {
      const items = pillRef.current.querySelectorAll<HTMLElement>('.pillar-item');
      gsap.fromTo(items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: pillRef.current, start: 'top 88%', once: true } }
      );
    }
  }, []);

  return (
    <section style={{ background: C.bg, overflow: 'hidden' }}>

      {/* ── TITLE BLOCK ── */}
      <div ref={headRef} style={{ textAlign: 'center', padding: 'clamp(80px,10vw,120px) 24px clamp(40px,5vw,60px)', background: "linear-gradient(135deg,#071a16 0%,#0d2821 40%,#0a1e18 70%,#071a16 100%)" }}>
        {/* eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
          <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.26em', textTransform: 'uppercase' }}>About Kafira</span>
          <div style={{ height: 1, width: 28, background: `linear-gradient(to left,transparent,${C.sea})` }}/>
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display",serif',
          fontWeight: 800,
          fontSize: 'clamp(32px,5.5vw,68px)',
          lineHeight: 1.08,
          color: C.white,
          marginBottom: 18,
          letterSpacing: '-0.02em',
        }}>
          Crafting Extraordinary Journeys<br/>
          <span style={{ color: C.sea, fontStyle: 'italic' }}>Across The World</span>
        </h1>

        <p style={{
          fontFamily: '"Montserrat",sans-serif', fontWeight: 400,
          fontSize: 'clamp(14px,1.5vw,17px)',
          color: C.white, lineHeight: 1.75,
          maxWidth: 600, margin: '0 auto 32px',
        }}>
          At Kafira, every trip is personal. Since 2012, we've been building travel experiences that go beyond the ordinary — from remote Himalayan trails to royal Rajasthan forts, from misty Coorg hills to Kerala's golden backwaters. We listen first, then plan.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/tours" style={{
            padding: '13px 30px', borderRadius: 999,
            background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
            color: '#fff', fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 700,
            textDecoration: 'none', boxShadow: `0 6px 22px rgba(45,143,123,0.38)`,
            transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', gap: 7,
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 12px 30px rgba(45,143,123,0.5)`; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = `0 6px 22px rgba(45,143,123,0.38)`; }}
          >
            Explore Packages <ArrowRight size={14}/>
          </a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{
            padding: '13px 26px', borderRadius: 999,
            background: 'transparent', border: `1.5px solid ${C.seaBd}`,
            color: C.sub, fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.seaBg; el.style.color = C.sea; el.style.borderColor = C.sea; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = C.sub; el.style.borderColor = C.seaBd; }}
          >
            Chat with us →
          </a>
        </div>
      </div>

      {/* ── TEAM PHOTO ── */}
      <div ref={imgRef} style={{ position: 'relative', margin: '0 24px', maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' , paddingTop: 'clamp(40px,5vw,60px)' }}>
        {/* quote overlay */}
        <div style={{
          position: 'absolute', top: 20, left: 28, zIndex: 10,
          fontFamily: '"Playfair Display",serif', fontStyle: 'italic',
          fontSize: 'clamp(14px,1.6vw,18px)',
          color: 'rgba(255,255,255,0.9)',
          background: 'rgba(7,26,22,0.55)',
          backdropFilter: 'blur(8px)',
          borderRadius: 10, padding: '10px 18px',
          border: '1px solid rgba(255,255,255,0.12)',
          maxWidth: 360,
        }}>
          "Every journey we craft is a story only you can tell."
        </div>

        <div style={{ borderRadius: 22, overflow: 'hidden', aspectRatio: '16/7', background: 'linear-gradient(145deg,#0a2520,#0d3028)', boxShadow: `0 24px 64px rgba(14,30,27,0.18), 0 0 0 1px ${C.seaBd}` }}>
          <img
            src="/why-us.webp"
            alt="Kafira team on a trip"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          {/* gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(7,26,22,0.55) 0%,transparent 50%)', pointerEvents: 'none' }}/>
        </div>
      </div>

      {/* ── 3 PILLARS ── */}
      <div ref={pillRef} style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,56px) 24px' }}>
        <div className="pillar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="pillar-item"
              style={{
                padding: 'clamp(22px,3vw,36px)',
                borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
              }}
            >
              {/* + icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${C.sea}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Plus size={11} color={C.sea} strokeWidth={2.5}/>
                </div>
                <span style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 'clamp(15px,1.6vw,18px)', color: C.text }}>
                  {p.title}
                </span>
              </div>
              <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pillar-grid { grid-template-columns: 1fr !important; }
          .pillar-item { border-right: none !important; border-bottom: 1px solid rgba(45,143,123,0.12); }
          .pillar-item:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
