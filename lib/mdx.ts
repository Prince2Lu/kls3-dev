import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  titre_seo: string
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
