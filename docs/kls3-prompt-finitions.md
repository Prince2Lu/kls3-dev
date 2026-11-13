# Claude Code — Lot 3 : finitions avant mise en ligne

> Branche : `refonte-lilian`. **Aucun merge, aucun checkout, aucun push vers main.**
> Design : tokens V5 déjà en place (`CLAUDE.md`, section Design system).

## 1. Consentement cookies (Google Analytics)

Aujourd'hui GA (`G-KTQXTLY7YL`, via `@next/third-parties/google` dans `app/layout.tsx`) se charge sans consentement. Mettre en conformité CNIL, sans nouvelle dépendance :

- Créer `components/consent/CookieConsent.tsx` ('use client') :
  - bandeau fixe en bas, design V5 (carte blanche, bordure `--line`, radius 14px, Inter 14px, max-width 720px centré, mobile pleine largeur) ;
  - texte : « Nous utilisons des cookies de mesure d'audience (Google Analytics) pour améliorer le site. Vous pouvez les accepter ou les refuser. » + lien « En savoir plus » → `/politique-de-confidentialite#cookies` ;
  - deux boutons **de même poids visuel** (exigence CNIL) : « Refuser » et « Accepter » (tous deux outline, ou tous deux pleins) ;
  - choix stocké 6 mois (cookie `kls3_consent=granted|denied`, `SameSite=Lax`, `Secure`), bandeau non réaffiché tant que le choix est valide.
- Google Analytics : ne charger le script **que si** `kls3_consent=granted`. Remplacer le `<GoogleAnalytics />` inconditionnel par un composant client `components/consent/Analytics.tsx` qui lit le consentement et n'injecte GA qu'après accord (et immédiatement après un clic sur « Accepter », sans rechargement).
- Footer (`SiteFooter`) : ajouter un lien « Gérer les cookies » qui rouvre le bandeau.
- Ne rien charger côté Google avant consentement (vérifier dans l'onglet Réseau : aucune requête vers `googletagmanager.com` / `google-analytics.com` avant « Accepter »).
- `/demo/*` et `/carte/*` : même règle (le bandeau s'y affiche aussi).

## 2. Pages légales

### `/mentions-legales`
- Ajouter les champs obligatoires SAS avec des valeurs à compléter, affichées telles quelles et marquées `// TODO: à compléter par Eric` :
  - « Capital social : [À COMPLÉTER] € »
  - « RCS : [À COMPLÉTER] »
  - « N° TVA intracommunautaire : [À COMPLÉTER] »
- Remplacer toute mention du type « pas de cookies de tracking » par : « Le site utilise des cookies de mesure d'audience (Google Analytics), déposés uniquement avec votre consentement. Voir la politique de confidentialité. »

### `/politique-de-confidentialite`
Mettre à jour sans inventer de faits juridiques (si une info manque, `// TODO` + la signaler) :
- **Données collectées via les formulaires** : nom, e-mail, téléphone, société, message ; pour le diagnostic, les réponses au questionnaire. Finalité : répondre à votre demande et vous recontacter.
- **Destinataires / sous-traitants** : Vercel (hébergement), Resend (envoi des e-mails), Cloudflare Turnstile (protection anti-spam), Google Analytics (mesure d'audience, uniquement avec consentement).
- Section `id="cookies"` : liste des cookies (consentement `kls3_consent` : 6 mois, nécessaire ; Google Analytics `_ga`, `_ga_*` : 13 mois max, soumis à consentement) + comment retirer son consentement (lien « Gérer les cookies »).
- Durée de conservation des demandes de contact : `[À COMPLÉTER]` avec `// TODO`.
- Droits RGPD (accès, rectification, effacement, opposition) et contact : `contact@kls3-dev.com` ; mention du droit de réclamation auprès de la CNIL.

## 3. Restes de l'ancien positionnement

- `components/seo/OrganizationSchema.tsx` : remplacer la description par « KLS3 simplifie les processus des PME, automatise leurs opérations et crée les outils métier qui vont avec : DocFlow, agents IA et applications sur mesure. » Garder le reste du schéma (nom, URL, logo, contact). Ajouter `knowsAbout` : `["Automatisation des processus", "Agents IA", "Gestion documentaire", "Applications métier sur mesure"]`.
- `app/blog/BlogPageClient.tsx` : la carte « à la une » qui parle de « cabinets comptables et études notariales » → la faire pointer vers l'article publié le plus récent (date `publishedAt`/`date`) au lieu d'un texte figé ; si le texte est codé en dur, le remplacer par le titre/extrait de cet article.
- Composants inutilisés `FrictionsScanner`, `FaqSection`, `BlogPreview` (et `ui/Motion` s'il n'est plus importé ensuite) : supprimer s'ils ne sont importés nulle part (vérifier par recherche avant suppression).
- Ne pas modifier le contenu des articles (« frictions invisibles » reste).

## 4. Sécurité : clé Google dans le workflow n8n

`automation/n8n-workflows/KLS3 - Dashboard SEO Hebdomadaire.json` contient une clé API Google en clair (`const API_KEY = 'AIzaSy…'`).
- La remplacer par `const API_KEY = $env.GOOGLE_PSI_API_KEY;` (ou à défaut `'COLLE_TA_CLE_API_ICI'`) et ajouter un commentaire indiquant de stocker la clé dans les variables d'environnement n8n.
- Chercher d'autres secrets en clair dans `automation/` (motifs `AIza`, `sk-`, `re_`, `Bearer `, `apiKey`, `password`) et les remplacer de la même façon. Lister dans le récapitulatif tout ce qui a été trouvé (sans afficher les valeurs).
- Rappel dans le récapitulatif : la clé reste dans l'historique git, elle doit être **révoquée dans Google Cloud Console** (action manuelle d'Eric).

## 5. Visuels (si présents)

Si les fichiers suivants existent, les utiliser à la place des placeholders et retirer les mentions « à remplacer » ; sinon ne rien changer :
- `public/realisations/sales-os.png`
- `public/realisations/calymia.png`
- `public/equipe/eric-lilian.jpg`

## Vérifications
- `npx next build --webpack`
- Navigation privée : bandeau affiché, aucune requête Google avant « Accepter » ; après « Accepter », GA chargé ; après « Refuser », rien ; « Gérer les cookies » rouvre le bandeau.
- 375 / 768 / 1280 px : bandeau lisible, pas de débordement, ne masque pas les CTA du hero.
- Les pages légales s'affichent correctement, l'ancre `#cookies` fonctionne.

## Git
```bash
git add .
git commit -m "feat: consentement cookies, pages légales, schema SEO, nettoyage, retrait clé API"
git pull origin refonte-lilian --no-rebase
git push origin refonte-lilian
```

## Définition de "done"
- [ ] GA chargé uniquement après consentement, bandeau conforme (Accepter/Refuser au même niveau), lien « Gérer les cookies »
- [ ] Mentions légales et politique de confidentialité à jour, champs manquants en `[À COMPLÉTER]`
- [ ] OrganizationSchema et carte « à la une » du blog alignés sur le positionnement actuel
- [ ] Composants orphelins supprimés
- [ ] Aucune clé API en clair dans `automation/`
- [ ] Build OK, push sur `refonte-lilian` uniquement
- [ ] Récapitulatif final : liste exhaustive des `[À COMPLÉTER]` / `[À VALIDER]` restants avant mise en ligne
