export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: 'Intelligence artificielle' | 'Gestion de projet' | 'SaaS'
  publishedAt: string
  readTime: number
  content?: NotionBlock[]
}

export interface NotionBlock {
  id: string
  type: string
  [key: string]: any
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: 'gestion-de-projet' | 'transformation-digitale' | 'solution-saas' | 'autre'
  message: string
}

export type PillarColor = 'purple' | 'cyan' | 'green'

export interface Pillar {
  id: 'gestion-de-projet' | 'transformation-digitale' | 'solutions-saas'
  label: string
  title: string
  description: string
  tag: string
  icon: string
  color: PillarColor
  href: string
}
