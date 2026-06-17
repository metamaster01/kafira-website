"use client";

import { useState } from "react";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  Landmark,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

// ── Palette — matches site-wide seagreen ──────────────
const SEA    = "#2d8f7b";
const SEA_DK = "#1a6b58";
const SEA_LT = "#3db89e";
const SEA_BG = "rgba(45,143,123,0.08)";
const SEA_BD = "rgba(45,143,123,0.20)";
const TEXT   = "#0f2720";
const SUB    = "#2d5a52";
const MUTED  = "#6b9e94";

// ── Copy-to-clipboard row ──────────────────────────────
function DetailRow({
  label,
  value,
  copyable = true,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "14px 16px",
        borderRadius: 12,
        background: "#f7faf9",
        border: `1px solid ${SEA_BD}`,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: '"Inter",sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: MUTED,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: '"Inter",sans-serif',
            fontSize: 15,
            fontWeight: 700,
            color: TEXT,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
      </div>

      {copyable && (
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.9 }}
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            background: copied ? "rgba(34,197,94,0.12)" : SEA_BG,
            color: copied ? "#22c55e" : SEA,
            transition: "all 0.2s ease",
          }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </motion.button>
      )}
    </div>
  );
}

// ── Payment method card ─────────────────────────────────
function PaymentCard({
  icon,
  title,
  rows,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  rows: { label: string; value: string }[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid rgba(0,0,0,0.05)",
        padding: "clamp(24px,3vw,36px)",
        boxShadow: "0 10px 40px rgba(15,39,32,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: SEA_BG,
            border: `1.5px solid ${SEA_BD}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: SEA,
          }}
        >
          {icon}
        </div>
        <h2
          style={{
            fontFamily: '"Inter",sans-serif',
            fontWeight: 600,
            fontSize: "clamp(20px,2.4vw,26px)",
            color: TEXT,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
      </div>

      {/* rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r) => (
          <DetailRow key={r.label} label={r.label} value={r.value} />
        ))}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════
export default function PaymentsPage() {
  return (
    <main style={{ background: "#071a16", minHeight: "100vh" }}>
      <Navbar />

      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "clamp(48px,8vw,96px) clamp(20px,5vw,40px) clamp(48px,6vw,80px)",
        }}
      >
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(36px,5vw,56px)", maxWidth: 680 }}
        >
          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: SEA_BG,
                border: `1.5px solid ${SEA_BD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: SEA,
              }}
            >
              <Sparkles size={15} />
            </div>
            <span
              style={{
                fontFamily: '"Montserrat",sans-serif',
                fontSize: 11,
                fontWeight: 300,
                color: SEA,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}
            >
              Secure Payments
            </span>
          </div>

          <h1
            style={{
              fontFamily: '"Inter",sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(22px,3.5vw,44px)',
              lineHeight: 1.08,
              color: "#fff",
              margin: "0 0 16px",
              letterSpacing: "-0.025em",
            }}
          >
            Pay <span style={{ color: SEA }}>Kafira Travels</span>
          </h1>

          <p
            style={{
              fontFamily: '"Montserrat",sans-serif',
              fontSize: "clamp(13px,1.3vw,16px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Use the official payment methods below to securely complete your
            booking with Kafira Travels. Tap the copy icon to grab any detail
            instantly.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "clamp(20px,3vw,32px)",
          }}
          className="payments-grid"
        >
          {/* LEFT: payment methods */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2.5vw,28px)" }}>
            <PaymentCard
              icon={<Landmark size={26} />}
              title="Bank Transfer"
              delay={0.05}
              rows={[
                { label: "Account Number", value: "017401559955" },
                { label: "Account Name", value: "Niranjan" },
                { label: "IFSC Code", value: "ICIC0000174" },
                { label: "Bank Name", value: "ICICI Bank" },
              ]}
            />

            <PaymentCard
              icon={<Smartphone size={26} />}
              title="UPI Payment"
              delay={0.15}
              rows={[
                { label: "UPI ID", value: "8708030264-3@ybl" },
                { label: "UPI Name", value: "Niranjan" },
                { label: "Supported Apps", value: "GPay · PhonePe · Paytm · BHIM" },
              ]}
            />
          </div>

          {/* RIGHT: important notes — sticky */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "sticky",
              top: 96,
              alignSelf: "start",
              background: "#fff7f2",
              border: "1.5px solid rgba(239,68,68,0.18)",
              borderRadius: 24,
              padding: "clamp(22px,2.6vw,30px)",
              height: "fit-content",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(239,68,68,0.10)",
                  border: "1.5px solid rgba(239,68,68,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#ef4444",
                }}
              >
                <AlertTriangle size={20} />
              </div>
              <h3
                style={{
                  fontFamily: '"Inter",sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(20px,1.8vw,21px)",
                  color: "#9f1f1f",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Important Notes
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Make payments only to the official account details listed on this page.",
                "Kafira Travels will not be responsible for payments made to unauthorized accounts.",
                "Verify payment details with your travel advisor before transferring funds.",
                "Contact our support team if you have any payment related questions.",
              ].map((note, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#ef4444",
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: '"Montserrat",sans-serif',
                      fontSize: 13,
                      color: "#7a3a3a",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── PAYMENT POLICY ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "clamp(20px,3.5vw,40px)",
            background: "#ffffff",
            borderRadius: 28,
            border: "1px solid rgba(0,0,0,0.05)",
            padding: "clamp(28px,4vw,48px)",
            boxShadow: "0 10px 40px rgba(15,39,32,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 16,
                background: SEA_BG,
                border: `1.5px solid ${SEA_BD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: SEA,
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <h2
              style={{
                fontFamily: '"Inter",sans-serif',
                fontWeight: 600,
                fontSize: "clamp(20px,2.4vw,28px)",
                color: TEXT,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Payment Policy
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p
              style={{
                fontFamily: '"Montserrat",sans-serif',
                fontSize: "clamp(13px,1.1vw,15px)",
                color: SUB,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              For Short Haul Destinations refer to the Short Haul Payment &amp;
              Cancellation Policy and for Long Haul Destinations refer to the
              Long Haul Payment &amp; Cancellation Policy.
            </p>

            {/* Short / Long haul cards */}
            <div className="haul-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div
                style={{
                  background: "#f7faf9",
                  border: `1px solid ${SEA_BD}`,
                  borderRadius: 16,
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Inter",sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    color: SEA,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Short Haul Destinations
                </div>
                <p
                  style={{
                    fontFamily: '"Montserrat",sans-serif',
                    fontSize: 13,
                    color: SUB,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Domestic Trips, Bhutan, Nepal, Sri Lanka, Thailand, Singapore,
                  Bali, Dubai, Kazakhstan, Azerbaijan, Vietnam, Malaysia,
                  Maldives, Mauritius and similar destinations.
                </p>
              </div>

              <div
                style={{
                  background: "#f7faf9",
                  border: `1px solid ${SEA_BD}`,
                  borderRadius: 16,
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Inter",sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    color: SEA,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Long Haul Destinations
                </div>
                <p
                  style={{
                    fontFamily: '"Montserrat",sans-serif',
                    fontSize: 13,
                    color: SUB,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Europe, UK, Scotland, Ireland, USA, Canada, Japan, South
                  Korea, Turkey, Egypt, Australia, New Zealand, South Africa,
                  Kenya, South America, Jordan, Israel and similar
                  destinations.
                </p>
              </div>
            </div>

            {/* policy bullets */}
            <div
              style={{
                background: `linear-gradient(135deg, ${SEA_BG}, rgba(45,143,123,0.03))`,
                border: `1px solid ${SEA_BD}`,
                borderRadius: 16,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                "Full airfare payment is required before issuance of flight tickets.",
                "Non-refundable services must be paid in full at the time of booking.",
                "Payment policy is non-negotiable and must be followed as per booking terms.",
                "Payment schedules may vary depending on destination, seasonality, events and travel dates.",
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: SEA,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: '"Inter",sans-serif',
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontFamily: '"Montserrat",sans-serif',
                      fontSize: 13,
                      color: TEXT,
                      lineHeight: 1.7,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <CTABanner />
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
      

        @media (max-width: 900px) {
          .payments-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .haul-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}