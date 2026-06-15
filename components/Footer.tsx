



// 'use client';
// import { useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
// import Link from 'next/link';

// gsap.registerPlugin(ScrollTrigger);

// // ── Palette ───────────────────────────────────────────
// const C = {
//   // dark seagreen surfaces
//   darkBg:    '#081a16',   // deepest — main footer bg
//   darkMid:   '#0d2821',   // slightly lighter — top band
//   darkCard:  '#102e27',   // cards / hover surfaces

//   // seagreen accents
//   sea:       '#2d8f7b',
//   seaDk:     '#1a6b58',
//   seaLt:     '#3db89e',
//   seaBd:     'rgba(45,143,123,0.25)',
//   seaBdLt:   'rgba(61,184,158,0.15)',

//   // text on dark
//   textHi:    '#e8f7f4',   // high contrast headings
//   textMid:   'rgba(180,225,218,0.72)', // body / links
//   textLo:    'rgba(180,225,218,0.38)', // muted / legal
//   textAct:   '#3db89e',   // hovered links / active

//   white:     '#ffffff',
// };

// const COLS = [
//   {
//     title: 'Company',
//     links: [
//       { label: 'Home',           href: '/' },
//       { label: 'About Us',            href: '/about-us' },
//       { label: 'Blogs',             href: '/blogs' },
//       { label: 'Contact Us',     href: '/contact-us' },
//       { label: 'Payments',       href: '/payments' },
//     ],
//   },
//   {
//     title: 'Explore',
//     links: [
//       { label: 'India',    href: '/destinations/india' },
//       { label: 'International',           href: '/destinations/international' },
//       { label: 'Kerala Backwaters',   href: '/destinations/india/kerala' },
//       { label: 'Himalayan Escapes',   href: '/destinations/india/himalayas' },
//       // { label: 'Goa & Beaches',       href: '/destinations/goa-beaches' },
//       { label: 'Meghalaya',       href: '/destinations/india/meghalaya' },
//     ],
//   },
//   {
//     title: 'Experience',
//     links: [
//       { label: 'Group Tours',         href: '/group-tour' },
//       { label: 'Weekend Getaways',    href: '/weekend-getaways' },
//       { label: 'indian tours',     href: '/destinations/india' },
//       { label: 'Adventure Trips',     href: '/contact-us' },
//       // { label: 'Honeymoon Packages',  href: '/contact' },
//       // { label: 'Corporate Tours',     href: '/contact' },
//     ],
//   },
//   {
//     title: 'Support',
//     links: [
//       // { label: 'Contact Us',          href: '#' },
//       { label: 'FAQs',                href: '/#faq' },
//       { label: 'Booking Policy',      href: '/privacy-policy/#booking' },
//       { label: 'Cancellation Policy', href: '/privacy-policy/#cancellation' },
//       { label: 'Privacy Policy',      href: '/privacy-policy/' },
//       { label: 'Terms & Conditions',  href: '/terms-of-use/' },
//     ],
//   },
// ];

// const SOCIALS = [
//   {
//     label: 'Instagram', href: 'https://www.instagram.com/kafira.travels/',
//     icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg>,
//   },
//   {
//     label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61572079204139',
//     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
//   },
//   // {
//   //   label: 'YouTube', href: '#',
//   //   icon: <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 3.57A2.78 2.78 0 0 0 20.59 1.6C18.88 1.12 12 1.12 12 1.12s-6.88 0-8.59.48A2.78 2.78 0 0 0 1.46 3.57 29 29 0 0 0 1 9a29 29 0 0 0 .46 5.43A2.78 2.78 0 0 0 3.41 16.4C5.12 16.88 12 16.88 12 16.88s6.88 0 8.59-.48a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 9a29 29 0 0 0-.46-5.43z"/><polygon points="9.75 12.02 15.5 9 9.75 5.98 9.75 12.02" fill="currentColor" stroke="none"/></svg>,
//   // },
//   // {
//   //   label: 'X', href: '#',
//   //   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
//   // },
//   {
//     label: 'WhatsApp', href: 'https://wa.me/919253289347',
//     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
//   },
// ];

// // ── Scroll reveal hook ────────────────────────────────
// function useReveal(delay = 0) {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     gsap.fromTo(el, { opacity: 0, y: 28 }, {
//       opacity: 1, y: 0,
//       duration: 0.82, delay,
//       ease: 'power3.out',
//       scrollTrigger: { trigger: el, start: 'top 93%', once: true },
//     });
//   }, [delay]);
//   return ref;
// }

// // ── Main ──────────────────────────────────────────────
// export default function Footer() {
//   const lineRef  = useRef<HTMLDivElement>(null);
//   const line2Ref = useRef<HTMLDivElement>(null);
//   const brandRef = useReveal(0);
//   const colRefs  = [useReveal(0.08), useReveal(0.14), useReveal(0.20), useReveal(0.26)];
//   const badgeRef = useReveal(0.18);

//   useEffect(() => {
//     [lineRef, line2Ref].forEach((r, i) => {
//       const el = r.current; if (!el) return;
//       gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left center' }, {
//         scaleX: 1, duration: 1.1, delay: i * 0.1,
//         ease: 'power2.inOut',
//         scrollTrigger: { trigger: el, start: 'top 96%', once: true },
//       });
//     });
//   }, []);

//   return (
//     <footer style={{ background: C.darkBg, position: 'relative', overflow: 'hidden' }}>

//       {/* ── Ambient glow orbs ── */}
//       <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', top: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,rgba(45,143,123,0.1) 0%,transparent 65%)` }}/>
//         <div style={{ position: 'absolute', bottom: '-10%', right: '-6%', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle,rgba(61,184,158,0.07) 0%,transparent 65%)` }}/>
//         <div style={{ position: 'absolute', top: '40%', right: '25%', width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(circle,rgba(15,79,66,0.12) 0%,transparent 65%)` }}/>
//       </div>

//       {/* ── TOP CTA BAND ── */}
//       {/* <div style={{
//         background: `linear-gradient(135deg,rgba(45,143,123,0.12),rgba(26,107,88,0.08))`,
//         borderBottom: `1px solid ${C.seaBdLt}`,
//         padding: '26px 40px',
//         position: 'relative', zIndex: 1,
//       }}>
      
//         <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, background: `linear-gradient(to right,transparent,${C.sea},transparent)` }}/>
//         <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
//           <div>
//             <div style={{ fontFamily: '"DM Serif Display",serif', fontWeight: 400, fontSize: 'clamp(17px,2vw,24px)', color: C.textHi, lineHeight: 1.2 }}>
//               Ready for your next adventure?
//             </div>
//             <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 400, color: C.textLo, marginTop: 5 }}>
//               Let's craft a journey that stays with you forever.
//             </div>
//           </div>
//           <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
//             <a
//               href="#tours"
//               style={{ padding: '10px 22px', borderRadius: 999, background: `linear-gradient(135deg,${C.sea},${C.seaDk})`, color: C.white, fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.25s', boxShadow: `0 4px 16px rgba(45,143,123,0.3)`, letterSpacing: '0.02em' }}
//               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 10px 28px rgba(45,143,123,0.45)`; }}
//               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = `0 4px 16px rgba(45,143,123,0.3)`; }}
//             >
//               Plan a Trip <ArrowUpRight size={14}/>
//             </a>
//             {/* <a
//               href="https://wa.me/919999999999"
//               target="_blank" rel="noopener noreferrer"
//               style={{ padding: '10px 20px', borderRadius: 999, background: 'rgba(37,211,102,0.1)', border: '1.5px solid rgba(37,211,102,0.28)', color: '#4de88e', fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.25s' }}
//               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(37,211,102,0.18)'; el.style.transform = 'translateY(-2px)'; }}
//               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(37,211,102,0.1)'; el.style.transform = 'none'; }}
//             >
//               <MessageCircle size={14}/> WhatsApp Us
//             </a> 
//           </div>
//         </div>
//       </div> */}

//       {/* ── BODY ── */}
//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 40px 44px', position: 'relative', zIndex: 1 }}>

//         {/* ── MAIN GRID: brand col + 4 link cols ── */}
//         {/* Desktop: 1.6fr + 4×1fr | Tablet: brand full-width then 2×2 | Mobile: all stacked */}
//         <div className="footer-main-grid" style={{
//           display: 'grid',
//           gridTemplateColumns: '1.6fr repeat(4,1fr)',
//           gap: '36px 32px',
//           alignItems: 'start',
//         }}>

//           {/* ── Brand column ── */}
//           <div ref={brandRef}>
//             <a href="/" style={{ display: 'inline-block', marginBottom: 18, textDecoration: 'none' }}>
//               <Image src="/logo.png" alt="Kafira" width={118} height={46} style={{ objectFit: 'contain', display: 'block' }}/>
//             </a>

//             <p style={{ fontFamily: '"DM Serif Display",serif', fontSize: 15, color: `${C.sea}99`, lineHeight: 1.7, marginBottom: 22 }}>
//               Crafting journeys,<br/>not just itineraries.
//             </p>

//             {/* contact lines */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
//               {[
//                 { icon: <MapPin size={12}/>, text: 'Panipat, Haryana' },
//                 { icon: <Phone size={12}/>,  text: '+91 92532 89347', href: 'tel:+919253289347' },
//                 { icon: <Mail size={12}/>,   text: 'support@kafira.in',  href: 'mailto:support@kafira.in' },
//               ].map(({ icon, text, href }, i) =>
//                 href ? (
//                   <a key={i} href={href} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: C.textMid, fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 400, textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s' }}
//                     onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.textAct; }}
//                     onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.textMid; }}
//                   >
//                     <span style={{ color: C.sea, marginTop: 1, flexShrink: 0 }}>{icon}</span>
//                     {text}
//                   </a>
//                 ) : (
//                   <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: C.textMid, fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 1.5 }}>
//                     <span style={{ color: C.sea, marginTop: 1, flexShrink: 0 }}>{icon}</span>
//                     {text}
//                   </div>
//                 )
//               )}
//             </div>

//             {/* social icons */}
//             <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
//               {SOCIALS.map(s => (
//                 <a
//                   key={s.label} href={s.href} aria-label={s.label}
//                   target={s.href.startsWith('http') ? '_blank' : undefined}
//                   rel="noopener noreferrer"
//                   style={{ width: 34, height: 34, borderRadius: 10, background: `rgba(45,143,123,0.08)`, border: `1px solid ${C.seaBdLt}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMid, textDecoration: 'none', transition: 'all 0.25s' }}
//                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = `rgba(45,143,123,0.2)`; el.style.borderColor = C.seaBd; el.style.color = C.textAct; el.style.transform = 'translateY(-3px)'; }}
//                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = `rgba(45,143,123,0.08)`; el.style.borderColor = C.seaBdLt; el.style.color = C.textMid; el.style.transform = 'none'; }}
//                 >
//                   {s.icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* ── 4 link columns ── */}
//           {COLS.map((col, ci) => (
//             <div key={col.title} ref={colRefs[ci]} >
//               <div style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 18 }}>
//                 {col.title}
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 {col.links.map(link => (
//                   <a
//                     key={link.label}
//                     href={link.href}
//                     style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 400, color: C.textMid, textDecoration: 'none', padding: '5px 0', transition: 'all 0.22s ease', lineHeight: 1.5 }}
//                     onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = C.textAct; el.style.paddingLeft = '6px'; }}
//                     onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = C.textMid; el.style.paddingLeft = '0'; }}
//                   >
//                     {link.label}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── DIVIDER ── */}
//         {/* <div ref={lineRef} style={{ height: 1, background: C.seaBdLt, margin: '48px 0 40px' }}/> */}

//         {/* ── TRUST BADGES ROW ── */}
//         {/* <div ref={badgeRef} style={{  display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
//           {[
//             { icon: '🏆', label: 'Best Travel Agency', sub: 'India Travel Awards 2024' },
//             { icon: '⭐', label: '4.9 / 5 Rating',     sub: '12,400+ verified reviews' },
//             { icon: '✅', label: 'Govt. Recognized',   sub: 'Ministry of Tourism, India' },
//           ].map((b, i) => (
//             <div
//               key={i}
//               style={{ display: 'flex', alignItems: 'center', gap: 10, background: `rgba(45,143,123,0.06)`, border: `1px solid ${C.seaBdLt}`, borderRadius: 14, padding: '11px 18px', transition: 'all 0.25s', cursor: 'default' }}
//               onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = `rgba(45,143,123,0.12)`; el.style.borderColor = C.seaBd; el.style.transform = 'translateY(-2px)'; }}
//               onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = `rgba(45,143,123,0.06)`; el.style.borderColor = C.seaBdLt; el.style.transform = 'none'; }}
//             >
//               <span style={{ fontSize: 20 }}>{b.icon}</span>
//               <div>
//                 <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 700, color: C.textHi, lineHeight: 1 }}>{b.label}</div>
//                 <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 9, fontWeight: 400, color: C.textLo, marginTop: 3 }}>{b.sub}</div>
//               </div>
//             </div>
//           ))}
//         </div> */}
//       </div> 

//       {/* ── BOTTOM BAR ── */}
//       <div ref={line2Ref} style={{ height: 1, background: C.seaBdLt, position: 'relative', zIndex: 1 }}/>
//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '18px 40px', position: 'relative', zIndex: 1 }}>
//         <div className="footer-bottom-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
//           <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 400, color: C.textLo }}>
//             © 2015–2026 Kafira Travel Pvt. Ltd. All rights reserved.
//           </div>
//           <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
//             {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'Sitemap'].map(l => (
//               <a
//                 key={l} href="privacty-policy" target="_blank" rel="noopener noreferrer"
//                 style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 400, color: C.textLo, textDecoration: 'none', transition: 'color 0.2s' }}
//                 onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.textAct; }}
//                 onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.textLo; }}
//               >
//                 {l}
//               </a>
//             ))}
//           </div>
//           <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 400, color: `${C.textLo}` }}>
//             Made with ❤️ by <Link href="https://metamaster.in" target="_blank" rel="noopener noreferrer">MetaMaster</Link>
//           </div>
//         </div>
//       </div>

//       {/* ── Responsive ── */}
//       <style>{`
//         /* Tablet ≤1024px: brand spans full width, links go 2×2 */
//         @media (max-width: 1024px) {
//           .footer-main-grid {
//             grid-template-columns: 1fr 1fr !important;
//           }
//           /* brand col spans both columns */
//           .footer-main-grid > div:first-child {
//             grid-column: 1 / -1;
//           }
//         }

//         /* Mobile ≤640px: everything single column */
//         @media (max-width: 640px) {
//           .footer-main-grid {
//             grid-template-columns: 1fr  !important;
//             gap: 28px !important;
      

//           }
//           .footer-main-grid > div:first-child {
//             grid-column: 1 !important;
//           }
//           /* link cols: 2 per row on mobile */
//           .footer-main-grid > div:not(:first-child) {
//             display: inline-block;
//           }
//           /* re-grid link cols as 2×2 on mobile */
//           .footer-links-mobile {
//             display: grid !important;
//             grid-template-columns: 1fr 1fr ;
//             gap: 24px 16px;
//             grid-column: 1;
//           }
//           footer > div:nth-child(3) { padding: 36px 20px 28px !important; }
//           footer > div:nth-child(2) { padding: 20px !important; }
//           footer > div:last-child   { padding: 14px 20px !important; }
//           .footer-bottom-bar { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
//         }

//         @media (max-width: 480px) {
//           footer > div:nth-child(2) > div { flex-direction: column !important; align-items: flex-start !important; }
//         }
//       `}</style>

//       {/* Mobile: wrap link cols in a 2×2 grid container */}
//       {/* This is handled via the className below — desktop ignores it, mobile uses it */}
//     </footer>
//   );
// }




'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

// ── Palette ───────────────────────────────────────────
const C = {
  darkBg:   '#081a16',
  darkMid:  '#0d2821',
  sea:      '#2d8f7b',
  seaDk:    '#1a6b58',
  seaLt:    '#3db89e',
  seaBd:    'rgba(45,143,123,0.25)',
  seaBdLt:  'rgba(61,184,158,0.15)',
  textHi:   '#e8f7f4',
  textMid:  'rgba(180,225,218,0.72)',
  textLo:   'rgba(180,225,218,0.38)',
  textAct:  '#3db89e',
  white:    '#ffffff',
};

const COLS = [
  {
    title: 'Company',
    links: [
      { label: 'Home',        href: '/'          },
      { label: 'About Us',    href: '/about-us'  },
      { label: 'Blogs',       href: '/blogs'     },
      { label: 'Contact Us',  href: '/contact-us'},
      { label: 'Payments',    href: '/payments'  },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'India',             href: '/destinations/india'          },
      { label: 'International',     href: '/destinations/international'  },
      { label: 'Kerala Backwaters', href: '/destinations/india/kerala'   },
      { label: 'Himalayan Escapes', href: '/destinations/india/himalayas'},
      { label: 'Meghalaya',         href: '/destinations/india/meghalaya'},
    ],
  },
  {
    title: 'Experience',
    links: [
      { label: 'Group Tours',      href: '/group-tours'              },
      { label: 'Weekend Getaways', href: '/weekend-getaways'         },
      { label: 'Indian Tours',     href: '/destinations/india'        },
      { label: 'Adventure Trips',  href: '/contact-us'               },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs',                href: '/#faq'                         },
      { label: 'Booking Policy',      href: '/privacy-policy/#booking'      },
      { label: 'Cancellation Policy', href: '/privacy-policy/#cancellation' },
      { label: 'Privacy Policy',      href: '/privacy-policy/'              },
      { label: 'Terms & Conditions',  href: '/terms-of-use/'                },
    ],
  },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/kafira.travels/',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61572079204139',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919253289347',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

// ── Social icon button ─────────────────────────────────
function SocialBtn({ s }: { s: typeof SOCIALS[0] }) {
  return (
    <motion.a
      href={s.href}
      aria-label={s.label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, color: C.textAct, borderColor: C.seaBd, backgroundColor: 'rgba(45,143,123,0.20)' }}
      whileTap={{ scale: 0.93 }}
      style={{
        width: 34, height: 34, borderRadius: 10,
        background: 'rgba(45,143,123,0.08)',
        border: `1px solid ${C.seaBdLt}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.textMid, textDecoration: 'none',
        transition: 'background 0.22s, border-color 0.22s, color 0.22s',
      }}
    >
      {s.icon}
    </motion.a>
  );
}

// ── Footer link ────────────────────────────────────────
function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 5, color: C.textAct }}
      style={{
        fontFamily: '"Outfit",sans-serif',
        fontSize: 13, fontWeight: 400,
        color: C.textMid,
        textDecoration: 'none',
        padding: '4px 0',
        display: 'block',
        transition: 'color 0.2s',
        lineHeight: 1.5,
      }}
    >
      {label}
    </motion.a>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN FOOTER
// ═══════════════════════════════════════════════════════
export default function Footer() {
  return (
    <footer style={{ background: C.darkBg, position: 'relative', overflow: 'hidden' }}>

      {/* ambient orbs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,rgba(45,143,123,0.10) 0%,transparent 65%)` }}/>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-6%', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle,rgba(61,184,158,0.07) 0%,transparent 65%)` }}/>
        <div style={{ position: 'absolute', top: '40%', right: '25%', width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(circle,rgba(15,79,66,0.12) 0%,transparent 65%)` }}/>
      </div>

      {/* ── BODY ── */}
      {/*
        .footer-body is the CSS grid container.
        Direct children must be the actual grid items —
        no wrapper divs from Reveal, otherwise grid
        placement breaks. We animate the *inner* content
        instead using motion.div with whileInView.
      */}
      <div
        className="footer-body"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(40px,5vw,56px) clamp(20px,4vw,40px) clamp(36px,4vw,44px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Col 1: Brand ── */}
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="/" style={{ display: 'inline-block', marginBottom: 18, textDecoration: 'none' }}>
            <Image src="/logo.png" alt="Kafira" width={118} height={46} style={{ objectFit: 'contain', display: 'block' }}/>
          </a>

          <p style={{ fontFamily: '"DM Serif Display",serif', fontSize: 15, color: 'rgba(45,143,123,0.7)', lineHeight: 1.7, marginBottom: 22 }}>
            Crafting journeys,<br/>not just itineraries.
          </p>

          {/* contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { icon: <MapPin size={12}/>, text: 'Panipat, Haryana' },
              { icon: <Phone size={12}/>,  text: '+91 92532 89347',  href: 'tel:+919253289347'       },
              { icon: <Mail size={12}/>,   text: 'support@kafira.in', href: 'mailto:support@kafira.in' },
            ].map(({ icon, text, href }, i) =>
              href ? (
                <motion.a key={i} href={href} whileHover={{ color: C.textAct }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: C.textMid, fontFamily: '"Outfit",sans-serif', fontSize: 12, fontWeight: 400, textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s' }}>
                  <span style={{ color: C.sea, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                  {text}
                </motion.a>
              ) : (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: C.textMid, fontFamily: '"Outfit",sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 1.5 }}>
                  <span style={{ color: C.sea, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                  {text}
                </div>
              )
            )}
          </div>

          {/* social icons */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {SOCIALS.map(s => <SocialBtn key={s.label} s={s}/>)}
          </div>
        </motion.div>

        {/* ── Cols 2-5: Link columns ── */}
        {/*
          Each col is a direct child of .footer-body grid.
          On desktop: cols 2, 3, 4, 5.
          On mobile: 2×2 grid via .footer-links-wrapper.
          We wrap all 4 in one div (.footer-links-wrapper)
          that on desktop spans cols 2-5 via CSS,
          and on mobile becomes its own 2×2 grid.
        */}
        <div className="footer-links-wrapper">
          {COLS.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, delay: 0.08 + ci * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{
                fontFamily: '"Outfit",sans-serif',
                fontWeight: 700, fontSize: 10, color: C.sea,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {col.links.map(link => <FooterLink key={link.label} label={link.label} href={link.href}/>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'left center' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 1, background: C.seaBdLt, position: 'relative', zIndex: 1 }}
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(14px,2vw,18px) clamp(20px,4vw,40px)', position: 'relative', zIndex: 1 }}>
        <div className="footer-bottom-bar">
          <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, fontWeight: 400, color: C.textLo }}>
            © 2015–2026 Kafira Travel Pvt. Ltd. All rights reserved.
          </div>

          <div className="footer-bottom-links">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', ].map(l => (
              <motion.a key={l} href="/privacy-policy" target="_blank" rel="noopener noreferrer"
                whileHover={{ color: C.textAct }}
                style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, fontWeight: 400, color: C.textLo, textDecoration: 'none', transition: 'color 0.2s' }}>
                {l}
              </motion.a>
            ))}
            <Link href="/sitemap" target="_blank" rel="noopener noreferrer"
      
              style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, fontWeight: 400, color: C.textLo, textDecoration: 'none', transition: 'color 0.2s' }}>
              Sitemap
            </Link>
          </div>

          <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, fontWeight: 400, color: C.textLo }}>
            Made with ❤️ by{' '}
            <Link href="https://metamaster.in" target="_blank" rel="noopener noreferrer"
              style={{ color: C.textAct, textDecoration: 'none' }}>
              MetaMaster
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@400;500;600;700&display=swap');

        /* ══════════════════════════════════════════════
           DESKTOP (> 1024px)

           .footer-body  = 2-column grid:
                           [brand 1.7fr] [links-wrapper rest]
           .footer-links-wrapper = 4-column sub-grid inside
           .footer-brand = left col (normal text-align)
        ══════════════════════════════════════════════ */
        .footer-body {
          display: grid;
          grid-template-columns: 1.7fr 1fr 1fr 1fr 1fr;
          gap: 36px 32px;
          align-items: start;
        }

        .footer-brand {
          grid-column: 1;
        }

        /* links wrapper spans cols 2-5 */
        .footer-links-wrapper {
          grid-column: 2 / 6;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px 32px;
        }

        /* ══════════════════════════════════════════════
           TABLET (641px – 1024px)

           Stack brand + links vertically.
           Brand stays left-aligned.
           Links go 2 × 2.
        ══════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .footer-body {
            display: flex !important;
            flex-direction: column !important;
            gap: 36px !important;
          }

          .footer-brand {
            grid-column: unset;
            text-align: left;
          }

          .footer-links-wrapper {
            grid-column: unset;
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 40px !important;
            width: 100% !important;
          }
        }

        /* ══════════════════════════════════════════════
           MOBILE (≤ 640px)

           Brand centred (logo + text + socials centred).
           Links still 2 × 2.
           Bottom bar stacks vertically.
        ══════════════════════════════════════════════ */
        @media (max-width: 640px) {
          .footer-body {
            gap: 28px !important;
          }

          /* Centre everything inside the brand col */
          .footer-brand {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }

          /* socials row stays centred */
          .footer-brand > div:last-child {
            justify-content: center;
          }

          .footer-links-wrapper {
            grid-template-columns: 1fr 1fr !important;
            gap: 22px 24px !important;
          }

          /* bottom bar */
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .footer-bottom-links {
            flex-wrap: wrap !important;
            gap: 10px 16px !important;
          }
        }

        /* ── Bottom bar defaults ── */
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-bottom-links {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }
      `}</style>
    </footer>
  );
}