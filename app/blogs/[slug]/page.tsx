// app/blogs/[slug]/page.tsx
// Server component — fetches blog + related, generates metadata, handles 404

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogBySlug, getRelatedBlogs, getAllBlogSlugs } from '@/lib/blogs'
import BlogDetailClient from './BlogsDetailClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Props = {
  params: Promise<{ slug: string }>
}

// ── ISR: revalidate every 60s, generate known slugs at build time ──────────────
export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ── Dynamic SEO metadata per blog ─────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return { title: 'Blog Not Found | MetaMaster' }

  return {
    title: blog.seo_title ?? blog.title,
    description: blog.seo_description ?? blog.description ?? undefined,
    openGraph: {
      title: blog.seo_title ?? blog.title,
      description: blog.seo_description ?? blog.description ?? undefined,
      images: blog.cover_image_url ? [{ url: blog.cover_image_url }] : [],
      type: 'article',
      publishedTime: blog.published_at ?? undefined,
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()

  const tagSlugs = blog.tags.map((t) => t.slug)
  const relatedBlogs = await getRelatedBlogs(slug, tagSlugs)

  return (
    <div>
      <Navbar />

      <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />
      <Footer />
    </div>
  )
  
  
  
  
}
