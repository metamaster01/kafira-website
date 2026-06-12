'use client'

// app/admin/blogs/page.tsx
// Blog list — status badge, edit / archive / delete per row

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus, Pencil, Archive, Trash2,
  Loader2, AlertCircle, Star,
} from 'lucide-react'
import {
  adminGetAllBlogs, adminArchiveBlog,
  adminDeleteBlog, type AdminBlogRow,
} from '@/lib/admin-blogs'

const STATUS_STYLES: Record<string, { bg: string; color: string; border: string; label: string }> = {
  published: { bg: '#f0faf6', color: '#1a6b3c', border: '#b2dfcb', label: 'Published' },
  draft:     { bg: '#fffbeb', color: '#92400e', border: '#fde68a', label: 'Draft'     },
  archived:  { bg: '#f9fafb', color: '#6b7280', border: '#e5e7eb', label: 'Archived'  },
}

export default function AdminBlogsPage() {
  const [blogs,    setBlogs]    = useState<AdminBlogRow[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirm,  setConfirm]  = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    const data = await adminGetAllBlogs()
    setBlogs(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleArchive(id: string) {
    try {
      await adminArchiveBlog(id)
      setBlogs((prev) => prev.map((b) => b.id === id ? { ...b, status: 'archived' } : b))
    } catch (e: any) { setError(e.message) }
  }

  async function handleDelete(id: string) {
    setDeleting(id)
    try {
      await adminDeleteBlog(id)
      setBlogs((prev) => prev.filter((b) => b.id !== id))
    } catch (e: any) { setError(e.message) }
    finally { setDeleting(null); setConfirm(null) }
  }

  const published = blogs.filter((b) => b.status === 'published').length

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-700 text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-500 font-500">
            {blogs.length} total &middot; {published} published
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-600 text-white transition-opacity hover:opacity-90"
          style={{ background: '#2e8b57' }}
        >
          <Plus className="h-4 w-4" />
          New Blog Post
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-red-600"
          style={{ background: '#fff5f5', borderColor: '#fecaca' }}>
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: '#d4eddf' }}>
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: '#2e8b57' }} />
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-gray-400 mb-4">No blog posts yet</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-600 text-white"
              style={{ background: '#2e8b57' }}
            >
              <Plus className="h-4 w-4" /> Create first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ background: '#f4f9f6', borderColor: '#d4eddf' }}>
                {['Post', 'Status', 'Tags', 'Author', 'Date', ''].map((h, i) => (
                  <th
                    key={i}
                    className={`px-5 py-3.5 text-left text-xs font-600 uppercase tracking-wider text-gray-500
                      ${i === 2 ? 'hidden md:table-cell' : ''}
                      ${i === 3 || i === 4 ? 'hidden lg:table-cell' : ''}
                      ${i === 5 ? 'text-right' : ''}
                    `}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#f0faf6' }}>
              {blogs.map((blog) => {
                const st = STATUS_STYLES[blog.status] ?? STATUS_STYLES.draft
                return (
                  <tr key={blog.id} className="transition-colors hover:bg-[#f9fdfb]">

                    {/* Post info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg"
                          style={{ background: '#e6f5ed' }}>
                          {blog.cover_image_url ? (
                            <Image src={blog.cover_image_url} alt={blog.title}
                              fill className="object-cover" unoptimized />
                          ) : (
                            <div className="absolute inset-0"
                              style={{ background: 'linear-gradient(135deg,#e6f5ed,#b2dfcb)' }} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-600 text-gray-900 truncate max-w-[260px]">
                              {blog.title}
                            </p>
                            {blog.is_featured && (
                              <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[260px]">
                            /blogs/{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className="inline-block rounded-full border px-2.5 py-0.5 text-xs font-600 capitalize"
                        style={{ background: st.bg, color: st.color, borderColor: st.border }}
                      >
                        {st.label}
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {blog.blog_tags.slice(0, 2).map((bt, i) => (
                          <span key={i}
                            className="rounded-full px-2 py-0.5 text-xs font-500"
                            style={{ background: '#e6f5ed', color: '#1a6b3c' }}>
                            {bt.tag?.name}
                          </span>
                        ))}
                        {blog.blog_tags.length > 2 && (
                          <span className="text-xs text-gray-400">+{blog.blog_tags.length - 2}</span>
                        )}
                      </div>
                    </td>

                    {/* Author */}
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-600 font-500">
                      {blog.author?.full_name ?? '—'}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-500">
                      {new Date(blog.published_at ?? blog.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">

                        <Link href={`/admin/blogs/${blog.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-[#2e8b57]"
                          style={{ }} title="Edit"
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#e6f5ed')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>

                        {blog.status !== 'archived' && (
                          <button onClick={() => handleArchive(blog.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                            title="Archive">
                            <Archive className="h-3.5 w-3.5" />
                          </button>
                        )}

                        {confirm === blog.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(blog.id)} disabled={deleting === blog.id}
                              className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-600 text-white hover:bg-red-700 disabled:opacity-60 transition-colors">
                              {deleting === blog.id
                                ? <Loader2 className="h-3 w-3 animate-spin" />
                                : 'Confirm'}
                            </button>
                            <button onClick={() => setConfirm(null)}
                              className="rounded-lg border px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                              style={{ borderColor: '#e2e8f0' }}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirm(blog.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}