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

const STEPS = [
  {
    num: '01',
    title: 'Understand Your Requirements',
    desc: 'We learn about your travel preferences and budget.',
    image: '/about-step.png',
    offsetY: 0,
  },
  {
    num: '02',
    title: 'Create Personalized Itinerary',
    desc: 'Our experts design the perfect travel plan.',
    image: '/about-step.png',
    offsetY: 40,
  },
  {
    num: '03',
    title: 'Booking & Confirmation',
    desc: 'Hotels, transport, and activities are arranged.',
    image: '/about-step.png',
    offsetY: 0,
  },
  {
    num: '04',
    title: 'Enjoy Your Trip',
    desc: 'Travel stress-free with our continuous support.',
    image: '/about-step.png',
    offsetY: 40,
  },
];

export default function AboutProcess() {
  const headRef  = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 88%', once: true } }
    );

    if (stepsRef.current) {
      const cards = stepsRef.current.querySelectorAll<HTMLElement>('.step-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 48, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 88%', once: true } }
      );
    }
  }, []);

  return (
    <section style={{ background: C.bgAlt, padding: 'clamp(60px,8vw,100px) 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* heading */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,72px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.26em', textTransform: 'uppercase' }}>Our Process</span>
            <div style={{ height: 1, width: 28, background: `linear-gradient(to left,transparent,${C.sea})` }}/>
          </div>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 800, fontSize: 'clamp(28px,3.8vw,52px)', color: C.text, lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.01em' }}>
            How We Plan <span style={{ fontStyle: 'italic', color: C.sea }}>Your Journey</span>
          </h2>
          <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 15, color: C.muted, maxWidth: 460, margin: '0 auto' }}>
            A seamless four-step process that turns your dream trip into reality.
          </p>
        </div>

        {/* steps grid — staggered vertical offsets on desktop */}
        <div
          ref={stepsRef}
          className="steps-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, alignItems: 'start' }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="step-card"
              style={{
                marginTop: step.offsetY,
                borderRadius: 20, overflow: 'hidden',
                background: i % 2 === 0 ? C.sea : C.darkBg,
                boxShadow: '0 8px 32px rgba(14,30,27,0.18)',
                position: 'relative', minHeight: 280,
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-8px)'; el.style.boxShadow = '0 20px 48px rgba(14,30,27,0.28)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 32px rgba(14,30,27,0.18)'; }}
            >
              {/* background image */}
              <img
                src={step.image}
                alt={step.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.35 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              {/* gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(7,26,22,0.92) 0%,rgba(7,26,22,0.2) 60%,transparent 100%)', pointerEvents: 'none' }}/>

              {/* content */}
              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(20px,2.5vw,28px)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 280 }}>
                {/* step number badge */}
                <div style={{
                  position: 'absolute', top: 'clamp(16px,2.5vw,24px)', left: 'clamp(16px,2.5vw,24px)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 800,
                  color: '#fff', letterSpacing: '0.05em',
                }}>
                  {step.num}
                </div>

                <div>
                  <h3 style={{
                    fontFamily: '"Playfair Display",serif',
                    fontWeight: 700,
                    fontSize: 'clamp(16px,1.8vw,20px)',
                    color: '#e8f7f4',
                    lineHeight: 1.25,
                    marginBottom: 8,
                    fontStyle: 'italic',
                  }}>
                    Step {i + 1} —{' '}
                    <span style={{ fontStyle: 'italic', color: C.seaLt }}>
                      {step.title}
                    </span>
                  </h3>
                  <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: 13, color: 'rgba(180,230,220,0.72)', lineHeight: 1.65 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2,1fr) !important; }
          .step-card  { margin-top: 0 !important; }
        }
        @media (max-width: 540px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}