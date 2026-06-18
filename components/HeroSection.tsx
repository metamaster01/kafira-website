// // "use client";
// // import { useEffect, useRef, useState, useCallback } from "react";
// // import {
// //   Search, MapPin, Calendar, Users,
// //   TrendingUp, ArrowRight, X,
// // } from "lucide-react";
// // import TRIPS from "../data/upcomingTrips";
// // import type { Trip } from "../data/types";
// // import TripModal from "./TripModal";

// // // ── Palette (matches site-wide seagreen) ──────────────
// // const SEA     = "#2d8f7b";
// // const SEA_DK  = "#1a6b58";
// // const SEA_LT  = "#3db89e";
// // const SEA_BG  = "rgba(45,143,123,0.12)";
// // const SEA_BD  = "rgba(45,143,123,0.30)";

// // const TRENDING = ["Rajasthan", "Manali", "Kerala", "Bali", "Leh"];

// // // ── Stats — colorful icons ─────────────────────────────
// // const STATS = [
// //   {
// //     value: "50,000+",
// //     label: "Happy Travelers",
// //     // people / community icon — warm coral
// //     icon: (
// //       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
// //         <circle cx="9" cy="7" r="4"/>
// //         <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
// //         <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
// //       </svg>
// //     ),
// //     color: "#ff7c5c",
// //     bg:    "rgba(255,124,92,0.12)",
// //     bd:    "rgba(255,124,92,0.25)",
// //   },
// //   {
// //     value: "4.9 ★",
// //     label: "Google · TripAdvisor",
// //     // star rating — amber/gold
// //     icon: (
// //       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
// //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="none"/>
// //       </svg>
// //     ),
// //     color: "#f5a623",
// //     bg:    "rgba(245,166,35,0.12)",
// //     bd:    "rgba(245,166,35,0.28)",
// //   },
// //   {
// //     value: "120+",
// //     label: "Destinations",
// //     // globe — sky blue
// //     icon: (
// //       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <circle cx="12" cy="12" r="10"/>
// //         <line x1="2" y1="12" x2="22" y2="12"/>
// //         <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
// //       </svg>
// //     ),
// //     color: "#38bdf8",
// //     bg:    "rgba(56,189,248,0.12)",
// //     bd:    "rgba(56,189,248,0.25)",
// //   },
// //   {
// //     value: "12 Yrs",
// //     label: "of Excellence",
// //     // award ribbon — seagreen
// //     icon: (
// //       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <circle cx="12" cy="8" r="6"/>
// //         <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
// //       </svg>
// //     ),
// //     color: SEA_LT,
// //     bg:    SEA_BG,
// //     bd:    SEA_BD,
// //   },
// // ];

// // // ── Responsive hook ────────────────────────────────────
// // function useIsMobile(bp = 1024) {
// //   const [v, setV] = useState(false);
// //   useEffect(() => {
// //     const check = () => setV(window.innerWidth < bp);
// //     check();
// //     window.addEventListener("resize", check);
// //     return () => window.removeEventListener("resize", check);
// //   }, [bp]);
// //   return v;
// // }

// // // ── Search result card (inside dropdown) ──────────────
// // function SearchResult({
// //   trip, onClick,
// // }: { trip: Trip; onClick: () => void }) {
// //   const [hov, setHov] = useState(false);
// //   return (
// //     <div
// //       onClick={onClick}
// //       onMouseEnter={() => setHov(true)}
// //       onMouseLeave={() => setHov(false)}
// //       style={{
// //         display: "flex",
// //         gap: 12,
// //         padding: "10px 14px",
// //         cursor: "pointer",
// //         background: hov ? "rgba(45,143,123,0.08)" : "transparent",
// //         transition: "background 0.18s",
// //         borderRadius: 10,
// //         margin: "0 4px",
// //       }}
// //     >
// //       {/* thumbnail */}
// //       <div style={{
// //         width: 56, height: 52, borderRadius: 9, overflow: "hidden",
// //         background: "linear-gradient(145deg,#0a2520,#0d3028)",
// //         flexShrink: 0,
// //       }}>
// //         <img
// //           src={trip.image} alt={trip.name}
// //           style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
// //           onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
// //         />
// //       </div>

// //       {/* info */}
// //       <div style={{ flex: 1, minWidth: 0 }}>
// //         <div style={{
// //           fontFamily: '"DM Serif Display",serif',
// //           fontSize: 14, color: "#e0f4f0",
// //           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
// //           marginBottom: 2,
// //         }}>{trip.name}</div>
// //         <div style={{
// //           fontFamily: '"Montserrat",sans-serif',
// //           fontSize: 10, fontWeight: 500,
// //           color: "rgba(180,230,220,0.55)",
// //           display: "flex", gap: 8, alignItems: "center",
// //         }}>
// //           <MapPin size={9} style={{ color: SEA_LT, flexShrink: 0 }}/>
// //           <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// //             {trip.location}
// //           </span>
// //           <span style={{ flexShrink: 0, color: "rgba(180,230,220,0.35)" }}>·</span>
// //           <span style={{ flexShrink: 0 }}>{trip.duration}</span>
// //         </div>
// //       </div>

// //       {/* price */}
// //       <div style={{ flexShrink: 0, textAlign: "right" }}>
// //         <div style={{
// //           fontFamily: '"DM Serif Display",serif',
// //           fontSize: 14, color: SEA_LT,
// //         }}>
// //           ₹{trip.discountedPrice.toLocaleString("en-IN")}
// //         </div>
// //         <div style={{
// //           fontFamily: '"Montserrat",sans-serif',
// //           fontSize: 9, fontWeight: 400,
// //           color: "rgba(180,230,220,0.38)",
// //         }}>per person</div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Main ──────────────────────────────────────────────
// // export default function HeroSection() {
// //   const videoRef  = useRef<HTMLVideoElement>(null);
// //   const searchRef = useRef<HTMLDivElement>(null);

// //   const [ready,    setReady]    = useState(false);
// //   const [sFocus,   setSFocus]   = useState(false);
// //   const [dest,     setDest]     = useState("");
// //   const [tab,      setTab]      = useState<"tours"|"destinations"|"custom">("tours");
// //   const [scrollY,  setScrollY]  = useState(0);
// //   const [results,  setResults]  = useState<Trip[]>([]);
// //   const [showDrop, setShowDrop] = useState(false);
// //   const [selected, setSelected] = useState<Trip | null>(null);
// //   const isMobile = useIsMobile(1024);

// //   // ready fade-in
// //   useEffect(() => {
// //     const t = setTimeout(() => setReady(true), 150);
// //     return () => clearTimeout(t);
// //   }, []);

// //   // scroll parallax
// //   useEffect(() => {
// //     const fn = () => setScrollY(window.scrollY);
// //     window.addEventListener("scroll", fn, { passive: true });
// //     return () => window.removeEventListener("scroll", fn);
// //   }, []);

// //   // video autoplay
// //   useEffect(() => {
// //     const vid = videoRef.current; if (!vid) return;
// //     vid.muted = true; vid.playsInline = true;
// //     const play = () => vid.play().catch(() => setTimeout(() => vid.play().catch(() => {}), 500));
// //     vid.readyState >= 2 ? play() : vid.addEventListener("canplay", play, { once: true });
// //   }, []);

// //   // live search
// //   const handleSearch = useCallback((val: string) => {
// //     setDest(val);
// //     if (!val.trim()) { setResults([]); setShowDrop(false); return; }
// //     const q = val.toLowerCase();
// //     const found = TRIPS.filter(t =>
// //       t.name.toLowerCase().includes(q) ||
// //       t.location.toLowerCase().includes(q) ||
// //       t.state.toLowerCase().includes(q) ||
// //       t.tags.some(tag => tag.toLowerCase().includes(q))
// //     ).slice(0, 6);
// //     setResults(found);
// //     setShowDrop(true);
// //   }, []);

// //   // close dropdown on outside click
// //   useEffect(() => {
// //     const fn = (e: MouseEvent) => {
// //       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
// //         setShowDrop(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", fn);
// //     return () => document.removeEventListener("mousedown", fn);
// //   }, []);

// //   const openTrip = (trip: Trip) => {
// //     setSelected(trip);
// //     setShowDrop(false);
// //     setDest("");
// //   };

// //   const progress = Math.min(scrollY / (typeof window !== "undefined" ? window.innerHeight : 800), 1);

// //   // ── Responsive sizing ────────────────────────────────
// //   const navPadTop   = isMobile ? 70 : 110;
// //   const leftPad     = isMobile ? "20px 20px 60px 20px" : "0 72px 80px 72px";
// //   const headingSize = isMobile ? "clamp(32px,9vw,52px)" : "clamp(38px,5vw,72px)";
// //   const subSize     = isMobile ? "14px" : "clamp(14px,1.3vw,17px)";

// //   // shared search bar styles
// //   const inputStyle: React.CSSProperties = {
// //     flex: 1,
// //     background: "transparent",
// //     border: "none",
// //     outline: "none",
// //     color: "#e0f4f0",
// //     fontFamily: '"Montserrat",sans-serif',
// //     fontSize: 14,
// //     fontWeight: 400,
// //   };

// //   return (
// //     <>
// //       <section
// //         className="relative w-full overflow-hidden"
// //         style={{ height: "100svh", minHeight: isMobile ? 600 : 680 }}
// //       >
// //         {/* ── VIDEO LAYER ── */}
// //         <div
// //           className="absolute inset-0 w-full h-full"
// //           style={{
// //             transform: `translateY(${progress * 30}px) scale(${1.05 + progress * 0.05})`,
// //             transition: "transform 0.15s ease-out",
// //           }}
// //         >
// //           {/* fallback bg */}
// //           <div className="absolute inset-0" style={{ zIndex: 0, background: "linear-gradient(135deg,#071a16 0%,#0d2821 40%,#0a1e18 70%,#071a16 100%)" }}/>

// //           {/* seagreen ambient orbs */}
// //           <div style={{ position: "absolute", zIndex: 1, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,143,123,0.18) 0%,transparent 65%)", top: -160, right: -100, pointerEvents: "none", animation: "float 9s ease-in-out infinite" }}/>
// //           <div style={{ position: "absolute", zIndex: 1, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(61,184,158,0.12) 0%,transparent 65%)", bottom: 60, left: -70, pointerEvents: "none", animation: "float 12s ease-in-out infinite reverse" }}/>
// //           <div style={{ position: "absolute", zIndex: 1, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(15,79,66,0.20) 0%,transparent 65%)", top: "35%", left: "38%", pointerEvents: "none" }}/>

// //           <video
// //             ref={videoRef}
// //             className="absolute inset-0 w-full h-full object-cover"
// //             autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg"
// //             style={{ zIndex: 2, filter: "brightness(1.15) contrast(1.05) saturate(1.05)", opacity: ready ? 1 : 0, transition: "opacity 1.4s ease" }}
// //           >
// //             <source src="/new-video-2.mp4" type="video/mp4"/>
// //           </video>
// //         </div>

// //         {/* ── GRADIENT MASKS ── */}
// //         <div className="absolute inset-0" style={{ zIndex: 3, background: "rgba(7,26,22,0.32)" }}/>
// //         <div className="absolute inset-0" style={{ zIndex: 4, background: isMobile ? "rgba(7,26,22,0.52)" : "linear-gradient(to right,rgba(7,26,22,0.82) 0%,rgba(7,26,22,0.38) 55%,rgba(7,26,22,0.06) 100%)" }}/>
// //         <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to top,rgba(7,26,22,0.75) 0%,rgba(7,26,22,0.22) 35%,transparent 70%)" }}/>
// //         <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to bottom,rgba(7,26,22,0.30) 0%,transparent 28%)" }}/>

// //         {/* ── CONTENT ── */}
// //         <div className="relative h-full" style={{ zIndex: 10, paddingTop: navPadTop, display: "flex", flexDirection: isMobile ? "column" : "row" }}>

// //           {/* ── LEFT / TOP: copy + search ── */}
// //           <div style={{ width: isMobile ? "100%" : "52%", padding: leftPad, display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "center", paddingTop: isMobile ? 28 : undefined }}>

// //             {/* eyebrow */}
// //             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(16px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
// //               <div style={{ width: 28, height: 1, background: `linear-gradient(to right,${SEA},transparent)`, flexShrink: 0 }}/>
// //               <span style={{ color: SEA_LT, fontSize: 10, letterSpacing: "0.22em", fontFamily: '"Montserrat",sans-serif', fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>
// //                 Discover · Experience · Cherish
// //               </span>
// //             </div>

// //             {/* headline */}
// //             <h1 style={{ fontSize: headingSize, fontFamily: '"DM Serif Display",serif', fontWeight: 400, lineHeight: 1.06, color: "#e8f7f4", marginBottom: 12, letterSpacing: "-0.01em", opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(24px)", transition: "opacity 0.85s ease 0.2s, transform 0.85s ease 0.2s" }}>
// //               Where Will<br/>
// //               <span style={{ fontStyle: "italic", color: SEA_LT }}>Your Story</span> Begin?
// //             </h1>

// //             {/* subline */}
// //             <p style={{ fontFamily: '"Montserrat",sans-serif', fontWeight: 400, fontSize: subSize, color: "rgba(180,230,220,0.62)", lineHeight: 1.75, maxWidth: isMobile ? "100%" : 430, marginBottom: isMobile ? 20 : 28, opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transition: "opacity 0.85s ease 0.32s, transform 0.85s ease 0.32s" }}>
// //               {isMobile ? "Handcrafted journeys across India and beyond." : "Handcrafted journeys across India and beyond. Every trip, a memory worth keeping."}
// //             </p>

// //             {/* ── SEARCH AREA ── */}
// //             <div style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transition: "opacity 0.85s ease 0.44s, transform 0.85s ease 0.44s" }}>

// //               {/* tab pills */}
// //               <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
// //                 {(["tours", "destinations", ...(isMobile ? [] : ["custom"])] as ("tours"|"destinations"|"custom")[]).map(t => (
// //                   <button key={t} onClick={() => setTab(t)} style={{
// //                     padding: isMobile ? "5px 13px" : "6px 16px",
// //                     borderRadius: 999, fontSize: 11,
// //                     fontFamily: '"Montserrat",sans-serif', fontWeight: 600,
// //                     textTransform: "capitalize", cursor: "pointer",
// //                     transition: "all 0.25s ease",
// //                     ...(tab === t
// //                       ? { background: `linear-gradient(135deg,${SEA},${SEA_DK})`, color: "#fff", border: "none", boxShadow: `0 4px 14px rgba(45,143,123,0.35)` }
// //                       : { background: "rgba(45,143,123,0.10)", color: "rgba(180,230,220,0.55)", border: `1px solid rgba(45,143,123,0.22)` }),
// //                   }}>
// //                     {t}
// //                   </button>
// //                 ))}
// //               </div>

// //               {/* ── search box with live dropdown ── */}
// //               <div ref={searchRef} style={{ position: "relative", maxWidth: isMobile ? "100%" : 560 }}>

// //                 {/* input wrapper */}
// //                 <div style={{
// //                   display: "flex",
// //                   alignItems: "stretch",
// //                   background: sFocus ? "rgba(13,40,33,0.78)" : "rgba(13,40,33,0.62)",
// //                   border: `1.5px solid ${sFocus ? SEA_BD : "rgba(45,143,123,0.18)"}`,
// //                   borderRadius: showDrop && results.length ? "16px 16px 0 0" : 16,
// //                   backdropFilter: "blur(24px)",
// //                   WebkitBackdropFilter: "blur(24px)",
// //                   overflow: "hidden",
// //                   boxShadow: sFocus ? `0 0 0 1px ${SEA_BG},0 12px 48px rgba(0,0,0,0.45)` : "0 10px 40px rgba(0,0,0,0.3)",
// //                   transition: "all 0.28s ease",
// //                 }}>
// //                   <div style={{ display: "flex", alignItems: "center", padding: "0 13px", color: SEA_LT, flexShrink: 0 }}>
// //                     <MapPin size={16}/>
// //                   </div>
// //                   <input
// //                     type="text"
// //                     placeholder={isMobile ? "Where do you want to go?" : "Search destinations, tours…"}
// //                     value={dest}
// //                     onChange={e => handleSearch(e.target.value)}
// //                     onFocus={() => { setSFocus(true); if (dest) setShowDrop(true); }}
// //                     onBlur={() => setSFocus(false)}
// //                     style={{ ...inputStyle, padding: isMobile ? "13px 0" : "15px 0" }}
// //                   />
// //                   {/* clear button */}
// //                   {dest && (
// //                     <button
// //                       onClick={() => { setDest(""); setResults([]); setShowDrop(false); }}
// //                       style={{ background: "none", border: "none", cursor: "pointer", padding: "0 8px", color: "rgba(180,230,220,0.4)", display: "flex", alignItems: "center", flexShrink: 0 }}
// //                     >
// //                       <X size={14}/>
// //                     </button>
// //                   )}
// //                   {/* desktop extras */}
// //                   {!isMobile && (
// //                     <>
// //                       <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderLeft: "1px solid rgba(45,143,123,0.14)", flexShrink: 0 }}>
// //                         <Calendar size={12} style={{ color: "rgba(180,230,220,0.32)" }}/>
// //                         <span style={{ fontSize: 12, fontFamily: '"Montserrat",sans-serif', fontWeight: 400, color: "rgba(180,230,220,0.32)" }}>Any Date</span>
// //                       </div>
// //                       <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderLeft: "1px solid rgba(45,143,123,0.14)", flexShrink: 0 }}>
// //                         <Users size={12} style={{ color: "rgba(180,230,220,0.32)" }}/>
// //                         <span style={{ fontSize: 12, fontFamily: '"Montserrat",sans-serif', fontWeight: 400, color: "rgba(180,230,220,0.32)" }}>2 People</span>
// //                       </div>
// //                     </>
// //                   )}
// //                   {/* search button */}
// //                   <button style={{
// //                     margin: 6, padding: "0 16px", borderRadius: 11, flexShrink: 0,
// //                     background: `linear-gradient(135deg,${SEA},${SEA_DK})`,
// //                     color: "#fff", fontFamily: '"Montserrat",sans-serif', fontWeight: 700, fontSize: 12,
// //                     cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 5,
// //                     transition: "all 0.22s", boxShadow: `0 4px 14px rgba(45,143,123,0.35)`,
// //                     whiteSpace: "nowrap",
// //                   }}
// //                     onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1.04)"; el.style.boxShadow = `0 8px 22px rgba(45,143,123,0.5)`; }}
// //                     onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1)"; el.style.boxShadow = `0 4px 14px rgba(45,143,123,0.35)`; }}
// //                   >
// //                     <Search size={14}/> {isMobile ? "Search" : "Explore"}
// //                   </button>
// //                 </div>

// //                 {/* ── live search dropdown ── */}
// //                 {showDrop && results.length > 0 && (
// //                   <div style={{
// //                     position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
// //                     background: "rgba(10,28,24,0.96)",
// //                     backdropFilter: "blur(28px)",
// //                     WebkitBackdropFilter: "blur(28px)",
// //                     border: `1.5px solid ${SEA_BD}`,
// //                     borderTop: "none",
// //                     borderRadius: "0 0 16px 16px",
// //                     overflow: "hidden",
// //                     boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
// //                     padding: "6px 0 8px",
// //                   }}>
// //                     {/* header */}
// //                     <div style={{ padding: "4px 18px 8px", display: "flex", alignItems: "center", gap: 6, borderBottom: `1px solid rgba(45,143,123,0.12)`, marginBottom: 4 }}>
// //                       <Search size={10} style={{ color: SEA_LT }}/>
// //                       <span style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 10, fontWeight: 600, color: "rgba(180,230,220,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
// //                         {results.length} result{results.length !== 1 ? "s" : ""} found
// //                       </span>
// //                     </div>
// //                     {results.map(trip => (
// //                       <SearchResult key={trip.id} trip={trip} onClick={() => openTrip(trip)}/>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {/* no results */}
// //                 {showDrop && dest.trim() && results.length === 0 && (
// //                   <div style={{
// //                     position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
// //                     background: "rgba(10,28,24,0.96)",
// //                     backdropFilter: "blur(28px)",
// //                     border: `1.5px solid ${SEA_BD}`,
// //                     borderTop: "none",
// //                     borderRadius: "0 0 16px 16px",
// //                     padding: "20px 18px",
// //                     textAlign: "center",
// //                     boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
// //                   }}>
// //                     <div style={{ fontSize: 22, marginBottom: 6 }}>🔍</div>
// //                     <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 500, color: "rgba(180,230,220,0.55)" }}>
// //                       No trips found for "{dest}"
// //                     </div>
// //                     <div style={{ fontFamily: '"Montserrat",sans-serif', fontSize: 11, color: "rgba(180,230,220,0.3)", marginTop: 4 }}>
// //                       Try Rajasthan, Manali, or Kerala
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* trending pills */}
// //               <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 12, flexWrap: "wrap" }}>
// //                 <TrendingUp size={11} style={{ color: SEA_LT }}/>
// //                 <span style={{ fontSize: 10, fontFamily: '"Montserrat",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.40)" }}>
// //                   Trending:
// //                 </span>
// //                 {(isMobile ? TRENDING.slice(0, 3) : TRENDING).map(t => (
// //                   <button key={t} onClick={() => handleSearch(t)} style={{
// //                     padding: "3px 10px", borderRadius: 999, fontSize: 10,
// //                     fontFamily: '"Montserrat",sans-serif', fontWeight: 500,
// //                     cursor: "pointer", transition: "all 0.2s",
// //                     background: SEA_BG, color: `rgba(61,184,158,0.75)`,
// //                     border: `1px solid ${SEA_BD}`,
// //                   }}
// //                     onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(45,143,123,0.22)"; el.style.color = SEA_LT; }}
// //                     onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = SEA_BG; el.style.color = "rgba(61,184,158,0.75)"; }}
// //                   >
// //                     {t}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* view all — desktop */}
// //             {!isMobile && (
// //               <div style={{ marginTop: 26, opacity: ready ? 1 : 0, transition: "opacity 0.85s ease 0.6s" }}>
// //                 <a href="#all-trips" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: '"Montserrat",sans-serif', fontSize: 13, fontWeight: 500, color: "rgba(180,230,220,0.48)", textDecoration: "none", transition: "color 0.25s" }}
// //                   onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = SEA_LT; }}
// //                   onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,230,220,0.48)"; }}
// //                 >
// //                   View all packages <ArrowRight size={13}/>
// //                 </a>
// //               </div>
// //             )}
// //           </div>

// //           {/* ── RIGHT: stats ── */}
// //           {!isMobile ? (
// //             /* DESKTOP: vertical floating cards */
// //             <div className="hidden lg:flex flex-col justify-center items-end" style={{
// //               width: "34%", marginLeft: "auto",
// //               padding: "0 52px 80px 0", gap: 16,
// //               opacity: ready ? 1 : 0, transform: ready ? "none" : "translateX(28px)",
// //               transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
// //             }}>
// //               {STATS.map(({ value, label, icon, color, bg, bd }, i) => (
// //                 <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%" }}>
// //                   <div style={{
// //                     display: "flex", alignItems: "center", gap: 14,
// //                     padding: "16px 20px", borderRadius: 16, width: "100%", maxWidth: 218,
// //                     background: "rgba(10,28,24,0.62)", border: "1px solid rgba(45,143,123,0.18)",
// //                     backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
// //                     cursor: "default", transition: "all 0.3s ease",
// //                   }}
// //                     onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = "0 18px 50px rgba(0,0,0,0.45)"; el.style.borderColor = SEA_BD; }}
// //                     onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; el.style.borderColor = "rgba(45,143,123,0.18)"; }}
// //                   >
// //                     {/* colorful icon box */}
// //                     <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: bg, border: `1.5px solid ${bd}`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
// //                       {icon}
// //                     </div>
// //                     <div>
// //                       <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 22, color: "#e0f4f0", lineHeight: 1 }}>
// //                         {value}
// //                       </div>
// //                       <div style={{ fontSize: 11, fontFamily: '"Montserrat",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.45)", marginTop: 4, letterSpacing: "0.03em" }}>
// //                         {label}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   {i < STATS.length - 1 && (
// //                     <div style={{ width: 1, height: 16, marginRight: 34, background: `linear-gradient(to bottom,rgba(45,143,123,0.25),rgba(45,143,123,0.03))` }}/>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             /* MOBILE: stats strip at bottom */
// //             <div style={{
// //               position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
// //               padding: "14px 20px 20px",
// //               background: "linear-gradient(to top,rgba(7,26,22,0.94) 0%,rgba(7,26,22,0.62) 70%,transparent 100%)",
// //               opacity: ready ? 1 : 0, transition: "opacity 0.9s ease 0.6s",
// //             }}>
// //               <a href="#tours" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 12, fontFamily: '"Montserrat",sans-serif', fontSize: 11, fontWeight: 500, color: "rgba(180,230,220,0.45)", textDecoration: "none" }}>
// //                 View all packages <ArrowRight size={11}/>
// //               </a>
// //               <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
// //                 {STATS.map(({ value, label, icon, color, bg, bd }) => (
// //                   <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 6px", borderRadius: 12, background: "rgba(10,28,24,0.7)", border: `1px solid rgba(45,143,123,0.18)`, backdropFilter: "blur(16px)", textAlign: "center" }}>
// //                     <div style={{ color, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                       {/* smaller icon on mobile */}
// //                       <span style={{ transform: "scale(0.72)", transformOrigin: "center", display: "block" }}>{icon}</span>
// //                     </div>
// //                     <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 14, color: "#e0f4f0", lineHeight: 1 }}>{value}</div>
// //                     <div style={{ fontSize: 9, fontFamily: '"Montserrat",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.38)", marginTop: 3, lineHeight: 1.25 }}>{label}</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* ── scroll indicator — desktop ── */}
// //         {!isMobile && (
// //           <div style={{ position: "absolute", bottom: 32, left: "25%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: ready && scrollY < 60 ? 0.45 : 0, transition: "opacity 0.5s ease", zIndex: 20, pointerEvents: "none" }}>
// //             <span style={{ fontSize: 9, fontFamily: '"Montserrat",sans-serif', fontWeight: 600, color: "rgba(180,230,220,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll</span>
// //             <div style={{ width: 22, height: 38, borderRadius: 11, border: "1px solid rgba(45,143,123,0.3)", display: "flex", justifyContent: "center", paddingTop: 7 }}>
// //               <div style={{ width: 3, height: 7, borderRadius: 2, background: SEA_LT, animation: "scrollDot 1.6s ease-in-out infinite" }}/>
// //             </div>
// //           </div>
// //         )}

// //         {/* keyframes */}
// //         <style>{`
// //           @keyframes float {
// //             0%,100% { transform: translateY(0) scale(1); }
// //             50%      { transform: translateY(-22px) scale(1.03); }
// //           }
// //           @keyframes scrollDot {
// //             0%   { transform: translateY(0); opacity: 1; }
// //             80%  { transform: translateY(10px); opacity: 0; }
// //             100% { transform: translateY(0); opacity: 0; }
// //           }
// //         `}</style>
// //       </section>

// //       {/* ── Trip Modal — renders outside the section ── */}
// //       {selected && (
// //         <TripModal trip={selected} onClose={() => setSelected(null)}/>
// //       )}
// //     </>
// //   );
// // }








// "use client";
// import { useEffect, useRef, useState, useCallback } from "react";
// import { motion, useAnimation, AnimatePresence } from "framer-motion";
// import { Search, MapPin, X, TrendingUp } from "lucide-react";
// import TRIPS from "../data/upcomingTrips";
// import type { Trip } from "../data/types";
// import TripModal from "./TripModal";

// // ── Palette ────────────────────────────────────────────
// const SEA    = "#2d8f7b";
// const SEA_DK = "#1a6b58";
// const SEA_LT = "#3db89e";
// const SEA_BG = "rgba(45,143,123,0.12)";
// const SEA_BD = "rgba(45,143,123,0.30)";

// const TRENDING = ["Rajasthan", "Manali", "Kerala", "Bali", "Leh"];
// const TRIPS_DATA: Trip[] = TRIPS as unknown as Trip[];

// // ── Responsive hook ────────────────────────────────────
// function useIsMobile(bp = 768) {
//   const [v, setV] = useState(false);
//   useEffect(() => {
//     const check = () => setV(window.innerWidth < bp);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, [bp]);
//   return v;
// }

// // ── Search result card ─────────────────────────────────
// function SearchResult({ trip, onClick }: { trip: Trip; onClick: () => void }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -4 }}
//       onClick={onClick}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         display: "flex",
//         gap: 12,
//         padding: "10px 14px",
//         cursor: "pointer",
//         background: hov ? "rgba(45,143,123,0.08)" : "transparent",
//         transition: "background 0.18s",
//         borderRadius: 10,
//         margin: "0 4px",
//       }}
//     >
//       <div style={{ width: 54, height: 50, borderRadius: 9, overflow: "hidden", background: "#0d2821", flexShrink: 0 }}>
//         <img src={trip.image} alt={trip.name}
//           style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//           onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
//         />
//       </div>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 13, color: "#e0f4f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>
//           {trip.name}
//         </div>
//         <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 10, fontWeight: 500, color: "rgba(180,230,220,0.5)", display: "flex", gap: 6, alignItems: "center" }}>
//           <MapPin size={9} style={{ color: SEA_LT, flexShrink: 0 }} />
//           <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{trip.location}</span>
//           <span style={{ flexShrink: 0, color: "rgba(180,230,220,0.3)" }}>·</span>
//           <span style={{ flexShrink: 0 }}>{trip.duration}</span>
//         </div>
//       </div>
//       <div style={{ flexShrink: 0, textAlign: "right" }}>
//         <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 13, color: SEA_LT }}>
//           ₹{trip.discountedPrice.toLocaleString("en-IN")}
//         </div>
//         <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 9, color: "rgba(180,230,220,0.35)" }}>per person</div>
//       </div>
//     </motion.div>
//   );
// }

// // ── Main ──────────────────────────────────────────────
// export default function HeroSection() {
//   const videoRef  = useRef<HTMLVideoElement>(null);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const gsapRef   = useRef<any>(null);
//   const tlRef     = useRef<any>(null);

//   const [ready,    setReady]    = useState(false);
//   const [sFocus,   setSFocus]   = useState(false);
//   const [dest,     setDest]     = useState("");
//   const [results,  setResults]  = useState<Trip[]>([]);
//   const [showDrop, setShowDrop] = useState(false);
//   const [selected, setSelected] = useState<Trip | null>(null);
//   const isMobile = useIsMobile(768);

//   // ── Load GSAP ─────────────────────────────────────
//   useEffect(() => {
//     const loadGsap = async () => {
//       try {
//         const mod = await import("gsap");
//         const gsap = mod.default || mod.gsap || mod;
//         gsapRef.current = gsap;

//         // Subtle floating particles on desktop
//         if (!isMobile && typeof document !== "undefined") {
//           const particles = document.querySelectorAll(".hero-particle");
//           particles.forEach((p, i) => {
//             gsap.to(p, {
//               y: -18 - i * 6,
//               x: (i % 2 === 0 ? 1 : -1) * (8 + i * 3),
//               duration: 3.5 + i * 0.7,
//               repeat: -1,
//               yoyo: true,
//               ease: "sine.inOut",
//               delay: i * 0.4,
//             });
//           });
//         }

//         // Title shimmer effect on letters
//         const letters = document.querySelectorAll(".hero-letter");
//         letters.forEach((el, i) => {
//           gsap.fromTo(
//             el,
//             { opacity: 0, y: 40, rotateX: -30 },
//             {
//               opacity: 1,
//               y: 0,
//               rotateX: 0,
//               duration: 0.8,
//               delay: 0.3 + i * 0.04,
//               ease: "back.out(1.4)",
//             }
//           );
//         });
//       } catch (e) {
//         // GSAP not available — CSS animations handle fallback
//       }
//     };
//     if (ready) loadGsap();
//   }, [ready, isMobile]);

//   // ready
//   useEffect(() => {
//     const t = setTimeout(() => setReady(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   // video
//   useEffect(() => {
//     const vid = videoRef.current; if (!vid) return;
//     vid.muted = true; vid.playsInline = true;
//     const play = () => vid.play().catch(() => setTimeout(() => vid.play().catch(() => {}), 500));
//     vid.readyState >= 2 ? play() : vid.addEventListener("canplay", play, { once: true });
//   }, []);

//   // search
//   const handleSearch = useCallback((val: string) => {
//     setDest(val);
//     if (!val.trim()) { setResults([]); setShowDrop(false); return; }
//     const q = val.toLowerCase();
//     const found = TRIPS.filter(t =>
//       t.name.toLowerCase().includes(q) ||
//       t.location.toLowerCase().includes(q) ||
//       t.state.toLowerCase().includes(q) ||
//       t.tags.some(tag => tag.toLowerCase().includes(q))
//     ).slice(0, 5);
  
//     setShowDrop(true);
//   }, []);

//   // close on outside click
//   useEffect(() => {
//     const fn = (e: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowDrop(false);
//     };
//     document.addEventListener("mousedown", fn);
//     return () => document.removeEventListener("mousedown", fn);
//   }, []);

//   const openTrip = (trip: Trip) => { setSelected(trip); setShowDrop(false); setDest(""); };

//   // ── Title words for per-letter animation ─────────
//   const titleLines = isMobile
//     ? [["Where Will"], ["Your Story Begin?"]]
//     : [["Where Will"], ["Your Story Begin?"]];

//   // ── Heights ───────────────────────────────────────
//   // Mobile: banner-like (56vh), Desktop: full screen
//   const sectionHeight = isMobile ? "56svh" : "100svh";
//   const sectionMinH   = isMobile ? 360 : 680;

//   return (
//     <>
//       <section
//         className="relative w-full overflow-hidden"
//         style={{ height: sectionHeight, minHeight: sectionMinH }}
//       >
//         {/* ── VIDEO / BG LAYER ── */}
//         <div className="absolute inset-0 w-full h-full">
//           {/* fallback dark */}
//           <div className="absolute inset-0" style={{ background: "linear-gradient(145deg,#071a16 0%,#0c2620 50%,#071a16 100%)", zIndex: 0 }} />

//           {/* Floating particles — desktop only */}
//           {!isMobile && (
//             <>
//               {[
//                 { w: 420, h: 420, top: "-100px", left: "-60px", opacity: 0.14 },
//                 { w: 320, h: 320, top: "30%", right: "10%", opacity: 0.10 },
//                 { w: 200, h: 200, bottom: "10%", left: "20%", opacity: 0.08 },
//               ].map((p, i) => (
//                 <div
//                   key={i}
//                   className={`hero-particle`}
//                   style={{
//                     position: "absolute",
//                     zIndex: 1,
//                     width: p.w,
//                     height: p.h,
//                     borderRadius: "50%",
//                     background: `radial-gradient(circle, rgba(45,143,123,${p.opacity}) 0%, transparent 65%)`,
//                     top: (p as any).top,
//                     left: (p as any).left,
//                     right: (p as any).right,
//                     bottom: (p as any).bottom,
//                     pointerEvents: "none",
//                   }}
//                 />
//               ))}
//             </>
//           )}

//           <video
//             ref={videoRef}
//             className="absolute inset-0 w-full h-full object-cover"
//             autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg"
//             style={{ zIndex: 2, opacity: ready ? 1 : 0, transition: "opacity 1.6s ease", filter: isMobile ? "brightness(0.75) saturate(1.1)" : "brightness(0.9) saturate(1.05)" }}
//           >
//             <source src="/new-video-3.mp4" type="video/mp4" />
//           </video>
//         </div>

//         {/* ── GRADIENT OVERLAYS ── */}
//         {/* base dark veil */}
//         <div className="absolute inset-0" style={{ zIndex: 3, background: isMobile ? "rgba(5,18,14,0.52)" : "rgba(5,18,14,0.38)" }} />
//         {/* bottom fade */}
//         <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to top, rgba(5,18,14,0.82) 0%, rgba(5,18,14,0.18) 40%, transparent 70%)" }} />
//         {/* top fade */}
//         <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to bottom, rgba(5,18,14,0.30) 0%, transparent 22%)" }} />
//         {/* subtle seagreen tint on left — desktop */}
//         {!isMobile && (
//           <div className="absolute inset-0" style={{ zIndex: 4, background: "radial-gradient(ellipse 60% 80% at 50% 60%, rgba(45,143,123,0.07) 0%, transparent 70%)" }} />
//         )}

//         {/* ── CONTENT — centered ── */}
//         <div
//           className="relative w-full h-full"
//           style={{
//             zIndex: 10,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: isMobile ? "flex-end" : "center",
//             paddingBottom: isMobile ? 28 : 0,
//             paddingTop: isMobile ? 0 : 64,
//           }}
//         >
//           {/* ── TITLE BLOCK ── */}
//           <div
//             style={{
//               textAlign: "center",
//               marginBottom: isMobile ? 16 : 28,
//               padding: isMobile ? "0 20px" : 0,
//             }}
//           >
//             {/* Eyebrow — thin line + label */}
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={ready ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 12,
//                 marginBottom: isMobile ? 10 : 16,
//               }}
//             >
//               <div style={{ width: 32, height: 1, background: `linear-gradient(to right, transparent, ${SEA})` }} />
//               <span style={{
//                 fontFamily: '"Outfit", sans-serif',
//                 fontSize: isMobile ? 12 : 16,
//                 fontWeight: 900,
//                 letterSpacing: "0.26em",
//                 textTransform: "uppercase",
//                 color: SEA_LT,
//               }}>
//                 Kafira Travels
//               </span>
//               <div style={{ width: 32, height: 1, background: `linear-gradient(to left, transparent, ${SEA})` }} />
//             </motion.div>

//             {/* Main Title — split into animated letters */}
//             <div
//               style={{
//                 perspective: "600px",
//                 perspectiveOrigin: "50% 50%",
//               }}
//             >
//               <h1
//                 style={{
//                   fontFamily: '"Cormorant Garamond", serif',
//                   fontWeight: 600,
//                   fontSize: isMobile ? "clamp(30px, 9vw, 42px)" : "clamp(52px, 6vw, 88px)",
//                   lineHeight: isMobile ? 1.12 : 1.05,
//                   color: "#edf8f5",
//                   letterSpacing: isMobile ? "-0.01em" : "-0.02em",
//                   margin: 0,
//                   padding: 0,
//                   // no italic anywhere
//                 }}
//               >
//                 {["Where Will", "Your Story Begin?"].map((line, li) => (
//                   <span key={li} style={{ display: "block" }}>
//                     {line.split("").map((char, ci) => (
//                       <span
//                         key={`${li}-${ci}`}
//                         className="hero-letter"
//                         style={{
//                           display: "inline-block",
//                           opacity: ready ? undefined : 0,
//                           // color accent on "Story"
//                           color: line === "Your Story Begin?" && char !== " " && ci >= 5 && ci <= 9
//                             ? SEA_LT
//                             : "#edf8f5",
//                           // will be animated by GSAP
//                         }}
//                       >
//                         {char === " " ? "\u00A0" : char}
//                       </span>
//                     ))}
//                   </span>
//                 ))}
//               </h1>
//             </div>
//           </div>

//           {/* ── SEARCH BAR ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 22 }}
//             animate={ready ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
//             style={{
//               width: "100%",
//               maxWidth: isMobile ? "calc(100% - 40px)" : 600,
//               padding: isMobile ? "0 20px" : 0,
//               boxSizing: isMobile ? "border-box" : undefined,
//             }}
//           >
//             <div ref={searchRef} style={{ position: "relative" }}>
//               {/* Search input wrapper */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "stretch",
//                   background: sFocus ? "rgba(8,24,20,0.88)" : "rgba(8,24,20,0.72)",
//                   border: `1.5px solid ${sFocus ? "rgba(45,143,123,0.55)" : "rgba(45,143,123,0.22)"}`,
//                   borderRadius: showDrop && results.length > 0 ? "18px 18px 0 0" : 18,
//                   backdropFilter: "blur(28px)",
//                   WebkitBackdropFilter: "blur(28px)",
//                   overflow: "hidden",
//                   boxShadow: sFocus
//                     ? `0 0 0 3px rgba(45,143,123,0.12), 0 20px 60px rgba(0,0,0,0.5)`
//                     : "0 12px 50px rgba(0,0,0,0.38)",
//                   transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
//                   height: isMobile ? 50 : 58,
//                 }}
//               >
//                 {/* Icon */}
//                 <div style={{ display: "flex", alignItems: "center", paddingLeft: 16, color: sFocus ? SEA_LT : "rgba(61,184,158,0.5)", flexShrink: 0, transition: "color 0.25s" }}>
//                   <MapPin size={isMobile ? 15 : 17} />
//                 </div>

//                 {/* Input */}
//                 <input
//                   type="text"
//                   placeholder="Search destinations, tours…"
//                   value={dest}
//                   onChange={e => handleSearch(e.target.value)}
//                   onFocus={() => { setSFocus(true); if (dest) setShowDrop(true); }}
//                   onBlur={() => setSFocus(false)}
//                   style={{
//                     flex: 1,
//                     background: "transparent",
//                     border: "none",
//                     outline: "none",
//                     color: "#e0f4f0",
//                     fontFamily: '"Outfit", sans-serif',
//                     fontSize: isMobile ? 13 : 15,
//                     fontWeight: 400,
//                     padding: isMobile ? "0 8px" : "0 12px",
//                     caretColor: SEA_LT,
//                   }}
//                 />

//                 {/* Clear */}
//                 <AnimatePresence>
//                   {dest && (
//                     <motion.button
//                       initial={{ opacity: 0, scale: 0.7 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.7 }}
//                       transition={{ duration: 0.18 }}
//                       onClick={() => { setDest(""); setResults([]); setShowDrop(false); }}
//                       style={{ background: "none", border: "none", cursor: "pointer", padding: "0 8px", color: "rgba(180,230,220,0.35)", display: "flex", alignItems: "center", flexShrink: 0 }}
//                     >
//                       <X size={13} />
//                     </motion.button>
//                   )}
//                 </AnimatePresence>

//                 {/* Search CTA */}
//                 <button
//                   style={{
//                     margin: isMobile ? 5 : 6,
//                     padding: isMobile ? "0 14px" : "0 20px",
//                     borderRadius: 13,
//                     flexShrink: 0,
//                     background: `linear-gradient(135deg, ${SEA} 0%, ${SEA_DK} 100%)`,
//                     color: "#fff",
//                     fontFamily: '"Outfit", sans-serif',
//                     fontWeight: 700,
//                     fontSize: isMobile ? 12 : 13,
//                     cursor: "pointer",
//                     border: "none",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 6,
//                     transition: "all 0.22s ease",
//                     boxShadow: `0 4px 18px rgba(45,143,123,0.40)`,
//                     letterSpacing: "0.02em",
//                     whiteSpace: "nowrap",
//                   }}
//                   onMouseEnter={e => {
//                     const el = e.currentTarget as HTMLButtonElement;
//                     el.style.transform = "scale(1.04) translateY(-1px)";
//                     el.style.boxShadow = "0 8px 28px rgba(45,143,123,0.55)";
//                   }}
//                   onMouseLeave={e => {
//                     const el = e.currentTarget as HTMLButtonElement;
//                     el.style.transform = "scale(1) translateY(0)";
//                     el.style.boxShadow = "0 4px 18px rgba(45,143,123,0.40)";
//                   }}
//                 >
//                   <Search size={isMobile ? 13 : 14} />
//                   Explore
//                 </button>
//               </div>

//               {/* ── Dropdown ── */}
//               <AnimatePresence>
//                 {showDrop && results.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
//                     style={{
//                       position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
//                       background: "rgba(8,22,18,0.97)",
//                       backdropFilter: "blur(32px)",
//                       WebkitBackdropFilter: "blur(32px)",
//                       border: `1.5px solid ${SEA_BD}`,
//                       borderTop: "none",
//                       borderRadius: "0 0 18px 18px",
//                       overflow: "hidden",
//                       boxShadow: "0 28px 70px rgba(0,0,0,0.6)",
//                       padding: "6px 0 10px",
//                     }}
//                   >
//                     <div style={{ padding: "4px 18px 8px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(45,143,123,0.1)", marginBottom: 4 }}>
//                       <Search size={9} style={{ color: SEA_LT }} />
//                       <span style={{ fontFamily: '"Outfit",sans-serif', fontSize: 10, fontWeight: 600, color: "rgba(180,230,220,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
//                         {results.length} result{results.length !== 1 ? "s" : ""}
//                       </span>
//                     </div>
//                     {results.map((trip, i) => (
//                       <SearchResult key={trip.id} trip={trip} onClick={() => openTrip(trip)} />
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* No results */}
//               <AnimatePresence>
//                 {showDrop && dest.trim() && results.length === 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                     style={{
//                       position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
//                       background: "rgba(8,22,18,0.97)",
//                       backdropFilter: "blur(32px)",
//                       border: `1.5px solid ${SEA_BD}`,
//                       borderTop: "none",
//                       borderRadius: "0 0 18px 18px",
//                       padding: "20px 18px",
//                       textAlign: "center",
//                       boxShadow: "0 28px 70px rgba(0,0,0,0.5)",
//                     }}
//                   >
//                     <div style={{ fontSize: 20, marginBottom: 6 }}>🔍</div>
//                     <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 13, fontWeight: 500, color: "rgba(180,230,220,0.5)" }}>
//                       No trips found for "{dest}"
//                     </div>
//                     <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, color: "rgba(180,230,220,0.28)", marginTop: 4 }}>
//                       Try Rajasthan, Manali, or Kerala
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* ── Trending pills ── */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={ready ? { opacity: 1 } : {}}
//               transition={{ duration: 0.6, delay: 0.8 }}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 7,
//                 marginTop: 12,
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//               }}
//             >
//               <TrendingUp size={10} style={{ color: SEA_LT }} />
//               <span style={{ fontSize: 10, fontFamily: '"Outfit",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.38)" }}>
//                 Trending:
//               </span>
//               {(isMobile ? TRENDING.slice(0, 4) : TRENDING).map((t, i) => (
//                 <motion.button
//                   key={t}
//                   initial={{ opacity: 0, scale: 0.85 }}
//                   animate={ready ? { opacity: 1, scale: 1 } : {}}
//                   transition={{ duration: 0.35, delay: 0.85 + i * 0.06, ease: "backOut" }}
//                   whileHover={{ scale: 1.06, backgroundColor: "rgba(45,143,123,0.22)" }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={() => handleSearch(t)}
//                   style={{
//                     padding: "3px 11px",
//                     borderRadius: 999,
//                     fontSize: 10,
//                     fontFamily: '"Outfit",sans-serif',
//                     fontWeight: 500,
//                     cursor: "pointer",
//                     background: SEA_BG,
//                     color: "rgba(61,184,158,0.72)",
//                     border: `1px solid ${SEA_BD}`,
//                     transition: "background 0.2s, color 0.2s",
//                   }}
//                 >
//                   {t}
//                 </motion.button>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* ── Scroll indicator — desktop only ── */}
//         {!isMobile && ready && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.4 }}
//             transition={{ delay: 1.5, duration: 0.8 }}
//             style={{
//               position: "absolute",
//               bottom: 28,
//               left: "50%",
//               transform: "translateX(-50%)",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 6,
//               zIndex: 20,
//               pointerEvents: "none",
//             }}
//           >
//             <span style={{ fontSize: 9, fontFamily: '"Outfit",sans-serif', fontWeight: 600, color: "rgba(180,230,220,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
//               Scroll
//             </span>
//             <div style={{ width: 20, height: 34, borderRadius: 10, border: "1px solid rgba(45,143,123,0.35)", display: "flex", justifyContent: "center", paddingTop: 6 }}>
//               <div style={{ width: 3, height: 6, borderRadius: 2, background: SEA_LT, animation: "scrollDot 1.6s ease-in-out infinite" }} />
//             </div>
//           </motion.div>
//         )}

//         {/* ── Google Fonts + keyframes ── */}
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

//           @keyframes scrollDot {
//             0%   { transform: translateY(0); opacity: 1; }
//             75%  { transform: translateY(10px); opacity: 0; }
//             100% { transform: translateY(0); opacity: 0; }
//           }
//         `}</style>
//       </section>

//       {/* ── Trip Modal ── */}
//       <AnimatePresence>
//         {selected && (
//           <TripModal trip={selected} onClose={() => setSelected(null)} />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }







"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import DESTINATIONS, { getDestinationsByRegion } from "../data/destinations";
import TRIPS from "../data/trips";
import type { Trip } from "../data/types";

// ── Palette ────────────────────────────────────────────
const SEA    = "#2d8f7b";
const SEA_DK = "#1a6b58";
const SEA_LT = "#3db89e";
const SEA_BG = "rgba(45,143,123,0.12)";
const SEA_BD = "rgba(45,143,123,0.30)";

const TRENDING = ["Himachal", "Uttrakhhand", "Meghalaya", "Kashmir", "Leh", "Spiti-expidition"];

type SearchResult =
  | { kind: "destination"; slug: string; region: string; name: string; image: string; startingPrice: number }
  | { kind: "trip"; id: string; destinationSlug: string; region: string; name: string; image: string; discountedPrice: number; duration: string };

function useIsMobile(bp = 768) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const check = () => setV(window.innerWidth < bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return v;
}

function SearchRow({ result, onSelect }: { result: SearchResult; onSelect: (r: SearchResult) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(result)}
      style={{
        display: "flex", alignItems: "center", gap: 11,
        padding: "9px 14px", cursor: "pointer",
        background: hov ? "rgba(45,143,123,0.08)" : "transparent",
        transition: "background 0.18s", margin: "0 4px", borderRadius: 10,
      }}
    >
      <div style={{ width: 48, height: 42, borderRadius: 8, overflow: "hidden", background: "#0d2821", flexShrink: 0 }}>
        <img src={result.image} alt={result.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 13, fontWeight: 600, color: "#e0f4f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>
          {result.name}
        </div>
        <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 10.5, color: "rgba(180,230,220,0.5)", display: "flex", gap: 6, alignItems: "center" }}>
          <MapPin size={9} style={{ color: SEA_LT, flexShrink: 0 }} />
          {result.kind === "destination" ? (
            <span>{result.region === "india" ? "India" : "International"} · from ₹{result.startingPrice?.toLocaleString("en-IN")}</span>
          ) : (
            <>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{result.duration}</span>
              <span style={{ flexShrink: 0, color: "rgba(180,230,220,0.3)" }}>·</span>
              <span style={{ flexShrink: 0 }}>from ₹{result.discountedPrice.toLocaleString("en-IN")}</span>
            </>
          )}
        </div>
      </div>
      {/* badge — shows "trip" or "destination" + a small modal hint for trips */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
        <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 8, fontWeight: 700, color: SEA, background: "rgba(45,143,123,0.09)", borderRadius: 999, padding: "2px 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {result.kind}
        </div>
        {result.kind === "trip" && (
          <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 8, color: "rgba(61,184,158,0.55)", letterSpacing: "0.04em" }}>
            tap to open ↗
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SearchDropdown({ query, results, onSelect }: {
  query: string; results: SearchResult[]; onSelect: (r: SearchResult) => void;
}) {
  if (!query.trim()) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
        background: "rgba(8,22,18,0.97)",
        backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
        border: `1.5px solid ${SEA_BD}`, borderTop: "none",
        borderRadius: "0 0 18px 18px", overflow: "hidden",
        boxShadow: "0 28px 70px rgba(0,0,0,0.6)", padding: "6px 0 10px",
      }}
    >
      {results.length === 0 ? (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔍</div>
          <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 13, fontWeight: 500, color: "rgba(180,230,220,0.5)" }}>No results for "{query}"</div>
          <div style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, color: "rgba(180,230,220,0.28)", marginTop: 4 }}>Try Himalayas, Europe, or Bali</div>
        </div>
      ) : (
        (["destination", "trip"] as const).map(kind => {
          const group = results.filter(r => r.kind === kind);
          if (!group.length) return null;
          return (
            <div key={kind} style={{ borderTop: kind === "trip" ? "1px solid rgba(45,143,123,0.1)" : "none" }}>
              <div style={{ padding: "8px 18px 4px", fontFamily: '"Outfit",sans-serif', fontSize: 9, fontWeight: 700, color: SEA_LT, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {kind === "destination" ? "Destinations" : "Trips"}
              </div>
              {group.map((r, i) => <SearchRow key={i} result={r} onSelect={onSelect} />)}
            </div>
          );
        })
      )}
    </motion.div>
  );
}

export default function HeroSection() {
  const router    = useRouter();
  const videoRef  = useRef<HTMLVideoElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [ready,    setReady]    = useState(false);
  const [sFocus,   setSFocus]   = useState(false);
  const [dest,     setDest]     = useState("");
  const [results,  setResults]  = useState<SearchResult[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const loadGsap = async () => {
      try {
        const mod = await import("gsap");
        const gsap = mod.default || (mod as any).gsap || mod;
        if (!isMobile) {
          document.querySelectorAll(".hero-particle").forEach((p, i) => {
            gsap.to(p, { y: -18 - i * 6, x: (i % 2 === 0 ? 1 : -1) * (8 + i * 3), duration: 3.5 + i * 0.7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4 });
          });
        }
        document.querySelectorAll(".hero-letter").forEach((el, i) => {
          gsap.fromTo(el, { opacity: 0, y: 40, rotateX: -30 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, delay: 0.3 + i * 0.04, ease: "back.out(1.4)" });
        });
      } catch (_) {}
    };
    if (ready) loadGsap();
  }, [ready, isMobile]);

  useEffect(() => { const t = setTimeout(() => setReady(true), 100); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const vid = videoRef.current; if (!vid) return;
    vid.muted = true; vid.playsInline = true;
    const play = () => vid.play().catch(() => setTimeout(() => vid.play().catch(() => {}), 500));
    vid.readyState >= 2 ? play() : vid.addEventListener("canplay", play, { once: true });
  }, []);

  const handleSearch = useCallback((val: string) => {
    setDest(val);
    setShowDrop(true);
    if (!val.trim()) { setResults([]); return; }
    const q = val.toLowerCase();
    const destResults: SearchResult[] = DESTINATIONS
      .filter(d => d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q))
      .slice(0, 3)
      .map(d => ({ kind: "destination" as const, slug: d.slug, region: d.region, name: d.name, image: d.image, startingPrice: d.startingPrice }));
    const tripResults: SearchResult[] = TRIPS
      .filter(t => t.name.toLowerCase().includes(q) || t.tags.some((tag: string) => tag.toLowerCase().includes(q)) || t.state.toLowerCase().includes(q))
      .slice(0, 4)
      .map(t => ({ kind: "trip" as const, id: t.id, destinationSlug: t.destinationSlug, region: t.region, name: t.name, image: t.image, discountedPrice: t.discountedPrice, duration: t.duration }));
    setResults([...destResults, ...tripResults]);
  }, []);

  // ── KEY FIX: trips navigate to destination page WITH ?trip=ID
  // The destination page reads this param and auto-opens TripModal ──
  const handleSelectResult = (r: SearchResult) => {
    if (r.kind === "destination") {
      router.push(`/destinations/${r.region}/${r.slug}`);
    } else {
      // Navigate to the destination page and signal which trip to open
      router.push(`/destinations/${r.region}/${r.destinationSlug}?trip=${r.id}`);
    }
    setDest(""); setResults([]); setShowDrop(false);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowDrop(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const sectionHeight = isMobile ? "56svh" : "100svh";
  const sectionMinH   = isMobile ? 360 : 680;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: sectionHeight, minHeight: sectionMinH }}>
      {/* BG */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0" style={{ background: "linear-gradient(145deg,#071a16 0%,#0c2620 50%,#071a16 100%)", zIndex: 0 }} />
        {!isMobile && [
          { w: 420, h: 420, top: "-100px", left: "-60px", opacity: 0.14 },
          { w: 320, h: 320, top: "30%", right: "10%", opacity: 0.10 },
          { w: 200, h: 200, bottom: "10%", left: "20%", opacity: 0.08 },
        ].map((p, i) => (
          <div key={i} className="hero-particle" style={{ position: "absolute", zIndex: 1, width: p.w, height: p.h, borderRadius: "50%", background: `radial-gradient(circle, rgba(45,143,123,${p.opacity}) 0%, transparent 65%)`, top: (p as any).top, left: (p as any).left, right: (p as any).right, bottom: (p as any).bottom, pointerEvents: "none" }} />
        ))}
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg"
          style={{ zIndex: 2, opacity: ready ? 1 : 0, transition: "opacity 1.6s ease", filter: isMobile ? "brightness(0.75) saturate(1.1)" : "brightness(0.9) saturate(1.05)" }}>
          <source src="/new-video-3.mp4" type="video/mp4" />
        </video>
      </div>

      {/* overlays */}
      <div className="absolute inset-0" style={{ zIndex: 3, background: isMobile ? "rgba(5,18,14,0.52)" : "rgba(5,18,14,0.38)" }} />
      <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to top, rgba(5,18,14,0.82) 0%, rgba(5,18,14,0.18) 40%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ zIndex: 4, background: "linear-gradient(to bottom, rgba(5,18,14,0.30) 0%, transparent 22%)" }} />
      {!isMobile && <div className="absolute inset-0" style={{ zIndex: 4, background: "radial-gradient(ellipse 60% 80% at 50% 60%, rgba(45,143,123,0.07) 0%, transparent 70%)" }} />}

      {/* CONTENT */}
      <div className="relative w-full h-full" style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: isMobile ? "flex-end" : "center", paddingBottom: isMobile ? 28 : 0, paddingTop: isMobile ? 0 : 64 }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 16 : 28, padding: isMobile ? "0 20px" : 0 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: isMobile ? 10 : 16 }}>
            <div style={{ width: 32, height: 1, background: `linear-gradient(to right, transparent, ${SEA})` }} />
            <span style={{ fontFamily: '"Outfit",sans-serif', fontSize: isMobile ? 12 : 16, fontWeight: 900, letterSpacing: "0.26em", textTransform: "uppercase", color: SEA_LT }}>Kafira Travels</span>
            <div style={{ width: 32, height: 1, background: `linear-gradient(to left, transparent, ${SEA})` }} />
          </motion.div>
          <div style={{ perspective: "600px", perspectiveOrigin: "50% 50%" }}>

            {/* '"Cormorant Garamond",serif' */}


            <h1 style={{ fontFamily: '"Inter",sans-serif' , fontWeight: 600, fontSize: isMobile ? "clamp(30px,9vw,42px)" : "clamp(52px,6vw,88px)", lineHeight: isMobile ? 1.12 : 1.05, color: "#edf8f5", letterSpacing: isMobile ? "-0.01em" : "-0.02em", margin: 0, padding: 0 }}>
              {["Where Will", "Your Story Begin?"].map((line, li) => (
                <span key={li} style={{ display: "block" }}>
                  {line.split("").map((char, ci) => (
                    <span key={`${li}-${ci}`} className="hero-letter" style={{ display: "inline-block", opacity: ready ? undefined : 0, color: line === "Your Story Begin?" && char !== " " && ci >= 5 && ci <= 9 ? SEA_LT : "#edf8f5" }}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: isMobile ? "calc(100% - 40px)" : 600, padding: isMobile ? "0 20px" : 0, boxSizing: isMobile ? "border-box" : undefined }}>
          <div ref={searchRef} style={{ position: "relative" }}>
            <div style={{
              display: "flex", alignItems: "stretch",
              background: sFocus ? "rgba(8,24,20,0.88)" : "rgba(8,24,20,0.72)",
              border: `1.5px solid ${sFocus ? "rgba(45,143,123,0.55)" : "rgba(45,143,123,0.22)"}`,
              borderRadius: showDrop && results.length > 0 ? "18px 18px 0 0" : 18,
              backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", overflow: "hidden",
              boxShadow: sFocus ? "0 0 0 3px rgba(45,143,123,0.12), 0 20px 60px rgba(0,0,0,0.5)" : "0 12px 50px rgba(0,0,0,0.38)",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", height: isMobile ? 50 : 58,
            }}>
              <div style={{ display: "flex", alignItems: "center", paddingLeft: 16, color: sFocus ? SEA_LT : "rgba(61,184,158,0.5)", flexShrink: 0, transition: "color 0.25s" }}>
                <MapPin size={isMobile ? 15 : 17} />
              </div>
              <input type="text" placeholder="Search destinations, tours…" value={dest}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => { setSFocus(true); if (dest) setShowDrop(true); }}
                onBlur={() => setSFocus(false)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e0f4f0", fontFamily: '"Inter",sans-serif', fontSize: isMobile ? 13 : 15, fontWeight: 400, padding: isMobile ? "0 8px" : "0 12px", caretColor: SEA_LT }}
              />
              <AnimatePresence>
                {dest && (
                  <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.18 }}
                    onClick={() => { setDest(""); setResults([]); setShowDrop(false); }}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "0 8px", color: "rgba(180,230,220,0.35)", display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <X size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
              <button
                style={{ margin: isMobile ? 5 : 6, padding: isMobile ? "0 14px" : "0 20px", borderRadius: 13, flexShrink: 0, background: `linear-gradient(135deg,${SEA},${SEA_DK})`, color: "#fff", fontFamily: '"Inter",sans-serif', fontWeight: 700, fontSize: isMobile ? 12 : 13, cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 6, transition: "all 0.22s ease", boxShadow: "0 4px 18px rgba(45,143,123,0.40)", letterSpacing: "0.02em", whiteSpace: "nowrap" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1.04) translateY(-1px)"; el.style.boxShadow = "0 8px 28px rgba(45,143,123,0.55)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1) translateY(0)"; el.style.boxShadow = "0 4px 18px rgba(45,143,123,0.40)"; }}
              >
                <Search size={isMobile ? 13 : 14} /> Explore
              </button>
            </div>

            <AnimatePresence>
              {showDrop && dest.trim() && (
                <SearchDropdown query={dest} results={results} onSelect={handleSelectResult} />
              )}
            </AnimatePresence>
          </div>

          {/* Trending */}
          <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.8 }}
            style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <TrendingUp size={10} style={{ color: SEA_LT }} />
            <span style={{ fontSize: 13, fontFamily: '"Inter",sans-serif', fontWeight: 500, color: "rgba(180,230,220,0.38)" }}>Trending:</span>
            {(isMobile ? TRENDING.slice(0, 4) : TRENDING).map((t, i) => (
              <motion.button key={t}
                initial={{ opacity: 0, scale: 0.85 }} animate={ready ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.85 + i * 0.06, ease: "backOut" }}
                whileHover={{ scale: 1.06, backgroundColor: "rgba(45,143,123,0.22)" }} whileTap={{ scale: 0.97 }}
                onClick={() => handleSearch(t)}
                style={{ padding: "4px 12px", borderRadius: 999, fontSize: 13, fontFamily: '"Inter",sans-serif', fontWeight: 500, cursor: "pointer", background: SEA_BG, color: "rgba(61,184,158,0.72)", border: `1px solid ${SEA_BD}`, transition: "background 0.2s, color 0.2s" }}>
                {t}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && ready && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5, duration: 0.8 }}
          style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 20, pointerEvents: "none" }}>
          <span style={{ fontSize: 9, fontFamily: '"Outfit",sans-serif', fontWeight: 600, color: "rgba(180,230,220,0.5)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 20, height: 34, borderRadius: 10, border: "1px solid rgba(45,143,123,0.35)", display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 3, height: 6, borderRadius: 2, background: SEA_LT, animation: "scrollDot 1.6s ease-in-out infinite" }} />
          </div>
        </motion.div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          75%  { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}