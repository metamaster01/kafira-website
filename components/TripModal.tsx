// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import {
//   Clock, MapPin, Users, Star, Calendar,
//   CheckCircle2, XCircle, X, MessageCircle, Phone, User,
// } from 'lucide-react';
// import type { Trip } from '../data/upcomingTrips';

// // ── Seagreen Palette ──────────────────────────────────
// export const C = {
//   bg:      '#f4f9f8',
//   bgAlt:   '#eaf3f1',
//   white:   '#ffffff',
//   text:    '#0e1e1b',
//   sub:     '#2d5a52',
//   muted:   '#6b9e94',
//   border:  'rgba(45,143,123,0.12)',

//   // primary seagreen
//   sea:     '#2d8f7b',
//   seaDk:   '#1a6b58',
//   seaLt:   '#3db89e',

//   // accent (deep teal for highlights)
//   accent:  '#0f4f42',

//   seaBg:   'rgba(45,143,123,0.09)',
//   seaBd:   'rgba(45,143,123,0.22)',
// };

// export const DIFF_COLOR: Record<string, string> = {
//   Easy:        '#22c55e',
//   Moderate:    '#f59e0b',
//   Challenging: '#ef4444',
//   Extreme:     '#8b5cf6',
// };

// // ── Field wrapper ─────────────────────────────────────
// function Field({
//   label, error, children,
// }: { label: string; error?: string; children: React.ReactNode }) {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
//       <label style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 600, color: C.sub }}>
//         {label}
//       </label>
//       {children}
//       {error && (
//         <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: '#ef4444' }}>{error}</span>
//       )}
//     </div>
//   );
// }

// // ── WhatsApp Enquiry Form ─────────────────────────────
// function EnquiryForm({ trip, onClose }: { trip: Trip; onClose: () => void }) {
//   const [form, setForm]     = useState({ name: '', phone: '', people: '1', date: '' });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.name.trim())            e.name  = 'Please enter your name';
//     if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
//     if (!form.date)                   e.date  = 'Please select preferred month';
//     return e;
//   };

//   const buildMsg = () =>
//     encodeURIComponent(
//       [
//         '🏕 *Kafira Trip Enquiry*', '',
//         `*Trip:* ${trip.name}`,
//         `*Duration:* ${trip.duration}`,
//         `*Route:* ${trip.location}`,
//         `*Price:* ₹${trip.discountedPrice.toLocaleString('en-IN')} per person`, '',
//         '*My Details:*',
//         `👤 Name: ${form.name}`,
//         `📞 Phone: ${form.phone}`,
//         `👥 People: ${form.people}`,
//         `📅 Month: ${form.date}`, '',
//         'Please share available dates and booking process. Thank you!',
//       ].join('\n'),
//     );

//   const submit = () => {
//     const e = validate();
//     if (Object.keys(e).length) { setErrors(e); return; }
//     window.open(`https://wa.me/919253289347?text=${buildMsg()}`, '_blank');
//     onClose();
//   };

//   const inp = (err?: boolean): React.CSSProperties => ({
//     padding: '10px 12px',
//     borderRadius: 10,
//     border: `1.5px solid ${err ? '#ef4444' : C.seaBd}`,
//     fontFamily: 'Outfit,sans-serif',
//     fontSize: 13,
//     color: C.text,
//     background: C.white,
//     outline: 'none',
//     width: '100%',
//     boxSizing: 'border-box',
//     transition: 'border-color 0.2s',
//   });

//   return (
//     <div style={{
//       background: C.white,
//       borderRadius: 20,
//       padding: '22px',
//       border: `1px solid ${C.seaBd}`,
//       boxShadow: '0 8px 32px rgba(45,143,123,0.08)',
//     }}>
//       {/* header */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
//         <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//           <MessageCircle size={18} color="#25d366"/>
//         </div>
//         <div>
//           <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text }}>Quick Enquiry via WhatsApp</div>
//           <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted }}>We respond within 2 hours</div>
//         </div>
//       </div>

//       {/* trip chip */}
//       <div style={{ background: C.seaBg, border: `1px solid ${C.seaBd}`, borderRadius: 12, padding: '10px 14px', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
//         <div style={{ minWidth: 0 }}>
//           <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{trip.name}</div>
//           <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted }}>{trip.duration} · {trip.location}</div>
//         </div>
//         <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 16, color: C.seaDk, flexShrink: 0 }}>
//           ₹{trip.discountedPrice.toLocaleString('en-IN')}
//           <span style={{ fontSize: 10, fontWeight: 400, color: C.muted }}>/pp</span>
//         </div>
//       </div>

//       {/* fields */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//         <Field label="Your Name *" error={errors.name}>
//           <div style={{ position: 'relative' }}>
//             <User size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.muted }}/>
//             <input
//               placeholder="e.g. Arjun Sharma"
//               value={form.name}
//               onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
//               style={{ ...inp(!!errors.name), paddingLeft: 30 }}
//             />
//           </div>
//         </Field>

//         <Field label="Phone Number *" error={errors.phone}>
//           <div style={{ position: 'relative' }}>
//             <Phone size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.muted }}/>
//             <input
//               placeholder="10-digit mobile number"
//               value={form.phone}
//               maxLength={10}
//               onChange={e => { setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') })); setErrors(er => ({ ...er, phone: '' })); }}
//               style={{ ...inp(!!errors.phone), paddingLeft: 30 }}
//             />
//           </div>
//         </Field>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
//           <Field label="No. of People">
//             <select
//               value={form.people}
//               onChange={e => setForm(f => ({ ...f, people: e.target.value }))}
//               style={{ ...inp(), appearance: 'none', cursor: 'pointer' }}
//             >
//               {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
//                 <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
//               ))}
//             </select>
//           </Field>

//           <Field label="Preferred Month *" error={errors.date}>
//             <select
//               value={form.date}
//               onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: '' })); }}
//               style={{ ...inp(!!errors.date), appearance: 'none', cursor: 'pointer' }}
//             >
//               <option value="">Select month</option>
//               {trip.monthTags.map(m => <option key={m} value={m}>{m}</option>)}
//             </select>
//           </Field>
//         </div>

//         <button
//           onClick={submit}
//           style={{
//             padding: '12px',
//             borderRadius: 12,
//             background: 'linear-gradient(135deg,#25d366,#1da851)',
//             color: '#fff',
//             fontFamily: 'Outfit,sans-serif',
//             fontWeight: 700,
//             fontSize: 14,
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: 8,
//             boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
//             transition: 'all 0.25s',
//             marginTop: 4,
//           }}
//           onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 28px rgba(37,211,102,0.4)'; }}
//           onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'none'; el.style.boxShadow = '0 6px 20px rgba(37,211,102,0.3)'; }}
//         >
//           <MessageCircle size={17}/> Send Enquiry on WhatsApp
//         </button>

//         <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted, textAlign: 'center', lineHeight: 1.5 }}>
//           Opens WhatsApp with your details pre-filled. No spam.
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── Shared TripModal ──────────────────────────────────
// export default function TripModal({ trip, onClose }: { trip: Trip; onClose: () => void }) {
//   const [tab, setTab]   = useState<'overview' | 'itinerary' | 'inclusions' | 'terms'>('overview');
//   const overlayRef      = useRef<HTMLDivElement>(null);
//   const panelRef        = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     const ov = overlayRef.current;
//     const pa = panelRef.current;
//     if (!ov || !pa) return;
//     gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.3 });
//     gsap.fromTo(pa, { opacity: 0, y: 36, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'power3.out' });
//     return () => { document.body.style.overflow = ''; };
//   }, []);

//   const close = () => {
//     const ov = overlayRef.current;
//     const pa = panelRef.current;
//     if (!ov || !pa) { onClose(); return; }
//     gsap.to(pa, { opacity: 0, y: 20, scale: 0.98, duration: 0.28, ease: 'power3.in' });
//     gsap.to(ov, { opacity: 0, duration: 0.28, onComplete: onClose });
//   };

//   const TABS = [
//     { id: 'overview',   label: 'Overview' },
//     { id: 'itinerary',  label: 'Itinerary' },
//     { id: 'inclusions', label: 'Inclusions' },
//     { id: 'terms',      label: 'Terms' },
//   ] as const;

//   return (
//     <>
//       {/* Overlay — purely a backdrop, no flex centering that fights scroll */}
//       <div
//         ref={overlayRef}
//         onClick={e => { if (e.target === overlayRef.current) close(); }}
//         style={{
//           position: 'fixed',
//           inset: 0,
//           zIndex: 1000,
//           background: 'rgba(8,18,16,0.78)',
//           backdropFilter: 'blur(7px)',
//           WebkitBackdropFilter: 'blur(7px)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '20px',
//         }}
//       >
//         {/* Panel — explicit height so grid rows are bounded and flex children can scroll */}
//         <div
//           ref={panelRef}
//           className="trip-modal-panel"
//           style={{
//             width: '100%',
//             maxWidth: 980,
//             /* CRITICAL: use height not maxHeight so grid children inherit a real pixel value */
//             height: 'calc(100vh - 40px)',
//             maxHeight: 680,
//             background: C.white,
//             borderRadius: 24,
//             overflow: 'hidden',
//             boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
//             display: 'grid',
//             gridTemplateColumns: '1fr 360px',
//             position: 'relative',
//           }}
//         >
//           {/* ── LEFT: detail — full height flex column, tab content scrolls ── */}
//           <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

//             {/* hero */}
//             <div style={{ position: 'relative', height: 220, flexShrink: 0, background: 'linear-gradient(145deg,#0a2520,#0d3028)' }}>
//               <img
//                 src={trip.image}
//                 alt={trip.name}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//                 onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
//               />
//               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 60%)', pointerEvents: 'none' }}/>

//               {/* close */}
//               <button
//                 onClick={close}
//                 style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'all 0.2s', zIndex: 2 }}
//                 onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.8)'; }}
//                 onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.5)'; }}
//               >
//                 <X size={17}/>
//               </button>

//               {/* bottom info */}
//               <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
//                 <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 22, color: '#fff', lineHeight: 1.15, marginBottom: 6 }}>{trip.name}</div>
//                 <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
//                   <span style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '3px 10px', fontFamily: 'Outfit,sans-serif', fontSize: 10, color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}>{trip.state}</span>
//                   <span style={{ background: DIFF_COLOR[trip.difficulty], borderRadius: 999, padding: '3px 10px', fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#fff' }}>{trip.difficulty}</span>
//                   <span style={{ background: `${C.sea}cc`, borderRadius: 999, padding: '3px 10px', fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 3 }}>
//                     <Star size={9} fill="#fff" color="#fff"/> {trip.rating} ({trip.reviews})
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* stats bar */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
//               {[
//                 { icon: <Clock size={13}/>, label: 'Duration', val: trip.duration },
//                 { icon: <Calendar size={13}/>, label: 'Season',   val: trip.months },
//                 { icon: <Users size={13}/>,   label: 'Group',    val: trip.groupSize },
//                 { icon: <MapPin size={13}/>,  label: 'Route',    val: trip.location },
//               ].map((s, i) => (
//                 <div key={i} style={{ padding: '10px 12px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', textAlign: 'center' }}>
//                   <div style={{ color: C.sea, display: 'flex', justifyContent: 'center', marginBottom: 2 }}>{s.icon}</div>
//                   <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, color: C.muted, marginBottom: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
//                   <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{s.val}</div>
//                 </div>
//               ))}
//             </div>

//             {/* tabs ── seagreen pill active style */}
//             <div style={{ display: 'flex', gap: 4, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.white }}>
//               {TABS.map(t => (
//                 <button
//                   key={t.id}
//                   onClick={() => setTab(t.id)}
//                   style={{
//                     flex: 1, padding: '7px 6px',
//                     border: 'none', cursor: 'pointer', borderRadius: 8,
//                     fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 600,
//                     transition: 'all 0.2s',
//                     background: tab === t.id ? `linear-gradient(135deg,${C.sea},${C.seaDk})` : 'transparent',
//                     color: tab === t.id ? '#fff' : C.muted,
//                     boxShadow: tab === t.id ? `0 3px 10px ${C.sea}44` : 'none',
//                   }}
//                 >
//                   {t.label}
//                 </button>
//               ))}
//             </div>

//             {/* scrollable tab content — flex:1 + minHeight:0 is the key combo */}
//             <div className="trip-modal-tab-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 20px', WebkitOverflowScrolling: 'touch' }}>

//               {tab === 'overview' && (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//                   <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 14, color: C.sub, lineHeight: 1.78 }}>{trip.overview}</p>
//                   <div>
//                     <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Highlights</div>
//                     {trip.highlights.map((h, i) => (
//                       <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
//                         <div style={{ width: 17, height: 17, borderRadius: '50%', background: C.seaBg, border: `1px solid ${C.seaBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
//                           <span style={{ fontSize: 7, color: C.sea }}>✦</span>
//                         </div>
//                         <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: C.text, lineHeight: 1.55 }}>{h}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div>
//                     <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>What to Carry</div>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
//                       {trip.thingsToCarry.map((t, i) => (
//                         <span key={i} style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.sub, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: '4px 10px' }}>{t}</span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {tab === 'itinerary' && (
//                 <div>
//                   {trip.itinerary.map((day, i) => (
//                     <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14 }}>
//                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
//                         <div style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(135deg,${C.sea},${C.seaDk})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: '#fff', zIndex: 1 }}>
//                           {day.day}
//                         </div>
//                         {i < trip.itinerary.length - 1 && (
//                           <div style={{ flex: 1, width: 2, background: `linear-gradient(to bottom,${C.seaBd},transparent)`, marginTop: 3 }}/>
//                         )}
//                       </div>
//                       <div style={{ flex: 1, paddingTop: 3 }}>
//                         <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 5 }}>{day.title}</div>
//                         {day.activities.map((act, j) => (
//                           <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 3 }}>
//                             <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sea, flexShrink: 0, marginTop: 5 }}/>
//                             <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{act}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {tab === 'inclusions' && (
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
//                   <div>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
//                       <CheckCircle2 size={15} color="#22c55e"/>
//                       <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text }}>Inclusions</span>
//                     </div>
//                     {trip.inclusions.map((inc, i) => (
//                       <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
//                         <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
//                           <span style={{ fontSize: 8, color: '#22c55e' }}>✓</span>
//                         </div>
//                         <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.text, lineHeight: 1.5 }}>{inc}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
//                       <XCircle size={15} color="#ef4444"/>
//                       <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text }}>Exclusions</span>
//                     </div>
//                     {trip.exclusions.map((exc, i) => (
//                       <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
//                         <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
//                           <span style={{ fontSize: 8, color: '#ef4444' }}>✕</span>
//                         </div>
//                         <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{exc}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {tab === 'terms' && (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                   <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: C.muted, marginBottom: 6, lineHeight: 1.6 }}>Please read before booking:</p>
//                   {trip.terms.map((t, i) => (
//                     <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: C.bgAlt, borderRadius: 10, border: `1px solid ${C.border}` }}>
//                       <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, flexShrink: 0, marginTop: 1 }}>0{i + 1}</span>
//                       <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.text, lineHeight: 1.6 }}>{t}</span>
//                     </div>
//                   ))}
//                   <div style={{ marginTop: 6, padding: '12px 14px', background: C.seaBg, borderRadius: 12, border: `1px solid ${C.seaBd}` }}>
//                     <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.seaDk, marginBottom: 6 }}>MEETING & END POINTS</div>
//                     {[{ l: 'Meet at:', v: trip.meetingPoint }, { l: 'Trip ends:', v: trip.endPoint }].map((p, i) => (
//                       <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: i === 0 ? 6 : 0 }}>
//                         <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: C.muted, minWidth: 56 }}>{p.l}</span>
//                         <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.text, fontWeight: 500, lineHeight: 1.4 }}>{p.v}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── RIGHT: enquiry form — scrolls independently ── */}
//           <div
//             className="trip-modal-right"
//             style={{
//               background: C.bgAlt,
//               borderLeft: `1px solid ${C.border}`,
//               padding: '22px',
//               height: '100%',
//               overflowY: 'auto',
//               WebkitOverflowScrolling: 'touch',
//               boxSizing: 'border-box',
//             }}
//           >
//             <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 4 }}>Book This Trip</div>
//             <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.muted, marginBottom: 18, lineHeight: 1.5 }}>
//               Fill in your details and we'll connect on WhatsApp to confirm dates.
//             </div>
//             <EnquiryForm trip={trip} onClose={close}/>
//           </div>
//         </div>
//       </div>

//       {/* Responsive styles */}
//       <style>{`
//         /* Mobile: stack columns, panel scrolls as one */
//         @media (max-width: 700px) {
//           .trip-modal-panel {
//             grid-template-columns: 1fr !important;
//             height: auto !important;
//             max-height: 92vh !important;
//             overflow-y: auto !important;
//             border-radius: 18px !important;
//           }
//           /* on mobile the LEFT column is no longer height-bounded — let content flow */
//           .trip-modal-panel > div:first-child {
//             height: auto !important;
//             overflow: visible !important;
//           }
//           /* tab content area also flows freely on mobile */
//           .trip-modal-tab-content {
//             overflow-y: visible !important;
//             max-height: none !important;
//           }
//           .trip-modal-right {
//             height: auto !important;
//             overflow-y: visible !important;
//             border-left: none !important;
//             border-top: 1px solid rgba(45,143,123,0.12) !important;
//           }
//         }
//         /* Tablet */
//         @media (max-width: 900px) and (min-width: 701px) {
//           .trip-modal-panel {
//             grid-template-columns: 1fr 300px !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }





'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  Clock, MapPin, Users, Star, Calendar,
  CheckCircle2, XCircle, X, MessageCircle, Phone, User,
} from 'lucide-react';
import type { Trip } from '../data/types';

// ── Seagreen Palette ──────────────────────────────────
export const C = {
  bg:      '#f4f9f8',
  bgAlt:   '#eaf3f1',
  white:   '#ffffff',
  text:    '#0e1e1b',
  sub:     '#2d5a52',
  muted:   '#6b9e94',
  border:  'rgba(45,143,123,0.12)',

  // primary seagreen
  sea:     '#2d8f7b',
  seaDk:   '#1a6b58',
  seaLt:   '#3db89e',

  // accent (deep teal for highlights)
  accent:  '#0f4f42',

  seaBg:   'rgba(45,143,123,0.09)',
  seaBd:   'rgba(45,143,123,0.22)',
};

export const DIFF_COLOR: Record<string, string> = {
  Easy:        '#22c55e',
  Moderate:    '#f59e0b',
  Challenging: '#ef4444',
  Extreme:     '#8b5cf6',
};

// ── Field wrapper ─────────────────────────────────────
function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 600, color: C.sub }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: '#ef4444' }}>{error}</span>
      )}
    </div>
  );
}

// ── WhatsApp Enquiry Form ─────────────────────────────
function EnquiryForm({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const [form, setForm]     = useState({ name: '', phone: '', people: '1', date: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())            e.name  = 'Please enter your name';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
    if (!form.date)                   e.date  = 'Please select preferred month';
    return e;
  };

  const buildMsg = () =>
    encodeURIComponent(
      [
        '🏕 *Kafira Trip Enquiry*', '',
        `*Trip:* ${trip.name}`,
        `*Duration:* ${trip.duration}`,
        `*Route:* ${trip.location}`,
        `*Price:* ₹${trip.discountedPrice.toLocaleString('en-IN')} per person`, '',
        '*My Details:*',
        `👤 Name: ${form.name}`,
        `📞 Phone: ${form.phone}`,
        `👥 People: ${form.people}`,
        `📅 Month: ${form.date}`, '',
        'Please share available dates and booking process. Thank you!',
      ].join('\n'),
    );

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    window.open(`https://wa.me/919253289347?text=${buildMsg()}`, '_blank');
    onClose();
  };

  const inp = (err?: boolean): React.CSSProperties => ({
    padding: '10px 12px',
    borderRadius: 10,
    border: `1.5px solid ${err ? '#ef4444' : C.seaBd}`,
    fontFamily: 'Outfit,sans-serif',
    fontSize: 13,
    color: C.text,
    background: C.white,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  return (
    <div style={{
      background: C.white,
      borderRadius: 20,
      padding: '22px',
      border: `1px solid ${C.seaBd}`,
      boxShadow: '0 8px 32px rgba(45,143,123,0.08)',
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <MessageCircle size={18} color="#25d366"/>
        </div>
        <div>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text }}>Quick Enquiry via WhatsApp</div>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted }}>We respond within 2 hours</div>
        </div>
      </div>

      {/* trip chip */}
      <div style={{ background: C.seaBg, border: `1px solid ${C.seaBd}`, borderRadius: 12, padding: '10px 14px', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{trip.name}</div>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted }}>{trip.duration} · {trip.location}</div>
        </div>
        <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 16, color: C.seaDk, flexShrink: 0 }}>
          ₹{trip.discountedPrice.toLocaleString('en-IN')}
          <span style={{ fontSize: 10, fontWeight: 400, color: C.muted }}>/pp</span>
        </div>
      </div>

      {/* fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Your Name *" error={errors.name}>
          <div style={{ position: 'relative' }}>
            <User size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.muted }}/>
            <input
              placeholder="e.g. Arjun Sharma"
              value={form.name}
              onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
              style={{ ...inp(!!errors.name), paddingLeft: 30 }}
            />
          </div>
        </Field>

        <Field label="Phone Number *" error={errors.phone}>
          <div style={{ position: 'relative' }}>
            <Phone size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.muted }}/>
            <input
              placeholder="10-digit mobile number"
              value={form.phone}
              maxLength={10}
              onChange={e => { setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') })); setErrors(er => ({ ...er, phone: '' })); }}
              style={{ ...inp(!!errors.phone), paddingLeft: 30 }}
            />
          </div>
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="No. of People">
            <select
              value={form.people}
              onChange={e => setForm(f => ({ ...f, people: e.target.value }))}
              style={{ ...inp(), appearance: 'none', cursor: 'pointer' }}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </Field>

          <Field label="Preferred Month *" error={errors.date}>
            <select
              value={form.date}
              onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: '' })); }}
              style={{ ...inp(!!errors.date), appearance: 'none', cursor: 'pointer' }}
            >
              <option value="">Select month</option>
              {trip.monthTags.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
        </div>

        <button
          onClick={submit}
          style={{
            padding: '12px',
            borderRadius: 12,
            background: 'linear-gradient(135deg,#25d366,#1da851)',
            color: '#fff',
            fontFamily: 'Outfit,sans-serif',
            fontWeight: 700,
            fontSize: 14,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
            transition: 'all 0.25s',
            marginTop: 4,
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 28px rgba(37,211,102,0.4)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'none'; el.style.boxShadow = '0 6px 20px rgba(37,211,102,0.3)'; }}
        >
          <MessageCircle size={17}/> Send Enquiry on WhatsApp
        </button>

        <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.muted, textAlign: 'center', lineHeight: 1.5 }}>
          Opens WhatsApp with your details pre-filled. No spam.
        </p>
      </div>
    </div>
  );
}

// ── Shared TripModal ──────────────────────────────────
export default function TripModal({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const [tab, setTab]   = useState<'overview' | 'itinerary' | 'inclusions' | 'terms'>('overview');
  const overlayRef      = useRef<HTMLDivElement>(null);
  const panelRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const ov = overlayRef.current;
    const pa = panelRef.current;
    if (!ov || !pa) return;
    gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(pa, { opacity: 0, y: 36, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'power3.out' });
    return () => { document.body.style.overflow = ''; };
  }, []);

  const close = () => {
    const ov = overlayRef.current;
    const pa = panelRef.current;
    if (!ov || !pa) { onClose(); return; }
    gsap.to(pa, { opacity: 0, y: 20, scale: 0.98, duration: 0.28, ease: 'power3.in' });
    gsap.to(ov, { opacity: 0, duration: 0.28, onComplete: onClose });
  };

  const TABS = [
    { id: 'overview',   label: 'Overview' },
    { id: 'itinerary',  label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'terms',      label: 'Terms' },
  ] as const;

  return (
    <>
      {/* Overlay — purely a backdrop, no flex centering that fights scroll */}
      <div
        ref={overlayRef}
        onClick={e => { if (e.target === overlayRef.current) close(); }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(8,18,16,0.78)',
          backdropFilter: 'blur(7px)',
          WebkitBackdropFilter: 'blur(7px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* Panel — explicit height so grid rows are bounded and flex children can scroll */}
        <div
          ref={panelRef}
          className="trip-modal-panel"
          style={{
            width: '100%',
            maxWidth: 980,
            /* CRITICAL: use height not maxHeight so grid children inherit a real pixel value */
            height: 'calc(100vh - 40px)',
            maxHeight: 680,
            background: C.white,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            position: 'relative',
          }}
        >
          {/* ── LEFT: detail — full height flex column, tab content scrolls ── */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

            {/* hero */}
            <div style={{ position: 'relative', height: 220, flexShrink: 0, background: 'linear-gradient(145deg,#0a2520,#0d3028)' }}>
              <img
                src={trip.image}
                alt={trip.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 60%)', pointerEvents: 'none' }}/>

              {/* close */}
              <button
                onClick={close}
                style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'all 0.2s', zIndex: 2 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.8)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.5)'; }}
              >
                <X size={17}/>
              </button>

              {/* bottom info */}
              <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
                <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: 22, color: '#fff', lineHeight: 1.15, marginBottom: 6 }}>{trip.name}</div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '3px 10px', fontFamily: 'Outfit,sans-serif', fontSize: 10, color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}>{trip.state}</span>
                  <span style={{ background: DIFF_COLOR[trip.difficulty], borderRadius: 999, padding: '3px 10px', fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#fff' }}>{trip.difficulty}</span>
                  <span style={{ background: `${C.sea}cc`, borderRadius: 999, padding: '3px 10px', fontFamily: 'Outfit,sans-serif', fontSize: 10, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Star size={9} fill="#fff" color="#fff"/> {trip.rating} ({trip.reviews})
                  </span>
                </div>
              </div>
            </div>

            {/* stats bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
              {[
                { icon: <Clock size={13}/>, label: 'Duration', val: trip.duration },
                { icon: <Calendar size={13}/>, label: 'Season',   val: trip.months },
                { icon: <Users size={13}/>,   label: 'Group',    val: trip.groupSize },
                { icon: <MapPin size={13}/>,  label: 'Route',    val: trip.location },
              ].map((s, i) => (
                <div key={i} style={{ padding: '10px 12px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', textAlign: 'center' }}>
                  <div style={{ color: C.sea, display: 'flex', justifyContent: 'center', marginBottom: 2 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 9, color: C.muted, marginBottom: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                  <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* tabs ── seagreen pill active style */}
            <div style={{ display: 'flex', gap: 4, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, background: C.white }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1, padding: '7px 6px',
                    border: 'none', cursor: 'pointer', borderRadius: 8,
                    fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 600,
                    transition: 'all 0.2s',
                    background: tab === t.id ? `linear-gradient(135deg,${C.sea},${C.seaDk})` : 'transparent',
                    color: tab === t.id ? '#fff' : C.muted,
                    boxShadow: tab === t.id ? `0 3px 10px ${C.sea}44` : 'none',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* scrollable tab content — flex:1 + minHeight:0 is the key combo */}
            <div className="trip-modal-tab-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 20px', WebkitOverflowScrolling: 'touch' }}>

              {tab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 14, color: C.sub, lineHeight: 1.78 }}>{trip.overview}</p>
                  <div>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Highlights</div>
                    {trip.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                        <div style={{ width: 17, height: 17, borderRadius: '50%', background: C.seaBg, border: `1px solid ${C.seaBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 7, color: C.sea }}>✦</span>
                        </div>
                        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: C.text, lineHeight: 1.55 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>What to Carry</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {trip.thingsToCarry.map((t, i) => (
                        <span key={i} style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, color: C.sub, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: '4px 10px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'itinerary' && (
                <div>
                  {trip.itinerary.map((day, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(135deg,${C.sea},${C.seaDk})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: '#fff', zIndex: 1 }}>
                          {day.day}
                        </div>
                        {i < trip.itinerary.length - 1 && (
                          <div style={{ flex: 1, width: 2, background: `linear-gradient(to bottom,${C.seaBd},transparent)`, marginTop: 3 }}/>
                        )}
                      </div>
                      <div style={{ flex: 1, paddingTop: 3 }}>
                        <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 5 }}>{day.title}</div>
                        {day.activities.map((act, j) => (
                          <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 3 }}>
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sea, flexShrink: 0, marginTop: 5 }}/>
                            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'inclusions' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                      <CheckCircle2 size={15} color="#22c55e"/>
                      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text }}>Inclusions</span>
                    </div>
                    {trip.inclusions.map((inc, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
                        <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 8, color: '#22c55e' }}>✓</span>
                        </div>
                        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.text, lineHeight: 1.5 }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                      <XCircle size={15} color="#ef4444"/>
                      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 13, color: C.text }}>Exclusions</span>
                    </div>
                    {trip.exclusions.map((exc, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
                        <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 8, color: '#ef4444' }}>✕</span>
                        </div>
                        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'terms' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: C.muted, marginBottom: 6, lineHeight: 1.6 }}>Please read before booking:</p>
                  {trip.terms.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: C.bgAlt, borderRadius: 10, border: `1px solid ${C.border}` }}>
                      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, flexShrink: 0, marginTop: 1 }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.text, lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 6, padding: '12px 14px', background: C.seaBg, borderRadius: 12, border: `1px solid ${C.seaBd}` }}>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 10, color: C.seaDk, marginBottom: 6 }}>MEETING & END POINTS</div>
                    {[{ l: 'Meet at:', v: trip.meetingPoint }, { l: 'Trip ends:', v: trip.endPoint }].map((p, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: i === 0 ? 6 : 0 }}>
                        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 10, color: C.muted, minWidth: 56 }}>{p.l}</span>
                        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.text, fontWeight: 500, lineHeight: 1.4 }}>{p.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: enquiry form — scrolls independently ── */}
          <div
            className="trip-modal-right"
            style={{
              background: C.bgAlt,
              borderLeft: `1px solid ${C.border}`,
              padding: '22px',
              height: '100%',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 4 }}>Book This Trip</div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 12, color: C.muted, marginBottom: 18, lineHeight: 1.5 }}>
              Fill in your details and we'll connect on WhatsApp to confirm dates.
            </div>
            <EnquiryForm trip={trip} onClose={close}/>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        /* Mobile: stack columns, panel scrolls as one */
        @media (max-width: 700px) {
          .trip-modal-panel {
            grid-template-columns: 1fr !important;
            height: auto !important;
            max-height: 92vh !important;
            overflow-y: auto !important;
            border-radius: 18px !important;
          }
          /* on mobile the LEFT column is no longer height-bounded — let content flow */
          .trip-modal-panel > div:first-child {
            height: auto !important;
            overflow: visible !important;
          }
          /* tab content area also flows freely on mobile */
          .trip-modal-tab-content {
            overflow-y: visible !important;
            max-height: none !important;
          }
          .trip-modal-right {
            height: auto !important;
            overflow-y: visible !important;
            border-left: none !important;
            border-top: 1px solid rgba(45,143,123,0.12) !important;
          }
        }
        /* Tablet */
        @media (max-width: 900px) and (min-width: 701px) {
          .trip-modal-panel {
            grid-template-columns: 1fr 300px !important;
          }
        }
      `}</style>
    </>
  );
}