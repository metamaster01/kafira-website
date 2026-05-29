'use client';
import { useState, useRef } from 'react';
import { MapPin, Mail, Phone, Send, Check, ChevronDown, Loader2 } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// ── Palette ───────────────────────────────────────────
const C = {
  bg:      '#f4f9f8',
  bgAlt:   '#eaf3f1',
  white:   '#ffffff',
  text:    '#0e1e1b',
  sub:     '#2d5a52',
  muted:   '#6b9e94',
  border:  'rgba(45,143,123,0.15)',
  borderFocus: 'rgba(45,143,123,0.55)',
  sea:     '#2d8f7b',
  seaDk:   '#1a6b58',
  seaLt:   '#3db89e',
  seaBg:   'rgba(45,143,123,0.07)',
  seaBd:   'rgba(45,143,123,0.22)',
  darkBg:  '#071a16',
  error:   '#ef4444',
};

const DESTINATIONS = [
  'Spiti Valley, Himachal Pradesh',
  'Leh–Ladakh',
  'Kedarkantha Trek, Uttarakhand',
  'Rajasthan Royal Tour',
  'Kerala Backwaters & Munnar',
  'Coorg, Karnataka',
  'Meghalaya Explorer',
  'Rishikesh Adventure',
  'Bali, Indonesia',
  'Vietnam Explorer',
  'Thailand Uncovered',
  'Japan — Land of the Rising Sun',
  'Dubai & Abu Dhabi',
  'European Highlights',
  'Custom / Not Sure Yet',
];

const TRAVEL_TYPES = [
  'Solo Trip', 'Couple Trip',
  'Family Vacation', 'Group Tour',
  'Adventure Trek', 'Honeymoon',
];

const ACCOMMODATIONS = [
  'Budget Hotels', 'Premium Hotels',
  'Luxury Resorts', 'Villas & Homestays',
];

// ── Input wrapper ─────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      fontFamily: '"Montserrat",sans-serif',
      fontSize: 11, fontWeight: 700,
      color: C.sub,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 8,
    }}>
      {children}
    </label>
  );
}

function InputBase({ style, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: '100%',
        padding: '13px 16px',
        borderRadius: 12,
        border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
        background: focused ? C.white : C.bgAlt,
        fontFamily: '"Inter",sans-serif',
        fontSize: 14,
        color: C.text,
        outline: 'none',
        transition: 'all 0.22s ease',
        boxSizing: 'border-box',
        boxShadow: focused ? `0 0 0 3px rgba(45,143,123,0.08)` : 'none',
        ...style,
      }}
    />
  );
}

// ── Checkbox pill ─────────────────────────────────────
function CheckPill({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 14px',
        borderRadius: 10,
        border: `1.5px solid ${checked ? C.sea : C.border}`,
        background: checked ? C.seaBg : C.white,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: checked ? `0 2px 10px rgba(45,143,123,0.15)` : 'none',
      }}
    >
      {/* custom checkbox */}
      <div style={{
        width: 16, height: 16, borderRadius: 5, flexShrink: 0,
        border: `1.5px solid ${checked ? C.sea : C.border}`,
        background: checked ? C.sea : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.18s ease',
      }}>
        {checked && <Check size={10} color="#fff" strokeWidth={3}/>}
      </div>
      <span style={{
        fontFamily: '"Inter",sans-serif',
        fontSize: 13, fontWeight: checked ? 600 : 400,
        color: checked ? C.sea : C.sub,
        transition: 'all 0.18s',
      }}>
        {label}
      </span>
    </button>
  );
}

// ── Counter input ─────────────────────────────────────
function Counter({
  label, value, onChange, min = 0, max = 20,
}: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div style={{
      background: C.bgAlt,
      border: `1.5px solid ${C.border}`,
      borderRadius: 12,
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span style={{ fontFamily: '"Inter",sans-serif', fontSize: 14, color: C.sub }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
          style={{ width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${C.seaBd}`, background: C.white, color: C.sea, cursor: value <= min ? 'not-allowed' : 'pointer', fontFamily: '"Inter",sans-serif', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: value <= min ? 0.4 : 1, transition: 'all 0.18s' }}>
          −
        </button>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: 20, color: C.text, minWidth: 24, textAlign: 'center', lineHeight: 1 }}>{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))}
          style={{ width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${C.seaBd}`, background: C.sea, color: '#fff', cursor: value >= max ? 'not-allowed' : 'pointer', fontFamily: '"Inter",sans-serif', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: value >= max ? 0.4 : 1, transition: 'all 0.18s' }}>
          +
        </button>
      </div>
    </div>
  );
}

// ── Budget labels ─────────────────────────────────────
const BUDGET_LABELS = ['Under ₹10K', '₹10K–25K', '₹25K–50K', '₹50K–1L', 'Above ₹1L'];

// ── Main Form ─────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    destination: '',
    adults: 2, children: 0,
    travelTypes: [] as string[],
    accommodations: [] as string[],
    budget: 2,
    message: '',
  });

  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [destOpen, setDestOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleArr = (key: 'travelTypes' | 'accommodations', val: string) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
    }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())                      e.name        = 'Please enter your name';
    if (!/\S+@\S+\.\S+/.test(form.email))       e.email       = 'Please enter a valid email';
    if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone   = 'Enter a valid 10-digit number';
    if (!form.destination)                       e.destination = 'Please select a destination';
    if (form.adults < 1)                         e.adults      = 'At least 1 adult required';
    if (form.travelTypes.length === 0)           e.travelTypes = 'Please select at least one';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name:'', email:'', phone:'', destination:'', adults:2, children:0, travelTypes:[], accommodations:[], budget:2, message:'' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputRow: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 };
  const fieldWrap: React.CSSProperties = { display: 'flex', flexDirection: 'column' };

  return (
    <main style={{ background: C.bg, minHeight: '100vh' }}>

        <Navbar />

      {/* ── HERO ── */}
      <div style={{
        background: C.darkBg,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px,10vw,130px) 32px clamp(60px,8vw,100px)',
        textAlign: 'center',
      }}>
        {/* orbs */}
        <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-20%', left:'10%', width:440, height:440, borderRadius:'50%', background:'radial-gradient(circle,rgba(45,143,123,0.18) 0%,transparent 65%)' }}/>
          <div style={{ position:'absolute', bottom:'-20%', right:'8%', width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle,rgba(61,184,158,0.13) 0%,transparent 65%)' }}/>
          <div style={{ position:'absolute', top:0, left:'15%', right:'15%', height:1, background:`linear-gradient(to right,transparent,${C.sea},transparent)`, opacity:0.4 }}/>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(to right,transparent,rgba(45,143,123,0.25),transparent)` }}/>
        </div>

        <div style={{ position:'relative', zIndex:1, maxWidth:640, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:16 }}>
            <div style={{ height:1, width:28, background:`linear-gradient(to right,transparent,${C.seaLt})` }}/>
            <span style={{ fontFamily:'"Montserrat",sans-serif', fontSize:10, fontWeight:700, color:C.seaLt, letterSpacing:'0.26em', textTransform:'uppercase' }}>Trip Planning</span>
            <div style={{ height:1, width:28, background:`linear-gradient(to left,transparent,${C.seaLt})` }}/>
          </div>

          <h1 style={{
            fontFamily:'"Playfair Display",serif',
            fontWeight:700,
            fontSize:'clamp(32px,5vw,60px)',
            lineHeight:1.1,
            color:'#e8f7f4',
            marginBottom:14,
            letterSpacing:'-0.01em',
          }}>
            Plan Your Dream Trip<br/>
            <span style={{ fontStyle:'italic', color:C.seaLt }}>With Ease</span>
          </h1>

          <p style={{
            fontFamily:'"Inter",sans-serif',
            fontSize:'clamp(14px,1.4vw,16px)',
            color:'rgba(180,230,220,0.62)',
            lineHeight:1.75,
            marginBottom:28,
          }}>
            Tell us about your dream trip and our travel experts will design the perfect itinerary for your next adventure — personalised, priced fairly, and crafted with care.
          </p>

          {/* trust chips */}
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {['⚡ Reply within 2 hours','🔒 Zero spam, ever','✨ 100% personalised'].map((t,i) => (
              <div key={i} style={{ fontFamily:'"Inter",sans-serif', fontSize:12, fontWeight:500, color:'rgba(180,230,220,0.6)', background:'rgba(45,143,123,0.1)', borderRadius:999, padding:'5px 14px' }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORM AREA ── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(32px,5vw,56px) 24px 80px' }}>

        {/* success state */}
        {status === 'success' && (
          <div style={{
            background: 'rgba(34,197,94,0.08)', border:'1.5px solid rgba(34,197,94,0.3)',
            borderRadius:16, padding:'28px 32px', textAlign:'center', marginBottom:32,
          }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🎉</div>
            <div style={{ fontFamily:'"Playfair Display",serif', fontSize:22, color:C.text, marginBottom:6 }}>
              We've received your request!
            </div>
            <div style={{ fontFamily:'"Inter",sans-serif', fontSize:14, color:C.muted, lineHeight:1.65 }}>
              Our travel expert will reach out to you within 2 hours with a personalised itinerary.
            </div>
          </div>
        )}

        {/* form card */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{
            background: C.white,
            borderRadius: 24,
            border: `1.5px solid ${C.border}`,
            overflow: 'hidden',
            boxShadow: '0 8px 48px rgba(14,30,27,0.08)',
          }}>

            {/* ── Section: Personal Details ── */}
            <div style={{ padding:'32px 36px 28px', borderBottom:`1px solid ${C.border}` }}>
              <SectionHead num="01" title="Personal Details" sub="So we know who to get back to"/>

              <div className="form-row" style={inputRow}>
                <div style={fieldWrap}>
                  <Label>Full Name *</Label>
                  <InputBase
                    placeholder="e.g. Arjun Sharma"
                    value={form.name}
                    onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:''})); }}
                    style={errors.name ? { borderColor:C.error } : {}}
                  />
                  {errors.name && <ErrMsg>{errors.name}</ErrMsg>}
                </div>
                <div style={fieldWrap}>
                  <Label>Email Address *</Label>
                  <InputBase
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => { setForm(f=>({...f,email:e.target.value})); setErrors(er=>({...er,email:''})); }}
                    style={errors.email ? { borderColor:C.error } : {}}
                  />
                  {errors.email && <ErrMsg>{errors.email}</ErrMsg>}
                </div>
              </div>

              <div style={{ marginTop:16 }}>
                <Label>Phone Number <span style={{ fontWeight:400, textTransform:'none', letterSpacing:0, color:C.muted }}>(optional)</span></Label>
                <InputBase
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  maxLength={10}
                  onChange={e => { setForm(f=>({...f,phone:e.target.value.replace(/\D/g,'')})); setErrors(er=>({...er,phone:''})); }}
                  style={{ ...(errors.phone ? { borderColor:C.error } : {}), maxWidth:340 }}
                />
                {errors.phone && <ErrMsg>{errors.phone}</ErrMsg>}
              </div>
            </div>

            {/* ── Section: Destination ── */}
            <div style={{ padding:'28px 36px', borderBottom:`1px solid ${C.border}` }}>
              <SectionHead num="02" title="Preferred Destination" sub="Where does your heart want to go?"/>

              <div style={{ position:'relative', maxWidth:'100%' }}>
                <button
                  type="button"
                  onClick={() => setDestOpen(o=>!o)}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'13px 16px', borderRadius:12,
                    border:`1.5px solid ${destOpen ? C.borderFocus : (errors.destination ? C.error : C.border)}`,
                    background: form.destination ? C.white : C.bgAlt,
                    fontFamily:'"Inter",sans-serif', fontSize:14,
                    color: form.destination ? C.text : C.muted,
                    cursor:'pointer', textAlign:'left',
                    boxShadow: destOpen ? `0 0 0 3px rgba(45,143,123,0.08)` : 'none',
                    transition:'all 0.22s',
                  }}
                >
                  <span>{form.destination || 'Select a destination'}</span>
                  <ChevronDown size={16} style={{ color:C.muted, transition:'transform 0.2s', transform: destOpen ? 'rotate(180deg)' : 'none', flexShrink:0 }}/>
                </button>

                {destOpen && (
                  <div style={{
                    position:'absolute', top:'calc(100% + 6px)', left:0, right:0, zIndex:50,
                    background:C.white, border:`1.5px solid ${C.seaBd}`,
                    borderRadius:14, overflow:'hidden',
                    boxShadow:'0 16px 48px rgba(14,30,27,0.14)',
                    maxHeight:260, overflowY:'auto',
                  }}>
                    {DESTINATIONS.map(d => (
                      <button
                        key={d} type="button"
                        onClick={() => { setForm(f=>({...f,destination:d})); setDestOpen(false); setErrors(er=>({...er,destination:''})); }}
                        style={{
                          width:'100%', padding:'11px 16px', textAlign:'left', border:'none',
                          background: form.destination===d ? C.seaBg : 'transparent',
                          fontFamily:'"Inter",sans-serif', fontSize:13,
                          color: form.destination===d ? C.sea : C.sub,
                          fontWeight: form.destination===d ? 600 : 400,
                          cursor:'pointer', transition:'background 0.15s',
                          borderBottom:`1px solid ${C.border}`,
                        }}
                        onMouseEnter={e=>{if(form.destination!==d)(e.currentTarget as HTMLButtonElement).style.background=C.seaBg;}}
                        onMouseLeave={e=>{if(form.destination!==d)(e.currentTarget as HTMLButtonElement).style.background='transparent';}}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.destination && <ErrMsg>{errors.destination}</ErrMsg>}
            </div>

            {/* ── Section: Travelers ── */}
            <div style={{ padding:'28px 36px', borderBottom:`1px solid ${C.border}` }}>
              <SectionHead num="03" title="Number of Travelers" sub="Who's joining the adventure?"/>

              <div className="form-row" style={{ ...inputRow, gap:16 }}>
                <Counter label="Adults (18+)" value={form.adults} min={1} max={20} onChange={v=>{ setForm(f=>({...f,adults:v})); setErrors(er=>({...er,adults:''})); }}/>
                <Counter label="Children (under 18)" value={form.children} min={0} max={10} onChange={v=>setForm(f=>({...f,children:v}))}/>
              </div>
              {errors.adults && <ErrMsg>{errors.adults}</ErrMsg>}
            </div>

            {/* ── Section: Travel Type ── */}
            <div style={{ padding:'28px 36px', borderBottom:`1px solid ${C.border}` }}>
              <SectionHead num="04" title="Travel Type" sub="What kind of trip are you planning?"/>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                {TRAVEL_TYPES.map(t => (
                  <CheckPill
                    key={t} label={t}
                    checked={form.travelTypes.includes(t)}
                    onChange={() => { toggleArr('travelTypes',t); setErrors(er=>({...er,travelTypes:''})); }}
                  />
                ))}
              </div>
              {errors.travelTypes && <ErrMsg>{errors.travelTypes}</ErrMsg>}
            </div>

            {/* ── Section: Accommodation ── */}
            <div style={{ padding:'28px 36px', borderBottom:`1px solid ${C.border}` }}>
              <SectionHead num="05" title="Accommodation Preference" sub="How do you like to stay?"/>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
                {ACCOMMODATIONS.map(a => (
                  <CheckPill
                    key={a} label={a}
                    checked={form.accommodations.includes(a)}
                    onChange={() => toggleArr('accommodations',a)}
                  />
                ))}
              </div>
            </div>

            {/* ── Section: Budget ── */}
            <div style={{ padding:'28px 36px', borderBottom:`1px solid ${C.border}` }}>
              <SectionHead num="06" title="Your Budget" sub="Select an estimated budget range (per person)"/>

              {/* budget steps */}
              <div style={{ marginBottom:14 }}>
                <div style={{
                  background: C.seaBg,
                  border: `1.5px solid ${C.seaBd}`,
                  borderRadius: 10,
                  padding: '10px 16px',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ fontFamily:'"DM Serif Display",serif', fontSize:18, color:C.sea }}>{BUDGET_LABELS[form.budget]}</span>
                  <span style={{ fontFamily:'"Inter",sans-serif', fontSize:11, color:C.muted }}>per person</span>
                </div>
              </div>

              <input
                type="range" min={0} max={4} step={1}
                value={form.budget}
                onChange={e => setForm(f=>({...f,budget:+e.target.value}))}
                style={{ width:'100%', accentColor:C.sea, cursor:'pointer', height:6 }}
              />
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                {BUDGET_LABELS.map((l,i) => (
                  <span key={i} style={{
                    fontFamily:'"Inter",sans-serif', fontSize:10, fontWeight:500,
                    color: i===form.budget ? C.sea : C.muted,
                    transition:'color 0.2s',
                    textAlign: i===0 ? 'left' : i===4 ? 'right' : 'center',
                    flex:1,
                  }}>{l}</span>
                ))}
              </div>
            </div>

            {/* ── Section: Message ── */}
            <div style={{ padding:'28px 36px 32px' }}>
              <SectionHead num="07" title="Anything Else?" sub="Share special requests, dates, or anything on your mind"/>

              <textarea
                ref={textareaRef}
                placeholder="e.g. We'd love a trip in October for our anniversary, prefer a relaxed pace, vegetarian food only..."
                value={form.message}
                onChange={e => setForm(f=>({...f,message:e.target.value}))}
                rows={4}
                style={{
                  width:'100%', padding:'13px 16px',
                  borderRadius:12, border:`1.5px solid ${C.border}`,
                  background:C.bgAlt, fontFamily:'"Inter",sans-serif',
                  fontSize:14, color:C.text, outline:'none',
                  resize:'vertical', lineHeight:1.65,
                  transition:'all 0.22s',
                  boxSizing:'border-box',
                }}
                onFocus={e => { e.currentTarget.style.borderColor=C.borderFocus; e.currentTarget.style.background=C.white; e.currentTarget.style.boxShadow=`0 0 0 3px rgba(45,143,123,0.08)`; }}
                onBlur={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.bgAlt; e.currentTarget.style.boxShadow='none'; }}
              />

              {/* error banner */}
              {status === 'error' && (
                <div style={{ marginTop:14, padding:'12px 16px', background:'rgba(239,68,68,0.07)', border:'1.5px solid rgba(239,68,68,0.25)', borderRadius:10, fontFamily:'"Inter",sans-serif', fontSize:13, color:'#ef4444' }}>
                  Something went wrong. Please try again or WhatsApp us directly.
                </div>
              )}

              {/* submit */}
              <div style={{ marginTop:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
                <p style={{ fontFamily:'"Inter",sans-serif', fontSize:12, color:C.muted, lineHeight:1.55, maxWidth:340 }}>
                  By submitting you agree to our <a href="/terms-and-conditions" style={{ color:C.sea, textDecoration:'none' }}>Terms & Conditions</a>. We'll never share your data.
                </p>

                <button
                  type="submit"
                  disabled={status==='loading'}
                  style={{
                    display:'flex', alignItems:'center', gap:10,
                    padding:'14px 32px', borderRadius:999,
                    background: status==='loading'
                      ? C.seaBd
                      : `linear-gradient(135deg,${C.sea},${C.seaDk})`,
                    color:'#fff',
                    fontFamily:'"Montserrat",sans-serif', fontSize:14, fontWeight:700,
                    border:'none', cursor: status==='loading' ? 'not-allowed' : 'pointer',
                    boxShadow:`0 6px 22px rgba(45,143,123,0.38)`,
                    transition:'all 0.25s', letterSpacing:'0.03em',
                  }}
                  onMouseEnter={e => { if(status!=='loading'){ const el=e.currentTarget as HTMLButtonElement; el.style.transform='translateY(-2px)'; el.style.boxShadow=`0 12px 32px rgba(45,143,123,0.5)`; }}}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='none'; el.style.boxShadow=`0 6px 22px rgba(45,143,123,0.38)`; }}
                >
                  {status==='loading'
                    ? <><Loader2 size={17} style={{ animation:'spin 1s linear infinite' }}/> Sending…</>
                    : <><Send size={16}/> Submit Trip Request</>
                  }
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* ── Contact strip ── */}
        <div style={{
          marginTop:40, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16,
        }}>
          {[
            { icon:<MapPin size={18}/>, title:'Our Office', val:'Kafira Travels' },
            { icon:<Phone size={18}/>,  title:'Call / WhatsApp', val:'+91 92532 89347' },
            { icon:<Mail size={18}/>,   title:'Email Us', val:'support@kafira.in' },
          ].map((item,i) => (
            <div key={i} style={{
              background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16,
              padding:'20px 20px', display:'flex', gap:14, alignItems:'flex-start',
              boxShadow:'0 2px 12px rgba(14,30,27,0.04)',
              transition:'all 0.25s',
            }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor=C.seaBd;el.style.transform='translateY(-3px)';el.style.boxShadow=`0 10px 28px rgba(45,143,123,0.1)`;}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor=C.border;el.style.transform='none';el.style.boxShadow='0 2px 12px rgba(14,30,27,0.04)';}}
            >
              <div style={{ width:38,height:38,borderRadius:10,background:C.seaBg,border:`1px solid ${C.seaBd}`,display:'flex',alignItems:'center',justifyContent:'center',color:C.sea,flexShrink:0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontFamily:'"Montserrat",sans-serif',fontWeight:700,fontSize:11,color:C.muted,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:4 }}>{item.title}</div>
                <div style={{ fontFamily:'"Inter",sans-serif',fontSize:13,color:C.sub,lineHeight:1.55,whiteSpace:'pre-line' }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FAQSection />
      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
          form > div > div { padding: 22px 20px !important; }
        }
        @media (max-width: 760px) {
          main > div:last-child > div:last-child { grid-template-columns: 1fr !important; }
        }
        input[type="range"] {
          -webkit-appearance: none;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(to right, #2d8f7b 0%, #2d8f7b ${(0/4)*100}%, #eaf3f1 ${(0/4)*100}%, #eaf3f1 100%);
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #2d8f7b;
          box-shadow: 0 2px 8px rgba(45,143,123,0.4);
          cursor: pointer;
          border: 2px solid #fff;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #2d8f7b;
          box-shadow: 0 2px 8px rgba(45,143,123,0.4);
          cursor: pointer;
          border: 2px solid #fff;
        }
      `}</style>
    </main>
  );
}

// ── Small helpers ─────────────────────────────────────
function SectionHead({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
      <div style={{
        width:36, height:36, borderRadius:10, flexShrink:0,
        background:`linear-gradient(135deg,${C.sea},${C.seaDk})`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'"Montserrat",sans-serif', fontSize:11, fontWeight:800, color:'#fff',
      }}>
        {num}
      </div>
      <div>
        <div style={{ fontFamily:'"Playfair Display",serif', fontWeight:700, fontSize:18, color:C.text, lineHeight:1.2 }}>{title}</div>
        <div style={{ fontFamily:'"Inter",sans-serif', fontSize:12, color:C.muted, marginTop:2 }}>{sub}</div>
      </div>
    </div>
  );
}

function ErrMsg({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily:'"Inter",sans-serif', fontSize:11, color:C.error, marginTop:4, display:'block' }}>
      {children}
    </span>
  );
}