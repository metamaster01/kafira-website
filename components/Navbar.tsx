// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { Menu, X, MessageCircle, ChevronDown, Phone, Globe } from 'lucide-react';

// const NAV_ITEMS = [
//   { label: 'About',        href: '#about',        sub: ['Our Story','Team','Testimonials'] },
//   { label: 'Destinations', href: '#destinations', sub: ['Rajasthan','Kerala','Himalayas','Goa','International'] },
//   { label: 'Tours',        href: '#tours',        sub: ['Group Tours','Private Tours','Luxury','Adventure','Honeymoon'] },
//   { label: 'Offers',       href: '#offers',       sub: ['Early Bird','Last Minute','Seasonal Deals'] },
// ];

// const SocialIcons = () => (
//   <div style={{ display:'flex', alignItems:'center', gap:14 }}>
//     {/* Instagram */}
//     <a href="#" aria-label="Instagram" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s, transform 0.2s' }}
//       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
//       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
//       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
//       </svg>
//     </a>
//     {/* Facebook */}
//     <a href="#" aria-label="Facebook" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s, transform 0.2s' }}
//       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
//       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
//       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
//       </svg>
//     </a>
//     {/* YouTube */}
//     <a href="#" aria-label="YouTube" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s, transform 0.2s' }}
//       onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
//       onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
//       <svg width="14" height="11" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M22.54 3.57A2.78 2.78 0 0 0 20.59 1.6C18.88 1.12 12 1.12 12 1.12s-6.88 0-8.59.48A2.78 2.78 0 0 0 1.46 3.57 29 29 0 0 0 1 9a29 29 0 0 0 .46 5.43A2.78 2.78 0 0 0 3.41 16.4C5.12 16.88 12 16.88 12 16.88s6.88 0 8.59-.48a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 9a29 29 0 0 0-.46-5.43z"/>
//         <polygon points="9.75 12.02 15.5 9 9.75 5.98 9.75 12.02" fill="currentColor" stroke="none"/>
//       </svg>
//     </a>
//   </div>
// );

// export default function Navbar() {
//   const sentinelRef  = useRef<HTMLDivElement>(null);
//   const [sticky,     setSticky]     = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [dropdown,   setDropdown]   = useState<string|null>(null);

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

//   return (
//     <>
//       <div ref={sentinelRef} style={{ position:'absolute', top:'100vh', left:0, width:1, height:1, pointerEvents:'none' }}/>

//       <header
//         style={{
//           position: sticky ? 'fixed' : 'absolute',
//           top:0, left:0, right:0, zIndex:100,
//           transition:'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
//         }}
//         className={sticky ? 'nav-glass' : ''}
//       >
//         {/* ── TOP BAR ── */}
//         <div style={{
//           maxHeight: sticky ? 0 : 38,
//           opacity: sticky ? 0 : 1,
//           overflow:'hidden',
//           transition:'max-height 0.4s ease, opacity 0.3s ease',
//           borderBottom:'1px solid rgba(201,168,76,0.08)',
//         }}>
//           <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 40px',height:38 }}>
//             <a href="tel:+919999999999" style={{ display:'flex',alignItems:'center',gap:6,color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif',textDecoration:'none',transition:'color 0.2s' }}
//               onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color='#c9a84c')}
//               onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.5)')}>
//               <Phone size={11}/> +91 99999 99999
//             </a>
//             <span style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:13,color:'rgba(201,168,76,0.6)' }}>
//               Crafting journeys, not just itineraries
//             </span>
//             <div style={{ display:'flex',alignItems:'center',gap:20 }}>
//               <button style={{ display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif' }}>
//                 <Globe size={11}/> English (IN) <ChevronDown size={9}/>
//               </button>
//               <SocialIcons/>
//             </div>
//           </div>
//         </div>

//         {/* ── MAIN NAV ── */}
//         <div style={{
//           display:'flex', alignItems:'center', justifyContent:'space-between',
//           padding: sticky ? '12px 40px' : '16px 40px',
//           transition:'padding 0.4s ease',
//         }}>
//           <a href="/" style={{ display:'flex',alignItems:'center',gap:12,textDecoration:'none' }}>
//             <div style={{
//               width: sticky ? 36 : 42, height: sticky ? 36 : 42,
//               borderRadius:'50%',
//               background:'linear-gradient(135deg,#c9a84c,#8b6914)',
//               display:'flex',alignItems:'center',justifyContent:'center',
//               boxShadow:'0 0 18px rgba(201,168,76,0.28)',
//               transition:'all 0.4s ease', flexShrink:0,
//             }}>
//               <span style={{ fontFamily:'Playfair Display,serif',fontWeight:800,color:'#0c0a08',fontSize: sticky ? 15 : 18 }}>K</span>
//             </div>
//             <div>
//               <div style={{ fontFamily:'Playfair Display,serif',fontWeight:700,color:'#c9a84c',fontSize: sticky ? 19 : 23,letterSpacing:'0.07em',lineHeight:1 }}>
//                 KAFIRA
//               </div>
//               {!sticky && (
//                 <div style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:11,color:'rgba(201,168,76,0.55)',letterSpacing:'0.14em',marginTop:2 }}>
//                   travel & explore
//                 </div>
//               )}
//             </div>
//           </a>

//           <nav className="hidden lg:flex" style={{ display:'flex',alignItems:'center',gap:4 }}>
//             {NAV_ITEMS.map(item => (
//               <div key={item.label} style={{ position:'relative' }}
//                 onMouseEnter={() => setDropdown(item.label)}
//                 onMouseLeave={() => setDropdown(null)}>
//                 <a
//                   href={item.href}
//                   className="underline-hover"
//                   style={{
//                     display:'flex',alignItems:'center',gap:4,
//                     padding:'8px 14px', borderRadius:999,
//                     fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:500,
//                     color: dropdown === item.label ? '#c9a84c' : 'rgba(245,240,232,0.82)',
//                     textDecoration:'none', transition:'color 0.25s', letterSpacing:'0.015em',
//                   }}
//                 >
//                   {item.label}
//                   <ChevronDown size={12} style={{ transition:'transform 0.25s', transform: dropdown === item.label ? 'rotate(180deg)' : 'none' }}/>
//                 </a>
//                 <div style={{
//                   position:'absolute', top:'100%', left:0, paddingTop:8,
//                   opacity: dropdown === item.label ? 1 : 0,
//                   transform: dropdown === item.label ? 'translateY(0)' : 'translateY(-8px)',
//                   pointerEvents: dropdown === item.label ? 'all' : 'none',
//                   transition:'all 0.25s ease', minWidth:160, zIndex:200,
//                 }}>
//                   <div style={{
//                     background:'rgba(14,12,10,0.96)',
//                     border:'1px solid rgba(201,168,76,0.18)',
//                     borderRadius:14, padding:'8px 0',
//                     backdropFilter:'blur(24px)',
//                     boxShadow:'0 20px 60px rgba(0,0,0,0.55)',
//                   }}>
//                     {item.sub.map(s => (
//                       <a key={s} href="#" style={{
//                         display:'block',padding:'9px 18px',
//                         fontFamily:'Outfit,sans-serif',fontSize:13,
//                         color:'rgba(245,240,232,0.65)',textDecoration:'none',
//                         transition:'all 0.2s',
//                       }}
//                         onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='#c9a84c';el.style.paddingLeft='24px';el.style.background='rgba(201,168,76,0.05)'}}
//                         onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='rgba(245,240,232,0.65)';el.style.paddingLeft='18px';el.style.background='none'}}
//                       >{s}</a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </nav>

//           <div className="hidden lg:flex items-center gap-3">
//             <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
//               style={{
//                 display:'flex',alignItems:'center',gap:7,
//                 padding:'8px 18px', borderRadius:999,
//                 background:'rgba(37,211,102,0.1)',
//                 border:'1px solid rgba(37,211,102,0.28)',
//                 color:'#25d366',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:500,
//                 textDecoration:'none',transition:'all 0.25s',
//               }}
//               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.2)';el.style.transform='translateY(-2px)'}}
//               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.1)';el.style.transform='none'}}
//             >
//               <MessageCircle size={14}/> WhatsApp Us
//             </a>
//             <a href="#tours"
//               style={{
//                 padding:'8px 20px', borderRadius:999,
//                 background:'linear-gradient(135deg,#c9a84c,#8b6914)',
//                 color:'#0c0a08',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:600,
//                 textDecoration:'none',letterSpacing:'0.03em',transition:'all 0.25s',
//               }}
//               onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 8px 22px rgba(201,168,76,0.35)'}}
//               onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='none';el.style.boxShadow='none'}}
//             >Plan a Trip</a>
//           </div>

//           <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden"
//             style={{ background:'rgba(201,168,76,0.1)',border:'none',borderRadius:10,padding:9,cursor:'pointer',color:'#c9a84c',transition:'background 0.2s' }}>
//             {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
//           </button>
//         </div>

//         {/* Mobile drawer */}
//         <div style={{
//           maxHeight: mobileOpen ? 420 : 0, opacity: mobileOpen ? 1 : 0,
//           overflow:'hidden', transition:'max-height 0.45s ease, opacity 0.35s ease',
//           background:'rgba(10,8,6,0.97)',
//         }} className="lg:hidden">
//           <div style={{ padding:'8px 24px 24px' }}>
//             {NAV_ITEMS.map(item => (
//               <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
//                 style={{
//                   display:'block',padding:'13px 0',
//                   fontFamily:'Outfit,sans-serif',fontSize:15,fontWeight:500,
//                   color:'rgba(245,240,232,0.8)',textDecoration:'none',
//                   borderBottom:'1px solid rgba(201,168,76,0.08)',transition:'color 0.2s',
//                 }}>{item.label}</a>
//             ))}
//             <a href="https://wa.me/919999999999"
//               style={{
//                 display:'flex',alignItems:'center',gap:8,
//                 marginTop:16,padding:'12px 18px',borderRadius:12,
//                 background:'rgba(37,211,102,0.1)',
//                 border:'1px solid rgba(37,211,102,0.25)',
//                 color:'#25d366',fontFamily:'Outfit,sans-serif',fontSize:14,textDecoration:'none',
//               }}>
//               <MessageCircle size={16}/> WhatsApp Us
//             </a>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }








'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, MessageCircle, ChevronDown, Phone, Globe } from 'lucide-react';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'About',        href: '#about',        sub: ['Our Story','Team','Testimonials'] },
  { label: 'Destinations', href: '#upcoming-trips', sub: ['Rajasthan','Kerala','Himalayas','Goa','International'] },
  { label: 'Tours',        href: '#tours',        sub: ['Group Tours','Private Tours','Luxury','Adventure','Honeymoon'] },
  // { label: 'Offers',       href: '#offers',       sub: ['Early Bird','Last Minute','Seasonal Deals'] },
];

const SocialIcons = ({ size = 13 }: { size?: number }) => (
  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
    <a href="#" aria-label="Instagram" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s,transform 0.2s', display:'flex' }}
      onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
      onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    </a>
    <a href="#" aria-label="Facebook" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s,transform 0.2s', display:'flex' }}
      onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
      onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    </a>
    <a href="#" aria-label="YouTube" style={{ color:'rgba(245,240,232,0.4)', transition:'color 0.2s,transform 0.2s', display:'flex' }}
      onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
      onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}>
      <svg width={size + 1} height={size - 2} viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 3.57A2.78 2.78 0 0 0 20.59 1.6C18.88 1.12 12 1.12 12 1.12s-6.88 0-8.59.48A2.78 2.78 0 0 0 1.46 3.57 29 29 0 0 0 1 9a29 29 0 0 0 .46 5.43A2.78 2.78 0 0 0 3.41 16.4C5.12 16.88 12 16.88 12 16.88s6.88 0 8.59-.48a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 9a29 29 0 0 0-.46-5.43z"/>
        <polygon points="9.75 12.02 15.5 9 9.75 5.98 9.75 12.02" fill="currentColor" stroke="none"/>
      </svg>
    </a>
  </div>
);

export default function Navbar() {
  const sentinelRef  = useRef<HTMLDivElement>(null);
  const [sticky,     setSticky]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown,   setDropdown]   = useState<string|null>(null);
  const [openSub,    setOpenSub]    = useState<string|null>(null); // mobile accordion

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting), { threshold:0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <div ref={sentinelRef} style={{ position:'absolute', top:0, left:0, width:1, height:1, pointerEvents:'none' }}/>

      <header
        style={{
          position: sticky ? 'fixed' : 'absolute',
          top:0, left:0, right:0, zIndex:100,
          transition:'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
          background: sticky ? 'rgba(8, 6, 4, 0.78)' : 'transparent',
          backdropFilter: sticky ? 'blur(16px)' : 'none',
          borderBottom: sticky ? '1px solid rgba(255,255,255,0.08)' : 'none',
          boxShadow: sticky ? '0 20px 60px rgba(0,0,0,0.22)' : 'none',
        }}
        className={sticky ? 'nav-glass' : ''}
      >
        {/* ══ TOP BAR — desktop only, hidden on mobile ══ */}
        <div style={{
          maxHeight: sticky ? 0 : 36,
          opacity: sticky ? 0 : 1,
          overflow:'hidden',
          transition:'max-height 0.4s ease, opacity 0.3s ease',
          borderBottom:'1px solid rgba(201,168,76,0.08)',
        }} className="hidden md:block">
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 32px',height:36 }}>
            <a href="tel:+919999999999" style={{ display:'flex',alignItems:'center',gap:5,color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif',textDecoration:'none',transition:'color 0.2s' }}
              onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color='#c9a84c')}
              onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.5)')}>
              <Phone size={11}/> +91 99999 99999
            </a>
            <span style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:13,color:'rgba(201,168,76,0.55)' }}>
              Crafting journeys, not just itineraries
            </span>
            <div style={{ display:'flex',alignItems:'center',gap:18 }}>
              <button style={{ display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:'rgba(245,240,232,0.5)',fontSize:11,fontFamily:'Outfit,sans-serif' }}>
                <Globe size={11}/> EN (IN) <ChevronDown size={9}/>
              </button>
              <SocialIcons size={13}/>
            </div>
          </div>
        </div>

        {/* ══ MAIN NAV ══ */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding: sticky ? '10px 24px' : '14px 24px',
          transition:'padding 0.4s ease',
        }}>

          {/* Logo */}
          <a href="/" style={{ display:'flex',alignItems:'center' }}>
            {/* <div style={{
              width: sticky ? 34 : 40, height: sticky ? 34 : 40,
              borderRadius:'50%',
              background:'linear-gradient(135deg,#c9a84c,#8b6914)',
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 0 16px rgba(201,168,76,0.25)',
              transition:'all 0.4s ease', flexShrink:0,
            }}> */}
              {/* <span style={{ fontFamily:'Playfair Display,serif',fontWeight:800,color:'#0c0a08',fontSize: sticky ? 14 : 17 }}>K</span>
            </div>
            <div>
              <div style={{ fontFamily:'Playfair Display,serif',fontWeight:700,color:'#c9a84c',fontSize: sticky ? 18 : 22,letterSpacing:'0.07em',lineHeight:1 }}>
                KAFIRA
              </div>
              {!sticky && (
                <div style={{ fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:10,color:'rgba(201,168,76,0.5)',letterSpacing:'0.14em',marginTop:2 }}>
                  travel & explore
                </div>
              )} */}

              <Image src="/logo.png" alt="kafira logo" width={110} height={110}/>
            {/* </div> */}
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex" style={{ alignItems:'center',gap:2 }}>
            {NAV_ITEMS.map(item => (
              <div key={item.label} style={{ position:'relative' }}
                onMouseEnter={() => setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}>
                <a href={item.href} className="underline-hover" style={{
                  display:'flex',alignItems:'center',gap:4,padding:'7px 12px',borderRadius:999,
                  fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:500,
                  color: dropdown === item.label ? '#c9a84c' : 'rgba(245,240,232,0.82)',
                  textDecoration:'none',transition:'color 0.25s',letterSpacing:'0.015em',
                }}>
                  {item.label}
                  <ChevronDown size={11} style={{ transition:'transform 0.25s', transform: dropdown===item.label?'rotate(180deg)':'none' }}/>
                </a>
                {/* Dropdown */}
                <div style={{
                  position:'absolute',top:'100%',left:0,paddingTop:6,
                  opacity: dropdown===item.label?1:0,
                  transform: dropdown===item.label?'translateY(0)':'translateY(-8px)',
                  pointerEvents: dropdown===item.label?'all':'none',
                  transition:'all 0.25s ease',minWidth:155,zIndex:200,
                }}>
                  <div style={{ background:'rgba(14,12,10,0.96)',border:'1px solid rgba(201,168,76,0.18)',borderRadius:13,padding:'7px 0',backdropFilter:'blur(24px)',boxShadow:'0 20px 60px rgba(0,0,0,0.55)' }}>
                    {item.sub.map(s => (
                      <a key={s} href="#" style={{ display:'block',padding:'8px 16px',fontFamily:'Outfit,sans-serif',fontSize:12,color:'rgba(245,240,232,0.65)',textDecoration:'none',transition:'all 0.2s' }}
                        onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='#c9a84c';el.style.paddingLeft='22px';el.style.background='rgba(201,168,76,0.05)'}}
                        onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='rgba(245,240,232,0.65)';el.style.paddingLeft='16px';el.style.background='none'}}
                      >{s}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center" style={{ gap:10 }}>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
              style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 16px',borderRadius:999,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.28)',color:'#25d366',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:500,textDecoration:'none',transition:'all 0.25s' }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.2)';el.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.1)';el.style.transform='none'}}
            >
              <MessageCircle size={13}/> WhatsApp Us
            </a>
            <a href="#tours"
              style={{ padding:'7px 18px',borderRadius:999,background:'linear-gradient(135deg,#c9a84c,#8b6914)',color:'#0c0a08',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,textDecoration:'none',letterSpacing:'0.03em',transition:'all 0.25s' }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 8px 22px rgba(201,168,76,0.35)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='none';el.style.boxShadow='none'}}
            >Plan a Trip</a>
          </div>

          {/* Mobile right side: WhatsApp icon + hamburger */}
          <div className="flex lg:hidden items-center" style={{ gap:8 }}>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              style={{ display:'flex',alignItems:'center',justifyContent:'center',width:36,height:36,borderRadius:10,background:'rgba(37,211,102,0.12)',border:'1px solid rgba(37,211,102,0.25)',color:'#25d366',flexShrink:0 }}>
              <MessageCircle size={16}/>
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
              style={{ background:'rgba(201,168,76,0.1)',border:'none',borderRadius:10,padding:8,cursor:'pointer',color:'#c9a84c',display:'flex',alignItems:'center',justifyContent:'center' }}>
              {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>

        {/* ══ MOBILE FULL-SCREEN DRAWER ══ */}
        <div style={{
          maxHeight: mobileOpen ? '100vh' : 0,
          opacity: mobileOpen ? 1 : 0,
          overflow:'hidden',
          transition:'max-height 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease',
          background:'rgba(8,6,4,0.98)',
          backdropFilter:'blur(24px)',
        }} className="lg:hidden">
          <div style={{ padding:'16px 24px 32px' }}>

            {/* Nav items with accordion sub-items */}
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label} style={{ borderBottom:'1px solid rgba(201,168,76,0.07)' }}>
                <button
                  onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                  style={{
                    display:'flex',alignItems:'center',justifyContent:'space-between',
                    width:'100%', padding:'14px 0', background:'none', border:'none', cursor:'pointer',
                    fontFamily:'Outfit,sans-serif',fontSize:15,fontWeight:500,
                    color: openSub===item.label ? '#c9a84c' : 'rgba(245,240,232,0.82)',
                    transition:'color 0.2s',
                    textAlign:'left',
                  }}
                >
                  <a href={item.href} onClick={() => setMobileOpen(false)} style={{ textDecoration:'none',color:'inherit',flex:1 }}>
                    {item.label}
                  </a>
                  <ChevronDown size={14} style={{ color:'rgba(201,168,76,0.5)',transition:'transform 0.3s',transform: openSub===item.label?'rotate(180deg)':'none',flexShrink:0 }}/>
                </button>

                {/* sub-items accordion */}
                <div style={{
                  maxHeight: openSub===item.label ? '200px' : 0,
                  opacity: openSub===item.label ? 1 : 0,
                  overflow:'hidden',
                  transition:'max-height 0.35s ease, opacity 0.3s ease',
                }}>
                  <div style={{ paddingBottom:10, paddingLeft:12, display:'flex', flexWrap:'wrap', gap:6 }}>
                    {item.sub.map(s => (
                      <a key={s} href="#" onClick={() => setMobileOpen(false)}
                        style={{ padding:'5px 12px',borderRadius:999,fontSize:12,fontFamily:'Outfit,sans-serif',color:'rgba(201,168,76,0.7)',background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.12)',textDecoration:'none',transition:'all 0.2s' }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background='rgba(201,168,76,0.15)'}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background='rgba(201,168,76,0.07)'}}
                      >{s}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Plan a Trip CTA */}
            <a href="#tours" onClick={() => setMobileOpen(false)}
              style={{ display:'block',marginTop:20,padding:'14px',borderRadius:14,background:'linear-gradient(135deg,#c9a84c,#8b6914)',color:'#0c0a08',fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center',letterSpacing:'0.04em' }}>
              Plan a Trip
            </a>

            {/* Bottom: phone + social */}
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:20,paddingTop:16,borderTop:'1px solid rgba(201,168,76,0.08)' }}>
              <a href="tel:+919999999999" style={{ display:'flex',alignItems:'center',gap:6,color:'rgba(245,240,232,0.45)',fontSize:12,fontFamily:'Outfit,sans-serif',textDecoration:'none' }}>
                <Phone size={12}/> +91 99999 99999
              </a>
              <SocialIcons size={15}/>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}