import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  titre_seo: string
  h1_affiche?: string
  meta_description: string
  categorie: string
  mot_cle_principal: string
  mots_cles_secondaires: string[]
  publishedAt: string
  readTime: number
  status: 'draft' | 'published'
  content: string
  image?: string
}

/** Card/listing fields only — never pass `content` to client components. */
export type BlogListingPost = Pick<
  BlogPost,
  'slug' | 'titre_seo' | 'meta_description' | 'categorie' | 'publishedAt' | 'readTime' | 'image'
>

export function toListingPost(post: BlogPost): BlogListingPost {
  return {
    slug: post.slug,
    titre_seo: post.titre_seo,
    meta_description: post.meta_description,
    categorie: post.categorie,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    image: post.image,
  }
}

export interface TocItem {
  id: string
  text: string
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Adds stable h2 ids and builds a TOC without DOM APIs, so SSR HTML includes the article body. */
export function processArticleHtml(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  let index = 0

  const processed = html.replace(
    /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_match, attrs: string, inner: string) => {
      const text = stripHtml(inner)
      const existingId = /\sid=["']([^"']+)["']/i.exec(attrs)
      const id = existingId?.[1] || slugifyHeading(text) || `section-${index}`
      index += 1
      toc.push({ id, text })

      if (existingId) {
        return `<h2${attrs}>${inner}</h2>`
      }

      const trimmedAttrs = attrs.trim()
      const attrStr = trimmedAttrs ? ` ${trimmedAttrs}` : ''
      return `<h2${attrStr} id="${id}">${inner}</h2>`
    }
  )

  return { html: processed, toc }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const filePath = path.join(BLOG_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      // Nettoyer les figures avec images inexistantes et les tirets longs
      const cleanContent = content
        .replace(/<figure>[\s\S]*?<\/figure>/g, '')
        .replace(/ — /g, ' ')
        .replace(/—/g, '-')

      return {
        slug: filename.replace('.mdx', ''),
        titre_seo: data.titre_seo || '',
        h1_affiche: data.h1_affiche || undefined,
        meta_description: data.meta_description || '',
        categorie: data.categorie || '',
        mot_cle_principal: data.mot_cle_principal || '',
        mots_cles_secondaires: data.mots_cles_secondaires || [],
        publishedAt: data.publishedAt || '',
        readTime: data.readTime || 5,
        status: data.status || 'draft',
        content: cleanContent,
        image: data.image || undefined
      }
    })
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  // Nettoyer les figures avec images inexistantes et les tirets longs
  const cleanContent = content
    .replace(/<figure>[\s\S]*?<\/figure>/g, '')
    .replace(/ — /g, ' ')
    .replace(/—/g, '-')

  return {
    slug,
    titre_seo: data.titre_seo || '',
    h1_affiche: data.h1_affiche || undefined,
    meta_description: data.meta_description || '',
    categorie: data.categorie || '',
    mot_cle_principal: data.mot_cle_principal || '',
    mots_cles_secondaires: data.mots_cles_secondaires || [],
    publishedAt: data.publishedAt || '',
    readTime: data.readTime || 5,
    status: data.status || 'draft',
    content: cleanContent,
    image: data.image || undefined
  }
}
