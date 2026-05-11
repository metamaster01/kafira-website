'use client';
import { Phone, Globe, ChevronDown } from 'lucide-react';

// ✅ Custom SVG Icons (same API as Lucide: accepts size)
const InstagramIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 
    0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 
    5a5 5 0 110 10 5 5 0 010-10zm6.5-.8a1.2 
    1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 
    9a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

const FacebookIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 
    1.5-3.8 3.7-3.8 1.1 0 2.2.2 
    2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 
    1.6V12h2.9l-.5 2.9h-2.4v7A10 
    10 0 0022 12z" />
  </svg>
);

const YoutubeIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C16 
    5 12 5 12 5h0s-4 0-6.9.1c-.4 
    0-1.3 0-2.1.9-.6.6-.8 2-.8 
    2S2 9.6 2 11.2v1.6C2 14.4 2.2 
    16 2.2 16s.2 1.4.8 2c.8.8 
    1.9.8 2.4.9 1.7.1 6.6.1 
    6.6.1s4 0 6.9-.1c.4 0 1.3 
    0 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6C22 
    9.6 21.8 8 21.8 8zM10 14.7V9.3l5.2 
    2.7L10 14.7z" />
  </svg>
);

export default function TopBar() {
  return (
    <div
      className="w-full px-6 py-2 flex items-center justify-between text-xs tracking-wide"
      style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
    >
      {/* Left: Phone */}
      <a
        href="tel:+919999999999"
        className="flex items-center gap-2 transition-colors duration-300"
        style={{ color: 'rgba(245,240,232,0.6)' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.6)')}
      >
        <Phone size={12} />
        <span className="font-body">+91 99999 99999</span>
      </a>

      {/* Center */}
      <span
        className="hidden md:block font-accent italic text-sm"
        style={{ color: 'rgba(201,168,76,0.7)' }}
      >
        Crafting journeys, not just itineraries
      </span>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-1 transition-colors duration-300"
          style={{ color: 'rgba(245,240,232,0.6)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.6)')}
        >
          <Globe size={12} />
          <span className="font-body">English (IN)</span>
          <ChevronDown size={10} />
        </button>

        <div className="hidden md:flex items-center gap-3">
          {[
            { Icon: InstagramIcon, href: '#', label: 'Instagram' },
            { Icon: FacebookIcon, href: '#', label: 'Facebook' },
            { Icon: YoutubeIcon, href: '#', label: 'YouTube' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-all duration-300"
              style={{ color: 'rgba(245,240,232,0.5)' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#c9a84c';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(245,240,232,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}