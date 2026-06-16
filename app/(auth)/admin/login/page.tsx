// 'use client'

// // app/(auth)/admin/login/page.tsx
// // Kafira Travels — admin login
// // No register, no forgot password — users added via Supabase dashboard only

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createBrowserClient } from '@supabase/ssr'
// import { Eye, EyeOff, Loader2 } from 'lucide-react'

// export default function AdminLoginPage() {
//   const router = useRouter()

//   const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )

//   const [email,    setEmail]    = useState('')
//   const [password, setPassword] = useState('')
//   const [showPass, setShowPass] = useState(false)
//   const [loading,  setLoading]  = useState(false)
//   const [error,    setError]    = useState<string | null>(null)

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)

//     const { error } = await supabase.auth.signInWithPassword({ email, password })

//     if (error) {
//       setError('Invalid email or password. Please try again.')
//       setLoading(false)
//       return
//     }

//     router.push('/admin/blogs')
//     router.refresh()
//   }

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{ background: '#f0faf6', fontFamily: "'Montserrat', sans-serif" }}
//     >
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');`}</style>

//       <div className="w-full max-w-sm">

//         {/* Logo / brand */}
//         <div className="mb-10 flex flex-col items-center text-center">
//           {/* Kafira leaf mark */}
//           <div
//             className="flex h-14 w-14 items-center justify-center rounded-2xl mb-4 text-white text-2xl font-700 tracking-tight"
//             style={{ background: '#2e8b57' }}
//           >
//             K
//           </div>
//           <h1 className="text-xl font-700 text-gray-900">Kafira Travels</h1>
//           <p className="mt-1.5 text-sm text-gray-500 font-500">Admin Portal · Sign in to continue</p>
//         </div>

//         {/* Card */}
//         <div className="rounded-2xl border bg-white p-8 shadow-sm" style={{ borderColor: '#d4eddf' }}>
//           <form onSubmit={handleLogin} className="space-y-5">

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block mb-1.5 text-sm font-600 text-gray-700">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 autoComplete="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="admin@kafira.in"
//                 className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition"
//                 style={{ borderColor: '#d4eddf', background: '#f9fdfb' }}
//                 onFocus={(e) => { e.target.style.borderColor = '#2e8b57'; e.target.style.boxShadow = '0 0 0 3px rgba(46,139,87,0.1)' }}
//                 onBlur={(e)  => { e.target.style.borderColor = '#d4eddf'; e.target.style.boxShadow = 'none' }}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block mb-1.5 text-sm font-600 text-gray-700">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPass ? 'text' : 'password'}
//                   required
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full rounded-xl border px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition"
//                   style={{ borderColor: '#d4eddf', background: '#f9fdfb' }}
//                   onFocus={(e) => { e.target.style.borderColor = '#2e8b57'; e.target.style.boxShadow = '0 0 0 3px rgba(46,139,87,0.1)' }}
//                   onBlur={(e)  => { e.target.style.borderColor = '#d4eddf'; e.target.style.boxShadow = 'none' }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   tabIndex={-1}
//                 >
//                   {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </button>
//               </div>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="rounded-xl border px-4 py-3 text-sm text-red-600"
//                 style={{ background: '#fff5f5', borderColor: '#fecaca' }}>
//                 {error}
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-600 text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
//               style={{ background: '#2e8b57' }}
//             >
//               {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//               {loading ? 'Signing in…' : 'Sign In'}
//             </button>
//           </form>
//         </div>

//         <p className="mt-6 text-center text-xs text-gray-400">
//           Access restricted to authorised Kafira team members only.
//         </p>
//       </div>
//     </div>
//   )
// }




'use client'

// app/(auth)/admin/login/page.tsx

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const SEA    = '#2d8f7b'
const SEA_BG = 'rgba(45,143,123,0.08)'
const SEA_BD = 'rgba(45,143,123,0.22)'
const TEXT   = '#0f2720'
const SUB    = '#2d5a52'
const MUTED  = '#6b9e94'

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
    if (error) { setError('Invalid email or password. Please try again.'); setLoading(false); return }
    router.push('/admin/blogs')
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    borderRadius: 14, border: `1.5px solid ${SEA_BD}`,
    background: '#f7faf9', padding: '13px 16px',
    fontFamily: '"Outfit", sans-serif', fontSize: 14,
    color: TEXT, outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f4f9f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: '"Playfair Display",serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap');`}</style>

      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Brand mark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 110, height: 90, borderRadius: 18,
            overflow: 'hidden',
            background: SEA,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 8px 24px rgba(45,143,123,0.28)',
          }}>
            <img
              src="/logo-2.png"
              alt="Kafira Travels logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h1 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: 22, color: TEXT, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Kafira Travels
          </h1>
          <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 500, color: MUTED, margin: 0 }}>
            Admin Portal · Sign in to continue
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#ffffff', borderRadius: 24,
          border: `1px solid ${SEA_BD}`,
          padding: 'clamp(28px,5vw,40px)',
          boxShadow: '0 10px 40px rgba(15,39,32,0.07)',
        }}>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="email" style={{ fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 600, color: SUB }}>
                Email
              </label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = SEA; e.target.style.boxShadow = '0 0 0 3px rgba(45,143,123,0.12)' }}
                onBlur={(e)  => { e.target.style.borderColor = SEA_BD; e.target.style.boxShadow = 'none' }}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="password" style={{ fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 600, color: SUB }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password" type={showPass ? 'text' : 'password'}
                  required autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 48 }}
                  onFocus={(e) => { e.target.style.borderColor = SEA; e.target.style.boxShadow = '0 0 0 3px rgba(45,143,123,0.12)' }}
                  onBlur={(e)  => { e.target.style.borderColor = SEA_BD; e.target.style.boxShadow = 'none' }}
                />
                <button
                  type="button" tabIndex={-1} onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: MUTED, padding: 0,
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#fff5f5', border: '1px solid #fecaca',
                borderRadius: 12, padding: '12px 16px',
                fontFamily: '"Outfit", sans-serif', fontSize: 13, color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? MUTED : SEA,
                color: '#fff', border: 'none', borderRadius: 14,
                fontFamily: '"Outfit", sans-serif', fontSize: 14, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'opacity 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = loading ? '0.7' : '1' }}
            >
              {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{
          marginTop: 24, textAlign: 'center',
          fontFamily: '"Outfit", sans-serif', fontSize: 12, color: MUTED,
        }}>
          Access restricted to authorised Kafira team members only.
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </main>
  )
}