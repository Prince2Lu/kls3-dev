# KLS3 — Contexte complet projet

## Qui sommes-nous ?

**Eric Scarpino** — Fondateur de KLS3, actuellement en mission freelance Chef de projet à Post Luxembourg (fin 2026).
**Lilian Scarpino** — Directeur Commercial de KLS3 (fils d'Eric).

---

## Positionnement

Cabinet d'intelligence opérationnelle pour les entreprises de 10 à 1000 personnes, tous secteurs.
KLS3 identifie et élimine les frictions opérationnelles invisibles : tâches répétitives, données dispersées, relances manuelles, manque de visibilité, processus fragiles.

**MOTS INTERDITS dans tout contenu visible :**
audit, no-code, workflow, agent IA, GPT, ChatGPT, stack technique, cabinet d'avocats, expert-comptable, LegalTech

---

## Stack site

- Framework : Next.js 14 App Router + TypeScript
- Style : Tailwind CSS + Framer Motion
- Blog : MDX local (content/blog/)
- Email : Resend
- Déploiement : Vercel + Cloudflare DNS
- Repo : Prince2Lu/kls3-dev

### Design system

- Fond : #0D0D0D
- Accent : #4B7BF5
- Texte : #F0EDE8
- Typographie : Syne (titres) / Inter (corps)
- Le "3" de KLS3 est TOUJOURS en #4B7BF5

---

## Pages existantes

- / — Homepage
- /cas-clients — Cas concrets
- /contact — Formulaire
- /blog + /blog/[slug] — Blog MDX

**Pages supprimées :** /frictions, /solutions, /methode, /missions, /agents-ia, /saas

---

## Blog

### Articles publiés

- kls3-qui-sommes-nous-comment-nous-travaillons (article à la une — featuredSlug dans BlogPageClient.tsx)
- donnees-dispersees-perte-de-temps-equipes
- relances-manuelles-automatisation
- pilotage-operationnel-tableaux-de-bord-mentent
- croissance-entreprise-processus-scalabilite

### Catégories

Frictions opérationnelles / Automatisation / Pilotage & visibilité / Organisation & coordination / Transformation opérationnelle / Croissance & scalabilité

### Règles éditoriales

- Vouvoiement systématique, 1400-1800 mots
- HTML autorisé : p, h2, h3, ul, ol, li, strong, em, a
- Interdit : tiret cadratin, emoji, figure/img, div spéciaux, bouton CTA dans le contenu
- Liens internes : /cas-clients ou /contact uniquement
- Bouton "Prendre rendez-vous" géré dans le layout article (pas généré par n8n)
- max_tokens Claude API : 8192

---

## Automates n8n (automation.kls3-dev.com)

| Workflow | Version | Déclencheur |
|----------|---------|-------------|
| Génération Sujets | v4.1 | Cron dimanche 20h |
| Génération Articles | v6.2 | Manuel |

### Credentials

| Service | ID |
|---------|-----|
| Google Sheets | KgnG7a1VK6P3t5of |
| Anthropic API | HvoZJIsIuzU8eEFp |
| OpenAI API | 8Rn7KNp5X8xnDQ13 |
| GitHub Token KLS3 | ygplXbX9GqSlJTC5 |

---

## Google Sheet blog

- ID : 1OCRkHTA_DXD6_0PZlXqJxlGusTAsHOBxJhHoZNaWvAA
- Onglet : kls3-blog-sujets (gid: 248454067)
- Colonnes : id | titre | categorie | categorie_slug | mot_cle_principal | mots_cles_secondaires | meta_description | angle | prompt_image | statut | github_file | date_publication

Sujets à générer : art-006 à art-021 (statut todo)

---

## Git standard

```bash
cd /Users/Eric2/kls3-dev/kls3-dev
git add .
git commit -m "feat: description"
git pull origin main --no-rebase
git push origin main
```

---

## Prochaines tâches SEO/GEO

- [ ] Générer art-006 à art-021 via n8n
- [ ] Corriger meta descriptions pages principales (homepage, blog)
- [ ] Sitemap + Google Search Console
- [ ] Schema.org (Organization, Article)
- [ ] Page À propos (Eric + Lilian)
- [ ] Google Business Profile
