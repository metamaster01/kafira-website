'use client'

// app/admin/blogs/page.tsx

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Archive, Trash2, Loader2, AlertCircle, Star } from 'lucide-react'
import { adminGetAllBlogs, adminArchiveBlog, adminDeleteBlog, type AdminBlogRow } from '@/lib/admin-blogs'

const SEA    = '#2d8f7b'
const SEA_BG = 'rgba(45,143,123,0.08)'
const SEA_BD = 'rgba(45,143,123,0.18)'
const TEXT   = '#0f2720'
const SUB    = '#2d5a52'
const MUTED  = '#6b9e94'

const STATUS: Record<string, { bg: string; color: string; border: string; label: string }> = {
  published: { bg: 'rgba(45,143,123,0.10)', color: '#1a6b58', border: 'rgba(45,143,123,0.28)', label: 'Published' },
  draft:     { bg: '#fffbeb',               color: '#92400e', border: '#fde68a',                label: 'Draft'     },
  archived:  { bg: '#f9fafb',               color: '#6b7280', border: '#e5e7eb',                label: 'Archived'  },
}

export default function AdminBlogsPage() {
  const [blogs,    setBlogs]    = useState<AdminBlogRow[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirm,  setConfirm]  = useState<string | null>(null)

  async function load() {
    setLoading(true); setError(null)
    setBlogs(await adminGetAllBlogs())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function handleArchive(id: string) {
    try {
      await adminArchiveBlog(id)
      setBlogs((p) => p.map((b) => b.id === id ? { ...b, status: 'archived' as const } : b))
    } catch (e: any) { setError(e.message) }
  }

  async function handleDelete(id: string) {
    setDeleting(id)
    try {
      await adminDeleteBlog(id)
      setBlogs((p) => p.filter((b) => b.id !== id))
    } catch (e: any) { setError(e.message) }
    finally { setDeleting(null); setConfirm(null) }
  }

  const published = blogs.filter((b) => b.status === 'published').length

  return (
    <main style={{ padding: 'clamp(24px,4vw,40px)', fontFamily: '"Outfit", sans-serif', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        .blog-row { transition: background 0.15s; }
        .blog-row:hover { background: #f4f9f6 !important; }
        .action-btn { transition: background 0.15s, color 0.15s; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: 'clamp(22px,3vw,30px)', color: TEXT, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Blog Posts
          </h1>
          <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 500, color: MUTED, margin: 0 }}>
            {blogs.length} total · {published} published
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: SEA, color: '#fff',
            borderRadius: 14, padding: '11px 20px',
            fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 700,
            textDecoration: 'none', flexShrink: 0,
            boxShadow: '0 4px 14px rgba(45,143,123,0.28)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <Plus size={15} /> New Blog Post
        </Link>
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#fff5f5', border: '1px solid #fecaca',
          borderRadius: 14, padding: '12px 16px', marginBottom: 24,
          fontFamily: '"Outfit", sans-serif', fontSize: 13, color: '#dc2626',
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} /> {error}
        </div>
      )}

      {/* ── Table card ── */}
      <div style={{
        background: '#fff', borderRadius: 20,
        border: `1px solid ${SEA_BD}`,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(15,39,32,0.05)',
      }}>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
            <Loader2 size={24} style={{ color: SEA, animation: 'spin 1s linear infinite' }} />
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: 14, color: MUTED, marginBottom: 20 }}>No blog posts yet</p>
            <Link href="/admin/blogs/new" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: SEA, color: '#fff', borderRadius: 12, padding: '10px 20px',
              fontFamily: '"Outfit", sans-serif', fontSize: 13, fontWeight: 700, textDecoration: 'none',
            }}>
              <Plus size={14} /> Create first post
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f4f9f6', borderBottom: `1px solid ${SEA_BD}` }}>
                {['Post', 'Status', 'Tags', 'Author', 'Date', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '13px 16px', textAlign: i === 5 ? 'right' : 'left',
                    fontFamily: '"Outfit", sans-serif', fontSize: 10, fontWeight: 700,
                    color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase',
                    display: i === 2 ? undefined : i === 3 || i === 4 ? undefined : undefined,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, idx) => {
                const st = STATUS[blog.status] ?? STATUS.draft
                return (
                  <tr
                    key={blog.id}
                    className="blog-row"
                    style={{ borderBottom: idx < blogs.length - 1 ? `1px solid ${SEA_BG}` : 'none', background: '#fff' }}
                  >
                    {/* Post info */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          position: 'relative', width: 64, height: 44,
                          borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                          background: SEA_BG,
                        }}>
                          {blog.cover_image_url ? (
                            <Image src={blog.cover_image_url} alt={blog.title} fill unoptimized style={{ objectFit: 'cover' }} />
                          ) : (
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(45,143,123,0.2),rgba(45,143,123,0.05))' }} />
                          )}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <p style={{
                              fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: 13,
                              color: TEXT, margin: 0,
                              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 260,
                            }}>
                              {blog.title}
                            </p>
                            {blog.is_featured && <Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b', flexShrink: 0 }} />}
                          </div>
                          <p style={{
                            fontFamily: '"Outfit", sans-serif', fontSize: 11, color: MUTED, margin: '3px 0 0',
                            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 260,
                          }}>
                            /blogs/{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        display: 'inline-block', borderRadius: 999,
                        border: `1px solid ${st.border}`,
                        background: st.bg, color: st.color,
                        padding: '3px 12px',
                        fontFamily: '"Outfit", sans-serif', fontSize: 11, fontWeight: 700,
                      }}>
                        {st.label}
                      </span>
                    </td>

                    {/* Tags */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {blog.blog_tags.slice(0, 2).map((bt, i) => (
                          <span key={i} style={{
                            background: SEA_BG, borderRadius: 999,
                            padding: '2px 10px',
                            fontFamily: '"Outfit", sans-serif', fontSize: 11, fontWeight: 600, color: SUB,
                          }}>
                            {bt.tag?.name}
                          </span>
                        ))}
                        {blog.blog_tags.length > 2 && (
                          <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: 11, color: MUTED }}>
                            +{blog.blog_tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Author */}
                    <td style={{ padding: '14px 16px', fontFamily: '"Outfit", sans-serif', fontSize: 13, color: SUB, fontWeight: 500 }}>
                      {blog.author?.full_name ?? '—'}
                    </td>

                    {/* Date */}
                    <td style={{ padding: '14px 16px', fontFamily: '"Outfit", sans-serif', fontSize: 12, color: MUTED }}>
                      {new Date(blog.published_at ?? blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>

                        <Link href={`/admin/blogs/${blog.id}`} title="Edit"
                          className="action-btn"
                          style={{
                            width: 32, height: 32, borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: MUTED, textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = SEA_BG; e.currentTarget.style.color = SEA }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MUTED }}
                        >
                          <Pencil size={14} />
                        </Link>

                        {blog.status !== 'archived' && (
                          <button onClick={() => handleArchive(blog.id)} title="Archive"
                            className="action-btn"
                            style={{
                              width: 32, height: 32, borderRadius: 10, border: 'none',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: 'transparent', color: MUTED, cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#fffbeb'; e.currentTarget.style.color = '#d97706' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MUTED }}
                          >
                            <Archive size={14} />
                          </button>
                        )}

                        {confirm === blog.id ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <button onClick={() => handleDelete(blog.id)} disabled={deleting === blog.id}
                              style={{
                                borderRadius: 8, border: 'none', background: '#dc2626', color: '#fff',
                                padding: '5px 12px', cursor: 'pointer',
                                fontFamily: '"Outfit", sans-serif', fontSize: 11, fontWeight: 700,
                                opacity: deleting === blog.id ? 0.6 : 1,
                                display: 'flex', alignItems: 'center', gap: 4,
                              }}>
                              {deleting === blog.id ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : 'Confirm'}
                            </button>
                            <button onClick={() => setConfirm(null)}
                              style={{
                                borderRadius: 8, border: `1px solid ${SEA_BD}`, background: '#fff',
                                color: MUTED, padding: '5px 12px', cursor: 'pointer',
                                fontFamily: '"Outfit", sans-serif', fontSize: 11, fontWeight: 600,
                              }}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirm(blog.id)} title="Delete"
                            className="action-btn"
                            style={{
                              width: 32, height: 32, borderRadius: 10, border: 'none',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: 'transparent', color: MUTED, cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,38,38,0.08)'; e.currentTarget.style.color = '#dc2626' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MUTED }}
                          >
                            <Trash2 size={14} />
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
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </main>
  )
}