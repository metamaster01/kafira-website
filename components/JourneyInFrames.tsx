'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Play } from 'lucide-react';

const SEA    = '#2d8f7b';
const SEA_DK = '#1a6b58';

// ─────────────────────────────────────────────────────
//  GALLERY DATA
//  Add your own items here.
//  type: 'image' | 'video'
//  src:  path to the file in /public
//  location: label shown in the pill at bottom-left
// ─────────────────────────────────────────────────────
export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  location: string;
  // optional thumbnail for videos (shown before play)
  poster?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'image', src: '/memories-2.jpg',     location: 'Rishikesh'     },
  // { type: 'image', src: '/gallery/bhutan.jpg',    location: 'Bhutan'    },
  // { type: 'image', src: '/gallery/kerala.jpg',    location: 'Kerala'    },
  { type: 'video', src: '/explore-2.mp4', location: 'Meghalaya' , poster: '/images/trips/meghalaya.jpg' },
  { type: 'image', src: '/why-us-2.jpg',     location: 'Spiti Valley' },
  { type: 'video', src: '/explore-1.mp4',       location: 'Leh Ladakh',  poster: '/images/trips/leh.jpg' },
  // { type: 'image', src: '/gallery/rajasthan.jpg', location: 'Rajasthan' },
];

// ─────────────────────────────────────────────────────
//  Fan carousel layout params
//
//  The gallery shows 5 items at once:
//    index -2  (far left,  partial)
//    index -1  (left,      slightly smaller)
//    index  0  (CENTER,    tallest, full)
//    index +1  (right,     slightly smaller)
//    index +2  (far right, partial)
//
//  Each position has its own: width, height, scale,
//  skewY, translateX offset, zIndex, and opacity.
// ─────────────────────────────────────────────────────
type SlotConfig = {
  dx: number;       // translateX from center (px)
  scale: number;    // scale relative to center
  skewY: number;    // perspective skew in degrees
  opacity: number;
  zIndex: number;
  heightFactor: number; // relative height vs center
};

const SLOT_CONFIGS: Record<number, SlotConfig> = {
  [-2]: { dx: -480, scale: 0.72, skewY:  6,  opacity: 0.70, zIndex: 1, heightFactor: 0.70 },
  [-1]: { dx: -240, scale: 0.87, skewY:  3,  opacity: 0.88, zIndex: 2, heightFactor: 0.86 },
  [ 0]: { dx:    0, scale: 1.00, skewY:  0,  opacity: 1.00, zIndex: 5, heightFactor: 1.00 },
  [ 1]: { dx:  240, scale: 0.87, skewY: -3,  opacity: 0.88, zIndex: 2, heightFactor: 0.86 },
  [ 2]: { dx:  480, scale: 0.72, skewY: -6,  opacity: 0.70, zIndex: 1, heightFactor: 0.70 },
};

const CENTER_H = 440;  // center card height px
const CENTER_W = 310;  // center card width px

// ── Single card in the fan ─────────────────────────────
function FanCard({
  item,
  slot,          // -2, -1, 0, 1, 2
  onClick,
  isCenter,
}: {
  item: GalleryItem;
  slot: number;
  onClick: () => void;
  isCenter: boolean;
}) {
  const cfg    = SLOT_CONFIGS[slot] ?? SLOT_CONFIGS[2];
  const [hov,  setHov]  = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cardH = CENTER_H * cfg.heightFactor;
  const cardW = CENTER_W * cfg.scale;

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false); }
      else         { videoRef.current.play();  setPlaying(true);  }
    }
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        x:       cfg.dx,
        scale:   cfg.scale * (hov && !isCenter ? 1.04 : 1),
        skewY:   cfg.skewY,
        opacity: cfg.opacity,
        zIndex:  cfg.zIndex,
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        // shift so card center aligns with slot center
        marginLeft:  -(cardW / 2),
        marginTop:   -(cardH / 2),
        width:  cardW,
        height: cardH,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#1a2a22',
        boxShadow: isCenter
          ? '0 28px 70px rgba(0,0,0,0.30)'
          : '0 10px 30px rgba(0,0,0,0.18)',
        transformOrigin: 'center center',
      }}
    >
      {/* media */}
      {item.type === 'image' ? (
        <img
          src={item.src}
          alt={item.location}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.50s ease',
          }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* play/pause overlay */}
          <div
            onClick={handlePlay}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: playing ? 'transparent' : 'rgba(0,0,0,0.22)',
              transition: 'background 0.22s',
            }}
          >
            {!playing && (
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,0.88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              }}>
                <Play size={20} color={SEA} fill={SEA}/>
              </div>
            )}
          </div>
          {/* video badge */}
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            borderRadius: 999, padding: '3px 9px',
            fontFamily: '"Outfit",sans-serif',
            fontSize: 8.5, fontWeight: 700,
            color: '#fff', letterSpacing: '0.10em',
            textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Play size={8} fill="#fff" color="#fff"/> VIDEO
          </div>
        </>
      )}

      {/* always-on dark gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 45%)',
        pointerEvents: 'none',
      }}/>

      {/* location pill — bottom left */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14,
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(10px)',
        borderRadius: 999, padding: '5px 12px',
        border: '1px solid rgba(255,255,255,0.18)',
      }}>
        <MapPin size={11} color="#fff" strokeWidth={2.2}/>
        <span style={{
          fontFamily: '"Outfit",sans-serif',
          fontSize: 12, fontWeight: 600,
          color: '#fff', letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}>
          {item.location}
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────
//  Lightbox modal
// ─────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw', maxHeight: '88vh',
          borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.60)',
        }}
      >
        {item.type === 'image' ? (
          <img
            src={item.src} alt={item.location}
            style={{ display: 'block', maxWidth: '90vw', maxHeight: '86vh', objectFit: 'contain' }}
          />
        ) : (
          <video
            src={item.src} poster={item.poster}
            controls autoPlay
            style={{ display: 'block', maxWidth: '90vw', maxHeight: '86vh' }}
          />
        )}

        {/* location */}
        <div style={{
          position: 'absolute', bottom: 16, left: 16,
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.60)',
          backdropFilter: 'blur(10px)',
          borderRadius: 999, padding: '6px 14px',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <MapPin size={13} color="#fff"/>
          <span style={{ fontFamily: '"Outfit",sans-serif', fontSize: 13, fontWeight: 600, color: '#fff' }}>
            {item.location}
          </span>
        </div>

        {/* close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.60)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 300,
          }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────
//  Main section
// ─────────────────────────────────────────────────────
export default function JourneyInFrames({
  items = GALLERY_ITEMS,
}: {
  items?: GalleryItem[];
}) {
  const [center,    setCenter]    = useState(0);
  const [lightbox,  setLightbox]  = useState<GalleryItem | null>(null);
  const [isMobile,  setIsMobile]  = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const prev = () => setCenter(c => (c - 1 + items.length) % items.length);
  const next = () => setCenter(c => (c + 1) % items.length);

  // keyboard nav
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (lightbox) return;
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lightbox]);

  // get the 5 visible items: slots -2 to +2
  const getItem = (offset: number) =>
    items[(center + offset + items.length) % items.length];

  // ── MOBILE: simple horizontal scroll grid ──────────
  if (isMobile) {
    return (
      <section style={{ background: '#fff', padding: '40px 0 48px' }}>
        {/* header */}
        <div style={{ textAlign: 'center', padding: '0 20px', marginBottom: 28 }}>
          <h2 style={{ fontFamily: '"Outfit",sans-serif', fontWeight: 800, fontSize: 22, letterSpacing: '0.04em', color: '#111', margin: '0 0 6px', textTransform: 'uppercase' }}>
            Journey in Frames
          </h2>
          <p style={{ fontFamily: '"Outfit",sans-serif', fontSize: 13, color: 'rgba(0,0,0,0.45)', margin: 0 }}>
            Pictures Perfect Moments
          </p>
        </div>

        {/* mobile scrollable row */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px 12px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightbox(item)}
              style={{
                flexShrink: 0, width: 200, height: 280, borderRadius: 14,
                overflow: 'hidden', position: 'relative',
                cursor: 'pointer', scrollSnapAlign: 'start',
                background: '#1a2a22',
              }}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.location} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.currentTarget as HTMLImageElement).style.opacity='0'; }}/>
              ) : (
                <>
                  <video src={item.src} poster={item.poster} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted playsInline/>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={18} color={SEA} fill={SEA}/>
                    </div>
                  </div>
                </>
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.60) 0%,transparent 45%)', pointerEvents: 'none' }}/>
              <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.55)', borderRadius: 999, padding: '4px 10px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <MapPin size={10} color="#fff"/>
                <span style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{item.location}</span>
              </div>
            </div>
          ))}
        </div>
        <style>{`section div::-webkit-scrollbar{display:none}`}</style>

        <AnimatePresence>
          {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)}/>}
        </AnimatePresence>
      </section>
    );
  }

  // ── DESKTOP: fan carousel ──────────────────────────
  const STAGE_H = CENTER_H + 60; // extra room for shadow

  return (
    <section style={{ background: '#fff', padding: 'clamp(24px,6vw,48px) 0' }}>

      {/* ── header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 'clamp(14px,2vw,34px)' }}
      >
        <h2 style={{
          fontFamily: '"Outfit",sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(22px,3.5vw,38px)',
          color: '#111',
          margin: '0 0 8px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          Journey in <span style={{ color: '#2d8f7b' }}>Frames</span>
        </h2>
        <p style={{
          fontFamily: '"Outfit",sans-serif',
          fontSize: 'clamp(13px,1.2vw,16px)',
          margin: 0,
          fontWeight: 400,
          color: '#1a6b58',
        }}>
          Pictures Perfect Moments
        </p>
      </motion.div>

      {/* ── stage ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: STAGE_H,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>

        {/* render 5 slots */}
        {([-2, -1, 0, 1, 2] as const).map(slot => (
          <FanCard
            key={`${center}-${slot}`}
            item={getItem(slot)}
            slot={slot}
            isCenter={slot === 0}
            onClick={() => {
              if (slot === 0) setLightbox(getItem(0));
              else if (slot < 0) prev();
              else next();
            }}
          />
        ))}

        {/* LEFT arrow */}
        <motion.button
          whileHover={{ scale: 1.10 }}
          whileTap={{ scale: 0.92 }}
          onClick={prev}
          style={{
            position: 'absolute', left: 'clamp(16px,4vw,64px)',
            top: '50%', transform: 'translateY(-50%)',
            zIndex: 20,
            width: 46, height: 46, borderRadius: '50%',
            background: SEA,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 18px rgba(45,143,123,0.45)`,
            transition: 'box-shadow 0.22s',
          }}
        >
          <ChevronLeft size={22} color="#fff" strokeWidth={2.4}/>
        </motion.button>

        {/* RIGHT arrow */}
        <motion.button
          whileHover={{ scale: 1.10 }}
          whileTap={{ scale: 0.92 }}
          onClick={next}
          style={{
            position: 'absolute', right: 'clamp(16px,4vw,64px)',
            top: '50%', transform: 'translateY(-50%)',
            zIndex: 20,
            width: 46, height: 46, borderRadius: '50%',
            background: SEA,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 18px rgba(45,143,123,0.45)`,
            transition: 'box-shadow 0.22s',
          }}
        >
          <ChevronRight size={22} color="#fff" strokeWidth={2.4}/>
        </motion.button>
      </div>

      {/* ── dot indicators ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 24 }}>
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCenter(i)}
            animate={{
              width: i === center ? 22 : 7,
              background: i === center ? SEA : 'rgba(0,0,0,0.18)',
            }}
            transition={{ duration: 0.28 }}
            style={{
              height: 7, borderRadius: 999,
              border: 'none', cursor: 'pointer', padding: 0,
            }}
          />
        ))}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)}/>}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
}
