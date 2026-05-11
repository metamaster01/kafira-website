'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MEMORIES = [
  { label:'Beach View',    location:'Goa',  bg:'linear-gradient(145deg,#1a3a2a,#2a6040)' },
  { label:'River Rafting',       location:'Dehradhun',      bg:'linear-gradient(145deg,#1a2a4a,#2a4a7a)' },
  { label:'Forest Trail',      location:'Coorg',       bg:'linear-gradient(145deg,#243a18,#3a5a28)' },
  { label:'Wildflower Meadow', location:'Uttarakhand', bg:'linear-gradient(145deg,#3a2a18,#5a3a20)' },
];

// ─── memory photo: fixed square, no phone frame ──────
function MemoryPhoto({ m, i }: { m: typeof MEMORIES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity:0, scale:0.9, y:24 });
    gsap.to(el, {
      opacity:1, scale:1, y:0,
      duration:0.8, delay:i * 0.1,
      ease:'power3.out',
      scrollTrigger:{ trigger:el, start:'top 90%', once:true },
    });
  }, [i]);

  return (
    <div ref={ref}
      className="memory-photo"
      style={{
        borderRadius:18, overflow:'hidden', position:'relative',
        aspectRatio: '1/1', background:m.bg,
        cursor:'pointer',
        transition:'transform 0.32s ease, box-shadow 0.32s ease',
      }}
      onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform='scale(1.04)';el.style.boxShadow='0 16px 40px rgba(0,0,0,0.22)';}}
      onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform='scale(1)';el.style.boxShadow='none';}}
    >
      <img
        src={`/memories-${i+1}.jpg`} alt={m.label}
        style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform 0.5s ease'}}
        onMouseEnter={e=>{(e.currentTarget as HTMLImageElement).style.transform='scale(1.06)';}}
        onMouseLeave={e=>{(e.currentTarget as HTMLImageElement).style.transform='scale(1)';}}
        onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
      />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.58) 0%,transparent 55%)'}}/>
      <div style={{position:'absolute',bottom:12,left:14}}>
        <div style={{fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,color:'#fff',lineHeight:1}}>{m.label}</div>
        <div style={{fontFamily:'Outfit,sans-serif',fontSize:10,color:'rgba(255,255,255,0.65)',marginTop:3}}>📍 {m.location}</div>
      </div>
    </div>
  );
}

// ─── left feature card (raw image, no phone wrapper) ─
function FeatureCard() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;

    gsap.set(el,  { opacity:0, x:-40 });
    gsap.set(img, { opacity:0, y:30, scale:0.94 });

    gsap.to(el, {
      opacity:1, x:0, duration:1, ease:'power3.out',
      scrollTrigger:{ trigger:el, start:'top 85%', once:true },
    });
    gsap.to(img, {
      opacity:1, y:0, scale:1, duration:1.1, delay:0.25, ease:'power3.out',
      scrollTrigger:{ trigger:el, start:'top 85%', once:true },
    });
  }, []);

  return (
    <div ref={ref} style={{
      background:'linear-gradient(145deg,#1a0f2a,#2a1a4a)',
      borderRadius:24, padding:'24px 22px',
      display:'flex', flexDirection:'column',
      position:'relative', overflow:'hidden',
      height:'100%',
    }}>
      {/* bg glow */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 75% 20%,rgba(154,106,205,0.16) 0%,transparent 60%)',pointerEvents:'none'}}/>

      {/* badge */}
      {/* <div style={{display:'inline-flex',alignItems:'center',gap:7,marginBottom:10,flexShrink:0}}>
        <div style={{width:24,height:24,borderRadius:'50%',background:'linear-gradient(135deg,#c9a84c,#8b6914)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:10,color:'#fff'}}>3</div>
        <span style={{fontFamily:'Outfit,sans-serif',fontSize:9,fontWeight:700,color:'#c9a84c',letterSpacing:'0.18em',textTransform:'uppercase'}}>Your Memory Book</span>
      </div> */}

      <h3 style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:22,color:'#f5f0e8',lineHeight:1.15,marginBottom:8,flexShrink:0}}>
        Every photo. Every moment.
      </h3>
      <p style={{fontFamily:'Outfit,sans-serif',fontSize:12,color:'rgba(245,240,232,0.52)',lineHeight:1.6,marginBottom:14,flexShrink:0}}>
        Kafira auto-curates your travel gallery — sorted by trip, destination, and mood.
      </p>

      {/* floating stats row */}
      {/* <div style={{display:'flex',gap:10,marginBottom:14,flexShrink:0}}>
        {[['50K+','Travelers'],['4.9★','Rating'],['120+','Destinations']].map(([v,l])=>(
          <div key={l} style={{background:'rgba(255,255,255,0.07)',borderRadius:10,padding:'6px 10px',flex:1,textAlign:'center',border:'1px solid rgba(255,255,255,0.1)'}}>
            <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:15,color:'#c9a84c',lineHeight:1}}>{v}</div>
            <div style={{fontFamily:'Outfit,sans-serif',fontSize:9,color:'rgba(245,240,232,0.45)',marginTop:3}}>{l}</div>
          </div>
        ))}
      </div> */}

      {/* raw image — fixed height so left card doesn't balloon */}
      <div ref={imgRef} style={{
        borderRadius:16, overflow:'hidden', position:'relative',
        height:600,
        flexShrink:0,
        transform:'rotate(1.5deg)',
        boxShadow:'0 20px 50px rgba(0,0,0,0.35)',
      }}>
        <img
          src="/image-3.png" alt="Memories"
          style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}
          onError={e=>{
            const el = e.currentTarget as HTMLImageElement;
            el.parentElement!.style.background='linear-gradient(145deg,rgba(154,106,205,0.2),rgba(154,106,205,0.05))';
            el.style.display='none';
          }}
        />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(26,15,42,0.7) 0%,transparent 50%)',pointerEvents:'none'}}/>
        {/* label */}
        {/* <div style={{position:'absolute',bottom:12,left:14}}>
          <div style={{fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:600,color:'#fff',lineHeight:1}}>📸 Your memories, beautifully saved</div>
        </div> */}
      </div>
    </div>
  );
}

// ─── Section heading ─────────────────────────────────
function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    gsap.set(el,{opacity:0,y:32});
    gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
  },[]);
  return (
    <div ref={ref} style={{textAlign:'center',maxWidth:560,margin:'0 auto 32px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:12}}>
        <div style={{height:1,width:26,background:'linear-gradient(to right,transparent,#c9a84c)'}}/>
        <span style={{fontFamily:'Outfit,sans-serif',fontSize:10,fontWeight:700,color:'#c9a84c',letterSpacing:'0.22em',textTransform:'uppercase'}}>Step 03 — Memories</span>
        <div style={{height:1,width:26,background:'linear-gradient(to left,transparent,#c9a84c)'}}/>
      </div>
      <h2 style={{fontFamily:'Playfair Display,serif',fontWeight:800,fontSize:'clamp(26px,3.2vw,46px)',lineHeight:1.1,color:'#1a1510',marginBottom:12}}>
        Every trip becomes<br/><span style={{fontStyle:'italic',color:'#c9a84c'}}>a story worth telling</span>
      </h2>
      <p style={{fontFamily:'Outfit,sans-serif',fontSize:15,color:'#6b5e4e',lineHeight:1.65}}>
        From summit sunrises to backwater sunsets — your Kafira gallery keeps every frame.
      </p>
    </div>
  );
}

// ─── CTA strip ───────────────────────────────────────
function CTAStrip() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    gsap.set(el,{opacity:0,y:24});
    gsap.to(el,{opacity:1,y:0,duration:0.9,delay:0.3,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}});
  },[]);
  return (
    <div ref={ref} style={{
      background:'linear-gradient(135deg,#c9a84c,#8b6914)',
      borderRadius:20, padding:'22px 28px',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      flexWrap:'wrap', gap:16, marginTop:14,
    }}>
      <div>
        <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:18,color:'#fff',lineHeight:1.2}}>Ready to start your story?</div>
        <div style={{fontFamily:'Outfit,sans-serif',fontSize:12,color:'rgba(255,255,255,0.75)',marginTop:4}}>Join 50,000+ travelers who've trusted Kafira</div>
      </div>
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        <a href="#tours" style={{padding:'10px 22px',borderRadius:999,background:'#fff',color:'#8b6914',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:700,textDecoration:'none',transition:'all 0.25s',whiteSpace:'nowrap'}}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)';}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='none';el.style.boxShadow='none';}}
        >Plan My Trip</a>
        <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
          style={{padding:'10px 22px',borderRadius:999,background:'rgba(255,255,255,0.15)',color:'#fff',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.35)',transition:'all 0.25s',whiteSpace:'nowrap'}}
          onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,0.25)';}}
          onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,0.15)';}}
        >WhatsApp Us</a>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────
export default function MemoriesSection() {
  return (
    <section id="memories" style={{
      background:'#fff',
      padding:'72px 0 56px',
      display:'flex', flexDirection:'column', justifyContent:'center',
    }}>
      <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',width:'100%'}}>
        <SectionHeading/>

        {/* ── 2 col: left feature | right 2×2 grid ── */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:16,
          alignItems:'stretch',
        }}>

          {/* LEFT: feature card with raw image */}
          <FeatureCard/>

          {/* RIGHT: 2×2 uniform photo grid */}
          <div style={{
            background:'#faf7f2', borderRadius:24, padding:'20px',
            border:'1px solid rgba(0,0,0,0.06)',
            display:'flex', flexDirection:'column', gap:10,
          }}>
            <div style={{fontFamily:'Outfit,sans-serif',fontSize:10,fontWeight:700,color:'#c9a84c',letterSpacing:'0.18em',textTransform:'uppercase'}}>📸 Recent memories</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,flex:1}}>
              {MEMORIES.map((m,i) => <MemoryPhoto key={i} m={m} i={i}/>)}
            </div>
          </div>
        </div>

        {/* CTA strip below both columns */}
        <CTAStrip/>
      </div>

      <style>{`
        /* DESKTOP: cap photo height so 2×2 grid stays compact */
        @media (min-width:769px){
          .memory-photo {
            aspect-ratio: unset !important;
            height: 300px !important;
          }
        }
        /* MOBILE: stack columns, restore square ratio — untouched */
        @media (max-width:768px){
          #memories > div > div:nth-child(2){
            grid-template-columns: 1fr !important;
          }
          .memory-photo {
            aspect-ratio: 1/1 !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}