// 'use client'

// // app/blogs/[slug]/BlogDetailClient.tsx
// // Kafira Travels — white · seagreen · black palette, Montserrat font

// import { useEffect, useRef, useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { ChevronRight, Clock, User, ArrowLeft, ChevronUp } from 'lucide-react'
// import { motion, useScroll, useSpring } from 'framer-motion'
// import ReactMarkdown from 'react-markdown'
// import type { BlogDetail, BlogCard, BlogSection } from '@/lib/blogs'

// type Props = {
//   blog: BlogDetail
//   relatedBlogs: BlogCard[]
// }

// function formatDate(iso: string | null): string {
//   if (!iso) return ''
//   return new Date(iso).toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   })
// }

// function buildTOC(sections: BlogSection[]) {
//   return sections
//     .filter((s) => s.heading)
//     .map((s) => ({
//       id: `section-${s.section_order}`,
//       label: s.heading!,
//     }))
// }

// export default function BlogDetailClient({ blog, relatedBlogs }: Props) {
//   const [activeSection, setActiveSection] = useState<string>('')
//   const [showScrollTop, setShowScrollTop] = useState(false)

//   const { scrollYProgress } = useScroll()
//   const progressScale = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

//   const toc = buildTOC(blog.sections)

//   useEffect(() => {
//     const scroll = () => setShowScrollTop(window.scrollY > 600)
//     window.addEventListener('scroll', scroll)
//     return () => window.removeEventListener('scroll', scroll)
//   }, [])

//   useEffect(() => {
//     if (toc.length === 0) return
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) setActiveSection(entry.target.id)
//         })
//       },
//       { rootMargin: '-20% 0% -60% 0%' }
//     )
//     toc.forEach(({ id }) => {
//       const el = document.getElementById(id)
//       if (el) observer.observe(el)
//     })
//     return () => observer.disconnect()
//   }, [toc])

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

//   return (
//     <div
//       className="relative min-h-screen bg-white text-black"
//       style={{ fontFamily: "'Montserrat', sans-serif" }}
//     >
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');`}</style>

//       {/* ── READING PROGRESS BAR ── */}
//       <motion.div
//         style={{ scaleX: progressScale }}
//         className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 background-[#2e8b57]"
//         // css={{ background: '#2e8b57' }}
//       />
//       {/* Inline style fallback for the progress bar color */}
//       <motion.div
//         style={{ scaleX: progressScale, background: '#2e8b57' }}
//         className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
//       />

//       {/* ── HERO IMAGE ── */}
//       <div className="relative h-[55vh] min-h-[400px] w-full">
//         {blog.cover_image_url ? (
//           <Image
//             src={blog.cover_image_url}
//             alt={blog.title}
//             fill
//             priority
//             className="object-cover"
//             unoptimized
//           />
//         ) : (
//           <div
//             className="absolute inset-0"
//             style={{ background: 'linear-gradient(135deg, #e6f5ed, #b2dfcb)' }}
//           />
//         )}
//         {/* Gradient fade to white */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-white" />

//         {/* Back link */}
//         <div className="absolute top-6 left-6 z-10">
//           <Link
//             href="/blogs"
//             className="flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-sm font-600 text-black backdrop-blur-sm transition-all hover:bg-white"
//           >
//             <ArrowLeft className="h-3.5 w-3.5" />
//             All Articles
//           </Link>
//         </div>
//       </div>

//       {/* ── TITLE + META ── */}
//       <div className="relative z-10 -mt-20 px-6 md:px-12 lg:px-20">
//         <div className="max-w-3xl">
//           {/* Tags */}
//           {blog.tags.length > 0 && (
//             <div className="mb-5 flex flex-wrap gap-2">
//               {blog.tags.map((tag) => (
//                 <span
//                   key={tag.id}
//                   className="rounded-full px-3 py-1 text-xs font-600"
//                   style={{ background: '#e6f5ed', color: '#1a6b3c' }}
//                 >
//                   {tag.name}
//                 </span>
//               ))}
//             </div>
//           )}

//           <h1 className="mb-5 text-3xl font-800 leading-tight md:text-4xl lg:text-5xl">
//             {blog.title}
//           </h1>

//           {blog.description && (
//             <p className="mb-8 max-w-2xl text-base font-400 text-gray-500 leading-relaxed">
//               {blog.description}
//             </p>
//           )}

//           {/* Author + meta */}
//           <div
//             className="mb-10 flex flex-wrap items-center gap-6 border-b pb-8"
//             style={{ borderColor: '#e2e8f0' }}
//           >
//             {blog.author && (
//               <div className="flex items-center gap-3">
//                 {blog.author.avatar_url ? (
//                   <Image
//                     src={blog.author.avatar_url}
//                     alt={blog.author.full_name ?? 'Author'}
//                     width={40}
//                     height={40}
//                     className="rounded-full object-cover ring-2"
//                     // style={{ ringColor: '#b2dfcb' }}
//                     ring-color="#b2dfcb"
//                     unoptimized
//                   />
//                 ) : (
//                   <div
//                     className="flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-[#b2dfcb]"
//                     style={{ background: '#e6f5ed' }}
//                   >
//                     <User className="h-5 w-5" style={{ color: '#2e8b57' }} />
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-sm font-700">
//                     {blog.author.full_name ?? 'Kafira Travels'}
//                   </p>
//                   {blog.author.bio && (
//                     <p className="text-xs text-gray-400 line-clamp-1">
//                       {blog.author.bio}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}

//             <div className="flex items-center gap-5 text-sm text-gray-400">
//               {blog.published_at && <span>{formatDate(blog.published_at)}</span>}
//               {blog.read_time_minutes && (
//                 <span className="flex items-center gap-1.5">
//                   <Clock className="h-3.5 w-3.5" />
//                   {blog.read_time_minutes} min read
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── CONTENT + TOC ── */}
//       <div className="relative z-10 px-6 pb-24 md:px-12 lg:px-20">
//         <div className="flex gap-16 lg:gap-20">

//           {/* ── MAIN CONTENT ── */}
//           <article className="min-w-0 flex-1">
//             {blog.sections.length === 0 ? (
//               <p className="text-gray-400">Content coming soon.</p>
//             ) : (
//               <div className="space-y-16">
//                 {blog.sections.map((section) => (
//                   <BlogSectionBlock key={section.id} section={section} />
//                 ))}
//               </div>
//             )}
//           </article>

//           {/* ── STICKY SIDEBAR ── */}
//           {(toc.length > 0 || relatedBlogs.length > 0) && (
//             <aside className="hidden lg:block w-[240px] shrink-0">
//               <div className="sticky top-8 space-y-10">

//                 {/* TOC */}
//                 {toc.length > 0 && (
//                   <div>
//                     <p
//                       className="mb-4 text-[10px] font-700 uppercase tracking-widest"
//                       style={{ color: '#2e8b57' }}
//                     >
//                       In this article
//                     </p>
//                     <nav className="space-y-1">
//                       {toc.map(({ id, label }) => (
//                         <a
//                           key={id}
//                           href={`#${id}`}
//                           className="block rounded-lg px-3 py-2 text-sm font-500 transition-all duration-200"
//                           style={
//                             activeSection === id
//                               ? { background: '#e6f5ed', color: '#1a6b3c' }
//                               : { color: '#6b7280' }
//                           }
//                         >
//                           {label}
//                         </a>
//                       ))}
//                     </nav>
//                   </div>
//                 )}

//                 {toc.length > 0 && relatedBlogs.length > 0 && (
//                   <div className="border-t" style={{ borderColor: '#e2e8f0' }} />
//                 )}

//                 {/* Related */}
//                 {relatedBlogs.length > 0 && (
//                   <div>
//                     <p
//                       className="mb-4 text-[10px] font-700 uppercase tracking-widest"
//                       style={{ color: '#2e8b57' }}
//                     >
//                       Also Read
//                     </p>
//                     <div className="space-y-3">
//                       {relatedBlogs.map((rb) => (
//                         <Link
//                           key={rb.id}
//                           href={`/blogs/${rb.slug}`}
//                           className="group block rounded-xl border p-3 transition-all hover:shadow-sm"
//                           style={{ borderColor: '#e2e8f0' }}
//                         >
//                           {rb.cover_image_url && (
//                             <div className="relative mb-2.5 aspect-[16/9] overflow-hidden rounded-lg">
//                               <Image
//                                 src={rb.cover_image_url}
//                                 alt={rb.title}
//                                 fill
//                                 unoptimized
//                                 className="object-cover transition-transform duration-300 group-hover:scale-105"
//                               />
//                             </div>
//                           )}
//                           <p className="text-xs font-600 text-gray-700 leading-snug line-clamp-2 group-hover:text-black transition-colors">
//                             {rb.title}
//                           </p>
//                           {rb.read_time_minutes && (
//                             <p className="mt-1 text-[10px] text-gray-400">
//                               {rb.read_time_minutes} min read
//                             </p>
//                           )}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </aside>
//           )}
//         </div>
//       </div>

//       {/* ── MORE TO READ (full-width) ── */}
//       {relatedBlogs.length > 0 && (
//         <section
//           className="border-t px-6 py-20 md:px-12 lg:px-20"
//           style={{ borderColor: '#e2e8f0', background: '#f9fdfb' }}
//         >
//           <div className="mb-10 flex items-center gap-4">
//             <h2 className="text-2xl font-700">More to Explore</h2>
//             <div className="flex-1 border-t" style={{ borderColor: '#d4eddf' }} />
//           </div>
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {relatedBlogs.map((rb) => (
//               <Link
//                 key={rb.id}
//                 href={`/blogs/${rb.slug}`}
//                 className="group overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md"
//                 style={{ borderColor: '#e2e8f0' }}
//               >
//                 <div className="relative aspect-[16/9] bg-gray-100">
//                   {rb.cover_image_url ? (
//                     <Image
//                       src={rb.cover_image_url}
//                       alt={rb.title}
//                       fill
//                       unoptimized
//                       className="object-cover transition-transform duration-500 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div
//                       className="absolute inset-0"
//                       style={{ background: 'linear-gradient(135deg, #e6f5ed, #b2dfcb)' }}
//                     />
//                   )}
//                 </div>
//                 <div className="p-5">
//                   {rb.tags.length > 0 && (
//                     <span
//                       className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-600"
//                       style={{ background: '#e6f5ed', color: '#1a6b3c' }}
//                     >
//                       {rb.tags[0].name}
//                     </span>
//                   )}
//                   <h3 className="text-sm font-700 leading-snug text-black line-clamp-2 group-hover:opacity-80 transition-opacity">
//                     {rb.title}
//                   </h3>
//                   <p
//                     className="mt-3 flex items-center gap-1 text-xs font-600"
//                     style={{ color: '#2e8b57' }}
//                   >
//                     Read More <ChevronRight className="h-3 w-3" />
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* ── SCROLL TO TOP ── */}
//       {showScrollTop && (
//         <motion.button
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-opacity hover:opacity-85"
//           style={{ background: '#2e8b57' }}
//         >
//           <ChevronUp className="h-4 w-4" />
//         </motion.button>
//       )}
//     </div>
//   )
// }

// // ── Section Renderer ──────────────────────────────────────────────────────────

// function BlogSectionBlock({ section }: { section: BlogSection }) {
//   const { type, heading, body, image_url, image_caption, image_alt, section_order } = section
//   const sectionId = `section-${section_order}`

//   return (
//     <div id={sectionId} className="scroll-mt-8">
//       {heading && (
//         <h2 className="mb-5 text-2xl font-700 leading-snug md:text-3xl">
//           {heading}
//         </h2>
//       )}

//       {type === 'text' && body && <MarkdownBody body={body} />}

//       {type === 'image' && image_url && (
//         <BlogImage url={image_url} alt={image_alt ?? heading ?? ''} caption={image_caption} />
//       )}

//       {type === 'text_image' && (
//         <div
//           className={`flex flex-col gap-8 lg:flex-row ${
//             section_order % 2 === 0 ? '' : 'lg:flex-row-reverse'
//           }`}
//         >
//           {body && (
//             <div className="flex-1 min-w-0">
//               <MarkdownBody body={body} />
//             </div>
//           )}
//           {image_url && (
//             <div className="w-full lg:w-[45%] shrink-0">
//               <BlogImage url={image_url} alt={image_alt ?? heading ?? ''} caption={image_caption} />
//             </div>
//           )}
//         </div>
//       )}

//       {type === 'quote' && body && (
//         <blockquote
//           className="relative border-l-4 pl-6 py-2"
//           style={{ borderColor: '#2e8b57' }}
//         >
//           <p className="text-xl font-500 italic text-gray-700 leading-relaxed">{body}</p>
//           {heading && (
//             <cite className="mt-3 block text-sm text-gray-400 not-italic font-600">
//               — {heading}
//             </cite>
//           )}
//         </blockquote>
//       )}

//       {type === 'callout' && (
//         <div
//           className="rounded-2xl border p-8"
//           style={{ background: '#f0faf6', borderColor: '#b2dfcb' }}
//         >
//           {heading && (
//             <p
//               className="mb-3 text-xs font-700 uppercase tracking-widest"
//               style={{ color: '#2e8b57' }}
//             >
//               {heading}
//             </p>
//           )}
//           {body && <MarkdownBody body={body} />}
//         </div>
//       )}
//     </div>
//   )
// }

// // ── Markdown ──────────────────────────────────────────────────────────────────

// function MarkdownBody({ body }: { body: string }) {
//   return (
//     <div className="prose prose-gray max-w-none
//       prose-p:text-gray-600 prose-p:leading-8 prose-p:font-400
//       prose-h3:text-black prose-h3:font-700
//       prose-strong:text-black prose-strong:font-700
//       prose-li:text-gray-600 prose-li:font-400
//       prose-a:font-600 prose-a:no-underline hover:prose-a:underline
//       prose-code:text-black prose-code:bg-gray-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
//       prose-blockquote:border-seagreen prose-blockquote:text-gray-600
//     "
//     style={{ '--tw-prose-links': '#2e8b57' } as React.CSSProperties}
//     >
//       <ReactMarkdown>{body}</ReactMarkdown>
//     </div>
//   )
// }

// // ── Image block ───────────────────────────────────────────────────────────────

// function BlogImage({ url, alt, caption }: { url: string; alt: string; caption: string | null }) {
//   return (
//     <figure className="overflow-hidden rounded-2xl">
//       <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
//         <Image src={url} alt={alt} fill className="object-cover" unoptimized />
//       </div>
//       {caption && (
//         <figcaption className="mt-3 text-center text-xs text-gray-400 font-500">
//           {caption}
//         </figcaption>
//       )}
//     </figure>
//   )
// }







'use client'

// app/blogs/[slug]/BlogDetailClient.tsx — Kafira Travels
// Fully inline styles — no Tailwind layout classes

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Clock, User, ArrowLeft, ChevronUp } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import type { BlogDetail, BlogCard, BlogSection } from '@/lib/blogs'

// ── Palette ───────────────────────────────────────────
const SEA    = '#2d8f7b'
const SEA_DK = '#1a6b58'
const SEA_BG = 'rgba(45,143,123,0.08)'
const SEA_BD = 'rgba(45,143,123,0.22)'
const TEXT   = '#0f2720'
const SUB    = '#2d5a52'
const MUTED  = '#6b9e94'

type Props = {
  blog: BlogDetail
  relatedBlogs: BlogCard[]
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function buildTOC(sections: BlogSection[]) {
  return sections.filter((s) => s.heading).map((s) => ({
    id: `section-${s.section_order}`,
    label: s.heading!,
  }))
}

export default function BlogDetailClient({ blog, relatedBlogs }: Props) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const toc = buildTOC(blog.sections)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!toc.length) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-20% 0% -60% 0%' }
    )
    toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [toc])

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;800&display=swap');
      
        .toc-link { transition: all 0.2s ease; }
        .toc-link:hover { color: ${SEA} !important; background: ${SEA_BG} !important; }
        .related-card { transition: box-shadow 0.3s ease, transform 0.3s ease; }
        .related-card:hover { box-shadow: 0 16px 40px rgba(15,39,32,0.10); transform: translateY(-3px); }
        .related-img { transition: transform 0.5s ease; }
        .related-card:hover .related-img { transform: scale(1.05); }
        .back-btn { transition: all 0.2s ease; }
        .back-btn:hover { background: rgba(255,255,255,1) !important; }
        @media (max-width: 1024px) { .detail-sidebar { display: none !important; } }
        @media (max-width: 640px) { .related-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── READING PROGRESS BAR ── */}
      <motion.div style={{
        scaleX: progressScale,
        background: SEA,
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 3, transformOrigin: 'left', zIndex: 100,
      }} />

      {/* ── HERO IMAGE ── */}
      <div style={{ position: 'relative', height: 'clamp(320px, 52vw, 560px)', width: '100%' }}>
        {blog.cover_image_url ? (
          <Image src={blog.cover_image_url} alt={blog.title} fill priority unoptimized style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#e6f5ed,#b2dfcb)' }} />
        )}
        {/* fade to white at bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 50%, #ffffff 100%)' }} />

        {/* Back button */}
        <div style={{ position: 'absolute', top: 24, left: 'clamp(20px,5vw,40px)', zIndex: 10 }}>
          <Link
            href="/blogs"
            className="back-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.82)',
              border: '1px solid rgba(255,255,255,0.40)',
              borderRadius: 999, padding: '8px 18px',
              fontFamily: '"Inter", sans-serif',
              fontSize: 13, fontWeight: 600, color: TEXT,
              textDecoration: 'none', backdropFilter: 'blur(8px)',
            }}
          >
            <ArrowLeft size={14} /> All Articles
          </Link>
        </div>
      </div>

      {/* ── TITLE + META ── */}
      <div style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 clamp(20px,5vw,40px)',
        position: 'relative',
        zIndex: 10,
        marginTop: -80,
      }}>
        <div style={{ maxWidth: 760 }}>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {blog.tags.map((tag) => (
                <span key={tag.id} style={{
                  background: SEA_BG, border: `1px solid ${SEA_BD}`,
                  borderRadius: 999, padding: '4px 14px',
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: 11, fontWeight: 700, color: SEA_DK,
                  letterSpacing: '0.06em',
                }}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <h1 style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(28px,4.5vw,52px)',
            color: TEXT,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            margin: '0 0 16px',
          }}>
            {blog.title}
          </h1>

          {blog.description && (
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(14px,1.3vw,17px)',
              fontWeight: 300,
              color: SUB,
              lineHeight: 1.75,
              margin: '0 0 28px',
              maxWidth: 640,
            }}>
              {blog.description}
            </p>
          )}

          {/* Author row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            gap: 20, paddingBottom: 28,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            marginBottom: 0,
          }}>
            {blog.author && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {blog.author.avatar_url ? (
                  <Image
                    src={blog.author.avatar_url}
                    alt={blog.author.full_name ?? 'Author'}
                    width={44} height={44}
                    unoptimized
                    style={{ borderRadius: '50%', objectFit: 'cover', border: `2px solid ${SEA_BD}` }}
                  />
                ) : (
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: SEA_BG, border: `2px solid ${SEA_BD}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: SEA,
                  }}>
                    <User size={20} />
                  </div>
                )}
                <div>
                  <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 14, fontWeight: 500, color: TEXT, margin: 0 }}>
                    {blog.author.full_name ?? 'Kafira Travels'}
                  </p>
                  {blog.author.bio && (
                    <p style={{
                      fontFamily: '"Inter", sans-serif', fontSize: 12, color: MUTED, margin: 0,
                      overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
                    }}>
                      {blog.author.bio}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: '"Inter", sans-serif', fontSize: 13, color: MUTED }}>
              {blog.published_at && <span>{formatDate(blog.published_at)}</span>}
              {blog.read_time_minutes && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={13} /> {blog.read_time_minutes} min read
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT + SIDEBAR ── */}
      <div style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,40px) clamp(64px,8vw,96px)',
        display: 'flex',
        gap: 'clamp(40px,5vw,72px)',
        alignItems: 'flex-start',
      }}>

        {/* ── ARTICLE BODY ── */}
        <article style={{ flex: 1, minWidth: 0 }}>
          {blog.sections.length === 0 ? (
            <p style={{ fontFamily: '"Montserrat", sans-serif', color: MUTED }}>Content coming soon.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {blog.sections.map((section) => (
                <BlogSectionBlock key={section.id} section={section} />
              ))}
            </div>
          )}
        </article>

        {/* ── STICKY SIDEBAR ── */}
        {(toc.length > 0 || relatedBlogs.length > 0) && (
          <aside
            className="detail-sidebar"
            style={{ width: 240, flexShrink: 0, position: 'sticky', top: 32, alignSelf: 'flex-start' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

              {/* TOC */}
              {toc.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: 10, fontWeight: 500, color: SEA,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    margin: '0 0 14px',
                  }}>
                    In this article
                  </p>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {toc.map(({ id, label }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="toc-link"
                        style={{
                          display: 'block',
                          padding: '8px 12px',
                          borderRadius: 10,
                          fontFamily: '"Inter", sans-serif',
                          fontSize: 13, fontWeight: 500,
                          color: activeSection === id ? SEA_DK : MUTED,
                          background: activeSection === id ? SEA_BG : 'transparent',
                          textDecoration: 'none',
                          lineHeight: 1.4,
                        }}
                      >
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {toc.length > 0 && relatedBlogs.length > 0 && (
                <div style={{ height: 1, background: 'rgba(0,0,0,0.07)' }} />
              )}

              {/* Also Read */}
              {relatedBlogs.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: 10, fontWeight: 500, color: SEA,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    margin: '0 0 14px',
                  }}>
                    Also Read
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {relatedBlogs.map((rb) => (
                      <Link
                        key={rb.id}
                        href={`/blogs/${rb.slug}`}
                        className="related-card"
                        style={{
                          display: 'block',
                          borderRadius: 14,
                          overflow: 'hidden',
                          border: '1px solid rgba(0,0,0,0.07)',
                          background: '#fff',
                          textDecoration: 'none',
                          boxShadow: '0 2px 12px rgba(15,39,32,0.05)',
                        }}
                      >
                        {rb.cover_image_url && (
                          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                            <Image src={rb.cover_image_url} alt={rb.title} fill unoptimized
                              className="related-img" style={{ objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ padding: '10px 12px 12px' }}>
                          <p style={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: 12, fontWeight: 500, color: TEXT,
                            lineHeight: 1.45, margin: 0,
                            overflow: 'hidden', display: '-webkit-box',
                            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                          }}>
                            {rb.title}
                          </p>
                          {rb.read_time_minutes && (
                            <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 10, color: MUTED, margin: '4px 0 0' }}>
                              {rb.read_time_minutes} min read
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* ── MORE TO EXPLORE ── */}
      {relatedBlogs.length > 0 && (
        <section style={{ background: '#f7faf9', borderTop: '1px solid rgba(45,143,123,0.12)' }}>
          <div style={{
            maxWidth: 1180, margin: '0 auto',
            padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,40px)',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 'clamp(32px,4vw,48px)' }}>
              <h2 style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 800, fontSize: 'clamp(24px,4vw,46px)',
                color: TEXT, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap',
              }}>
                More to Explore
              </h2>
              <div style={{ flex: 1, height: 1, background: SEA_BD }} />
            </div>

            <div
              className="related-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(18px,3vw,28px)',
              }}
            >
              {relatedBlogs.map((rb) => (
                <Link
                  key={rb.id}
                  href={`/blogs/${rb.slug}`}
                  className="related-card"
                  style={{
                    display: 'block',
                    borderRadius: 20, overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)',
                    background: '#fff',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(15,39,32,0.05)',
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#e6f5ed' }}>
                    {rb.cover_image_url ? (
                      <Image src={rb.cover_image_url} alt={rb.title} fill unoptimized
                        className="related-img" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#e6f5ed,#b2dfcb)' }} />
                    )}
                  </div>
                  <div style={{ padding: 'clamp(16px,2vw,22px)' }}>
                    {rb.tags.length > 0 && (
                      <span style={{
                        display: 'inline-block', background: SEA_BG, border: `1px solid ${SEA_BD}`,
                        borderRadius: 999, padding: '2px 10px', marginBottom: 10,
                        fontFamily: '"Inter", sans-serif', fontSize: 10, fontWeight: 600, color: SEA_DK,
                      }}>
                        {rb.tags[0].name}
                      </span>
                    )}
                    <h3 style={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700, fontSize: 14, color: TEXT,
                      lineHeight: 1.45, margin: '0 0 12px',
                      overflow: 'hidden', display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}>
                      {rb.title}
                    </h3>
                    <p style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: 12, fontWeight: 500, color: SEA, margin: 0,
                    }}>
                      Read More <ChevronRight size={13} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SCROLL TO TOP ── */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 40,
            width: 44, height: 44, borderRadius: '50%',
            background: SEA, color: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(45,143,123,0.35)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <ChevronUp size={18} />
        </motion.button>
      )}
    </main>
  )
}

// ── Section Renderer ──────────────────────────────────────────────────────────

function BlogSectionBlock({ section }: { section: BlogSection }) {
  const { type, heading, body, image_url, image_caption, image_alt, section_order } = section

  return (
    <div id={`section-${section_order}`} style={{ scrollMarginTop: 32 }}>

      {/* Heading */}
      {heading && (
        <h2 style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(20px,2.6vw,30px)',
          color: TEXT,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: 20,
        }}>
          {heading}
        </h2>
      )}

      {type === 'text' && body && <MarkdownBody body={body} />}

      {type === 'image' && image_url && (
        <BlogImage url={image_url} alt={image_alt ?? heading ?? ''} caption={image_caption} />
      )}

      {type === 'text_image' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(24px,4vw,48px)',
          direction: section_order % 2 === 0 ? 'ltr' : 'rtl',
        }}>
          {body && (
            <div style={{ direction: 'ltr' }}>
              <MarkdownBody body={body} />
            </div>
          )}
          {image_url && (
            <div style={{ direction: 'ltr' }}>
              <BlogImage url={image_url} alt={image_alt ?? heading ?? ''} caption={image_caption} />
            </div>
          )}
        </div>
      )}

      {type === 'quote' && body && (
        <blockquote style={{
          borderLeft: `4px solid ${SEA}`,
          paddingLeft: 24, paddingTop: 4, paddingBottom: 4,
          margin: 0,
        }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(16px,2vw,22px)',
            fontWeight: 500,
            fontStyle: 'italic',
            color: SUB,
            lineHeight: 1.7,
            margin: 0,
          }}>
            {body}
          </p>
          {heading && (
            <cite style={{
              display: 'block', marginTop: 12,
              fontFamily: '"Inter", sans-serif',
              fontSize: 13, fontWeight: 600, color: MUTED,
              fontStyle: 'normal',
            }}>
              — {heading}
            </cite>
          )}
        </blockquote>
      )}

      {type === 'callout' && (
        <div style={{
          background: SEA_BG,
          border: `1.5px solid ${SEA_BD}`,
          borderRadius: 20,
          padding: 'clamp(22px,3vw,36px)',
        }}>
          {heading && (
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 11, fontWeight: 500, color: SEA,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              margin: '0 0 12px',
            }}>
              {heading}
            </p>
          )}
          {body && <MarkdownBody body={body} />}
        </div>
      )}
    </div>
  )
}

// ── Markdown renderer ─────────────────────────────────────────────────────────

function MarkdownBody({ body }: { body: string }) {
  return (
    <div style={{
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(14px,1.2vw,16px)',
      lineHeight: 1.85,
      color: SUB,
    }}
    className="
      prose prose-gray max-w-none
      prose-p:font-[Inter] prose-p:text-[#2d5a52] prose-p:leading-[1.85]
      prose-h3:font-[Inter] prose-h3:font-bold prose-h3:text-[#0f2720] prose-h3:tracking-tight
      prose-strong:text-[#0f2720] prose-strong:font-bold
      prose-li:text-[#2d5a52] prose-li:font-[Inter]
      prose-a:text-[#2d8f7b] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
      prose-code:text-[#0f2720] prose-code:bg-[rgba(45,143,123,0.08)] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
      prose-blockquote:border-[#2d8f7b] prose-blockquote:text-[#2d5a52]
    "
    >
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  )
}

// ── Image block ───────────────────────────────────────────────────────────────

function BlogImage({ url, alt, caption }: { url: string; alt: string; caption: string | null }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', width: '100%', borderRadius: 18, overflow: 'hidden' }}>
        <Image src={url} alt={alt} fill unoptimized style={{ objectFit: 'cover' }} />
      </div>
      {caption && (
        <figcaption style={{
          marginTop: 12, textAlign: 'center',
          fontFamily: '"Inter", sans-serif',
          fontSize: 12, fontWeight: 600, color: MUTED,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}