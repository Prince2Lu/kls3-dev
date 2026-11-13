import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/home/SectionLabel'
import { formatPostDate } from '@/components/ui/BlogCard'
import s from '@/components/home/home.module.css'
import b from '@/components/blog/blog.module.css'
import { contactSection } from '@/lib/data/home'
import { processArticleHtml, type BlogPost as BlogPostData } from '@/lib/mdx'

interface BlogPostProps {
  post: BlogPostData
}

// Article du blog (design V5) — le contenu HTML vient des fichiers MDX générés par n8n
export default function BlogPost({ post }: BlogPostProps) {
  const { html, toc } = processArticleHtml(post.content)

  return (
    <div className={`${s.root} ${b.scope}`}>
      <article>
        <header className={`${s.wrap} ${b.hero}`}>
          <nav className={b.breadcrumb} aria-label="Fil d'Ariane">
            <Link href="/blog">Blog</Link> / {post.categorie}
          </nav>
          <h1>{post.h1_affiche || post.titre_seo}</h1>
          <p className={b.description}>{post.meta_description}</p>
          <div className={b.meta}>
            <span>{formatPostDate(post.publishedAt)}</span>
            <span>{post.readTime} min de lecture</span>
          </div>
          {post.image && (
            <div className={b.heroimg}>
              <Image
                src={post.image}
                alt={post.titre_seo}
                width={1536}
                height={1024}
                preload
                sizes="(max-width: 1240px) 100vw, 1190px"
              />
            </div>
          )}
        </header>

        <div className={`${s.wrap} ${b.layout}`}>
          <div>
            <div className={b.body} dangerouslySetInnerHTML={{ __html: html }} />
            <Link href="/blog" className={b.back}>
              ← Voir tous les articles
            </Link>
          </div>

          {toc.length > 0 && (
            <aside className={b.toc} aria-label="Table des matières">
              <p>Table des matières</p>
              <ul>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>

      <section className={`${s.band} ${s.ending}`}>
        <div className={s.wrap}>
          <SectionLabel dark>{contactSection.tag}</SectionLabel>
          <h2>
            {contactSection.titleStart}
            <span className={s.hl}>{contactSection.titleAccent}</span>
          </h2>
          <p>{contactSection.text}</p>
          <div className={s.endactions}>
            {/* Ouvre la ContactModal montée par SiteChrome */}
            <button type="button" data-contact-source="rendez-vous" className={`${s.btn} ${s['btn-primary']}`}>
              {contactSection.cards[0].title} →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
