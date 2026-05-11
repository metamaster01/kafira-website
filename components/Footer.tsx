'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const COLS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us',            href: '#about' },
      { label: 'Our Story',           href: '#' },
      { label: 'Meet the Team',       href: '#' },
      { label: 'Careers',             href: '#' },
      { label: 'Press & Media',       href: '#' },
      { label: 'Partner With Us',     href: '#' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'All Destinations',    href: '#destinations' },
      { label: 'Rajasthan',           href: '#' },
      { label: 'Kerala Backwaters',   href: '#' },
      { label: 'Himalayan Escapes',   href: '#' },
      { label: 'Goa & Beaches',       href: '#' },
      { label: 'International',       href: '#' },
    ],
  },
  {
    title: 'Experience',
    links: [
      { label: 'Group Tours',         href: '#tours' },
      { label: 'Private Journeys',    href: '#' },
      { label: 'Luxury Getaways',     href: '#' },
      { label: 'Adventure Trips',     href: '#' },
      { label: 'Honeymoon Packages',  href: '#' },
      { label: 'Corporate Tours',     href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us',          href: '#' },
      { label: 'FAQs',                href: '#' },
      { label: 'Booking Policy',      href: '#' },
      { label: 'Cancellation Policy', href: '#' },
      { label: 'Privacy Policy',      href: '#' },
      { label: 'Terms & Conditions',  href: '#' },
    ],
  },
];

const SOCIALS = [
  { label:'Instagram', href:'#', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg> },
  { label:'Facebook',  href:'#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label:'YouTube',   href:'#', icon: <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 3.57A2.78 2.78 0 0 0 20.59 1.6C18.88 1.12 12 1.12 12 1.12s-6.88 0-8.59.48A2.78 2.78 0 0 0 1.46 3.57 29 29 0 0 0 1 9a29 29 0 0 0 .46 5.43A2.78 2.78 0 0 0 3.41 16.4C5.12 16.88 12 16.88 12 16.88s6.88 0 8.59-.48a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 9a29 29 0 0 0-.46-5.43z"/><polygon points="9.75 12.02 15.5 9 9.75 5.98 9.75 12.02" fill="currentColor" stroke="none"/></svg> },
  { label:'X',         href:'#', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label:'WhatsApp',  href:'https://wa.me/919999999999', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
];

// ── Newsletter ────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent,  setSent]  = useState(false);
  const submit = () => {
    if (!email.includes('@')) return;
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(''); }, 3200);
  };
  return (
    <div>
      <p style={{ fontFamily:'Outfit,sans-serif', fontSize:13, color:'rgba(245,240,232,0.48)', lineHeight:1.65, marginBottom:14 }}>
        Exclusive deals, hidden gems, and travel stories — delivered to your inbox.
      </p>
      <div style={{
        display:'flex', background:'rgba(255,255,255,0.05)',
        border:'1px solid rgba(201,168,76,0.18)', borderRadius:12, overflow:'hidden',
        transition:'border-color 0.3s, box-shadow 0.3s',
      }}
        onFocusCapture={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(201,168,76,0.5)';el.style.boxShadow='0 0 0 3px rgba(201,168,76,0.07)';}}
        onBlurCapture={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(201,168,76,0.18)';el.style.boxShadow='none';}}
      >
        <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}
          style={{ flex:1, background:'transparent', border:'none', outline:'none', padding:'11px 14px', fontFamily:'Outfit,sans-serif', fontSize:13, color:'#f5f0e8' }}
        />
        <button onClick={submit} style={{
          margin:4, padding:'0 14px', borderRadius:9, border:'none', cursor:'pointer',
          background: sent ? 'rgba(74,173,106,0.85)' : 'linear-gradient(135deg,#c9a84c,#8b6914)',
          display:'flex', alignItems:'center', justifyContent:'center', minWidth:40,
          transition:'background 0.3s',
        }}>
          {sent
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            : <Send size={13} color="#0c0a08" strokeWidth={2.2}/>
          }
        </button>
      </div>
      {sent && <p style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'#4aad6a', marginTop:8 }}>✓ Welcome to the Kafira family!</p>}
    </div>
  );
}

// ── Reveal ────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.set(el, { opacity:0, y:30 });
    gsap.to(el, { opacity:1, y:0, duration:0.85, delay, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 92%', once:true } });
  }, [delay]);
  return ref;
}

// ── Main ──────────────────────────────────────────────
export default function Footer() {
  const lineRef  = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const brandRef = useReveal(0);
  const nlRef    = useReveal(0.1);
  const colRefs  = [useReveal(0.1), useReveal(0.18), useReveal(0.26), useReveal(0.34)];

  useEffect(() => {
    [lineRef, line2Ref].forEach((r,i) => {
      const el = r.current; if (!el) return;
      gsap.set(el, { scaleX:0, transformOrigin:'left center' });
      gsap.to(el, { scaleX:1, duration:1.1, delay:i*0.1, ease:'power2.inOut', scrollTrigger:{ trigger:el, start:'top 95%', once:true } });
    });
  }, []);

  return (
    <footer style={{ background:'#0c0a08', position:'relative', overflow:'hidden' }}>
      {/* ambient glows */}
      <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 70%)', top:-250, left:-150, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,0.03) 0%,transparent 70%)', bottom:-150, right:-100, pointerEvents:'none' }}/>

      {/* ── TOP CTA BAND ── */}
      <div style={{ background:'linear-gradient(135deg,rgba(201,168,76,0.07),rgba(139,105,20,0.05))', borderBottom:'1px solid rgba(201,168,76,0.1)', padding:'26px 40px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'clamp(17px,2vw,24px)', color:'#f5f0e8', lineHeight:1.2 }}>Ready for your next adventure?</div>
            <div style={{ fontFamily:'Outfit,sans-serif', fontSize:13, color:'rgba(245,240,232,0.45)', marginTop:4 }}>Let's craft a journey that stays with you forever.</div>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <a href="#tours" style={{ padding:'10px 22px', borderRadius:999, background:'linear-gradient(135deg,#c9a84c,#8b6914)', color:'#0c0a08', fontFamily:'Outfit,sans-serif', fontSize:13, fontWeight:700, textDecoration:'none', display:'flex', alignItems:'center', gap:6, transition:'all 0.25s' }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 8px 24px rgba(201,168,76,0.35)';}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='none';el.style.boxShadow='none';}}
            >Plan a Trip <ArrowUpRight size={14}/></a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
              style={{ padding:'10px 20px', borderRadius:999, background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.28)', color:'#25d366', fontFamily:'Outfit,sans-serif', fontSize:13, fontWeight:500, textDecoration:'none', display:'flex', alignItems:'center', gap:6, transition:'all 0.25s' }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.18)';el.style.transform='translateY(-2px)';}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(37,211,102,0.1)';el.style.transform='none';}}
            ><MessageCircle size={14}/>WhatsApp Us</a>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'56px 40px 44px' }}>

        {/* top row: brand + 4 link cols */}
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr repeat(4,1fr)', gap:36, alignItems:'start' }}>

          {/* Brand */}
          <div ref={brandRef} style={{ opacity:0 }}>
            <a href="/" style={{ display:'inline-block', marginBottom:18, textDecoration:'none' }}>
              <Image src="/logo.png" alt="Kafira" width={118} height={46} style={{ objectFit:'contain', display:'block' }}/>
            </a>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic', fontSize:15, color:'rgba(201,168,76,0.6)', lineHeight:1.65, marginBottom:20 }}>
              Crafting journeys,<br/>not just itineraries.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
              {[
                { icon:<MapPin size={12}/>, text:'Kafira Travel Pvt. Ltd., Mumbai, India' },
                { icon:<Phone size={12}/>,  text:'+91 99999 99999',  href:'tel:+919999999999' },
                { icon:<Mail size={12}/>,   text:'hello@kafira.in',   href:'mailto:hello@kafira.in' },
              ].map(({ icon, text, href }, i) => (
                href
                  ? <a key={i} href={href} style={{ display:'flex',alignItems:'flex-start',gap:8,color:'rgba(245,240,232,0.45)',fontFamily:'Outfit,sans-serif',fontSize:12,textDecoration:'none',lineHeight:1.5,transition:'color 0.2s' }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#c9a84c';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.45)';}}
                    ><span style={{ color:'rgba(201,168,76,0.55)', marginTop:1, flexShrink:0 }}>{icon}</span>{text}</a>
                  : <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:8,color:'rgba(245,240,232,0.45)',fontFamily:'Outfit,sans-serif',fontSize:12,lineHeight:1.5 }}>
                      <span style={{ color:'rgba(201,168,76,0.55)', marginTop:1, flexShrink:0 }}>{icon}</span>{text}
                    </div>
              ))}
            </div>
            {/* socials */}
            <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ width:34,height:34,borderRadius:10,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(245,240,232,0.45)',textDecoration:'none',transition:'all 0.25s' }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(201,168,76,0.12)';el.style.borderColor='rgba(201,168,76,0.35)';el.style.color='#c9a84c';el.style.transform='translateY(-3px)';}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(255,255,255,0.05)';el.style.borderColor='rgba(255,255,255,0.08)';el.style.color='rgba(245,240,232,0.45)';el.style.transform='none';}}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* 4 link cols */}
          {COLS.map((col, ci) => (
            <div key={col.title} ref={colRefs[ci]} style={{ opacity:0 }}>
              <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:11, color:'#c9a84c', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:18 }}>
                {col.title}
              </div>
              <div style={{ display:'flex', flexDirection:'column' }}>
                {col.links.map(link => (
                  <a key={link.label} href={link.href} style={{ fontFamily:'Outfit,sans-serif', fontSize:13, color:'rgba(245,240,232,0.48)', textDecoration:'none', padding:'5px 0', transition:'all 0.22s ease' }}
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='#f5f0e8';el.style.paddingLeft='7px';}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.color='rgba(245,240,232,0.48)';el.style.paddingLeft='0';}}
                  >{link.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* divider */}
        <div ref={lineRef} style={{ height:1, background:'rgba(201,168,76,0.1)', margin:'44px 0 36px' }}/>

        {/* newsletter + trust badges */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center' }}>
          <div ref={nlRef} style={{ opacity:0 }}>
            <div style={{ fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:19, color:'#f5f0e8', marginBottom:10 }}>
              Stay in the loop
            </div>
            <Newsletter/>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', flexWrap:'wrap', gap:14 }}>
            {[
              { icon:'🏆', label:'Best Travel Agency', sub:'India Travel Awards 2024' },
              { icon:'⭐', label:'4.9 / 5 Rating',     sub:'12,400+ verified reviews' },
              { icon:'✅', label:'Govt. Recognized',   sub:'Ministry of Tourism, India' },
            ].map((b,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'10px 14px', transition:'border-color 0.25s, transform 0.25s', cursor:'default' }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(201,168,76,0.25)';el.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(255,255,255,0.07)';el.style.transform='none';}}
              >
                <span style={{ fontSize:20 }}>{b.icon}</span>
                <div>
                  <div style={{ fontFamily:'Outfit,sans-serif', fontSize:11, fontWeight:700, color:'#f5f0e8', lineHeight:1 }}>{b.label}</div>
                  <div style={{ fontFamily:'Outfit,sans-serif', fontSize:9, color:'rgba(245,240,232,0.38)', marginTop:3 }}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div ref={line2Ref} style={{ height:1, background:'rgba(255,255,255,0.05)' }}/>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'16px 40px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
          <div style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'rgba(245,240,232,0.28)' }}>
            © 2015–2026 Kafira Travel Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display:'flex', gap:18, flexWrap:'wrap' }}>
            {['Privacy Policy','Terms & Conditions','Cookie Policy','Sitemap'].map(l => (
              <a key={l} href="#" style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'rgba(245,240,232,0.28)', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(201,168,76,0.65)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.28)';}}
              >{l}</a>
            ))}
          </div>
          <div style={{ fontFamily:'Outfit,sans-serif', fontSize:11, color:'rgba(245,240,232,0.2)' }}>Made with ❤️ in India</div>
        </div>
      </div>

      {/* responsive */}
      <style>{`
        @media (max-width:1024px){
          footer > div:nth-child(3) > div:first-child { grid-template-columns: 1fr 1fr 1fr !important; }
          footer > div:nth-child(3) > div:first-child > div:first-child { grid-column: 1 / -1; }
          footer > div:nth-child(3) > div:nth-child(3) { grid-template-columns: 1fr !important; }
          footer > div:nth-child(3) > div:nth-child(3) > div:last-child { justify-content: flex-start !important; }
        }
        @media (max-width:768px){
          footer > div:nth-child(2) { padding: 20px !important; }
          footer > div:nth-child(3) { padding: 36px 20px 28px !important; }
          footer > div:nth-child(3) > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer > div:nth-child(5) { padding: 14px 20px !important; }
          footer > div:nth-child(5) > div { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
        }
        @media (max-width:480px){
          footer > div:nth-child(3) > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}