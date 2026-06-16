// 'use client'

// // app/blogs/BlogsClient.tsx
// // Kafira Travels — white · seagreen · black palette, Montserrat font

// import { useEffect, useRef, useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { ChevronRight, Clock, User } from 'lucide-react'
// import type { BlogCard } from '@/lib/blogs'

// type Props = {
//   featured: BlogCard | null
//   blogs: BlogCard[]
// }

// function formatDate(iso: string | null): string {
//   if (!iso) return ''
//   return new Date(iso).toLocaleDateString('en-IN', {
//     month: 'short',
//     year: 'numeric',
//   })
// }

// export default function BlogsClient({ featured, blogs }: Props) {
//   const sectionsRef = useRef<HTMLElement[]>([])

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.remove('opacity-0', 'translate-y-6')
//           }
//         })
//       },
//       { threshold: 0.12 }
//     )
//     sectionsRef.current.forEach((el) => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   const addSection = (el: HTMLElement | null) => {
//     if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
//   }

//   return (
//     <div
//       className="relative min-h-screen bg-white text-black"
//       style={{ fontFamily: "'Montserrat', sans-serif" }}
//     >
//       {/* Montserrat font */}
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');`}</style>

//       {/* ── HERO ── */}
//       <section
//         ref={addSection}
//         className="relative w-full opacity-0 translate-y-6 transition-all duration-700"
//         style={{ height: '320px' }}
//       >
//         {/* Background image placeholder — swap src for your actual hero image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url('/blogs-hero.jpg')" }}
//         />

//         {/* Seagreen tint overlay — matches the Kafira Corporate Tours style */}
//         <div
//           className="absolute inset-0"
//           style={{ background: 'rgba(30, 100, 60, 0.55)' }}
//         />

//         {/* Centred text */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
//           <h1 className="text-4xl font-700 text-white leading-tight md:text-5xl">
//             Kafira Travel Blogs
//           </h1>
//           {/* Short white divider line below title — same as reference image */}
//           <div className="mt-4 h-[2px] w-16 rounded-full bg-white opacity-80" />
//         </div>
//       </section>

//       {/* ── FEATURED BLOG ── */}
//       {featured ? (
//         <section
//           ref={addSection}
//           className="relative px-6 pt-16 pb-20 md:px-12 lg:px-20 opacity-0 translate-y-6 transition-all duration-700"
//         >
//           {/* Centred section label */}
//           <div className="mb-10 text-center">
//             <p
//               className="inline-block rounded-full px-4 py-1.5 text-xs font-700 uppercase tracking-widest"
//               style={{ background: '#e6f5ed', color: '#2e8b57' }}
//             >
//               Featured Article
//             </p>
//           </div>

//           <div
//             className="overflow-hidden rounded-3xl border"
//             style={{ borderColor: '#d4eddf' }}
//           >
//             <div className="grid md:grid-cols-2">
//               {/* Image */}
//               <div className="relative aspect-[4/3] bg-gray-100 md:aspect-auto md:min-h-[420px]">
//                 <span
//                   className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-700 uppercase tracking-wider"
//                   style={{ background: '#2e8b57', color: '#fff' }}
//                 >
//                   Featured
//                 </span>
//                 {featured.cover_image_url ? (
//                   <Image
//                     src={featured.cover_image_url}
//                     alt={featured.title}
//                     fill
//                     priority
//                     unoptimized
//                     className="object-cover"
//                   />
//                 ) : (
//                   <div
//                     className="absolute inset-0"
//                     style={{ background: 'linear-gradient(135deg, #e6f5ed, #b2dfcb)' }}
//                   />
//                 )}
//               </div>

//               {/* Content */}
//               <div
//                 className="flex flex-col justify-center px-10 py-12"
//                 style={{ background: '#f9fdfb' }}
//               >
//                 {/* Tags */}
//                 {featured.tags.length > 0 && (
//                   <div className="mb-5 flex flex-wrap gap-2">
//                     {featured.tags.map((tag) => (
//                       <span
//                         key={tag.id}
//                         className="rounded-full px-3 py-1 text-xs font-600"
//                         style={{ background: '#e6f5ed', color: '#1a6b3c' }}
//                       >
//                         {tag.name}
//                       </span>
//                     ))}
//                   </div>
//                 )}

//                 <h2 className="mb-4 text-2xl font-700 leading-snug md:text-3xl">
//                   {featured.title}
//                 </h2>

//                 {featured.description && (
//                   <p className="mb-5 text-sm font-400 text-gray-500 leading-relaxed">
//                     {featured.description}
//                   </p>
//                 )}

//                 {/* Meta */}
//                 <div className="mb-8 flex flex-wrap items-center gap-4 text-xs text-gray-400">
//                   {featured.author?.full_name && (
//                     <span className="flex items-center gap-1.5">
//                       <User className="h-3.5 w-3.5" />
//                       {featured.author.full_name}
//                     </span>
//                   )}
//                   {featured.read_time_minutes && (
//                     <span className="flex items-center gap-1.5">
//                       <Clock className="h-3.5 w-3.5" />
//                       {featured.read_time_minutes} min read
//                     </span>
//                   )}
//                   {featured.published_at && (
//                     <span>{formatDate(featured.published_at)}</span>
//                   )}
//                 </div>

//                 <Link
//                   href={`/blogs/${featured.slug}`}
//                   className="inline-flex items-center gap-2 self-start rounded-full px-6 py-2.5 text-sm font-600 text-white transition-opacity hover:opacity-85"
//                   style={{ background: '#2e8b57' }}
//                 >
//                   Read Article <ChevronRight className="h-4 w-4" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : null}

//       {/* ── LATEST BLOGS ── */}
//       <section
//         ref={addSection}
//         className="relative px-6 pb-28 md:px-12 lg:px-20 opacity-0 translate-y-6 transition-all duration-700"
//       >
//         {/* Centred section header */}
//         <div className="mb-12 text-center">
//           <p
//             className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-700 uppercase tracking-widest"
//             style={{ background: '#e6f5ed', color: '#2e8b57' }}
//           >
//             Latest Articles
//           </p>
//           <h2 className="text-3xl font-700">Stories &amp; Travel Guides</h2>
//           <div
//             className="mx-auto mt-4 h-[2px] w-12 rounded-full"
//             style={{ background: '#2e8b57' }}
//           />
//         </div>

//         {blogs.length === 0 ? (
//           <p className="text-gray-400">No articles published yet. Check back soon.</p>
//         ) : (
//           <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
//             {blogs.map((blog) => (
//               <BlogCardComponent key={blog.id} blog={blog} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   )
// }

// // ── Blog Card ──────────────────────────────────────────────────────────────────

// function BlogCardComponent({ blog }: { blog: BlogCard }) {
//   return (
//     <div
//       className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow duration-300 hover:shadow-lg"
//       style={{ borderColor: '#e2e8f0' }}
//     >
//       {/* Cover */}
//       <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
//         {blog.cover_image_url ? (
//           <Image
//             src={blog.cover_image_url}
//             alt={blog.title}
//             fill
//             className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
//           />
//         ) : (
//           <div
//             className="absolute inset-0"
//             style={{ background: 'linear-gradient(135deg, #e6f5ed, #b2dfcb)' }}
//           />
//         )}
//       </div>

//       <div className="flex flex-1 flex-col px-6 py-6">
//         {/* Tags */}
//         {blog.tags.length > 0 && (
//           <div className="mb-3 flex flex-wrap gap-1.5">
//             {blog.tags.map((tag) => (
//               <span
//                 key={tag.id}
//                 className="rounded-full px-2.5 py-0.5 text-[11px] font-600"
//                 style={{ background: '#e6f5ed', color: '#1a6b3c' }}
//               >
//                 {tag.name}
//               </span>
//             ))}
//           </div>
//         )}

//         <h3 className="mb-2 text-base font-700 leading-snug">{blog.title}</h3>

//         {blog.description && (
//           <p className="mb-4 text-sm font-400 text-gray-500 leading-relaxed line-clamp-2">
//             {blog.description}
//           </p>
//         )}

//         {/* Meta */}
//         <div className="mt-auto flex flex-wrap items-center gap-3 border-t pt-4 text-xs text-gray-400" style={{ borderColor: '#f1f5f9' }}>
//           {blog.author?.full_name && (
//             <span className="flex items-center gap-1">
//               <User className="h-3 w-3" />
//               {blog.author.full_name}
//             </span>
//           )}
//           {blog.read_time_minutes && (
//             <span className="flex items-center gap-1">
//               <Clock className="h-3 w-3" />
//               {blog.read_time_minutes} min
//             </span>
//           )}
//           {blog.published_at && <span>{formatDate(blog.published_at)}</span>}

//           <Link
//             href={`/blogs/${blog.slug}`}
//             className="ml-auto flex items-center gap-1 font-600 transition-colors"
//             style={{ color: '#2e8b57' }}
//           >
//             Read <ChevronRight className="h-3.5 w-3.5" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }





'use client'

// app/blogs/BlogsClient.tsx — Kafira Travels
// Fully inline styles (like the Payments page) — no Tailwind layout classes

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Clock, User } from 'lucide-react'
import { motion } from 'framer-motion'
import type { BlogCard } from '@/lib/blogs'

// ── Palette ───────────────────────────────────────────
const SEA    = '#2d8f7b'
const SEA_DK = '#1a6b58'
const SEA_BG = 'rgba(45,143,123,0.08)'
const SEA_BD = 'rgba(45,143,123,0.20)'
const TEXT   = '#0f2720'
const SUB    = '#2d5a52'
const MUTED  = '#6b9e94'

type Props = {
  featured: BlogCard | null
  blogs: BlogCard[]
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export default function BlogsClient({ featured, blogs }: Props) {
  const sectionsRef = useRef<Element[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) (e.target as HTMLElement).style.opacity = '1'
        ;(e.target as HTMLElement).style.transform = 'translateY(0)'
      }),
      { threshold: 0.1 }
    )
    sectionsRef.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addSection = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
  }

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh', fontFamily: '"Outfit", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&display=swap');
        .blog-card-img { transition: transform 0.5s ease; }
        .blog-card:hover .blog-card-img { transform: scale(1.04); }
        .blog-card { transition: box-shadow 0.3s ease; }
        .blog-card:hover { box-shadow: 0 16px 48px rgba(15,39,32,0.10); }
        .read-link { transition: gap 0.2s ease; }
        .read-link:hover { gap: 8px; }
        .featured-img { transition: transform 0.6s ease; }
        .featured-card:hover .featured-img { transform: scale(1.03); }
      `}</style>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        ref={addSection}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(260px, 38vw, 420px)',
          overflow: 'hidden',
          opacity: 0,
          transform: 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: "url('/images/client-given-3.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* seagreen tint overlay */}
        {/* <div style={{ position: 'absolute', inset: 0, background: 'rgba(28, 90, 55, 0.58)' }} /> */}

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.22em] uppercase text-center"
          >
            Blogs
          </motion.h1>
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────────────────────── */}
      {featured && (
        <section
          ref={addSection}
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,40px) clamp(32px,4vw,56px)',
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          {/* Section label */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-block',
              background: SEA_BG,
              border: `1.5px solid ${SEA_BD}`,
              borderRadius: 999,
              padding: '5px 16px',
              fontFamily: '"Outfit", sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: SEA,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}>
              Featured Article
            </span>
          </div>

          {/* Featured card */}
          <div
            className="featured-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              borderRadius: 28,
              overflow: 'hidden',
              border: `1px solid ${SEA_BD}`,
              boxShadow: '0 10px 40px rgba(15,39,32,0.07)',
              cursor: 'pointer',
            }}
          >
            {/* Image side */}
            <div style={{ position: 'relative', minHeight: 360, background: '#e6f5ed', overflow: 'hidden' }}>
              <span style={{
                position: 'absolute', top: 16, left: 16, zIndex: 10,
                background: SEA, color: '#fff',
                borderRadius: 999, padding: '4px 14px',
                fontFamily: '"Outfit", sans-serif',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                Featured
              </span>
              {featured.cover_image_url ? (
                <Image
                  src={featured.cover_image_url}
                  alt={featured.title}
                  fill priority unoptimized
                  className="featured-img"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#e6f5ed,#b2dfcb)' }} />
              )}
            </div>

            {/* Content side */}
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(28px,4vw,52px)',
              background: '#f7faf9',
            }}>
              {/* Tags */}
              {featured.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {featured.tags.map((tag) => (
                    <span key={tag.id} style={{
                      background: SEA_BG, border: `1px solid ${SEA_BD}`,
                      borderRadius: 999, padding: '3px 12px',
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 11, fontWeight: 600, color: SEA_DK,
                    }}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <h2 style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(22px,2.8vw,34px)',
                color: TEXT,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                margin: '0 0 14px',
              }}>
                {featured.title}
              </h2>

              {featured.description && (
                <p style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: 'clamp(13px,1.2vw,15px)',
                  fontWeight: 400,
                  color: SUB,
                  lineHeight: 1.75,
                  margin: '0 0 20px',
                }}>
                  {featured.description}
                </p>
              )}

              {/* Meta row */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                gap: 16, marginBottom: 28,
                fontFamily: '"Outfit", sans-serif',
                fontSize: 12, fontWeight: 500, color: MUTED,
              }}>
                {featured.author?.full_name && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <User size={13} /> {featured.author.full_name}
                  </span>
                )}
                {featured.read_time_minutes && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={13} /> {featured.read_time_minutes} min read
                  </span>
                )}
                {featured.published_at && <span>{formatDate(featured.published_at)}</span>}
              </div>

              <Link
                href={`/blogs/${featured.slug}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  alignSelf: 'flex-start',
                  background: SEA, color: '#fff',
                  borderRadius: 999, padding: '10px 24px',
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: 13, fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Read Article <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── LATEST BLOGS ─────────────────────────────────────── */}
      <section
        ref={addSection}
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: `0 clamp(20px,5vw,40px) clamp(64px,8vw,100px)`,
          opacity: 0,
          transform: 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}
      >
        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <span style={{
            display: 'inline-block',
            background: SEA_BG, border: `1.5px solid ${SEA_BD}`,
            borderRadius: 999, padding: '5px 16px',
            fontFamily: '"Outfit", sans-serif',
            fontSize: 11, fontWeight: 700, color: SEA,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            Latest Articles
          </span>
          <h2 style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(26px,3.5vw,40px)',
            color: TEXT,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 14px',
          }}>
            Stories &amp; Travel Guides
          </h2>
          <div style={{ width: 48, height: 2, borderRadius: 2, background: SEA, margin: '0 auto' }} />
        </div>

        {blogs.length === 0 ? (
          <p style={{ fontFamily: '"Outfit", sans-serif', color: MUTED, textAlign: 'center', fontSize: 15 }}>
            No articles published yet. Check back soon.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(20px,3vw,32px)',
          }}>
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22,1,0.36,1] }}
              >
                <BlogCardComponent blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

// ── Blog Card ─────────────────────────────────────────────────────────────────

function BlogCardComponent({ blog }: { blog: BlogCard }) {
  return (
    <div
      className="blog-card"
      style={{
        display: 'flex', flexDirection: 'column',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.07)',
        background: '#ffffff',
        boxShadow: '0 4px 20px rgba(15,39,32,0.05)',
      }}
    >
      {/* Cover image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#e6f5ed' }}>
        {blog.cover_image_url ? (
          <Image
            src={blog.cover_image_url}
            alt={blog.title}
            fill
            className="blog-card-img"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#e6f5ed,#b2dfcb)' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(18px,2.5vw,26px)' }}>
        {/* Tags */}
        {blog.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {blog.tags.map((tag) => (
              <span key={tag.id} style={{
                background: SEA_BG, border: `1px solid ${SEA_BD}`,
                borderRadius: 999, padding: '2px 10px',
                fontFamily: '"Outfit", sans-serif',
                fontSize: 10, fontWeight: 600, color: SEA_DK,
                letterSpacing: '0.04em',
              }}>
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <h3 style={{
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(15px,1.4vw,17px)',
          color: TEXT,
          lineHeight: 1.4,
          margin: '0 0 10px',
          letterSpacing: '-0.01em',
        }}>
          {blog.title}
        </h3>

        {blog.description && (
          <p style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: 13,
            fontWeight: 400,
            color: SUB,
            lineHeight: 1.75,
            margin: '0 0 16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {blog.description}
          </p>
        )}

        {/* Meta + CTA */}
        <div style={{
          marginTop: 'auto',
          paddingTop: 14,
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 10,
          fontFamily: '"Outfit", sans-serif',
          fontSize: 11,
          fontWeight: 500,
          color: MUTED,
        }}>
          {blog.author?.full_name && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <User size={11} /> {blog.author.full_name}
            </span>
          )}
          {blog.read_time_minutes && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={11} /> {blog.read_time_minutes} min
            </span>
          )}
          {blog.published_at && <span>{formatDate(blog.published_at)}</span>}

          <Link
            href={`/blogs/${blog.slug}`}
            className="read-link"
            style={{
              marginLeft: 'auto',
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: '"Outfit", sans-serif',
              fontSize: 12, fontWeight: 700, color: SEA,
              textDecoration: 'none',
            }}
          >
            Read <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}