// lib/supabase/blogs.ts
// Drop this file at: lib/supabase/blogs.ts
// Assumes you have a Supabase client exported from lib/supabase.ts as `supabase`

import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Tag = {
  id: string
  name: string
  slug: string
  color_hex: string
}

export type BlogAuthor = {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
}

export type BlogSection = {
  id: string
  section_order: number
  type: 'text' | 'image' | 'text_image' | 'quote' | 'callout'
  heading: string | null
  body: string | null
  image_url: string | null
  image_caption: string | null
  image_alt: string | null
}

export type BlogCard = {
  id: string
  slug: string
  title: string
  description: string | null
  cover_image_url: string | null
  is_featured: boolean
  read_time_minutes: number | null
  published_at: string | null
  author: BlogAuthor | null
  tags: Tag[]
}

export type BlogDetail = BlogCard & {
  seo_title: string | null
  seo_description: string | null
  sections: BlogSection[]
}

// ─── Blog Listing ─────────────────────────────────────────────────────────────

/**
 * Fetch all published blogs for the listing page.
 * Returns featured blog first (if any), then rest ordered by published_at desc.
 */
export async function getPublishedBlogs(): Promise<{
  featured: BlogCard | null
  blogs: BlogCard[]
}> {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      id,
      slug,
      title,
      description,
      cover_image_url,
      is_featured,
      read_time_minutes,
      published_at,
      author:profiles (
        id,
        full_name,
        avatar_url,
        bio
      ),
      blog_tags (
        tag:tags (
          id,
          name,
          slug,
          color_hex
        )
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[getPublishedBlogs]', error.message)
    return { featured: null, blogs: [] }
  }

  // Flatten nested blog_tags → tags[]
  const normalized: BlogCard[] = (data ?? []).map((b: any) => ({
    ...b,
    author: b.author ?? null,
    tags: (b.blog_tags ?? []).map((bt: any) => bt.tag).filter(Boolean),
  }))

  const featured = normalized.find((b) => b.is_featured) ?? null
  const rest = normalized.filter((b) => !b.is_featured)

  return { featured, blogs: rest }
}

// ─── Blog Detail ──────────────────────────────────────────────────────────────

/**
 * Fetch a single published blog by slug, including all ordered sections and tags.
 */
export async function getBlogBySlug(slug: string): Promise<BlogDetail | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      id,
      slug,
      title,
      description,
      cover_image_url,
      is_featured,
      read_time_minutes,
      published_at,
      seo_title,
      seo_description,
      author:profiles (
        id,
        full_name,
        avatar_url,
        bio
      ),
      blog_tags (
        tag:tags (
          id,
          name,
          slug,
          color_hex
        )
      ),
      sections:blog_sections (
        id,
        section_order,
        type,
        heading,
        body,
        image_url,
        image_caption,
        image_alt
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    console.error('[getBlogBySlug]', error?.message)
    return null
  }

  return {
    ...data,
    author: (data as any).author ?? null,
    tags: ((data as any).blog_tags ?? []).map((bt: any) => bt.tag).filter(Boolean),
    sections: ((data as any).sections ?? []).sort(
      (a: BlogSection, b: BlogSection) => a.section_order - b.section_order
    ),
  }
}

// ─── Related Blogs ────────────────────────────────────────────────────────────

/**
 * Fetch up to 3 related published blogs, excluding the current one.
 * Matches by shared tag slugs first, falls back to latest.
 */
export async function getRelatedBlogs(
  currentSlug: string,
  tagSlugs: string[]
): Promise<BlogCard[]> {
  // Fetch blogs that share at least one tag
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      id,
      slug,
      title,
      description,
      cover_image_url,
      is_featured,
      read_time_minutes,
      published_at,
      author:profiles (
        id,
        full_name,
        avatar_url,
        bio
      ),
      blog_tags (
        tag:tags (
          id,
          name,
          slug,
          color_hex
        )
      )
    `)
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(10)

  if (error || !data) return []

  const normalized: BlogCard[] = data.map((b: any) => ({
    ...b,
    author: b.author ?? null,
    tags: (b.blog_tags ?? []).map((bt: any) => bt.tag).filter(Boolean),
  }))

  if (tagSlugs.length === 0) return normalized.slice(0, 3)

  // Prioritize blogs with matching tags
  const withMatch = normalized.filter((b) =>
    b.tags.some((t) => tagSlugs.includes(t.slug))
  )
  const withoutMatch = normalized.filter(
    (b) => !b.tags.some((t) => tagSlugs.includes(t.slug))
  )

  return [...withMatch, ...withoutMatch].slice(0, 3)
}

// ─── Static Paths ─────────────────────────────────────────────────────────────

/**
 * Fetch all published blog slugs for generateStaticParams.
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('slug')
    .eq('status', 'published')

  if (error || !data) return []
  return data.map((b : any) => b.slug)
}
