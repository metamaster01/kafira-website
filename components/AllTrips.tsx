'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clock, MapPin, Users, Star, Calendar,
  ArrowRight, Mountain, Compass, Palmtree, Camera,
  CheckCircle2, XCircle, X, MessageCircle, Phone, User,
} from 'lucide-react';
import TRIPS from '../data/upcomingTrips';
import type { Trip } from '../data/upcomingTrips';

gsap.registerPlugin(ScrollTrigger);

const C = {
  bg:'#ffffff', bgAlt:'#faf7f2', text:'#1a1510', sub:'#6b5e4e',
  muted:'#a89880', border:'rgba(0,0,0,0.07)',
  gold:'#c9a84c', goldDk:'#8b6914',
  goldBg:'rgba(201,168,76,0.09)', goldBd:'rgba(201,168,76,0.2)',
};

const DIFF_COLOR: Record<string,string> = {
  Easy:'#22c55e', Moderate:'#f59e0b', Challenging:'#ef4444', Extreme:'#8b5cf6',
};

function CatIcon({ cat, size=14 }:{ cat:string; size?:number }) {
  const p = { size, strokeWidth:1.8 };
  if (cat==='trek')      return <Mountain {...p}/>;
  if (cat==='road-trip') return <Compass {...p}/>;
  if (cat==='nature')    return <Palmtree {...p}/>;
  if (cat==='cultural')  return <Camera {...p}/>;
  return <Compass {...p}/>;
}

// ── Field (outside form to prevent remount) ───────────
function Field({ label, error, children }:{ label:string; error?:string; children:React.ReactNode }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontFamily:'Outfit,sans-serif', fontSize:12, fontWeight:600, color:C.sub }}>{label}</label>
      {children}
      {error && <span style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'#ef4444' }}>{error}</span>}
    </div>
  );
}

// ── Enquiry Form ──────────────────────────────────────
function EnquiryForm({ trip, onClose }:{ trip:Trip; onClose:()=>void }) {
  const [form, setForm] = useState({ name:'', phone:'', people:'1', date:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e:Record<string,string> = {};
    if (!form.name.trim())            e.name  = 'Please enter your name';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
    if (!form.date)                   e.date  = 'Please select preferred month';
    return e;
  };

  const buildMsg = () => encodeURIComponent([
    '🏕 *Kafira Trip Enquiry*','',
    `*Trip:* ${trip.name}`,`*Duration:* ${trip.duration}`,
    `*Route:* ${trip.location}`,
    `*Price:* ₹${trip.discountedPrice.toLocaleString('en-IN')} per person`,'',
    '*My Details:*',`👤 Name: ${form.name}`,`📞 Phone: ${form.phone}`,
    `👥 People: ${form.people}`,`📅 Month: ${form.date}`,'',
    'Please share available dates and booking process. Thank you!',
  ].join('\n'));

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    window.open(`https://wa.me/919999999999?text=${buildMsg()}`, '_blank');
    onClose();
  };

  const inputSt = (err?:boolean): React.CSSProperties => ({
    padding:'10px 12px', borderRadius:10,
    border:`1px solid ${err ? '#ef4444' : C.border}`,
    fontFamily:'Outfit,sans-serif', fontSize:13, color:C.text,
    background:C.bgAlt, outline:'none', width:'100%',
  });

  return (
    <div style={{ background:C.bg, borderRadius:20, padding:'22px', border:`1px solid ${C.border}`, boxShadow:'0 8px 32px rgba(0,0,0,0.07)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
        <div style={{ width:34,height:34,borderRadius:10,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.25)',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <MessageCircle size={17} color="#25d366"/>
        </div>
        <div>
          <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:13,color:C.text }}>Quick Enquiry via WhatsApp</div>
          <div style={{ fontFamily:'Outfit,sans-serif',fontSize:11,color:C.muted }}>We respond within 2 hours</div>
        </div>
      </div>

      {/* trip chip */}
      <div style={{ background:C.goldBg,border:`1px solid ${C.goldBd}`,borderRadius:12,padding:'10px 14px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:13,color:C.text }}>{trip.name}</div>
          <div style={{ fontFamily:'Outfit,sans-serif',fontSize:11,color:C.muted }}>{trip.duration} · {trip.location}</div>
        </div>
        <div style={{ fontFamily:'Playfair Display,serif',fontWeight:800,fontSize:15,color:C.goldDk }}>
          ₹{trip.discountedPrice.toLocaleString('en-IN')}
          <span style={{ fontSize:10,fontWeight:400,color:C.muted }}>/pp</span>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <Field label="Your Name *" error={errors.name}>
          <div style={{ position:'relative' }}>
            <User size={13} style={{ position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:C.muted }}/>
            <input placeholder="e.g. Arjun Sharma" value={form.name}
              onChange={e=>{ setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:''})); }}
              style={{ ...inputSt(!!errors.name), paddingLeft:30 }}/>
          </div>
        </Field>

        <Field label="Phone Number *" error={errors.phone}>
          <div style={{ position:'relative' }}>
            <Phone size={13} style={{ position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:C.muted }}/>
            <input placeholder="10-digit mobile number" value={form.phone} maxLength={10}
              onChange={e=>{ setForm(f=>({...f,phone:e.target.value.replace(/\D/g,'')})); setErrors(er=>({...er,phone:''})); }}
              style={{ ...inputSt(!!errors.phone), paddingLeft:30 }}/>
          </div>
        </Field>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <Field label="No. of People">
            <select value={form.people} onChange={e=>setForm(f=>({...f,people:e.target.value}))}
              style={{ ...inputSt(), appearance:'none', cursor:'pointer' }}>
              {Array.from({length:20},(_,i)=>i+1).map(n=>(
                <option key={n} value={n}>{n} {n===1?'person':'people'}</option>
              ))}
            </select>
          </Field>
          <Field label="Preferred Month *" error={errors.date}>
            <select value={form.date} onChange={e=>{ setForm(f=>({...f,date:e.target.value})); setErrors(er=>({...er,date:''})); }}
              style={{ ...inputSt(!!errors.date), appearance:'none', cursor:'pointer' }}>
              <option value="">Select month</option>
              {trip.monthTags.map(m=><option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
        </div>

        <button onClick={submit} style={{
          padding:'12px', borderRadius:12,
          background:'linear-gradient(135deg,#25d366,#1da851)',
          color:'#fff', fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:14,
          border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          boxShadow:'0 6px 20px rgba(37,211,102,0.3)',
          transition:'all 0.25s',
        }}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 10px 28px rgba(37,211,102,0.4)';}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.transform='none';el.style.boxShadow='0 6px 20px rgba(37,211,102,0.3)';}}
        >
          <MessageCircle size={17}/> Send Enquiry on WhatsApp
        </button>
        <p style={{ fontFamily:'Outfit,sans-serif',fontSize:11,color:C.muted,textAlign:'center',lineHeight:1.5 }}>
          Opens WhatsApp with your details pre-filled.
        </p>
      </div>
    </div>
  );
}

// ── Trip Modal ────────────────────────────────────────
function TripModal({ trip, onClose }:{ trip:Trip; onClose:()=>void }) {
  const [tab, setTab] = useState<'overview'|'itinerary'|'inclusions'|'terms'>('overview');
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    document.body.style.overflow='hidden';
    const ov=overlayRef.current; const pa=panelRef.current; if(!ov||!pa) return;
    gsap.fromTo(ov,{opacity:0},{opacity:1,duration:0.3});
    gsap.fromTo(pa,{opacity:0,y:36,scale:0.97},{opacity:1,y:0,scale:1,duration:0.42,ease:'power3.out'});
    return ()=>{ document.body.style.overflow=''; };
  },[]);

  const close=()=>{
    const ov=overlayRef.current; const pa=panelRef.current; if(!ov||!pa){onClose();return;}
    gsap.to(pa,{opacity:0,y:20,scale:0.98,duration:0.28,ease:'power3.in'});
    gsap.to(ov,{opacity:0,duration:0.28,onComplete:onClose});
  };

  const TABS=[{id:'overview',label:'Overview'},{id:'itinerary',label:'Itinerary'},{id:'inclusions',label:'Inclusions'},{id:'terms',label:'Terms'}] as const;

  return (
    <div ref={overlayRef} onClick={e=>{if(e.target===overlayRef.current)close();}}
      style={{ position:'fixed',inset:0,zIndex:1000,background:'rgba(10,8,6,0.75)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',overflowY:'auto' }}>
      <div ref={panelRef} style={{ width:'100%',maxWidth:980,background:C.bg,borderRadius:24,overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,0.35)',display:'grid',gridTemplateColumns:'1fr 360px',maxHeight:'90vh',position:'relative' }}>

        {/* LEFT detail */}
        <div style={{ overflowY:'auto',display:'flex',flexDirection:'column' }}>
          {/* hero */}
          <div style={{ position:'relative',height:240,flexShrink:0,background:'linear-gradient(145deg,#1a2a3a,#1a3a2a)' }}>
            <img src={trip.image} alt={trip.name} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }} onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none';}}/>
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)',pointerEvents:'none' }}/>
            <button onClick={close} style={{ position:'absolute',top:14,right:14,width:34,height:34,borderRadius:'50%',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff',transition:'all 0.2s' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,0.8)';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(0,0,0,0.55)';}}
            ><X size={17}/></button>
            <div style={{ position:'absolute',bottom:16,left:20,right:20 }}>
              <div style={{ fontFamily:'Playfair Display,serif',fontWeight:800,fontSize:24,color:'#fff',lineHeight:1.15,marginBottom:6 }}>{trip.name}</div>
              <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
                <span style={{ background:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',borderRadius:999,padding:'3px 10px',fontFamily:'Outfit,sans-serif',fontSize:11,color:'#fff',border:'1px solid rgba(255,255,255,0.2)' }}>{trip.state}</span>
                <span style={{ background:DIFF_COLOR[trip.difficulty],borderRadius:999,padding:'3px 10px',fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:700,color:'#fff' }}>{trip.difficulty}</span>
                <span style={{ background:'rgba(201,168,76,0.85)',borderRadius:999,padding:'3px 10px',fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:700,color:'#fff',display:'flex',alignItems:'center',gap:3 }}>
                  <Star size={10} fill="#fff" color="#fff"/> {trip.rating} ({trip.reviews})
                </span>
              </div>
            </div>
          </div>

          {/* stats */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,borderBottom:`1px solid ${C.border}`,flexShrink:0 }}>
            {[{icon:<Clock size={13}/>,label:'Duration',val:trip.duration},{icon:<Calendar size={13}/>,label:'Season',val:trip.months},{icon:<Users size={13}/>,label:'Group',val:trip.groupSize},{icon:<MapPin size={13}/>,label:'Route',val:trip.location}].map((s,i)=>(
              <div key={i} style={{ padding:'11px 14px',borderRight:i<3?`1px solid ${C.border}`:'none',textAlign:'center' }}>
                <div style={{ color:C.gold,display:'flex',justifyContent:'center',marginBottom:2 }}>{s.icon}</div>
                <div style={{ fontFamily:'Outfit,sans-serif',fontSize:9,color:C.muted,marginBottom:1,textTransform:'uppercase',letterSpacing:'0.08em' }}>{s.label}</div>
                <div style={{ fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:700,color:C.text }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* tabs */}
          <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${C.border}`,flexShrink:0 }}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1,padding:'11px 8px',border:'none',cursor:'pointer',background:'none',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,color:tab===t.id?C.goldDk:C.muted,borderBottom:tab===t.id?`2px solid ${C.gold}`:'2px solid transparent',transition:'all 0.2s' }}>{t.label}</button>
            ))}
          </div>

          {/* tab content */}
          <div style={{ padding:'18px 22px',flex:1,overflowY:'auto' }}>
            {tab==='overview' && (
              <div style={{ display:'flex',flexDirection:'column',gap:18 }}>
                <p style={{ fontFamily:'Outfit,sans-serif',fontSize:14,color:C.sub,lineHeight:1.78 }}>{trip.overview}</p>
                <div>
                  <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:11,color:C.gold,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:10 }}>Highlights</div>
                  {trip.highlights.map((h,i)=>(
                    <div key={i} style={{ display:'flex',gap:10,alignItems:'flex-start',marginBottom:7 }}>
                      <div style={{ width:17,height:17,borderRadius:'50%',background:C.goldBg,border:`1px solid ${C.goldBd}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1 }}>
                        <span style={{ fontSize:7,color:C.gold }}>✦</span>
                      </div>
                      <span style={{ fontFamily:'Outfit,sans-serif',fontSize:13,color:C.text,lineHeight:1.55 }}>{h}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:11,color:C.gold,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:8 }}>What to Carry</div>
                  <div style={{ display:'flex',flexWrap:'wrap',gap:6 }}>
                    {trip.thingsToCarry.map((t,i)=>(
                      <span key={i} style={{ fontFamily:'Outfit,sans-serif',fontSize:11,color:C.sub,background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:8,padding:'4px 10px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {tab==='itinerary' && (
              <div>
                {trip.itinerary.map((day,i)=>(
                  <div key={i} style={{ display:'flex',gap:12,paddingBottom:14,position:'relative' }}>
                    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0 }}>
                      <div style={{ width:26,height:26,borderRadius:'50%',background:`linear-gradient(135deg,${C.gold},${C.goldDk})`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:10,color:'#fff',zIndex:1 }}>{day.day}</div>
                      {i<trip.itinerary.length-1 && <div style={{ flex:1,width:2,background:`linear-gradient(to bottom,${C.goldBd},transparent)`,marginTop:3 }}/>}
                    </div>
                    <div style={{ flex:1,paddingTop:3 }}>
                      <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:13,color:C.text,marginBottom:5 }}>{day.title}</div>
                      {day.activities.map((act,j)=>(
                        <div key={j} style={{ display:'flex',gap:6,alignItems:'flex-start',marginBottom:3 }}>
                          <div style={{ width:4,height:4,borderRadius:'50%',background:C.gold,flexShrink:0,marginTop:5 }}/>
                          <span style={{ fontFamily:'Outfit,sans-serif',fontSize:12,color:C.sub,lineHeight:1.5 }}>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab==='inclusions' && (
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:18 }}>
                <div>
                  <div style={{ display:'flex',alignItems:'center',gap:7,marginBottom:10 }}><CheckCircle2 size={15} color="#22c55e"/><span style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:13,color:C.text }}>Inclusions</span></div>
                  {trip.inclusions.map((inc,i)=>(
                    <div key={i} style={{ display:'flex',gap:8,alignItems:'flex-start',marginBottom:7 }}>
                      <div style={{ width:15,height:15,borderRadius:'50%',background:'rgba(34,197,94,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1 }}>
                        <span style={{ fontSize:8,color:'#22c55e' }}>✓</span>
                      </div>
                      <span style={{ fontFamily:'Outfit,sans-serif',fontSize:12,color:C.text,lineHeight:1.5 }}>{inc}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display:'flex',alignItems:'center',gap:7,marginBottom:10 }}><XCircle size={15} color="#ef4444"/><span style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:13,color:C.text }}>Exclusions</span></div>
                  {trip.exclusions.map((exc,i)=>(
                    <div key={i} style={{ display:'flex',gap:8,alignItems:'flex-start',marginBottom:7 }}>
                      <div style={{ width:15,height:15,borderRadius:'50%',background:'rgba(239,68,68,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1 }}>
                        <span style={{ fontSize:8,color:'#ef4444' }}>✕</span>
                      </div>
                      <span style={{ fontFamily:'Outfit,sans-serif',fontSize:12,color:C.sub,lineHeight:1.5 }}>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab==='terms' && (
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                <p style={{ fontFamily:'Outfit,sans-serif',fontSize:13,color:C.muted,marginBottom:6,lineHeight:1.6 }}>Please read before booking:</p>
                {trip.terms.map((t,i)=>(
                  <div key={i} style={{ display:'flex',gap:10,alignItems:'flex-start',padding:'10px 12px',background:C.bgAlt,borderRadius:10,border:`1px solid ${C.border}` }}>
                    <span style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:10,color:C.gold,flexShrink:0,marginTop:1 }}>0{i+1}</span>
                    <span style={{ fontFamily:'Outfit,sans-serif',fontSize:12,color:C.text,lineHeight:1.6 }}>{t}</span>
                  </div>
                ))}
                <div style={{ marginTop:6,padding:'12px 14px',background:C.goldBg,borderRadius:12,border:`1px solid ${C.goldBd}` }}>
                  <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:10,color:C.goldDk,marginBottom:6 }}>MEETING & END POINTS</div>
                  {[{l:'Meet at:',v:trip.meetingPoint},{l:'Trip ends:',v:trip.endPoint}].map((p,i)=>(
                    <div key={i} style={{ display:'flex',gap:8,alignItems:'flex-start',marginBottom:i===0?6:0 }}>
                      <span style={{ fontFamily:'Outfit,sans-serif',fontSize:10,color:C.muted,minWidth:56 }}>{p.l}</span>
                      <span style={{ fontFamily:'Outfit,sans-serif',fontSize:12,color:C.text,fontWeight:500,lineHeight:1.4 }}>{p.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: form */}
        <div style={{ background:C.bgAlt,borderLeft:`1px solid ${C.border}`,padding:'22px',overflowY:'auto' }}>
          <div style={{ fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:18,color:C.text,marginBottom:4 }}>Book This Trip</div>
          <div style={{ fontFamily:'Outfit,sans-serif',fontSize:12,color:C.muted,marginBottom:18,lineHeight:1.5 }}>
            Fill in your details and we'll connect on WhatsApp to confirm dates.
          </div>
          <EnquiryForm trip={trip} onClose={close}/>
        </div>
      </div>
    </div>
  );
}

// ── Trip Card ─────────────────────────────────────────
function TripCard({ trip, onClick }:{ trip:Trip; onClick:()=>void }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const el=ref.current; if(!el) return;
    gsap.set(el,{opacity:0,y:24,scale:0.97});
    gsap.to(el,{opacity:1,y:0,scale:1,duration:0.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
  },[]);

  return (
    <div ref={ref} onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{
        borderRadius:18, overflow:'hidden', background:C.bg,
        border:`1px solid ${hover?C.goldBd:C.border}`,
        cursor:'pointer',
        transition:'all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform:hover?'translateY(-6px)':'none',
        boxShadow:hover?'0 20px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(201,168,76,0.18)':'0 3px 12px rgba(0,0,0,0.06)',
        opacity:0,
      }}>
      {/* image */}
      <div style={{ position:'relative',height:185,overflow:'hidden',background:'linear-gradient(145deg,#1a2a3a,#1a3a2a)' }}>
        <img src={trip.image} alt={trip.name}
          style={{ width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform 0.5s ease',transform:hover?'scale(1.07)':'scale(1)' }}
          onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none';}}/>
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.08) 55%,transparent 100%)',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',top:10,left:10,right:10,display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
          <div style={{ display:'flex',alignItems:'center',gap:4,background:'rgba(0,0,0,0.5)',backdropFilter:'blur(8px)',borderRadius:999,padding:'3px 9px',border:'1px solid rgba(255,255,255,0.15)' }}>
            <CatIcon cat={trip.category} size={11}/>
            <span style={{ fontFamily:'Outfit,sans-serif',fontSize:9,fontWeight:600,color:'#fff',textTransform:'capitalize' }}>{trip.category.replace('-',' ')}</span>
          </div>
          <div style={{ background:DIFF_COLOR[trip.difficulty],borderRadius:999,padding:'3px 9px',fontFamily:'Outfit,sans-serif',fontSize:9,fontWeight:700,color:'#fff' }}>{trip.difficulty}</div>
        </div>
        <div style={{ position:'absolute',bottom:10,left:10,right:10,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <div style={{ display:'flex',alignItems:'center',gap:4 }}>
            <MapPin size={10} color="rgba(255,255,255,0.85)"/>
            <span style={{ fontFamily:'Outfit,sans-serif',fontSize:10,color:'rgba(255,255,255,0.9)',fontWeight:500 }}>{trip.location}</span>
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:3,background:'rgba(201,168,76,0.9)',borderRadius:999,padding:'2px 7px' }}>
            <Star size={9} fill="#fff" color="#fff"/>
            <span style={{ fontFamily:'Outfit,sans-serif',fontSize:9,fontWeight:700,color:'#fff' }}>{trip.rating}</span>
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ padding:'14px 16px' }}>
        <h3 style={{ fontFamily:'Playfair Display,serif',fontWeight:700,fontSize:15,color:C.text,lineHeight:1.2,marginBottom:2 }}>{trip.name}</h3>
        <p style={{ fontFamily:'Outfit,sans-serif',fontSize:11,color:C.muted,lineHeight:1.35,marginBottom:10 }}>{trip.subtitle}</p>
        <div style={{ display:'flex',gap:10,marginBottom:10,flexWrap:'wrap' }}>
          {[{icon:<Clock size={11}/>,text:trip.duration},{icon:<Calendar size={11}/>,text:trip.months},{icon:<Users size={11}/>,text:trip.groupSize}].map((m,i)=>(
            <div key={i} style={{ display:'flex',alignItems:'center',gap:3 }}>
              <span style={{ color:C.gold }}>{m.icon}</span>
              <span style={{ fontFamily:'Outfit,sans-serif',fontSize:10,color:C.sub }}>{m.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex',gap:4,flexWrap:'wrap',marginBottom:12 }}>
          {trip.tags.slice(0,2).map(tag=>(
            <span key={tag} style={{ fontFamily:'Outfit,sans-serif',fontSize:9,fontWeight:500,color:C.goldDk,background:C.goldBg,border:`1px solid ${C.goldBd}`,borderRadius:999,padding:'2px 7px' }}>{tag}</span>
          ))}
        </div>
        <div style={{ height:1,background:C.border,marginBottom:10 }}/>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'inline-block',background:'#ef4444',borderRadius:5,padding:'1px 6px',fontFamily:'Outfit,sans-serif',fontSize:8,fontWeight:700,color:'#fff',marginBottom:3 }}>{trip.discountLabel}</div>
            <div style={{ display:'flex',alignItems:'baseline',gap:5 }}>
              <span style={{ fontFamily:'Outfit,sans-serif',fontSize:11,color:C.muted,textDecoration:'line-through' }}>₹{trip.originalPrice.toLocaleString('en-IN')}</span>
              <span style={{ fontFamily:'Playfair Display,serif',fontWeight:800,fontSize:17,color:C.text }}>₹{trip.discountedPrice.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ fontFamily:'Outfit,sans-serif',fontSize:9,color:C.muted }}>per person</div>
          </div>
          <button style={{
            padding:'8px 14px',borderRadius:10,
            background:'linear-gradient(135deg,#c9a84c,#8b6914)',
            color:'#0c0a08',fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:700,
            border:'none',cursor:'pointer',
            display:'flex',alignItems:'center',gap:4,
            transition:'box-shadow 0.25s',
            boxShadow:hover?'0 5px 16px rgba(201,168,76,0.4)':'none',
          }}>
            View <ArrowRight size={12}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main AllTrips ─────────────────────────────────────
export default function AllTrips() {
  const [selected, setSelected] = useState<Trip|null>(null);
  const headRef = useRef<HTMLDivElement>(null);

  // Desktop: show 12  |  we load all TRIPS (not just featured)
  // On mobile CSS grid switches to 2 cols
  const trips = TRIPS.slice(0, 12);

  useEffect(()=>{
    const el=headRef.current; if(!el) return;
    gsap.set(el,{opacity:0,y:28});
    gsap.to(el,{opacity:1,y:0,duration:0.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
  },[]);

  return (
    <>
      <section id="tours" style={{ background:C.bgAlt, padding:'96px 0 80px', overflow:'hidden' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>

          {/* heading */}
          <div ref={headRef} style={{ opacity:0, marginBottom:48 }}>
            <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:12 }}>
              <div style={{ height:1,width:24,background:`linear-gradient(to right,transparent,${C.gold})` }}/>
              <span style={{ fontFamily:'Outfit,sans-serif',fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.22em',textTransform:'uppercase' }}>All Trips & Packages</span>
            </div>
            <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:16 }}>
              <div>
                <h2 style={{ fontFamily:'Playfair Display,serif',fontWeight:800,fontSize:'clamp(26px,3vw,46px)',color:C.text,lineHeight:1.1,marginBottom:8 }}>
                  Every journey,{' '}
                  <span style={{ fontStyle:'italic',color:C.gold }}>one place.</span>
                </h2>
                <p style={{ fontFamily:'Outfit,sans-serif',fontSize:15,color:C.sub,lineHeight:1.65,maxWidth:520 }}>
                  Browse our complete collection of handcrafted trips across India — treks, road trips, cultural tours, and more.
                </p>
              </div>
              <div style={{ fontFamily:'Outfit,sans-serif',fontSize:13,color:C.muted,background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,padding:'8px 14px' }}>
                {trips.length} trips available
              </div>
            </div>
          </div>

          {/* 4-col grid — switches to 2-col on mobile via CSS */}
          <div className="all-trips-grid" style={{
            display:'grid',
            gridTemplateColumns:'repeat(4,1fr)',
            gap:20,
          }}>
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} onClick={()=>setSelected(trip)}/>
            ))}
          </div>
        </div>
      </section>

      {selected && <TripModal trip={selected} onClose={()=>setSelected(null)}/>}

      <style>{`
        @media (max-width: 1100px) { .all-trips-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 768px)  { .all-trips-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px)  { .all-trips-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}