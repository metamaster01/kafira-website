'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const C = {
  bg:    '#f4f9f8', bgAlt: '#eaf3f1', white: '#ffffff',
  text:  '#0e1e1b', sub:   '#2d5a52', muted: '#6b9e94',
  border:'rgba(45,143,123,0.12)',
  sea:   '#2d8f7b', seaDk: '#1a6b58', seaLt: '#3db89e',
  seaBg: 'rgba(45,143,123,0.09)', seaBd: 'rgba(45,143,123,0.22)',
  darkBg:'#071a16',
};

export default function AboutVisionMission() {
  const cardsRef   = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll<HTMLElement>('.vm-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 36, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 88%', once: true } }
      );
    }
    gsap.fromTo(promiseRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: promiseRef.current, start: 'top 88%', once: true } }
    );
  }, []);

  return (
    <section style={{ background: C.bg, padding: '0 24px clamp(60px,8vw,100px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── VISION / MISSION CARDS ── */}
        <div ref={cardsRef} className="vm-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {[
            {
              title: 'Our Vision',
              text: 'To redefine modern luxury travel through personalized experiences.',
              image: '/about-vision.jpg',
              bg: C.seaDk,
            },
            {
              title: 'Our Mission',
              text: 'To make every journey seamless, inspiring, and memorable.',
              image: '/about-mision.png',
              bg: C.darkBg,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="vm-card"
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                minHeight: 260,
                background: card.bg,
                boxShadow: '0 8px 32px rgba(14,30,27,0.15)',
                cursor: 'default',
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.55, transition: 'opacity 0.4s, transform 0.5s', transform: 'scale(1)' }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; (e.currentTarget as HTMLImageElement).style.opacity = '0.45'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.opacity = '0.55'; }}
              />
              {/* gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(7,26,22,0.88) 0%,rgba(7,26,22,0.2) 60%,transparent 100%)', pointerEvents: 'none' }}/>

              {/* content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px,3vw,32px)' }}>
                <h3 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 800, fontSize: 'clamp(20px,2.5vw,28px)', color: '#e8f7f4', marginBottom: 10, lineHeight: 1.1 }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 14, color: 'rgba(180,230,220,0.78)', lineHeight: 1.65 }}>
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── OUR PROMISE ── */}
        <div
          ref={promiseRef}
          className="promise-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'center' }}
        >
          {/* text side */}
          <div style={{ padding: 'clamp(28px,4vw,48px)', background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, boxShadow: '0 4px 24px rgba(14,30,27,0.05)' }}>
            {/* eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ height: 1, width: 22, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
              <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 700, color: C.sea, letterSpacing: '0.24em', textTransform: 'uppercase' }}>Our Promise</span>
            </div>

            <h3 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 800, fontSize: 'clamp(26px,3vw,42px)', color: C.text, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.01em' }}>
              Our <span style={{ fontStyle: 'italic', color: C.sea }}>Promise</span>
            </h3>
            <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 15, color: C.sub, lineHeight: 1.78, marginBottom: 24 }}>
              Authentic destinations, premium comfort, and exceptional support.
            </p>

            {/* promise points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🌍', title: 'Authentic destinations', desc: 'Carefully curated places that feel real, not touristy.' },
                { icon: '🛎️', title: 'Premium comfort', desc: 'Handpicked stays that balance quality and local character.' },
                { icon: '🤝', title: 'Exceptional support', desc: '24/7 assistance — before, during, and after your trip.' },
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: C.seaBg, border: `1px solid ${C.seaBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>
                    {pt.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 2 }}>{pt.title}</div>
                    <div style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{pt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* image side */}
          <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', background: 'linear-gradient(145deg,#0a2520,#0d3028)', boxShadow: '0 8px 32px rgba(14,30,27,0.15)' }}>
            <img
              src="/about-promise.png"
              alt="Kafira promise"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .vm-grid     { grid-template-columns: 1fr !important; }
          .promise-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}