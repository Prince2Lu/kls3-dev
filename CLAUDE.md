# KLS3 — Contexte complet projet

## Qui sommes-nous ?

**Eric Scarpino** — Fondateur de KLS3, actuellement en mission freelance Chef de projet à Post Luxembourg (fin 2026).
**Lilian Scarpino** — Directeur Commercial de KLS3 (fils d'Eric).

---

## Positionnement

Cabinet d'intelligence opérationnelle pour les entreprises de 10 à 1000 personnes, tous secteurs.
KLS3 identifie et élimine les frictions opérationnelles invisibles : tâches répétitives, données dispersées, relances manuelles, manque de visibilité, processus fragiles.

**MOTS INTERDITS dans tout contenu visible :**
audit, no-code, workflow, GPT, ChatGPT, stack technique, cabinet d'avocats, expert-comptable, LegalTech

---

## Stack site

- Framework : Next.js 14 App Router + TypeScript
- Style : Tailwind CSS + Framer Motion
- Blog : MDX local (content/blog/)
- Email : Resend
- Déploiement : Vercel + Cloudflare DNS
- Repo : Prince2Lu/kls3-dev

### Design system

**V5 (validé Eric & Lilian, référence `docs/maquette-v5.html`)** — homepage et pages `/solutions/*` (`components/home/home.module.css`, tokens aussi dans `tailwind.config.ts` sous `kls`) :

| Token | Valeur | Usage |
|---|---|---|
| `--ink` | #12112d | texte principal, bandeaux sombres, hero |
| `--ink-deep` | #0b0b1f | footer |
| `--paper` | #FAFAF8 | fond de page |
| `--paper-2` | #F3F3F7 | sections alternées, placeholders |
| `--line` | #E6E5EE | bordures de cartes, séparateurs |
| `--line-strong` | #C9CAD6 / #D7D6E2 | bordures de champs, boutons outline |
| `--text-2` | #4F5368 | texte secondaire |
| `--text-3` | #6B6E85 | mentions, notes |
| `--on-dark` | #B9BBD3 | texte secondaire sur fond sombre |
| `--blue` | #4B7BF5 | couleur de sens |
| `--blue-text` | #3A63D8 | bleu pour texte et liens sur fond clair (contraste ≥ 4.5:1) |
| `--warn` | #9A5B00 | statut « à vérifier » |
| `--cta` | linear-gradient(110deg,#7139fa,#4B7BF5) | uniquement les boutons principaux |

- **Bleu = couleur de sens** : ce qui avance, est gagné ou validé. Le violet n'existe plus que dans le dégradé des boutons principaux et dans le logo.
- Typographie : Syne (titres, `wght@400..800`) / Inter (texte) / JetBrains Mono (labels de section, numéros, identifiants, statuts, valeurs du simulateur).
- Labels de section : mono 11.5px uppercase précédés du motif logo (`components/ui/LogoMotif.tsx`).
- Surligneur bleu (`.hl`) sur les fins de titres fortes.
- **Wordmark KLS3** : Syne 700, letter-spacing -0.02em, le "3" TOUJOURS en #4B7BF5 (`components/home/Wordmark.tsx`).

Ancien site (pages hors home/solutions) : fond #0D0D0D, accent #4B7BF5, texte #F0EDE8.

---

## Pages existantes

- / — Homepage (sections #solutions, #realisations, #methode, #financements, #equipe, #contact)
- /blog + /blog/[slug] — Blog MDX (design V5)
- /solutions/docflow — Solution DocFlow
- /solutions/agents-ia — Solution Agents IA
- /solutions/sur-mesure — Solution Applications sur mesure

- /diagnostic — Diagnostic (ancien thème sombre conservé)
- /demo/* et /carte/* — sans header/footer du site (ancien thème sombre conservé)
- /mentions-legales, /politique-de-confidentialite

Cookies : Google Analytics chargé uniquement après consentement (`components/consent/`, cookie `kls3_consent` 6 mois, lien « Gérer les cookies » dans le footer).

Header/footer uniques : `components/layout/SiteHeader.tsx` / `SiteFooter.tsx`, montés par `SiteChrome.tsx` avec la `ContactModal` (partout sauf /demo et /carte).

**Redirections 301 (next.config.ts) :** /frictions → /#solutions, /methode → /#methode, /cas-clients → /#realisations, /a-propos → /#equipe, /contact → /#contact, /solutions → /#solutions

**Pages supprimées :** /frictions, /solutions (page racine), /methode, /cas-clients, /a-propos, /contact, /missions, /agents-ia, /saas

---

## Blog

### Articles publiés

- kls3-qui-sommes-nous-comment-nous-travaillons

Article à la une sur /blog : automatiquement le plus récent (publishedAt), voir BlogPageClient.tsx
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
- Liens internes : /#realisations ou /#contact uniquement (/cas-clients et /contact redirigent en 301)
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
