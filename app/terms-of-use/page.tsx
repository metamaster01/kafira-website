'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// ── Palette ───────────────────────────────────────────
const C = {
  bg:     '#fff',
  bgAlt:  '#eaf3f1',
  white:  '#ffffff',
  text:   '#0e1e1b',
  sub:    '#2d5a52',
  muted:  '#6b9e94',
  border: 'rgba(45,143,123,0.12)',
  sea:    '#2d8f7b',
  seaDk:  '#1a6b58',
  seaLt:  '#3db89e',
  accent: '#0f4f42',
  seaBg:  'rgba(45,143,123,0.09)',
  seaBd:  'rgba(45,143,123,0.22)',
  darkBg: '#071a16',
};

// ── Section data ──────────────────────────────────────
const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using the services offered by Kafira Travel Pvt. Ltd. ("Kafira", "we", "us", or "our") — including our website, mobile application, WhatsApp booking service, and any travel packages booked through us — you ("Traveler", "you", or "your") agree to be bound by these Terms and Conditions in their entirety.',
      'If you are booking on behalf of a group or another person, you represent and warrant that you have the authority to bind such individuals to these Terms, and by proceeding you accept personal responsibility for ensuring all group members comply.',
      'We reserve the right to update these Terms at any time without prior notice. The most current version will always be available on our website. Continued use of our services constitutes acceptance of any revised Terms.',
    ],
  },
  {
    id: 'bookings',
    title: '2. Bookings & Confirmation',
    content: [
      'All bookings are subject to availability and are confirmed only upon receipt of the required advance payment (typically 25–30% of the total trip cost, as specified at the time of booking) and issuance of a written confirmation by Kafira.',
      'A booking is considered complete and binding only when you receive a booking confirmation email or WhatsApp message from our team. Verbal confirmations or preliminary discussions do not constitute a binding booking.',
      'Kafira reserves the right to decline any booking at its sole discretion, including but not limited to situations where minimum group size requirements are not met, safety concerns arise, or the requested dates are unavailable.',
      'Any special requirements — dietary needs, accessibility requirements, room preferences, medical conditions — must be disclosed at the time of booking. Kafira will make reasonable efforts to accommodate such requests but cannot guarantee fulfillment in all cases.',
    ],
  },
  {
    id: 'payment',
    title: '3. Pricing & Payment',
    content: [
      'All prices quoted are in Indian Rupees (INR) unless explicitly stated otherwise. Prices for international packages may be quoted in INR equivalent of foreign currency and are subject to exchange rate fluctuations at the time of final payment.',
      'Kafira accepts payment via UPI (GPay, PhonePe, Paytm), net banking, credit/debit cards, and bank wire transfer. EMI options are available via select banking partners. Cash payments above ₹2,000 are not accepted.',
      'The remaining balance after the advance deposit must be paid in full no later than 15 days before the departure date for domestic trips and 30 days before departure for international trips. Failure to pay the balance by the due date may result in automatic cancellation of the booking without refund of the advance.',
      'Prices are subject to change without notice until a booking is confirmed. Once confirmed in writing, the price is locked for the booked services. Any add-ons, upgrades, or extensions requested after confirmation will be billed at then-current rates.',
      'Our Best Price Guarantee: if you find an identical itinerary offered by a verified travel operator at a lower price within 24 hours of your confirmed booking, contact us with documented proof and we will match or beat it.',
    ],
  },
  {
    id: 'cancellation',
    title: '4. Cancellation & Refund Policy',
    content: [
      'All cancellation requests must be submitted in writing to hello@kafira.in or via WhatsApp to our official number. Verbal cancellations will not be processed. The cancellation date is the date we receive and acknowledge your written request.',
      'Domestic trip cancellations: 30 or more days before departure — 90% refund of total trip cost; 15–29 days — 60% refund; 7–14 days — 30% refund; less than 7 days — no refund.',
      'International trip cancellations: 45 or more days before departure — 85% refund; 30–44 days — 60% refund; 15–29 days — 30% refund; less than 15 days — no refund. Visa fees, flight tickets, and third-party hotel deposits are non-refundable regardless of cancellation timing.',
      'In the event Kafira cancels a trip due to circumstances within our control, you will receive a full 100% refund or a complimentary reschedule to any future departure of equal value. In cases of cancellation due to force majeure (natural disasters, government advisories, pandemics, civil unrest), Kafira will offer a credit note valid for 12 months but cannot guarantee a cash refund.',
      'Rescheduling: You may reschedule your booking up to 10 days before departure at no charge, subject to availability. Rescheduling requests within 10 days of departure attract a fee of ₹500 per person. Maximum two reschedules are permitted per booking.',
      'We strongly recommend purchasing comprehensive travel insurance at the time of booking to cover unforeseen cancellation scenarios.',
    ],
  },
  {
    id: 'itinerary',
    title: '5. Itinerary & Services',
    content: [
      'Published itineraries are indicative and represent our intended plan. Kafira reserves the right to alter, modify, or substitute any element of the itinerary — including accommodation, transport, route, activities, and timings — at any time, before or during the trip, where necessitated by safety concerns, weather conditions, force majeure events, regulatory changes, or operational reasons.',
      'Where a change results in a materially lesser experience (e.g., a hotel of lower grade, omission of a key highlight), Kafira will offer a proportional price adjustment or suitable alternative. Minor adjustments to timing, sequencing, or logistics do not entitle travelers to compensation.',
      'Accommodation is provided in standard twin/double-sharing rooms unless a single supplement is expressly booked and paid. Room allocation is at the discretion of the accommodation provider and Kafira cannot guarantee specific floors, views, or bed configurations.',
      'All activity timings, entry to monuments, and third-party services (safaris, cruises, cultural shows) are subject to the operating hours and availability of the respective service providers. Kafira is not liable for closures or cancellations by third parties.',
    ],
  },
  {
    id: 'health',
    title: '6. Health, Fitness & Safety',
    content: [
      'By booking a trip with Kafira, you confirm that you are in adequate physical and mental health to participate in the activities included in your chosen package. It is your responsibility to consult a qualified medical professional before undertaking any trip, particularly those involving high altitude, strenuous trekking, water sports, or international travel.',
      'Kafira reserves the right to exclude any traveler from an activity or from the trip entirely — without refund — if the trip captain or guide reasonably determines that the traveler\'s participation poses a risk to themselves or others.',
      'High-altitude trips (e.g., Spiti Valley, Manali–Leh, Kedarkantha) carry inherent risks including Acute Mountain Sickness (AMS). By booking such trips, you acknowledge these risks and confirm you have no pre-existing conditions (uncontrolled hypertension, cardiac disease, severe respiratory illness) that would contraindicate high-altitude travel.',
      'Kafira provides a first-aid kit and supplemental oxygen on all high-altitude trips. This does not constitute medical care. In the event of a medical emergency, Kafira will facilitate evacuation to the nearest appropriate medical facility, the cost of which will be borne by the traveler.',
      'Children under 18 must be accompanied by a parent or legal guardian at all times. Kafira does not assume in loco parentis responsibility for minors.',
    ],
  },
  {
    id: 'conduct',
    title: '7. Traveler Conduct',
    content: [
      'All travelers are expected to behave in a respectful, lawful, and considerate manner throughout the trip — towards fellow travelers, Kafira staff, local guides, accommodation staff, and local communities.',
      'Kafira operates a zero-tolerance policy for harassment, discrimination, or abusive behavior of any kind. Any traveler found engaging in such behavior will be removed from the trip immediately without refund and may be reported to appropriate authorities.',
      'Consumption of alcohol is permitted in moderation at personal expense. Kafira prohibits the use of illegal substances on all its trips. Any traveler found in possession of or under the influence of illegal substances will be removed from the trip without refund.',
      'Travelers are expected to comply with all applicable local laws, regulations, and customs — including dress codes at religious sites, photography restrictions, and environmental rules. Fines or legal consequences arising from a traveler\'s non-compliance are solely the traveler\'s responsibility.',
      'Damage to accommodation, vehicles, equipment, or third-party property caused by a traveler will be charged to that individual at cost.',
    ],
  },
  {
    id: 'liability',
    title: '8. Liability & Disclaimer',
    content: [
      'Kafira acts as a tour organizer and coordinates services provided by independent third parties including airlines, hotels, transport operators, activity providers, and local guides. Kafira is not the direct provider of these services and accordingly is not liable for any acts, omissions, negligence, or defaults of these third-party service providers.',
      'To the maximum extent permitted by applicable law, Kafira\'s total liability to any traveler for any claim arising out of or in connection with a booking shall not exceed the total amount paid by that traveler for the specific trip in question.',
      'Kafira is not liable for any indirect, incidental, special, consequential, or punitive damages — including loss of enjoyment, missed connections, lost baggage, or psychological distress — arising from any trip-related incident.',
      'Kafira is not responsible for losses, costs, damages, or expenses arising from force majeure events including but not limited to: natural disasters, epidemics/pandemics, war, terrorism, civil unrest, government orders, strikes, or extreme weather conditions.',
      'It is the traveler\'s sole responsibility to hold valid travel documents — passport, visa, inner line permits, and any required vaccinations or health certificates. Kafira will not be liable for denied entry, deportation, or any consequence arising from incomplete or invalid documentation.',
    ],
  },
  {
    id: 'insurance',
    title: '9. Travel Insurance',
    content: [
      'Kafira strongly recommends that all travelers purchase comprehensive travel insurance prior to departure. This should ideally cover trip cancellation, medical emergencies, emergency evacuation, loss of baggage, personal liability, and delays.',
      'Kafira does not sell travel insurance directly but can refer you to trusted providers including HDFC ERGO and ICICI Lombard. The decision to purchase insurance and the choice of policy remain solely with the traveler.',
      'Kafira accepts no liability for any loss, damage, or expense that would have been covered had the traveler purchased adequate travel insurance.',
    ],
  },
  {
    id: 'privacy',
    title: '10. Privacy & Data',
    content: [
      'Personal information collected during the booking process — including name, contact details, passport information, dietary preferences, and health disclosures — is used solely for the purpose of fulfilling your booking and providing trip-related services.',
      'Kafira will share your personal information with third-party service providers (airlines, hotels, guides) only to the extent necessary to deliver your booked services. We do not sell, rent, or trade your personal data with any third party for marketing purposes.',
      'By providing your WhatsApp number or email address, you consent to receiving booking confirmations, trip updates, and service communications from Kafira. You may opt out of promotional communications at any time by contacting us.',
      'Kafira retains booking records for a minimum of 7 years as required by Indian financial regulations. After this period, personal data is securely deleted.',
    ],
  },
  {
    id: 'intellectual',
    title: '11. Intellectual Property',
    content: [
      'All content on the Kafira website and application — including text, images, videos, itinerary documents, logos, and design elements — is the property of Kafira Travel Pvt. Ltd. and is protected by applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any Kafira content without our prior written permission.',
      'Photographs and videos taken during Kafira trips may be used by Kafira for marketing purposes unless you expressly opt out in writing before the trip. Individual faces will not be identified in marketing materials without explicit consent.',
    ],
  },
  {
    id: 'governing',
    title: '12. Governing Law & Disputes',
    content: [
      'These Terms and Conditions are governed by the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.',
      'Kafira encourages resolution of any grievance through direct communication first. Contact our customer support at support@kafira.in or +91 92532 89347. We commit to acknowledging all grievances within 48 hours and providing a resolution within 14 working days.',
      'Where direct resolution is not possible, parties agree to attempt mediation before initiating formal legal proceedings. The costs of mediation will be shared equally unless a court orders otherwise.',
    ],
  },
  {
    id: 'contact',
    title: '13. Contact Information',
    content: [
      'For any questions, concerns, or clarifications regarding these Terms and Conditions, please reach us at:',
      'Kafira Travel Pvt. Ltd.\nRegistered Office: Mumbai, Maharashtra, India\nEmail: support@kafira.in\nPhone / WhatsApp: +91 92532 89347\nWebsite: www.kafira.in',
      'These Terms and Conditions were last updated on 16 May 2026 and supersede all previous versions.',
    ],
  },
];

// ── Highlight box (important notices) ─────────────────
const HIGHLIGHTS = [
  { icon: '📋', text: '25% advance to confirm any booking' },
  { icon: '🔒', text: 'Balance due 15 days before departure (domestic) or 30 days (international)' },
  { icon: '❌', text: 'Cancellations within 7 days — no refund on domestic; within 15 days — no refund on international' },
  { icon: '🛡️', text: 'Travel insurance strongly recommended for all trips' },
  { icon: '⚠️', text: 'Kafira\'s liability is capped at the total trip cost paid' },
  { icon: '📍', text: 'Disputes governed by Mumbai courts under Indian law' },
];

// ── TOC Item ──────────────────────────────────────────
function TocItem({ id, title }: { id: string; title: string }) {
  return (
    <a
      href={`#${id}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 8,
        textDecoration: 'none',
        transition: 'background 0.2s',
        fontFamily: '"Montserrat",sans-serif',
        fontSize: 13,
        fontWeight: 500,
        color: C.sub,
        lineHeight: 1.4,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = C.seaBg;
        (e.currentTarget as HTMLAnchorElement).style.color = C.sea;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
        (e.currentTarget as HTMLAnchorElement).style.color = C.sub;
      }}
    >
      <span style={{ color: C.muted, fontSize: 11, marginTop: 1, flexShrink: 0 }}>
        {title.split('.')[0]}.
      </span>
      <span>{title.replace(/^\d+\.\s/, '')}</span>
    </a>
  );
}

// ── Section block ─────────────────────────────────────
function Section({ section }: { section: typeof SECTIONS[0] }) {
  return (
    <div
      id={section.id}
      style={{
        marginBottom: 48,
        scrollMarginTop: 100,
      }}
    >
      {/* section title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{
          width: 4, height: 28, borderRadius: 2,
          background: `linear-gradient(to bottom,${C.sea},${C.seaDk})`,
          flexShrink: 0,
        }}/>
        <h2 style={{
          fontFamily: '"DM Serif Display",serif',
          fontWeight: 400,
          fontSize: 'clamp(18px,2vw,24px)',
          color: C.text,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}>
          {section.title}
        </h2>
      </div>

      {/* paragraphs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 18 }}>
        {section.content.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: '"Montserrat",sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: C.sub,
              lineHeight: 1.85,
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* section divider */}
      <div style={{ height: 1, background: C.border, marginTop: 40 }}/>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────
export default function TermsAndConditions() {
  return (
    <main style={{ background: C.bg, minHeight: '100vh', width: '100%' }}>
        <Navbar />

      {/* ── HERO HEADER ── */}
      <div style={{
        background: C.darkBg,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(72px,10vw,120px) 32px clamp(56px,8vw,96px)',
      }}>
        {/* glow orbs */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(45,143,123,0.18) 0%,transparent 65%)' }}/>
          <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(61,184,158,0.12) 0%,transparent 65%)' }}/>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(to right,transparent,${C.sea},transparent)`, opacity: 0.4 }}/>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,rgba(45,143,123,0.3),transparent)` }}/>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/" style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 500, color: 'rgba(180,230,220,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.seaLt; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(180,230,220,0.5)'; }}
            >Home</Link>
            <span style={{ color: 'rgba(180,230,220,0.25)', fontSize: 12 }}>/</span>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 500, color: C.seaLt }}>Terms & Conditions</span>
          </div>

          {/* eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ height: 1, width: 28, background: `linear-gradient(to right,transparent,${C.seaLt})` }}/>
            <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 700, color: C.seaLt, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              Legal
            </span>
          </div>

          {/* title */}
          <h1 style={{
            fontFamily: '"DM Serif Display",serif',
            fontWeight: 400,
            fontSize: 'clamp(36px,5vw,64px)',
            lineHeight: 1.05,
            color: '#e8f7f4',
            marginBottom: 18,
            letterSpacing: '-0.02em',
          }}>
            Terms &{' '}
            <span style={{ fontStyle: 'italic', color: C.seaLt }}>Conditions</span>
          </h1>

          <p style={{
            fontFamily: '"Montserrat",sans-serif',
            fontWeight: 400,
            fontSize: 15,
            color: 'rgba(180,230,220,0.62)',
            lineHeight: 1.72,
            maxWidth: 560,
            marginBottom: 32,
          }}>
            Please read these terms carefully before booking any trip with Kafira. By proceeding with a booking, you confirm that you have read, understood, and agreed to all of the terms set out below.
          </p>

          {/* meta chips */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Last updated: 16 May 2026' },
              { label: 'Applicable to all Kafira bookings' },
              { label: 'Governed by Indian law' },
            ].map((chip, i) => (
              <div key={i} style={{
                fontFamily: '"Montserrat",sans-serif',
                fontSize: 11, fontWeight: 500,
                color: 'rgba(180,230,220,0.55)',
                background: 'rgba(45,143,123,0.1)',
                border: 'none',
                borderRadius: 999,
                padding: '5px 14px',
              }}>
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 80px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 56, alignItems: 'start', backgroundColor: C.bg }}>

        {/* ── LEFT: Table of Contents (sticky) ── */}
        <div className="toc-sidebar" style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <div style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: `0 4px 24px rgba(14,30,27,0.06)`,
          }}>
            {/* TOC header */}
            <div style={{
              padding: '16px 18px',
              borderBottom: `1px solid ${C.border}`,
              background: C.bgAlt,
            }}>
              <div style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 700, fontSize: 10, color: C.sea, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Contents
              </div>
            </div>

            {/* TOC links */}
            <div style={{ padding: '8px 6px 12px' }}>
              {SECTIONS.map(s => (
                <TocItem key={s.id} id={s.id} title={s.title}/>
              ))}
            </div>
          </div>

          {/* contact card */}
          <div style={{
            marginTop: 20,
            background: `linear-gradient(135deg,${C.sea},${C.seaDk})`,
            borderRadius: 16,
            padding: '20px 18px',
            boxShadow: `0 8px 24px rgba(45,143,123,0.28)`,
          }}>
            <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 17, color: '#fff', marginBottom: 6 }}>
              Have questions?
            </div>
            <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: 14 }}>
              Our team is happy to walk you through any of these terms before you book.
            </div>
            <a
              href="https://wa.me/919253289347?text=Hi%20Kafira%2C%20I%20have%20a%20question%20about%20the%20Terms%20and%20Conditions."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 999,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat with us
            </a>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div>

          {/* Key highlights box */}
          <div style={{
            background: C.white,
            border: `1.5px solid ${C.seaBd}`,
            borderRadius: 18,
            padding: '24px 28px',
            marginBottom: 48,
            boxShadow: `0 4px 24px rgba(14,30,27,0.05)`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* accent top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right,${C.sea},${C.seaLt})`, borderRadius: '18px 18px 0 0' }}/>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: C.seaBg, border: `1px solid ${C.seaBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                ⚡
              </div>
              <div>
                <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 18, color: C.text }}>Key Points at a Glance</div>
                <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 500, color: C.muted }}>Most important terms summarised</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '12px 14px',
                  background: C.bgAlt,
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                }}>
                  <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.3 }}>{h.icon}</span>
                  <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 12, fontWeight: 500, color: C.sub, lineHeight: 1.55 }}>
                    {h.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* All sections */}
          {SECTIONS.map(section => (
            <Section key={section.id} section={section}/>
          ))}

          {/* Footer note */}
          <div style={{
            background: `linear-gradient(135deg,rgba(45,143,123,0.07),rgba(26,107,88,0.04))`,
            border: `1px solid ${C.seaBd}`,
            borderRadius: 16,
            padding: '24px 28px',
            marginTop: 16,
          }}>
            <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 18, color: C.text, marginBottom: 8 }}>
              Agreement
            </div>
            <p style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 400, color: C.sub, lineHeight: 1.75, margin: 0 }}>
              By making a booking with Kafira Travel Pvt. Ltd., you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety. These Terms constitute the entire agreement between you and Kafira in relation to your booking and supersede all prior communications, representations, or understandings.
            </p>
          </div>
        </div>
      </div>
      <Footer />

      {/* responsive */}
      <style>{`
        @media (max-width: 900px) {
          .toc-sidebar { display: none !important; }
          main > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
        @media (max-width: 540px) {
          main > div:last-child > div > div:first-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}