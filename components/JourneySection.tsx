'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Phone Mockup wrapper ─────────────────────────────
function PhoneMockup({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { y: 80, opacity: 0, scale: 0.92 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1.1, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
    // subtle float
    gsap.to(el, {
      y: -10, duration: 2.8 + delay * 0.4,
      ease: 'sine.inOut', repeat: -1, yoyo: true,
      delay: delay * 0.6,
    });
  }, [delay]);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: 44,
        background: '#1a1a1a',
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 2px rgba(255,255,255,0.06)',
        overflow: 'hidden',
        aspectRatio: '9/19.5',
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 24, background: '#1a1a1a',
          borderRadius: 12, zIndex: 10,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
        }}/>
        {/* status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 48,
          background: 'rgba(255,255,255,0.96)', zIndex: 9,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 20px 6px',
        }}>
          <span style={{ fontSize: 11, fontFamily: 'Outfit,sans-serif', fontWeight: 600, color: '#1a1a1a' }}>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[4,3,2].map(h => <div key={h} style={{ width: 3, height: h * 2.5, background: '#1a1a1a', borderRadius: 1 }}/>)}
            <svg width="13" height="10" viewBox="0 0 13 10" fill="#1a1a1a"><path d="M6.5 2C8.8 2 10.8 3 12.2 4.6L13 3.7C11.4 1.9 9.1.8 6.5.8S1.6 1.9 0 3.7l.8.9C2.2 3 4.2 2 6.5 2zm0 2.4c1.5 0 2.9.6 3.9 1.6l.8-.9C10 3.9 8.3 3.2 6.5 3.2S3 3.9 1.8 5.1l.8.9C3.6 5 5 4.4 6.5 4.4zm0 2.4c.8 0 1.6.3 2.1.9l.8-.9C8.6 6 7.6 5.6 6.5 5.6S4.4 6 3.6 6.8l.8.9C5 7.1 5.7 6.8 6.5 6.8zM6.5 9a1 1 0 100-2 1 1 0 000 2z"/></svg>
            <div style={{ width: 18, height: 9, border: '1.5px solid #1a1a1a', borderRadius: 2, position:'relative' }}>
              <div style={{ position:'absolute', left: 1, top: 1, bottom: 1, width: '70%', background: '#1a1a1a', borderRadius: 1 }}/>
            </div>
          </div>
        </div>
        {/* screen image */}
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
        {/* home bar */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 100, height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 2, zIndex: 10,
        }}/>
        {/* screen glare */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
        }}/>
      </div>
    </div>
  );
}

// ── Bento Card ───────────────────────────────────────
function BentoCard({
  children, className = '', style = {},
  from = 'bottom', delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  from?: 'bottom' | 'left' | 'right';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      {
        opacity: 0,
        y: from === 'bottom' ? 50 : 0,
        x: from === 'left' ? -50 : from === 'right' ? 50 : 0,
      },
      {
        opacity: 1, y: 0, x: 0,
        duration: 0.9, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  }, [from, delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
}

// ── Step label ───────────────────────────────────────
function StepBadge({ n, label }: { n: string; label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 12, color: '#fff',
        flexShrink: 0,
      }}>{n}</div>
      <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

// ── Section heading ──────────────────────────────────
function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 40 });
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  }, []);

  return (
    <div ref={ref} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ height: 1, width: 32, background: 'linear-gradient(to right, transparent, #c9a84c)' }}/>
        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{eyebrow}</span>
        <div style={{ height: 1, width: 32, background: 'linear-gradient(to left, transparent, #c9a84c)' }}/>
      </div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 'clamp(32px,4vw,56px)', lineHeight: 1.1, color: '#1a1510', marginBottom: 16 }}>{title}</h2>
      <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 17, color: '#6b5e4e', lineHeight: 1.7 }}>{sub}</p>
    </div>
  );
}

// ════════════════════════════════════════════════════
// SECTION 1 — Planning
// ════════════════════════════════════════════════════
function PlanningSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
  }, []);

  return (
    <section style={{ background: '#faf7f2', padding: '120px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading
          eyebrow="Step 01 — Planning"
          title={<>Your journey starts with<br/><span style={{ fontStyle: 'italic', color: '#c9a84c' }}>a single tap</span></>}
          sub="Browse curated destinations, pick your dates, choose your crew — Kafira builds your perfect itinerary in minutes."
        />

        {/* BENTO GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto', gap: 16 }}>

          {/* Phone card — spans 4 cols, 2 rows */}
          <BentoCard
            delay={0.1}
            style={{
              gridColumn: '1 / 5', gridRow: '1 / 3',
              background: 'linear-gradient(145deg, #1a3a5c, #0d2038)',
              borderRadius: 28, padding: '40px 32px 48px',
              display: 'flex', flexDirection: 'column',
              minHeight: 520,
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* bg pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(201,168,76,0.12) 0%, transparent 60%)', pointerEvents: 'none' }}/>
            <StepBadge n="01" label="Browse & Plan"/>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 26, color: '#f5f0e8', marginBottom: 8, lineHeight: 1.2 }}>Weekend Getaway<br/>made effortless</h3>
            <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: 'rgba(245,240,232,0.55)', marginBottom: 28, lineHeight: 1.6 }}>Pick a destination, set your dates, see real pricing — all in one flow.</p>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div style={{ width: '75%' }}>
                <PhoneMockup src="/image-3.png" alt="Booking screen" delay={0.2}/>
              </div>
            </div>
          </BentoCard>

          {/* Destinations card */}
          <BentoCard
            delay={0.2}
            from="right"
            style={{
              gridColumn: '5 / 9', gridRow: '1 / 2',
              background: '#fff',
              borderRadius: 28, padding: '32px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}
          >
            <StepBadge n="02" label="Choose Destination"/>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 22, color: '#1a1510', lineHeight: 1.2 }}>120+ handpicked<br/>destinations</h3>
            {/* destination pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['🏔 Leh Ladakh','🌊 Kerala','🏜 Rajasthan','🌴 Goa','⛩ Jaipur','🗻 Manali','🌺 Coorg','🐘 Coorg'].map((d,i) => (
                <div key={i} style={{
                  padding: '6px 14px', borderRadius: 999,
                  background: i === 0 ? 'linear-gradient(135deg,#c9a84c,#8b6914)' : 'rgba(201,168,76,0.08)',
                  color: i === 0 ? '#fff' : '#6b5e4e',
                  fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 500,
                  border: i === 0 ? 'none' : '1px solid rgba(201,168,76,0.18)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{d}</div>
              ))}
            </div>
          </BentoCard>

          {/* Stats card */}
          <BentoCard
            delay={0.3}
            from="right"
            style={{
              gridColumn: '9 / 13', gridRow: '1 / 2',
              background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
              borderRadius: 28, padding: '32px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Average savings</div>
              <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 52, color: '#fff', lineHeight: 1 }}>₹4,200</div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 8 }}>per trip vs booking alone</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.25)' }}/>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>5,000+ trips crafted</span>
            </div>
          </BentoCard>

          {/* Route planner card */}
          <BentoCard
            delay={0.35}
            from="right"
            style={{
              gridColumn: '5 / 9', gridRow: '2 / 3',
              background: 'linear-gradient(145deg, #0f2a1a, #1a4a28)',
              borderRadius: 28, padding: '32px',
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(201,168,76,0.1) 0%, transparent 60%)', pointerEvents: 'none' }}/>
            <StepBadge n="03" label="Trip Planner"/>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 22, color: '#f5f0e8', marginBottom: 8, lineHeight: 1.2 }}>AI-powered<br/>route planning</h3>
            <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: 'rgba(245,240,232,0.55)', lineHeight: 1.6, marginBottom: 20 }}>Map your journey stop by stop. Save, share, and navigate with ease.</p>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div style={{ width: '68%' }}>
                <PhoneMockup src="/image-2.png" alt="Trip planner screen" delay={0.4}/>
              </div>
            </div>
          </BentoCard>

          {/* Wide bottom card */}
          <BentoCard
            delay={0.45}
            from="right"
            style={{
              gridColumn: '9 / 13', gridRow: '2 / 3',
              background: '#fff',
              borderRadius: 28, padding: '32px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Real reviews</div>
              <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 20, color: '#1a1510', marginBottom: 16, lineHeight: 1.3 }}>Trusted by 50,000+<br/>happy travelers</h3>
              {/* star rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 18, color: '#c9a84c' }}>★</span>)}
                </div>
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 14, fontWeight: 700, color: '#1a1510' }}>4.9</span>
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: '#6b5e4e' }}>(12,400 reviews)</span>
              </div>
            </div>
            {/* avatar strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: -4, marginTop: 16 }}>
              {['#e8d5a3','#c9a84c','#8b6914','#d4b896','#f5f0e8'].map((c,i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${c}, ${c}99)`, border: '2px solid #fff', marginLeft: i ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 700, color: '#5a3e10' }}>
                  {['A','R','K','S','M'][i]}
                </div>
              ))}
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: '#6b5e4e', marginLeft: 12 }}>+49,995 more</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════
// SECTION 2 — Experience (horizontal scroll)
// ════════════════════════════════════════════════════
function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  const CARDS = [
    { step: '01', title: 'Discover',     body: 'Browse 120+ curated destinations across India and beyond. Every place hand-vetted by our travel experts.',             color: '#1a3a5c', accent: '#4a9fd4', emoji: '🔍' },
    { step: '02', title: 'Plan',          body: 'AI-powered itinerary builder crafts your perfect schedule. Hotels, transport, activities — all in one place.',          color: '#0f2a1a', accent: '#4aad6a', emoji: '📋' },
    { step: '03', title: 'Book',          body: 'Instant confirmations, transparent pricing, zero hidden fees. Secure your whole trip in minutes.',                      color: '#2a1a0f', accent: '#c9a84c', emoji: '✅' },
    { step: '04', title: 'Experience',    body: 'Step off the plane and into an unforgettable story. On-ground support available 24/7 throughout your journey.',        color: '#2a0f1a', accent: '#d44a7a', emoji: '✨' },
    { step: '05', title: 'Remember',      body: 'Every photo, every laugh, every sunset — all curated into a digital travel memory book just for you.',                  color: '#1a0f2a', accent: '#9a6acd', emoji: '📸' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    const head    = headRef.current;
    if (!section || !track || !head) return;

    // heading reveal
    gsap.fromTo(head,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: head, start: 'top 85%', once: true } }
    );

    // horizontal scroll pinned
    const cards = track.querySelectorAll('.exp-card');
    const totalWidth = track.scrollWidth - window.innerWidth + 80;

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalWidth + 200}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // each card fades in as it enters
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0.3, scale: 0.9 },
        {
          opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * (totalWidth / CARDS.length)} top`,
            end: `top+=${(i + 1) * (totalWidth / CARDS.length)} top`,
            scrub: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#f5f0e8', overflow: 'hidden' }}>
      {/* heading (not pinned) */}
      <div ref={headRef} style={{ opacity: 0, textAlign: 'center', padding: '100px 24px 60px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ height: 1, width: 32, background: 'linear-gradient(to right, transparent, #c9a84c)' }}/>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase' }}>The Kafira Journey</span>
          <div style={{ height: 1, width: 32, background: 'linear-gradient(to left, transparent, #c9a84c)' }}/>
        </div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.1, color: '#1a1510', marginBottom: 16 }}>
          From dream to <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>memory</span>
        </h2>
        <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, color: '#6b5e4e', lineHeight: 1.7 }}>
          Scroll through every step of your Kafira journey — we handle it all so you just show up and shine.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: 'rgba(107,94,78,0.6)' }}>Scroll to explore →</span>
        </div>
      </div>

      {/* horizontal track */}
      <div style={{ padding: '0 60px 80px', overflow: 'visible' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: 20, width: 'max-content' }}>
          {CARDS.map((card, i) => (
            <div key={i} className="exp-card" style={{
              width: 340, flexShrink: 0, borderRadius: 28, padding: '44px 36px',
              background: card.color,
              position: 'relative', overflow: 'hidden',
              minHeight: 420,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              cursor: 'default',
              transition: 'box-shadow 0.3s ease',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = `0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px ${card.accent}44`}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
            >
              {/* bg glow */}
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 20%, ${card.accent}22 0%, transparent 65%)`, pointerEvents: 'none' }}/>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                  <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 11, color: `${card.accent}`, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Step {card.step}</span>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `${card.accent}22`, border: `1px solid ${card.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    {card.emoji}
                  </div>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 36, color: '#f5f0e8', marginBottom: 16, lineHeight: 1.1 }}>{card.title}</h3>
                <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}>{card.body}</p>
              </div>
              {/* card number watermark */}
              <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 900, fontSize: 120, color: `${card.accent}08`, position: 'absolute', bottom: -20, right: -10, lineHeight: 1, userSelect: 'none' }}>{card.step}</div>
              {/* bottom line */}
              <div style={{ height: 2, background: `linear-gradient(to right, ${card.accent}, transparent)`, borderRadius: 1, marginTop: 36 }}/>
            </div>
          ))}
          {/* end padding card */}
          <div style={{ width: 60, flexShrink: 0 }}/>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════
// SECTION 3 — Memories (magazine layout)
// ════════════════════════════════════════════════════
function MemoriesSection() {
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1, delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, []);

  const MEMORIES = [
    { label: 'Mountain Vista',    location: 'Leh Ladakh',      aspect: '4/5',  bg: 'linear-gradient(145deg,#1a3a2a,#2a5a3a)' },
    { label: 'Alpine Lake',       location: 'Manali',           aspect: '4/3',  bg: 'linear-gradient(145deg,#1a2a4a,#2a3a6a)' },
    { label: 'Forest Trail',      location: 'Coorg',            aspect: '1/1',  bg: 'linear-gradient(145deg,#2a3a1a,#3a5a2a)' },
    { label: 'Wildflower Meadow', location: 'Uttarakhand',      aspect: '4/3',  bg: 'linear-gradient(145deg,#3a2a1a,#5a3a1a)' },
  ];

  return (
    <section style={{ background: '#fff', padding: '120px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading
          eyebrow="Step 03 — Memories"
          title={<>Every trip becomes<br/>a <span style={{ fontStyle:'italic', color:'#c9a84c' }}>story worth telling</span></>}
          sub="Kafira curates your travel moments into a beautiful digital memory book — photos, routes, highlights. Yours forever."
        />

        {/* Magazine grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 16, marginBottom: 40 }}>
          {/* Big left card with phone */}
          <BentoCard
            delay={0.1}
            style={{
              gridColumn: '1/2', gridRow: '1/3',
              background: 'linear-gradient(145deg, #1a0f2a, #2a1a4a)',
              borderRadius: 28, padding: '44px 36px 48px',
              display: 'flex', flexDirection: 'column',
              minHeight: 580, position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(154,106,205,0.15) 0%, transparent 60%)', pointerEvents: 'none' }}/>
            <StepBadge n="03" label="Your Memory Book"/>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 28, color: '#f5f0e8', marginBottom: 10, lineHeight: 1.2 }}>Every photo.<br/>Every moment.</h3>
            <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 14, color: 'rgba(245,240,232,0.55)', lineHeight: 1.65, marginBottom: 28 }}>Scroll through your personal travel gallery — organized by trip, location, and vibe.</p>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div style={{ width: '72%' }}>
                <PhoneMockup src="/image-1.png" alt="Memories screen" delay={0.3}/>
              </div>
            </div>
          </BentoCard>

          {/* Right top: photo grid */}
          <BentoCard
            delay={0.2}
            from="right"
            style={{
              gridColumn: '2/3', gridRow: '1/2',
              background: '#faf7f2',
              borderRadius: 28, padding: '32px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>📸 Recent memories</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {MEMORIES.slice(0,4).map((m, i) => (
                <div
                  key={i}
                  ref={el => { imgRefs.current[i] = el; }}
                  style={{
                    borderRadius: 16, overflow: 'hidden', position: 'relative',
                    aspectRatio: i === 0 || i === 3 ? '4/5' : '4/3',
                    background: m.bg,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={`/memories-${i+1}.jpg`}
                    alt={m.label}
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 50%)'}}/>
                  <div style={{ position:'absolute',bottom:10,left:12 }}>
                    <div style={{ fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:600,color:'#fff',lineHeight:1 }}>{m.label}</div>
                    <div style={{ fontFamily:'Outfit,sans-serif',fontSize:10,color:'rgba(255,255,255,0.65)',marginTop:2 }}>📍 {m.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Right bottom: CTA */}
          <BentoCard
            delay={0.35}
            from="right"
            style={{
              gridColumn: '2/3', gridRow: '2/3',
              background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
              borderRadius: 28, padding: '36px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.7)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:12 }}>Start your story</div>
              <h3 style={{ fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:28,color:'#fff',lineHeight:1.2,marginBottom:12 }}>Ready to create memories that last a lifetime?</h3>
              <p style={{ fontFamily:'Outfit,sans-serif',fontSize:14,color:'rgba(255,255,255,0.75)',lineHeight:1.6 }}>Join 50,000+ travelers who've trusted Kafira with their most precious moments.</p>
            </div>
            <div style={{ display:'flex',gap:12,marginTop:24,flexWrap:'wrap' }}>
              <a href="#tours" style={{ padding:'12px 24px',borderRadius:999,background:'#fff',color:'#8b6914',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:700,textDecoration:'none',transition:'all 0.25s' }}
                onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}
                onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.transform='none'}
              >Plan My Trip</a>
              <a href="https://wa.me/919999999999" style={{ padding:'12px 24px',borderRadius:999,background:'rgba(255,255,255,0.15)',color:'#fff',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.3)',transition:'all 0.25s' }}
                onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,0.25)'}
                onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,0.15)'}
              >WhatsApp Us</a>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════
export default function JourneySection() {
  return (
    <>
      <PlanningSection/>
      <ExperienceSection/>
      <MemoriesSection/>
    </>
  );
}
