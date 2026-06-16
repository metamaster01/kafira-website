'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const C = {
  bg:    '#f4f9f8',
  bgAlt: '#eaf3f1',
  white: '#ffffff',
  text:  '#0e1e1b',
  sub:   '#2d5a52',
  muted: '#6b9e94',
  border:'rgba(45,143,123,0.12)',
  sea:   '#2d8f7b',
  seaDk: '#1a6b58',
  seaLt: '#3db89e',
  seaBg: 'rgba(45,143,123,0.09)',
  seaBd: 'rgba(45,143,123,0.22)',
};

const HIGHLIGHTS = [
  {
    title: 'Fully customised',
    desc:  'No two Kafira trips are alike — each is built around you.',
  },
  {
    title: 'Local expertise',
    desc:  'Our on-ground teams know every shortcut, hidden gem, and best-kept secret.',
  },
  {
    title: 'End-to-end care',
    desc:  "From first enquiry to safe return — we're with you every step.",
  },
];

export default function WhyKafira() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const img  = imgRef.current;
    const head = headRef.current;
    const sec  = sectionRef.current;
    if (!img || !head || !sec) return;

    // image slide-in from left
    gsap.fromTo(img,
      { opacity: 0, x: -52, scale: 0.95 },
      {
        opacity: 1, x: 0, scale: 1,
        duration: 1.05, ease: 'power3.out',
        scrollTrigger: { trigger: img, start: 'top 84%', once: true },
      }
    );

    // subtle parallax on image — desktop only
    if (!isMobile) {
      gsap.to(img, {
        y: -32, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
    }

    // text block slide-in from right
    gsap.fromTo(head,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        duration: 0.90, ease: 'power3.out',
        scrollTrigger: { trigger: head, start: 'top 86%', once: true },
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: C.bg,
        padding: 'clamp(64px,8vw,110px) 0 clamp(56px,7vw,90px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Background orbs ── */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-10%', left:'-8%', width:520, height:520, borderRadius:'50%', background:'radial-gradient(circle,rgba(45,143,123,0.12) 0%,transparent 65%)', filter:'blur(2px)' }}/>
        <div style={{ position:'absolute', bottom:'-6%', right:'-6%', width:440, height:440, borderRadius:'50%', background:'radial-gradient(circle,rgba(61,184,158,0.10) 0%,transparent 65%)', filter:'blur(2px)' }}/>
      </div>

      <div style={{ maxWidth: 1200, margin:'0 auto', padding:'0 clamp(20px,4vw,48px)', position:'relative', zIndex:1 }}>

        {/* ── TWO COLUMN GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 48 : 72,
          alignItems: 'center',
        }}>

          {/* ── LEFT: image ── */}
          <div ref={imgRef} style={{ position:'relative' }}>
            {/* decorative outer ring */}
            <div style={{
              position:'absolute', top:'6%', left:'-5%',
              width:'110%', height:'110%',
              borderRadius: 30,
              border:`1px solid ${C.seaBd}`,
              zIndex:0, pointerEvents:'none',
            }}/>

            <div style={{
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: `0 24px 60px rgba(14,30,27,0.18), 0 0 0 1px ${C.seaBd}`,
              position: 'relative',
              zIndex: 1,
              aspectRatio: isMobile ? '16/10' : '4/5',
            }}>
              <img
                src="/why-choose-4.jpg"
                alt="Kafira journey"
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  (el.parentElement as HTMLDivElement).style.background =
                    `linear-gradient(145deg,${C.bgAlt},#c2deda,${C.sea}44)`;
                }}
              />
              {/* bottom gradient */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(14,30,27,0.58) 0%,transparent 52%)', pointerEvents:'none' }}/>
              {/* quote */}
              <div style={{
                position:'absolute', bottom:20, left:18, right:18,
                fontFamily:'"DM Serif Display",serif',
                 fontSize:'clamp(14px,1.4vw,18px)',
                color:'rgba(236,255,252,0.90)', lineHeight:1.5,
              }}>
                "Every journey we craft is a story only you can tell."
              </div>
            </div>
          </div>

          {/* ── RIGHT: text ── */}
          <div ref={headRef}>
            {/* eyebrow */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ height:1.5, width:24, background:`linear-gradient(to right,transparent,${C.sea})` }}/>
              <span style={{ fontFamily:'"Outfit",sans-serif', fontSize:9.5, fontWeight:700, color:C.sea, letterSpacing:'0.26em', textTransform:'uppercase' }}>
                Why Choose Us
              </span>
            </div>

            {/* headline */}
            <h2 style={{
              fontFamily:'"DM Serif Display",serif',
              fontWeight:400,
              fontSize:'clamp(30px,3.8vw,54px)',
              lineHeight:1.08,
              color:C.text,
              margin:'0 0 18px',
              letterSpacing:'-0.01em',
            }}>
              We don't sell trips.<br/>
              <span style={{  color:C.sea }}>We craft journeys.</span>
            </h2>

            {/* body */}
            <p style={{
              fontFamily:'"Outfit",sans-serif',
              fontSize:'clamp(13px,1.1vw,15px)',
              fontWeight:400,
              color:C.sub,
              lineHeight:1.80,
              margin:'0 0 30px',
              maxWidth: 480,
            }}>
              At Kafira, every trip is personal. Since 2012, we've been building
              travel experiences that go beyond the ordinary — from remote Himalayan
              trails to royal Rajasthan forts, misty Coorg hills to Kerala's golden
              backwaters. We listen first, then plan.
            </p>

            {/* highlight list */}
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:34 }}>
              {HIGHLIGHTS.map((item, i) => (
                <HighlightRow key={i} title={item.title} desc={item.desc}/>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <CTALink href="#tours" variant="solid">
                Explore Packages
              </CTALink>
              <CTALink href="https://wa.me/919253289347" variant="outline" external>
                Chat with us →
              </CTALink>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}

// ── Highlight row ──────────────────────────────────────
function HighlightRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:13 }}>
      <div style={{
        width:32, height:32, borderRadius:9, flexShrink:0,
        background:'rgba(45,143,123,0.09)',
        border:'1.5px solid rgba(45,143,123,0.22)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'#2d8f7b', fontSize:13, marginTop:1,
      }}>
        ✦
      </div>
      <div>
        <div style={{
          fontFamily:'"DM Serif Display",serif',
          fontWeight:400, fontSize:16,
          color:'#0e1e1b', marginBottom:3,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily:'"Outfit",sans-serif',
          fontSize:13, fontWeight:400,
          color:'#6b9e94', lineHeight:1.62,
        }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

// ── CTA link button ────────────────────────────────────
function CTALink({
  href, variant, external, children,
}: {
  href: string;
  variant: 'solid' | 'outline';
  external?: boolean;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);

  const base: React.CSSProperties = {
    display:'inline-flex', alignItems:'center',
    padding:'12px 26px', borderRadius:999,
    fontFamily:'"Outfit",sans-serif', fontSize:13, fontWeight:700,
    textDecoration:'none', letterSpacing:'0.02em',
    cursor:'pointer', transition:'all 0.24s ease',
    whiteSpace:'nowrap',
  };

  const solid: React.CSSProperties = {
    background: hov
      ? `linear-gradient(135deg,#3db89e,#1a6b58)`
      : `linear-gradient(135deg,#2d8f7b,#1a6b58)`,
    color:'#fff',
    boxShadow: hov ? '0 12px 28px rgba(45,143,123,0.42)' : '0 6px 18px rgba(45,143,123,0.30)',
    transform: hov ? 'translateY(-2px)' : 'none',
  };

  const outline: React.CSSProperties = {
    background: hov ? 'rgba(45,143,123,0.09)' : 'transparent',
    border:`1.5px solid ${hov ? '#2d8f7b' : 'rgba(45,143,123,0.28)'}`,
    color: hov ? '#2d8f7b' : '#2d5a52',
    transform: hov ? 'translateY(-2px)' : 'none',
  };

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...(variant === 'solid' ? solid : outline) }}
    >
      {children}
    </a>
  );
}