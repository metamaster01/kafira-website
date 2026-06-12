'use client'

// app/admin/blogs/_components/BlogForm.tsx
// Shared form — used by /admin/blogs/new AND /admin/blogs/[id]
// Kafira Travels palette: white · seagreen (#2e8b57) · black

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Trash2, GripVertical, Loader2,
  Upload, X, ChevronDown, ChevronUp,
} from 'lucide-react'
import {
  adminCreateBlog, adminUpdateBlog,
  uploadBlogImage, adminCreateTag,
  type BlogFormData, type SectionFormData,
} from '@/lib/admin-blogs'

type Tag = { id: string; name: string; slug: string; color_hex: string }

type Props = {
  mode: 'new' | 'edit'
  blogId?: string
  initialData?: Partial<BlogFormData>
  initialSections?: SectionFormData[]
  initialTagIds?: string[]
  allTags: Tag[]
}

const SECTION_TYPES = [
  { value: 'text',       label: 'Text only'     },
  { value: 'image',      label: 'Image only'    },
  { value: 'text_image', label: 'Text + Image'  },
  { value: 'quote',      label: 'Quote'         },
  { value: 'callout',    label: 'Callout / CTA' },
]

const EMPTY_SECTION: SectionFormData = {
  section_order: 1,
  type: 'text',
  heading: '',
  body: '',
  image_url: '',
  image_caption: '',
  image_alt: '',
}

const EMPTY_FORM: BlogFormData = {
  slug: '',
  title: '',
  description: '',
  cover_image_url: '',
  status: 'draft',
  is_featured: false,
  read_time_minutes: null,
  published_at: null,
  seo_title: '',
  seo_description: '',
}

export default function BlogForm({
  mode, blogId,
  initialData = {},
  initialSections = [],
  initialTagIds = [],
  allTags,
}: Props) {
  const router = useRouter()

  const [form,     setForm]     = useState<BlogFormData>({ ...EMPTY_FORM, ...initialData })
  const [sections, setSections] = useState<SectionFormData[]>(
    initialSections.length > 0 ? initialSections : [{ ...EMPTY_SECTION }]
  )
  const [tagIds,    setTagIds]    = useState<string[]>(initialTagIds)
  const [tags,      setTags]      = useState<Tag[]>(allTags)
  const [newTag,    setNewTag]    = useState('')
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)

  function setField<K extends keyof BlogFormData>(key: K, value: BlogFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function autoSlug(title: string) {
    return title.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
  }

  function addSection() {
    setSections((prev) => [...prev, { ...EMPTY_SECTION, section_order: prev.length + 1 }])
  }

  function removeSection(index: number) {
    setSections((prev) => prev.filter((_, i) => i !== index))
  }

  function updateSection(index: number, key: keyof SectionFormData, value: any) {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)))
  }

  function moveSection(index: number, direction: 'up' | 'down') {
    setSections((prev) => {
      const next = [...prev]
      const swap = direction === 'up' ? index - 1 : index + 1
      if (swap < 0 || swap >= next.length) return prev
      ;[next[index], next[swap]] = [next[swap], next[index]]
      return next
    })
  }

  function toggleTag(id: string) {
    setTagIds((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])
  }

  async function handleCreateTag() {
    if (!newTag.trim()) return
    try {
      const tag = await adminCreateTag(newTag.trim())
      setTags((prev) => [...prev, tag])
      setTagIds((prev) => [...prev, tag.id])
      setNewTag('')
    } catch (e: any) { setError(e.message) }
  }

  async function handleImageUpload(
    file: File,
    folder: 'covers' | 'sections',
    onSuccess: (url: string) => void,
    uploadKey: string
  ) {
    setUploading(uploadKey)
    try {
      const url = await uploadBlogImage(file, folder)
      onSuccess(url)
    } catch (e: any) {
      setError(`Image upload failed: ${e.message}`)
    } finally {
      setUploading(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (mode === 'new') {
        await adminCreateBlog(form, sections, tagIds)
      } else if (blogId) {
        await adminUpdateBlog(blogId, form, sections, tagIds)
      }
      router.push('/admin/blogs')
      router.refresh()
    } catch (e: any) {
      setError(e.message)
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 space-y-8">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-700 text-gray-900">
            {mode === 'new' ? 'New Blog Post' : 'Edit Blog Post'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {mode === 'new' ? 'Fill in the details and publish' : 'Update and save your changes'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()}
            className="rounded-xl border px-4 py-2.5 text-sm font-600 text-gray-600 hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#d4eddf' }}>
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-600 text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: '#2e8b57' }}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? 'Saving…' : mode === 'new' ? 'Publish' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border px-4 py-3 text-sm text-red-600"
          style={{ background: '#fff5f5', borderColor: '#fecaca' }}>
          {error}
        </div>
      )}

      {/* ── Post Details ── */}
      <Card title="Post Details">
        <div className="grid gap-5">

          <Field label="Title" required>
            <input type="text" required value={form.title}
              onChange={(e) => {
                setField('title', e.target.value)
                if (mode === 'new') setField('slug', autoSlug(e.target.value))
              }}
              placeholder="Hidden Gems of South India"
              className={inputCls} />
          </Field>

          <Field label="Slug" hint="Auto-generated from title">
            <div className="flex items-center rounded-xl border overflow-hidden transition"
              style={{ borderColor: '#d4eddf', background: '#f9fdfb' }}>
              <span className="px-3 text-sm text-gray-400 shrink-0">/blogs/</span>
              <input type="text" value={form.slug}
                onChange={(e) => setField('slug', e.target.value)}
                placeholder="hidden-gems-south-india"
                className="flex-1 bg-transparent py-3 pr-4 text-sm text-gray-900 outline-none" />
            </div>
          </Field>

          <Field label="Description" hint="Shown on blog cards and as OG description">
            <textarea rows={3} value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              placeholder="A short summary of this article…"
              className={`${inputCls} resize-none`} />
          </Field>

          <Field label="Cover Image">
            <div className="space-y-2">
              <input type="url" value={form.cover_image_url}
                onChange={(e) => setField('cover_image_url', e.target.value)}
                placeholder="https://… or upload below"
                className={inputCls} />
              <label className="flex items-center gap-2 w-fit cursor-pointer rounded-lg border border-dashed px-4 py-2 text-sm text-gray-500 transition-colors hover:text-[#2e8b57]"
                style={{ borderColor: '#b2dfcb' }}>
                {uploading === 'cover'
                  ? <Loader2 className="h-4 w-4 animate-spin" style={{ color: '#2e8b57' }} />
                  : <Upload className="h-4 w-4" />
                }
                Upload from device
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file, 'covers', (url) => setField('cover_image_url', url), 'cover')
                  }} />
              </label>
            </div>
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Status">
              <select value={form.status}
                onChange={(e) => setField('status', e.target.value as any)}
                className={inputCls}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </Field>

            <Field label="Read Time (min)">
              <input type="number" min={1} max={60}
                value={form.read_time_minutes ?? ''}
                onChange={(e) => setField('read_time_minutes', e.target.value ? Number(e.target.value) : null)}
                placeholder="5" className={inputCls} />
            </Field>

            <Field label="Featured">
              <div className="flex items-center h-full pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured}
                    onChange={(e) => setField('is_featured', e.target.checked)}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: '#2e8b57' }} />
                  <span className="text-sm text-gray-700 font-500">Mark as featured</span>
                </label>
              </div>
            </Field>
          </div>
        </div>
      </Card>

      {/* ── Tags ── */}
      <Card title="Tags">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => {
            const selected = tagIds.includes(tag.id)
            return (
              <button key={tag.id} type="button" onClick={() => toggleTag(tag.id)}
                className="rounded-full border px-3 py-1 text-xs font-600 transition-all"
                style={selected
                  ? { background: '#2e8b57', borderColor: '#2e8b57', color: '#fff' }
                  : { borderColor: '#d4eddf', color: '#4b5563' }
                }>
                {tag.name}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleCreateTag() } }}
            placeholder="Create new tag…" className={`flex-1 ${inputCls}`} />
          <button type="button" onClick={handleCreateTag}
            className="rounded-xl border px-3 py-2 text-sm font-600 transition-colors hover:text-[#2e8b57]"
            style={{ borderColor: '#d4eddf', color: '#6b7280' }}>
            + Add
          </button>
        </div>
      </Card>

      {/* ── Content Sections ── */}
      <Card title="Content Sections">
        <div className="space-y-5">
          {sections.map((section, index) => (
            <SectionEditor
              key={index}
              index={index}
              section={section}
              total={sections.length}
              uploading={uploading}
              onChange={(key, val) => updateSection(index, key, val)}
              onRemove={() => removeSection(index)}
              onMove={(dir) => moveSection(index, dir)}
              onImageUpload={(file, onSuccess) =>
                handleImageUpload(file, 'sections', onSuccess, `section-${index}`)
              }
            />
          ))}
          <button type="button" onClick={addSection}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm font-600 text-gray-400 transition-colors hover:text-[#2e8b57]"
            style={{ borderColor: '#b2dfcb' }}>
            <Plus className="h-4 w-4" />
            Add Section
          </button>
        </div>
      </Card>

      {/* ── SEO ── */}
      <Card title="SEO" hint="Optional — overrides title and description in search results">
        <div className="grid gap-5">
          <Field label="SEO Title" hint="60 chars max">
            <input type="text" maxLength={60} value={form.seo_title}
              onChange={(e) => setField('seo_title', e.target.value)}
              placeholder="Leave blank to use post title" className={inputCls} />
          </Field>
          <Field label="SEO Description" hint="155 chars max">
            <textarea rows={2} maxLength={155} value={form.seo_description}
              onChange={(e) => setField('seo_description', e.target.value)}
              placeholder="Leave blank to use post description"
              className={`${inputCls} resize-none`} />
          </Field>
        </div>
      </Card>

      {/* Bottom save */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={() => router.back()}
          className="rounded-xl border px-5 py-2.5 text-sm font-600 text-gray-600 hover:bg-gray-50 transition-colors"
          style={{ borderColor: '#d4eddf' }}>
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-600 text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: '#2e8b57' }}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Saving…' : mode === 'new' ? 'Create Post' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

// ── Section Editor ────────────────────────────────────────────────────────────

function SectionEditor({ index, section, total, uploading, onChange, onRemove, onMove, onImageUpload }: {
  index: number
  section: SectionFormData
  total: number
  uploading: string | null
  onChange: (key: keyof SectionFormData, val: any) => void
  onRemove: () => void
  onMove: (dir: 'up' | 'down') => void
  onImageUpload: (file: File, onSuccess: (url: string) => void) => void
}) {
  const showImage = ['image', 'text_image'].includes(section.type)
  const showBody  = ['text', 'text_image', 'quote', 'callout'].includes(section.type)

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#d4eddf' }}>
      {/* Section header bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ background: '#f4f9f6', borderColor: '#d4eddf' }}>
        <GripVertical className="h-4 w-4 text-gray-300 shrink-0" />
        <span className="text-xs font-700 uppercase tracking-wide text-gray-400">
          Section {index + 1}
        </span>

        <select value={section.type} onChange={(e) => onChange('type', e.target.value)}
          className="ml-2 rounded-lg border px-2.5 py-1.5 text-xs text-gray-700 outline-none"
          style={{ borderColor: '#d4eddf', background: '#fff' }}>
          {SECTION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={() => onMove('up')} disabled={index === 0}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-white disabled:opacity-30">
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => onMove('down')} disabled={index === total - 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-white disabled:opacity-30">
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={onRemove}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="p-4 space-y-4 bg-white">
        {section.type !== 'image' && (
          <input type="text" value={section.heading}
            onChange={(e) => onChange('heading', e.target.value)}
            placeholder={section.type === 'quote' ? 'Attribution / source (optional)' : 'Section heading (optional)'}
            className={inputCls} />
        )}

        {showBody && (
          <textarea
            rows={section.type === 'callout' ? 4 : 8}
            value={section.body}
            onChange={(e) => onChange('body', e.target.value)}
            placeholder={
              section.type === 'quote'
                ? 'Quote text…'
                : section.type === 'callout'
                ? 'Callout message — supports **markdown**'
                : 'Write your content here. Markdown is supported.\n\n**Bold**, *italic*, ## Headings, - Lists, `code`…'
            }
            className={`${inputCls} resize-y font-mono text-xs`}
          />
        )}

        {showImage && (
          <div className="space-y-2">
            <input type="url" value={section.image_url}
              onChange={(e) => onChange('image_url', e.target.value)}
              placeholder="Image URL or upload below" className={inputCls} />
            <label className="flex items-center gap-2 w-fit cursor-pointer rounded-lg border border-dashed px-3 py-1.5 text-xs text-gray-500 transition-colors hover:text-[#2e8b57]"
              style={{ borderColor: '#b2dfcb' }}>
              {uploading === `section-${index}`
                ? <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: '#2e8b57' }} />
                : <Upload className="h-3.5 w-3.5" />
              }
              Upload image
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onImageUpload(file, (url) => onChange('image_url', url))
                }} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" value={section.image_alt}
                onChange={(e) => onChange('image_alt', e.target.value)}
                placeholder="Alt text (accessibility)" className={inputCls} />
              <input type="text" value={section.image_caption}
                onChange={(e) => onChange('image_caption', e.target.value)}
                placeholder="Caption (optional)" className={inputCls} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Shared UI primitives ──────────────────────────────────────────────────────

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: '#d4eddf' }}>
      <div className="border-b px-6 py-4" style={{ background: '#f4f9f6', borderColor: '#d4eddf' }}>
        <h2 className="text-sm font-700 text-gray-900">{title}</h2>
        {hint && <p className="mt-0.5 text-xs text-gray-400">{hint}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

function Field({ label, hint, required, children }: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-600 text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {hint && <span className="ml-1.5 text-xs font-400 text-gray-400">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2'
  + ' [border-color:#d4eddf] [background:#f9fdfb] focus:[border-color:#2e8b57] focus:[ring-color:rgba(46,139,87,0.12)]'