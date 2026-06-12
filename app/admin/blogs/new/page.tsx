// app/admin/blogs/new/page.tsx
// Server component — loads all tags, renders BlogForm in "new" mode

import { adminGetAllTags } from '@/lib/admin-blogs'
import BlogForm from '../_components/BlogForm'

export const metadata = { title: 'New Blog Post | Kafira Admin' }

export default async function NewBlogPage() {
  const allTags = await adminGetAllTags()
  return <BlogForm mode="new" allTags={allTags} />
}