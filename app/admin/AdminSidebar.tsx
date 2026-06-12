'use client'

// app/admin/AdminSidebar.tsx
// Blogs-only nav — Case Studies / Contact removed (tables don't exist)

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

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
    <aside
      className="w-56 shrink-0 flex flex-col border-r min-h-screen"
      style={{ background: '#ffffff', borderColor: '#d4eddf' }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: '#d4eddf' }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-base font-700"
          style={{ background: '#2e8b57' }}
        >
          K
        </div>
        <div className="min-w-0">
          <p className="text-sm font-700 text-gray-900 leading-none">Kafira</p>
          <p className="text-[10px] font-500 mt-0.5" style={{ color: '#2e8b57' }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-600 transition-colors"
              style={
                active
                  ? { background: '#e6f5ed', color: '#1a6b3c' }
                  : { color: '#6b7280' }
              }
            >
              <Icon
                className="h-4 w-4"
                style={{ color: active ? '#2e8b57' : '#9ca3af' }}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t" style={{ borderColor: '#d4eddf' }}>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-600 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}