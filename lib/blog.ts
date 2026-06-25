import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  categorie?: string
  image?: string
}

export function getRecentPosts(count = 3): BlogPost[] {
  const dir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  const posts: BlogPost[] = []

  for (const file of files) {
    const slug = file.replace('.mdx', '')
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data } = matter(raw)

    if (data.status && data.status !== 'published') continue

    posts.push({
      slug,
      title: data.title || data.titre_seo || slug,
      date: data.date || data.publishedAt || '',
      description: data.description || data.meta_description || '',
      categorie: data.categorie || undefined,
      image: data.image || data.hero_image || data.prompt_image || undefined,
    })
  }

  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}
