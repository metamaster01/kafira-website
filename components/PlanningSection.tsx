'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Lottie from 'lottie-react';

// ── Add this import at the top of the file ──
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
// import { useRef } from 'react'; // if not already imported

gsap.registerPlugin(ScrollTrigger);

/*
  LAYOUT RULES (never break these):
  ─────────────────────────────────
  • Outer grid: 3 fixed-pixel columns — no fr units, no auto
  • BENTO_H: every column is exactly this tall, always
  • Cards: width:100%, height:100% — they fill their wrapper, nothing more
  • Expansion: flex redistribution INSIDE a fixed-size column only
  • overflow:hidden on every column wrapper — nothing can leak out
  • Marquee: overflow:hidden + fixed card width — never pushes column wider
*/

const COL_L  = 360; // px — left column fixed width
const COL_C  = 380; // px — centre column fixed width  
const COL_R  = 360; // px — right column fixed width
const GAP    = 14;  // px — gap between columns
const BENTO_H = 540; // px — bento area fixed height

// ── Reveal ──────────────────────────────────────────
function useReveal(delay = 0, dir: 'left'|'right'|'up' = 'up') {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.set(el, {
      opacity: 0,
      x: dir === 'left' ? -24 : dir === 'right' ? 24 : 0,
      y: dir === 'up' ? 24 : 0,
    });
    gsap.to(el, {
      opacity: 1, x: 0, y: 0,
      duration: 0.8, delay, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }, [delay, dir]);
  return ref;
}

// ── Icons ────────────────────────────────────────────
function IGIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="#e1306c" stroke="none"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#333">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// ── Testimonials ─────────────────────────────────────
const T = [
  { name:'@priya.wanderlust',  ig:true,  text:'Rajasthan trip was flawless — every detail spot on! 🐪', r:5 },
  { name:'@rohan_travels',     ig:false, text:'Best travel agency. Booked Leh in 10 mins flat.',         r:5 },
  { name:'@meera.explores',    ig:true,  text:'Kerala backwaters — absolutely magical. Thank you! 🌴',    r:5 },
  { name:'@amit_nomad',        ig:false, text:'Zero hidden fees. Transparent pricing. Perfect.',          r:5 },
  { name:'@sneha.jetsetter',   ig:true,  text:'Manali in December — flawless despite the snow ❄️',       r:5 },
  { name:'@vikram.trips',      ig:false, text:'24/7 support saved our honeymoon in Goa. Legends.',       r:5 },
  { name:'@anjali_escapes',    ig:true,  text:'Saved ₹6,000 vs booking direct. Unbelievable value!',     r:5 },
  { name:'@karan.onthego',     ig:false, text:'Meghalaya group tour — every person loved it. 10/10.',    r:5 },
];

// Card is 160px wide — column is 280px → ~1.5 cards visible, creates peek
const TC_W = 158;

function TCard({ t }: { t: typeof T[0] }) {
  return (
    <div style={{
      flexShrink: 0, width: TC_W,
      padding: '10px 12px', borderRadius: 12,
      background: '#f5f2ed', border: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ width:22,height:22,borderRadius:'50%',background:'linear-gradient(135deg,#1a6b58,#2d8f7b)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:9,color:'#fff',flexShrink:0 }}>
            {t.name[1].toUpperCase()}
          </div>
          <span style={{ fontFamily:'Outfit,sans-serif',fontSize:9,fontWeight:600,color:'#1a1510',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:80 }}>
            {t.name}
          </span>
        </div>
        {t.ig ? <IGIcon/> : <XIcon/>}
      </div>
      <p style={{ fontFamily:'Outfit,sans-serif',fontSize:10,color:'#6b5e4e',lineHeight:1.4,display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden' }}>
        {t.text}
      </p>
      <div style={{ display:'flex', gap:1 }}>
        {Array.from({length:t.r}).map((_,i)=><span key={i} style={{fontSize:9,color:'#c9a84c'}}>★</span>)}
      </div>
    </div>
  );
}

// Marquee: overflow:hidden at wrapper — NEVER leaks horizontally
function Marquee({ items, rev }: { items: typeof T; rev: boolean }) {
  const id = useId();
  const safeId = `mq-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow:'hidden', width:'100%', flexShrink:0 }}>
      <style>{`
        @keyframes ${safeId}{from{transform:translateX(${rev?'-50%':'0%'})}to{transform:translateX(${rev?'0%':'-50%'})}}
        .${safeId}{animation:${safeId} 26s linear infinite;}
        .${safeId}:hover{animation-play-state:paused;}
      `}</style>
      <div className={safeId} style={{ display:'flex', gap:8, width:'max-content' }}>
        {doubled.map((t,i) => <TCard key={i} t={t}/>)}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// LEFT COLUMN  (COL_L px wide, BENTO_H tall)
// TOP  = PlannerCard  — expands (flex 2) on hover
// BOT  = DestCard     — shrinks (flex .55) on hover
// ════════════════════════════════════════════════

function PlannerCard({ exp }: { exp: boolean }) {
  return (
    <div style={{
      width:'100%', height:'100%',
      background:'linear-gradient(145deg,#0f2a1a,#1a4a28)',
      borderRadius:18, padding:'18px',
      display:'flex', flexDirection:'column',
      position:'relative', overflow:'hidden',
      boxShadow: exp ? '0 16px 40px rgba(0,0,0,0.22)' : '0 2px 10px rgba(0,0,0,0.1)',
      transition:'box-shadow 0.4s ease',
    }}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 20% 80%,rgba(74,173,106,0.12) 0%,transparent 60%)',pointerEvents:'none'}}/>

      {/* label + heading — always shown */}
      <div style={{flexShrink:0}}>
        <div style={{fontFamily:'Outfit,sans-serif',fontSize:8,fontWeight:700,color:'#2d8f7b',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:6}}>
          Route Planner
        </div>
        <h3 style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:exp?19:17,color:'#f5f0e8',lineHeight:1.2,marginBottom:6,transition:'font-size 0.35s ease'}}>
          Comfort-first<br/>trip routing
        </h3>
        <p style={{
          fontFamily:'Outfit,sans-serif',fontSize:10,color:'rgba(245,240,232,0.48)',lineHeight:1.5,
          height: exp ? 0 : 'auto',
          opacity: exp ? 0 : 1,
          overflow:'hidden',
          transition:'opacity 0.25s ease, height 0.35s ease',
          marginBottom: exp ? 0 : 4,
        }}>
          Routes built around your pace, not just speed.
        </p>
      </div>

      {/*
        IMAGE — fixed pixel height. objectFit:cover + objectPosition:top.
        height transitions 0→296px. overflow:hidden on parent clips it.
        No width change whatsoever.
      */}
      <div style={{
        borderRadius:12, overflow:'hidden',
        height: exp ? 296 : 0,
        opacity: exp ? 1 : 0,
        marginTop: exp ? 10 : 0,
        flexShrink:0,
        transition:'height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, margin-top 0.4s ease',
        position:'relative',
      }}>
        <img
          src="/image-1.png" alt="Route planner"
          style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}
          onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
        />
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:48,background:'linear-gradient(to top,rgba(15,42,26,0.95),transparent)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:8,left:12,fontFamily:'Outfit,sans-serif',fontSize:9,color:'rgba(245,240,232,0.65)'}}>🗺 Route mapped</div>
      </div>
    </div>
  );
}

// function DestCard({ compact }: { compact: boolean }) {
//   const [hovered, setHovered] = useState(false);
//   const DESTS = ['🏔 Leh','🌊 Kerala','🏜 Rajasthan','🌴 Goa','⛩ Jaipur','🗻 Manali'];
//   return (
//     <div style={{
//       width:'100%', height:'100%',
//       background:'linear-gradient(145deg,#1a3a5c,#0d2038)',
//       borderRadius:18, padding:'16px 18px',
//       display:'flex', flexDirection:'column', gap:8,
//       position:'relative', overflow:'hidden',
//     }}
//     onMouseEnter={() => setHovered(true)}
//     onMouseLeave={() => setHovered(false)}
//     >
//       <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 85% 15%,rgba(201,168,76,0.1) 0%,transparent 60%)',pointerEvents:'none'}}/>
//       <div style={{flexShrink:0}}>
//         <div style={{fontFamily:'Outfit,sans-serif',fontSize:8,fontWeight:700,color:'#2d8f7b',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:5}}>120+ destinations</div>
//         <h3 style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:compact?14:17,color:'#f5f0e8',lineHeight:1.2,transition:'font-size 0.35s ease'}}>
//           Handpicked just for you
//         </h3>
//       </div>
//       <div style={{display:'flex',flexWrap:'wrap',gap:5,overflow:'hidden'}}>
//         {(compact ? DESTS.slice(0,3) : DESTS).map((d,i)=>(
//           <div key={i} style={{
//             padding:'4px 9px',borderRadius:999,
//             background:i===0?'linear-gradient(135deg,#1a6b58,#2d8f7b)':'rgba(255,255,255,0.08)',
//             color:i===0?'#fff':'rgba(245,240,232,0.6)',
//             fontFamily:'Outfit,sans-serif',fontSize:10,fontWeight:500,
//             border:i===0?'none':'1px solid rgba(255,255,255,0.1)',
//           }}>{d}</div>
//         ))}
//       </div>
//       {hovered && (
//         <img
//           src="/tour.json"
//           alt="Tour GIF"
//           style={{
//             position: 'absolute',
//             inset: 0,
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             borderRadius: 18,
//             pointerEvents: 'none'
//           }}
//         />
//       )}
//     </div>
//   );
// }





function DestCard({ compact }: { compact: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [tourData, setTourData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    import('@/public/tour.json').then((mod) => setTourData(mod.default ?? mod));
  }, []);

  useEffect(() => {
    if (!lottieRef.current) return;
    if (hovered) {
      lottieRef.current.goToAndPlay(0, true);
    } else {
      lottieRef.current.stop();
    }
  }, [hovered]);

  const DESTS = ['🏔 Leh','🌊 Kerala','🏜 Rajasthan','🌴 Goa','⛩ Jaipur','🗻 Manali'];

  return (
    <div
      style={{
        width:'100%', height:'100%',
        background:'linear-gradient(145deg,#1a3a5c,#0d2038)',
        borderRadius:18, padding:'16px 18px',
        display:'flex', flexDirection:'column', gap:8,
        position:'relative', overflow:'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 85% 15%,rgba(201,168,76,0.1) 0%,transparent 60%)',pointerEvents:'none'}}/>

      {/* Title — always visible */}
      <div style={{flexShrink:0}}>
        <div style={{fontFamily:'Outfit,sans-serif',fontSize:8,fontWeight:700,color:'#2d8f7b',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:5}}>
          120+ destinations
        </div>
        <h3 style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:compact?14:17,color:'#f5f0e8',lineHeight:1.2,transition:'font-size 0.35s ease'}}>
          Handpicked just for you
        </h3>
      </div>

      {/* Pills — fade + slide out on hover */}
      <div style={{
        display:'flex', flexWrap:'wrap', gap:5,
        flexShrink:0,
        overflow:'hidden',
        opacity: hovered ? 0 : 1,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0px)',
        transition:'opacity 0.3s ease, transform 0.3s ease',
        maxHeight: hovered ? 0 : 80,
      }}>
        {(compact ? DESTS.slice(0,3) : DESTS).map((d,i)=>(
          <div key={i} style={{
            padding:'4px 9px', borderRadius:999,
            background:i===0?'linear-gradient(135deg,#1a6b58,#2d8f7b)':'rgba(255,255,255,0.08)',
            color:i===0?'#fff':'rgba(245,240,232,0.6)',
            fontFamily:'Outfit,sans-serif',fontSize:10,fontWeight:500,
            border:i===0?'none':'1px solid rgba(255,255,255,0.1)',
          }}>{d}</div>
        ))}
      </div>

      {/* Lottie — grows into space freed by pills */}
      <div style={{
        flex:1, minHeight:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(0.85)',
        transition:'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents:'none',
      }}>
        {tourData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={tourData}
            autoplay={false}
            loop={true}
            style={{width:'100%', height:'100%', maxHeight:240}}
          />
        )}
      </div>
    </div>
  );
}

function LeftColumn() {
  const ref = useReveal(0.05, 'left');
  const [exp, setExp] = useState(false);
  return (
    // width + overflow:hidden are the lock — nothing inside can break out
    <div ref={ref} style={{ width:COL_L, height:BENTO_H, overflow:'hidden', display:'flex', flexDirection:'column', gap:GAP }}>
      <div
        style={{ flex: exp ? 2 : 1, minHeight:0, transition:'flex 0.42s cubic-bezier(0.4,0,0.2,1)' }}
        onMouseEnter={()=>setExp(true)} onMouseLeave={()=>setExp(false)}
      >
        <PlannerCard exp={exp}/>
      </div>
      <div style={{ flex: exp ? 0.55 : 1, minHeight:0, transition:'flex 0.42s cubic-bezier(0.4,0,0.2,1)' }}>
        <DestCard compact={exp}/>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// CENTRE  (COL_C px wide, BENTO_H tall)
// Raw image, two floating chips, no background
// ════════════════════════════════════════════════
function CentreImage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    gsap.set(el,{opacity:0,scale:0.93,y:18});
    gsap.to(el,{opacity:1,scale:1,y:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
  },[]);
  return (
    <div ref={ref} style={{ width:COL_C, height:BENTO_H, position:'relative', flexShrink:0 }}>
      <div style={{ width:'100%',height:'100%',borderRadius:20,overflow:'hidden',boxShadow:'0 16px 48px rgba(0,0,0,0.15)' }}>
        <img
          src="/image-4.png" alt="Route planner"
          style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
          onError={e=>{(e.currentTarget as HTMLImageElement).style.opacity='0';}}
        />
      </div>
      {/* chip top-left */}
      {/* <div style={{position:'absolute',top:20,left:-8,background:'#fff',borderRadius:12,padding:'7px 12px',boxShadow:'0 4px 18px rgba(0,0,0,0.12)',display:'flex',alignItems:'center',gap:6,transform:'rotate(-2.5deg)'}}>
        <span style={{fontSize:14}}>⭐</span>
        <div>
          <div style={{fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:11,color:'#1a1510',lineHeight:1}}>4.9 / 5</div>
          <div style={{fontFamily:'Outfit,sans-serif',fontSize:9,color:'#6b5e4e'}}>12,400 reviews</div>
        </div>
      </div>
    
      <div style={{position:'absolute',bottom:20,right:-8,background:'#fff',borderRadius:12,padding:'7px 12px',boxShadow:'0 4px 18px rgba(0,0,0,0.12)',display:'flex',alignItems:'center',gap:6,transform:'rotate(2.5deg)'}}>
        <div style={{width:26,height:26,borderRadius:8,background:'linear-gradient(135deg,#c9a84c,#8b6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>✈️</div>
        <div>
          <div style={{fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:11,color:'#1a1510',lineHeight:1}}>Trip booked!</div>
          <div style={{fontFamily:'Outfit,sans-serif',fontSize:9,color:'#6b5e4e'}}>Leh Ladakh · 6 days</div>
        </div>
      </div> */}
    </div>
  );
}

// ════════════════════════════════════════════════
// RIGHT COLUMN  (COL_R px wide, BENTO_H tall)
// TOP  = SavingsCard — shrinks when reviews expand
// BOT  = ReviewsCard — expands (flex 2) on hover
// ════════════════════════════════════════════════

// function SavingsCard({ compact }: { compact: boolean }) {
//   const [hovering, setHovering] = useState(false);
//   const savingLottie = require('@/public/saving.json');

//   return (
//     <div
//       style={{
//         width:'100%', height:'100%',
//         background:'linear-gradient(145deg,#1c1c2e,#2d2d44)',
//         borderRadius:18, padding:'18px',
//         display:'flex', flexDirection:'column', justifyContent:'space-between',
//         position:'relative', overflow:'hidden',
//       }}
//       onMouseEnter={() => setHovering(true)}
//       onMouseLeave={() => setHovering(false)}
//     >
//       <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 80% 20%,rgba(120,80,200,0.12) 0%,transparent 60%)',pointerEvents:'none'}}/>
//       <div>
//         <div style={{fontFamily:'Outfit,sans-serif',fontSize:8,fontWeight:700,color:'#2d8f7b',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:6}}>Avg. savings</div>
//         <div style={{display:'flex',alignItems:'center',gap:8}}>
//           <div style={{fontFamily:'Playfair Display,serif',fontWeight:900,fontSize:compact?28:42,color:'#f5f0e8',lineHeight:0.95,transition:'font-size 0.35s ease'}}>₹4,200</div>
//           {hovering && (
//             <div style={{width:32,height:32,flexShrink:0}}>
//               <Lottie animationData={savingLottie} loop={true} autoplay={true}/>
//             </div>
//           )}
//         </div>
//         {!compact && <div style={{fontFamily:'Outfit,sans-serif',fontSize:10,color:'rgba(245,240,232,0.48)',marginTop:7,lineHeight:1.4}}>per trip vs. booking independently</div>}
//       </div>
//       {!compact && (
//         <div style={{display:'flex',alignItems:'center',gap:5,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.07)'}}>
//           <div style={{width:5,height:5,borderRadius:'50%',background:'#9b7fe8',flexShrink:0}}/>
//           <span style={{fontFamily:'Outfit,sans-serif',fontSize:8,color:'rgba(245,240,232,0.4)'}}>5,000+ trips · Price-match guarantee</span>
//         </div>
//       )}


      
//     </div>
//   );
// }



function SavingsCard({ compact }: { compact: boolean }) {
  const [hovering, setHovering] = useState(false);
  const [savingData, setSavingData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    import('@/public/saving.json').then((mod) => setSavingData(mod.default ?? mod));
  }, []);

  useEffect(() => {
    if (!lottieRef.current) return;
    if (hovering) {
      lottieRef.current.goToAndPlay(0, true);
    } else {
      lottieRef.current.stop();
    }
  }, [hovering]);

  return (
    <div
      style={{
        width:'100%', height:'100%',
        background:'linear-gradient(145deg,#1c1c2e,#2d2d44)',
        borderRadius:18, padding:'18px',
        display:'flex', flexDirection:'column',
        position:'relative', overflow:'hidden',
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 80% 20%,rgba(120,80,200,0.12) 0%,transparent 60%)',pointerEvents:'none'}}/>

      {/* Label — always visible */}
      <div style={{flexShrink:0}}>
        <div style={{fontFamily:'Outfit,sans-serif',fontSize:8,fontWeight:700,color:'#2d8f7b',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:6}}>
          Avg. savings
        </div>
        <div style={{fontFamily:'Playfair Display,serif',fontWeight:900,fontSize:compact?28:42,color:'#f5f0e8',lineHeight:0.95,transition:'font-size 0.35s ease'}}>
          ₹4,200
        </div>
      </div>

      {/* Subtitle — fades out on hover to free space */}
      <div style={{
        flexShrink:0,
        opacity: hovering ? 0 : 1,
        transform: hovering ? 'translateY(-6px)' : 'translateY(0px)',
        maxHeight: hovering ? 0 : 40,
        overflow:'hidden',
        transition:'opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease',
        marginTop: hovering ? 0 : 7,
      }}>
        {!compact && (
          <div style={{fontFamily:'Outfit,sans-serif',fontSize:10,color:'rgba(245,240,232,0.48)',lineHeight:1.4}}>
            per trip vs. booking independently
          </div>
        )}
      </div>

      {/* Lottie — bigger now */}
      <div style={{
        flex:1, minHeight:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        opacity: hovering ? 1 : 0,
        transform: hovering ? 'scale(1)' : 'scale(0.85)',
        transition:'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents:'none',
      }}>
        {savingData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={savingData}
            autoplay={false}
            loop={true}
            style={{width:'100%', height:'100%', maxHeight:200}}
          />
        )}
      </div>

      {/* Footer — fades out on hover */}
      {!compact && (
        <div style={{
          display:'flex', alignItems:'center', gap:5,
          paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.07)',
          flexShrink:0,
          opacity: hovering ? 0 : 1,
          maxHeight: hovering ? 0 : 30,
          overflow:'hidden',
          transition:'opacity 0.25s ease, max-height 0.3s ease',
        }}>
          <div style={{width:5,height:5,borderRadius:'50%',background:'#9b7fe8',flexShrink:0}}/>
          <span style={{fontFamily:'Outfit,sans-serif',fontSize:8,color:'rgba(245,240,232,0.4)'}}>
            5,000+ trips · Price-match guarantee
          </span>
        </div>
      )}
    </div>
  );
}


function ReviewsCard({ exp }: { exp: boolean }) {
  const R1 = T.slice(0,4);
  const R2 = T.slice(4,8);
  return (
    <div style={{
      width:'100%', height:'100%',
      background:'#fff',
      borderRadius:18, padding:'16px',
      border:'1px solid rgba(0,0,0,0.07)',
      display:'flex', flexDirection:'column', gap:8,
      overflow:'hidden',                    // ← THIS is what stops horizontal bleed
      boxShadow: exp ? '0 16px 40px rgba(0,0,0,0.08)' : '0 2px 10px rgba(0,0,0,0.05)',
      transition:'box-shadow 0.4s ease',
    }}>
      {/* header */}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:6,flexShrink:0}}>
        <div>
          <div style={{fontFamily:'Outfit,sans-serif',fontSize:8,fontWeight:700,color:'#2d8f7b',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:4}}>Real reviews</div>
          <h3 style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:exp?18:15,color:'#1a1510',lineHeight:1.15,transition:'font-size 0.35s ease'}}>
            Trusted by<br/>50,000+ travelers
          </h3>
        </div>
        <div style={{textAlign:'right',flexShrink:0}}>
          <div style={{display:'flex',gap:1,justifyContent:'flex-end'}}>
            {[1,2,3,4,5].map(s=><span key={s} style={{fontSize:11,color:'#c9a84c'}}>★</span>)}
          </div>
          <div style={{fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:700,color:'#1a1510'}}>4.9</div>
          <div style={{fontFamily:'Outfit,sans-serif',fontSize:8,color:'#6b5e4e'}}>12,400 reviews</div>
        </div>
      </div>

      {/* avatars */}
      <div style={{display:'flex',alignItems:'center',flexShrink:0}}>
        {['P','R','M','A','S'].map((l,i)=>(
          <div key={i} style={{width:22,height:22,borderRadius:'50%',background:'linear-gradient(135deg,#1a6b58,#2d8f7b)',border:'2px solid #fff',marginLeft:i?-6:0,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif',fontSize:7,fontWeight:700,color:'#fff',zIndex:5-i,flexShrink:0}}>
            {l}
          </div>
        ))}
        <span style={{fontFamily:'Outfit,sans-serif',fontSize:9,color:'#6b5e4e',marginLeft:7}}>+49,995 more</span>
      </div>

      {/*
        Marquee wrapper:
        - overflow:hidden clips horizontally (width is already fixed by column)
        - flex:1 fills remaining vertical space inside the expanded card
        - opacity+transition for smooth appearance
        - minHeight:0 required for flex children to shrink properly
      */}
      <div style={{
        flex: exp ? 1 : 0,
        minHeight: 0,
        overflow:'hidden',
        display:'flex', flexDirection:'column', gap:7,
        opacity: exp ? 1 : 0,
        transition:'flex 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
      }}>
        <Marquee items={R1} rev={false}/>
        <Marquee items={R2} rev={true}/>
      </div>
    </div>
  );
}

function RightColumn() {
  const ref = useReveal(0.1, 'right');
  const [exp, setExp] = useState(false);
  return (
    <div ref={ref} style={{ width:COL_R, height:BENTO_H, overflow:'hidden', display:'flex', flexDirection:'column', gap:GAP }}>
      <div style={{ flex: exp ? 0.5 : 1, minHeight:0, transition:'flex 0.42s cubic-bezier(0.4,0,0.2,1)' }}>
        <SavingsCard compact={exp}/>
      </div>
      <div
        style={{ flex: exp ? 2 : 1, minHeight:0, transition:'flex 0.42s cubic-bezier(0.4,0,0.2,1)' }}
        onMouseEnter={()=>setExp(true)} onMouseLeave={()=>setExp(false)}
      >
        <ReviewsCard exp={exp}/>
      </div>
    </div>
  );
}

// ── Section heading ──────────────────────────────────
function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    gsap.set(el,{opacity:0,y:24});
    gsap.to(el,{opacity:1,y:0,duration:0.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
  },[]);
  return (
    <div ref={ref} style={{textAlign:'center',maxWidth:520,margin:'0 auto 44px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:12}}>
        <div style={{height:1,width:22,background:'linear-gradient(to right,transparent,#c9a84c)'}}/>
        <span style={{fontFamily:'Outfit,sans-serif',fontSize:10,fontWeight:700,color:'#2d8f7b',letterSpacing:'0.22em',textTransform:'uppercase'}}>Step 01 — Planning</span>
        <div style={{height:1,width:22,background:'linear-gradient(to left,transparent,#c9a84c)'}}/>
      </div>
      <h2 style={{fontFamily:'Playfair Display,serif',fontWeight:800,fontSize:'clamp(26px,3vw,46px)',lineHeight:1.1,color:'#1a1510',marginBottom:12}}>
        Your journey starts with<br/><span style={{fontStyle:'italic',color:'#2d8f7b'}}>a single tap</span>
      </h2>
      <p style={{fontFamily:'Outfit,sans-serif',fontSize:15,color:'#6b5e4e',lineHeight:1.65}}>
        Browse, plan, book — Kafira handles everything so you just show up and explore.
      </p>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────
export default function PlanningSection() {
  // Total content width = COL_L + GAP + COL_C + GAP + COL_R
  const totalW = COL_L + GAP + COL_C + GAP + COL_R; // 1008px

  return (
    <section id="planning" style={{background:'#faf7f2',padding:'88px 0 72px'}}>
      <div style={{maxWidth: totalW + 64, margin:'0 auto', padding:'0 32px'}}>
        <SectionHeading/>

        {/*
          display:flex instead of grid — flex respects fixed widths perfectly.
          No fr, no auto, no 1fr. Each child is exactly COL_L/C/R pixels wide.
          overflow:hidden on each column wrapper locks width absolutely.
        */}
        <div style={{
          display:'flex',
          gap: GAP,
          alignItems:'flex-start',
          height: BENTO_H,
        }}>
          <LeftColumn/>
          <CentreImage/>
          <RightColumn/>
        </div>
      </div>

      {/* Mobile: stack */}
      <style>{`
        @media (max-width:960px){
          #planning > div > div:last-of-type {
            flex-direction: column !important;
            height: auto !important;
          }
          #planning > div > div:last-of-type > div {
            width: 100% !important;
            height: auto !important;
            min-height: 180px !important;
          }
          #planning > div > div:last-of-type > div > div {
            flex: none !important;
            height: auto !important;
            min-height: 160px;
          }
        }
      `}</style>
    </section>
  );
}