'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect, useRef, useState } from 'react';

// ── Seagreen palette ──────────────────────────────────
const C = {
  bg:      '#f4f9f8',
  white:   '#ffffff',
  text:    '#0e1e1b',
  sub:     '#2d5a52',
  muted:   '#6b9e94',
  border:  'rgba(45,143,123,0.15)',
  sea:     '#2d8f7b',
  seaDk:   '#1a6b58',
  seaLt:   '#3db89e',
  seaBg:   'rgba(45,143,123,0.07)',
  seaBd:   'rgba(45,143,123,0.22)',
  seaGrad: 'linear-gradient(135deg,#2d8f7b,#1a6b58)',
};

// ── Types ─────────────────────────────────────────────
interface PolicySection {
  heading: string;
  body: string | string[];
}
interface Policy {
  id: string;
  title: string;
  lastUpdated: string;
  summary: string;
  sections: PolicySection[];
}

// ─────────────────────────────────────────────────────
// POLICY DATA
// ─────────────────────────────────────────────────────
const POLICIES: Policy[] = [

  // ── 1. Terms & Conditions ─────────────────────────
  {
    id: 'terms',
    title: 'Terms & Conditions',
    lastUpdated: '1 May 2025',
    summary: 'By booking any trip or using any service offered by Kafira Travel Pvt. Ltd., you agree to the following terms. Please read carefully before proceeding.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: 'These Terms & Conditions ("Terms") constitute a legally binding agreement between you ("Traveler", "Client", "You") and Kafira Travel Pvt. Ltd. ("Kafira", "We", "Us", "Our"), registered in India. By making a booking, enquiry, or using any of our services — online or offline — you confirm that you have read, understood, and agree to be bound by these Terms.',
      },
      {
        heading: '2. Booking Confirmation',
        body: [
          'A booking is considered confirmed only upon receipt of the required advance payment (minimum 25% of the total trip cost) and issuance of a written confirmation from Kafira via email or WhatsApp.',
          'Bookings are subject to availability. Kafira reserves the right to decline or cancel any booking at its discretion, with a full refund of any amount paid.',
          'The lead traveler (person making the booking) must be 18 years or older and is responsible for all members of their group.',
        ],
      },
      {
        heading: '3. Accuracy of Information',
        body: 'You are responsible for providing accurate personal information (name, phone number, ID details, medical conditions) at the time of booking. Kafira shall not be liable for any loss or inconvenience arising from incorrect information provided by you.',
      },
      {
        heading: '4. Itinerary Changes',
        body: [
          'Kafira reserves the right to modify itineraries due to weather conditions, road closures, natural calamities, government advisories, or any circumstances beyond our control.',
          'In such cases, Kafira will make reasonable alternative arrangements of equivalent standard. No refund or compensation will be provided for changes made due to force majeure.',
          'The trip captain\'s decision regarding route, schedule, and safety is final and binding.',
        ],
      },
      {
        heading: '5. Participant Conduct',
        body: [
          'All participants are expected to behave respectfully toward fellow travelers, guides, local communities, and the natural environment.',
          'Kafira reserves the right to remove any participant from a trip — without refund — whose behaviour is deemed unsafe, disruptive, or offensive.',
          'Consumption of alcohol or controlled substances in a manner that endangers others is strictly prohibited.',
        ],
      },
      {
        heading: '6. Health & Fitness',
        body: 'Certain trips require a minimum level of physical fitness or medical clearance. By booking, you confirm you are medically fit for the activities involved. Kafira strongly recommends consulting a physician before undertaking high-altitude or strenuous adventure trips. Kafira is not liable for any medical emergency, illness, or injury arising during the trip.',
      },
      {
        heading: '7. Liability Limitation',
        body: [
          'Kafira acts as an organiser and coordinator of travel services. We are not directly responsible for the acts or omissions of third-party service providers including airlines, hotels, transport operators, and activity vendors.',
          'Kafira\'s total liability, in any event, shall not exceed the total amount paid by you for the specific trip.',
          'Kafira is not liable for loss of life, personal injury, property damage, or consequential losses arising from participation in our trips.',
        ],
      },
      {
        heading: '8. Intellectual Property',
        body: 'All content on the Kafira website, app, and marketing materials — including text, photographs, logos, and itineraries — is the intellectual property of Kafira Travel Pvt. Ltd. and may not be reproduced without written permission.',
      },
      {
        heading: '9. Governing Law',
        body: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.',
      },
      {
        heading: '10. Contact',
        body: 'For any questions regarding these Terms, please contact us at: support@kafira.in or call +91 92532 89347.',
      },
    ],
  },

  // ── 2. Privacy Policy ────────────────────────────
  {
    id: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: '1 May 2025',
    summary: 'Kafira Travel Pvt. Ltd. is committed to protecting your personal data. This policy explains what we collect, how we use it, and your rights.',
    sections: [
      {
        heading: '1. Information We Collect',
        body: [
          'Personal identifiers: name, phone number, email address, date of birth, gender.',
          'Government ID details (Aadhaar, Passport, Voter ID) required for permits and bookings.',
          'Payment details (processed securely via third-party gateways — we do not store card data).',
          'Health and dietary preferences shared voluntarily for trip customisation.',
          'Device and usage data (IP address, browser type, pages visited) collected via cookies.',
          'Communications: WhatsApp messages, emails, and form submissions you send us.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        body: [
          'To process and confirm bookings and payments.',
          'To obtain required permits and travel authorisations.',
          'To communicate trip updates, itinerary changes, and emergency information.',
          'To send promotional offers and travel inspiration (you may opt out at any time).',
          'To improve our services, website, and customer experience.',
          'To comply with legal obligations under Indian law.',
        ],
      },
      {
        heading: '3. Data Sharing',
        body: [
          'We share your data with: hotels, transport operators, and activity vendors — only what is necessary to fulfil your booking.',
          'Government authorities when required to obtain permits (Inner Line Permits, forest entry, etc.).',
          'Payment processors (Razorpay, PayU, Stripe) who operate under their own privacy policies.',
          'We do not sell, rent, or trade your personal information to third parties for marketing purposes.',
        ],
      },
      {
        heading: '4. Data Retention',
        body: 'We retain your personal data for a period of 3 years following your last interaction with us, or as required by applicable law. Financial records are retained for 7 years as mandated by Indian tax law.',
      },
      {
        heading: '5. Your Rights',
        body: [
          'Access: Request a copy of the personal data we hold about you.',
          'Correction: Ask us to update inaccurate or incomplete data.',
          'Deletion: Request erasure of your personal data (subject to legal obligations).',
          'Opt-out: Unsubscribe from marketing communications at any time via the link in our emails.',
          'To exercise any of these rights, email: privacy@kafira.in',
        ],
      },
      {
        heading: '6. Data Security',
        body: 'We implement industry-standard security measures including SSL encryption, access controls, and secure storage to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
      },
      {
        heading: '7. Children\'s Privacy',
        body: 'Our services are not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe we have done so inadvertently, please contact us immediately.',
      },
      {
        heading: '8. Third-Party Links',
        body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.',
      },
      {
        heading: '9. Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time. The updated version will be posted on our website with a revised date. Continued use of our services after changes constitutes acceptance of the updated policy.',
      },
      {
        heading: '10. Contact',
        body: 'For privacy-related queries, contact our Data Protection Officer at: privacy@kafira.in',
      },
    ],
  },

  // ── 3. Cancellation Policy ────────────────────────
  {
    id: 'cancellation',
    title: 'Cancellation Policy',
    lastUpdated: '1 May 2025',
    summary: 'We understand that plans change. Our cancellation policy is designed to be fair to both travelers and our team, while accounting for costs incurred in advance.',
    sections: [
      {
        heading: '1. Cancellation by the Traveler',
        body: [
          '30 or more days before departure: 90% refund of total amount paid (10% administrative charge applies).',
          '15 – 29 days before departure: 60% refund.',
          '7 – 14 days before departure: 30% refund.',
          'Less than 7 days before departure: No refund.',
          'No-show (failure to appear without notice): No refund.',
        ],
      },
      {
        heading: '2. How to Cancel',
        body: [
          'All cancellation requests must be submitted in writing via email to support@kafira.in or via WhatsApp to +91 92532 89347.',
          'The cancellation date is the date we receive your written request, not the date of enquiry.',
          'Verbal cancellations are not accepted.',
        ],
      },
      {
        heading: '3. Refund Processing',
        body: [
          'Approved refunds will be processed within 7–10 business days of the cancellation date.',
          'Refunds are made to the original payment method only.',
          'Any transaction or processing fees charged by payment gateways are non-refundable.',
          'Refunds for bookings made via EMI are subject to the terms of the EMI provider.',
        ],
      },
      {
        heading: '4. Rescheduling',
        body: [
          'You may reschedule your trip up to 10 days before departure at no additional charge (subject to availability).',
          'Rescheduling within 10 days of departure incurs a fee of ₹500 per person.',
          'A rescheduled trip is treated as a new booking for the purposes of the cancellation policy.',
          'Rescheduling can be done a maximum of twice per booking.',
        ],
      },
      {
        heading: '5. Non-Refundable Items',
        body: [
          'The following are non-refundable under any circumstances: flight and train tickets booked on your behalf, visa fees, Inner Line Permits, event or festival tickets, and any third-party bookings made at your specific request.',
          'These costs will be deducted before calculating any applicable refund.',
        ],
      },
      {
        heading: '6. Cancellation by Kafira',
        body: [
          'If Kafira cancels a trip due to reasons within our control (e.g., insufficient group size, operational issues), you will receive a 100% refund of all amounts paid, or a complimentary rescheduling.',
          'If cancellation is due to force majeure events (natural disasters, government restrictions, pandemic, civil unrest, extreme weather), Kafira will offer a full reschedule credit valid for 12 months. Refunds in such cases are at Kafira\'s discretion.',
        ],
      },
      {
        heading: '7. Travel Insurance',
        body: 'Kafira strongly recommends purchasing comprehensive travel insurance that covers trip cancellation, medical emergencies, and baggage loss. We are not liable for losses that could have been covered by travel insurance.',
      },
      {
        heading: '8. Group Bookings',
        body: 'For group bookings of 10 or more participants, a customised cancellation schedule may apply as agreed in writing at the time of booking. Please refer to your group booking agreement.',
      },
    ],
  },

  // ── 4. Booking Policy ─────────────────────────────
  {
    id: 'booking',
    title: 'Booking Policy',
    lastUpdated: '1 May 2025',
    summary: 'Everything you need to know about how to book a Kafira trip — from initial enquiry to confirmed departure.',
    sections: [
      {
        heading: '1. How to Book',
        body: [
          'Step 1 — Enquiry: Contact us via WhatsApp (+91 92532 89347), email (support@kafira.in), or the "Plan a Trip" form on our website. Share your desired destination, dates, group size, and preferences.',
          'Step 2 — Proposal: Our travel expert will respond within 2 hours with a personalised itinerary and detailed quote.',
          'Step 3 — Confirmation: Once you approve the proposal, pay the advance (minimum 25%) to confirm your slot.',
          'Step 4 — Documentation: Submit required documents (ID proofs, medical forms where applicable) within 7 days of booking confirmation.',
        ],
      },
      {
        heading: '2. Payment Schedule',
        body: [
          'Advance payment: Minimum 25% of the total trip cost is required to confirm the booking.',
          'Balance payment for domestic trips: Due 15 days before departure.',
          'Balance payment for international trips: Due 30 days before departure.',
          'For last-minute bookings (less than 15 days before departure): Full payment is required at the time of booking.',
          'Group bookings: A customised payment schedule may be agreed in writing.',
        ],
      },
      {
        heading: '3. Accepted Payment Methods',
        body: [
          'UPI: Google Pay, PhonePe, Paytm — preferred for instant confirmation.',
          'Net banking: All major Indian banks.',
          'Credit/debit cards: Visa, Mastercard, RuPay, American Express.',
          'EMI: Available via select credit cards and BNPL providers.',
          'Bank transfer: For large group bookings (details provided on request).',
          'International wire transfer: For overseas travelers.',
        ],
      },
      {
        heading: '4. Pricing',
        body: [
          'All prices are quoted in Indian Rupees (INR) and are per person unless stated otherwise.',
          'Prices are based on twin-sharing accommodation. Single supplements apply for solo occupancy.',
          'Prices are subject to change based on fuel costs, seasonal demand, and third-party rate revisions. The price in your confirmed booking is fixed.',
          'GST (Goods and Services Tax) is included in quoted prices unless explicitly stated.',
        ],
      },
      {
        heading: '5. Inclusions & Exclusions',
        body: [
          'Each trip itinerary clearly lists what is included and excluded.',
          'Unless explicitly stated, the following are typically excluded: airfare, train tickets to/from the starting point, personal expenses, tips and gratuities, optional activities, laundry, and travel insurance.',
          'Any additional services requested after booking confirmation are subject to availability and extra charge.',
        ],
      },
      {
        heading: '6. Documents Required',
        body: [
          'All travelers must provide a valid government-issued photo ID (Aadhaar, Passport, or Voter ID).',
          'For high-altitude or adventure trips, a self-declaration of fitness may be required.',
          'For trips requiring Inner Line Permits, additional government ID copies will be needed.',
          'International travelers must provide a valid passport and relevant visa documentation.',
        ],
      },
      {
        heading: '7. Minimum Group Size',
        body: 'Most group departure trips have a minimum group size of 6 participants. If a trip does not reach the minimum group size, Kafira may offer a rescheduled date, a private trip at an adjusted price, or a full refund. You will be notified at least 10 days before departure.',
      },
      {
        heading: '8. Special Requests',
        body: 'Special dietary requirements, accessibility needs, or personal preferences should be communicated at the time of booking. Kafira will make reasonable efforts to accommodate such requests but cannot guarantee fulfillment in all cases.',
      },
    ],
  },

  // ── 5. Cookie Policy ──────────────────────────────
  {
    id: 'cookies',
    title: 'Cookie Policy',
    lastUpdated: '1 May 2025',
    summary: 'This Cookie Policy explains how Kafira Travel Pvt. Ltd. uses cookies and similar tracking technologies on our website (kafira.in).',
    sections: [
      {
        heading: '1. What Are Cookies?',
        body: 'Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember your preferences, understand how you use the site, and deliver relevant content.',
      },
      {
        heading: '2. Types of Cookies We Use',
        body: [
          'Essential cookies: Required for the website to function correctly. These cannot be disabled. Examples: session cookies, security tokens, form submission data.',
          'Performance cookies: Help us understand how visitors interact with our site — pages visited, time spent, error messages. Used to improve website performance (e.g., Google Analytics).',
          'Functional cookies: Remember your preferences such as language, region, and previously viewed trips to enhance your experience.',
          'Marketing cookies: Track your browsing activity to show you relevant travel ads across the web (e.g., Google Ads, Meta Pixel). These are only active with your consent.',
        ],
      },
      {
        heading: '3. Third-Party Cookies',
        body: [
          'Google Analytics: Tracks website usage anonymously to help us improve our content and services.',
          'Meta (Facebook) Pixel: Measures the effectiveness of our advertising campaigns.',
          'Google Ads: Enables retargeting of users who have visited our website.',
          'WhatsApp Business API: Facilitates direct communication buttons on our site.',
          'These third parties have their own privacy policies. We recommend reviewing them.',
        ],
      },
      {
        heading: '4. Cookie Duration',
        body: [
          'Session cookies: Deleted automatically when you close your browser.',
          'Persistent cookies: Remain on your device for a set period (typically 30 days to 2 years) or until you delete them manually.',
        ],
      },
      {
        heading: '5. Managing Your Cookie Preferences',
        body: [
          'Cookie consent banner: On your first visit, you can accept or decline non-essential cookies via our consent banner.',
          'Browser settings: You can configure your browser to block or delete cookies. Note that blocking essential cookies may affect website functionality.',
          'Third-party opt-outs: You can opt out of Google Analytics at tools.google.com/dlpage/gaoptout and Meta advertising at facebook.com/ads/preferences.',
          'Withdrawing consent: You may withdraw cookie consent at any time by clearing your browser cookies and revisiting our site.',
        ],
      },
      {
        heading: '6. Do We Use Web Beacons?',
        body: 'Yes, we may use web beacons (pixel tags) in our marketing emails to track open rates and click-through rates. This helps us understand the effectiveness of our email campaigns. You can disable this by setting your email client not to display images.',
      },
      {
        heading: '7. Changes to This Policy',
        body: 'We may update this Cookie Policy as our website or legal requirements change. The updated policy will be posted with a revised date. Continued use of our website after changes constitutes acceptance.',
      },
      {
        heading: '8. Contact',
        body: 'For any questions about our use of cookies, contact: privacy@kafira.in',
      },
    ],
  },
];

// ── Nav item ──────────────────────────────────────────
function NavItem({
  policy, active, onClick,
}: { policy: Policy; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left',
        padding: '12px 16px', borderRadius: 12,
        border: 'none', cursor: 'pointer',
        background: active ? C.seaBg : 'transparent',
        borderLeft: `3px solid ${active ? C.sea : 'transparent'}`,
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 13, fontWeight: active ? 700 : 500,
        color: active ? C.sea : C.sub,
        transition: 'all 0.22s ease',
        display: 'flex', alignItems: 'center', gap: 8,
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = C.seaBg;
          (e.currentTarget as HTMLButtonElement).style.color = C.sea;
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = C.sub;
        }
      }}
    >
      {active && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.sea, flexShrink: 0 }} />
      )}
      {policy.title}
    </button>
  );
}

// ── Section block ─────────────────────────────────────
function SectionBlock({ section, index }: { section: PolicySection; index: number }) {
  return (
    <div style={{
      paddingBottom: 28,
      marginBottom: 28,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <h3 style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 15,
        color: C.text,
        marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: C.seaBg, border: `1px solid ${C.seaBd}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, color: C.sea,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {section.heading.replace(/^\d+\.\s*/, '')}
      </h3>

      {Array.isArray(section.body) ? (
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {section.body.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: C.sea,
                flexShrink: 0, marginTop: 7,
              }} />
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 14, color: C.sub,
                lineHeight: 1.78, margin: 0,
              }}>{item}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 14, color: C.sub,
          lineHeight: 1.78, margin: 0,
        }}>{section.body}</p>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────
export default function PoliciesPage() {
  const [activeId, setActiveId]     = useState('terms');
  const [mobileNav, setMobileNav]   = useState(false);
  const contentRef                  = useRef<HTMLDivElement>(null);

  const active = POLICIES.find(p => p.id === activeId) || POLICIES[0];

  // scroll to top of content on policy change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeId]);

  // read ?policy= hash from URL on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && POLICIES.find(p => p.id === hash)) {
      setActiveId(hash);
    }
  }, []);

  return (
    <>
    <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.sea}; border-radius: 2px; }

        .policy-nav-desktop { display: flex; }
        .policy-nav-mobile-btn { display: none; }
        .policy-mobile-drawer { display: none; }

        @media (max-width: 768px) {
          .policy-layout { flex-direction: column !important; }
          .policy-nav-desktop { display: none !important; }
          .policy-nav-mobile-btn { display: flex !important; }
          .policy-content { padding: 24px 20px !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'Montserrat, sans-serif' }}>

        {/* ── TOP HEADER ── */}
        <div style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 40px',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0',
            }}>
              <a href="/" style={{
                display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
              }}>
                {/* Logo text fallback — replace with <Image> if logo.png is available */}
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: C.seaGrad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'DM Serif Display, serif', fontWeight: 700,
                  fontSize: 18, color: '#fff',
                }}>K</div>
                <div>
                  <div style={{
                    fontFamily: 'DM Serif Display, serif',
                    fontWeight: 700, fontSize: 20,
                    color: C.sea, letterSpacing: '0.05em', lineHeight: 1,
                  }}>KAFIRA</div>
                  <div style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 9, color: C.muted, letterSpacing: '0.14em',
                    textTransform: 'uppercase', marginTop: 1,
                  }}>travel & explore</div>
                </div>
              </a>

              <a href="/" style={{
                padding: '8px 18px', borderRadius: 999,
                background: C.seaGrad, color: '#fff',
                fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.02em',
              }}>
                ← Back to Home
              </a>
            </div>

            {/* Page title */}
            <div style={{ padding: '24px 0 28px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: C.seaBg, border: `1px solid ${C.seaBd}`,
                borderRadius: 999, padding: '4px 14px', marginBottom: 14,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.sea }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 700, color: C.sea, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Legal & Policies
                </span>
              </div>
              <h1 style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: 'clamp(26px,3vw,40px)',
                fontWeight: 400, color: C.text, lineHeight: 1.15, marginBottom: 10,
              }}>
                Policies & Legal Documents
              </h1>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 540,
              }}>
                Kafira Travel Pvt. Ltd. is committed to transparency. These documents govern your use of our services. Last reviewed: May 2025.
              </p>
            </div>

            {/* Policy tabs — horizontal scrollable pills */}
            <div style={{
              display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 1,
              scrollbarWidth: 'none',
            }}>
              {POLICIES.map(p => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  onClick={e => { e.preventDefault(); setActiveId(p.id); window.history.replaceState(null, '', `#${p.id}`); }}
                  style={{
                    flexShrink: 0,
                    padding: '9px 18px',
                    borderRadius: '12px 12px 0 0',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 12, fontWeight: 700,
                    textDecoration: 'none',
                    color: activeId === p.id ? C.sea : C.muted,
                    background: activeId === p.id ? C.bg : 'transparent',
                    borderBottom: activeId === p.id ? `3px solid ${C.sea}` : '3px solid transparent',
                    transition: 'all 0.22s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY: sidebar + content ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 40px' }}>
          <div
            className="policy-layout"
            style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}
          >

            {/* ── SIDEBAR (desktop) ── */}
            <div
              className="policy-nav-desktop"
              style={{
                width: 230, flexShrink: 0,
                position: 'sticky', top: 24,
                flexDirection: 'column', gap: 2,
              }}
            >
              <div style={{
                background: C.white, borderRadius: 18,
                border: `1px solid ${C.border}`,
                padding: '12px 10px',
                boxShadow: '0 2px 12px rgba(45,143,123,0.06)',
              }}>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
                  color: C.muted, letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '6px 12px 10px',
                }}>Documents</div>
                {POLICIES.map(p => (
                  <NavItem
                    key={p.id}
                    policy={p}
                    active={activeId === p.id}
                    onClick={() => { setActiveId(p.id); window.history.replaceState(null, '', `#${p.id}`); }}
                  />
                ))}
              </div>

              {/* Contact card */}
              <div style={{
                marginTop: 14, background: C.seaBg,
                border: `1px solid ${C.seaBd}`,
                borderRadius: 16, padding: '18px 16px',
              }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 6 }}>
                  Questions?
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.sub, lineHeight: 1.65, marginBottom: 12 }}>
                  Our team is happy to clarify anything in these documents.
                </p>
                <a href="mailto:support@kafira.in" style={{
                  display: 'block', padding: '8px 12px', borderRadius: 10,
                  background: C.seaGrad, color: '#fff', textAlign: 'center',
                  fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
                  textDecoration: 'none',
                }}>Email Us</a>
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                ref={contentRef}
                style={{
                  background: C.white, borderRadius: 20,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 4px 24px rgba(45,143,123,0.06)',
                  overflow: 'hidden',
                }}
              >
                {/* Content header */}
                <div style={{
                  background: `linear-gradient(135deg,${C.seaBg},rgba(45,143,123,0.03))`,
                  borderBottom: `1px solid ${C.border}`,
                  padding: '28px 36px 24px',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 12, marginBottom: 12,
                  }}>
                    <h2 style={{
                      fontFamily: 'DM Serif Display, serif',
                      fontSize: 28, fontWeight: 400, color: C.text, lineHeight: 1.1,
                    }}>
                      {active.title}
                    </h2>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: C.white, border: `1px solid ${C.border}`,
                      borderRadius: 999, padding: '5px 12px',
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: C.muted }}>
                        Updated: {active.lastUpdated}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 14, color: C.sub, lineHeight: 1.75,
                    borderLeft: `3px solid ${C.sea}`,
                    paddingLeft: 16, margin: 0,
                  }}>
                    {active.summary}
                  </p>
                </div>

                {/* Sections */}
                <div className="policy-content" style={{ padding: '32px 36px' }}>
                  {active.sections.map((section, i) => (
                    <SectionBlock key={i} section={section} index={i} />
                  ))}

                  {/* Footer notice */}
                  <div style={{
                    marginTop: 8, padding: '18px 20px',
                    background: C.seaBg, border: `1px solid ${C.seaBd}`,
                    borderRadius: 14,
                  }}>
                    <p style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 12, color: C.sub, lineHeight: 1.7, margin: 0,
                    }}>
                      <strong style={{ color: C.sea }}>Kafira Travel Pvt. Ltd.</strong> — Registered in India.
                      For any queries regarding this {active.title}, please email{' '}
                      <a href="mailto:support@kafira.in" style={{ color: C.sea, fontWeight: 700 }}>
                        support@kafira.in
                      </a>{' '}
                      or call{' '}
                      <a href="tel:+919253289347" style={{ color: C.sea, fontWeight: 700 }}>
                        +91 92532 89347
                      </a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick nav between policies */}
              <div style={{
                display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap',
              }}>
                {POLICIES.filter(p => p.id !== activeId).map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveId(p.id); window.history.replaceState(null, '', `#${p.id}`); }}
                    style={{
                      padding: '8px 16px', borderRadius: 999,
                      border: `1px solid ${C.seaBd}`, background: C.white,
                      fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600,
                      color: C.sub, cursor: 'pointer',
                      transition: 'all 0.22s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = C.seaBg;
                      (e.currentTarget as HTMLButtonElement).style.color = C.sea;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = C.white;
                      (e.currentTarget as HTMLButtonElement).style.color = C.sub;
                    }}
                  >
                    {p.title} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          borderTop: `1px solid ${C.border}`,
          background: C.white,
          padding: '20px 40px',
          marginTop: 40,
        }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.muted }}>
              © 2015–2026 Kafira Travel Pvt. Ltd. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {POLICIES.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setActiveId(p.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: C.muted,
                    transition: 'color 0.2s', padding: 0,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = C.sea; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = C.muted; }}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}