# kls3.dev — Site vitrine professionnel

Site vitrine moderne pour freelance chef de projet / développeur IA & SaaS, construit avec Next.js 14, TypeScript et Tailwind CSS.

## 🎯 Fonctionnalités

- ✨ **Homepage** avec Hero animé, présentation des 3 piliers d'activité, secteurs cibles et aperçu blog
- 📄 **3 pages services** détaillées (Chef de projet, Agents IA, SaaS)
- 📝 **Blog** alimenté par Notion avec ISR
- 📧 **Formulaire de contact** fonctionnel via Resend
- 🎨 **Design dark** avec glassmorphism et gradients
- ⚡ **Animations** fluides avec Framer Motion
- 📱 **Responsive** mobile-first
- 🔍 **SEO optimisé** avec métadonnées dynamiques

## 🛠 Stack technique

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **CMS:** Notion API
- **Email:** Resend
- **Déploiement:** Vercel

## 📦 Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**

   Copier `.env.local.example` vers `.env.local` :

   ```bash
   cp .env.local.example .env.local
   ```

   Puis éditer `.env.local` avec vos credentials :

   ```env
   # Notion
   NOTION_TOKEN=secret_xxx
   NOTION_DATABASE_ID=xxx

   # Resend
   RESEND_API_KEY=re_xxx
   CONTACT_EMAIL=contact@kls3-dev.com

   # Site
   NEXT_PUBLIC_SITE_URL=https://kls3-dev.com
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

   Le site sera accessible sur http://localhost:3000

## 🗄️ Configuration Notion

Pour que le blog fonctionne, créer une base de données Notion avec ces propriétés :

| Propriété | Type | Description |
|-----------|------|-------------|
| Title | Title | Titre de l'article |
| Slug | Text | URL slug (ex: "mon-article") |
| Excerpt | Text | Résumé court |
| Category | Select | "Intelligence artificielle", "Gestion de projet" ou "SaaS" |
| Status | Select | "Draft" ou "Published" |
| PublishedAt | Date | Date de publication |
| ReadTime | Number | Temps de lecture (minutes) |

**Étapes :**
1. Créer une base de données Notion
2. Créer une intégration : https://www.notion.so/my-integrations
3. Partager la base avec l'intégration
4. Copier le token et l'ID dans `.env.local`

## 📧 Configuration Resend

1. Créer un compte sur https://resend.com
2. Vérifier votre domaine
3. Générer une API key
4. Copier la clé dans `.env.local`

## 🚀 Déploiement sur Vercel

1. Pusher le code sur GitHub
2. Importer le projet sur https://vercel.com
3. Configurer les variables d'environnement
4. Déployer

## 🔧 Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linter
```

## ✅ Checklist

- [ ] Variables d'environnement configurées
- [ ] Base Notion créée et partagée
- [ ] Domaine Resend vérifié
- [ ] Premier article publié
- [ ] Formulaire testé
- [ ] Site testé responsive

## 🐛 Troubleshooting

**Le blog est vide :**
- Vérifier `NOTION_TOKEN` et `NOTION_DATABASE_ID`
- Vérifier qu'un article a le statut "Published"

**Le formulaire ne marche pas :**
- Vérifier `RESEND_API_KEY` et `CONTACT_EMAIL`
- Vérifier que le domaine est vérifié sur Resend

---

Développé avec Claude Code
