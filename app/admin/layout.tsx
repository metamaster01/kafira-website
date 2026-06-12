// app/admin/layout.tsx
// Auth guard — unauthenticated visitors are redirected to /admin/login
// Login page lives at app/(auth)/admin/login so it bypasses this layout

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import AdminSidebar from './AdminSidebar'

export const metadata = {
  title: 'Admin | Kafira Travels',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server component — middleware handles session refresh
          }
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  return (
    <div
      className="flex min-h-screen text-gray-900"
      style={{ background: '#f4f9f6', fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');`}</style>
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}