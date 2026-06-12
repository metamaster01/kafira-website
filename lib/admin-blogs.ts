// lib/admin-blogs.ts
// All admin-side Supabase operations for blogs
// Uses anon key — relies on RLS + admin role check in DB

import { createBrowserClient } from '@supabase/ssr'

export function getAdminClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminBlogRow = {
  id: string
  slug: string
  title: string
  description: string | null
  cover_image_url: string | null
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  read_time_minutes: number | null
  published_at: string | null
  created_at: string
  author: { full_name: string | null } | null
  blog_tags: { tag: { name: string } | null }[]
}

export type BlogFormData = {
  slug: string
  title: string
  description: string
  cover_image_url: string
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  read_time_minutes: number | null
  published_at: string | null
  seo_title: string
  seo_description: string
}

export type SectionFormData = {
  id?: string
  section_order: number
  type: 'text' | 'image' | 'text_image' | 'quote' | 'callout'
  heading: string
  body: string
  image_url: string
  image_caption: string
  image_alt: string
}

// ─── List all blogs ───────────────────────────────────────────────────────────

export async function adminGetAllBlogs(): Promise<AdminBlogRow[]> {
  const supabase = getAdminClient()

  const { data, error } = await supabase
    .from('blogs')
    .select(`
      id, slug, title, description, cover_image_url,
      status, is_featured, read_time_minutes,
      published_at, created_at,
      author:profiles ( full_name ),
      blog_tags ( tag:tags ( name ) )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[adminGetAllBlogs]', error.message)
    return []
  }

  return (data ?? []) as unknown as AdminBlogRow[]
}

// ─── Get single blog with sections (edit form) ────────────────────────────────

export async function adminGetBlogById(id: string) {
  const supabase = getAdminClient()

  const [blogRes, sectionsRes, tagsRes] = await Promise.all([
    supabase.from('blogs').select('*').eq('id', id).single(),
    supabase.from('blog_sections').select('*').eq('blog_id', id).order('section_order'),
    supabase.from('blog_tags').select('tag:tags(id, name, slug)').eq('blog_id', id),
  ])

  if (blogRes.error) return null

  return {
    blog:     blogRes.data,
    sections: sectionsRes.data ?? [],
    tags:     (tagsRes.data ?? []).map((bt: any) => bt.tag).filter(Boolean),
  }
}

// ─── Create new blog ──────────────────────────────────────────────────────────

export async function adminCreateBlog(
  formData: BlogFormData,
  sections: SectionFormData[],
  tagIds: string[]
) {
  const supabase = getAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: blog, error: blogError } = await supabase
    .from('blogs')
    .insert({
      ...formData,
      author_id: user.id,
      published_at: formData.status === 'published'
        ? (formData.published_at || new Date().toISOString())
        : null,
    })
    .select('id')
    .single()

  if (blogError || !blog) throw new Error(blogError?.message ?? 'Failed to create blog')

  if (sections.length > 0) {
    const { error: secError } = await supabase.from('blog_sections').insert(
      sections.map((s, i) => ({
        blog_id:       blog.id,
        section_order: i + 1,
        type:          s.type,
        heading:       s.heading || null,
        body:          s.body || null,
        image_url:     s.image_url || null,
        image_caption: s.image_caption || null,
        image_alt:     s.image_alt || null,
      }))
    )
    if (secError) throw new Error(secError.message)
  }

  if (tagIds.length > 0) {
    const { error: tagError } = await supabase.from('blog_tags').insert(
      tagIds.map((tag_id) => ({ blog_id: blog.id, tag_id }))
    )
    if (tagError) throw new Error(tagError.message)
  }

  return blog.id
}

// ─── Update existing blog ─────────────────────────────────────────────────────

export async function adminUpdateBlog(
  id: string,
  formData: BlogFormData,
  sections: SectionFormData[],
  tagIds: string[]
) {
  const supabase = getAdminClient()

  const { error: blogError } = await supabase
    .from('blogs')
    .update({
      ...formData,
      published_at: formData.status === 'published'
        ? (formData.published_at || new Date().toISOString())
        : null,
    })
    .eq('id', id)

  if (blogError) throw new Error(blogError.message)

  // Replace sections — delete old, insert fresh
  await supabase.from('blog_sections').delete().eq('blog_id', id)

  if (sections.length > 0) {
    const { error: secError } = await supabase.from('blog_sections').insert(
      sections.map((s, i) => ({
        blog_id:       id,
        section_order: i + 1,
        type:          s.type,
        heading:       s.heading || null,
        body:          s.body || null,
        image_url:     s.image_url || null,
        image_caption: s.image_caption || null,
        image_alt:     s.image_alt || null,
      }))
    )
    if (secError) throw new Error(secError.message)
  }

  // Replace tags
  await supabase.from('blog_tags').delete().eq('blog_id', id)

  if (tagIds.length > 0) {
    const { error: tagError } = await supabase.from('blog_tags').insert(
      tagIds.map((tag_id) => ({ blog_id: id, tag_id }))
    )
    if (tagError) throw new Error(tagError.message)
  }
}

// ─── Archive ──────────────────────────────────────────────────────────────────

export async function adminArchiveBlog(id: string) {
  const supabase = getAdminClient()
  const { error } = await supabase.from('blogs').update({ status: 'archived' }).eq('id', id)
  if (error) throw new Error(error.message)
}

// ─── Delete (sections + tags cascade automatically) ───────────────────────────

export async function adminDeleteBlog(id: string) {
  const supabase = getAdminClient()
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ─── Get all tags ─────────────────────────────────────────────────────────────

export async function adminGetAllTags() {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from('tags').select('id, name, slug, color_hex').order('name')
  if (error) return []
  return data ?? []
}

// ─── Create tag on the fly ────────────────────────────────────────────────────

export async function adminCreateTag(name: string) {
  const supabase = getAdminClient()
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const { data, error } = await supabase
    .from('tags')
    .insert({ name, slug, color_hex: '#2e8b57' })  // seagreen default (was purple)
    .select('id, name, slug, color_hex')
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ─── Upload image ─────────────────────────────────────────────────────────────

export async function uploadBlogImage(file: File, folder: 'covers' | 'sections'): Promise<string> {
  const supabase = getAdminClient()
  const ext  = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from('blog-images')
    .upload(path, file, { upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
  return data.publicUrl
}