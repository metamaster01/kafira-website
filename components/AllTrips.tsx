// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import {
//   Clock, MapPin, Users, Star, Calendar,
//   ArrowRight, Mountain, Compass, Palmtree, Camera,
// } from 'lucide-react';
// import TRIPS from '../data/upcomingTrips';
// import type { Trip } from '../data/upcomingTrips';
// import TripModal, { C, DIFF_COLOR } from './TripModal'; // ← shared component

// gsap.registerPlugin(ScrollTrigger);

// function CatIcon({ cat, size = 14 }: { cat: string; size?: number }) {
//   const p = { size, strokeWidth: 1.8 };
//   if (cat === 'trek')      return <Mountain {...p}/>;
//   if (cat === 'road-trip') return <Compass {...p}/>;
//   if (cat === 'nature')    return <Palmtree {...p}/>;
//   if (cat === 'cultural')  return <Camera {...p}/>;
//   return <Compass {...p}/>;
// }

// // ── Trip Card ─────────────────────────────────────────
// function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
//   const [hover, setHover] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     gsap.fromTo(el, { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
//   }, []);

//   return (
//     <div
//       ref={ref}
//       onClick={onClick}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         borderRadius: 18,
//         overflow: 'hidden',
//         background: C.white,
//         border: `1px solid ${hover ? C.seaBd : C.border}`,
//         cursor: 'pointer',
//         transition: 'all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)',
//         transform: hover ? 'translateY(-6px)' : 'none',
//         boxShadow: hover
//           ? `0 20px 48px rgba(45,143,123,0.14), 0 0 0 1px ${C.seaBd}`
//           : '0 3px 12px rgba(0,0,0,0.05)',
      
//       }}
//     >
//       {/* image */}
//       <div style={{ position: 'relative', height: 185, overflow: 'hidden', background: 'linear-gradient(145deg,#0a2520,#0d3028)' }}>
//         <img
//           src={trip.image} alt={trip.name}
//           style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hover ? 'scale(1.07)' : 'scale(1)' }}
//           onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.08) 55%,transparent 100%)', pointerEvents: 'none' }}/>

//         {/* badges */}
//         <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '3px 9px', border: '1px solid rgba(255,255,255,0.15)' }}>
//             <CatIcon cat={trip.category} size={11}/>
//             <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 600, color: '#fff', textTransform: 'capitalize' }}>{trip.category.replace('-', ' ')}</span>
//           </div>
//           <div style={{ background: DIFF_COLOR[trip.difficulty], borderRadius: 999, padding: '3px 9px', fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 700, color: '#fff' }}>{trip.difficulty}</div>
//         </div>

//         <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//             <MapPin size={10} color="rgba(255,255,255,0.85)"/>
//             <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{trip.location}</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: `${C.sea}dd`, borderRadius: 999, padding: '2px 7px' }}>
//             <Star size={9} fill="#fff" color="#fff"/>
//             <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 700, color: '#fff' }}>{trip.rating}</span>
//           </div>
//         </div>
//       </div>

//       {/* body */}
//       <div style={{ padding: '14px 16px' }}>
//         <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 15, color: C.text, lineHeight: 1.2, marginBottom: 2 }}>{trip.name}</h3>
//         <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted, lineHeight: 1.35, marginBottom: 10 }}>{trip.subtitle}</p>

//         <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
//           {[{ icon: <Clock size={11}/>, text: trip.duration }, { icon: <Calendar size={11}/>, text: trip.months }, { icon: <Users size={11}/>, text: trip.groupSize }].map((m, i) => (
//             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//               <span style={{ color: C.sea }}>{m.icon}</span>
//               <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: C.sub }}>{m.text}</span>
//             </div>
//           ))}
//         </div>

//         <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
//           {trip.tags.slice(0, 2).map(tag => (
//             <span key={tag} style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, fontWeight: 500, color: C.seaDk, background: C.seaBg, border: `1px solid ${C.seaBd}`, borderRadius: 999, padding: '2px 7px' }}>{tag}</span>
//           ))}
//         </div>

//         <div style={{ height: 1, background: C.border, marginBottom: 10 }}/>

//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div>
//             <div style={{ display: 'inline-block', background: '#ef4444', borderRadius: 5, padding: '1px 6px', fontFamily: 'Outfit,sans-serif', fontSize: 8, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{trip.discountLabel}</div>
//             <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
//               <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted, textDecoration: 'line-through' }}>₹{trip.originalPrice.toLocaleString('en-IN')}</span>
//               <span style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 17, color: C.text }}>₹{trip.discountedPrice.toLocaleString('en-IN')}</span>
//             </div>
//             <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, color: C.muted }}>per person</div>
//           </div>

//           <button style={{
//             padding: '8px 14px',
//             borderRadius: 10,
//             background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
//             color: '#fff',
//             fontFamily: 'Outfit,sans-serif',
//             fontSize: 11,
//             fontWeight: 700,
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 4,
//             transition: 'box-shadow 0.25s',
//             boxShadow: hover ? `0 5px 16px ${C.sea}55` : 'none',
//           }}>
//             View <ArrowRight size={12}/>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main AllTrips ─────────────────────────────────────
// export default function AllTrips() {
//   const [selected, setSelected] = useState<Trip | null>(null);
//   const headRef = useRef<HTMLDivElement>(null);
//   const trips = TRIPS.slice(0, 12);

//   useEffect(() => {
//     const el = headRef.current; if (!el) return;
//     gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
//   }, []);

//   return (
//     <>
//       <section id="all-trips" style={{ background: C.bg, padding: '96px 0 80px', overflow: 'hidden' }}>
//         <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

//           {/* heading */}
//           <div ref={headRef} style={{ marginBottom: 48 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
//               <div style={{ height: 1, width: 24, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
//               <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.22em', textTransform: 'uppercase' }}>All Trips & Packages</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
//               <div>
//                 <h2 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 'clamp(26px,3vw,46px)', color: C.text, lineHeight: 1.1, marginBottom: 8 }}>
//                   Every journey,{' '}
//                   <span style={{ fontStyle: 'italic', color: C.sea }}>one place.</span>
//                 </h2>
//                 <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, color: C.sub, lineHeight: 1.65, maxWidth: 520 }}>
//                   Browse our complete collection of handcrafted trips across India — treks, road trips, cultural tours, and more.
//                 </p>
//               </div>
//               <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 14px' }}>
//                 {trips.length} trips available
//               </div>
//             </div>
//           </div>

//           {/* 4-col grid */}
//           <div className="all-trips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
//             {trips.map(trip => (
//               <TripCard key={trip.id} trip={trip} onClick={() => setSelected(trip)}/>
//             ))}
//           </div>
//         </div>
//       </section>

//       {selected && <TripModal trip={selected} onClose={() => setSelected(null)}/>}

//       <style>{`
//         @media (max-width:1100px) { .all-trips-grid { grid-template-columns: repeat(3,1fr) !important; } }
//         @media (max-width:768px)  { .all-trips-grid { grid-template-columns: repeat(2,1fr) !important; } }
//         @media (max-width:480px)  { .all-trips-grid { grid-template-columns: 1fr !important; } }
//       `}</style>
//     </>
//   );
// }