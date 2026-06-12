// // // 'use client';
// // // import { useEffect, useRef, useState } from 'react';
// // // import { Menu, X, MessageCircle, ChevronDown, Phone, Globe } from 'lucide-react';

// // // const NAV_ITEMS = [
// // //   { label: 'About',        href: '#about',        sub: ['Our Story','Team','Testimonials'] },
// // //   { label: 'Destinations', href: '#destinations', sub: ['Rajasthan','Kerala','Himalayas','Goa','International'] },
// // //   { label: 'Tours',        href: '#tours',        sub: ['Group Tours','Private Tours','Luxury','Adventure','Honeymoon'] },
// // //   { label: 'Offers',       href: '#offers',       sub: ['Early Bird','Last Minute','Seasonal Deals'] },
// // // ];

// // // const SocialIcons = () => (
// // //   <div style={{ display:'flex', alignItems:'center', gap:14 }}>
// // //     {/* Instagram */}
// // //     <a href="#" aria-label="Instagram" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s, transform 0.2s' }}
// // //       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
// // //       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
// // //       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// // //         <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
// // //       </svg>
// // //     </a>
// // //     {/* Facebook */}
// // //     <a href="#" aria-label="Facebook" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s, transform 0.2s' }}
// // //       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
// // //       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
// // //       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// // //         <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
// // //       </svg>
// // //     </a>
// // //     {/* YouTube */}
// // //     <a href="#" aria-label="YouTube" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s, transform 0.2s' }}
// // //       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
// // //       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
// // //       <svg width="14" height="11" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// // //         <path d="M22.54 3.57A2.78 2.78 0 0 0 20.59 1.6C18.88 1.12 12 1.12 12 1.12s-6.88 0-8.59.48A2.78 2.78 0 0 0 1.46 3.57 29 29 0 0 0 1 9a29 29 0 0 0 .46 5.43A2.78 2.78 0 0 0 3.41 16.4C5.12 16.88 12 16.88 12 16.88s6.88 0 8.59-.48a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 9a29 29 0 0 0-.46-5.43z"/>
// // //         <polygon points="9.75 12.02 15.5 9 9.75 5.98 9.75 12.02" fill="currentColor" stroke="none"/>
// // //       </svg>
// // //     </a>
// // //   </div>
// // // );

// // // export default function Navbar() {
// // //   const sentinelRef  = useRef<HTMLDivElement>(null);
// // //   const [sticky,     setSticky]     = useState(false);
// // //   const [mobileOpen, setMobileOpen] = useState(false);
// // //   const [dropdown,   setDropdown]   = useState<string|null>(null);

// // //   useEffect(() => {
// // //     const el = sentinelRef.current;
// // //     if (!el) return;
// // //     const obs = new IntersectionObserver(
// // //       ([e]) => setSticky(!e.isIntersecting),
// // //       { threshold: 0 }
// // //     );
// // //     obs.observe(el);
// // //     return () => obs.disconnect();
// // //   }, []);

// // //   return (
// // //     <>
// // //       <div ref={sentinelRef} style={{ position:'absolute', top:'100vh', left:0, width:1, height:1, pointerEvents:'none' }}/>

// // //       <header
// // //         style={{
// // //           position: sticky ? 'fixed' : 'absolute',
// // //           top:0, left:0, right:0, zIndex:100,
// // //           transition:'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
// // //         }}
// // //         className={sticky ? 'nav-glass' : ''}
// // //       >
// // //         {/* ── TOP BAR ── */}
// // //         <div style={{
// // //           maxHeight: sticky ? 0 : 38,
// // //           opacity: sticky ? 0 : 1,
// // //           overflow:'hidden',
// // //           transition:'max-height 0.4s ease, opacity 0.3s ease',
// // //           borderBottom:'1px solid rgba(201,168,76,0.08)',
// // //         }}>
// // //           <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 40px',height:38 }}>
// // //             <a href="tel:+919999999999" style={{ display:'flex',alignItems:'center',gap:6,color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif',textDecoration:'none',transition:'color 0.2s' }}
// // //               onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color='#c9a84c')}
// // //               onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.5)')}>
// // //               <Phone size={11}/> +91 99999 99999
// // //             </a>
// // //             <span style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:13,color:'rgba(201,168,76,0.6)' }}>
// // //               Crafting journeys, not just itineraries
// // //             </span>
// // //             <div style={{ display:'flex',alignItems:'center',gap:20 }}>
// // //               <button style={{ display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif' }}>
// // //                 <Globe size={11}/> English (IN) <ChevronDown size={9}/>
// // //               </button>
// // //               <SocialIcons/>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ── MAIN NAV ── */}
// // //         <div style={{
// // //           display:'flex', alignItems:'center', justifyContent:'space-between',
// // //           padding: sticky ? '12px 40px' : '16px 40px',
// // //           transition:'padding 0.4s ease',
// // //         }}>
// // //           <a href="/" style={{ display:'flex',alignItems:'center',gap:12,textDecoration:'none' }}>
// // //             <div style={{
// // //               width: sticky ? 36 : 42, height: sticky ? 36 : 42,
// // //               borderRadius:'50%',
// // //               background:'linear-gradient(135deg,#c9a84c,#8b6914)',
// // //               display:'flex',alignItems:'center',justifyContent:'center',
// // //               boxShadow:'0 0 18px rgba(201,168,76,0.28)',
// // //               transition:'all 0.4s ease', flexShrink:0,
// // //             }}>
// // //               <span style={{ fontFamily:'Playfair Display,serif',fontWeight:800,color:'#0c0a08',fontSize: sticky ? 15 : 18 }}>K</span>
// // //             </div>
// // //             <div>
// // //               <div style={{ fontFamily:'Playfair Display,serif',fontWeight:700,color:'#c9a84c',fontSize: sticky ? 19 : 23,letterSpacing:'0.07em',lineHeight:1 }}>
// // //                 KAFIRA
// // //               </div>
// // //               {!sticky && (
// // //                 <div style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:11,color:'rgba(201,168,76,0.55)',letterSpacing:'0.14em',marginTop:2 }}>
// // //                   travel & explore
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </a>

// // //           <nav className="hidden lg:flex" style={{ display:'flex',alignItems:'center',gap:4 }}>
// // //             {NAV_ITEMS.map(item => (
// // //               <div key={item.label} style={{ position:'relative' }}
// // //                 onMouseEnter={() => setDropdown(item.label)}
// // //                 onMouseLeave={() => setDropdown(null)}>
// // //                 <a
// // //                   href={item.href}
// // //                   className="underline-hover"
// // //                   style={{
// // //                     display:'flex',alignItems:'center',gap:4,
// // //                     padding:'8px 14px', borderRadius:999,
// // //                     fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:500,
// // //                     color: dropdown === item.label ? '#c9a84c' : 'rgba(245,240,232,0.82)',
// // //                     textDecoration:'none', transition:'color 0.25s', letterSpacing:'0.015em',
// // //                   }}
// // //                 >
// // //                   {item.label}
// // //                   <ChevronDown size={12} style={{ transition:'transform 0.25s', transform: dropdown === item.label ? 'rotate(180deg)' : 'none' }}/>
// // //                 </a>
// // //                 <div style={{
// // //                   position:'absolute', top:'100%', left:0, paddingTop:8,
// // //                   opacity: dropdown === item.label ? 1 : 0,
// // //                   transform: dropdown === item.label ? 'translateY(0)' : 'translateY(-8px)',
// // //                   pointerEvents: dropdown === item.label ? 'all' : 'none',
// // //                   transition:'all 0.25s ease', minWidth:160, zIndex:200,
// // //                 }}>
// // //                   <div style={{
// // //                     background:'rgba(14,12,10,0.96)',
// // //                     border:'1px solid rgba(201,168,76,0.18)',
// // //                     borderRadius:14, padding:'8px 0',
// // //                     backdropFilter:'blur(24px)',
// // //                     boxShadow:'0 20px 60px rgba(0,0,0,0.55)',
// // //                   }}>
// // //                     {item.sub.map(s => (
// // //                       <a key={s} href="#" style={{
// // //                         display:'block',padding:'9px 18px',
// // //                         fontFamily:'Outfit,sans-serif',fontSize:13,
// // //                         color:'rgba(245,240,232,0.65)',textDecoration:'none',
// // //                         transition:'all 0.2s',
// // //                       }}
// // //                         onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='#c9a84c';el.style.paddingLeft='24px';el.style.background='rgba(201,168,76,0.05)'}}
// // //                         onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='rgba(245,240,232,0.65)';el.style.paddingLeft='18px';el.style.background='none'}}
// // //                       >{s}</a>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </nav>

// // //           <div className="hidden lg:flex items-center gap-3">
// // //             <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
// // //               style={{
// // //                 display:'flex',alignItems:'center',gap:7,
// // //                 padding:'8px 18px', borderRadius:999,
// // //                 background:'rgba(37,211,102,0.1)',
// // //                 border:'1px solid rgba(37,211,102,0.28)',
// // //                 color:'#25d366',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:500,
// // //                 textDecoration:'none',transition:'all 0.25s',
// // //               }}
// // //               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.2)';el.style.transform='translateY(-2px)'}}
// // //               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.1)';el.style.transform='none'}}
// // //             >
// // //               <MessageCircle size={14}/> WhatsApp Us
// // //             </a>
// // //             <a href="#tours"
// // //               style={{
// // //                 padding:'8px 20px', borderRadius:999,
// // //                 background:'linear-gradient(135deg,#c9a84c,#8b6914)',
// // //                 color:'#0c0a08',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:600,
// // //                 textDecoration:'none',letterSpacing:'0.03em',transition:'all 0.25s',
// // //               }}
// // //               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 8px 22px rgba(201,168,76,0.35)'}}
// // //               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='none';el.style.boxShadow='none'}}
// // //             >Plan a Trip</a>
// // //           </div>

// // //           <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden"
// // //             style={{ background:'rgba(201,168,76,0.1)',border:'none',borderRadius:10,padding:9,cursor:'pointer',color:'#c9a84c',transition:'background 0.2s' }}>
// // //             {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
// // //           </button>
// // //         </div>

// // //         {/* Mobile drawer */}
// // //         <div style={{
// // //           maxHeight: mobileOpen ? 420 : 0, opacity: mobileOpen ? 1 : 0,
// // //           overflow:'hidden', transition:'max-height 0.45s ease, opacity 0.35s ease',
// // //           background:'rgba(10,8,6,0.97)',
// // //         }} className="lg:hidden">
// // //           <div style={{ padding:'8px 24px 24px' }}>
// // //             {NAV_ITEMS.map(item => (
// // //               <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
// // //                 style={{
// // //                   display:'block',padding:'13px 0',
// // //                   fontFamily:'Outfit,sans-serif',fontSize:15,fontWeight:500,
// // //                   color:'rgba(245,240,232,0.8)',textDecoration:'none',
// // //                   borderBottom:'1px solid rgba(201,168,76,0.08)',transition:'color 0.2s',
// // //                 }}>{item.label}</a>
// // //             ))}
// // //             <a href="https://wa.me/919999999999"
// // //               style={{
// // //                 display:'flex',alignItems:'center',gap:8,
// // //                 marginTop:16,padding:'12px 18px',borderRadius:12,
// // //                 background:'rgba(37,211,102,0.1)',
// // //                 border:'1px solid rgba(37,211,102,0.25)',
// // //                 color:'#25d366',fontFamily:'Outfit,sans-serif',fontSize:14,textDecoration:'none',
// // //               }}>
// // //               <MessageCircle size={16}/> WhatsApp Us
// // //             </a>
// // //           </div>
// // //         </div>
// // //       </header>
// // //     </>
// // //   );
// // // }








// // 'use client';
// // import { useEffect, useRef, useState } from 'react';
// // import { Menu, X, MessageCircle, ChevronDown, Phone, Globe } from 'lucide-react';
// // import Image from 'next/image';

// // const NAV_ITEMS = [
// //   { label: 'About',        href: '#about',        sub: ['Our Story','Team','Testimonials'] },
// //   { label: 'Destinations', href: '#upcoming-trips', sub: ['Rajasthan','Kerala','Himalayas','Goa','International'] },
// //   { label: 'Tours',        href: '#tours',        sub: ['Group Tours','Private Tours','Luxury','Adventure','Honeymoon'] },
// //   // { label: 'Offers',       href: '#offers',       sub: ['Early Bird','Last Minute','Seasonal Deals'] },
// // ];

// // const SocialIcons = ({ size = 13 }: { size?: number }) => (
// //   <div style={{ display:'flex', alignItems:'center', gap:14 }}>
// //     <a href="#" aria-label="Instagram" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s,transform 0.2s', display:'flex' }}
// //       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
// //       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
// //       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
// //       </svg>
// //     </a>
// //     <a href="#" aria-label="Facebook" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s,transform 0.2s', display:'flex' }}
// //       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
// //       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
// //       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
// //       </svg>
// //     </a>
// //     <a href="#" aria-label="YouTube" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s,transform 0.2s', display:'flex' }}
// //       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
// //       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
// //       <svg width={size + 1} height={size - 2} viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M22.54 3.57A2.78 2.78 0 0 0 20.59 1.6C18.88 1.12 12 1.12 12 1.12s-6.88 0-8.59.48A2.78 2.78 0 0 0 1.46 3.57 29 29 0 0 0 1 9a29 29 0 0 0 .46 5.43A2.78 2.78 0 0 0 3.41 16.4C5.12 16.88 12 16.88 12 16.88s6.88 0 8.59-.48a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 9a29 29 0 0 0-.46-5.43z"/>
// //         <polygon points="9.75 12.02 15.5 9 9.75 5.98 9.75 12.02" fill="currentColor" stroke="none"/>
// //       </svg>
// //     </a>
// //   </div>
// // );

// // export default function Navbar() {
// //   const sentinelRef  = useRef<HTMLDivElement>(null);
// //   const [sticky,     setSticky]     = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [dropdown,   setDropdown]   = useState<string|null>(null);
// //   const [openSub,    setOpenSub]    = useState<string|null>(null); // mobile accordion

// //   useEffect(() => {
// //     const el = sentinelRef.current;
// //     if (!el) return;
// //     const obs = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting), { threshold:0 });
// //     obs.observe(el);
// //     return () => obs.disconnect();
// //   }, []);

// //   // close drawer on resize to desktop
// //   useEffect(() => {
// //     const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
// //     window.addEventListener('resize', onResize);
// //     return () => window.removeEventListener('resize', onResize);
// //   }, []);

// //   return (
// //     <>
// //       <div ref={sentinelRef} style={{ position:'absolute', top:0, left:0, width:1, height:1, pointerEvents:'none' }}/>

// //       <header
// //         style={{
// //           position: sticky ? 'fixed' : 'absolute',
// //           top:0, left:0, right:0, zIndex:100,
// //           transition:'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
// //           background: sticky ? 'rgba(8, 6, 4, 0.78)' : 'transparent',
// //           backdropFilter: sticky ? 'blur(16px)' : 'none',
// //           borderBottom: sticky ? '1px solid rgba(255,255,255,0.08)' : 'none',
// //           boxShadow: sticky ? '0 20px 60px rgba(0,0,0,0.22)' : 'none',
// //         }}
// //         className={sticky ? 'nav-glass' : ''}
// //       >
// //         {/* ══ TOP BAR — desktop only, hidden on mobile ══ */}
// //         <div style={{
// //           maxHeight: sticky ? 0 : 36,
// //           opacity: sticky ? 0 : 1,
// //           overflow:'hidden',
// //           transition:'max-height 0.4s ease, opacity 0.3s ease',
// //           borderBottom:'1px solid rgba(201,168,76,0.08)',
// //         }} className="hidden md:block">
// //           <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 32px',height:36 }}>
// //             <a href="tel:+919999999999" style={{ display:'flex',alignItems:'center',gap:5,color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif',textDecoration:'none',transition:'color 0.2s' }}
// //               onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color='#c9a84c')}
// //               onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.5)')}>
// //               <Phone size={11}/> +91 99999 99999
// //             </a>
// //             <span style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:13,color:'rgba(201,168,76,0.55)' }}>
// //               Crafting journeys, not just itineraries
// //             </span>
// //             <div style={{ display:'flex',alignItems:'center',gap:18 }}>
// //               <button style={{ display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif' }}>
// //                 <Globe size={11}/> EN (IN) <ChevronDown size={9}/>
// //               </button>
// //               <SocialIcons size={13}/>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ══ MAIN NAV ══ */}
// //         <div style={{
// //           display:'flex', alignItems:'center', justifyContent:'space-between',
// //           padding: sticky ? '10px 24px' : '14px 24px',
// //           transition:'padding 0.4s ease',
// //         }}>

// //           {/* Logo */}
// //           <a href="/" style={{ display:'flex',alignItems:'center' }}>
// //             {/* <div style={{
// //               width: sticky ? 34 : 40, height: sticky ? 34 : 40,
// //               borderRadius:'50%',
// //               background:'linear-gradient(135deg,#c9a84c,#8b6914)',
// //               display:'flex',alignItems:'center',justifyContent:'center',
// //               boxShadow:'0 0 16px rgba(201,168,76,0.25)',
// //               transition:'all 0.4s ease', flexShrink:0,
// //             }}> */}
// //               {/* <span style={{ fontFamily:'Playfair Display,serif',fontWeight:800,color:'#0c0a08',fontSize: sticky ? 14 : 17 }}>K</span>
// //             </div>
// //             <div>
// //               <div style={{ fontFamily:'Playfair Display,serif',fontWeight:700,color:'#c9a84c',fontSize: sticky ? 18 : 22,letterSpacing:'0.07em',lineHeight:1 }}>
// //                 KAFIRA
// //               </div>
// //               {!sticky && (
// //                 <div style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:10,color:'rgba(201,168,76,0.5)',letterSpacing:'0.14em',marginTop:2 }}>
// //                   travel & explore
// //                 </div>
// //               )} */}

// //               <Image src="/logo.png" alt="kafira logo" width={110} height={110}/>
// //             {/* </div> */}
// //           </a>

// //           {/* Desktop nav links */}
// //           <nav className="hidden lg:flex" style={{ alignItems:'center',gap:2 }}>
// //             {NAV_ITEMS.map(item => (
// //               <div key={item.label} style={{ position:'relative' }}
// //                 onMouseEnter={() => setDropdown(item.label)}
// //                 onMouseLeave={() => setDropdown(null)}>
// //                 <a href={item.href} className="underline-hover" style={{
// //                   display:'flex',alignItems:'center',gap:4,padding:'7px 12px',borderRadius:999,
// //                   fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:500,
// //                   color: dropdown === item.label ? '#c9a84c' : 'rgba(245,240,232,0.82)',
// //                   textDecoration:'none',transition:'color 0.25s',letterSpacing:'0.015em',
// //                 }}>
// //                   {item.label}
// //                   <ChevronDown size={11} style={{ transition:'transform 0.25s', transform: dropdown===item.label?'rotate(180deg)':'none' }}/>
// //                 </a>
// //                 {/* Dropdown */}
// //                 <div style={{
// //                   position:'absolute',top:'100%',left:0,paddingTop:6,
// //                   opacity: dropdown===item.label?1:0,
// //                   transform: dropdown===item.label?'translateY(0)':'translateY(-8px)',
// //                   pointerEvents: dropdown===item.label?'all':'none',
// //                   transition:'all 0.25s ease',minWidth:155,zIndex:200,
// //                 }}>
// //                   <div style={{ background:'rgba(14,12,10,0.96)',border:'1px solid rgba(201,168,76,0.18)',borderRadius:13,padding:'7px 0',backdropFilter:'blur(24px)',boxShadow:'0 20px 60px rgba(0,0,0,0.55)' }}>
// //                     {item.sub.map(s => (
// //                       <a key={s} href="#" style={{ display:'block',padding:'8px 16px',fontFamily:'Outfit,sans-serif',fontSize:12,color:'rgba(245,240,232,0.65)',textDecoration:'none',transition:'all 0.2s' }}
// //                         onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='#c9a84c';el.style.paddingLeft='22px';el.style.background='rgba(201,168,76,0.05)'}}
// //                         onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='rgba(245,240,232,0.65)';el.style.paddingLeft='16px';el.style.background='none'}}
// //                       >{s}</a>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </nav>

// //           {/* Desktop CTAs */}
// //           <div className="hidden lg:flex items-center" style={{ gap:10 }}>
// //             <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
// //               style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 16px',borderRadius:999,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.28)',color:'#25d366',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:500,textDecoration:'none',transition:'all 0.25s' }}
// //               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.2)';el.style.transform='translateY(-2px)'}}
// //               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.1)';el.style.transform='none'}}
// //             >
// //               <MessageCircle size={13}/> WhatsApp Us
// //             </a>
// //             <a href="#tours"
// //               style={{ padding:'7px 18px',borderRadius:999,background:'linear-gradient(135deg,#c9a84c,#8b6914)',color:'#0c0a08',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,textDecoration:'none',letterSpacing:'0.03em',transition:'all 0.25s' }}
// //               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 8px 22px rgba(201,168,76,0.35)'}}
// //               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='none';el.style.boxShadow='none'}}
// //             >Plan a Trip</a>
// //           </div>

// //           {/* Mobile right side: WhatsApp icon + hamburger */}
// //           <div className="flex lg:hidden items-center" style={{ gap:8 }}>
// //             <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
// //               style={{ display:'flex',alignItems:'center',justifyContent:'center',width:36,height:36,borderRadius:10,background:'rgba(37,211,102,0.12)',border:'1px solid rgba(37,211,102,0.25)',color:'#25d366',flexShrink:0 }}>
// //               <MessageCircle size={16}/>
// //             </a>
// //             <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
// //               style={{ background:'rgba(201,168,76,0.1)',border:'none',borderRadius:10,padding:8,cursor:'pointer',color:'#c9a84c',display:'flex',alignItems:'center',justifyContent:'center' }}>
// //               {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
// //             </button>
// //           </div>
// //         </div>

// //         {/* ══ MOBILE FULL-SCREEN DRAWER ══ */}
// //         <div style={{
// //           maxHeight: mobileOpen ? '100vh' : 0,
// //           opacity: mobileOpen ? 1 : 0,
// //           overflow:'hidden',
// //           transition:'max-height 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease',
// //           background:'rgba(8,6,4,0.98)',
// //           backdropFilter:'blur(24px)',
// //         }} className="lg:hidden">
// //           <div style={{ padding:'16px 24px 32px' }}>

// //             {/* Nav items with accordion sub-items */}
// //             {NAV_ITEMS.map((item, i) => (
// //               <div key={item.label} style={{ borderBottom:'1px solid rgba(201,168,76,0.07)' }}>
// //                 <button
// //                   onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
// //                   style={{
// //                     display:'flex',alignItems:'center',justifyContent:'space-between',
// //                     width:'100%', padding:'14px 0', background:'none', border:'none', cursor:'pointer',
// //                     fontFamily:'Outfit,sans-serif',fontSize:15,fontWeight:500,
// //                     color: openSub===item.label ? '#c9a84c' : 'rgba(245,240,232,0.82)',
// //                     transition:'color 0.2s',
// //                     textAlign:'left',
// //                   }}
// //                 >
// //                   <a href={item.href} onClick={() => setMobileOpen(false)} style={{ textDecoration:'none',color:'inherit',flex:1 }}>
// //                     {item.label}
// //                   </a>
// //                   <ChevronDown size={14} style={{ color:'rgba(201,168,76,0.5)',transition:'transform 0.3s',transform: openSub===item.label?'rotate(180deg)':'none',flexShrink:0 }}/>
// //                 </button>

// //                 {/* sub-items accordion */}
// //                 <div style={{
// //                   maxHeight: openSub===item.label ? '200px' : 0,
// //                   opacity: openSub===item.label ? 1 : 0,
// //                   overflow:'hidden',
// //                   transition:'max-height 0.35s ease, opacity 0.3s ease',
// //                 }}>
// //                   <div style={{ paddingBottom:10, paddingLeft:12, display:'flex', flexWrap:'wrap', gap:6 }}>
// //                     {item.sub.map(s => (
// //                       <a key={s} href="#" onClick={() => setMobileOpen(false)}
// //                         style={{ padding:'5px 12px',borderRadius:999,fontSize:12,fontFamily:'Outfit,sans-serif',color:'rgba(201,168,76,0.7)',background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.12)',textDecoration:'none',transition:'all 0.2s' }}
// //                         onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background='rgba(201,168,76,0.15)'}}
// //                         onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background='rgba(201,168,76,0.07)'}}
// //                       >{s}</a>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}

// //             {/* Plan a Trip CTA */}
// //             <a href="#tours" onClick={() => setMobileOpen(false)}
// //               style={{ display:'block',marginTop:20,padding:'14px',borderRadius:14,background:'linear-gradient(135deg,#c9a84c,#8b6914)',color:'#0c0a08',fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center',letterSpacing:'0.04em' }}>
// //               Plan a Trip
// //             </a>

// //             {/* Bottom: phone + social */}
// //             <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:20,paddingTop:16,borderTop:'1px solid rgba(201,168,76,0.08)' }}>
// //               <a href="tel:+919999999999" style={{ display:'flex',alignItems:'center',gap:6,color:'rgba(245,240,232,0.45)',fontSize:12,fontFamily:'Outfit,sans-serif',textDecoration:'none' }}>
// //                 <Phone size={12}/> +91 99999 99999
// //               </a>
// //               <SocialIcons size={15}/>
// //             </div>
// //           </div>
// //         </div>
// //       </header>
// //     </>
// //   );
// // }






// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { Menu, X, MessageCircle, Phone, Globe, ChevronDown } from 'lucide-react';
// import Image from 'next/image';

// // ── seagreen palette ──────────────────────────────────
// const SG = {
//   sg:     '#2e8b6e',
//   sgDk:   '#1a5c49',
//   sgGrad: 'linear-gradient(135deg,#2e8b6e,#1a5c49)',
//   sgBg:   'rgba(46,139,110,0.12)',
//   sgBd:   'rgba(46,139,110,0.3)',
// };

// const NAV_ITEMS = [
//   { label: 'About',        href: '/about'        },
//   { label: 'Destinations', href: '/destinations'},
//   { label: 'Tours',        href: '/tours'    },
//   { label: 'FAQ',          href: '/#faq'          },
//   {label : 'Contact',       href: '/contact'      },
// ];

// // ── Social icons ──────────────────────────────────────
// const SocialIcons = ({ size = 14, col = 'rgba(245,240,232,0.45)' }: { size?: number; col?: string }) => (
//   <div style={{ display:'flex', alignItems:'center', gap:14 }}>
//     {/* Instagram */}
//     <a href="https://www.instagram.com/kafira.travels/" aria-label="Instagram"
//       style={{ color:col, transition:'color 0.2s,transform 0.2s', display:'flex' }}
//       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color=SG.sg;(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';}}
//       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color=col;(e.currentTarget as HTMLAnchorElement).style.transform='none';}}>
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
//       </svg>
//     </a>
//     {/* Facebook */}
//     <a href="https://www.facebook.com/profile.php?id=61572079204139" aria-label="Facebook"
//       style={{ color:col, transition:'color 0.2s,transform 0.2s', display:'flex' }}
//       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color=SG.sg;(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';}}
//       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color=col;(e.currentTarget as HTMLAnchorElement).style.transform='none';}}>
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
//       </svg>
//     </a>
//     {/* YouTube */}
//     <a href="#" aria-label="YouTube"
//       style={{ color:col, transition:'color 0.2s,transform 0.2s', display:'flex' }}
//       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color=SG.sg;(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)';}}
//       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color=col;(e.currentTarget as HTMLAnchorElement).style.transform='none';}}>
//       <svg width={size+1} height={size-2} viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M22.54 3.57A2.78 2.78 0 0 0 20.59 1.6C18.88 1.12 12 1.12 12 1.12s-6.88 0-8.59.48A2.78 2.78 0 0 0 1.46 3.57 29 29 0 0 0 1 9a29 29 0 0 0 .46 5.43A2.78 2.78 0 0 0 3.41 16.4C5.12 16.88 12 16.88 12 16.88s6.88 0 8.59-.48a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 9a29 29 0 0 0-.46-5.43z"/>
//         <polygon points="9.75 12.02 15.5 9 9.75 5.98 9.75 12.02" fill="currentColor" stroke="none"/>
//       </svg>
//     </a>
//   </div>
// );

// export default function Navbar() {
//   const sentinelRef = useRef<HTMLDivElement>(null);
//   const [sticky,     setSticky]     = useState(false);
//   const [scrolled,   setScrolled]   = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [openSub,    setOpenSub]    = useState<string|null>(null);
//   const [hovered,    setHovered]    = useState<string|null>(null);

//   useEffect(() => {
//     const el = sentinelRef.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => setSticky(!e.isIntersecting),
//       { threshold: 0 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   // when sticky: seagreen-tinted glass
//   // when not sticky: transparent over hero
//   const bgStyle = sticky
//     ? {
//         background: 'rgba(8,20,16,0.88)',
//         backdropFilter: 'blur(22px)',
//         WebkitBackdropFilter: 'blur(22px)',
//         borderBottom: `1px solid ${SG.sgBd}`,
//         boxShadow: `0 8px 40px rgba(0,0,0,0.28), 0 0 0 1px rgba(46,139,110,0.08) inset`,
//       }
//     : {
//         background: 'transparent',
//         backdropFilter: 'none',
//         borderBottom: 'none',
//         boxShadow: 'none',
//       };

//   return (
//     <>
//       {/* sentinel placed exactly at top:0 — triggers sticky on any scroll */}
//       <div ref={sentinelRef} style={{ position:'absolute', top:0, left:0, width:1, height:1, pointerEvents:'none' }}/>

//       <header
//         style={{
//           position: 'fixed',
//           top: 0, left: 0, right: 0,
//           zIndex: 100,
//           transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
//           ...bgStyle,
//         }}
//       >
//         {/* ══ TOP BAR — only when not scrolled, desktop only ══ */}
//         <div
//           className="hidden md:block"
//           style={{
//             maxHeight: scrolled ? 0 : 46,
//             opacity: scrolled ? 0 : 1,
//             overflow: 'hidden',
//             transition: 'max-height 0.4s ease, opacity 0.3s ease',
//             borderBottom: '1px solid rgba(46,139,110,0.12)',
//           }}
//         >
//           <div style={{
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             padding: '0 40px', height: 46,
//           }}>
//             <a href="tel:+919253289347" style={{
//               display:'flex', alignItems:'center', gap:5,
//               color:'rgba(245,240,232,0.5)', fontSize:11,
//               fontFamily:'Outfit,sans-serif', textDecoration:'none',
//               transition:'color 0.2s',
//             }}
//               onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color=SG.sg)}
//               onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.5)')}
//             >
//               <Phone size={11}/> +91 92532 89347
//             </a>

//             <span style={{
//               fontFamily:'Cormorant Garamond,serif', fontStyle:'italic',
//               fontSize:13, color:'rgba(46,139,110,0.7)',
//             }}>
//               Crafting journeys, not just itineraries
//             </span>

//             <div style={{ display:'flex', alignItems:'center', gap:18 }}>
//               <button style={{
//                 display:'flex', alignItems:'center', gap:4,
//                 background:'none', border:'none', cursor:'pointer',
//                 color:'rgba(245,240,232,0.5)', fontSize:11, fontFamily:'Outfit,sans-serif',
//               }}>
//                 <Globe size={11}/> EN (IN) <ChevronDown size={9}/>
//               </button>
//               <SocialIcons size={13}/>
//             </div>
//           </div>
//         </div>

//         {/* ══ MAIN NAV ══ */}
//         <div style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           padding: scrolled ? '18px 40px' : '16px 40px',
//           transition: 'padding 0.4s ease',
//         }}>

//           {/* ── Logo ── */}
//           <a href="/" style={{ display:'flex', alignItems:'center', textDecoration:'none', flexShrink:0 }}>
//             <Image
//               src="/logo.png"
//               alt="Kafira"
//               width={scrolled ? 120 : 110}
//               height={scrolled ? 120 : 110}
//               style={{ objectFit:'contain', display:'block', transition:'width 0.4s ease, height 0.4s ease' }}
//             />
//           </a>

//           {/* ── Desktop nav links — NO dropdowns ── */}
//           <nav className="hidden lg:flex" style={{ alignItems:'center', gap:6 }}>
//             {NAV_ITEMS.map(item => (
//               <a
//                 key={item.label}
//                 href={item.href}
//                 onMouseEnter={() => setHovered(item.label)}
//                 onMouseLeave={() => setHovered(null)}
//                 style={{
//                   position: 'relative',
//                   padding: '9px 18px',
//                   borderRadius: 999,
//                   fontFamily: 'Outfit,sans-serif',
//                   fontSize: 15,           // larger than before (was 13)
//                   fontWeight: 600,        // bolder
//                   letterSpacing: '0.02em',
//                   textDecoration: 'none',
//                   color: hovered === item.label ? SG.sg : 'rgba(245,240,232,0.88)',
//                   transition: 'color 0.25s, background 0.25s',
//                   background: hovered === item.label
//                     ? 'rgba(46,139,110,0.1)'
//                     : 'transparent',
//                 }}
//               >
//                 {item.label}
//                 {/* seagreen underline on hover */}
//                 <span style={{
//                   position: 'absolute',
//                   bottom: 4, left: '50%',
//                   transform: 'translateX(-50%)',
//                   height: 2, borderRadius: 1,
//                   background: SG.sg,
//                   width: hovered === item.label ? '60%' : 0,
//                   transition: 'width 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
//                   display: 'block',
//                 }}/>
//               </a>
//             ))}
//           </nav>

//           {/* ── Desktop CTAs ── */}
//           <div className="hidden lg:flex items-center" style={{ gap:10 }}>
//             <a
//               href="https://wa.me/919253289347"
//               target="_blank" rel="noopener noreferrer"
//               style={{
//                 display:'flex', alignItems:'center', gap:7,
//                 padding:'9px 20px', borderRadius:999,
//                 background:'rgba(37,211,102,0.1)',
//                 border:'1px solid rgba(37,211,102,0.28)',
//                 color:'#25d366',
//                 fontFamily:'Outfit,sans-serif', fontSize:13, fontWeight:500,
//                 textDecoration:'none', transition:'all 0.25s',
//               }}
//               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.2)';el.style.transform='translateY(-2px)';}}
//               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.1)';el.style.transform='none';}}
//             >
//               <MessageCircle size={14}/> WhatsApp Us
//             </a>

//             <a
//               href="/contact"
//               style={{
//                 padding:'9px 22px', borderRadius:999,
//                 background: SG.sgGrad,
//                 color:'#fff',
//                 fontFamily:'Outfit,sans-serif', fontSize:13, fontWeight:700,
//                 textDecoration:'none', letterSpacing:'0.03em',
//                 transition:'all 0.25s',
//                 boxShadow:'0 4px 16px rgba(46,139,110,0.28)',
//               }}
//               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 8px 24px rgba(46,139,110,0.42)';}}
//               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='none';el.style.boxShadow='0 4px 16px rgba(46,139,110,0.28)';}}
//             >
//               Plan a Trip
//             </a>
//           </div>

//           {/* ── Mobile: WA icon + hamburger ── */}
//           <div className="flex lg:hidden items-center" style={{ gap:8 }}>
//             <a
//               href="https://wa.me/919253289347"
//               target="_blank" rel="noopener noreferrer"
//               aria-label="WhatsApp"
//               style={{
//                 display:'flex', alignItems:'center', justifyContent:'center',
//                 width:38, height:38, borderRadius:10,
//                 background:'rgba(37,211,102,0.12)',
//                 border:'1px solid rgba(37,211,102,0.25)',
//                 color:'#25d366', flexShrink:0,
//               }}
//             >
//               <MessageCircle size={16}/>
//             </a>
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               aria-label="Toggle menu"
//               style={{
//                 background: SG.sgBg, border:`1px solid ${SG.sgBd}`,
//                 borderRadius:10, padding:8,
//                 cursor:'pointer', color:SG.sg,
//                 display:'flex', alignItems:'center', justifyContent:'center',
//                 transition:'all 0.2s',
//               }}
//             >
//               {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
//             </button>
//           </div>
//         </div>

//         {/* ══ MOBILE DRAWER ══ */}
//         <div
//           className="lg:hidden"
//           style={{
//             maxHeight: mobileOpen ? '100vh' : 0,
//             opacity: mobileOpen ? 1 : 0,
//             overflow: 'hidden',
//             transition: 'max-height 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease',
//             background: 'rgba(6,16,12,0.98)',
//             backdropFilter: 'blur(24px)',
//             borderTop: `1px solid ${SG.sgBd}`,
//           }}
//         >
//           <div style={{ padding:'12px 24px 32px' }}>
//             {/* Nav items — flat, no accordion since no dropdowns */}
//             {NAV_ITEMS.map(item => (
//               <a
//                 key={item.label}
//                 href={item.href}
//                 onClick={() => setMobileOpen(false)}
//                 style={{
//                   display:'flex', alignItems:'center', justifyContent:'space-between',
//                   padding:'15px 0',
//                   fontFamily:'Outfit,sans-serif', fontSize:16, fontWeight:600,
//                   color:'rgba(245,240,232,0.85)', textDecoration:'none',
//                   borderBottom:`1px solid rgba(46,139,110,0.1)`,
//                   transition:'color 0.2s, padding-left 0.2s',
//                 }}
//                 onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color=SG.sg;el.style.paddingLeft='8px';}}
//                 onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='rgba(245,240,232,0.85)';el.style.paddingLeft='0';}}
//               >
//                 {item.label}
//                 <span style={{ fontSize:18, color:`${SG.sg}60` }}>›</span>
//               </a>
//             ))}

//             {/* Plan a Trip CTA */}
//             <a
//               href="#upcoming-trips"
//               onClick={() => setMobileOpen(false)}
//               style={{
//                 display:'block', marginTop:20, padding:'15px',
//                 borderRadius:14, background:SG.sgGrad,
//                 color:'#fff', fontFamily:'Outfit,sans-serif',
//                 fontSize:15, fontWeight:700, textDecoration:'none',
//                 textAlign:'center', letterSpacing:'0.04em',
//                 boxShadow:'0 6px 20px rgba(46,139,110,0.35)',
//               }}
//             >
//               Plan a Trip
//             </a>

//             {/* Bottom: phone + social */}
//             <div style={{
//               display:'flex', alignItems:'center', justifyContent:'space-between',
//               marginTop:22, paddingTop:18,
//               borderTop:`1px solid rgba(46,139,110,0.1)`,
//             }}>
//               <a href="tel:+919253289347" style={{
//                 display:'flex', alignItems:'center', gap:6,
//                 color:'rgba(245,240,232,0.45)', fontSize:12,
//                 fontFamily:'Outfit,sans-serif', textDecoration:'none',
//               }}>
//                 <Phone size={12}/> +91 92532 89347
//               </a>
//               <SocialIcons size={16}/>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }






'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, ChevronDown, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import DESTINATIONS, { getDestinationsByRegion } from '../data/destinations';
import TRIPS from '../data/trips';
// import { sizeInBytes } from 'pdf-lib';

// ── Palette ────────────────────────────────────────────
const SEA    = '#2d8f7b';
const SEA_DK = '#1a6b58';
const SEA_LT = '#3db89e';

// ── Data ───────────────────────────────────────────────
const INDIA_DESTS = getDestinationsByRegion('india');
const INTL_DESTS  = getDestinationsByRegion('international');

// ── Nav items (second bar) ─────────────────────────────
type NavItem =
  | { type: 'link';     label: string; href: string }
  | { type: 'dropdown'; label: string; key: 'india' | 'international' };

const NAV_ITEMS: NavItem[] = [
  { type: 'dropdown', label: 'International Trips', key: 'international' },
  { type: 'dropdown', label: 'India Trips',         key: 'india'         },
  { type: 'link',     label: 'Weekend Getaways',      href: '/weekend-getaways' },
  { type: 'link',     label: 'Group Tours',         href: '/group-tour'    },
];

// ── Search result types ────────────────────────────────
type SearchResult =
  | { kind: 'destination'; slug: string; region: string; name: string; image: string; startingPrice: number }
  | { kind: 'trip'; id: string; destinationSlug: string; region: string; name: string; image: string; discountedPrice: number; duration: string };

// ═══════════════════════════════════════════════════════
//  Mega-menu dropdown
// ═══════════════════════════════════════════════════════
function MegaMenu({ regionKey, onClose }: { regionKey: 'india' | 'international'; onClose: () => void }) {
  const router = useRouter();
  const dests  = regionKey === 'india' ? INDIA_DESTS : INTL_DESTS;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,   scale: 1    }}
      exit={{    opacity: 0, y: -10, scale: 0.97  }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07)',
        padding: '20px 24px 22px',
        minWidth: 480,
      }}
    >
      {/* triangle */}
      <div style={{
        position: 'absolute', top: -8, left: '50%',
        transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '9px solid transparent',
        borderRight: '9px solid transparent',
        borderBottom: '9px solid #fff',
        filter: 'drop-shadow(0 -2px 2px rgba(0,0,0,0.06))',
      }}/>

      {/* label */}
      <div style={{
        fontFamily: '"Outfit",sans-serif',
        fontSize: 9, fontWeight: 700, color: SEA,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        marginBottom: 12, paddingBottom: 10,
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        {regionKey === 'india' ? 'India Destinations' : 'International Destinations'}
      </div>

      {/* 4-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px 6px' }}>
        {dests.map(d => (
          <DestItem
            key={d.slug}
            name={d.name}
            onClick={() => { router.push(`/destinations/${regionKey}/${d.slug}`); onClose(); }}
          />
        ))}
      </div>

      {/* view all */}
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          href={`/destinations/${regionKey}`}
          onClick={onClose}
          style={{ fontFamily: '"Outfit",sans-serif', fontSize: 12, fontWeight: 600, color: SEA, textDecoration: 'none' }}
        >
          View all {regionKey === 'india' ? 'India' : 'International'} destinations →
        </Link>
      </div>
    </motion.div>
  );
}

function DestItem({ name, onClick }: { name: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: '"Outfit",sans-serif',
        fontSize: 13.5, fontWeight: hov ? 600 : 400,
        color: hov ? SEA : '#2a2a2a',
        padding: '8px 10px', borderRadius: 7, cursor: 'pointer',
        background: hov ? 'rgba(45,143,123,0.07)' : 'transparent',
        transition: 'all 0.16s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  Search dropdown
// ═══════════════════════════════════════════════════════
function SearchDropdown({ query, results, onSelect }: {
  query: string;
  results: SearchResult[];
  onSelect: (r: SearchResult) => void;
}) {
  if (!query.trim()) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0  }}
      exit={{    opacity: 0, y: -6  }}
      transition={{ duration: 0.16 }}
      style={{
        position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
        background: '#fff', borderRadius: 12,
        boxShadow: '0 16px 50px rgba(0,0,0,0.13)',
        overflow: 'hidden', zIndex: 300,
        maxHeight: 360, overflowY: 'auto',
      }}
    >
      {results.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔍</div>
          <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 13, color: '#888' }}>No results for "{query}"</div>
          <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, color: '#bbb', marginTop: 3 }}>Try Himalayas, Europe, or Bali</div>
        </div>
      ) : (
        <>
          {(['destination','trip'] as const).map(kind => {
            const group = results.filter(r => r.kind === kind);
            if (!group.length) return null;
            return (
              <div key={kind} style={{ borderTop: kind === 'trip' ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                <div style={{ padding: '10px 16px 4px', fontFamily: '"Outfit",sans-serif', fontSize: 9, fontWeight: 700, color: SEA, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {kind === 'destination' ? 'Destinations' : 'Trips'}
                </div>
                {group.map((r, i) => <SearchRow key={i} result={r} onSelect={onSelect}/>)}
              </div>
            );
          })}
        </>
      )}
    </motion.div>
  );
}

function SearchRow({ result, onSelect }: { result: SearchResult; onSelect: (r: SearchResult) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(result)}
      style={{
        display: 'flex', alignItems: 'center', gap: 11,
        padding: '9px 16px', cursor: 'pointer',
        background: hov ? 'rgba(45,143,123,0.06)' : 'transparent',
        transition: 'background 0.14s',
      }}
    >
      <div style={{ width: 42, height: 38, borderRadius: 7, overflow: 'hidden', flexShrink: 0, background: '#e8efec' }}>
        <img src={result.image} alt={result.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {result.name}
        </div>
        <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 10.5, color: '#888', marginTop: 1 }}>
          {result.kind === 'destination'
            ? `${result.region === 'india' ? 'India' : 'International'} · from ₹${result.startingPrice?.toLocaleString('en-IN')}`
            : `${result.duration} · from ₹${result.discountedPrice.toLocaleString('en-IN')}`}
        </div>
      </div>
      <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 8, fontWeight: 700, color: SEA, background: 'rgba(45,143,123,0.09)', borderRadius: 999, padding: '2px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
        {result.kind}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  Second-bar nav item
// ═══════════════════════════════════════════════════════
function NavBarItem({ item, isOpen, onToggle, onClose, pathname }: {
  item: NavItem; isOpen: boolean; onToggle: () => void; onClose: () => void; pathname: string;
}) {
  const [hov, setHov] = useState(false);
  const isActive = item.type === 'link' && pathname === item.href;
  const lit = hov || isOpen || isActive;

  return (
    <div style={{ position: 'relative' }}>
      {item.type === 'link' ? (
        <Link
          href={item.href}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            display: 'flex', alignItems: 'center',
            padding: '0 16px', height: 44,
            fontFamily: '"Outfit",sans-serif',
            fontSize: 13.5, fontWeight: lit ? 700 : 500,
            color: '#fff', textDecoration: 'none',
            background: lit ? 'rgba(255,255,255,0.15)' : 'transparent',
            borderBottom: isActive ? '2.5px solid rgba(255,255,255,0.9)' : '2.5px solid transparent',
            transition: 'all 0.18s ease',
            letterSpacing: '0.01em',
          }}
        >
          {item.label}
        </Link>
      ) : (
        <>
          <button
            onClick={onToggle}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '0 16px', height: 44,
              fontFamily: '"Outfit",sans-serif',
              fontSize: 13.5, fontWeight: 500,
              color: '#fff',
              background: lit ? 'rgba(255,255,255,0.15)' : 'transparent',
              border: 'none', cursor: 'pointer',
              transition: 'background 0.18s ease',
              letterSpacing: '0.01em',
            }}
          >
            {item.label}
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.20 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ChevronDown size={14} color="rgba(255,255,255,0.85)"/>
            </motion.span>
          </button>
          <AnimatePresence>
            {isOpen && <MegaMenu regionKey={item.key} onClose={onClose}/>}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  Mobile drawer item
// ═══════════════════════════════════════════════════════
function MobileNavItem({ item, expanded, onToggle, onClose }: {
  item: NavItem; expanded: boolean; onToggle: () => void; onClose: () => void;
}) {
  const router = useRouter();
  const dests  = item.type === 'dropdown' ? (item.key === 'india' ? INDIA_DESTS : INTL_DESTS) : [];

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      {item.type === 'link' ? (
        <Link
          href={item.href}
          onClick={onClose}
          style={{
            display: 'block', padding: '15px 24px',
            fontFamily: '"Outfit",sans-serif',
            fontSize: 15, fontWeight: 600, color: '#1a1a1a',
            textDecoration: 'none',
          }}
        >
          {item.label}
        </Link>
      ) : (
        <>
          <button
            onClick={onToggle}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '15px 24px',
              fontFamily: '"Outfit",sans-serif',
              fontSize: 15, fontWeight: 600, color: '#1a1a1a',
              background: expanded ? 'rgba(45,143,123,0.04)' : 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.18s',
            }}
          >
            {item.label}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ display: 'flex' }}>
              <ChevronDown size={17} color="#666"/>
            </motion.span>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{    height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden', background: '#f7faf9' }}
              >
                <div style={{ padding: '6px 20px 14px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {dests.map(d => (
                    <button
                      key={d.slug}
                      onClick={() => { router.push(`/destinations/${item.key}/${d.slug}`); onClose(); }}
                      style={{
                        textAlign: 'left', padding: '10px 12px', borderRadius: 8,
                        fontFamily: '"Outfit",sans-serif',
                        fontSize: 14, fontWeight: 500, color: '#2a2a2a',
                        background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'background 0.14s, color 0.14s',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(45,143,123,0.08)'; el.style.color = SEA; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'none'; el.style.color = '#2a2a2a'; }}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN NAVBAR
// ═══════════════════════════════════════════════════════
export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();

  const [scrolled,      setScrolled]      = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState<'india' | 'international' | null>(null);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearch,    setShowSearch]    = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mobileExpand,  setMobileExpand]  = useState<string | null>(null);
  // track if we're on mobile via JS (avoids SSR mismatch)
  const [isMobile,      setIsMobile]      = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const dropRef   = useRef<HTMLDivElement>(null);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // close everything on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setSearchQuery('');
    setShowSearch(false);
  }, [pathname]);

  // outside-click closes
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current   && !dropRef.current.contains(e.target as Node))   setOpenDropdown(null);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  // lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // live search
  const handleSearch = useCallback((val: string) => {
    setSearchQuery(val);
    setShowSearch(true);
    if (!val.trim()) { setSearchResults([]); return; }
    const q = val.toLowerCase();

    const destResults: SearchResult[] = DESTINATIONS
      .filter(d => d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q))
      .slice(0, 4)
      .map(d => ({ kind: 'destination' as const, slug: d.slug, region: d.region, name: d.name, image: d.image, startingPrice: d.startingPrice }));

    const tripResults: SearchResult[] = TRIPS
      .filter(t => t.name.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q)) || t.state.toLowerCase().includes(q))
      .slice(0, 4)
      .map(t => ({ kind: 'trip' as const, id: t.id, destinationSlug: t.destinationSlug, region: t.region, name: t.name, image: t.image, discountedPrice: t.discountedPrice, duration: t.duration }));

    setSearchResults([...destResults, ...tripResults]);
  }, []);

  const handleSelectResult = (r: SearchResult) => {
    if (r.kind === 'destination') router.push(`/destinations/${r.region}/${r.slug}`);
    else router.push(`/destinations/${r.region}/${r.destinationSlug}`);
    setSearchQuery(''); setShowSearch(false);
  };

  // ── Render ──────────────────────────────────────────
  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 1000,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.10)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>

        {/* ══ ROW 1: white bar ══════════════════════════ */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          padding: '0 clamp(16px,3vw,40px)',
          height: 64,
          display: 'flex', alignItems: 'center', gap: 20,
        }}>

          {/* LOGO */}
          <Link href="/" style={{ flexShrink: 0, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo-3.png"
              alt="Kafira Travels"
              style={{ width: isMobile ? 80 : 94, height: isMobile ? 36 : 44, objectFit: 'cover', borderRadius: 8 }}
            />
          </Link>

          {/* SEARCH BAR */}
          <div ref={searchRef} style={{ flex: 1, maxWidth: isMobile ? 200 : 380, position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#f4f6f5',
              border: `1.5px solid ${showSearch ? SEA_LT : 'transparent'}`,
              borderRadius: 999,
              padding: '0 14px', height: 38,
              transition: 'border-color 0.22s, box-shadow 0.22s',
              boxShadow: showSearch ? `0 0 0 3px rgba(45,143,123,0.12)` : 'none',
            }}>
              <Search size={14} color={showSearch ? SEA : '#888'} style={{ flexShrink: 0 }}/>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => setShowSearch(true)}
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  fontFamily: '"Outfit",sans-serif', fontSize: 13, color: '#1a1a1a', outline: 'none',
                }}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.7 }}
                    transition={{ duration:0.14 }}
                    onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' }}
                  >
                    <X size={13} color="#aaa"/>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {showSearch && (
                <SearchDropdown query={searchQuery} results={searchResults} onSelect={handleSelectResult}/>
              )}
            </AnimatePresence>
          </div>

          {/* SPACER — pushes right-side items to the right */}
          <div style={{ flex: 1 }}/>

          {/* TOP-RIGHT LINKS — desktop only */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {(['Home', 'About Us', 'Blogs', 'Contact Us', 'Payments'] as const).map(label => {
                const href = label === 'Home' ? '/' : `/${label.toLowerCase().replace(/ /g,'-')}`;
                return (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      fontFamily: '"Outfit",sans-serif',
                      fontSize: 13, fontWeight: 500,
                      color: pathname === href ? SEA : '#2a2a2a',
                      textDecoration: 'none',
                      padding: '6px 11px', borderRadius: 8,
                      transition: 'color 0.18s, background 0.18s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = SEA; el.style.background = 'rgba(45,143,123,0.06)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = pathname === href ? SEA : '#2a2a2a'; el.style.background = 'transparent'; }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* PHONE CTA — desktop only */}
          {!isMobile && (
            <motion.a
              href="tel:+919253289347"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 999,
                background: `linear-gradient(135deg,${SEA},${SEA_DK})`,
                color: '#fff',
                fontFamily: '"Outfit",sans-serif',
                fontSize: 13, fontWeight: 700,
                textDecoration: 'none',
                boxShadow: `0 4px 14px rgba(45,143,123,0.35)`,
                flexShrink: 0, whiteSpace: 'nowrap',
              }}
            >
              <Phone size={13}/> +91 92532 89347
            </motion.a>
          )}

          {/* HAMBURGER — mobile only, always visible */}
          {isMobile && (
            <motion.button
              onClick={() => setMobileOpen(v => !v)}
              whileTap={{ scale: 0.92 }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 3, flexShrink: 0,
                borderRadius: 8,
              }}
              aria-label="Open menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{    opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={24} color="#1a1a1a"/>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{    opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={24} color="#1a1a1a"/>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>

        {/* ══ ROW 2: teal nav bar — desktop only ════════ */}
        {!isMobile && (
          <div
            ref={dropRef}
            style={{
              background: SEA,
              height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 0, position: 'relative',
            }}
          >
            {NAV_ITEMS.map(item => (
              <NavBarItem
                key={item.label}
                item={item}
                isOpen={item.type === 'dropdown' && openDropdown === item.key}
                onToggle={() => { if (item.type === 'dropdown') setOpenDropdown(p => p === item.key ? null : item.key); }}
                onClose={() => setOpenDropdown(null)}
                pathname={pathname}
              />
            ))}
          </div>
        )}
      </header>

      {/* ══ MOBILE DRAWER ══════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.42)', zIndex: 1100 }}
            />

            {/* panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{    x: '100%' }}
              transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(300px,82vw)',
                background: '#ffffff',
                zIndex: 1200,
                overflowY: 'auto',
                boxShadow: '-10px 0 48px rgba(0,0,0,0.18)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* drawer header */}
              <div style={{
                padding: '0 20px', height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,0.07)',
                flexShrink: 0,
              }}>
                <Link href="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <img src="/logo-3.png" alt="Kafira Travels" style={{ height: 32, width: 'auto', objectFit: 'contain' }}/>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center' }}
                >
                  <X size={22} color="#444"/>
                </button>
              </div>

              {/* nav items */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {NAV_ITEMS.map(item => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    expanded={mobileExpand === item.label}
                    onToggle={() => setMobileExpand(v => v === item.label ? null : item.label)}
                    onClose={() => { setMobileOpen(false); setMobileExpand(null); }}
                  />
                ))}

                {/* extra links in drawer */}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: 8 }}>
                  {(['Home', 'About Us', 'Contact Us', 'Payments'] as const).map(label => {
                    const href = label === 'Home' ? '/' : `/${label.toLowerCase().replace(/ /g,'-')}`;
                    return (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'block', padding: '14px 24px',
                          fontFamily: '"Outfit",sans-serif',
                          fontSize: 14.5, fontWeight: 500, color: '#444',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                        }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* phone CTA pinned at bottom */}
              <div style={{ padding: '16px 20px 28px', flexShrink: 0, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                <a
                  href="tel:+919253289347"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px', borderRadius: 12,
                    background: `linear-gradient(135deg,${SEA},${SEA_DK})`,
                    color: '#fff', textDecoration: 'none',
                    fontFamily: '"Outfit",sans-serif', fontSize: 14, fontWeight: 700,
                    boxShadow: `0 4px 16px rgba(45,143,123,0.35)`,
                  }}
                >
                  <Phone size={16}/> +91-9253289347
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </>
  );
}