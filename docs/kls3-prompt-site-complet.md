# Claude Code — Finaliser le site (header/footer global, blog V5, redirections, pré-prod)

> Branche : `refonte-lilian`. À lancer **après** le lot « design system V5 » (`docs/prompt-design-system-v5.md` / commit V5 poussé).
> Ne pas toucher à `main`. Référence visuelle : `docs/maquette-v5.html`.

## Contexte

- La home et les 3 pages solutions ont leur propre header/footer (`components/home/HomeHeader.tsx`, `HomeFooter.tsx`) en design V5.
- Le reste du site utilise encore l'ancien `components/layout/Navbar.tsx` / `Footer.tsx` (fond `#0D0D0D`), masqués sur la home via `components/layout/HideOnHome.tsx`.
- Le blog (`app/blog`, `app/blog/[slug]`, `content/blog/*.mdx`, alimenté par n8n) doit être conservé intégralement.
- Décision : les anciennes pages de l'ancien positionnement sont **redirigées en 301**, pas refaites.

## 1. Header et footer uniques pour tout le site

1. Faire de `HomeHeader` / `HomeFooter` les composants globaux du site :
   - les déplacer (ou ré-exporter) dans `components/layout/SiteHeader.tsx` et `SiteFooter.tsx` ;
   - les rendre dans `app/layout.tsx` à la place de `Navbar` / `Footer` ;
   - les retirer de `app/page.tsx` et de `components/solutions/SolutionPage.tsx` (plus de doublon).
   - Les ancres pointent vers `/#solutions`, `/#realisations`, etc. sur toutes les pages sauf la home (utiliser `usePathname`), le logo vers `/`.
2. Menu : Solutions (déroulant existant) · Réalisations · Méthode · Aides & financements · **Blog** (`/blog`) · À propos (`/#equipe`) · Contact (`/#contact`). Ajouter aussi « Blog » dans les liens du footer.
3. `ContactModal` doit être disponible sur toutes les pages (provider global ou montage dans le layout) : les boutons « Prendre un rendez-vous » du header ouvrent la modale partout.
4. Routes qui gardent **leur propre mise en page sans header/footer du site** : `/demo/*` et `/carte/*`. Remplacer `HideOnHome` par un composant `SiteChrome` qui affiche header/footer partout sauf sur ces préfixes.
5. Supprimer `Navbar.tsx`, `Footer.tsx` et `HideOnHome.tsx` une fois plus utilisés (vérifier qu'aucun import ne subsiste).
6. `app/layout.tsx` :
   - `body` : fond `#FAFAF8`, texte `#12112d` (au lieu de `#0D0D0D` / `#F0EDE8`) ;
   - polices : ajouter JetBrains Mono et passer Syne en `wght@400..800` dans le `<link>` Google Fonts (si pas déjà fait par le lot V5) ;
   - metadata par défaut : remplacer l'ancienne description « frictions invisibles… » par celle de la home :
     - title default : `KLS3 — Moins de tâches manuelles. Plus de temps pour l'essentiel.`
     - description : `KLS3 simplifie vos processus, automatise vos opérations et crée les outils qui vont avec.`
     - même texte pour openGraph et twitter.
   - Les pages `/diagnostic`, `/demo/*`, `/carte/*` qui reposaient sur le fond sombre du body doivent poser leur propre fond sombre sur leur conteneur principal pour rester **visuellement inchangées** (hors header/footer pour `/diagnostic`).

## 2. Blog en design V5

Conserver : URLs `/blog` et `/blog/[slug]`, le chargement MDX, le frontmatter (`status`, `publishedAt`/`date`, `title`, `description`, image), le filtrage `status: published`, le JSON-LD article, les metadata, le pipeline n8n (aucun changement de format des fichiers `.mdx`).

Changer uniquement la présentation, avec les tokens V5 (`--ink #12112d`, `--paper #FAFAF8`, `--paper-2 #F3F3F7`, `--line #E6E5EE`, `--blue #4B7BF5`, `--blue-text #3A63D8`, Syne / Inter / JetBrains Mono) :

- **`/blog`** (`app/blog/page.tsx`, `BlogPageClient.tsx`) :
  - en-tête : label mono avec motif logo « Blog », H1 « Ressources pour simplifier vos opérations » `[À VALIDER]`, lead d'une phrase : « Méthodes, retours d'expérience et cas concrets pour gagner du temps sur vos opérations. » `[À VALIDER]` ;
  - filtres/catégories existants conservés, restylés en chips V5 ;
  - grille de cartes : image (si présente), catégorie en mono, titre Syne 700, extrait, date en mono, lien « Lire l'article → » en `--blue-text`. Cartes blanches, bordure `--line`, radius 14px, sans ombre.
- **`/blog/[slug]`** (`BlogPost.tsx`) :
  - hero clair : fil d'Ariane « Blog / {catégorie} » en mono, H1, date + temps de lecture en mono, image ;
  - corps de l'article en colonne lisible (max ~720px), Inter 17px / 1.8, titres Syne, liens `--blue-text` soulignés, citations avec bordure gauche bleue, tableaux et listes stylés ;
  - en fin d'article : bandeau `--ink` « Et si on parlait de votre projet ? » avec bouton qui ouvre `ContactModal` (`source: 'rendez-vous'`), puis 3 articles liés si la logique existe déjà.
- Liens internes des articles : remplacer dans `content/blog/*.mdx` les liens `/contact` → `/#contact` et `/cas-clients` → `/#realisations` (uniquement ces liens, ne pas toucher au reste du contenu).

## 3. Redirections 301 (dans `next.config.ts`, en plus des existantes)

| Source | Destination |
|---|---|
| `/frictions` | `/#solutions` |
| `/methode` | `/#methode` |
| `/cas-clients` | `/#realisations` |
| `/a-propos` | `/#equipe` |
| `/contact` | `/#contact` |
| `/solutions` (exact, pas les sous-pages) | `/#solutions` |

- Ajouter aussi les variantes avec slash final.
- Supprimer ensuite les dossiers `app/frictions`, `app/methode`, `app/cas-clients`, `app/a-propos`, `app/contact` et `app/solutions/page.tsx` (garder `app/solutions/docflow`, `agents-ia`, `sur-mesure`). Supprimer les composants et fichiers `lib/data/*` devenus orphelins **uniquement** s'ils ne sont plus importés nulle part (vérifier avec une recherche avant suppression).
- `app/diagnostic/page.tsx` : remplacer `href="/contact"` par `/#contact`.
- `app/sitemap.ts` : retirer les URLs redirigées, garder home, 3 pages solutions, `/blog`, articles publiés, mentions légales, politique de confidentialité, `/diagnostic`.

## 4. Pages légales

`/mentions-legales` et `/politique-de-confidentialite` : même contenu, présentation V5 (fond `--paper`, colonne ~720px, titres Syne, texte Inter). Vérifier que les mentions citent bien la raison sociale, le siège, l'hébergeur (Vercel) et l'éditeur ; si une information manque, laisser un `// TODO` et me le signaler dans le récapitulatif, sans l'inventer.

## 5. Vérifications pré-prod (à faire et à rapporter)

- `npx next build --webpack` sans erreur.
- Crawl local de toutes les routes du sitemap + des 6 sources redirigées : aucun 404, aucun lien interne cassé (lister ceux trouvés et les corriger).
- 375 / 768 / 1280 px sur : home, 1 page solution, `/blog`, 1 article, mentions légales → aucun débordement horizontal.
- La modale de contact s'ouvre depuis le header sur `/blog` et sur un article.
- `/diagnostic`, `/demo/finance`, `/demo/pefferkorn-baillot-thines`, `/carte/[slug]` : rendu inchangé (capture avant/après).
- robots : `noindex` hors production (déjà en place), vérifier `app/robots.ts` pointe sur le sitemap.
- Rechercher dans le code visible les restes de l'ancien positionnement (« frictions invisibles », « Operational Intelligence System », ancienne palette `#0D0D0D`) hors `/diagnostic`, `/demo`, `/carte` et les lister.

## Git

```bash
git add .
git commit -m "feat: header/footer global, blog V5, redirections anciennes pages, pré-prod"
git pull origin refonte-lilian --no-rebase
git push origin refonte-lilian
```

## Définition de "done"
- [ ] Un seul header/footer V5 sur tout le site (sauf `/demo/*` et `/carte/*`), avec « Blog » dans le menu
- [ ] `/blog` et les articles en design V5, contenus MDX et pipeline n8n intacts
- [ ] 6 redirections 301 actives, anciennes pages supprimées, sitemap à jour
- [ ] Pages légales en V5
- [ ] Aucun lien interne cassé, aucun débordement mobile
- [ ] `/diagnostic`, `/demo`, `/carte` visuellement inchangés
- [ ] Récapitulatif des TODO restants (textes `[À VALIDER]`, mentions légales) dans le message final
