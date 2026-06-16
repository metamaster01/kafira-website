'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const SEA    = '#2d8f7b';
const SEA_DK = '#1a6b58';

export default function CTABanner() {
  const ref      = useRef<HTMLElement>(null);
  const inView   = useInView(ref, { once: true, margin: '-60px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 560);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        padding: `clamp(32px,5vw,56px) clamp(20px,5vw,48px)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          background: `linear-gradient(130deg, ${SEA} 0%, ${SEA_DK} 60%, #155046 100%)`,
          borderRadius: 'clamp(16px,2vw,24px)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: isMobile ? 'auto' : 'clamp(160px,18vw,220px)',
          padding: isMobile
            ? 'clamp(28px,6vw,40px) clamp(24px,5vw,36px)'
            : 'clamp(28px,4vw,48px) clamp(28px,5vw,60px)',
          maxWidth: 1160,
          margin: '0 auto',
          gap: 24,
        }}
      >
        {/* background blobs */}
        {[
          { top: -40, right: 180, size: 160, opacity: 0.06 },
          { top: -20, right: 220, size: 100, opacity: 0.05 },
          { bottom: -30, left: '40%', size: 120, opacity: 0.04 },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: (b as any).top, bottom: (b as any).bottom,
            left: (b as any).left, right: (b as any).right,
            width: b.size, height: b.size,
            borderRadius: '50%',
            background: `rgba(255,255,255,${b.opacity})`,
            pointerEvents: 'none',
          }}/>
        ))}

        {/* LEFT: text */}
        <div style={{ flex: 1, zIndex: 2, maxWidth: isMobile ? '100%' : 'clamp(240px,55%,500px)' }}>
          <motion.h2
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(20px,6vw,26px)' : 'clamp(18px,2.8vw,30px)',
              color: '#ffffff',
              lineHeight: 1.25,
              margin: '0 0 clamp(8px,1.5vw,14px)',
              letterSpacing: '-0.02em',
            }}
          >
            For more details about your<br/>
            favourite Packages
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.60, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(12px,1.2vw,14.5px)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.65,
              margin: '0 0 clamp(16px,2.5vw,26px)',
              maxWidth: 340,
            }}
          >
            Customized itineraries, hidden gems, and seamless
            booking experiences await you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: `clamp(10px,1.3vw,13px) clamp(20px,2.5vw,28px)`,
                borderRadius: 9,
                background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.65)',
                color: '#ffffff',
                fontFamily: '"Playfair Display",serif',
                fontSize: 'clamp(12.5px,1.1vw,14px)',
                fontWeight: 600,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.22s ease',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.22)';
                el.style.borderColor = '#fff';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.12)';
                el.style.borderColor = 'rgba(255,255,255,0.65)';
                el.style.transform = 'none';
                el.style.boxShadow = 'none';
              }}
            >
              Connect with us now
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: illustration — hidden on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.90 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flexShrink: 0, zIndex: 2,
              display: 'flex', alignItems: 'flex-end',
              position: 'relative',
            }}
          >
            <img
              src="/cta-traveller-2.png"
              alt="Traveller with backpack"
              style={{
                height: 'clamp(140px,17vw,215px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                animation: 'ctaFloat 3.8s ease-in-out infinite',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
              }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            {/* logo watermark */}
            {/* <img
              src="/logo-3.png"
              alt=""
              style={{
                position: 'absolute', bottom: 10, right: 8,
                height: 26, width: 'auto',
                opacity: 0.70, objectFit: 'contain',
              }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            /> */}
          </motion.div>
        )}
      </motion.div>

      <style>{`
        @keyframes ctaFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
}
