'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SEA    = '#2d8f7b';
const SEA_DK = '#1a6b58';

export default function TakeABreak() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* ── Spinning badge ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 16 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: 86, height: 86,
          marginBottom: 28,
        }}
      >
        {/* spinning text ring */}
        <motion.svg
          viewBox="0 0 86 86"
          width={86} height={86}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <defs>
            <path
              id="circle-path"
              d="M 43,43 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
            />
          </defs>
          {/* teal ring background */}
          <circle cx="43" cy="43" r="40" fill={SEA} />
          {/* curved text */}
          <text
            fontFamily='"Inter",sans-serif'
            fontSize="8.2"
            fontWeight="600"
            fill="white"
            letterSpacing="2.2"
            textAnchor="middle"
          >
            <textPath href="#circle-path" startOffset="50%">
              ✦ ORGANIZE TOURS EXPERIENCE ✦
            </textPath>
          </text>
        </motion.svg>

        {/* center globe icon */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>

        {/* star at bottom of badge */}
        <div style={{
          position: 'absolute', bottom: 2, left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 9, color: 'rgba(255,255,255,0.9)',
          lineHeight: 1,
        }}>★</div>
      </motion.div>

      {/* ── "Take A Break" ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(32px,5.5vw,58px)',
          color: '#111111',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          marginBottom: 14,
        }}
      >
        Take A Break
      </motion.div>

      {/* ── "Explore Yourself" — teal filled rectangle ── */}
      <motion.div
        initial={{ opacity: 0, y: 18, scaleX: 0.88 }}
        animate={inView ? { opacity: 1, y: 0, scaleX: 1 } : {}}
        transition={{ duration: 0.60, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `linear-gradient(135deg, ${SEA} 0%, ${SEA_DK} 100%)`,
          borderRadius: 8,
          padding: 'clamp(10px,2vw,14px) clamp(28px,5vw,52px)',
          marginBottom: 32,
          display: 'inline-block',
        }}
      >
        <span style={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(28px,5vw,52px)',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          Explore Yourself
        </span>
      </motion.div>

      {/* ── subline ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.58, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(13px,1.4vw,16px)',
          color: 'rgba(0,0,0,0.52)',
          lineHeight: 1.7,
          maxWidth: 520,
          margin: 0,
        }}
      >
        &amp; return home with 1500 stunning photos, endless memories,
        and a smile that lasts&nbsp;😄
      </motion.p>


        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>



  );
}
