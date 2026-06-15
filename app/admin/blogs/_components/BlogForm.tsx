'use client'

// app/admin/blogs/_components/BlogForm.tsx

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, GripVertical, Loader2, Upload, X, ChevronDown, ChevronUp } from 'lucide-react'
import { adminCreateBlog, adminUpdateBlog, uploadBlogImage, adminCreateTag, type BlogFormData, type SectionFormData } from '@/lib/admin-blogs'

const SEA    = '#2d8f7b'
const SEA_BG = 'rgba(45,143,123,0.08)'
const SEA_BD = 'rgba(45,143,123,0.20)'
const TEXT   = '#0f2720'
const SUB    = '#2d5a52'
const MUTED  = '#6b9e94'

type Tag  = { id: string; name: string; slug: string; color_hex: string }
type Props = {
  mode: 'new' | 'edit'
  blogId?: string
  initialData?: Partial<BlogFormData>
  initialSections?: SectionFormData[]
  initialTagIds?: string[]
  allTags: Tag[]
}

const SECTION_TYPES = [
  { value: 'text',       label: 'Text only'    },
  { value: 'image',      label: 'Image only'   },
  { value: 'text_image', label: 'Text + Image' },
  { value: 'quote',      label: 'Quote'        },
  { value: 'callout',    label: 'Callout / CTA'},
]

const EMPTY_SECTION: SectionFormData = { section_order:1, type:'text', heading:'', body:'', image_url:'', image_caption:'', image_alt:'' }
const EMPTY_FORM: BlogFormData = { slug:'', title:'', description:'', cover_image_url:'', status:'draft', is_featured:false, read_time_minutes:null, published_at:null, seo_title:'', seo_description:'' }

// Shared input style
const inp: React.CSSProperties = {
  width:'100%', boxSizing:'border-box',
  border:`1.5px solid ${SEA_BD}`, borderRadius:12,
  background:'#f7faf9', padding:'12px 14px',
  fontFamily:'"Outfit",sans-serif', fontSize:13, color:TEXT,
  outline:'none', transition:'border-color 0.2s, box-shadow 0.2s',
}

function InputEl(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ ...inp, ...(props.style ?? {}) }}
      onFocus={(e) => { e.target.style.borderColor=SEA; e.target.style.boxShadow='0 0 0 3px rgba(45,143,123,0.10)'; props.onFocus?.(e) }}
      onBlur={(e)  => { e.target.style.borderColor=SEA_BD; e.target.style.boxShadow='none'; props.onBlur?.(e) }}
    />
  )
}
function TextareaEl(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ ...inp, resize:'vertical', ...(props.style ?? {}) }}
      onFocus={(e) => { e.target.style.borderColor=SEA; e.target.style.boxShadow='0 0 0 3px rgba(45,143,123,0.10)' }}
      onBlur={(e)  => { e.target.style.borderColor=SEA_BD; e.target.style.boxShadow='none' }}
    />
  )
}
function SelectEl(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{ ...inp, ...(props.style ?? {}) }}
      onFocus={(e) => { e.target.style.borderColor=SEA; e.target.style.boxShadow='0 0 0 3px rgba(45,143,123,0.10)' }}
      onBlur={(e)  => { e.target.style.borderColor=SEA_BD; e.target.style.boxShadow='none' }}
    />
  )
}

function Card({ title, hint, children }: { title:string; hint?:string; children:React.ReactNode }) {
  return (
    <div style={{ background:'#fff', borderRadius:20, border:`1px solid ${SEA_BD}`, overflow:'hidden', boxShadow:'0 4px 20px rgba(15,39,32,0.04)' }}>
      <div style={{ borderBottom:`1px solid ${SEA_BD}`, padding:'16px 24px', background:'#f7faf9' }}>
        <p style={{ fontFamily:'"Outfit",sans-serif', fontSize:13, fontWeight:700, color:TEXT, margin:0 }}>{title}</p>
        {hint && <p style={{ fontFamily:'"Outfit",sans-serif', fontSize:11, color:MUTED, margin:'3px 0 0' }}>{hint}</p>}
      </div>
      <div style={{ padding:'20px 24px' }}>{children}</div>
    </div>
  )
}

function Field({ label, hint, required, children }: { label:string; hint?:string; required?:boolean; children:React.ReactNode }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
      <label style={{ fontFamily:'"Outfit",sans-serif', fontSize:12, fontWeight:700, color:SUB, letterSpacing:'0.03em' }}>
        {label}{required && <span style={{ color:'#dc2626', marginLeft:2 }}>*</span>}
        {hint && <span style={{ fontWeight:400, color:MUTED, marginLeft:8, fontSize:11 }}>{hint}</span>}
      </label>
      {children}
    </div>
  )
}

export default function BlogForm({ mode, blogId, initialData={}, initialSections=[], initialTagIds=[], allTags }: Props) {
  const router = useRouter()
  const [form,     setForm]     = useState<BlogFormData>({ ...EMPTY_FORM, ...initialData })
  const [sections, setSections] = useState<SectionFormData[]>(initialSections.length>0 ? initialSections : [{ ...EMPTY_SECTION }])
  const [tagIds,   setTagIds]   = useState<string[]>(initialTagIds)
  const [tags,     setTags]     = useState<Tag[]>(allTags)
  const [newTag,   setNewTag]   = useState('')
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState<string|null>(null)
  const [uploading,setUploading]= useState<string|null>(null)

  const setField = <K extends keyof BlogFormData>(k:K, v:BlogFormData[K]) => setForm(p=>({...p,[k]:v}))
  const autoSlug = (t:string) => t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-')
  const addSection = () => setSections(p=>[...p,{...EMPTY_SECTION,section_order:p.length+1}])
  const removeSection = (i:number) => setSections(p=>p.filter((_,idx)=>idx!==i))
  const updateSection = (i:number, k:keyof SectionFormData, v:any) => setSections(p=>p.map((s,idx)=>idx===i?{...s,[k]:v}:s))
  const moveSection = (i:number, dir:'up'|'down') => setSections(p=>{ const n=[...p]; const sw=dir==='up'?i-1:i+1; if(sw<0||sw>=n.length)return p; [n[i],n[sw]]=[n[sw],n[i]]; return n })
  const toggleTag = (id:string) => setTagIds(p=>p.includes(id)?p.filter(t=>t!==id):[...p,id])

  async function handleCreateTag() {
    if(!newTag.trim())return
    try { const t=await adminCreateTag(newTag.trim()); setTags(p=>[...p,t]); setTagIds(p=>[...p,t.id]); setNewTag('') }
    catch(e:any){ setError(e.message) }
  }

  async function handleImageUpload(file:File, folder:'covers'|'sections', onSuccess:(url:string)=>void, key:string) {
    setUploading(key)
    try { onSuccess(await uploadBlogImage(file,folder)) }
    catch(e:any){ setError(`Upload failed: ${e.message}`) }
    finally{ setUploading(null) }
  }

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault(); setSaving(true); setError(null)
    try {
      if(mode==='new') await adminCreateBlog(form,sections,tagIds)
      else if(blogId) await adminUpdateBlog(blogId,form,sections,tagIds)
      router.push('/admin/blogs'); router.refresh()
    } catch(e:any){ setError(e.message); setSaving(false) }
  }

  const btnPrimary: React.CSSProperties = {
    display:'inline-flex', alignItems:'center', gap:8,
    background:SEA, color:'#fff', border:'none', borderRadius:14,
    padding:'12px 22px', fontFamily:'"Outfit",sans-serif', fontSize:13, fontWeight:700,
    cursor:'pointer', transition:'opacity 0.2s',
  }
  const btnSecondary: React.CSSProperties = {
    display:'inline-flex', alignItems:'center', gap:8,
    background:'#fff', color:SUB, border:`1.5px solid ${SEA_BD}`, borderRadius:14,
    padding:'12px 22px', fontFamily:'"Outfit",sans-serif', fontSize:13, fontWeight:600,
    cursor:'pointer', transition:'background 0.15s',
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth:860, margin:'0 auto', padding:'clamp(24px,4vw,40px)', display:'flex', flexDirection:'column', gap:24, fontFamily:'"Outfit",sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* Page header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
        <div>
          <h1 style={{ fontFamily:'"Outfit",sans-serif', fontWeight:800, fontSize:'clamp(20px,3vw,28px)', color:TEXT, margin:'0 0 6px', letterSpacing:'-0.02em' }}>
            {mode==='new'?'New Blog Post':'Edit Blog Post'}
          </h1>
          <p style={{ fontFamily:'"Outfit",sans-serif', fontSize:13, color:MUTED, margin:0 }}>
            {mode==='new'?'Fill in the details and publish':'Update and save your changes'}
          </p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button type="button" onClick={()=>router.back()} style={btnSecondary}
            onMouseEnter={(e)=>(e.currentTarget.style.background=SEA_BG)}
            onMouseLeave={(e)=>(e.currentTarget.style.background='#fff')}>
            Cancel
          </button>
          <button type="submit" disabled={saving} style={{ ...btnPrimary, opacity:saving?0.7:1, cursor:saving?'not-allowed':'pointer' }}
            onMouseEnter={(e)=>{ if(!saving) e.currentTarget.style.opacity='0.88' }}
            onMouseLeave={(e)=>{ e.currentTarget.style.opacity=saving?'0.7':'1' }}>
            {saving && <Loader2 size={14} style={{ animation:'spin 1s linear infinite' }} />}
            {saving?'Saving…':mode==='new'?'Publish':'Save Changes'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background:'#fff5f5', border:'1px solid #fecaca', borderRadius:14, padding:'12px 16px', fontFamily:'"Outfit",sans-serif', fontSize:13, color:'#dc2626' }}>
          {error}
        </div>
      )}

      {/* ── Post Details ── */}
      <Card title="Post Details">
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

          <Field label="Title" required>
            <InputEl type="text" required value={form.title} placeholder="Hidden Gems of South India"
              onChange={(e)=>{ setField('title',e.target.value); if(mode==='new') setField('slug',autoSlug(e.target.value)) }} />
          </Field>

          <Field label="Slug" hint="Auto-generated from title">
            <div style={{ display:'flex', alignItems:'center', border:`1.5px solid ${SEA_BD}`, borderRadius:12, background:'#f7faf9', overflow:'hidden' }}>
              <span style={{ padding:'12px 12px', fontFamily:'"Outfit",sans-serif', fontSize:12, color:MUTED, flexShrink:0 }}>/blogs/</span>
              <input type="text" value={form.slug} onChange={(e)=>setField('slug',e.target.value)}
                placeholder="hidden-gems-south-india"
                style={{ flex:1, border:'none', background:'transparent', padding:'12px 12px 12px 0', fontFamily:'"Outfit",sans-serif', fontSize:13, color:TEXT, outline:'none' }} />
            </div>
          </Field>

          <Field label="Description" hint="Shown on blog cards">
            <TextareaEl rows={3} value={form.description} placeholder="A short summary of this article…"
              onChange={(e)=>setField('description',e.target.value)} />
          </Field>

          <Field label="Cover Image">
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <InputEl type="url" value={form.cover_image_url} placeholder="https://… or upload below"
                onChange={(e)=>setField('cover_image_url',e.target.value)} />
              <label style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer', border:`1.5px dashed ${SEA_BD}`, borderRadius:10, padding:'9px 16px', width:'fit-content', fontFamily:'"Outfit",sans-serif', fontSize:12, fontWeight:600, color:MUTED, transition:'color 0.15s, border-color 0.15s' }}
                onMouseEnter={(e)=>{ e.currentTarget.style.color=SEA; e.currentTarget.style.borderColor=SEA }}
                onMouseLeave={(e)=>{ e.currentTarget.style.color=MUTED; e.currentTarget.style.borderColor=SEA_BD }}>
                {uploading==='cover' ? <Loader2 size={14} style={{ color:SEA, animation:'spin 1s linear infinite' }} /> : <Upload size={14} />}
                Upload from device
                <input type="file" accept="image/*" style={{ display:'none' }}
                  onChange={(e)=>{ const f=e.target.files?.[0]; if(f) handleImageUpload(f,'covers',(url)=>setField('cover_image_url',url),'cover') }} />
              </label>
            </div>
          </Field>

          {/* Status / Read time / Featured row */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
            <Field label="Status">
              <SelectEl value={form.status} onChange={(e)=>setField('status',e.target.value as any)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </SelectEl>
            </Field>
            <Field label="Read Time (min)">
              <InputEl type="number" min={1} max={60} value={form.read_time_minutes??''} placeholder="5"
                onChange={(e)=>setField('read_time_minutes',e.target.value?Number(e.target.value):null)} />
            </Field>
            <Field label="Featured">
              <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', paddingTop:10 }}>
                <input type="checkbox" checked={form.is_featured} onChange={(e)=>setField('is_featured',e.target.checked)}
                  style={{ width:16, height:16, accentColor:SEA, cursor:'pointer' }} />
                <span style={{ fontFamily:'"Outfit",sans-serif', fontSize:13, fontWeight:500, color:SUB }}>Mark as featured</span>
              </label>
            </Field>
          </div>
        </div>
      </Card>

      {/* ── Tags ── */}
      <Card title="Tags">
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
          {tags.map((tag)=>{
            const sel=tagIds.includes(tag.id)
            return (
              <button key={tag.id} type="button" onClick={()=>toggleTag(tag.id)}
                style={{
                  borderRadius:999, border:`1.5px solid ${sel?SEA:SEA_BD}`,
                  background:sel?SEA:SEA_BG, color:sel?'#fff':SUB,
                  padding:'5px 14px', fontFamily:'"Outfit",sans-serif', fontSize:12, fontWeight:600,
                  cursor:'pointer', transition:'all 0.15s',
                }}>
                {tag.name}
              </button>
            )
          })}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <InputEl type="text" value={newTag} placeholder="Create new tag…"
            onChange={(e)=>setNewTag(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==='Enter'){e.preventDefault();handleCreateTag()} }}
            style={{ flex:1 }} />
          <button type="button" onClick={handleCreateTag}
            style={{ border:`1.5px solid ${SEA_BD}`, borderRadius:12, background:'#fff', padding:'0 18px', fontFamily:'"Outfit",sans-serif', fontSize:13, fontWeight:600, color:SUB, cursor:'pointer', flexShrink:0, transition:'background 0.15s, color 0.15s' }}
            onMouseEnter={(e)=>{ e.currentTarget.style.background=SEA_BG; e.currentTarget.style.color=SEA }}
            onMouseLeave={(e)=>{ e.currentTarget.style.background='#fff'; e.currentTarget.style.color=SUB }}>
            + Add
          </button>
        </div>
      </Card>

      {/* ── Content Sections ── */}
      <Card title="Content Sections">
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {sections.map((section,index)=>(
            <SectionEditor key={index} index={index} section={section} total={sections.length}
              uploading={uploading}
              onChange={(k,v)=>updateSection(index,k,v)}
              onRemove={()=>removeSection(index)}
              onMove={(dir)=>moveSection(index,dir)}
              onImageUpload={(file,onSuccess)=>handleImageUpload(file,'sections',onSuccess,`section-${index}`)} />
          ))}
          <button type="button" onClick={addSection}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', border:`1.5px dashed ${SEA_BD}`, borderRadius:14, padding:'14px', fontFamily:'"Outfit",sans-serif', fontSize:13, fontWeight:600, color:MUTED, background:'transparent', cursor:'pointer', transition:'color 0.15s, border-color 0.15s' }}
            onMouseEnter={(e)=>{ e.currentTarget.style.color=SEA; e.currentTarget.style.borderColor=SEA }}
            onMouseLeave={(e)=>{ e.currentTarget.style.color=MUTED; e.currentTarget.style.borderColor=SEA_BD }}>
            <Plus size={15} /> Add Section
          </button>
        </div>
      </Card>

      {/* ── SEO ── */}
      <Card title="SEO" hint="Optional — overrides title / description in search results">
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <Field label="SEO Title" hint="60 chars max">
            <InputEl type="text" maxLength={60} value={form.seo_title} placeholder="Leave blank to use post title"
              onChange={(e)=>setField('seo_title',e.target.value)} />
          </Field>
          <Field label="SEO Description" hint="155 chars max">
            <TextareaEl rows={2} maxLength={155} value={form.seo_description} placeholder="Leave blank to use post description"
              onChange={(e)=>setField('seo_description',e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* Bottom save */}
      <div style={{ display:'flex', justifyContent:'flex-end', gap:10, paddingTop:4 }}>
        <button type="button" onClick={()=>router.back()} style={btnSecondary}
          onMouseEnter={(e)=>(e.currentTarget.style.background=SEA_BG)}
          onMouseLeave={(e)=>(e.currentTarget.style.background='#fff')}>
          Cancel
        </button>
        <button type="submit" disabled={saving} style={{ ...btnPrimary, opacity:saving?0.7:1, cursor:saving?'not-allowed':'pointer' }}
          onMouseEnter={(e)=>{ if(!saving) e.currentTarget.style.opacity='0.88' }}
          onMouseLeave={(e)=>{ e.currentTarget.style.opacity=saving?'0.7':'1' }}>
          {saving && <Loader2 size={14} style={{ animation:'spin 1s linear infinite' }} />}
          {saving?'Saving…':mode==='new'?'Create Post':'Save Changes'}
        </button>
      </div>
    </form>
  )
}

// ── Section Editor ────────────────────────────────────────────────────────────

function SectionEditor({ index, section, total, uploading, onChange, onRemove, onMove, onImageUpload }:{
  index:number; section:SectionFormData; total:number; uploading:string|null;
  onChange:(k:keyof SectionFormData,v:any)=>void; onRemove:()=>void;
  onMove:(d:'up'|'down')=>void; onImageUpload:(file:File,cb:(url:string)=>void)=>void
}) {
  const SEA='#2d8f7b', SEA_BG='rgba(45,143,123,0.08)', SEA_BD='rgba(45,143,123,0.20)', TEXT='#0f2720', MUTED='#6b9e94'
  const showImage=['image','text_image'].includes(section.type)
  const showBody =['text','text_image','quote','callout'].includes(section.type)

  const inp2: React.CSSProperties = {
    width:'100%', boxSizing:'border-box', border:`1.5px solid ${SEA_BD}`,
    borderRadius:10, background:'#f7faf9', padding:'10px 13px',
    fontFamily:'"Outfit",sans-serif', fontSize:13, color:TEXT, outline:'none',
    transition:'border-color 0.2s, box-shadow 0.2s',
  }
  const focus = (e: React.FocusEvent<any>) => { e.target.style.borderColor=SEA; e.target.style.boxShadow='0 0 0 3px rgba(45,143,123,0.10)' }
  const blur  = (e: React.FocusEvent<any>) => { e.target.style.borderColor=SEA_BD; e.target.style.boxShadow='none' }

  return (
    <div style={{ borderRadius:16, border:`1px solid ${SEA_BD}`, overflow:'hidden' }}>
      {/* Header bar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'#f7faf9', borderBottom:`1px solid ${SEA_BD}` }}>
        <GripVertical size={15} style={{ color:MUTED, flexShrink:0 }} />
        <span style={{ fontFamily:'"Outfit",sans-serif', fontSize:10, fontWeight:700, color:MUTED, letterSpacing:'0.12em', textTransform:'uppercase' }}>
          Section {index+1}
        </span>
        <select value={section.type} onChange={(e)=>onChange('type',e.target.value)}
          style={{ marginLeft:8, border:`1px solid ${SEA_BD}`, borderRadius:8, background:'#fff', padding:'5px 10px', fontFamily:'"Outfit",sans-serif', fontSize:12, color:TEXT, outline:'none' }}>
          {SECTION_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:4 }}>
          {(['up','down'] as const).map(dir=>(
            <button key={dir} type="button" onClick={()=>onMove(dir)}
              disabled={dir==='up'?index===0:index===total-1}
              style={{ width:28, height:28, borderRadius:8, border:'none', background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:MUTED, opacity:(dir==='up'?index===0:index===total-1)?0.3:1 }}
              onMouseEnter={(e)=>{ e.currentTarget.style.background='#fff' }}
              onMouseLeave={(e)=>{ e.currentTarget.style.background='transparent' }}>
              {dir==='up'?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
            </button>
          ))}
          <button type="button" onClick={onRemove}
            style={{ width:28, height:28, borderRadius:8, border:'none', background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:MUTED }}
            onMouseEnter={(e)=>{ e.currentTarget.style.background='rgba(220,38,38,0.08)'; e.currentTarget.style.color='#dc2626' }}
            onMouseLeave={(e)=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=MUTED }}>
            <X size={14}/>
          </button>
        </div>
      </div>

      {/* Fields */}
      <div style={{ padding:16, background:'#fff', display:'flex', flexDirection:'column', gap:12 }}>
        {section.type!=='image' && (
          <input type="text" value={section.heading}
            onChange={(e)=>onChange('heading',e.target.value)}
            placeholder={section.type==='quote'?'Attribution / source (optional)':'Section heading (optional)'}
            style={inp2} onFocus={focus} onBlur={blur} />
        )}
        {showBody && (
          <textarea rows={section.type==='callout'?4:8} value={section.body}
            onChange={(e)=>onChange('body',e.target.value)}
            placeholder={section.type==='quote'?'Quote text…':section.type==='callout'?'Callout message — supports **markdown**':'Write your content here. Markdown is supported.\n\n**Bold**, *italic*, ## Headings, - Lists, `code`…'}
            style={{ ...inp2, resize:'vertical', fontFamily:'"JetBrains Mono",monospace', fontSize:12 }}
            onFocus={focus} onBlur={blur} />
        )}
        {showImage && (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <input type="url" value={section.image_url} onChange={(e)=>onChange('image_url',e.target.value)}
              placeholder="Image URL or upload below" style={inp2} onFocus={focus} onBlur={blur} />
            <label style={{ display:'inline-flex', alignItems:'center', gap:7, cursor:'pointer', border:`1.5px dashed ${SEA_BD}`, borderRadius:9, padding:'7px 14px', width:'fit-content', fontFamily:'"Outfit",sans-serif', fontSize:12, fontWeight:600, color:MUTED, transition:'color 0.15s, border-color 0.15s' }}
              onMouseEnter={(e)=>{ e.currentTarget.style.color=SEA; e.currentTarget.style.borderColor=SEA }}
              onMouseLeave={(e)=>{ e.currentTarget.style.color=MUTED; e.currentTarget.style.borderColor=SEA_BD }}>
              {uploading===`section-${index}`?<Loader2 size={13} style={{ color:SEA, animation:'spin 1s linear infinite' }}/>:<Upload size={13}/>}
              Upload image
              <input type="file" accept="image/*" style={{ display:'none' }}
                onChange={(e)=>{ const f=e.target.files?.[0]; if(f) onImageUpload(f,(url)=>onChange('image_url',url)) }} />
            </label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <input type="text" value={section.image_alt} onChange={(e)=>onChange('image_alt',e.target.value)}
                placeholder="Alt text (accessibility)" style={inp2} onFocus={focus} onBlur={blur} />
              <input type="text" value={section.image_caption} onChange={(e)=>onChange('image_caption',e.target.value)}
                placeholder="Caption (optional)" style={inp2} onFocus={focus} onBlur={blur} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}