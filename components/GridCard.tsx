'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const SEA = '#2d8f7b';

// ─────────────────────────────────────────────────────
//  GridCard
//  Portrait card matching reference: image, gradient
//  top fade, bold uppercase title top-left, circular
//  arrow button bottom-right.
//
//  Used for:
//   - Destination cards (region listing page)
//   - Trip cards (destination trips page)
// ─────────────────────────────────────────────────────
export default function GridCard({
  image,
  title,
  subtitle,
  badge,
  onClick,
  index = 0,
}: {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;       // optional small badge e.g. price or duration
  onClick: () => void;
  index?: number;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '0.84',
        borderRadius: 22,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#1a2a22',
        boxShadow: hov
          ? '0 18px 44px rgba(0,0,0,0.22)'
          : '0 4px 16px rgba(0,0,0,0.10)',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)',
        opacity: 0,
        animation: `gridCardIn 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s forwards`,
      }}
    >
      {/* image */}
      <img
        src={image}
        alt={title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transform: hov ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
      />

      {/* top gradient — for title legibility */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}/>
      {/* bottom gradient — for arrow button contrast */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}/>
      {/* hover accent wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${SEA}22 0%, transparent 60%)`,
        opacity: hov ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}/>

      {/* title — top left, uppercase, bold */}
      <div style={{
        position: 'absolute', top: 18, left: 18, right: 60,
      }}>
        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(18px,1.6vw,32px)',
          color: '#ffffff',
      
          letterSpacing: '0.04em',
          lineHeight: 1.25,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 500,
            fontSize: 13,
            color: 'rgba(255,255,255,0.78)',
            marginTop: 4,
            letterSpacing: '0.02em',
            textTransform: 'none',
          }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* badge — bottom left (optional, e.g. price) */}
      {badge && (
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          borderRadius: 999, padding: '4px 10px',
          fontFamily: '"Inter", sans-serif',
          fontSize: 13, fontWeight: 600,
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          {badge}
        </div>
      )}

      {/* arrow button — bottom right */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        width: 42, height: 42, borderRadius: '50%',
        background: hov ? SEA : 'rgba(255,255,255,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.26s ease',
        boxShadow: hov ? `0 4px 14px ${SEA}66` : '0 2px 8px rgba(0,0,0,0.18)',
      }}>
        <ArrowUpRight size={15} color={hov ? '#fff' : '#1a1a1a'} strokeWidth={2.4}/>
      </div>

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@300;400;500;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');
        @keyframes gridCardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
