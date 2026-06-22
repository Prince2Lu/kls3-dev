# Guide de démarrage rapide — kls3.dev

## ✅ Ce qui a été créé

Le site vitrine complet est maintenant fonctionnel avec :

### Pages créées
- ✅ Homepage (`/`) avec Hero, Pillars, Sectors, Blog preview, CTA
- ✅ Page Missions (`/missions`) - Chef de projet freelance
- ✅ Page Agents IA (`/agents-ia`) - Agents IA sur-mesure
- ✅ Page SaaS (`/saas`) - Développement SaaS
- ✅ Page Contact (`/contact`) avec formulaire fonctionnel
- ✅ Page Blog (`/blog`) - Liste des articles
- ✅ Page Article (`/blog/[slug]`) - Article individuel

### Composants créés
- Navigation responsive avec menu mobile
- Footer avec liens
- Cards glassmorphism réutilisables
- Animations Framer Motion
- Formulaire de contact avec validation
- Intégration Notion pour le blog

### Fonctionnalités
- ✅ Design dark futuriste avec gradients violet/cyan/vert
- ✅ Animations fluides (Hero, cartes, badges)
- ✅ Responsive mobile/tablet/desktop
- ✅ SEO optimisé avec métadonnées
- ✅ Blog alimenté par Notion (ISR)
- ✅ Formulaire de contact via Resend
- ✅ Build TypeScript sans erreurs

## 🚀 Pour démarrer

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer les variables d'environnement

Créer `.env.local` à partir du template :
```bash
cp .env.local.example .env.local
```

**Variables à configurer :**
- `NOTION_TOKEN` : Token d'intégration Notion
- `NOTION_DATABASE_ID` : ID de votre base Notion
- `RESEND_API_KEY` : Clé API Resend
- `CONTACT_EMAIL` : Email de destination du formulaire

### 3. Créer la base Notion

Propriétés requises :
- **Title** (Title) - Titre de l'article
- **Slug** (Text) - URL de l'article
- **Excerpt** (Text) - Résumé
- **Category** (Select) - "Intelligence artificielle", "Gestion de projet" ou "SaaS"
- **Status** (Select) - "Draft" ou "Published"
- **PublishedAt** (Date) - Date de publication
- **ReadTime** (Number) - Temps de lecture en minutes

### 4. Lancer le serveur

```bash
npm run dev
```

Ouvrir http://localhost:3000

### 5. Builder pour la production

```bash
npm run build
npm run start
```

## 📋 Checklist avant déploiement

### Contenu
- [ ] Remplacer l'email dans le Footer par le vrai
- [ ] Mettre à jour les infos de contact dans `/contact`
- [ ] Publier au moins 1 article dans Notion
- [ ] Tester le formulaire de contact en local

### Configuration
- [ ] Vérifier toutes les variables d'environnement
- [ ] Vérifier que la base Notion est partagée avec l'intégration
- [ ] Vérifier que le domaine Resend est validé

### Vercel
- [ ] Pusher le code sur GitHub
- [ ] Créer le projet sur Vercel
- [ ] Configurer les variables d'environnement
- [ ] Déployer
- [ ] Configurer le domaine custom

## 🎨 Personnalisation

### Couleurs
Les couleurs sont dans `app/globals.css` :
```css
--color-brand-purple: #7c3aed;
--color-brand-cyan: #0ea5e9;
--color-brand-green: #10b981;
```

### Contenu des piliers
Les données sont dans `lib/data.ts` - modifier les descriptions/tags si besoin.

### Stats du Hero
Dans `components/sections/Hero.tsx`, lignes 60-76 - ajuster les chiffres.

## 📱 Pages et routes

```
/                    → Homepage
/missions            → Chef de projet freelance
/agents-ia           → Agents IA
/saas                → SaaS
/contact             → Formulaire de contact
/blog                → Liste articles (ISR 1h)
/blog/[slug]         → Article individuel (ISR 1h)
/api/contact         → API Resend (POST)
```

## 🐛 Problèmes courants

### Le blog n'affiche rien
- Vérifier que `NOTION_TOKEN` et `NOTION_DATABASE_ID` sont corrects
- Vérifier qu'au moins 1 article a le statut "Published"
- Vérifier les logs : les warnings Notion apparaissent dans la console

### Le formulaire ne fonctionne pas
- Vérifier `RESEND_API_KEY`
- Vérifier que le domaine est vérifié sur Resend
- En dev, utiliser un domaine de test Resend

### Erreur de build
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📊 Performance

Le build est optimisé pour :
- **Lighthouse Score** : ≥ 90 (Performance & SEO)
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s

### Optimisations en place
- Server Components par défaut
- ISR pour le blog (revalidate 1h)
- Images Notion avec Next/Image
- Tailwind CSS production optimisé
- Framer Motion avec animations GPU

## 🎯 Prochaines étapes recommandées

1. **Publier du contenu** - Créer 3-5 articles de blog dans Notion
2. **Ajouter Analytics** - Google Analytics ou Plausible
3. **Newsletter** - Ajouter un formulaire d'inscription
4. **Portfolio** - Créer une page `/portfolio` avec vos projets
5. **Témoignages** - Ajouter une section témoignages sur la homepage
6. **Open Graph images** - Générer des OG images pour chaque page

## 📞 Support

Pour toute question sur le code :
1. Consulter le README.md
2. Vérifier les fichiers dans `components/` et `app/`
3. Tous les composants sont documentés avec des types TypeScript

---

✨ **Le site est prêt à être déployé !**
