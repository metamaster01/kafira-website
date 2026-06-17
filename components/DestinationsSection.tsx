// 'use client';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import type { Destination } from '../data/types';

// // ── Design tokens ─────────────────────────────────────
// export const C = {
//   bg:    '#ffffff',        // WHITE background throughout
//   bgOff: '#f7f8f6',        // very slight off-white for section alt
//   sea:   '#2d8f7b',
//   seaDk: '#1a6b58',
//   seaLt: '#3db89e',
//   seaBg: 'rgba(45,143,123,0.08)',
//   seaBd: 'rgba(45,143,123,0.22)',
//   text:  '#0f2720',
//   muted: 'rgba(15,39,32,0.50)',
//   border:'rgba(15,39,32,0.09)',
// };

// // ── Per-destination accent colours ────────────────────
// export const DEST_ACCENT: Record<string, string> = {
//   himalayas:        '#3db89e',
//   rajasthan:        '#f59e0b',
//   kerala:           '#22c55e',
//   northeast:        '#a78bfa',
//   uttarakhand:      '#38bdf8',
//   karnataka:        '#fb923c',
//   europe:           '#a78bfa',
//   'southeast-asia': '#34d399',
//   japan:            '#f472b6',
//   'middle-east':    '#fbbf24',
// };

// export const DEST_TAGLINE: Record<string, string> = {
//   himalayas:        'Where the Earth Touches the Sky',
//   rajasthan:        'Land of Forts & Deserts',
//   kerala:           "God's Own Country",
//   northeast:        'The Unexplored Paradise',
//   uttarakhand:      'The Land of Gods',
//   karnataka:        'Misty Hills & Ancient Temples',
//   europe:           'Timeless & Grand',
//   'southeast-asia': 'Temples, Beaches & Street Food',
//   japan:            'The Land of the Rising Sun',
//   'middle-east':    'Where Dreams are Built',
// };

// // ─────────────────────────────────────────────────────
// //  Single destination card
// //  - tall portrait card with full-bleed image
// //  - destination name + price at bottom (like reference)
// // ─────────────────────────────────────────────────────
// function DestCard({
//   dest,
//   regionSlug,
//   index,
// }: {
//   dest: Destination;
//   regionSlug: string;
//   index: number;
// }) {
//   const [hov, setHov] = useState(false);
//   const router = useRouter();
//   const accent  = DEST_ACCENT[dest.slug]  ?? C.seaLt;
//   const tagline = DEST_TAGLINE[dest.slug] ?? dest.tagline;

//   return (
//     <motion.div
//       className="dest-card"
//       initial={{ opacity: 0, y: 28 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: '-40px' }}
//       transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
//       onClick={() => router.push(`/destinations/${regionSlug}/${dest.slug}`)}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         // ── exact size matching reference screenshot ──
//         position: 'relative',
//         flexShrink: 0,
//         width: 222,
//         height: 266,
//         borderRadius: 14,
//         overflow: 'hidden',
//         cursor: 'pointer',
//         background: '#1a1a2e',
//         scrollSnapAlign: 'start',
//         // shadow + lift on hover
//         boxShadow: hov
//           ? `0 20px 50px rgba(0,0,0,0.28), 0 0 0 2px ${accent}55`
//           : '0 4px 20px rgba(0,0,0,0.13)',
//         transform: hov ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
//         transition: 'all 0.36s cubic-bezier(0.25,0.46,0.45,0.94)',
//       }}
//     >
//       {/* full-bleed image */}
//       <img
//         src={dest.image}
//         alt={dest.name}
//         style={{
//           position: 'absolute', inset: 0,
//           width: '100%', height: '100%',
//           objectFit: 'cover',
//           transform: hov ? 'scale(1.07)' : 'scale(1)',
//           transition: 'transform 0.55s ease',
//           display: 'block',
//         }}
//         onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
//       />

//       {/* always-on gradient — darkens bottom for text legibility */}
//       <div style={{
//         position: 'absolute', inset: 0,
//         background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)',
//         pointerEvents: 'none',
//       }}/>

//       {/* hover accent tint */}
//       <div style={{
//         position: 'absolute', inset: 0,
//         background: `linear-gradient(to top, ${accent}25 0%, transparent 55%)`,
//         opacity: hov ? 1 : 0,
//         transition: 'opacity 0.32s ease',
//         pointerEvents: 'none',
//       }}/>

//       {/* tagline pill — top left, only on hover */}
//       <div style={{
//         position: 'absolute', top: 14, left: 14, right: 14,
//         opacity: hov ? 1 : 0,
//         transform: hov ? 'translateY(0)' : 'translateY(-6px)',
//         transition: 'all 0.28s ease',
//         pointerEvents: 'none',
//       }}>
//         <span style={{
//           fontFamily: '"Outfit",sans-serif',
//           fontSize: 8.5, fontWeight: 600,
//           color: accent,
//           letterSpacing: '0.16em', textTransform: 'uppercase',
//           background: 'rgba(0,0,0,0.55)',
//           backdropFilter: 'blur(8px)',
//           borderRadius: 999,
//           padding: '3px 10px',
//           border: `1px solid ${accent}40`,
//           display: 'inline-block',
//         }}>
//           {tagline}
//         </span>
//       </div>

//       {/* bottom: name + price — exactly like reference */}
//       <div style={{
//         position: 'absolute', bottom: 0, left: 0, right: 0,
//         padding: '0 16px 16px',
//       }}>
//         {/* destination name — bold, white, large */}
//         <div style={{
//           fontFamily: '"Cormorant Garamond",serif',
//           fontWeight: 700,
//           fontSize: 28,
//           lineHeight: 1.0,
//           color: '#ffffff',
//           marginBottom: 5,
//           letterSpacing: '-0.01em',
//           textShadow: '0 2px 12px rgba(0,0,0,0.6)',
//           transform: hov ? 'translateY(-2px)' : 'translateY(0)',
//           transition: 'transform 0.28s ease',
//         }}>
//           {dest.name}
//         </div>

//         {/* price line — exactly like reference */}
//         <div style={{
//           fontFamily: '"Outfit",sans-serif',
//           fontSize: 11.5, fontWeight: 500,
//           color: 'rgba(255,255,255,0.80)',
//           letterSpacing: '0.01em',
//         }}>
//           Starting Price ₹{dest.startingPrice.toLocaleString('en-IN')}/-
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────
// //  Main DestinationsSection
// //  Layout:
// //  ┌──────────────────────────────────────┐  ← video banner ~270px tall
// //  │  Title / subline / Explore btn       │
// //  │                                      │
// //  │              ┌─────────────────┐     │  ← cards START here (~70px up from bottom of video)
// //  └──────────────┼─────────────────┼─────┘
// //  (white bg)     │   cards mostly  │
// //                 │   below here    │
// //                 └─────────────────┘
// // ─────────────────────────────────────────────────────
// interface SectionProps {
//   id: string;
//   regionSlug: 'india' | 'international';
//   bannerVideo: string;
//   bannerPoster?: string;
//   eyebrow: string;
//   heading: string;
//   subline: string;
//   exploreHref: string;
//   destinations: Destination[];
//   accent?: string;
// }

// export default function DestinationsSection({
//   id,
//   regionSlug,
//   bannerVideo,
//   bannerPoster,
//   eyebrow,
//   heading,
//   subline,
//   exploreHref,
//   destinations,
//   accent,
// }: SectionProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);

//   const [vidReady, setVidReady] = useState(false);
//   const [canLeft,  setCanLeft]  = useState(false);
//   const [canRight, setCanRight] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   const ac = accent ?? C.sea;

//   // ── responsive ──────────────────────────────────────
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener('resize', check);
//     return () => window.removeEventListener('resize', check);
//   }, []);

//   // ── video autoplay ───────────────────────────────────
//   useEffect(() => {
//     const vid = videoRef.current; if (!vid) return;
//     vid.muted = true; vid.playsInline = true;
//     const play = () => { setVidReady(true); vid.play().catch(() => {}); };
//     vid.readyState >= 2 ? play() : vid.addEventListener('canplay', play, { once: true });
//   }, []);

//   // ── arrow states ─────────────────────────────────────
//   const updateArrows = useCallback(() => {
//     const el = trackRef.current; if (!el) return;
//     setCanLeft(el.scrollLeft > 4);
//     setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
//   }, []);

//   const CARD_W   = 222;
//   const CARD_GAP = 14;
//   const STEP     = (CARD_W + CARD_GAP) * 2;

//   const scrollTrack = (dir: -1 | 1) => {
//     const el = trackRef.current; if (!el) return;
//     el.scrollBy({ left: dir * STEP, behavior: 'smooth' });
//     setTimeout(updateArrows, 450);
//   };

//   // ── Exact measurements from the screenshot ───────────
//   // Banner height (video area)
//   const BANNER_H = 270;
//   // How many px the cards overlap UP into the banner
//   const CARD_OVERLAP = 70;
//   // Full card height
//   const CARD_H = 266;
//   // How much card sticks below the banner line
//   const CARD_BELOW = CARD_H - CARD_OVERLAP; // ~196px

//   // ── MOBILE: no video, just header + cards ────────────
//   if (isMobile) {
//     return (
//       <section
//         id={id}
//         style={{ background: C.bg, paddingBottom: 40 }}
//       >
//         {/* mobile header */}
//         <div style={{ padding: '32px 20px 20px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
//             <div style={{ height: 1.5, width: 20, background: ac, borderRadius: 1 }}/>
//             <span style={{
//               fontFamily: '"Outfit",sans-serif',
//               fontSize: 9, fontWeight: 700, color: ac,
//               letterSpacing: '0.22em', textTransform: 'uppercase',
//             }}>
//               {eyebrow}
//             </span>
//           </div>
//           <h2 style={{
//             fontFamily: '"Cormorant Garamond",serif',
//             fontWeight: 700,
//             fontSize: 28,
//             color: C.text,
//             lineHeight: 1.1,
//             margin: '0 0 6px',
//             letterSpacing: '-0.01em',
//           }}>
//             {heading}
//           </h2>
//           <p style={{
//             fontFamily: '"Outfit",sans-serif',
//             fontSize: 12, color: C.muted,
//             margin: 0, lineHeight: 1.6,
//           }}>
//             {subline}
//           </p>
//         </div>

//         {/* mobile card track */}
//         <div
//           ref={trackRef}
//           onScroll={updateArrows}
//           style={{
//             display: 'flex',
//             gap: 12,
//             overflowX: 'auto',
//             padding: '4px 20px 16px',
//             scrollSnapType: 'x mandatory',
//             WebkitOverflowScrolling: 'touch',
//             scrollbarWidth: 'none',
//           }}
//         >
//           {destinations.map((dest, i) => (
//             <DestCard key={dest.slug} dest={dest} regionSlug={regionSlug} index={i}/>
//           ))}
//         </div>

//         <style>{`#${id} div::-webkit-scrollbar{display:none}`}</style>
//       </section>
//     );
//   }

//   // ── DESKTOP layout ────────────────────────────────────
//   return (
//     <section
//       id={id}
//       style={{
//         background: C.bg,
//         // section total height = banner + card area below banner
//         paddingBottom: 40,
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {/* ── VIDEO BANNER — fixed height ── */}
//       <div style={{
//         position: 'relative',
//         height: BANNER_H,
//         overflow: 'hidden',
//         // Extra bottom padding so the white bg shows under the overlap zone
//         // We add CARD_BELOW as margin below the banner
//         marginBottom: CARD_BELOW + 16,
//         background: '#071a16',
//       }}>
//         {/* fallback bg */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(135deg,#071a16 0%,#0c2822 50%,#071a16 100%)',
//           zIndex: 0,
//         }}/>

//         {/* video */}
//         <video
//           ref={videoRef}
//           autoPlay muted loop playsInline preload="auto"
//           poster={bannerPoster}
//           style={{
//             position: 'absolute', inset: 0,
//             width: '100%', height: '100%',
//             objectFit: 'cover', zIndex: 1,
//             opacity: vidReady ? 1 : 0,
//             transition: 'opacity 1.2s ease',
//             filter: 'brightness(0.72) saturate(1.1)',
//           }}
//         >
//           <source src={bannerVideo} type="video/mp4"/>
//         </video>

//         {/* right-side fade — like reference screenshot where right side is brighter */}
//         <div style={{
//           position: 'absolute', inset: 0, zIndex: 2,
//           background: 'linear-gradient(to right,rgba(5,16,12,0.72) 0%,rgba(5,16,12,0.12) 50%,rgba(5,16,12,0.02) 100%)',
//         }}/>
//         {/* bottom fade — blends into white bg */}
//         <div style={{
//           position: 'absolute', inset: 0, zIndex: 2,
//           background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(5,16,12,0.55) 100%)',
//         }}/>

//         {/* ── banner text — left aligned, middle vertical ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-60px' }}
//           transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//           style={{
//             position: 'absolute', inset: 0, zIndex: 10,
//             display: 'flex', flexDirection: 'column', justifyContent: 'center',
//             padding: '0 clamp(32px,5vw,80px)',
//             // only occupy the top ~75% so cards don't overlap text
//             paddingBottom: CARD_OVERLAP + 16,
//           }}
//         >
//           {/* heading */}
//           <h2 style={{
//             fontFamily: '"Cormorant Garamond",serif',
//             fontWeight: 700,
//             fontSize: 'clamp(32px,4.5vw,52px)',
//             lineHeight: 1.05,
//             color: '#ffffff',
//             margin: '0 0 10px',
//             letterSpacing: '-0.01em',
//             textShadow: '0 2px 18px rgba(0,0,0,0.55)',
//           }}>
//             {heading}
//           </h2>

//           {/* subline */}
//           <p style={{
//             fontFamily: '"Outfit",sans-serif',
//             fontSize: 'clamp(13px,1.3vw,16px)',
//             color: 'rgba(255,255,255,0.75)',
//             margin: '0 0 22px',
//             lineHeight: 1.6,
//             maxWidth: 420,
//           }}>
//             {subline}
//           </p>

//           {/* Explore button — styled like reference (solid pill) */}
//           <div>
//             <motion.a
//               href={exploreHref}
//               whileHover={{ y: -2, boxShadow: `0 10px 28px ${ac}70` }}
//               whileTap={{ scale: 0.97 }}
//               style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 8,
//                 padding: '11px 32px',
//                 borderRadius: 999,
//                 background: `linear-gradient(135deg,${ac},${C.seaDk})`,
//                 color: '#fff',
//                 fontFamily: '"Outfit",sans-serif',
//                 fontSize: 14, fontWeight: 700,
//                 textDecoration: 'none',
//                 boxShadow: `0 5px 18px ${ac}50`,
//                 transition: 'all 0.22s ease',
//                 letterSpacing: '0.04em',
//               }}
//             >
//               Explore <ArrowRight size={15}/>
//             </motion.a>
//           </div>
//         </motion.div>

//         {/* ── CARDS — positioned so top CARD_OVERLAP px overlaps the banner ── */}
//         <div style={{
//           position: 'absolute',
//           // bottom of banner - CARD_OVERLAP = cards start CARD_OVERLAP px above the banner bottom
//           bottom: -CARD_BELOW,   // negative = extends BELOW the banner
//           left: 0, right: 0,
//           zIndex: 30,
//         }}>
//           {/* wrapper with side padding + relative for arrows */}
//           <div style={{
//             position: 'relative',
//             padding: '0 clamp(24px,4vw,64px)',
//           }}>
//             {/* ── LEFT arrow — floats left of track, vertically centered on cards ── */}
//             <button
//               onClick={() => scrollTrack(-1)}
//               disabled={!canLeft}
//               style={{
//                 position: 'absolute',
//                 left: 0,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 zIndex: 40,
//                 width: 38, height: 38, borderRadius: '50%',
//                 background: canLeft ? '#fff' : 'rgba(255,255,255,0.55)',
//                 border: `1.5px solid ${canLeft ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)'}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: canLeft ? 'pointer' : 'default',
//                 color: canLeft ? '#333' : '#aaa',
//                 boxShadow: canLeft ? '0 2px 12px rgba(0,0,0,0.18)' : 'none',
//                 transition: 'all 0.22s ease',
//                 opacity: canLeft ? 1 : 0.45,
//               }}
//             >
//               <ChevronLeft size={18}/>
//             </button>

//             {/* ── RIGHT arrow ── */}
//             <button
//               onClick={() => scrollTrack(1)}
//               disabled={!canRight}
//               style={{
//                 position: 'absolute',
//                 right: 0,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 zIndex: 40,
//                 width: 38, height: 38, borderRadius: '50%',
//                 background: canRight ? ac : 'rgba(255,255,255,0.55)',
//                 border: 'none',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: canRight ? 'pointer' : 'default',
//                 color: '#fff',
//                 boxShadow: canRight ? `0 4px 16px ${ac}70` : 'none',
//                 transition: 'all 0.22s ease',
//                 opacity: canRight ? 1 : 0.45,
//               }}
//             >
//               <ChevronRight size={18}/>
//             </button>

//             {/* scrollable track */}
//             <div
//               ref={trackRef}
//               onScroll={updateArrows}
//               style={{
//                 display: 'flex',
//                 gap: CARD_GAP,
//                 overflowX: 'auto',
//                 scrollSnapType: 'x mandatory',
//                 WebkitOverflowScrolling: 'touch',
//                 scrollbarWidth: 'none',
//                 paddingBottom: 4,
//                 paddingTop: 4,
//                 // small horizontal padding so arrows don't clip first/last card
//                 paddingLeft: 4,
//                 paddingRight: 4,
//               }}
//             >
//               {destinations.map((dest, i) => (
//                 <DestCard key={dest.slug} dest={dest} regionSlug={regionSlug} index={i}/>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* hide scrollbar */}
//       <style>{`
//         #${id} div::-webkit-scrollbar { display: none; }
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap');
//       `}</style>
//     </section>
//   );
// }






// 'use client';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import type { Destination } from '../data/types';

// // ── Design tokens ──────────────────────────────────────
// export const C = {
//   bg:    '#ffffff',
//   sea:   '#2d8f7b',
//   seaDk: '#1a6b58',
//   seaLt: '#3db89e',
//   seaBg: 'rgba(45,143,123,0.08)',
//   seaBd: 'rgba(45,143,123,0.22)',
//   text:  '#0f2720',
//   muted: 'rgba(15,39,32,0.50)',
//   border:'rgba(0,0,0,0.08)',
// };

// export const DEST_ACCENT: Record<string, string> = {
//   himalayas:        '#3db89e',
//   rajasthan:        '#f59e0b',
//   kerala:           '#22c55e',
//   northeast:        '#a78bfa',
//   uttarakhand:      '#38bdf8',
//   karnataka:        '#fb923c',
//   europe:           '#a78bfa',
//   'southeast-asia': '#34d399',
//   japan:            '#f472b6',
//   'middle-east':    '#fbbf24',
// };

// export const DEST_TAGLINE: Record<string, string> = {
//   himalayas:        'Where the Earth Touches the Sky',
//   rajasthan:        'Land of Forts & Deserts',
//   kerala:           "God's Own Country",
//   northeast:        'The Unexplored Paradise',
//   uttarakhand:      'The Land of Gods',
//   karnataka:        'Misty Hills & Ancient Temples',
//   europe:           'Timeless & Grand',
//   'southeast-asia': 'Temples, Beaches & Street Food',
//   japan:            'The Land of the Rising Sun',
//   'middle-east':    'Where Dreams are Built',
// };

// // ── Card dimensions ─────────────────────────────────────
// const CARD_H       = 300;   // full card height px
// const CARD_W       = 240;   // card width px
// const CARD_GAP     = 14;    // gap between cards
// const OVERLAP      = 75;    // px the card top bleeds INTO the video banner
// const BANNER_H     = 360;   // video banner height px (taller = more breathing room for text)
// const CARDS_BELOW  = CARD_H - OVERLAP; // 225px — space needed below the banner for cards

// // ── Single card ────────────────────────────────────────
// function DestCard({
//   dest,
//   regionSlug,
//   index,
// }: {
//   dest: Destination;
//   regionSlug: string;
//   index: number;
// }) {
//   const [hov, setHov] = useState(false);
//   const router = useRouter();
//   const accent  = DEST_ACCENT[dest.slug] ?? C.seaLt;
//   const tagline = DEST_TAGLINE[dest.slug] ?? dest.tagline;

//   return (
//     <motion.div
//       className="dest-card"
//       initial={{ opacity: 0, y: 32 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: '-20px' }}
//       transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
//       onClick={() => router.push(`/destinations/${regionSlug}/${dest.slug}`)}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         position: 'relative',
//         flexShrink: 0,
//         width: CARD_W,
//         height: CARD_H,
//         borderRadius: 16,
//         overflow: 'hidden',
//         cursor: 'pointer',
//         background: '#1a2a22',
//         scrollSnapAlign: 'start',
//         boxShadow: hov
//           ? `0 22px 52px rgba(0,0,0,0.26), 0 0 0 2px ${accent}50`
//           : '0 4px 22px rgba(0,0,0,0.14)',
//         transform: hov ? 'translateY(-7px) scale(1.018)' : 'translateY(0) scale(1)',
//         transition: 'all 0.36s cubic-bezier(0.25,0.46,0.45,0.94)',
//       }}
//     >
//       {/* full-bleed image */}
//       <img
//         src={dest.image}
//         alt={dest.name}
//         style={{
//           position: 'absolute', inset: 0,
//           width: '100%', height: '100%',
//           objectFit: 'cover',
//           transform: hov ? 'scale(1.07)' : 'scale(1)',
//           transition: 'transform 0.55s ease',
//           display: 'block',
//         }}
//         onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
//       />

//       {/* dark gradient bottom */}
//       <div style={{
//         position: 'absolute', inset: 0,
//         background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 52%, transparent 100%)',
//         pointerEvents: 'none',
//       }}/>

//       {/* accent wash on hover */}
//       <div style={{
//         position: 'absolute', inset: 0,
//         background: `linear-gradient(to top, ${accent}28 0%, transparent 55%)`,
//         opacity: hov ? 1 : 0,
//         transition: 'opacity 0.32s ease',
//         pointerEvents: 'none',
//       }}/>

//       {/* trip count — top right */}
//       <div style={{
//         position: 'absolute', top: 12, right: 12,
//         background: 'rgba(0,0,0,0.55)',
//         backdropFilter: 'blur(10px)',
//         borderRadius: 999,
//         padding: '3px 10px',
//         border: `1px solid ${accent}45`,
//         fontFamily: '"Outfit", sans-serif',
//         fontSize: 9, fontWeight: 700,
//         color: accent,
//         letterSpacing: '0.08em',
//         textTransform: 'uppercase',
//       }}>
//         {dest.tripCount} Trip{dest.tripCount !== 1 ? 's' : ''}
//       </div>

//       {/* bottom content */}
//       <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 16px' }}>
//         {/* tagline — visible on hover */}
//         <div style={{
//           fontFamily: '"Outfit", sans-serif',
//           fontSize: 8.5, fontWeight: 600,
//           color: accent,
//           letterSpacing: '0.15em',
//           textTransform: 'uppercase',
//           marginBottom: 5,
//           opacity: hov ? 1 : 0,
//           transform: hov ? 'translateY(0)' : 'translateY(4px)',
//           transition: 'all 0.26s ease',
//         }}>
//           {tagline}
//         </div>

//         {/* destination name */}
//         <div style={{
//           fontFamily: '"Cormorant Garamond", serif',
//           fontWeight: 700,
//           fontSize: 26,
//           lineHeight: 1.05,
//           color: '#fff',
//           marginBottom: 5,
//           letterSpacing: '-0.01em',
//           textShadow: '0 2px 12px rgba(0,0,0,0.55)',
//           transform: hov ? 'translateY(-2px)' : 'translateY(0)',
//           transition: 'transform 0.26s ease',
//         }}>
//           {dest.name}
//         </div>

//         {/* price */}
//         <div style={{
//           fontFamily: '"Outfit", sans-serif',
//           fontSize: 11, fontWeight: 500,
//           color: 'rgba(255,255,255,0.76)',
//         }}>
//           Starting Price ₹{dest.startingPrice.toLocaleString('en-IN')}/-
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────────
// //  Main DestinationsSection
// //
// //  Structure (NO overflow:hidden on section):
// //
// //  <section>  bg=white, position=relative
// //    <div.banner>   h=BANNER_H, position=relative, overflow=hidden
// //      video, overlays, text
// //    </div.banner>
// //
// //    <div.cards-row>  position=relative, mt=-(OVERLAP), zIndex=10
// //      ← this pulls the card row UP by OVERLAP px into the banner
// //      arrows + scrollable track
// //    </div.cards-row>
// //
// //    <div style={{height: paddingBottom}}/>   ← breathing room
// //  </section>
// // ─────────────────────────────────────────────────────────
// interface SectionProps {
//   id: string;
//   regionSlug: 'india' | 'international';
//   bannerVideo: string;
//   bannerPoster?: string;
//   rotateVideo?: boolean;   // true → rotate portrait video 90deg to landscape
//   eyebrow: string;
//   heading: string;
//   subline: string;
//   exploreHref: string;
//   destinations: Destination[];
//   accent?: string;
// }

// export default function DestinationsSection({
//   id,
//   regionSlug,
//   bannerVideo,
//   bannerPoster,
//   rotateVideo = false,
//   eyebrow,
//   heading,
//   subline,
//   exploreHref,
//   destinations,
//   accent,
// }: SectionProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);

//   const [vidReady, setVidReady] = useState(false);
//   const [canLeft,  setCanLeft]  = useState(false);
//   const [canRight, setCanRight] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   const ac = accent ?? C.sea;

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener('resize', check);
//     return () => window.removeEventListener('resize', check);
//   }, []);

//   useEffect(() => {
//     const vid = videoRef.current; if (!vid) return;
//     vid.muted = true; vid.playsInline = true;
//     const play = () => { setVidReady(true); vid.play().catch(() => {}); };
//     vid.readyState >= 2 ? play() : vid.addEventListener('canplay', play, { once: true });
//   }, []);

//   const updateArrows = useCallback(() => {
//     const el = trackRef.current; if (!el) return;
//     setCanLeft(el.scrollLeft > 4);
//     setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
//   }, []);

//   // Show exactly 4 cards on desktop, scroll for more
//   // card track width = 4 * (CARD_W + CARD_GAP) - CARD_GAP
//   const TRACK_MAX = 4 * (CARD_W + CARD_GAP) - CARD_GAP; // 4 cards visible

//   const scrollTrack = (dir: -1 | 1) => {
//     const el = trackRef.current; if (!el) return;
//     const step = (CARD_W + CARD_GAP) * 2;
//     el.scrollBy({ left: dir * step, behavior: 'smooth' });
//     setTimeout(updateArrows, 450);
//   };

//   // ── MOBILE — no video ──────────────────────────────────
//   if (isMobile) {
//     return (
//       <section id={id} style={{ background: C.bg, paddingBottom: 36 }}>
//         {/* mobile header */}
//         <div style={{ padding: '32px 20px 18px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
//             <div style={{ height: 2, width: 18, background: ac, borderRadius: 1 }}/>
//             <span style={{
//               fontFamily: '"Outfit", sans-serif',
//               fontSize: 9, fontWeight: 700, color: ac,
//               letterSpacing: '0.24em', textTransform: 'uppercase',
//             }}>
//               {eyebrow}
//             </span>
//           </div>
//           <h2 style={{
//             fontFamily: '"Cormorant Garamond", serif',
//             fontWeight: 700, fontSize: 30,
//             color: C.text, margin: '0 0 6px',
//             letterSpacing: '-0.01em',
//           }}>
//             {heading}
//           </h2>
//           <p style={{
//             fontFamily: '"Outfit", sans-serif',
//             fontSize: 12.5, color: C.muted,
//             margin: 0, lineHeight: 1.65,
//           }}>
//             {subline}
//           </p>
//         </div>

//         {/* mobile scrollable cards */}
//         <div
//           ref={trackRef}
//           onScroll={updateArrows}
//           style={{
//             display: 'flex', gap: 12,
//             overflowX: 'auto',
//             padding: '4px 20px 16px',
//             scrollSnapType: 'x mandatory',
//             WebkitOverflowScrolling: 'touch',
//             scrollbarWidth: 'none',
//           }}
//         >
//           {destinations.map((dest, i) => (
//             <DestCard key={dest.slug} dest={dest} regionSlug={regionSlug} index={i}/>
//           ))}
//         </div>
//         <style>{`#${id} div::-webkit-scrollbar{display:none}`}</style>
//       </section>
//     );
//   }

//   // ── DESKTOP layout ─────────────────────────────────────
//   // PAGE MARGIN: video doesn't go full-width, has horizontal margin like a page
//   const PAGE_MARGIN = 48; // px each side — gives the "inset card" look

//   return (
//     <section
//       id={id}
//       style={{
//         background: C.bg,
//         // NO overflow:hidden here — we need cards to show below banner
//         paddingBottom: 40,
//         position: 'relative',
//       }}
//     >
//       {/* ── VIDEO BANNER ─────────────────────────────────
//           Uses position:relative so absolute children are contained.
//           overflow:hidden ONLY on this div so video is clipped.
//           The card row sits OUTSIDE this div (below it), then is
//           pulled up with negative marginTop = OVERLAP.
//       ──────────────────────────────────────────────────── */}
//       <div style={{
//         position: 'relative',
//         height: BANNER_H,
//         // Page margins — reduces banner width, gives inset feel
//         margin: `0 ${PAGE_MARGIN}px`,
//         borderRadius: 18,
//         overflow: 'hidden',   // clips video only
//         background: '#071a16',
//       }}>
//         {/* fallback gradient */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(135deg,#071a16 0%,#0c2822 55%,#071a16 100%)',
//           zIndex: 0,
//         }}/>

//         {/* video */}
//         <video
//           ref={videoRef}
//           autoPlay muted loop playsInline preload="auto"
//           poster={bannerPoster}
//           style={{
//             position: 'absolute', inset: 0,
//             width: '100%', height: '100%',
//             objectFit: 'cover',
//             zIndex: 1,
//             opacity: vidReady ? 1 : 0,
//             transition: 'opacity 1.2s ease',
//             filter: 'brightness(0.70) saturate(1.1)',
//             // Rotate portrait video to landscape if requested
//             ...(rotateVideo ? {
//               transform: 'rotate(90deg) scale(1.78)',
//               transformOrigin: 'center center',
//             } : {}),
//           }}
//         >
//           <source src={bannerVideo} type="video/mp4"/>
//         </video>

//         {/* left dark fade (text side) */}
//         <div style={{
//           position: 'absolute', inset: 0, zIndex: 2,
//           background: 'linear-gradient(to right, rgba(4,14,10,0.88) 0%, rgba(4,14,10,0.40) 45%, rgba(4,14,10,0.05) 100%)',
//         }}/>
//         {/* bottom fade — softens into white below */}
//         <div style={{
//           position: 'absolute', inset: 0, zIndex: 2,
//           background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(4,14,10,0.72) 100%)',
//         }}/>

//         {/* ── TEXT CONTENT ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-60px' }}
//           transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//           style={{
//             position: 'absolute', inset: 0, zIndex: 10,
//             display: 'flex', flexDirection: 'column', justifyContent: 'center',
//             // Only use top 70% of banner for text — leave bottom for card overlap zone
//             padding: `0 clamp(32px,4vw,64px)`,
//             paddingBottom: OVERLAP + 12,
//           }}
//         >
//           {/* eyebrow */}
//           <motion.div
//             initial={{ opacity: 0, x: -14 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1, ease: [0.22,1,0.36,1] }}
//             style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}
//           >
//             <div style={{ height: 1.5, width: 22, background: `linear-gradient(to right,transparent,${ac})` }}/>
//             <span style={{
//               fontFamily: '"Outfit", sans-serif',
//               fontSize: 10, fontWeight: 700, color: ac,
//               letterSpacing: '0.28em', textTransform: 'uppercase',
//             }}>
//               {eyebrow}
//             </span>
//           </motion.div>

//           {/* heading — large serif */}
//           <motion.h2
//             initial={{ opacity: 0, y: 18 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.18, ease: [0.22,1,0.36,1] }}
//             style={{
//               fontFamily: '"Cormorant Garamond", serif',
//               fontWeight: 700,
//               fontSize: 'clamp(36px,5vw,60px)',
//               lineHeight: 1.04,
//               color: '#ffffff',
//               margin: '0 0 14px',
//               letterSpacing: '-0.015em',
//               textShadow: '0 2px 20px rgba(0,0,0,0.5)',
//             }}
//           >
//             {heading}
//           </motion.h2>

//           {/* subline */}
//           <motion.p
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.65, delay: 0.26, ease: [0.22,1,0.36,1] }}
//             style={{
//               fontFamily: '"Outfit", sans-serif',
//               fontSize: 'clamp(13px,1.2vw,15.5px)',
//               fontWeight: 400,
//               color: 'rgba(220,245,240,0.72)',
//               lineHeight: 1.7,
//               maxWidth: 440,
//               margin: '0 0 26px',
//             }}
//           >
//             {subline}
//           </motion.p>

//           {/* Explore CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.34, ease: [0.22,1,0.36,1] }}
//           >
//             <motion.a
//               href={exploreHref}
//               whileHover={{ y: -2, boxShadow: `0 12px 30px ${ac}65` }}
//               whileTap={{ scale: 0.97 }}
//               style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 8,
//                 padding: '11px 28px',
//                 borderRadius: 999,
//                 background: `linear-gradient(135deg,${ac},${C.seaDk})`,
//                 color: '#fff',
//                 fontFamily: '"Outfit", sans-serif',
//                 fontSize: 13.5, fontWeight: 700,
//                 textDecoration: 'none',
//                 boxShadow: `0 5px 18px ${ac}50`,
//                 transition: 'all 0.22s ease',
//                 letterSpacing: '0.04em',
//               }}
//             >
//               Explore <ArrowRight size={15}/>
//             </motion.a>
//           </motion.div>
//         </motion.div>
//       </div>
//       {/* END banner div — overflow:hidden stops here */}

//       {/* ── CARD ROW ─────────────────────────────────────
//           Sits in normal document flow BELOW the banner.
//           Negative marginTop pulls it UP by OVERLAP px,
//           so cards visually overlap the banner bottom.
//           Section has NO overflow:hidden, so cards are visible.
//       ──────────────────────────────────────────────────── */}
//       <div style={{
//         marginTop: -OVERLAP,   // KEY: pulls cards up into banner
//         position: 'relative',
//         zIndex: 20,            // above the banner
//         padding: `0 ${PAGE_MARGIN + 8}px`, // match banner side margins
//       }}>
//         {/* arrows row header */}
//         <div style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
//           marginBottom: 10,
//           paddingRight: 4,
//         }}>
//           <div style={{ display: 'flex', gap: 8 }}>
//             {/* prev */}
//             <motion.button
//               whileHover={canLeft ? { scale: 1.08 } : {}}
//               whileTap={canLeft ? { scale: 0.94 } : {}}
//               onClick={() => scrollTrack(-1)}
//               disabled={!canLeft}
//               style={{
//                 width: 36, height: 36, borderRadius: '50%',
//                 background: canLeft ? '#fff' : 'rgba(255,255,255,0.6)',
//                 border: `1.5px solid ${canLeft ? 'rgba(0,0,0,0.16)' : 'rgba(0,0,0,0.08)'}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: canLeft ? 'pointer' : 'default',
//                 color: canLeft ? '#333' : '#bbb',
//                 boxShadow: canLeft ? '0 2px 10px rgba(0,0,0,0.15)' : 'none',
//                 opacity: canLeft ? 1 : 0.4,
//                 transition: 'all 0.22s',
//               }}
//             >
//               <ChevronLeft size={17}/>
//             </motion.button>

//             {/* next */}
//             <motion.button
//               whileHover={canRight ? { scale: 1.08 } : {}}
//               whileTap={canRight ? { scale: 0.94 } : {}}
//               onClick={() => scrollTrack(1)}
//               disabled={!canRight}
//               style={{
//                 width: 36, height: 36, borderRadius: '50%',
//                 background: canRight ? ac : 'rgba(255,255,255,0.6)',
//                 border: 'none',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: canRight ? 'pointer' : 'default',
//                 color: '#fff',
//                 boxShadow: canRight ? `0 4px 14px ${ac}70` : 'none',
//                 opacity: canRight ? 1 : 0.4,
//                 transition: 'all 0.22s',
//               }}
//             >
//               <ChevronRight size={17}/>
//             </motion.button>
//           </div>
//         </div>

//         {/* scrollable card track — exactly 4 cards wide */}
//         <div style={{ position: 'relative' }}>
//           {/* right fade edge */}
//           <div style={{
//             position: 'absolute', right: 0, top: 0, bottom: 0, width: 48,
//             background: 'linear-gradient(to left, rgba(255,255,255,0.92), transparent)',
//             zIndex: 10, pointerEvents: 'none',
//             opacity: canRight ? 1 : 0, transition: 'opacity 0.3s',
//           }}/>

//           <div
//             ref={trackRef}
//             onScroll={updateArrows}
//             style={{
//               display: 'flex',
//               gap: CARD_GAP,
//               overflowX: 'auto',
//               scrollSnapType: 'x mandatory',
//               WebkitOverflowScrolling: 'touch',
//               scrollbarWidth: 'none',
//               paddingBottom: 8,
//               paddingTop: 4,
//             }}
//           >
//             {destinations.map((dest, i) => (
//               <DestCard key={dest.slug} dest={dest} regionSlug={regionSlug} index={i}/>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* hide scrollbars */}
//       <style>{`
//         #${id} div::-webkit-scrollbar { display: none; }
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
//       `}</style>
//     </section>
//   );
// }





'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Destination } from '../data/types';

// ── Design tokens ──────────────────────────────────────
export const C = {
  bg:    '#ffffff',
  sea:   '#2d8f7b',
  seaDk: '#1a6b58',
  seaLt: '#3db89e',
  text:  '#0f2720',
  muted: 'rgba(15,39,32,0.50)',
};

export const DEST_ACCENT: Record<string, string> = {
  himalayas:        '#3db89e',
  rajasthan:        '#f59e0b',
  kerala:           '#22c55e',
  northeast:        '#a78bfa',
  uttarakhand:      '#38bdf8',
  karnataka:        '#fb923c',
  europe:           '#a78bfa',
  'southeast-asia': '#34d399',
  japan:            '#f472b6',
  'middle-east':    '#fbbf24',
};

export const DEST_TAGLINE: Record<string, string> = {
  himalayas:        'Where the Earth Touches the Sky',
  rajasthan:        'Land of Forts & Deserts',
  kerala:           "God's Own Country",
  northeast:        'The Unexplored Paradise',
  uttarakhand:      'The Land of Gods',
  karnataka:        'Misty Hills & Ancient Temples',
  europe:           'Timeless & Grand',
  'southeast-asia': 'Temples, Beaches & Street Food',
  japan:            'The Land of the Rising Sun',
  'middle-east':    'Where Dreams are Built',
};

// ─────────────────────────────────────────────────────
//  PIXEL-PERFECT measurements from reference screenshot
//
//  Reference viewport: ~1540px wide
//  Banner: inset ~9% each side → left/right margin ~8vw
//  Banner height: ~320px
//  Cards: 5 visible, each ~230px wide, gap ~12px
//  Card height: ~430px total
//  Overlap: cards start AT the banner bottom →
//           their top ~100px overlaps INTO the banner
//
//  So:
//    BANNER_H  = 320px
//    CARD_H    = 430px
//    CARD_W    = 230px  (5 shown, scrollable for more)
//    CARD_GAP  = 12px
//    OVERLAP   = 100px  (cards rise 100px into banner)
//    VISIBLE   = 5      (matches reference exactly)
// ─────────────────────────────────────────────────────
const VISIBLE   = 5;
const CARD_W    = 240;
const CARD_H    = 360;
const CARD_GAP  = 12;
const BANNER_H  = 400;
const OVERLAP   = 150;  // cards rise this many px INTO the banner

// ── Single card — pixel-perfect to reference ───────────
function DestCard({
  dest, regionSlug, index,
}: {
  dest: Destination; regionSlug: string; index: number;
}) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const accent  = DEST_ACCENT[dest.slug] ?? C.seaLt;
  const tagline = DEST_TAGLINE[dest.slug] ?? '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.50, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/destinations/${regionSlug}/${dest.slug}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        // ── exact card dimensions from reference ──
        position: 'relative',
        flexShrink: 0,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111c18',
        scrollSnapAlign: 'start',
        // shadow — matching reference (cards have strong drop shadow)
        boxShadow: hov
          ? `0 24px 52px rgba(0,0,0,0.32), 0 0 0 2px ${accent}55`
          : '0 6px 28px rgba(0,0,0,0.18)',
        transform: hov ? 'translateY(-8px) scale(1.018)' : 'translateY(0) scale(1)',
        transition: 'all 0.34s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {/* full-bleed photo */}
      <img
        src={dest.image}
        alt={dest.name}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transform: hov ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.50s ease',
          display: 'block',
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
      />

      {/* gradient — strong at bottom like reference */}
      <div style={{
        position: 'absolute', inset: 0,
        // reference has gradient only in bottom ~40% of card
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 38%, transparent 62%)',
        pointerEvents: 'none',
      }}/>

      {/* hover accent tint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to top, ${accent}28 0%, transparent 50%)`,
        opacity: hov ? 1 : 0,
        transition: 'opacity 0.28s',
        pointerEvents: 'none',
      }}/>

      {/* ── TOP: tagline (hover reveal like Japan card in reference) ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        padding: '18px 16px',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'all 0.26s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 9, fontWeight: 600,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          {tagline}
        </div>
      </div>

      {/* ── BOTTOM: name + price — exact reference layout ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '0 16px 18px',
      }}>
        {/* destination name — large bold white, like reference */}
        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.05,
          color: '#ffffff',
          marginBottom: 6,
          letterSpacing: '-0.01em',
          textShadow: '0 2px 12px rgba(0,0,0,0.55)',
          transform: hov ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'transform 0.26s ease',
        }}>
          {dest.name}
        </div>

        {/* price — exactly "Starting Price Rs. X/-" from reference */}
        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.82)',
          letterSpacing: '0.01em',
        }}>
          Starting Price ₹{dest.startingPrice.toLocaleString('en-IN')}/-
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────
//  DestinationsSection
//
//  Layout structure:
//
//  <section>  bg=white, NO overflow:hidden
//    <div.banner-wrap>  mx=auto, maxW=BANNER_MAX_W
//      <div.banner>  h=BANNER_H, overflow=hidden, borderRadius=16
//        video + dark overlay + text (title, subline, CTA)
//      </div.banner>
//    </div.banner-wrap>
//
//    <div.cards-wrap>  mx=auto, maxW=CARDS_MAX_W
//                      marginTop = -OVERLAP  ← KEY: pulls cards up
//                      position=relative, zIndex=20
//      <div.arrows-row>  left arrow | right arrow (outside track)
//      <div.track-outer> overflow=hidden → clips to VISIBLE cards
//        <div.track>     overflow-x=auto, display=flex
//          cards...
//        </div>
//      </div>
//    </div.cards-wrap>
//  </section>
//
//  Section paddingBottom = CARD_H - OVERLAP + gap
//  so the white bg extends naturally under the cards.
// ─────────────────────────────────────────────────────
interface SectionProps {
  id: string;
  regionSlug: 'india' | 'international';
  bannerVideo: string;
  bannerPoster?: string;
  rotateVideo?: boolean;
  eyebrow: string;
  heading: string;
  subline: string;
  exploreHref: string;
  destinations: Destination[];
  accent?: string;
}

export default function DestinationsSection({
  id, regionSlug,
  bannerVideo, bannerPoster,
  rotateVideo = false,
  eyebrow, heading, subline, exploreHref,
  destinations, accent,
}: SectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [vidReady, setVidReady] = useState(false);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(destinations.length > VISIBLE);
  const [isMobile, setIsMobile] = useState(false);
  const [winW,     setWinW]     = useState(1440);

  const ac = accent ?? C.sea;

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setWinW(window.innerWidth);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const vid = videoRef.current; if (!vid) return;
    vid.muted = true; vid.playsInline = true;
    const play = () => { setVidReady(true); vid.play().catch(() => {}); };
    vid.readyState >= 2 ? play() : vid.addEventListener('canplay', play, { once: true });
  }, []);

  const updateArrows = useCallback(() => {
    const el = trackRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scrollTrack = (dir: -1|1) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir * (CARD_W + CARD_GAP) * 2, behavior: 'smooth' });
    setTimeout(updateArrows, 460);
  };

  // ── Banner and card widths from reference:
  //    Banner inset = ~9vw each side (reference shows ~140/1540 ≈ 9%)
  //    Cards start at left edge of banner → same left margin
  // ──────────────────────────────────────────────────────
  const BANNER_INSET = Math.round(winW * 0.07);   // ~7% each side
  const BANNER_W     = winW - BANNER_INSET * 2;   // banner pixel width

  // Track shows exactly VISIBLE cards, clips the rest
  const TRACK_VISIBLE_W = VISIBLE * (CARD_W + CARD_GAP) - CARD_GAP;

  // Cards row side margin = same as banner inset (align left edges)
  const CARDS_SIDE_PAD = BANNER_INSET;

  // ── MOBILE ──────────────────────────────────────────
  if (isMobile) {
    return (
      <section id={id} style={{ background: C.bg, paddingBottom: 36 }}>
        <div style={{ padding: '28px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ height: 2, width: 16, background: ac, borderRadius: 2 }}/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 300, color: ac, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
              {eyebrow}
            </span>
          </div>
          <h2 style={{ fontFamily: '"Inter",sans-serif', fontWeight: 600, fontSize: 26, color: C.text, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
            {heading}
          </h2>
          <p style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 12.5, color: C.muted, margin: 0, lineHeight: 1.65 }}>
            {subline}
          </p>
        </div>
        <div
          ref={trackRef}
          onScroll={updateArrows}
          style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '4px 20px 16px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {destinations.map((dest, i) => (
            <DestCard key={dest.slug} dest={dest} regionSlug={regionSlug} index={i}/>
          ))}
        </div>
        <style>{`#${id} div::-webkit-scrollbar{display:none}`}</style>
      </section>
    );
  }

  // ── DESKTOP ─────────────────────────────────────────
  return (
    <section
      id={id}
      style={{
        background: C.bg,
        // section needs to be tall enough for: banner + card portion below banner + padding
        paddingBottom: (CARD_H - OVERLAP) + 32,
        position: 'relative',
        // CRITICAL: absolutely no overflow:hidden on section
      }}
    >
      {/* ══ VIDEO BANNER ════════════════════════════════
          - inset from page edges (9vw each side) matching reference
          - overflow:hidden clips video to rounded rect
          - text content only in top (BANNER_H - OVERLAP) area
            so text never overlaps the card zone
      ═══════════════════════════════════════════════ */}
      <div style={{
        // inset margins matching reference
        marginLeft:  BANNER_INSET,
        marginRight: BANNER_INSET,
        position: 'relative',
        height: BANNER_H,
        borderRadius: 16,
        overflow: 'hidden',      // ← clips video only, nothing else
        background: '#061410',
      }}>
        {/* dark fallback */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#071a16,#0d2e22,#071a16)', zIndex:0 }}/>

        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          poster={bannerPoster}
          style={{
            position:'absolute', inset:0,
            width:'100%', height:'100%',
            objectFit:'cover', zIndex:1,
            opacity: vidReady ? 1 : 0,
            transition: 'opacity 1.2s ease',
            filter: 'brightness(0.65) saturate(1.15)',
            ...(rotateVideo ? {
              transform: 'rotate(-90deg) scale(1.78)',
              transformOrigin: 'center center',
            } : {}),
          }}
        >
          <source src={bannerVideo} type="video/mp4"/>
        </video>

        {/* left shadow for text legibility */}
        <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to right,rgba(2,10,7,0.85) 0%,rgba(2,10,7,0.30) 42%,rgba(2,10,7,0.02) 100%)' }}/>
        {/* bottom fade — softens where cards emerge */}
        <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to bottom,transparent 35%,rgba(2,10,7,0.75) 100%)' }}/>

        {/* ── TEXT — only in top portion (above card overlap zone) ── */}
        <motion.div
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-40px' }}
          transition={{ duration:0.72, ease:[0.22,1,0.36,1] }}
          style={{
            position:'absolute',
            top:0, left:0, right:0,
            // restrict text to area above card overlap
            height: BANNER_H - OVERLAP - 10,
            zIndex:10,
            display:'flex', flexDirection:'column', justifyContent:'center',
            padding:'0 clamp(28px,3.5vw,52px)',
          }}
        >
          {/* heading — matches reference font weight/size */}
          <motion.h2
            initial={{ opacity:0, y:14 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.65, delay:0.10, ease:[0.22,1,0.36,1] }}
            style={{
              fontFamily:'"Inter", sans-serif',
              fontWeight:800,
              fontSize:'clamp(30px,4vw,48px)',
              lineHeight:1.04,
              color:'#ffffff',
              margin:'0 0 10px',
              letterSpacing:'-0.02em',
              textShadow:'0 2px 18px rgba(0,0,0,0.5)',
            }}
          >
            {heading}
          </motion.h2>

          {/* subline */}
          <motion.p
            initial={{ opacity:0, y:10 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.60, delay:0.18, ease:[0.22,1,0.36,1] }}
            style={{
              fontFamily:'"Montserrat", sans-serif',
              fontSize:'clamp(12px,1.1vw,14.5px)',
              fontWeight:400,
              color:'rgba(210,240,232,0.75)',
              lineHeight:1.68,
              maxWidth:420,
              margin:'0 0 20px',
            }}
          >
            {subline}
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity:0, y:8 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.56, delay:0.26, ease:[0.22,1,0.36,1] }}
          >
            <motion.a
              href={exploreHref}
              whileHover={{ y:-2, boxShadow:`0 12px 28px ${ac}60` }}
              whileTap={{ scale:0.97 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'11px 28px', borderRadius:999,
                background:`linear-gradient(135deg,${ac},${C.seaDk})`,
                color:'#fff',
                fontFamily:'"Inter", sans-serif',
                fontSize:13.5, fontWeight:700,
                textDecoration:'none',
                boxShadow:`0 5px 16px ${ac}50`,
                transition:'all 0.22s ease',
                letterSpacing:'0.04em',
              }}
            >
              Explore <ArrowRight size={14}/>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      {/* ↑ overflow:hidden ends here — cards render below this point in normal flow */}

      {/* ══ CARD ROW ════════════════════════════════════
          marginTop = -OVERLAP  pulls row up into banner
          Same side padding as banner so left edges align
          Track outer clips to VISIBLE cards via overflow:hidden
          Inner scroll div overflows-x for scrolling
          Arrows sit outside the track, vertically centered
      ═══════════════════════════════════════════════ */}
      <div
        style={{
          marginTop: -OVERLAP,       // pull up into banner
          position: 'relative',
          zIndex: 20,                // above banner content
          paddingLeft:  CARDS_SIDE_PAD,
          paddingRight: CARDS_SIDE_PAD,
        }}
      >
        {/* ── arrows + track in a flex row ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>

          {/* LEFT arrow — floats left of first card */}
          <motion.button
            whileHover={canLeft ? { scale:1.1 } : {}}
            whileTap={canLeft   ? { scale:0.92 } : {}}
            onClick={() => scrollTrack(-1)}
            disabled={!canLeft}
            style={{
              flexShrink: 0,
              width: 36, height: 36,
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canLeft ? 'pointer' : 'default',
              color: canLeft ? '#333' : '#ccc',
              boxShadow: canLeft ? '0 2px 12px rgba(0,0,0,0.16)' : 'none',
              opacity: canLeft ? 1 : 0.40,
              transition: 'all 0.22s ease',
            }}
          >
            <ChevronLeft size={18}/>
          </motion.button>

          {/* TRACK — clipped to show exactly VISIBLE cards */}
          <div style={{
            position: 'relative',
            flex: 1,
            // width = exactly 5 cards + 4 gaps
            maxWidth: TRACK_VISIBLE_W,
            overflow: 'hidden',    // ← clips to VISIBLE cards
          }}>
            {/* right fade edge — hints scrollability */}
            <div style={{
              position:'absolute', right:0, top:0, bottom:0, width:50,
              background:'linear-gradient(to left,rgba(255,255,255,0.90),transparent)',
              zIndex:10, pointerEvents:'none',
              opacity: canRight ? 1 : 0, transition:'opacity 0.28s',
            }}/>

            <div
              ref={trackRef}
              onScroll={updateArrows}
              style={{
                display: 'flex',
                gap: CARD_GAP,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                paddingBottom: 8,
                // small top padding so box-shadow isn't clipped
                paddingTop: 6,
              }}
            >
              {destinations.map((dest, i) => (
                <DestCard key={dest.slug} dest={dest} regionSlug={regionSlug} index={i}/>
              ))}
            </div>
          </div>

          {/* RIGHT arrow — floats right of last visible card */}
          <motion.button
            whileHover={canRight ? { scale:1.1 } : {}}
            whileTap={canRight   ? { scale:0.92 } : {}}
            onClick={() => scrollTrack(1)}
            disabled={!canRight}
            style={{
              flexShrink: 0,
              width: 36, height: 36,
              borderRadius: '50%',
              // reference: right arrow is filled with accent/blue color
              background: canRight ? ac : '#e0e0e0',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canRight ? 'pointer' : 'default',
              color: '#fff',
              boxShadow: canRight ? `0 4px 14px ${ac}70` : 'none',
              opacity: canRight ? 1 : 0.40,
              transition: 'all 0.22s ease',
            }}
          >
            <ChevronRight size={18}/>
          </motion.button>
        </div>
      </div>

      <style>{`
        #${id} div::-webkit-scrollbar { display: none; }
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');
      `}</style>
    </section>
  );
}