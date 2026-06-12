'use client'

// app/(auth)/admin/login/page.tsx
// Kafira Travels — admin login
// No register, no forgot password — users added via Supabase dashboard only

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push('/admin/blogs')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#f0faf6', fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');`}</style>

      <div className="w-full max-w-sm">

        {/* Logo / brand */}
        <div className="mb-10 flex flex-col items-center text-center">
          {/* Kafira leaf mark */}
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl mb-4 text-white text-2xl font-700 tracking-tight"
            style={{ background: '#2e8b57' }}
          >
            K
          </div>
          <h1 className="text-xl font-700 text-gray-900">Kafira Travels</h1>
          <p className="mt-1.5 text-sm text-gray-500 font-500">Admin Portal · Sign in to continue</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm" style={{ borderColor: '#d4eddf' }}>
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1.5 text-sm font-600 text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kafira.in"
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition"
                style={{ borderColor: '#d4eddf', background: '#f9fdfb' }}
                onFocus={(e) => { e.target.style.borderColor = '#2e8b57'; e.target.style.boxShadow = '0 0 0 3px rgba(46,139,87,0.1)' }}
                onBlur={(e)  => { e.target.style.borderColor = '#d4eddf'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1.5 text-sm font-600 text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition"
                  style={{ borderColor: '#d4eddf', background: '#f9fdfb' }}
                  onFocus={(e) => { e.target.style.borderColor = '#2e8b57'; e.target.style.boxShadow = '0 0 0 3px rgba(46,139,87,0.1)' }}
                  onBlur={(e)  => { e.target.style.borderColor = '#d4eddf'; e.target.style.boxShadow = 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border px-4 py-3 text-sm text-red-600"
                style={{ background: '#fff5f5', borderColor: '#fecaca' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-600 text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#2e8b57' }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Access restricted to authorised Kafira team members only.
        </p>
      </div>
    </div>
  )
}