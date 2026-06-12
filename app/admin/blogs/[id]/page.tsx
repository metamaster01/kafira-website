// app/admin/blogs/[id]/page.tsx
// Server component — prefetches blog data + tags, renders BlogForm in "edit" mode

import { notFound } from 'next/navigation'
import { adminGetBlogById, adminGetAllTags } from '@/lib/admin-blogs'
import BlogForm from '../_components/BlogForm'

export const metadata = { title: 'Edit Blog Post | Kafira Admin' }

type Props = { params: Promise<{ id: string }> }

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params
  const [result, allTags] = await Promise.all([
    adminGetBlogById(id),
    adminGetAllTags(),
  ])

  if (!result) notFound()

  const { blog, sections, tags } = result

  return (
    <BlogForm
      mode="edit"
      blogId={id}
      allTags={allTags}
      initialTagIds={tags.map((t: any) => t.id)}
      initialData={{
        slug:              blog.slug,
        title:             blog.title,
        description:       blog.description ?? '',
        cover_image_url:   blog.cover_image_url ?? '',
        status:            blog.status,
        is_featured:       blog.is_featured,
        read_time_minutes: blog.read_time_minutes,
        published_at:      blog.published_at,
        seo_title:         blog.seo_title ?? '',
        seo_description:   blog.seo_description ?? '',
      }}
      initialSections={sections.map((s: any) => ({
        id:            s.id,
        section_order: s.section_order,
        type:          s.type,
        heading:       s.heading ?? '',
        body:          s.body ?? '',
        image_url:     s.image_url ?? '',
        image_caption: s.image_caption ?? '',
        image_alt:     s.image_alt ?? '',
      }))}
    />
  )
}