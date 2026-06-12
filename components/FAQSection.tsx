
'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Palette ───────────────────────────────────────────
const C = {
  bg:      '#f4f9f8',
  bgAlt:   '#eaf3f1',
  white:   '#ffffff',
  text:    '#0e1e1b',        // very dark teal-black for headings
  sub:     '#2d5a52',        // medium dark for body
  muted:   '#6b9e94',        // muted teal for secondary text
  border:  'rgba(45,143,123,0.12)',
  sea:     '#2d8f7b',
  seaDk:   '#1a6b58',        // dark accent
  seaLt:   '#3db89e',        // light accent
  accent:  '#0f4f42',        // deepest dark teal (used sparingly)
  seaBg:   'rgba(45,143,123,0.09)',
  seaBd:   'rgba(45,143,123,0.22)',
  // dark surface — for the CTA band at bottom
  darkBg:  '#0d2821',
  darkSub: '#1a3d34',
};

const FAQS = [
  {
    category: 'Booking & Payment',
    items: [
      {
        q: 'How do I book a trip with Kafira?',
        a: 'Simply click "Plan a Trip" or WhatsApp us directly. Share your destination, dates, and group size — our travel expert will respond within 2 hours with a personalised itinerary and quote. No commitment needed at enquiry stage.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI (GPay, PhonePe, Paytm), net banking, all major credit/debit cards, and EMI options via select banks. International payments via wire transfer are also available for overseas travelers.',
      },
      {
        q: 'How much advance payment is required to confirm a booking?',
        a: 'A 25% advance secures your booking. The remaining balance is due 15 days before departure for domestic trips and 30 days for international ones. For group bookings of 10+, flexible payment schedules are available.',
      },
      {
        q: 'Is there a price-match guarantee?',
        a: 'Yes. If you find an identical itinerary at a lower price from a verified travel operator within 24 hours of booking, we will match or beat it. Our average saving versus self-booking is ₹4,200 per trip.',
      },
    ],
  },
  {
    category: 'Trips & Itineraries',
    items: [
      {
        q: 'Can I customise my itinerary?',
        a: 'Absolutely — every Kafira trip is built from scratch around your preferences. You choose the destination, pace, accommodation style, activities, and budget. We handle all logistics. No off-the-shelf packages here.',
      },
      {
        q: 'Do you organise solo travel and solo-female travel?',
        a: 'Yes. We have dedicated solo travel experts and a robust network of verified, safe accommodations. Our solo-female travel packages include vetted stays, women-led guide options, and a 24/7 emergency helpline.',
      },
      {
        q: 'What is the minimum and maximum group size you handle?',
        a: 'We handle solo trips (1 person) all the way up to large corporate groups of 200+. Group tours (6–20 people) get special shared pricing. We also specialise in family trips, honeymoons, and college group getaways.',
      },
      {
        q: 'Do you cover international destinations?',
        a: 'Yes. We operate tours across Southeast Asia (Bali, Thailand, Vietnam), Europe, Central Asia, and the Middle East. Our international packages include visa guidance, travel insurance advice, and 24/7 in-country support.',
      },
    ],
  },
  {
    category: 'Cancellation & Refunds',
    items: [
      {
        q: 'What is your cancellation policy?',
        a: 'Cancellations made 30+ days before departure receive a 90% refund. 15–29 days: 60% refund. 7–14 days: 30% refund. Less than 7 days: no refund. We strongly recommend travel insurance for all bookings.',
      },
      {
        q: 'What happens if Kafira cancels my trip?',
        a: 'In the rare event we cancel (e.g., natural disaster, government advisory), you receive a 100% refund or a free reschedule to any future date. We also cover any non-refundable costs incurred on your behalf.',
      },
      {
        q: 'Can I reschedule instead of cancelling?',
        a: 'Yes — rescheduling is always preferred. You can reschedule up to 10 days before departure at no extra charge (subject to availability). After that, a ₹500 rescheduling fee applies per person.',
      },
    ],
  },
  {
    category: 'During the Trip',
    items: [
      {
        q: 'Is there support available during the trip?',
        a: 'Every Kafira trip comes with a dedicated trip manager reachable via WhatsApp and phone 24/7. For group tours, a Kafira representative accompanies you on the ground. Our emergency line never goes unanswered.',
      },
      {
        q: 'Are meals included in your packages?',
        a: 'Meal inclusion depends on the package — clearly stated in your itinerary. Most packages include daily breakfast. Full-board (breakfast, lunch, dinner) is available as an add-on or standard in premium packages.',
      },
      {
        q: "Do I need travel insurance? Do you provide it?",
        a: "We strongly recommend travel insurance for all trips. While we don't sell insurance directly, we partner with trusted providers like HDFC ERGO and ICICI Lombard and can guide you to the right policy for your trip type.",
      },
    ],
  },
];

// ── FAQ accordion item ────────────────────────────────
function FAQItem({
  q, a, index, catIndex,
}: { q: string; a: string; index: number; catIndex: number }) {
  const [open, setOpen]  = useState(false);
  const bodyRef          = useRef<HTMLDivElement>(null);
  const itemRef          = useRef<HTMLDivElement>(null);
  const contentH         = useRef(0);

  // measure natural height once
  useEffect(() => {
    const el = bodyRef.current; if (!el) return;
    el.style.height = 'auto';
    contentH.current = el.scrollHeight;
    el.style.height = '0px';
  }, [a]);

  // animate open/close
  useEffect(() => {
    const el = bodyRef.current; if (!el) return;
    gsap.to(el, {
      height: open ? contentH.current : 0,
      duration: 0.4,
      ease: open ? 'power3.out' : 'power3.inOut',
    });
  }, [open]);

  // scroll-reveal entry
  useEffect(() => {
    const el = itemRef.current; if (!el) return;
    gsap.set(el, { opacity: 0, y: 18 });
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 0.62,
      delay: catIndex * 0.04 + index * 0.06,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 91%', once: true },
    });
  }, [index, catIndex]);

  return (
    <div
      ref={itemRef}
      style={{
        
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span style={{
          fontFamily: '"Montserrat",sans-serif',
          fontWeight: 600,
          fontSize: 15,
          color: open ? C.text : C.sub,
          lineHeight: 1.45,
          flex: 1,
          transition: 'color 0.22s',
        }}>
          {q}
        </span>

        {/* +/× toggle icon */}
        <div style={{
          width: 32, height: 32,
          borderRadius: 9,
          flexShrink: 0,
          background: open
            ? `linear-gradient(135deg,${C.sea},${C.seaDk})`
            : C.seaBg,
          border: `1.5px solid ${open ? 'transparent' : C.seaBd}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.28s ease',
          boxShadow: open ? `0 4px 12px rgba(45,143,123,0.3)` : 'none',
        }}>
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{
              transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <line x1="6" y1="0" x2="6" y2="12" stroke={open ? '#fff' : C.sea} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke={open ? '#fff' : C.sea} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      {/* answer */}
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden' }}>
        <div style={{ paddingBottom: 22 }}>
          <p style={{
            fontFamily: '"Montserrat",sans-serif',
            fontWeight: 400,
            fontSize: 14,
            color: C.muted,
            lineHeight: 1.82,
            borderLeft: `2.5px solid ${C.sea}`,
            paddingLeft: 18,
            margin: 0,
          }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Category tab pill ─────────────────────────────────
function CategoryTab({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 20px',
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: '"Montserrat",sans-serif',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.03em',
        background: active
          ? `linear-gradient(135deg,${C.sea},${C.seaDk})`
          : C.white,
        color: active ? '#fff' : C.sub,
        border: active ? 'none' : `1.5px solid ${C.border}`,
        outline: 'none',
        transition: 'all 0.26s ease',
        transform: active ? 'scale(1.05)' : 'scale(1)',
        boxShadow: active
          ? `0 4px 16px rgba(45,143,123,0.32)`
          : '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={e => {
        if (!active) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = C.seaBd;
          el.style.color = C.sea;
          el.style.background = C.seaBg;
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = C.border;
          el.style.color = C.sub;
          el.style.background = C.white;
        }
      }}
    >
      {label}
    </button>
  );
}

// ── Main ──────────────────────────────────────────────
export default function FAQSection() {
  const [activeCat, setActiveCat] = useState(0);
  const headRef    = useRef<HTMLDivElement>(null);
  const tabsRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevCat    = useRef(activeCat);

  // reveal heading, tabs, cta
  useEffect(() => {
    [headRef, tabsRef, ctaRef].forEach((r, i) => {
      const el = r.current; if (!el) return;
      gsap.set(el, { opacity: 0, y: 26 });
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.82, delay: i * 0.11,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  }, []);

  // animate content swap on tab change
  useEffect(() => {
    const el = contentRef.current; if (!el) return;
    if (prevCat.current === activeCat) return;
    prevCat.current = activeCat;
    gsap.fromTo(el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
    );
  }, [activeCat]);

  const active = FAQS[activeCat];

  return (
    <section
      id="faq"
      style={{
        background: C.bg,
        padding: '100px 0 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── subtle bg orb ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-5%', right: '-4%',
          width: 420, height: 420, borderRadius: '50%',
          background: `radial-gradient(circle,rgba(45,143,123,0.08) 0%,transparent 65%)`,
        }}/>
        <div style={{
          position: 'absolute', bottom: '15%', left: '-3%',
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle,rgba(61,184,158,0.07) 0%,transparent 65%)`,
        }}/>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* ── heading ── */}
        <div ref={headRef} style={{  textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.sea})` }}/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              FAQ
            </span>
            <div style={{ height: 1, width: 28, background: `linear-gradient(to left,transparent,${C.sea})` }}/>
          </div>

          <h2 style={{
            fontFamily: '"DM Serif Display",serif',
            fontWeight: 400,
            fontSize: 'clamp(30px,3.8vw,54px)',
            lineHeight: 1.08,
            color: C.text,
            marginBottom: 14,
            letterSpacing: '-0.01em',
          }}>
            Questions? We've got<br/>
            <span style={{  color: C.sea }}>answers.</span>
          </h2>

          <p style={{
            fontFamily: '"Montserrat",sans-serif',
            fontWeight: 400,
            fontSize: 15,
            color: C.muted,
            lineHeight: 1.75,
            maxWidth: 520,
            margin: '0 auto',
          }}>
            Everything you need to know about booking, traveling, and experiencing India with Kafira.
          </p>
        </div>

        {/* ── category tabs ── */}
        <div
          ref={tabsRef}
          style={{  display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}
        >
          {FAQS.map((cat, i) => (
            <CategoryTab
              key={cat.category}
              label={cat.category}
              active={activeCat === i}
              onClick={() => setActiveCat(i)}
            />
          ))}
        </div>

        {/* ── accordion card ── */}
        <div
          ref={contentRef}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 22,
            padding: '4px 36px',
            boxShadow: `0 4px 32px rgba(14,30,27,0.06), 0 1px 0 ${C.seaBd}`,
          }}
        >
          {/* active category label bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '18px 0 10px',
            borderBottom: `1px solid ${C.border}`,
            marginBottom: 2,
          }}>
            {/* coloured dot */}
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: `linear-gradient(135deg,${C.seaLt},${C.sea})`,
              flexShrink: 0,
              boxShadow: `0 0 6px ${C.sea}66`,
            }}/>
            <span style={{
              fontFamily: '"Montserrat",sans-serif',
              fontSize: 11, fontWeight: 700,
              color: C.sea,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              {active.category}
            </span>
            <span style={{
              fontFamily: '"Montserrat",sans-serif',
              fontSize: 11, fontWeight: 500,
              color: C.muted,
              marginLeft: 'auto',
            }}>
              {active.items.length} questions
            </span>
          </div>

          {active.items.map((item, i) => (
            <FAQItem
              key={`${activeCat}-${i}`}
              q={item.q}
              a={item.a}
              index={i}
              catIndex={activeCat}
            />
          ))}
        </div>
      </div>

      {/* ── CTA band — dark seagreen surface ── */}
      <div
        ref={ctaRef}
        style={{
        
          marginTop: 72,
          background: C.darkBg,
          position: 'relative',
          overflow: 'hidden',
          padding: '56px 32px',
        }}
      >
        {/* dark band glow orbs */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-40%', left: '-5%',
            width: 400, height: 400, borderRadius: '50%',
            background: `radial-gradient(circle,rgba(45,143,123,0.18) 0%,transparent 65%)`,
          }}/>
          <div style={{
            position: 'absolute', bottom: '-40%', right: '-5%',
            width: 360, height: 360, borderRadius: '50%',
            background: `radial-gradient(circle,rgba(61,184,158,0.14) 0%,transparent 65%)`,
          }}/>
          {/* top border glow line */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%',
            height: 1,
            background: `linear-gradient(to right,transparent,${C.sea},transparent)`,
          
          }}/>
        </div>

        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 28,
          position: 'relative',
          zIndex: 1,
        }}>
          <div>
            <div style={{
              fontFamily: '"DM Serif Display",serif',
              fontWeight: 400,
              fontSize: 'clamp(22px,2.6vw,34px)',
              color: '#e8f7f4',
              marginBottom: 8,
              lineHeight: 1.2,
            }}>
              Still have questions?
            </div>
            <div style={{
              fontFamily: '"Montserrat",sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: 'rgba(180,225,218,0.75)',
              lineHeight: 1.65,
              maxWidth: 420,
            }}>
              Our travel experts typically respond in under 2 hours — WhatsApp or email us directly.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {/* WhatsApp button */}
            <a
              href="https://wa.me/919253289347"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                background: 'rgba(37,211,102,0.12)',
                border: '1.5px solid rgba(37,211,102,0.35)',
                color: '#4de88e',
                fontFamily: '"Montserrat",sans-serif',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                transition: 'all 0.25s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(37,211,102,0.22)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 24px rgba(37,211,102,0.2)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(37,211,102,0.12)';
                el.style.transform = 'none';
                el.style.boxShadow = 'none';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>

            {/* Email button */}
            <a
              href="mailto:support@kafira.in"
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                border: `1.5px solid rgba(255,255,255,0.14)`,
                color: 'rgba(220,245,240,0.85)',
                fontFamily: '"Montserrat",sans-serif',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = `rgba(45,143,123,0.2)`;
                el.style.borderColor = C.seaBd;
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.06)';
                el.style.borderColor = 'rgba(255,255,255,0.14)';
                el.style.transform = 'none';
              }}
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* ── responsive ── */}
      <style>{`
        @media (max-width: 600px) {
          #faq > div > div:nth-child(3) { padding: 4px 18px !important; }
        }
      `}</style>
    </section>
  );
}