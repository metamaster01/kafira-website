// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // ── USP data ──────────────────────────────────────────
// const USPS = [
//   {
//     icon: '🧭',
//     title: 'Handcrafted Itineraries',
//     body: 'Every trip is built from scratch around your interests, pace, and budget — never a copy-paste package.',
//   },
//   {
//     icon: '🛡️',
//     title: 'Zero Hidden Fees',
//     body: 'The price you see is the price you pay. Full transparency from booking to boarding.',
//   },
//   {
//     icon: '📞',
//     title: '24/7 On-ground Support',
//     body: 'Our team is reachable round the clock — whether you\'re in Leh or Lisbon, help is one call away.',
//   },
//   {
//     icon: '⭐',
//     title: '12 Years of Expertise',
//     body: 'Over a decade of crafting memorable journeys across India and beyond for 50,000+ travelers.',
//   },
//   {
//     icon: '💰',
//     title: 'Best Price Guarantee',
//     body: 'We match or beat any comparable itinerary price. Save an average of ₹4,200 per trip vs booking alone.',
//   },
//   {
//     icon: '🌍',
//     title: 'Sustainable Travel',
//     body: 'We partner only with eco-conscious operators and contribute to local communities at every destination.',
//   },
// ];

// // ── Stat counters ─────────────────────────────────────
// const STATS = [
//   { value: 50000, suffix: '+', label: 'Happy Travelers' },
//   { value: 120,   suffix: '+', label: 'Destinations'    },
//   { value: 4.9,   suffix: '★', label: 'Average Rating'  },
//   { value: 12,    suffix: ' Yrs', label: 'of Excellence' },
// ];

// // animated counter hook
// function useCounter(target: number, decimals = 0) {
//   const [val, setVal] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     const obj = { n: 0 };
//     gsap.to(obj, {
//       n: target, duration: 2, ease: 'power2.out',
//       onUpdate: () => setVal(parseFloat(obj.n.toFixed(decimals))),
//       scrollTrigger: { trigger: el, start: 'top 88%', once: true },
//     });
//   }, [target, decimals]);
//   return { ref, val };
// }

// function StatItem({ stat }: { stat: typeof STATS[0] }) {
//   const decimals = stat.value % 1 !== 0 ? 1 : 0;
//   const { ref, val } = useCounter(stat.value, decimals);
//   return (
//     <div ref={ref} style={{ textAlign: 'center', padding: '0 8px' }}>
//       <div style={{
//         fontFamily: 'Playfair Display,serif', fontWeight: 900,
//         fontSize: 'clamp(28px,3.5vw,44px)', lineHeight: 1,
//         background: 'linear-gradient(135deg,#c9a84c,#e8d5a3)',
//         WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
//       }}>
//         {decimals ? val.toFixed(1) : val.toLocaleString('en-IN')}{stat.suffix}
//       </div>
//       <div style={{
//         fontFamily: 'Outfit,sans-serif', fontSize: 12,
//         color: 'rgba(245,240,232,0.45)', marginTop: 6, letterSpacing: '0.04em',
//       }}>{stat.label}</div>
//     </div>
//   );
// }

// // ── USP Card ──────────────────────────────────────────
// function UspCard({ usp, index }: { usp: typeof USPS[0]; index: number }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [hovered, setHovered] = useState(false);

//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     gsap.set(el, { opacity: 0, y: 28, scale: 0.96 });
//     gsap.to(el, {
//       opacity: 1, y: 0, scale: 1,
//       duration: 0.75, delay: 0.08 * index,
//       ease: 'power3.out',
//       scrollTrigger: { trigger: el, start: 'top 88%', once: true },
//     });
//   }, [index]);

//   return (
//     <div
//       ref={ref}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
//         border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.07)'}`,
//         borderRadius: 18, padding: '22px 20px',
//         display: 'flex', flexDirection: 'column', gap: 10,
//         transition: 'all 0.32s ease',
//         transform: hovered ? 'translateY(-4px)' : 'none',
//         boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.2)' : 'none',
//         cursor: 'default',
//       }}
//     >
//       <div style={{
//         width: 44, height: 44, borderRadius: 12,
//         background: hovered ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.08)',
//         border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.15)'}`,
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         fontSize: 20, flexShrink: 0,
//         transition: 'all 0.32s ease',
//       }}>{usp.icon}</div>
//       <div>
//         <div style={{
//           fontFamily: 'Playfair Display,serif', fontWeight: 700,
//           fontSize: 16, color: hovered ? '#f5f0e8' : 'rgba(245,240,232,0.88)',
//           lineHeight: 1.2, marginBottom: 6,
//           transition: 'color 0.25s',
//         }}>{usp.title}</div>
//         <div style={{
//           fontFamily: 'Outfit,sans-serif', fontSize: 12,
//           color: 'rgba(245,240,232,0.45)', lineHeight: 1.65,
//           transition: 'color 0.25s',
//         }}>{usp.body}</div>
//       </div>
//     </div>
//   );
// }

// // ── Main ──────────────────────────────────────────────
// export default function WhyKafira() {
//   const sectionRef  = useRef<HTMLElement>(null);
//   const imgRef      = useRef<HTMLDivElement>(null);
//   const headRef     = useRef<HTMLDivElement>(null);
//   const statsRef    = useRef<HTMLDivElement>(null);
//   const lineRef     = useRef<HTMLDivElement>(null);
//   const badgeRef    = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const img     = imgRef.current;
//     const head    = headRef.current;
//     const stats   = statsRef.current;
//     const line    = lineRef.current;
//     const badge   = badgeRef.current;
//     if (!section || !img || !head || !stats || !line || !badge) return;

//     // image: slide in from left + parallax on scroll
//     gsap.set(img, { opacity: 0, x: -60, scale: 0.94 });
//     gsap.to(img, {
//       opacity: 1, x: 0, scale: 1,
//       duration: 1.1, ease: 'power3.out',
//       scrollTrigger: { trigger: img, start: 'top 82%', once: true },
//     });

//     // subtle parallax on image as you scroll
//     gsap.to(img, {
//       y: -40,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: section,
//         start: 'top bottom',
//         end: 'bottom top',
//         scrub: 1.5,
//       },
//     });

//     // heading
//     gsap.set(head, { opacity: 0, y: 36 });
//     gsap.to(head, {
//       opacity: 1, y: 0, duration: 0.95, ease: 'power3.out',
//       scrollTrigger: { trigger: head, start: 'top 85%', once: true },
//     });

//     // badge
//     gsap.set(badge, { opacity: 0, scale: 0.85, y: 20 });
//     gsap.to(badge, {
//       opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 0.1,
//       ease: 'back.out(1.6)',
//       scrollTrigger: { trigger: badge, start: 'top 88%', once: true },
//     });

//     // divider line
//     gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
//     gsap.to(line, {
//       scaleX: 1, duration: 1.1, ease: 'power2.inOut',
//       scrollTrigger: { trigger: line, start: 'top 90%', once: true },
//     });

//     // stats bar
//     gsap.set(stats, { opacity: 0, y: 24 });
//     gsap.to(stats, {
//       opacity: 1, y: 0, duration: 0.85,
//       ease: 'power3.out',
//       scrollTrigger: { trigger: stats, start: 'top 90%', once: true },
//     });

//     return () => ScrollTrigger.getAll().forEach(t => t.kill());
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="about"
//       style={{ background: '#faf7f2', padding: '100px 0 80px', overflow: 'hidden' }}
//     >
//       <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>

//         {/* ── TWO COLUMN: image left, content right ── */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: 64,
//           alignItems: 'center',
//           marginBottom: 72,
//         }}>

//           {/* ── LEFT: image ── */}
//           <div ref={imgRef} style={{ position: 'relative', opacity: 0 }}>
//             {/* main image */}
//             <div style={{
//               borderRadius: 24, overflow: 'hidden',
//               boxShadow: '0 40px 80px rgba(0,0,0,0.45)',
//               position: 'relative', aspectRatio: '4/5',
//             }}>
//               <img
//                 src="/why-us.webp"
//                 alt="Kafira journey"
//                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//                 onError={e => {
//                   // graceful fallback: rich gradient if image missing
//                   const el = e.currentTarget as HTMLImageElement;
//                   el.style.display = 'none';
//                   (el.parentElement as HTMLDivElement).style.background =
//                     'linear-gradient(145deg,#0d2038 0%,#1a3a2a 40%,#2a1a0a 80%,#1a0a1a 100%)';
//                 }}
//               />
//               {/* overlay */}
//               <div style={{
//                 position: 'absolute', inset: 0,
//                 background: 'linear-gradient(to top, rgba(14,12,10,0.65) 0%, transparent 55%)',
//                 pointerEvents: 'none',
//               }}/>
//               {/* bottom left quote */}
//               <div style={{
//                 position: 'absolute', bottom: 22, left: 20, right: 20,
//                 fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic',
//                 fontSize: 18, color: 'rgba(245,240,232,0.88)', lineHeight: 1.5,
//               }}>
//                 "Every journey we craft is a story only you can tell."
//               </div>
//             </div>

//             {/* floating badge — top right */}
//             <div ref={badgeRef} style={{
//               position: 'absolute', top: -18, right: -18,
//               background: 'linear-gradient(135deg,#c9a84c,#8b6914)',
//               borderRadius: 18, padding: '16px 18px',
//               boxShadow: '0 12px 32px rgba(201,168,76,0.35)',
//               textAlign: 'center', minWidth: 90,
//             }}>
//               <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 900, fontSize: 28, color: '#fff', lineHeight: 1 }}>12</div>
//               <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Years</div>
//               <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em' }}>of Excellence</div>
//             </div>

//             {/* floating mini card — bottom left */}
//             <div style={{
//               position: 'absolute', bottom: -16, left: -16,
//               background: 'rgba(14,12,10,0.95)',
//               border: '1px solid rgba(201,168,76,0.25)',
//               backdropFilter: 'blur(16px)',
//               borderRadius: 14, padding: '12px 16px',
//               display: 'flex', alignItems: 'center', gap: 10,
//               boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
//             }}>
//               <div style={{ display: 'flex' }}>
//                 {['P','R','K','S','M'].map((l,i) => (
//                   <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#8b6914)', border: '2px solid rgba(14,12,10,0.95)', marginLeft: i ? -7 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 700, color: '#fff', zIndex: 5-i }}>{l}</div>
//                 ))}
//               </div>
//               <div>
//                 <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 12, color: '#f5f0e8', lineHeight: 1 }}>50,000+ travelers</div>
//                 <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: 'rgba(245,240,232,0.45)', marginTop: 3 }}>trust Kafira every year</div>
//               </div>
//             </div>

//             {/* decorative ring behind image */}
//             <div style={{
//               position: 'absolute', top: '10%', left: '-8%',
//               width: '116%', height: '116%',
//               borderRadius: 28,
//               border: '1px solid rgba(201,168,76,0.08)',
//               zIndex: -1, pointerEvents: 'none',
//             }}/>
//           </div>

//           {/* ── RIGHT: text content ── */}
//           <div ref={headRef} style={{ opacity: 0 }}>
//             {/* eyebrow */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
//               <div style={{ height: 1, width: 28, background: 'linear-gradient(to right,transparent,#c9a84c)' }}/>
//               <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#c9a84c', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
//                 Why Choose Us
//               </span>
//             </div>

//             <h2 style={{
//               fontFamily: 'Playfair Display,serif', fontWeight: 800,
//               fontSize: 'clamp(28px,3.2vw,48px)', lineHeight: 1.1,
//               color: '#f5f0e8', marginBottom: 18,
//             }}>
//               We don't sell trips.<br/>
//               <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>We craft journeys.</span>
//             </h2>

//             <p style={{
//               fontFamily: 'Outfit,sans-serif', fontSize: 15,
//               color: 'rgba(245,240,232,0.58)', lineHeight: 1.75,
//               marginBottom: 32,
//             }}>
//               At Kafira, every trip is personal. Since 2012, we've been building travel experiences that go beyond the ordinary — from remote Himalayan trails to royal Rajasthan forts, from misty Coorg hills to Kerala's golden backwaters. We listen first, then plan.
//             </p>

//             {/* 3 inline highlights */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
//               {[
//                 { icon: '✦', title: 'Fully customised', desc: 'No two Kafira trips are alike — each is built around you.' },
//                 { icon: '✦', title: 'Local expertise',  desc: 'Our on-ground teams know every shortcut, hidden gem, and best-kept secret.' },
//                 { icon: '✦', title: 'End-to-end care',  desc: "From first enquiry to safe return — we're with you every step." },
//               ].map((item, i) => (
//                 <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
//                   <div style={{
//                     width: 32, height: 32, borderRadius: 10, flexShrink: 0,
//                     background: 'rgba(201,168,76,0.1)',
//                     border: '1px solid rgba(201,168,76,0.2)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     color: '#c9a84c', fontSize: 14, marginTop: 2,
//                   }}>{item.icon}</div>
//                   <div>
//                     <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 14, color: '#f5f0e8', marginBottom: 3 }}>{item.title}</div>
//                     <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: 'rgba(245,240,232,0.48)', lineHeight: 1.55 }}>{item.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* CTA buttons */}
//             <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
//               <a href="#tours" style={{
//                 padding: '12px 26px', borderRadius: 999,
//                 background: 'linear-gradient(135deg,#c9a84c,#8b6914)',
//                 color: '#0c0a08', fontFamily: 'Outfit,sans-serif', fontSize: 13, fontWeight: 700,
//                 textDecoration: 'none', transition: 'all 0.25s ease',
//               }}
//                 onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 28px rgba(201,168,76,0.4)'; }}
//                 onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = 'none'; }}
//               >Explore Packages</a>
//               <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{
//                 padding: '12px 24px', borderRadius: 999,
//                 background: 'transparent',
//                 border: '1px solid rgba(245,240,232,0.15)',
//                 color: 'rgba(245,240,232,0.75)', fontFamily: 'Outfit,sans-serif', fontSize: 13, fontWeight: 500,
//                 textDecoration: 'none', transition: 'all 0.25s ease',
//               }}
//                 onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(201,168,76,0.4)'; el.style.color = '#c9a84c'; }}
//                 onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(245,240,232,0.15)'; el.style.color = 'rgba(245,240,232,0.75)'; }}
//               >Chat with us →</a>
//             </div>
//           </div>
//         </div>

//         {/* ── DIVIDER ── */}
//         <div ref={lineRef} style={{ height: 1, background: 'rgba(201,168,76,0.1)', marginBottom: 56 }}/>

//         {/* ── USP GRID 3×2 ── */}
//         <div style={{ marginBottom: 64 }}>
//           <div style={{ textAlign: 'center', marginBottom: 40 }}>
//             <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,34px)', color: '#f5f0e8', lineHeight: 1.2, marginBottom: 10 }}>
//               The Kafira difference
//             </h3>
//             <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, color: 'rgba(245,240,232,0.45)', maxWidth: 480, margin: '0 auto' }}>
//               Six reasons why 50,000+ travelers choose us over the rest.
//             </p>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
//             {USPS.map((usp, i) => <UspCard key={i} usp={usp} index={i}/>)}
//           </div>
//         </div>

//         {/* ── STATS BAR ── */}
//         <div ref={statsRef} style={{
//           opacity: 0,
//           background: 'linear-gradient(135deg,rgba(201,168,76,0.07),rgba(139,105,20,0.05))',
//           border: '1px solid rgba(201,168,76,0.14)',
//           borderRadius: 20, padding: '32px 40px',
//           display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
//           gap: 24, position: 'relative', overflow: 'hidden',
//         }}>
//           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%,rgba(201,168,76,0.04) 0%,transparent 70%)', pointerEvents: 'none' }}/>
//           {STATS.map((s, i) => <StatItem key={i} stat={s}/>)}
//         </div>
//       </div>

//       {/* Responsive */}
//       <style>{`
//         @media (max-width: 1024px) {
//           #about > div > div:first-of-type {
//             grid-template-columns: 1fr !important;
//             gap: 48px !important;
//           }
//         }
//         @media (max-width: 768px) {
//           #about > div > div:nth-child(3) > div:last-child {
//             grid-template-columns: 1fr 1fr !important;
//           }
//           #about > div > div:last-child {
//             grid-template-columns: 1fr 1fr !important;
//             padding: 24px !important;
//           }
//         }
//         @media (max-width: 480px) {
//           #about > div > div:nth-child(3) > div:last-child {
//             grid-template-columns: 1fr !important;
//           }
//           #about > div > div:last-child {
//             grid-template-columns: 1fr 1fr !important;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }







'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    body: 'Our team is reachable round the clock — whether you\'re in Leh or Lisbon, help is one call away.',
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

// ── Stat counters ─────────────────────────────────────
const STATS = [
  { value: 50000, suffix: '+', label: 'Happy Travelers' },
  { value: 120,   suffix: '+', label: 'Destinations'    },
  { value: 4.9,   suffix: '★', label: 'Average Rating'  },
  { value: 12,    suffix: ' Yrs', label: 'of Excellence' },
];

function useCounter(target: number, decimals = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obj = { n: 0 };
    gsap.to(obj, {
      n: target, duration: 2, ease: 'power2.out',
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
        fontFamily: 'Playfair Display,serif', fontWeight: 900,
        fontSize: 'clamp(28px,3.5vw,44px)', lineHeight: 1,
        background: 'linear-gradient(135deg,#b8892e,#8b6914)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {decimals ? val.toFixed(1) : val.toLocaleString('en-IN')}{stat.suffix}
      </div>
      <div style={{
        fontFamily: 'Outfit,sans-serif', fontSize: 12,
        color: '#8b7355', marginTop: 6, letterSpacing: '0.04em',
      }}>{stat.label}</div>
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
      duration: 0.75, delay: 0.08 * index,
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
        background: hovered ? '#fff' : '#fdf9f4',
        border: `1px solid ${hovered ? 'rgba(185,138,46,0.35)' : 'rgba(185,138,46,0.15)'}`,
        borderRadius: 18, padding: '22px 20px',
        display: 'flex', flexDirection: 'column', gap: 10,
        transition: 'all 0.32s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(185,138,46,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: hovered ? 'rgba(185,138,46,0.12)' : 'rgba(185,138,46,0.07)',
        border: `1px solid ${hovered ? 'rgba(185,138,46,0.35)' : 'rgba(185,138,46,0.18)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#b8892e', flexShrink: 0,
        transition: 'all 0.32s ease',
      }}>{usp.icon}</div>
      <div>
        <div style={{
          fontFamily: 'Playfair Display,serif', fontWeight: 700,
          fontSize: 16, color: hovered ? '#1a1510' : '#2c2218',
          lineHeight: 1.2, marginBottom: 6,
          transition: 'color 0.25s',
        }}>{usp.title}</div>
        <div style={{
          fontFamily: 'Outfit,sans-serif', fontSize: 13,
          color: '#7a6a56', lineHeight: 1.65,
          transition: 'color 0.25s',
        }}>{usp.body}</div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────
export default function WhyKafira() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    const head    = headRef.current;
    const stats   = statsRef.current;
    const line    = lineRef.current;
    const badge   = badgeRef.current;
    if (!section || !img || !head || !stats || !line || !badge) return;

    gsap.set(img, { opacity: 0, x: -60, scale: 0.94 });
    gsap.to(img, {
      opacity: 1, x: 0, scale: 1,
      duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: img, start: 'top 82%', once: true },
    });

    gsap.to(img, {
      y: -40, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    });

    gsap.set(head, { opacity: 0, y: 36 });
    gsap.to(head, {
      opacity: 1, y: 0, duration: 0.95, ease: 'power3.out',
      scrollTrigger: { trigger: head, start: 'top 85%', once: true },
    });

    gsap.set(badge, { opacity: 0, scale: 0.85, y: 20 });
    gsap.to(badge, {
      opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 0.1,
      ease: 'back.out(1.6)',
      scrollTrigger: { trigger: badge, start: 'top 88%', once: true },
    });

    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(line, {
      scaleX: 1, duration: 1.1, ease: 'power2.inOut',
      scrollTrigger: { trigger: line, start: 'top 90%', once: true },
    });

    gsap.set(stats, { opacity: 0, y: 24 });
    gsap.to(stats, {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: stats, start: 'top 90%', once: true },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: '#faf7f2', padding: '100px 0 80px', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>

        {/* ── TWO COLUMN ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
          marginBottom: 72,
        }}>

          {/* ── LEFT: image ── */}
          <div ref={imgRef} style={{ position: 'relative', opacity: 0 }}>
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
              position: 'relative', aspectRatio: '4/5',
            }}>
              <img
                src="/why-us.webp"
                alt="Kafira journey"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  (el.parentElement as HTMLDivElement).style.background =
                    'linear-gradient(145deg,#e8dcc8 0%,#d4c4a8 40%,#c4b090 80%,#b89e7a 100%)';
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(26,21,16,0.55) 0%, transparent 55%)',
                pointerEvents: 'none',
              }}/>
              <div style={{
                position: 'absolute', bottom: 22, left: 20, right: 20,
                fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic',
                fontSize: 18, color: 'rgba(255,248,235,0.92)', lineHeight: 1.5,
              }}>
                "Every journey we craft is a story only you can tell."
              </div>
            </div>

            {/* floating badge — top right */}
            <div ref={badgeRef} style={{
              position: 'absolute', top: -18, right: -18,
              background: 'linear-gradient(135deg,#c9a84c,#8b6914)',
              borderRadius: 18, padding: '16px 18px',
              boxShadow: '0 12px 32px rgba(185,138,46,0.3)',
              textAlign: 'center', minWidth: 90,
            }}>
              <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 900, fontSize: 28, color: '#fff', lineHeight: 1 }}>12</div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.85)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Years</div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>of Excellence</div>
            </div>

            {/* floating mini card — bottom left */}
            <div style={{
              position: 'absolute', bottom: -16, left: -16,
              background: 'rgba(255,252,245,0.97)',
              border: '1px solid rgba(185,138,46,0.2)',
              backdropFilter: 'blur(16px)',
              borderRadius: 14, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
            }}>
              <div style={{ display: 'flex' }}>
                {['P','R','K','S','M'].map((l,i) => (
                  <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#8b6914)', border: '2px solid #fff', marginLeft: i ? -7 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 700, color: '#fff', zIndex: 5-i }}>{l}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 12, color: '#1a1510', lineHeight: 1 }}>50,000+ travelers</div>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: '#8b7355', marginTop: 3 }}>trust Kafira every year</div>
              </div>
            </div>

            {/* decorative ring */}
            <div style={{
              position: 'absolute', top: '10%', left: '-8%',
              width: '116%', height: '116%',
              borderRadius: 28,
              border: '1px solid rgba(185,138,46,0.12)',
              zIndex: -1, pointerEvents: 'none',
            }}/>
          </div>

          {/* ── RIGHT: text content ── */}
          <div ref={headRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ height: 1, width: 28, background: 'linear-gradient(to right,transparent,#c9a84c)' }}/>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#b8892e', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                Why Choose Us
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Playfair Display,serif', fontWeight: 800,
              fontSize: 'clamp(28px,3.2vw,48px)', lineHeight: 1.1,
              color: '#1a1510', marginBottom: 18,
            }}>
              We don't sell trips.<br/>
              <span style={{ fontStyle: 'italic', color: '#b8892e' }}>We craft journeys.</span>
            </h2>

            <p style={{
              fontFamily: 'Outfit,sans-serif', fontSize: 15,
              color: '#5c4e3a', lineHeight: 1.75,
              marginBottom: 32,
            }}>
              At Kafira, every trip is personal. Since 2012, we've been building travel experiences that go beyond the ordinary — from remote Himalayan trails to royal Rajasthan forts, from misty Coorg hills to Kerala's golden backwaters. We listen first, then plan.
            </p>

            {/* 3 inline highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {[
                { title: 'Fully customised', desc: 'No two Kafira trips are alike — each is built around you.' },
                { title: 'Local expertise',  desc: 'Our on-ground teams know every shortcut, hidden gem, and best-kept secret.' },
                { title: 'End-to-end care',  desc: "From first enquiry to safe return — we're with you every step." },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(185,138,46,0.09)',
                    border: '1px solid rgba(185,138,46,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#b8892e', fontSize: 14, marginTop: 2,
                  }}>✦</div>
                  <div>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1510', marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: '#7a6a56', lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#tours" style={{
                padding: '12px 26px', borderRadius: 999,
                background: 'linear-gradient(135deg,#c9a84c,#8b6914)',
                color: '#fff', fontFamily: 'Outfit,sans-serif', fontSize: 13, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 28px rgba(185,138,46,0.35)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = 'none'; }}
              >Explore Packages</a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{
                padding: '12px 24px', borderRadius: 999,
                background: 'transparent',
                border: '1px solid rgba(26,21,16,0.18)',
                color: '#3d3020', fontFamily: 'Outfit,sans-serif', fontSize: 13, fontWeight: 500,
                textDecoration: 'none', transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(185,138,46,0.5)'; el.style.color = '#b8892e'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(26,21,16,0.18)'; el.style.color = '#3d3020'; }}
              >Chat with us →</a>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div ref={lineRef} style={{ height: 1, background: 'rgba(185,138,46,0.15)', marginBottom: 56 }}/>

        {/* ── USP GRID 3×2 ── */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,34px)', color: '#1a1510', lineHeight: 1.2, marginBottom: 10 }}>
              The Kafira difference
            </h3>
            <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, color: '#7a6a56', maxWidth: 480, margin: '0 auto' }}>
              Six reasons why 50,000+ travelers choose us over the rest.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {USPS.map((usp, i) => <UspCard key={i} usp={usp} index={i}/>)}
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div ref={statsRef} style={{
          opacity: 0,
          background: 'linear-gradient(135deg,rgba(185,138,46,0.07),rgba(139,105,20,0.04))',
          border: '1px solid rgba(185,138,46,0.16)',
          borderRadius: 20, padding: '32px 40px',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%,rgba(185,138,46,0.04) 0%,transparent 70%)', pointerEvents: 'none' }}/>
          {STATS.map((s, i) => <StatItem key={i} stat={s}/>)}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          #about > div > div:first-of-type {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 768px) {
          #about > div > div:nth-child(3) > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
          #about > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
            padding: 24px !important;
          }
        }
        @media (max-width: 480px) {
          #about > div > div:nth-child(3) > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #about > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}