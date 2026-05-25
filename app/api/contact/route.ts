import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Admin email — set this in your .env.local ──────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'your@gmail.com';
const FROM_EMAIL  = process.env.FROM_EMAIL  ?? 'Kafira Trips <noreply@kafira.in>';
// Note: FROM_EMAIL domain must be verified in your Resend dashboard.
// Until then, use: onboarding@resend.dev for testing.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, email, phone,
      destination,
      adults, children,
      travelTypes,
      accommodations,
      budget,
      message,
    } = body;

    // ── Basic server-side validation ──────────────────
    if (!name?.trim() || !email?.trim() || !destination) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const BUDGET_LABELS = [
      'Under ₹10,000',
      '₹10,000 – ₹25,000',
      '₹25,000 – ₹50,000',
      '₹50,000 – ₹1,00,000',
      'Above ₹1,00,000',
    ];

    // ── Build the admin email HTML ────────────────────
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Trip Request — Kafira</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', Arial, sans-serif; background: #f4f9f8; color: #0e1e1b; }
    .wrap { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid rgba(45,143,123,0.2); box-shadow: 0 8px 32px rgba(14,30,27,0.08); }
    .header { background: #071a16; padding: 36px 32px; text-align: center; }
    .header h1 { font-family: Georgia, serif; font-size: 26px; color: #e8f7f4; margin-bottom: 6px; }
    .header p { font-size: 13px; color: rgba(180,230,220,0.6); }
    .badge { display: inline-block; background: rgba(45,143,123,0.2); color: #3db89e; border-radius: 999px; padding: 4px 14px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; }
    .section { padding: 24px 32px; border-bottom: 1px solid rgba(45,143,123,0.1); }
    .section:last-child { border-bottom: none; }
    .section-title { font-size: 10px; font-weight: 700; color: #2d8f7b; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 14px; }
    .row { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
    .label { font-size: 12px; font-weight: 600; color: #6b9e94; min-width: 120px; flex-shrink: 0; padding-top: 1px; }
    .value { font-size: 14px; color: #0e1e1b; line-height: 1.5; flex: 1; }
    .pill { display: inline-block; background: rgba(45,143,123,0.09); color: #1a6b58; border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 500; margin: 2px 3px 2px 0; }
    .highlight { background: #eaf3f1; border-radius: 12px; padding: 14px 18px; }
    .highlight .value { font-size: 16px; font-weight: 700; color: #2d8f7b; }
    .message-box { background: #f4f9f8; border-radius: 10px; padding: 14px 16px; font-size: 13px; color: #2d5a52; line-height: 1.7; border-left: 3px solid #2d8f7b; }
    .footer { background: #f4f9f8; padding: 20px 32px; text-align: center; font-size: 11px; color: #6b9e94; }
    .cta { display: inline-block; margin-top: 14px; padding: 10px 24px; background: linear-gradient(135deg,#2d8f7b,#1a6b58); color: #fff; border-radius: 999px; text-decoration: none; font-size: 13px; font-weight: 700; }
  </style>
</head>
<body>
  <div class="wrap">

    <div class="header">
      <div class="badge">New Trip Request</div>
      <h1>✈️ Kafira Trip Enquiry</h1>
      <p>A traveler has submitted a trip planning request</p>
    </div>

    <!-- Traveler Details -->
    <div class="section">
      <div class="section-title">Traveler Details</div>
      <div class="row"><span class="label">Full Name</span><span class="value"><strong>${name}</strong></span></div>
      <div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${email}" style="color:#2d8f7b;text-decoration:none;">${email}</a></span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${phone ? `<a href="tel:${phone}" style="color:#2d8f7b;text-decoration:none;">${phone}</a>` : '<span style="color:#6b9e94">Not provided</span>'}</span></div>
    </div>

    <!-- Trip Details -->
    <div class="section">
      <div class="section-title">Trip Details</div>
      <div class="row"><span class="label">Destination</span><span class="value"><strong>${destination}</strong></span></div>
      <div class="row">
        <span class="label">Travelers</span>
        <span class="value">
          <span class="pill">👤 ${adults} Adult${adults !== 1 ? 's' : ''}</span>
          ${children > 0 ? `<span class="pill">🧒 ${children} Child${children !== 1 ? 'ren' : ''}</span>` : ''}
        </span>
      </div>
      <div class="row">
        <span class="label">Travel Type</span>
        <span class="value">
          ${(travelTypes as string[]).map(t => `<span class="pill">${t}</span>`).join('')}
        </span>
      </div>
      <div class="row">
        <span class="label">Accommodation</span>
        <span class="value">
          ${(accommodations as string[]).length > 0
            ? (accommodations as string[]).map(a => `<span class="pill">${a}</span>`).join('')
            : '<span style="color:#6b9e94">No preference</span>'
          }
        </span>
      </div>
    </div>

    <!-- Budget -->
    <div class="section">
      <div class="section-title">Budget per Person</div>
      <div class="highlight">
        <div class="value">${BUDGET_LABELS[budget as number] ?? 'Not specified'}</div>
      </div>
    </div>

    ${message?.trim() ? `
    <!-- Message -->
    <div class="section">
      <div class="section-title">Special Requests / Message</div>
      <div class="message-box">${message.trim().replace(/\n/g, '<br/>')}</div>
    </div>` : ''}

    <!-- CTA -->
    <div class="section" style="text-align:center;padding:28px 32px;">
      <p style="font-size:13px;color:#6b9e94;margin-bottom:4px;">Reply to this traveler within 2 hours</p>
      <a href="mailto:${email}" class="cta">Reply to ${name.split(' ')[0]}</a>
      ${phone ? `&nbsp;&nbsp;<a href="https://wa.me/91${phone}" class="cta" style="background:linear-gradient(135deg,#25d366,#1da851);">WhatsApp</a>` : ''}
    </div>

    <div class="footer">
      This enquiry was submitted via the Kafira website contact form.<br/>
      Kafira Travel Pvt. Ltd. · Mumbai, India · <a href="https://www.kafira.in" style="color:#2d8f7b;">kafira.in</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    // ── Send to admin ─────────────────────────────────
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to:   [ADMIN_EMAIL],
      replyTo: email,
      subject: `🗺️ New Trip Request: ${destination} — ${name}`,
      html,
    });

    if (error) {
      console.error('[Resend error]', error);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    // ── Auto-reply to traveler ────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to:   [email],
      subject: `We've received your trip request, ${name.split(' ')[0]}! 🏕️`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>
  body{font-family:Arial,sans-serif;background:#f4f9f8;color:#0e1e1b;}
  .wrap{max-width:520px;margin:32px auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid rgba(45,143,123,0.18);}
  .header{background:#071a16;padding:36px 32px;text-align:center;}
  .header h1{font-family:Georgia,serif;font-size:24px;color:#e8f7f4;margin-bottom:6px;}
  .body{padding:28px 32px;}
  p{font-size:14px;line-height:1.75;color:#2d5a52;margin-bottom:14px;}
  .highlight{background:#eaf3f1;border-radius:10px;padding:14px 18px;font-size:14px;color:#1a6b58;font-weight:600;margin:18px 0;}
  .footer{background:#f4f9f8;padding:18px 32px;text-align:center;font-size:11px;color:#6b9e94;}
  .cta{display:inline-block;margin-top:6px;padding:12px 28px;background:linear-gradient(135deg,#2d8f7b,#1a6b58);color:#fff;border-radius:999px;text-decoration:none;font-size:13px;font-weight:700;}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>🗺️ We've Got Your Request!</h1>
    <p style="font-size:13px;color:rgba(180,230,220,0.6);">Kafira Travel · Your journey begins here</p>
  </div>
  <div class="body">
    <p>Hi <strong>${name.split(' ')[0]}</strong>,</p>
    <p>Thanks for reaching out to Kafira! We've received your trip planning request for <strong>${destination}</strong> and our travel expert will get back to you within <strong>2 hours</strong> with a personalised itinerary and quote.</p>
    <div class="highlight">📍 Requested Destination: ${destination}</div>
    <p>While you wait, feel free to browse our upcoming trips or WhatsApp us if you have any urgent questions.</p>
    <a href="https://wa.me/919999999999" class="cta">Chat on WhatsApp</a>
  </div>
  <div class="footer">Kafira Travel Pvt. Ltd. · Mumbai, India · kafira.in<br/>You're receiving this because you submitted a trip request on our website.</div>
</div>
</body>
</html>
      `.trim(),
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('[Contact API error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}