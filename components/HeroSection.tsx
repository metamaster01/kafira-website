"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Search, MapPin, Calendar, Users,
  TrendingUp, ArrowRight, X,
} from "lucide-react";
import TRIPS from "../data/upcomingTrips";
import type { Trip } from "../data/upcomingTrips";
import TripModal from "./TripModal";

// ── Palette (matches site-wide seagreen) ──────────────
const SEA     = "#2d8f7b";
const SEA_DK  = "#1a6b58";
const SEA_LT  = "#3db89e";
const SEA_BG  = "rgba(45,143,123,0.12)";
const SEA_BD  = "rgba(45,143,123,0.30)";

const TRENDING = ["Rajasthan", "Manali", "Kerala", "Bali", "Leh"];

// ── Stats — colorful icons ─────────────────────────────
const STATS = [
  {
    value: "50,000+",
    label: "Happy Travelers",
    // people / community icon — warm coral
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: "#ff7c5c",
    bg:    "rgba(255,124,92,0.12)",
    bd:    "rgba(255,124,92,0.25)",
  },
  {
    value: "4.9 ★",
    label: "Google · TripAdvisor",
    // star rating — amber/gold
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="none"/>
      </svg>
    ),
    color: "#f5a623",
    bg:    "rgba(245,166,35,0.12)",
    bd:    "rgba(245,166,35,0.28)",
  },
  {
    value: "120+",
    label: "Destinations",
    // globe — sky blue
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: "#38bdf8",
    bg:    "rgba(56,189,248,0.12)",
    bd:    "rgba(56,189,248,0.25)",
  },
  {
    value: "12 Yrs",
    label: "of Excellence",
    // award ribbon — seagreen
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    color: SEA_LT,
    bg:    SEA_BG,
    bd:    SEA_BD,
  },
];

// ── Responsive hook ────────────────────────────────────
function useIsMobile(bp = 1024) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const check = () => setV(window.innerWidth < bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return v;
}

// ── Search result card (inside dropdown) ──────────────
function SearchResult({
  trip, onClick,
}: { trip: Trip; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        gap: 12,
        padding: "10px 14px",
        cursor: "pointer",
        background: hov ? "rgba(45,143,123,0.08)" : "transparent",
        transition: "background 0.18s",
        borderRadius: 10,
        margin: "0 4px",
      }}
    >
      {/* thumbnail */}
      <div style={{
        width: 56, height: 52, borderRadius: 9, overflow: "hidden",
        background: "linear-gradient(145deg,#0a2520,#0d3028)",
        flexShrink: 0,
      }}>
        <img
          src={trip.image} alt={trip.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: '"DM Serif Display",serif',
          fontSize: 14, color: "#e0f4f0",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          marginBottom: 2,
        }}>{trip.name}</div>
        <div style={{
          fontFamily: '"Montserrat",sans-serif',
          fontSize: 10, fontWeight: 500,
          color: "rgba(180,230,220,0.55)",
          display: "flex", gap: 8, alignItems: "center",
        }}>
          <MapPin size={9} style={{ color: SEA_LT, flexShrink: 0 }}/>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {trip.location}
          </span>
          <span style={{ flexShrink: 0, color: "rgba(180,230,220,0.35)" }}>·</span>
          <span style={{ flexShrink: 0 }}>{trip.duration}</span>
        </div>
      </div>

      {/* price */}
      <div style={{ flexShrink: 0, textAlign: "right" }}>
        <div style={{
          fontFamily: '"DM Serif Display",serif',
          fontSize: 14, color: SEA_LT,
        }}>
          ₹{trip.discountedPrice.toLocaleString("en-IN")}
        </div>
        <div style={{
          fontFamily: '"Montserrat",sans-serif',
          fontSize: 9, fontWeight: 400,
          color: "rgba(180,230,220,0.38)",
        }}>per person</div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────
export default function HeroSection() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [ready,    setReady]    = useState(false);
  const [sFocus,   setSFocus]   = useState(false);
  const [dest,     setDest]     = useState("");
  const [tab,      setTab]      = useState<"tours"|"destinations"|"custom">("tours");
  const [scrollY,  setScrollY]  = useState(0);
  const [results,  setResults]  = useState<Trip[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const [selected, setSelected] = useState<Trip | null>(null);
  const isMobile = useIsMobile(1024);

  // ready fade-in
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  // scroll parallax
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // video autoplay
  useEffect(() => {
    const vid = videoRef.current; if (!vid) return;
    vid.muted = true; vid.playsInline = true;
    const play = () => vid.play().catch(() => setTimeout(() => vid.play().catch(() => {}), 500));
    vid.readyState >= 2 ? play() : vid.addEventListener("canplay", play, { once: true });
  }, []);

  // live search
  const handleSearch = useCallback((val: string) => {
    setDest(val);
    if (!val.trim()) { setResults([]); setShowDrop(false); return; }
    const q = val.toLowerCase();
    const found = TRIPS.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.state.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    ).slice(0, 6);
    setResults(found);
    setShowDrop(true);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDrop(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const openTrip = (trip: Trip) => {
    setSelected(trip);
    setShowDrop(false);
    setDest("");
  };

  const progress = Math.min(scrollY / (typeof window !== "undefined" ? window.innerHeight : 800), 1);

  // ── Responsive sizing ────────────────────────────────
  const navPadTop   = isMobile ? 70 : 110;
  const leftPad     = isMobile ? "20px 20px 60px 20px" : "0 72px 80px 72px";
  const headingSize = isMobile ? "clamp(32px,9vw,52px)" : "clamp(38px,5vw,72px)";
  const subSize     = isMobile ? "14px" : "clamp(14px,1.3vw,17px)";

  // shared search bar styles
  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#e0f4f0",
    fontFamily: '"Montserrat",sans-serif',
    fontSize: 14,
    fontWeight: 400,
  };

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: isMobile ? 600 : 680 }}
      >
        {/* ── VIDEO LAYER ── */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${progress * 30}px) scale(${1.05 + progress * 0.05})`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* fallback bg */}
          <div className="absolute inset-0" style={{ zIndex: 0, background: "linear-gradient(135deg,#071a16 0%,#0d2821 40%,#0a1e18 70%,#071a16 100%)" }}/>

          {/* seagreen ambient orbs */}
          <div style={{ position: "absolute", zIndex: 1, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,143,123,0.18) 0%,transparent 65%)", top: -160, right: -100, pointerEvents: "none", animation: "float 9s ease-in-out infinite" }}/>
          <div style={{ position: "absolute", zIndex: 1, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(61,184,158,0.12) 0%,transparent 65%)", bottom: 60, left: -70, pointerEvents: "none", animation: "float 12s ease-in-out infinite reverse" }}/>
          <div style={{ position: "absolute", zIndex: 1, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(15,79,66,0.20) 0%,transparent 65%)", top: "35%", left: "38%", pointerEvents: "none" }}/>

          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg"
            style={{ zIndex: 2, filter: "brightness(1.15) contrast(1.05) saturate(1.05)", opacity: ready ? 1 : 0, transition: "opacity 1.4s ease" }}
          >
            <source src="/final-video.mp4" type="video/mp4"/>
          </video>
        </div>

        {/* ── GRADIENT MASKS ── */}
        <div className="absolute inset-0" style={{ zIndex: 3, background: "rgba(7,26,22,0.32)" }}/>
        <div className="absolute inset-0" style={{ zIndex: 4, background: isMobile ? "rgba(7,26,22,0.52)" : "linear-gradient(to right,rgba(7,26,22,0.82) 0%,rgba(7,26,22,0.38) 55%,rgba(7,26,22,0.06) 100%)" }}/>
        <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to top,rgba(7,26,22,0.75) 0%,rgba(7,26,22,0.22) 35%,transparent 70%)" }}/>
        <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to bottom,rgba(7,26,22,0.30) 0%,transparent 28%)" }}/>

        {/* ── CONTENT ── */}
        <div className="relative h-full" style={{ zIndex: 10, paddingTop: navPadTop, display: "flex", flexDirection: isMobile ? "column" : "row" }}>

          {/* ── LEFT / TOP: copy + search ── */}
          <div style={{ width: isMobile ? "100%" : "52%", padding: leftPad, display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "center", paddingTop: isMobile ? 28 : undefined }}>

            {/* eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(16px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
              <div style={{ width: 28, height: 1, background: `linear-gradient(to right,${SEA},transparent)`, flexShrink: 0 }}/>
              <span style={{ color: SEA_LT, fontSize: 10, letterSpacing: "0.22em", fontFamily: '"Montserrat",sans-serif', fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Discover · Experience · Cherish
              </span>
            </div>

            {/* headline */}
            <h1 style={{ fontSize: headingSize, fontFamily: '"DM Serif Display",serif', fontWeight: 400, lineHeight: 1.06, color: "#e8f7f4", marginBottom: 12, letterSpacing: "-0.01em", opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(24px)", transition: "opacity 0.85s ease 0.2s, transform 0.85s ease 0.2s" }}>
              Where Will<br/>
              <span style={{ fontStyle: "italic", color: SEA_LT }}>Your Story</span> Begin?
            </h1>

            {/* subline */}
            <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: subSize, color: "rgba(180,230,220,0.62)", lineHeight: 1.75, maxWidth: isMobile ? "100%" : 430, marginBottom: isMobile ? 20 : 28, opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transition: "opacity 0.85s ease 0.32s, transform 0.85s ease 0.32s" }}>
              {isMobile ? "Handcrafted journeys across India and beyond." : "Handcrafted journeys across India and beyond. Every trip, a memory worth keeping."}
            </p>

            {/* ── SEARCH AREA ── */}
            <div style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transition: "opacity 0.85s ease 0.44s, transform 0.85s ease 0.44s" }}>

              {/* tab pills */}
              <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                {(["tours", "destinations", ...(isMobile ? [] : ["custom"])] as ("tours"|"destinations"|"custom")[]).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: isMobile ? "5px 13px" : "6px 16px",
                    borderRadius: 999, fontSize: 11,
                    fontFamily: '"Montserrat",sans-serif', fontWeight: 600,
                    textTransform: "capitalize", cursor: "pointer",
                    transition: "all 0.25s ease",
                    ...(tab === t
                      ? { background: `linear-gradient(135deg,${SEA},${SEA_DK})`, color: "#fff", border: "none", boxShadow: `0 4px 14px rgba(45,143,123,0.35)` }
                      : { background: "rgba(45,143,123,0.10)", color: "rgba(180,230,220,0.55)", border: `1px solid rgba(45,143,123,0.22)` }),
                  }}>
                    {t}
                  </button>
                ))}
              </div>

              {/* ── search box with live dropdown ── */}
              <div ref={searchRef} style={{ position: "relative", maxWidth: isMobile ? "100%" : 560 }}>

                {/* input wrapper */}
                <div style={{
                  display: "flex",
                  alignItems: "stretch",
                  background: sFocus ? "rgba(13,40,33,0.78)" : "rgba(13,40,33,0.62)",
                  border: `1.5px solid ${sFocus ? SEA_BD : "rgba(45,143,123,0.18)"}`,
                  borderRadius: showDrop && results.length ? "16px 16px 0 0" : 16,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  overflow: "hidden",
                  boxShadow: sFocus ? `0 0 0 1px ${SEA_BG},0 12px 48px rgba(0,0,0,0.45)` : "0 10px 40px rgba(0,0,0,0.3)",
                  transition: "all 0.28s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", padding: "0 13px", color: SEA_LT, flexShrink: 0 }}>
                    <MapPin size={16}/>
                  </div>
                  <input
                    type="text"
                    placeholder={isMobile ? "Where do you want to go?" : "Search destinations, tours…"}
                    value={dest}
                    onChange={e => handleSearch(e.target.value)}
                    onFocus={() => { setSFocus(true); if (dest) setShowDrop(true); }}
                    onBlur={() => setSFocus(false)}
                    style={{ ...inputStyle, padding: isMobile ? "13px 0" : "15px 0" }}
                  />
                  {/* clear button */}
                  {dest && (
                    <button
                      onClick={() => { setDest(""); setResults([]); setShowDrop(false); }}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "0 8px", color: "rgba(180,230,220,0.4)", display: "flex", alignItems: "center", flexShrink: 0 }}
                    >
                      <X size={14}/>
                    </button>
                  )}
                  {/* desktop extras */}
                  {!isMobile && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderLeft: "1px solid rgba(45,143,123,0.14)", flexShrink: 0 }}>
                        <Calendar size={12} style={{ color: "rgba(180,230,220,0.32)" }}/>
                        <span style={{ fontSize: 12, fontFamily: '"Montserrat",sans-serif', fontWeight: 400, color: "rgba(180,230,220,0.32)" }}>Any Date</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderLeft: "1px solid rgba(45,143,123,0.14)", flexShrink: 0 }}>
                        <Users size={12} style={{ color: "rgba(180,230,220,0.32)" }}/>
                        <span style={{ fontSize: 12, fontFamily: '"Montserrat",sans-serif', fontWeight: 400, color: "rgba(180,230,220,0.32)" }}>2 People</span>
                      </div>
                    </>
                  )}
                  {/* search button */}
                  <button style={{
                    margin: 6, padding: "0 16px", borderRadius: 11, flexShrink: 0,
                    background: `linear-gradient(135deg,${SEA},${SEA_DK})`,
                    color: "#fff", fontFamily: '"Montserrat",sans-serif', fontWeight: 700, fontSize: 12,
                    cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 5,
                    transition: "all 0.22s", boxShadow: `0 4px 14px rgba(45,143,123,0.35)`,
                    whiteSpace: "nowrap",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1.04)"; el.style.boxShadow = `0 8px 22px rgba(45,143,123,0.5)`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1)"; el.style.boxShadow = `0 4px 14px rgba(45,143,123,0.35)`; }}
                  >
                    <Search size={14}/> {isMobile ? "Search" : "Explore"}
                  </button>
                </div>

                {/* ── live search dropdown ── */}
                {showDrop && results.length > 0 && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
                    background: "rgba(10,28,24,0.96)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: `1.5px solid ${SEA_BD}`,
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                    overflow: "hidden",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                    padding: "6px 0 8px",
                  }}>
                    {/* header */}
                    <div style={{ padding: "4px 18px 8px", display: "flex", alignItems: "center", gap: 6, borderBottom: `1px solid rgba(45,143,123,0.12)`, marginBottom: 4 }}>
                      <Search size={10} style={{ color: SEA_LT }}/>
                      <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 600, color: "rgba(180,230,220,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {results.length} result{results.length !== 1 ? "s" : ""} found
                      </span>
                    </div>
                    {results.map(trip => (
                      <SearchResult key={trip.id} trip={trip} onClick={() => openTrip(trip)}/>
                    ))}
                  </div>
                )}

                {/* no results */}
                {showDrop && dest.trim() && results.length === 0 && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
                    background: "rgba(10,28,24,0.96)",
                    backdropFilter: "blur(28px)",
                    border: `1.5px solid ${SEA_BD}`,
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                    padding: "20px 18px",
                    textAlign: "center",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>🔍</div>
                    <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 500, color: "rgba(180,230,220,0.55)" }}>
                      No trips found for "{dest}"
                    </div>
                    <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, color: "rgba(180,230,220,0.3)", marginTop: 4 }}>
                      Try Rajasthan, Manali, or Kerala
                    </div>
                  </div>
                )}
              </div>

              {/* trending pills */}
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 12, flexWrap: "wrap" }}>
                <TrendingUp size={11} style={{ color: SEA_LT }}/>
                <span style={{ fontSize: 10, fontFamily: '"Montserrat",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.40)" }}>
                  Trending:
                </span>
                {(isMobile ? TRENDING.slice(0, 3) : TRENDING).map(t => (
                  <button key={t} onClick={() => handleSearch(t)} style={{
                    padding: "3px 10px", borderRadius: 999, fontSize: 10,
                    fontFamily: '"Montserrat",sans-serif', fontWeight: 500,
                    cursor: "pointer", transition: "all 0.2s",
                    background: SEA_BG, color: `rgba(61,184,158,0.75)`,
                    border: `1px solid ${SEA_BD}`,
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(45,143,123,0.22)"; el.style.color = SEA_LT; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = SEA_BG; el.style.color = "rgba(61,184,158,0.75)"; }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* view all — desktop */}
            {!isMobile && (
              <div style={{ marginTop: 26, opacity: ready ? 1 : 0, transition: "opacity 0.85s ease 0.6s" }}>
                <a href="#tours" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 500, color: "rgba(180,230,220,0.48)", textDecoration: "none", transition: "color 0.25s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = SEA_LT; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,230,220,0.48)"; }}
                >
                  View all packages <ArrowRight size={13}/>
                </a>
              </div>
            )}
          </div>

          {/* ── RIGHT: stats ── */}
          {!isMobile ? (
            /* DESKTOP: vertical floating cards */
            <div className="hidden lg:flex flex-col justify-center items-end" style={{
              width: "34%", marginLeft: "auto",
              padding: "0 52px 80px 0", gap: 16,
              opacity: ready ? 1 : 0, transform: ready ? "none" : "translateX(28px)",
              transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
            }}>
              {STATS.map(({ value, label, icon, color, bg, bd }, i) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "16px 20px", borderRadius: 16, width: "100%", maxWidth: 218,
                    background: "rgba(10,28,24,0.62)", border: "1px solid rgba(45,143,123,0.18)",
                    backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                    cursor: "default", transition: "all 0.3s ease",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = "0 18px 50px rgba(0,0,0,0.45)"; el.style.borderColor = SEA_BD; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; el.style.borderColor = "rgba(45,143,123,0.18)"; }}
                  >
                    {/* colorful icon box */}
                    <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: bg, border: `1.5px solid ${bd}`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 22, color: "#e0f4f0", lineHeight: 1 }}>
                        {value}
                      </div>
                      <div style={{ fontSize: 11, fontFamily: '"Montserrat",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.45)", marginTop: 4, letterSpacing: "0.03em" }}>
                        {label}
                      </div>
                    </div>
                  </div>
                  {i < STATS.length - 1 && (
                    <div style={{ width: 1, height: 16, marginRight: 34, background: `linear-gradient(to bottom,rgba(45,143,123,0.25),rgba(45,143,123,0.03))` }}/>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* MOBILE: stats strip at bottom */
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
              padding: "14px 20px 20px",
              background: "linear-gradient(to top,rgba(7,26,22,0.94) 0%,rgba(7,26,22,0.62) 70%,transparent 100%)",
              opacity: ready ? 1 : 0, transition: "opacity 0.9s ease 0.6s",
            }}>
              <a href="#tours" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 12, fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 500, color: "rgba(180,230,220,0.45)", textDecoration: "none" }}>
                View all packages <ArrowRight size={11}/>
              </a>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {STATS.map(({ value, label, icon, color, bg, bd }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 6px", borderRadius: 12, background: "rgba(10,28,24,0.7)", border: `1px solid rgba(45,143,123,0.18)`, backdropFilter: "blur(16px)", textAlign: "center" }}>
                    <div style={{ color, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* smaller icon on mobile */}
                      <span style={{ transform: "scale(0.72)", transformOrigin: "center", display: "block" }}>{icon}</span>
                    </div>
                    <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 14, color: "#e0f4f0", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 9, fontFamily: '"Montserrat",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.38)", marginTop: 3, lineHeight: 1.25 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── scroll indicator — desktop ── */}
        {!isMobile && (
          <div style={{ position: "absolute", bottom: 32, left: "25%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: ready && scrollY < 60 ? 0.45 : 0, transition: "opacity 0.5s ease", zIndex: 20, pointerEvents: "none" }}>
            <span style={{ fontSize: 9, fontFamily: '"Montserrat",sans-serif', fontWeight: 600, color: "rgba(180,230,220,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: 22, height: 38, borderRadius: 11, border: "1px solid rgba(45,143,123,0.3)", display: "flex", justifyContent: "center", paddingTop: 7 }}>
              <div style={{ width: 3, height: 7, borderRadius: 2, background: SEA_LT, animation: "scrollDot 1.6s ease-in-out infinite" }}/>
            </div>
          </div>
        )}

        {/* keyframes */}
        <style>{`
          @keyframes float {
            0%,100% { transform: translateY(0) scale(1); }
            50%      { transform: translateY(-22px) scale(1.03); }
          }
          @keyframes scrollDot {
            0%   { transform: translateY(0); opacity: 1; }
            80%  { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 0; }
          }
        `}</style>
      </section>

      {/* ── Trip Modal — renders outside the section ── */}
      {selected && (
        <TripModal trip={selected} onClose={() => setSelected(null)}/>
      )}
    </>
  );
}