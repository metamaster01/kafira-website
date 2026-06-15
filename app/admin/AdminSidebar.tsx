'use client'

// app/admin/AdminSidebar.tsx

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

const SEA    = '#2d8f7b'
const SEA_BG = 'rgba(45,143,123,0.10)'
const SEA_BD = 'rgba(45,143,123,0.18)'
const TEXT   = '#0f2720'
const SUB    = '#2d5a52'
const MUTED  = '#6b9e94'

const NAV = [
  { label: 'Blogs', href: '/admin/blogs', icon: BookOpen },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh',
      background: '#ffffff',
      borderRight: `1px solid ${SEA_BD}`,
      fontFamily: '"Outfit", sans-serif',
    }}>

      {/* Brand */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '20px 20px',
        borderBottom: `1px solid ${SEA_BD}`,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: SEA, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 800, flexShrink: 0,
          boxShadow: '0 4px 12px rgba(45,143,123,0.25)',
        }}>
          K
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: 14, fontWeight: 800, color: TEXT, margin: 0, lineHeight: 1.2 }}>
            Kafira
          </p>
          <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: 10, fontWeight: 600, color: SEA, margin: 0, marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 12,
                fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
                background: active ? SEA_BG : 'transparent',
                color: active ? SUB : MUTED,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(45,143,123,0.05)' }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon size={16} style={{ color: active ? SEA : MUTED, flexShrink: 0 }} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '10px 10px 16px', borderTop: `1px solid ${SEA_BD}` }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 12, border: 'none',
            background: 'transparent', cursor: 'pointer',
            fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 600,
            color: MUTED, transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#dc2626' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MUTED }}
        >
          <LogOut size={16} style={{ flexShrink: 0 }} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}