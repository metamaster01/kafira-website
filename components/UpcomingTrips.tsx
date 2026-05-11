// 'use client';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import {
//   Clock, MapPin, Users, Star, ChevronLeft, ChevronRight,
//   X, Calendar, CheckCircle2, XCircle, Phone, User,
//   MessageCircle, ArrowRight, Mountain, Compass, Palmtree, Camera,
// } from 'lucide-react';
// import TRIPS, { getFeaturedTrips } from '../data/upcomingTrips';
// import type { Trip } from '../data/upcomingTrips';

// gsap.registerPlugin(ScrollTrigger);

// // ── palette ───────────────────────────────────────────
// const C = {
//   bg:      '#faf7f2',
//   white:   '#ffffff',
//   text:    '#1a1510',
//   sub:     '#6b5e4e',
//   muted:   '#a89880',
//   border:  'rgba(0,0,0,0.07)',
//   gold:    '#c9a84c',
//   goldDk:  '#8b6914',
//   goldBg:  'rgba(201,168,76,0.09)',
//   goldBd:  'rgba(201,168,76,0.2)',
// };

// // ── difficulty colour ─────────────────────────────────
// const DIFF_COLOR: Record<string, string> = {
//   Easy:        '#22c55e',
//   Moderate:    '#f59e0b',
//   Challenging: '#ef4444',
//   Extreme:     '#8b5cf6',
// };

// // ── category icon ─────────────────────────────────────
// function CatIcon({ cat, size = 14 }: { cat: string; size?: number }) {
//   const props = { size, strokeWidth: 1.8 };
//   if (cat === 'trek')      return <Mountain {...props}/>;
//   if (cat === 'road-trip') return <Compass {...props}/>;
//   if (cat === 'nature')    return <Palmtree {...props}/>;
//   if (cat === 'cultural')  return <Camera {...props}/>;
//   return <Compass {...props}/>;
// }

// // all month tabs
// const ALL_MONTHS = ['All','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// // ── Trip Card ─────────────────────────────────────────
// function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
//   const [hover, setHover] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   return (
//     <div
//       ref={ref}
//       onClick={onClick}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         flexShrink: 0,
//         width: 300,
//         borderRadius: 20,
//         overflow: 'hidden',
//         background: C.white,
//         border: `1px solid ${hover ? C.goldBd : C.border}`,
//         cursor: 'pointer',
//         transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
//         transform: hover ? 'translateY(-8px)' : 'none',
//         boxShadow: hover
//           ? '0 24px 56px rgba(0,0,0,0.14), 0 0 0 1px rgba(201,168,76,0.2)'
//           : '0 4px 16px rgba(0,0,0,0.07)',
//       }}
//     >
//       {/* image */}
//       <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: 'linear-gradient(145deg,#1a2a3a,#1a3a2a)' }}>
//         <img
//           src={trip.image} alt={trip.name}
//           style={{
//             width: '100%', height: '100%', objectFit: 'cover', display: 'block',
//             transition: 'transform 0.5s ease',
//             transform: hover ? 'scale(1.07)' : 'scale(1)',
//           }}
//           onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
//         />
//         {/* gradient overlay */}
//         <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)', pointerEvents:'none' }}/>

//         {/* top badges */}
//         <div style={{ position:'absolute', top:12, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
//           <div style={{
//             display:'flex', alignItems:'center', gap:5,
//             background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
//             borderRadius:999, padding:'4px 10px',
//             border:'1px solid rgba(255,255,255,0.15)',
//           }}>
//             <CatIcon cat={trip.category} size={12}/>
//             <span style={{ fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:600, color:'#fff', textTransform:'capitalize' }}>
//               {trip.category.replace('-',' ')}
//             </span>
//           </div>
//           <div style={{
//             background: DIFF_COLOR[trip.difficulty],
//             borderRadius:999, padding:'4px 10px',
//             fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:700, color:'#fff',
//           }}>
//             {trip.difficulty}
//           </div>
//         </div>

//         {/* bottom state */}
//         <div style={{ position:'absolute', bottom:12, left:12, right:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <MapPin size={11} color="rgba(255,255,255,0.85)"/>
//             <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'rgba(255,255,255,0.9)', fontWeight:500 }}>{trip.location}</span>
//           </div>
//           <div style={{
//             display:'flex', alignItems:'center', gap:3,
//             background:'rgba(201,168,76,0.9)', borderRadius:999, padding:'3px 8px',
//           }}>
//             <Star size={10} fill="#fff" color="#fff"/>
//             <span style={{ fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:700, color:'#fff' }}>{trip.rating}</span>
//           </div>
//         </div>
//       </div>

//       {/* card body */}
//       <div style={{ padding:'16px 18px' }}>
//         {/* name + subtitle */}
//         <div style={{ marginBottom:10 }}>
//           <h3 style={{ fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:17, color:C.text, lineHeight:1.2, marginBottom:3 }}>
//             {trip.name}
//           </h3>
//           <p style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.muted, lineHeight:1.4 }}>
//             {trip.subtitle}
//           </p>
//         </div>

//         {/* meta row */}
//         <div style={{ display:'flex', gap:12, marginBottom:12, flexWrap:'wrap' }}>
//           {[
//             { icon:<Clock size={12}/>, text:trip.duration },
//             { icon:<Calendar size={12}/>, text:trip.months },
//             { icon:<Users size={12}/>, text:trip.groupSize },
//           ].map((m,i) => (
//             <div key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
//               <span style={{ color:C.gold }}>{m.icon}</span>
//               <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.sub }}>{m.text}</span>
//             </div>
//           ))}
//         </div>

//         {/* tags */}
//         <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:14 }}>
//           {trip.tags.slice(0,3).map(tag => (
//             <span key={tag} style={{
//               fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:500,
//               color:C.goldDk, background:C.goldBg,
//               border:`1px solid ${C.goldBd}`, borderRadius:999, padding:'3px 8px',
//             }}>{tag}</span>
//           ))}
//         </div>

//         {/* divider */}
//         <div style={{ height:1, background:C.border, marginBottom:12 }}/>

//         {/* price + CTA */}
//         <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <div>
//             {/* discount badge */}
//             <div style={{
//               display:'inline-block', background:'#ef4444',
//               borderRadius:6, padding:'2px 7px',
//               fontFamily:'Outfit,sans-serif', fontSize:9, fontWeight:700, color:'#fff',
//               marginBottom:4,
//             }}>
//               {trip.discountLabel}
//             </div>
//             <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
//               <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.muted, textDecoration:'line-through' }}>
//                 ₹{trip.originalPrice.toLocaleString('en-IN')}
//               </span>
//               <span style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:20, color:C.text }}>
//                 ₹{trip.discountedPrice.toLocaleString('en-IN')}
//               </span>
//             </div>
//             <div style={{ fontFamily:'Outfit,sans-serif', fontSize:10, color:C.muted }}>per person</div>
//           </div>

//           <button
//             style={{
//               padding:'9px 16px', borderRadius:12,
//               background:'linear-gradient(135deg,#c9a84c,#8b6914)',
//               color:'#0c0a08', fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:700,
//               border:'none', cursor:'pointer',
//               display:'flex', alignItems:'center', gap:5,
//               transition:'all 0.25s',
//               boxShadow: hover ? '0 6px 18px rgba(201,168,76,0.4)' : 'none',
//             }}
//           >
//             View Details <ArrowRight size={13}/>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── WhatsApp Enquiry Form ─────────────────────────────
// function EnquiryForm({ trip, onClose }: { trip: Trip; onClose: () => void }) {
//   const [form, setForm] = useState({ name:'', phone:'', people:'1', date:'' });
//   const [errors, setErrors] = useState<Record<string,string>>({});

//   const validate = () => {
//     const e: Record<string,string> = {};
//     if (!form.name.trim())              e.name   = 'Please enter your name';
//     if (!/^\d{10}$/.test(form.phone))   e.phone  = 'Enter valid 10-digit number';
//     if (!form.date)                     e.date   = 'Please select preferred month';
//     return e;
//   };

//   const buildWAMessage = () => {
//     const lines = [
//       `🏕 *Kafira Trip Enquiry*`,
//       ``,
//       `*Trip:* ${trip.name}`,
//       `*Duration:* ${trip.duration}`,
//       `*Route:* ${trip.location}`,
//       `*Price:* ₹${trip.discountedPrice.toLocaleString('en-IN')} per person`,
//       ``,
//       `*My Details:*`,
//       `👤 Name: ${form.name}`,
//       `📞 Phone: ${form.phone}`,
//       `👥 People: ${form.people}`,
//       `📅 Preferred Month: ${form.date}`,
//       ``,
//       `Please share available dates and booking process. Thank you!`,
//     ];
//     return encodeURIComponent(lines.join('\n'));
//   };

//   const handleSubmit = () => {
//     const e = validate();
//     if (Object.keys(e).length) { setErrors(e); return; }
//     const msg = buildWAMessage();
//     window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
//     onClose();
//   };

//   const Field = ({ id, label, error, children }: { id:string; label:string; error?:string; children:React.ReactNode }) => (
//     <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
//       <label style={{ fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:600, color:C.sub }}>{label}</label>
//       {children}
//       {error && <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'#ef4444' }}>{error}</span>}
//     </div>
//   );

//   const inputStyle = (hasErr?: boolean): React.CSSProperties => ({
//     padding:'10px 12px', borderRadius:10, border:`1px solid ${hasErr ? '#ef4444' : C.border}`,
//     fontFamily:'Outfit,sans-serif', fontSize:13, color:C.text,
//     background:C.bg, outline:'none', width:'100%',
//     transition:'border-color 0.2s',
//   });

//   return (
//     <div style={{
//       background:C.white, borderRadius:20, padding:'24px',
//       border:`1px solid ${C.border}`,
//       boxShadow:'0 8px 32px rgba(0,0,0,0.08)',
//     }}>
//       {/* header */}
//       <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
//         <div style={{ width:36, height:36, borderRadius:10, background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
//           <MessageCircle size={18} color="#25d366"/>
//         </div>
//         <div>
//           <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:14, color:C.text }}>Quick Enquiry via WhatsApp</div>
//           <div style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted }}>We respond within 2 hours</div>
//         </div>
//       </div>

//       {/* trip summary chip */}
//       <div style={{
//         background:C.goldBg, border:`1px solid ${C.goldBd}`, borderRadius:12, padding:'10px 14px',
//         marginBottom:18, display:'flex', alignItems:'center', justifyContent:'space-between',
//       }}>
//         <div>
//           <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:13, color:C.text }}>{trip.name}</div>
//           <div style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted }}>{trip.duration} · {trip.location}</div>
//         </div>
//         <div style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:16, color:C.goldDk }}>
//           ₹{trip.discountedPrice.toLocaleString('en-IN')}
//           <span style={{ fontSize:10, fontWeight:400, color:C.muted }}>/person</span>
//         </div>
//       </div>

//       {/* form fields */}
//       <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
//         <Field id="name" label="Your Name *" error={errors.name}>
//           <div style={{ position:'relative' }}>
//             <User size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:C.muted }}/>
//             <input
//               placeholder="e.g. Arjun Sharma"
//               value={form.name}
//               onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:''})); }}
//               style={{ ...inputStyle(!!errors.name), paddingLeft:32 }}
//             />
//           </div>
//         </Field>

//         <Field id="phone" label="Phone Number *" error={errors.phone}>
//           <div style={{ position:'relative' }}>
//             <Phone size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:C.muted }}/>
//             <input
//               type="tel"
//               placeholder="10-digit mobile number"
//               value={form.phone} maxLength={10}
//               onChange={e => { setForm(f=>({...f,phone:e.target.value.replace(/\D/g,'')})); setErrors(er=>({...er,phone:''})); }}
//               style={{ ...inputStyle(!!errors.phone), paddingLeft:32 }}
//             />
//           </div>
//         </Field>

//         <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
//           <Field id="people" label="No. of People">
//             <select value={form.people} onChange={e => setForm(f=>({...f,people:e.target.value}))}
//               style={{ ...inputStyle(), appearance:'none', cursor:'pointer' }}>
//               {Array.from({length:20},(_,i)=>i+1).map(n => (
//                 <option key={n} value={n}>{n} {n===1?'person':'people'}</option>
//               ))}
//             </select>
//           </Field>

//           <Field id="date" label="Preferred Month *" error={errors.date}>
//             <select value={form.date} onChange={e => { setForm(f=>({...f,date:e.target.value})); setErrors(er=>({...er,date:''})); }}
//               style={{ ...inputStyle(!!errors.date), appearance:'none', cursor:'pointer' }}>
//               <option value="">Select month</option>
//               {trip.monthTags.map(m => <option key={m} value={m}>{m}</option>)}
//             </select>
//           </Field>
//         </div>

//         <button
//           onClick={handleSubmit}
//           style={{
//             padding:'13px', borderRadius:12,
//             background:'linear-gradient(135deg,#25d366,#1da851)',
//             color:'#fff', fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:14,
//             border:'none', cursor:'pointer',
//             display:'flex', alignItems:'center', justifyContent:'center', gap:8,
//             transition:'all 0.25s', marginTop:4,
//             boxShadow:'0 6px 20px rgba(37,211,102,0.3)',
//           }}
//           onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 10px 28px rgba(37,211,102,0.4)'; }}
//           onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform='none'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 6px 20px rgba(37,211,102,0.3)'; }}
//         >
//           <MessageCircle size={18}/>
//           Send Enquiry on WhatsApp
//         </button>

//         <p style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted, textAlign:'center', lineHeight:1.5 }}>
//           Clicking above opens WhatsApp with your trip details pre-filled.
//           No spam, just your trip info.
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── Trip Detail Modal ─────────────────────────────────
// function TripModal({ trip, onClose }: { trip: Trip; onClose: () => void }) {
//   const [tab, setTab] = useState<'overview'|'itinerary'|'inclusions'|'terms'>('overview');
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const panelRef   = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     const ov = overlayRef.current;
//     const pa = panelRef.current;
//     if (!ov || !pa) return;
//     gsap.fromTo(ov, { opacity:0 }, { opacity:1, duration:0.3 });
//     gsap.fromTo(pa, { opacity:0, y:40, scale:0.97 }, { opacity:1, y:0, scale:1, duration:0.45, ease:'power3.out' });
//     return () => { document.body.style.overflow = ''; };
//   }, []);

//   const close = () => {
//     const ov = overlayRef.current;
//     const pa = panelRef.current;
//     if (!ov || !pa) { onClose(); return; }
//     gsap.to(pa, { opacity:0, y:20, scale:0.98, duration:0.3, ease:'power3.in' });
//     gsap.to(ov, { opacity:0, duration:0.3, onComplete: onClose });
//   };

//   const TABS = [
//     { id:'overview',   label:'Overview' },
//     { id:'itinerary',  label:'Itinerary' },
//     { id:'inclusions', label:'Inclusions' },
//     { id:'terms',      label:'Terms' },
//   ] as const;

//   return (
//     <div
//       ref={overlayRef}
//       onClick={e => { if (e.target === overlayRef.current) close(); }}
//       style={{
//         position:'fixed', inset:0, zIndex:1000,
//         background:'rgba(10,8,6,0.75)',
//         backdropFilter:'blur(6px)',
//         display:'flex', alignItems:'center', justifyContent:'center',
//         padding:'20px',
//         overflowY:'auto',
//       }}
//     >
//       <div
//         ref={panelRef}
//         style={{
//           width:'100%', maxWidth:980,
//           background:C.white, borderRadius:24,
//           overflow:'hidden',
//           boxShadow:'0 40px 100px rgba(0,0,0,0.35)',
//           display:'grid', gridTemplateColumns:'1fr 380px',
//           maxHeight:'90vh',
//           position:'relative',
//         }}
//       >
//         {/* ── LEFT: trip detail ── */}
//         <div style={{ overflowY:'auto', display:'flex', flexDirection:'column' }}>

//           {/* hero image */}
//           <div style={{ position:'relative', height:240, flexShrink:0, background:'linear-gradient(145deg,#1a2a3a,#1a3a2a)' }}>
//             <img src={trip.image} alt={trip.name}
//               style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
//               onError={e => { (e.currentTarget as HTMLImageElement).style.display='none'; }}
//             />
//             <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)', pointerEvents:'none' }}/>

//             {/* close button */}
//             <button onClick={close} style={{
//               position:'absolute', top:14, right:14,
//               width:36, height:36, borderRadius:'50%',
//               background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)',
//               border:'1px solid rgba(255,255,255,0.2)',
//               display:'flex', alignItems:'center', justifyContent:'center',
//               cursor:'pointer', color:'#fff', transition:'all 0.2s',
//             }}
//               onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,0.8)'; }}
//               onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,0.55)'; }}
//             ><X size={18}/></button>

//             {/* bottom info */}
//             <div style={{ position:'absolute', bottom:16, left:20, right:20 }}>
//               <div style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:26, color:'#fff', lineHeight:1.15, marginBottom:6 }}>
//                 {trip.name}
//               </div>
//               <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
//                 <span style={{ background:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', borderRadius:999, padding:'3px 10px', fontFamily:'Outfit,sans-serif', fontSize:11, color:'#fff', border:'1px solid rgba(255,255,255,0.2)' }}>
//                   {trip.state}
//                 </span>
//                 <span style={{ background: DIFF_COLOR[trip.difficulty], borderRadius:999, padding:'3px 10px', fontFamily:'Outfit,sans-serif', fontSize:11, fontWeight:700, color:'#fff' }}>
//                   {trip.difficulty}
//                 </span>
//                 <span style={{ background:'rgba(201,168,76,0.85)', borderRadius:999, padding:'3px 10px', fontFamily:'Outfit,sans-serif', fontSize:11, fontWeight:700, color:'#fff', display:'flex', alignItems:'center', gap:3 }}>
//                   <Star size={10} fill="#fff" color="#fff"/> {trip.rating} ({trip.reviews})
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* quick stats */}
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
//             {[
//               { icon:<Clock size={14}/>, label:'Duration', val:trip.duration },
//               { icon:<Calendar size={14}/>, label:'Season', val:trip.months },
//               { icon:<Users size={14}/>, label:'Group', val:trip.groupSize },
//               { icon:<MapPin size={14}/>, label:'Route', val:trip.location },
//             ].map((s,i) => (
//               <div key={i} style={{ padding:'12px 16px', borderRight: i<3 ? `1px solid ${C.border}` : 'none', textAlign:'center' }}>
//                 <div style={{ color:C.gold, display:'flex', justifyContent:'center', marginBottom:3 }}>{s.icon}</div>
//                 <div style={{ fontFamily:'Outfit,sans-serif', fontSize:10, color:C.muted, marginBottom:2, textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</div>
//                 <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:700, color:C.text }}>{s.val}</div>
//               </div>
//             ))}
//           </div>

//           {/* tabs */}
//           <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
//             {TABS.map(t => (
//               <button key={t.id} onClick={() => setTab(t.id)}
//                 style={{
//                   flex:1, padding:'12px 8px', border:'none', cursor:'pointer', background:'none',
//                   fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:600,
//                   color: tab===t.id ? C.goldDk : C.muted,
//                   borderBottom: tab===t.id ? `2px solid ${C.gold}` : '2px solid transparent',
//                   transition:'all 0.2s',
//                 }}
//               >{t.label}</button>
//             ))}
//           </div>

//           {/* tab content */}
//           <div style={{ padding:'20px 22px', flex:1, overflowY:'auto' }}>

//             {tab === 'overview' && (
//               <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
//                 <p style={{ fontFamily:'Outfit,sans-serif', fontSize:14, color:C.sub, lineHeight:1.78 }}>{trip.overview}</p>
//                 <div>
//                   <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:12, color:C.gold, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>Trip Highlights</div>
//                   <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
//                     {trip.highlights.map((h,i) => (
//                       <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
//                         <div style={{ width:18, height:18, borderRadius:'50%', background:C.goldBg, border:`1px solid ${C.goldBd}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
//                           <span style={{ fontSize:8, color:C.gold }}>✦</span>
//                         </div>
//                         <span style={{ fontFamily:'Outfit,sans-serif', fontSize:13, color:C.text, lineHeight:1.55 }}>{h}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 {/* things to carry */}
//                 <div>
//                   <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:12, color:C.gold, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:10 }}>What to Carry</div>
//                   <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
//                     {trip.thingsToCarry.map((t,i) => (
//                       <span key={i} style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.sub, background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:'4px 10px' }}>{t}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {tab === 'itinerary' && (
//               <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
//                 {trip.itinerary.map((day, i) => (
//                   <div key={i} style={{ display:'flex', gap:14, paddingBottom:16, position:'relative' }}>
//                     {/* timeline */}
//                     <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
//                       <div style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:11, color:'#fff', zIndex:1 }}>
//                         {day.day}
//                       </div>
//                       {i < trip.itinerary.length - 1 && (
//                         <div style={{ flex:1, width:2, background:`linear-gradient(to bottom,${C.goldBd},transparent)`, marginTop:4 }}/>
//                       )}
//                     </div>
//                     <div style={{ flex:1, paddingTop:4 }}>
//                       <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:14, color:C.text, marginBottom:6 }}>{day.title}</div>
//                       <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
//                         {day.activities.map((act,j) => (
//                           <div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start' }}>
//                             <div style={{ width:5, height:5, borderRadius:'50%', background:C.gold, flexShrink:0, marginTop:5 }}/>
//                             <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.sub, lineHeight:1.5 }}>{act}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === 'inclusions' && (
//               <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
//                 <div>
//                   <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
//                     <CheckCircle2 size={16} color="#22c55e"/>
//                     <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:13, color:C.text }}>Inclusions</span>
//                   </div>
//                   <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
//                     {trip.inclusions.map((inc,i) => (
//                       <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
//                         <div style={{ width:16, height:16, borderRadius:'50%', background:'rgba(34,197,94,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
//                           <span style={{ fontSize:8, color:'#22c55e' }}>✓</span>
//                         </div>
//                         <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.text, lineHeight:1.5 }}>{inc}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
//                     <XCircle size={16} color="#ef4444"/>
//                     <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:13, color:C.text }}>Exclusions</span>
//                   </div>
//                   <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
//                     {trip.exclusions.map((exc,i) => (
//                       <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
//                         <div style={{ width:16, height:16, borderRadius:'50%', background:'rgba(239,68,68,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
//                           <span style={{ fontSize:8, color:'#ef4444' }}>✕</span>
//                         </div>
//                         <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.sub, lineHeight:1.5 }}>{exc}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {tab === 'terms' && (
//               <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
//                 <p style={{ fontFamily:'Outfit,sans-serif', fontSize:13, color:C.muted, marginBottom:8, lineHeight:1.6 }}>
//                   Please read the following before booking:
//                 </p>
//                 {trip.terms.map((t,i) => (
//                   <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 12px', background:C.bg, borderRadius:10, border:`1px solid ${C.border}` }}>
//                     <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:11, color:C.gold, flexShrink:0, marginTop:1 }}>0{i+1}</span>
//                     <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.text, lineHeight:1.6 }}>{t}</span>
//                   </div>
//                 ))}
//                 {/* meeting points */}
//                 <div style={{ marginTop:8, padding:'14px 16px', background:C.goldBg, borderRadius:12, border:`1px solid ${C.goldBd}` }}>
//                   <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:11, color:C.goldDk, marginBottom:6 }}>MEETING & END POINTS</div>
//                   <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
//                     {[
//                       { label:'Meet at:', val:trip.meetingPoint },
//                       { label:'Trip ends:', val:trip.endPoint },
//                     ].map((p,i) => (
//                       <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
//                         <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted, minWidth:60 }}>{p.label}</span>
//                         <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.text, fontWeight:500, lineHeight:1.4 }}>{p.val}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── RIGHT: enquiry form (fixed) ── */}
//         <div style={{
//           background:C.bg,
//           borderLeft:`1px solid ${C.border}`,
//           padding:'24px',
//           overflowY:'auto',
//           display:'flex', flexDirection:'column',
//         }}>
//           <div style={{ fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:18, color:C.text, marginBottom:4 }}>
//             Book This Trip
//           </div>
//           <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.muted, marginBottom:20, lineHeight:1.5 }}>
//             Fill in your details and we'll connect on WhatsApp to confirm dates and process your booking.
//           </div>
//           <EnquiryForm trip={trip} onClose={close}/>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main UpcomingTrips Section ─────────────────────────
// export default function UpcomingTrips() {
//   const [activeMonth, setActiveMonth] = useState('All');
//   const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
//   const trackRef   = useRef<HTMLDivElement>(null);
//   const wrapRef    = useRef<HTMLDivElement>(null);
//   const headRef    = useRef<HTMLDivElement>(null);
//   const animRef    = useRef<gsap.core.Tween | null>(null);
//   const isPaused   = useRef(false);

//   const CARD_W  = 300;
//   const CARD_GAP = 20;
//   const UNIT    = CARD_W + CARD_GAP;

//   // filter trips
//   const trips = activeMonth === 'All'
//     ? getFeaturedTrips()
//     : getFeaturedTrips().filter(t => t.monthTags.includes(activeMonth));

//   // double the array for seamless infinite scroll
//   const displayTrips = [...trips, ...trips];

//   // build / restart auto-scroll
//   const startScroll = useCallback(() => {
//     const track = trackRef.current;
//     if (!track || trips.length === 0) return;
//     animRef.current?.kill();
//     gsap.set(track, { x: 0 });
//     const totalW = UNIT * trips.length;
//     animRef.current = gsap.to(track, {
//       x: -totalW,
//       duration: trips.length * 6,
//       ease: 'none',
//       repeat: -1,
//       paused: isPaused.current,
//     });
//   }, [trips, UNIT]);

//   useEffect(() => { startScroll(); }, [startScroll]);

//   // scroll reveal heading
//   useEffect(() => {
//     const el = headRef.current; if (!el) return;
//     gsap.set(el, { opacity:0, y:28 });
//     gsap.to(el, { opacity:1, y:0, duration:0.9, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 85%', once:true } });
//   }, []);

//   const pause  = () => { isPaused.current=true;  animRef.current?.pause(); };
//   const resume = () => { isPaused.current=false; animRef.current?.resume(); };

//   const stepLeft = () => {
//     const track = trackRef.current; if (!track) return;
//     pause();
//     gsap.to(track, { x: `+=${UNIT}`, duration:0.4, ease:'power2.out' });
//     setTimeout(resume, 2500);
//   };
//   const stepRight = () => {
//     const track = trackRef.current; if (!track) return;
//     pause();
//     gsap.to(track, { x: `-=${UNIT}`, duration:0.4, ease:'power2.out' });
//     setTimeout(resume, 2500);
//   };

//   return (
//     <>
//       <section id="upcoming-trips" style={{ background:C.bg, padding:'96px 0 80px', overflow:'hidden' }}>
//         <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>

//           {/* ── heading row ── */}
//           <div ref={headRef} style={{ opacity:0, display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:28 }}>
//             <div>
//               <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
//                 <div style={{ height:1, width:24, background:`linear-gradient(to right,transparent,${C.gold})` }}/>
//                 <span style={{ fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.22em', textTransform:'uppercase' }}>Upcoming Trips</span>
//               </div>
//               <h2 style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:'clamp(26px,3vw,44px)', color:C.text, lineHeight:1.1, marginBottom:8 }}>
//                 Where will you go{' '}
//                 <span style={{ fontStyle:'italic', color:C.gold }}>next?</span>
//               </h2>
//               <p style={{ fontFamily:'Outfit,sans-serif', fontSize:15, color:C.sub, lineHeight:1.65, maxWidth:480 }}>
//                 Handcrafted group departures across India — fixed dates, expert guides, memories guaranteed.
//               </p>
//             </div>

//             {/* arrow controls */}
//             <div style={{ display:'flex', gap:10 }}>
//               {[{ fn:stepLeft, icon:<ChevronLeft size={18}/> }, { fn:stepRight, icon:<ChevronRight size={18}/> }].map((btn,i) => (
//                 <button key={i} onClick={btn.fn} style={{
//                   width:42, height:42, borderRadius:'50%',
//                   background:C.white, border:`1px solid ${C.border}`,
//                   display:'flex', alignItems:'center', justifyContent:'center',
//                   cursor:'pointer', color:C.text,
//                   transition:'all 0.25s',
//                   boxShadow:'0 2px 8px rgba(0,0,0,0.07)',
//                 }}
//                   onMouseEnter={e => { const el=e.currentTarget as HTMLButtonElement; el.style.background=`linear-gradient(135deg,${C.gold},${C.goldDk})`; el.style.color='#fff'; el.style.border='none'; el.style.boxShadow='0 6px 18px rgba(201,168,76,0.35)'; }}
//                   onMouseLeave={e => { const el=e.currentTarget as HTMLButtonElement; el.style.background=C.white; el.style.color=C.text; el.style.border=`1px solid ${C.border}`; el.style.boxShadow='0 2px 8px rgba(0,0,0,0.07)'; }}
//                 >{btn.icon}</button>
//               ))}
//             </div>
//           </div>

//           {/* ── month filter pills ── */}
//           <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32 }}>
//             {ALL_MONTHS.map(m => (
//               <button key={m} onClick={() => setActiveMonth(m)} style={{
//                 padding:'7px 16px', borderRadius:999, border:'none', cursor:'pointer',
//                 fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:600,
//                 background: activeMonth===m ? `linear-gradient(135deg,${C.gold},${C.goldDk})` : C.white,
//                 color: activeMonth===m ? '#0c0a08' : C.sub,
//                 boxShadow: activeMonth===m ? '0 4px 14px rgba(201,168,76,0.3)' : '0 1px 4px rgba(0,0,0,0.07)',
//                 outline: activeMonth===m ? 'none' : `1px solid ${C.border}`,
//                 transition:'all 0.25s',
//                 transform: activeMonth===m ? 'scale(1.04)' : 'scale(1)',
//               }}
//                 onMouseEnter={e => { if (activeMonth!==m) (e.currentTarget as HTMLButtonElement).style.borderColor=C.goldBd; }}
//                 onMouseLeave={e => { if (activeMonth!==m) (e.currentTarget as HTMLButtonElement).style.borderColor=C.border; }}
//               >{m}</button>
//             ))}
//           </div>

//           {/* ── carousel track ── */}
//           <div
//             ref={wrapRef}
//             onMouseEnter={pause}
//             onMouseLeave={resume}
//             style={{ overflow:'hidden', position:'relative' }}
//           >
//             {/* left/right fade masks */}
//             <div style={{ position:'absolute', left:0, top:0, bottom:0, width:32, background:`linear-gradient(to right,${C.bg},transparent)`, zIndex:5, pointerEvents:'none' }}/>
//             <div style={{ position:'absolute', right:0, top:0, bottom:0, width:32, background:`linear-gradient(to left,${C.bg},transparent)`, zIndex:5, pointerEvents:'none' }}/>

//             <div
//               ref={trackRef}
//               style={{ display:'flex', gap:CARD_GAP, width:'max-content', padding:'8px 4px 24px' }}
//             >
//               {displayTrips.map((trip, i) => (
//                 <TripCard
//                   key={`${trip.id}-${i}`}
//                   trip={trip}
//                   onClick={() => setSelectedTrip(trip)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* ── view all CTA ── */}
//           <div style={{ textAlign:'center', marginTop:12 }}>
//             <a href="#all-trips" style={{
//               display:'inline-flex', alignItems:'center', gap:8,
//               padding:'12px 28px', borderRadius:999,
//               background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,
//               color:'#0c0a08', fontFamily:'Outfit,sans-serif', fontSize:14, fontWeight:700,
//               textDecoration:'none', transition:'all 0.25s',
//               boxShadow:'0 6px 20px rgba(201,168,76,0.28)',
//             }}
//               onMouseEnter={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 12px 32px rgba(201,168,76,0.4)'; }}
//               onMouseLeave={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform='none'; el.style.boxShadow='0 6px 20px rgba(201,168,76,0.28)'; }}
//             >
//               View All Trips <ArrowRight size={16}/>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ── modal ── */}
//       {selectedTrip && (
//         <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)}/>
//       )}

//       <style>{`
//         @media (max-width:768px){
//           #upcoming-trips > div > div:first-child { flex-direction: column !important; align-items: flex-start !important; }
//         }
//       `}</style>
//     </>
//   );
// }







'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clock, MapPin, Users, Star, ChevronLeft, ChevronRight,
  X, Calendar, CheckCircle2, XCircle, Phone, User,
  MessageCircle, ArrowRight, Mountain, Compass, Palmtree, Camera,
} from 'lucide-react';
import TRIPS, { getFeaturedTrips } from '../data/upcomingTrips';
import type { Trip } from '../data/upcomingTrips';

gsap.registerPlugin(ScrollTrigger);

// ── palette ───────────────────────────────────────────
const C = {
  bg:      '#faf7f2',
  white:   '#ffffff',
  text:    '#1a1510',
  sub:     '#6b5e4e',
  muted:   '#a89880',
  border:  'rgba(0,0,0,0.07)',
  gold:    '#c9a84c',
  goldDk:  '#8b6914',
  goldBg:  'rgba(201,168,76,0.09)',
  goldBd:  'rgba(201,168,76,0.2)',
};

// ── difficulty colour ─────────────────────────────────
const DIFF_COLOR: Record<string, string> = {
  Easy:        '#22c55e',
  Moderate:    '#f59e0b',
  Challenging: '#ef4444',
  Extreme:     '#8b5cf6',
};

// ── category icon ─────────────────────────────────────
function CatIcon({ cat, size = 14 }: { cat: string; size?: number }) {
  const props = { size, strokeWidth: 1.8 };
  if (cat === 'trek')      return <Mountain {...props}/>;
  if (cat === 'road-trip') return <Compass {...props}/>;
  if (cat === 'nature')    return <Palmtree {...props}/>;
  if (cat === 'cultural')  return <Camera {...props}/>;
  return <Compass {...props}/>;
}

// all month tabs
const ALL_MONTHS = ['All','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── Trip Card ─────────────────────────────────────────
function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flexShrink: 0,
        width: 300,
        borderRadius: 20,
        overflow: 'hidden',
        background: C.white,
        border: `1px solid ${hover ? C.goldBd : C.border}`,
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: hover ? 'translateY(-8px)' : 'none',
        boxShadow: hover
          ? '0 24px 56px rgba(0,0,0,0.14), 0 0 0 1px rgba(201,168,76,0.2)'
          : '0 4px 16px rgba(0,0,0,0.07)',
      }}
    >
      {/* image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: 'linear-gradient(145deg,#1a2a3a,#1a3a2a)' }}>
        <img
          src={trip.image} alt={trip.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.5s ease',
            transform: hover ? 'scale(1.07)' : 'scale(1)',
          }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        {/* gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)', pointerEvents:'none' }}/>

        {/* top badges */}
        <div style={{ position:'absolute', top:12, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div style={{
            display:'flex', alignItems:'center', gap:5,
            background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
            borderRadius:999, padding:'4px 10px',
            border:'1px solid rgba(255,255,255,0.15)',
          }}>
            <CatIcon cat={trip.category} size={12}/>
            <span style={{ fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:600, color:'#fff', textTransform:'capitalize' }}>
              {trip.category.replace('-',' ')}
            </span>
          </div>
          <div style={{
            background: DIFF_COLOR[trip.difficulty],
            borderRadius:999, padding:'4px 10px',
            fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:700, color:'#fff',
          }}>
            {trip.difficulty}
          </div>
        </div>

        {/* bottom state */}
        <div style={{ position:'absolute', bottom:12, left:12, right:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <MapPin size={11} color="rgba(255,255,255,0.85)"/>
            <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'rgba(255,255,255,0.9)', fontWeight:500 }}>{trip.location}</span>
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap:3,
            background:'rgba(201,168,76,0.9)', borderRadius:999, padding:'3px 8px',
          }}>
            <Star size={10} fill="#fff" color="#fff"/>
            <span style={{ fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:700, color:'#fff' }}>{trip.rating}</span>
          </div>
        </div>
      </div>

      {/* card body */}
      <div style={{ padding:'16px 18px' }}>
        {/* name + subtitle */}
        <div style={{ marginBottom:10 }}>
          <h3 style={{ fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:17, color:C.text, lineHeight:1.2, marginBottom:3 }}>
            {trip.name}
          </h3>
          <p style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.muted, lineHeight:1.4 }}>
            {trip.subtitle}
          </p>
        </div>

        {/* meta row */}
        <div style={{ display:'flex', gap:12, marginBottom:12, flexWrap:'wrap' }}>
          {[
            { icon:<Clock size={12}/>, text:trip.duration },
            { icon:<Calendar size={12}/>, text:trip.months },
            { icon:<Users size={12}/>, text:trip.groupSize },
          ].map((m,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ color:C.gold }}>{m.icon}</span>
              <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.sub }}>{m.text}</span>
            </div>
          ))}
        </div>

        {/* tags */}
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:14 }}>
          {trip.tags.slice(0,3).map(tag => (
            <span key={tag} style={{
              fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:500,
              color:C.goldDk, background:C.goldBg,
              border:`1px solid ${C.goldBd}`, borderRadius:999, padding:'3px 8px',
            }}>{tag}</span>
          ))}
        </div>

        {/* divider */}
        <div style={{ height:1, background:C.border, marginBottom:12 }}/>

        {/* price + CTA */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            {/* discount badge */}
            <div style={{
              display:'inline-block', background:'#ef4444',
              borderRadius:6, padding:'2px 7px',
              fontFamily:'Outfit,sans-serif', fontSize:9, fontWeight:700, color:'#fff',
              marginBottom:4,
            }}>
              {trip.discountLabel}
            </div>
            <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
              <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.muted, textDecoration:'line-through' }}>
                ₹{trip.originalPrice.toLocaleString('en-IN')}
              </span>
              <span style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:20, color:C.text }}>
                ₹{trip.discountedPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ fontFamily:'Outfit,sans-serif', fontSize:10, color:C.muted }}>per person</div>
          </div>

          <button
            style={{
              padding:'9px 16px', borderRadius:12,
              background:'linear-gradient(135deg,#c9a84c,#8b6914)',
              color:'#0c0a08', fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:700,
              border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', gap:5,
              transition:'all 0.25s',
              boxShadow: hover ? '0 6px 18px rgba(201,168,76,0.4)' : 'none',
            }}
          >
            View Details <ArrowRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Field wrapper — defined OUTSIDE EnquiryForm so it never remounts ──
function Field({ label, error, children }: { label:string; error?:string; children:React.ReactNode }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:600, color:C.sub }}>{label}</label>
      {children}
      {error && <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'#ef4444' }}>{error}</span>}
    </div>
  );
}

// ── WhatsApp Enquiry Form ─────────────────────────────
function EnquiryForm({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const [form, setForm] = useState({ name:'', phone:'', people:'1', date:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())              e.name   = 'Please enter your name';
    if (!/^\d{10}$/.test(form.phone))   e.phone  = 'Enter valid 10-digit number';
    if (!form.date)                     e.date   = 'Please select preferred month';
    return e;
  };

  const buildWAMessage = () => {
    const lines = [
      `🏕 *Kafira Trip Enquiry*`,
      ``,
      `*Trip:* ${trip.name}`,
      `*Duration:* ${trip.duration}`,
      `*Route:* ${trip.location}`,
      `*Price:* ₹${trip.discountedPrice.toLocaleString('en-IN')} per person`,
      ``,
      `*My Details:*`,
      `👤 Name: ${form.name}`,
      `📞 Phone: ${form.phone}`,
      `👥 People: ${form.people}`,
      `📅 Preferred Month: ${form.date}`,
      ``,
      `Please share available dates and booking process. Thank you!`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const msg = buildWAMessage();
    window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
    onClose();
  };

  const inputStyle = (hasErr?: boolean): React.CSSProperties => ({
    padding:'10px 12px', borderRadius:10, border:`1px solid ${hasErr ? '#ef4444' : C.border}`,
    fontFamily:'Outfit,sans-serif', fontSize:13, color:C.text,
    background:C.bg, outline:'none', width:'100%',
    transition:'border-color 0.2s',
  });

  return (
    <div style={{
      background:C.white, borderRadius:20, padding:'24px',
      border:`1px solid ${C.border}`,
      boxShadow:'0 8px 32px rgba(0,0,0,0.08)',
    }}>
      {/* header */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <MessageCircle size={18} color="#25d366"/>
        </div>
        <div>
          <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:14, color:C.text }}>Quick Enquiry via WhatsApp</div>
          <div style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted }}>We respond within 2 hours</div>
        </div>
      </div>

      {/* trip summary chip */}
      <div style={{
        background:C.goldBg, border:`1px solid ${C.goldBd}`, borderRadius:12, padding:'10px 14px',
        marginBottom:18, display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <div>
          <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:13, color:C.text }}>{trip.name}</div>
          <div style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted }}>{trip.duration} · {trip.location}</div>
        </div>
        <div style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:16, color:C.goldDk }}>
          ₹{trip.discountedPrice.toLocaleString('en-IN')}
          <span style={{ fontSize:10, fontWeight:400, color:C.muted }}>/person</span>
        </div>
      </div>

      {/* form fields */}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <Field label="Your Name *" error={errors.name}>
          <div style={{ position:'relative' }}>
            <User size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:C.muted }}/>
            <input
              placeholder="e.g. Arjun Sharma"
              value={form.name}
              onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:''})); }}
              style={{ ...inputStyle(!!errors.name), paddingLeft:32 }}
            />
          </div>
        </Field>

        <Field label="Phone Number *" error={errors.phone}>
          <div style={{ position:'relative' }}>
            <Phone size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:C.muted }}/>
            <input
              placeholder="10-digit mobile number"
              value={form.phone} maxLength={10}
              onChange={e => { setForm(f=>({...f,phone:e.target.value.replace(/\D/g,'')})); setErrors(er=>({...er,phone:''})); }}
              style={{ ...inputStyle(!!errors.phone), paddingLeft:32 }}
            />
          </div>
        </Field>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Field label="No. of People">
            <select value={form.people} onChange={e => setForm(f=>({...f,people:e.target.value}))}
              style={{ ...inputStyle(), appearance:'none', cursor:'pointer' }}>
              {Array.from({length:20},(_,i)=>i+1).map(n => (
                <option key={n} value={n}>{n} {n===1?'person':'people'}</option>
              ))}
            </select>
          </Field>

          <Field label="Preferred Month *" error={errors.date}>
            <select value={form.date} onChange={e => { setForm(f=>({...f,date:e.target.value})); setErrors(er=>({...er,date:''})); }}
              style={{ ...inputStyle(!!errors.date), appearance:'none', cursor:'pointer' }}>
              <option value="">Select month</option>
              {trip.monthTags.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            padding:'13px', borderRadius:12,
            background:'linear-gradient(135deg,#25d366,#1da851)',
            color:'#fff', fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:14,
            border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            transition:'all 0.25s', marginTop:4,
            boxShadow:'0 6px 20px rgba(37,211,102,0.3)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 10px 28px rgba(37,211,102,0.4)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform='none'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 6px 20px rgba(37,211,102,0.3)'; }}
        >
          <MessageCircle size={18}/>
          Send Enquiry on WhatsApp
        </button>

        <p style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted, textAlign:'center', lineHeight:1.5 }}>
          Clicking above opens WhatsApp with your trip details pre-filled.
          No spam, just your trip info.
        </p>
      </div>
    </div>
  );
}

// ── Trip Detail Modal ─────────────────────────────────
function TripModal({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const [tab, setTab] = useState<'overview'|'itinerary'|'inclusions'|'terms'>('overview');
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const ov = overlayRef.current;
    const pa = panelRef.current;
    if (!ov || !pa) return;
    gsap.fromTo(ov, { opacity:0 }, { opacity:1, duration:0.3 });
    gsap.fromTo(pa, { opacity:0, y:40, scale:0.97 }, { opacity:1, y:0, scale:1, duration:0.45, ease:'power3.out' });
    return () => { document.body.style.overflow = ''; };
  }, []);

  const close = () => {
    const ov = overlayRef.current;
    const pa = panelRef.current;
    if (!ov || !pa) { onClose(); return; }
    gsap.to(pa, { opacity:0, y:20, scale:0.98, duration:0.3, ease:'power3.in' });
    gsap.to(ov, { opacity:0, duration:0.3, onComplete: onClose });
  };

  const TABS = [
    { id:'overview',   label:'Overview' },
    { id:'itinerary',  label:'Itinerary' },
    { id:'inclusions', label:'Inclusions' },
    { id:'terms',      label:'Terms' },
  ] as const;

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) close(); }}
      style={{
        position:'fixed', inset:0, zIndex:1000,
        background:'rgba(10,8,6,0.75)',
        backdropFilter:'blur(6px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'20px',
        overflowY:'auto',
      }}
    >
      <div
        ref={panelRef}
        style={{
          width:'100%', maxWidth:980,
          background:C.white, borderRadius:24,
          overflow:'hidden',
          boxShadow:'0 40px 100px rgba(0,0,0,0.35)',
          display:'grid', gridTemplateColumns:'1fr 380px',
          maxHeight:'90vh',
          position:'relative',
        }}
      >
        {/* ── LEFT: trip detail ── */}
        <div style={{ overflowY:'auto', display:'flex', flexDirection:'column' }}>

          {/* hero image */}
          <div style={{ position:'relative', height:240, flexShrink:0, background:'linear-gradient(145deg,#1a2a3a,#1a3a2a)' }}>
            <img src={trip.image} alt={trip.name}
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display='none'; }}
            />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)', pointerEvents:'none' }}/>

            {/* close button */}
            <button onClick={close} style={{
              position:'absolute', top:14, right:14,
              width:36, height:36, borderRadius:'50%',
              background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(255,255,255,0.2)',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', color:'#fff', transition:'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,0.8)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,0.55)'; }}
            ><X size={18}/></button>

            {/* bottom info */}
            <div style={{ position:'absolute', bottom:16, left:20, right:20 }}>
              <div style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:26, color:'#fff', lineHeight:1.15, marginBottom:6 }}>
                {trip.name}
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <span style={{ background:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', borderRadius:999, padding:'3px 10px', fontFamily:'Outfit,sans-serif', fontSize:11, color:'#fff', border:'1px solid rgba(255,255,255,0.2)' }}>
                  {trip.state}
                </span>
                <span style={{ background: DIFF_COLOR[trip.difficulty], borderRadius:999, padding:'3px 10px', fontFamily:'Outfit,sans-serif', fontSize:11, fontWeight:700, color:'#fff' }}>
                  {trip.difficulty}
                </span>
                <span style={{ background:'rgba(201,168,76,0.85)', borderRadius:999, padding:'3px 10px', fontFamily:'Outfit,sans-serif', fontSize:11, fontWeight:700, color:'#fff', display:'flex', alignItems:'center', gap:3 }}>
                  <Star size={10} fill="#fff" color="#fff"/> {trip.rating} ({trip.reviews})
                </span>
              </div>
            </div>
          </div>

          {/* quick stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
            {[
              { icon:<Clock size={14}/>, label:'Duration', val:trip.duration },
              { icon:<Calendar size={14}/>, label:'Season', val:trip.months },
              { icon:<Users size={14}/>, label:'Group', val:trip.groupSize },
              { icon:<MapPin size={14}/>, label:'Route', val:trip.location },
            ].map((s,i) => (
              <div key={i} style={{ padding:'12px 16px', borderRight: i<3 ? `1px solid ${C.border}` : 'none', textAlign:'center' }}>
                <div style={{ color:C.gold, display:'flex', justifyContent:'center', marginBottom:3 }}>{s.icon}</div>
                <div style={{ fontFamily:'Outfit,sans-serif', fontSize:10, color:C.muted, marginBottom:2, textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</div>
                <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:700, color:C.text }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* tabs */}
          <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{
                  flex:1, padding:'12px 8px', border:'none', cursor:'pointer', background:'none',
                  fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:600,
                  color: tab===t.id ? C.goldDk : C.muted,
                  borderBottom: tab===t.id ? `2px solid ${C.gold}` : '2px solid transparent',
                  transition:'all 0.2s',
                }}
              >{t.label}</button>
            ))}
          </div>

          {/* tab content */}
          <div style={{ padding:'20px 22px', flex:1, overflowY:'auto' }}>

            {tab === 'overview' && (
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <p style={{ fontFamily:'Outfit,sans-serif', fontSize:14, color:C.sub, lineHeight:1.78 }}>{trip.overview}</p>
                <div>
                  <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:12, color:C.gold, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>Trip Highlights</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {trip.highlights.map((h,i) => (
                      <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', background:C.goldBg, border:`1px solid ${C.goldBd}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                          <span style={{ fontSize:8, color:C.gold }}>✦</span>
                        </div>
                        <span style={{ fontFamily:'Outfit,sans-serif', fontSize:13, color:C.text, lineHeight:1.55 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* things to carry */}
                <div>
                  <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:12, color:C.gold, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:10 }}>What to Carry</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                    {trip.thingsToCarry.map((t,i) => (
                      <span key={i} style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.sub, background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:'4px 10px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'itinerary' && (
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {trip.itinerary.map((day, i) => (
                  <div key={i} style={{ display:'flex', gap:14, paddingBottom:16, position:'relative' }}>
                    {/* timeline */}
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                      <div style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:11, color:'#fff', zIndex:1 }}>
                        {day.day}
                      </div>
                      {i < trip.itinerary.length - 1 && (
                        <div style={{ flex:1, width:2, background:`linear-gradient(to bottom,${C.goldBd},transparent)`, marginTop:4 }}/>
                      )}
                    </div>
                    <div style={{ flex:1, paddingTop:4 }}>
                      <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:14, color:C.text, marginBottom:6 }}>{day.title}</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                        {day.activities.map((act,j) => (
                          <div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start' }}>
                            <div style={{ width:5, height:5, borderRadius:'50%', background:C.gold, flexShrink:0, marginTop:5 }}/>
                            <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.sub, lineHeight:1.5 }}>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'inclusions' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
                    <CheckCircle2 size={16} color="#22c55e"/>
                    <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:13, color:C.text }}>Inclusions</span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {trip.inclusions.map((inc,i) => (
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                        <div style={{ width:16, height:16, borderRadius:'50%', background:'rgba(34,197,94,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                          <span style={{ fontSize:8, color:'#22c55e' }}>✓</span>
                        </div>
                        <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.text, lineHeight:1.5 }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
                    <XCircle size={16} color="#ef4444"/>
                    <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:13, color:C.text }}>Exclusions</span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {trip.exclusions.map((exc,i) => (
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                        <div style={{ width:16, height:16, borderRadius:'50%', background:'rgba(239,68,68,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                          <span style={{ fontSize:8, color:'#ef4444' }}>✕</span>
                        </div>
                        <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.sub, lineHeight:1.5 }}>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'terms' && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <p style={{ fontFamily:'Outfit,sans-serif', fontSize:13, color:C.muted, marginBottom:8, lineHeight:1.6 }}>
                  Please read the following before booking:
                </p>
                {trip.terms.map((t,i) => (
                  <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 12px', background:C.bg, borderRadius:10, border:`1px solid ${C.border}` }}>
                    <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:11, color:C.gold, flexShrink:0, marginTop:1 }}>0{i+1}</span>
                    <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.text, lineHeight:1.6 }}>{t}</span>
                  </div>
                ))}
                {/* meeting points */}
                <div style={{ marginTop:8, padding:'14px 16px', background:C.goldBg, borderRadius:12, border:`1px solid ${C.goldBd}` }}>
                  <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:11, color:C.goldDk, marginBottom:6 }}>MEETING & END POINTS</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    {[
                      { label:'Meet at:', val:trip.meetingPoint },
                      { label:'Trip ends:', val:trip.endPoint },
                    ].map((p,i) => (
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                        <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:C.muted, minWidth:60 }}>{p.label}</span>
                        <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.text, fontWeight:500, lineHeight:1.4 }}>{p.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: enquiry form (fixed) ── */}
        <div style={{
          background:C.bg,
          borderLeft:`1px solid ${C.border}`,
          padding:'24px',
          overflowY:'auto',
          display:'flex', flexDirection:'column',
        }}>
          <div style={{ fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:18, color:C.text, marginBottom:4 }}>
            Book This Trip
          </div>
          <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:C.muted, marginBottom:20, lineHeight:1.5 }}>
            Fill in your details and we'll connect on WhatsApp to confirm dates and process your booking.
          </div>
          <EnquiryForm trip={trip} onClose={close}/>
        </div>
      </div>
    </div>
  );
}

// ── Main UpcomingTrips Section ─────────────────────────
export default function UpcomingTrips() {
  const [activeMonth, setActiveMonth] = useState('All');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const animRef    = useRef<gsap.core.Tween | null>(null);
  const isPaused   = useRef(false);

  const CARD_W  = 300;
  const CARD_GAP = 20;
  const UNIT    = CARD_W + CARD_GAP;

  // filter trips
  const trips = activeMonth === 'All'
    ? getFeaturedTrips()
    : getFeaturedTrips().filter(t => t.monthTags.includes(activeMonth));

  // double the array for seamless infinite scroll
  const displayTrips = [...trips, ...trips];

  // build / restart auto-scroll
  const startScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || trips.length === 0) return;
    animRef.current?.kill();
    gsap.set(track, { x: 0 });
    const totalW = UNIT * trips.length;
    animRef.current = gsap.to(track, {
      x: -totalW,
      duration: trips.length * 4,
      ease: 'none',
      repeat: -1,
      paused: isPaused.current,
    });
  }, [trips, UNIT]);

  useEffect(() => { startScroll(); }, [startScroll]);

  // scroll reveal heading
  useEffect(() => {
    const el = headRef.current; if (!el) return;
    gsap.set(el, { opacity:0, y:28 });
    gsap.to(el, { opacity:1, y:0, duration:0.9, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 85%', once:true } });
  }, []);

  const pause  = () => { isPaused.current=true;  animRef.current?.pause(); };
  const resume = () => { isPaused.current=false; animRef.current?.resume(); };

  const stepLeft = () => {
    const track = trackRef.current; if (!track) return;
    pause();
    gsap.to(track, { x: `+=${UNIT}`, duration:0.4, ease:'power2.out' });
    setTimeout(resume, 2500);
  };
  const stepRight = () => {
    const track = trackRef.current; if (!track) return;
    pause();
    gsap.to(track, { x: `-=${UNIT}`, duration:0.4, ease:'power2.out' });
    setTimeout(resume, 2500);
  };

  return (
    <>
      <section id="upcoming-trips" style={{ background:C.bg, padding:'96px 0 80px', overflow:'hidden' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>

          {/* ── heading row ── */}
          <div ref={headRef} style={{ opacity:0, display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:28 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <div style={{ height:1, width:24, background:`linear-gradient(to right,transparent,${C.gold})` }}/>
                <span style={{ fontFamily:'Outfit,sans-serif', fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.22em', textTransform:'uppercase' }}>Upcoming Trips</span>
              </div>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontWeight:800, fontSize:'clamp(26px,3vw,44px)', color:C.text, lineHeight:1.1, marginBottom:8 }}>
                Where will you go{' '}
                <span style={{ fontStyle:'italic', color:C.gold }}>next?</span>
              </h2>
              <p style={{ fontFamily:'Outfit,sans-serif', fontSize:15, color:C.sub, lineHeight:1.65, maxWidth:480 }}>
                Handcrafted group departures across India — fixed dates, expert guides, memories guaranteed.
              </p>
            </div>

            {/* arrow controls */}
            <div style={{ display:'flex', gap:10 }}>
              {[{ fn:stepLeft, icon:<ChevronLeft size={18}/> }, { fn:stepRight, icon:<ChevronRight size={18}/> }].map((btn,i) => (
                <button key={i} onClick={btn.fn} style={{
                  width:42, height:42, borderRadius:'50%',
                  background:C.white, border:`1px solid ${C.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', color:C.text,
                  transition:'all 0.25s',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.07)',
                }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLButtonElement; el.style.background=`linear-gradient(135deg,${C.gold},${C.goldDk})`; el.style.color='#fff'; el.style.border='none'; el.style.boxShadow='0 6px 18px rgba(201,168,76,0.35)'; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLButtonElement; el.style.background=C.white; el.style.color=C.text; el.style.border=`1px solid ${C.border}`; el.style.boxShadow='0 2px 8px rgba(0,0,0,0.07)'; }}
                >{btn.icon}</button>
              ))}
            </div>
          </div>

          {/* ── month filter pills ── */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32 }}>
            {ALL_MONTHS.map(m => (
              <button key={m} onClick={() => setActiveMonth(m)} style={{
                padding:'7px 16px', borderRadius:999, border:'none', cursor:'pointer',
                fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:600,
                background: activeMonth===m ? `linear-gradient(135deg,${C.gold},${C.goldDk})` : C.white,
                color: activeMonth===m ? '#0c0a08' : C.sub,
                boxShadow: activeMonth===m ? '0 4px 14px rgba(201,168,76,0.3)' : '0 1px 4px rgba(0,0,0,0.07)',
                outline: activeMonth===m ? 'none' : `1px solid ${C.border}`,
                transition:'all 0.25s',
                transform: activeMonth===m ? 'scale(1.04)' : 'scale(1)',
              }}
                onMouseEnter={e => { if (activeMonth!==m) (e.currentTarget as HTMLButtonElement).style.borderColor=C.goldBd; }}
                onMouseLeave={e => { if (activeMonth!==m) (e.currentTarget as HTMLButtonElement).style.borderColor=C.border; }}
              >{m}</button>
            ))}
          </div>

          {/* ── carousel track ── */}
          <div
            ref={wrapRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            style={{ overflow:'hidden', position:'relative' }}
          >
            {/* left/right fade masks */}
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:48, background:`linear-gradient(to right,${C.bg},transparent)`, zIndex:5, pointerEvents:'none' }}/>
            <div style={{ position:'absolute', right:0, top:0, bottom:0, width:48, background:`linear-gradient(to left,${C.bg},transparent)`, zIndex:5, pointerEvents:'none' }}/>

            <div
              ref={trackRef}
              style={{ display:'flex', gap:CARD_GAP, width:'max-content', padding:'8px 4px 24px' }}
            >
              {displayTrips.map((trip, i) => (
                <TripCard
                  key={`${trip.id}-${i}`}
                  trip={trip}
                  onClick={() => setSelectedTrip(trip)}
                />
              ))}
            </div>
          </div>

          {/* ── view all CTA ── */}
          <div style={{ textAlign:'center', marginTop:12 }}>
            <a href="#all-trips" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'12px 28px', borderRadius:999,
              background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,
              color:'#0c0a08', fontFamily:'Outfit,sans-serif', fontSize:14, fontWeight:700,
              textDecoration:'none', transition:'all 0.25s',
              boxShadow:'0 6px 20px rgba(201,168,76,0.28)',
            }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 12px 32px rgba(201,168,76,0.4)'; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLAnchorElement; el.style.transform='none'; el.style.boxShadow='0 6px 20px rgba(201,168,76,0.28)'; }}
            >
              View All Trips <ArrowRight size={16}/>
            </a>
          </div>
        </div>
      </section>

      {/* ── modal ── */}
      {selectedTrip && (
        <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)}/>
      )}

      <style>{`
        @media (max-width:768px){
          #upcoming-trips > div > div:first-child { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </>
  );
}