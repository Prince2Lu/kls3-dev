# Cursor Handoff — Homepage KLS3 (maquette Lilian)

> À exécuter sur la branche `refonte-lilian`. Ne rien pousser sur `main`.
> Avant de lancer : copier la maquette dans le repo → `docs/maquette-lilian.html`.

## Contexte

Repo `Prince2Lu/kls3-dev`, déployé sur Vercel.
Stack : Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Resend, `lucide-react`.

Existant à NE PAS casser :
- `app/blog/` + `content/blog/` (MDX alimenté par n8n)
- `app/demo/[vertical]/` (cockpit démo `/demo/finance`)
- `app/diagnostic/` (calculateur + PDF `@react-pdf/renderer` + Resend)
- `app/api/contact/route.ts` (Resend, from `KLS3 <noreply@kls3-dev.com>` → `contact@kls3-dev.com`, téléphone obligatoire)

**Source de vérité visuelle et éditoriale : `docs/maquette-lilian.html`.**
Reproduire fidèlement : wording mot pour mot, ordre des sections, couleurs, typographies (Syne titres / Inter texte), espacements, rayons, ombres, comportements interactifs. Ne pas réécrire de texte, ne pas « améliorer » le design.

## Objectif

Remplacer la homepage actuelle par la maquette de Lilian, en composants Next.js propres, avec 5 corrections techniques seulement (listées plus bas).

## Fichiers à créer

```
components/home/
  HomeHeader.tsx          → header sticky + nav + 2 CTA + menu mobile ('use client' pour le burger)
  Hero.tsx                → hero sombre + mockup DocFlow (table statique)
  ProblemSearch.tsx       → 'use client' — barre "Qu'est-ce qui ralentit votre entreprise ?" + chips + résultat
  Solutions.tsx           → 3 cartes (DocFlow mise en avant, Automatisation & agents IA, Applications sur mesure)
  DocFlowSection.tsx      → texte + <DocFlowDemo />
  DocFlowDemo.tsx         → 'use client' — démo 4 étapes (Réception / Lecture / Contrôle / Suivi)
  Realisations.tsx        → Sales OS + Calymia
  Methode.tsx             → 4 étapes + note
  Simulateur.tsx          → 'use client' — domaine, heures, coût horaire, coûts additionnels
  Financements.tsx        → 3 cartes aides
  Pourquoi.tsx            → bloc équipe + 4 bénéfices
  ContactSection.tsx      → 2 cartes (Rendez-vous / Démo) qui ouvrent <ContactModal />
  ContactModal.tsx        → 'use client' — modale formulaire (voir correction 2)
  HomeFooter.tsx          → footer de la maquette
components/ui/
  Logo.tsx                → logo SVG (voir correction 1)
lib/data/home.ts          → tout le contenu texte des sections (chips, solutions, étapes démo, méthode, exemples par domaine, bénéfices…)
lib/home/classify.ts      → fonction classify(query) reprise telle quelle de la maquette
```

## Fichiers à modifier

- `app/page.tsx` → assemble les sections dans l'ordre de la maquette :
  HomeHeader → Hero → ProblemSearch → Solutions → DocFlowSection → Realisations → Methode → Simulateur → Financements → Pourquoi → ContactSection → HomeFooter
- `app/layout.tsx` → fonts via `next/font/google` (Syne 400–800, Inter 400–800) + robots conditionnel (correction 5). Ne pas imposer le header/footer de la homepage aux autres routes dans cette tâche.
- `app/api/contact/route.ts` → accepter un champ optionnel `source: 'rendez-vous' | 'demo' | 'recherche' | 'simulateur'` et l'ajouter au sujet : `[KLS3] {source} — {societe}`. Ne rien casser pour les appels existants (source absent = comportement actuel).
- `tailwind.config.ts` → ajouter les couleurs de la maquette sous un namespace `home` (ink #12112d, purple #7139fa, violet #9c61ff, muted #5c6077, pale #f4f0ff, line #e8e3f5, dark #0b1026…) sans supprimer les couleurs existantes.

## Les 5 corrections (et rien d'autre)

1. **Logo** : ne pas réutiliser le JPEG base64 de la maquette. Chercher un logo SVG existant dans `public/`. S'il n'existe pas, créer `Logo.tsx` en SVG inline (pictogramme 3 nœuds connectés + texte "KLS3"), même taille et même placement que dans la maquette.
2. **Contact** : remplacer tous les `mailto:` par l'ouverture de `ContactModal`, qui poste vers `/api/contact`.
   - Champs : Nom*, Société*, Email*, Téléphone*, Message* (textarea).
   - Prop `source` transmise à l'API selon le bouton cliqué.
   - États : envoi en cours, succès ("Merci, nous revenons vers vous rapidement."), erreur.
   - Fermeture : bouton ✕, touche Échap, clic sur l'overlay ; focus piégé dans la modale.
3. **Recherche** : le résultat s'affiche comme dans la maquette (classify côté client). Le bouton "En parler avec KLS3" ouvre `ContactModal` avec `source='recherche'` et le message pré-rempli : `Difficulté décrite : "{query}" — Piste identifiée : {titre}`.
   Idem pour le simulateur : "Identifier mes pistes d'amélioration" ouvre la modale avec `source='simulateur'` et le message pré-rempli `Domaine : {domaine} · {h} h/semaine · {taux} €/h · charge estimée {total} €/an`.
4. **Icônes** : remplacer les caractères Unicode décoratifs (◈ ◇ ◎ ▤ ⚙ ▱ ↻ ♧ ▦ ⌕ ☷ ⌁ ▥ ✦ ⚡ ✓ ▷ ⓘ) par des icônes `lucide-react` de même taille et même couleur. Correspondances :
   - ▤ → `FileText` · ⚙ → `Workflow` · ▱ → `LayoutGrid` · ↻ → `RefreshCw` · ♧ → `Plug` · ▦ → `AppWindow`
   - ⌕ → `Search` · ☷ → `ListChecks` · ⌁ → `Zap` · ▥ → `BarChart3` · ✦ → `Sparkles`
   - ◎ → `Target` · ⚡ → `Users` · ✓ → `ShieldCheck` · ◈ ◇ (hero) → `CheckCircle2` · ▷ → `Play` · ⓘ → `Info`
   - Les flèches texte (→ ↗) restent en texte.
5. **Preview non indexée** : dans `app/layout.tsx`
   ```ts
   robots: process.env.VERCEL_ENV === 'production'
     ? { index: true, follow: true }
     : { index: false, follow: false }
   ```

## Visuels à prévoir

- `public/realisations/sales-os.png` et `public/realisations/calymia.png` : si présents, afficher avec `next/image` à la place des fausses fenêtres ; sinon garder le placeholder de la maquette.
- `public/equipe/eric-lilian.jpg` : même logique pour le bloc "Éric & Lilian".
- Retirer les mentions de maquette ("Maquette de travail…", "Dans cette maquette, les boutons…", "Illustration — à remplacer…") une fois les visuels réels en place. Garder "Données fictives" et "Démo illustrative".

## Étapes d'implémentation

1. Lire entièrement `docs/maquette-lilian.html` (CSS + HTML + JS).
2. Ajouter les couleurs `home` dans `tailwind.config.ts` et les fonts dans `app/layout.tsx`.
3. Extraire tout le texte dans `lib/data/home.ts` et la fonction `classify` dans `lib/home/classify.ts`.
4. Créer `Logo.tsx`, puis les sections statiques (Server Components) dans l'ordre de la page.
5. Créer les composants client : `ProblemSearch`, `DocFlowDemo`, `Simulateur`, `ContactModal`, burger de `HomeHeader`.
6. Assembler `app/page.tsx`.
7. Modifier `app/api/contact/route.ts` pour le champ `source`.
8. Ajouter le robots conditionnel.
9. `npm run build` sans erreur ni warning TypeScript.
10. Tester en local à 375 / 768 / 1280 px, puis pousser la branche.

## Contraintes importantes

- `'use client'` uniquement sur les 5 composants interactifs listés.
- Responsive identique à la maquette (breakpoints 1050px et 760px).
- Scroll doux vers les ancres (`#solutions`, `#docflow`, `#realisations`, `#methode`, `#simulateur`, `#financements`, `#equipe`, `#contact`) ; tenir compte du header sticky (`scroll-margin-top: 90px`).
- Conserver les styles de focus visibles de la maquette.
- Aucune clé API côté client ; tout envoi passe par `/api/contact`.
- Ne pas toucher à `/blog`, `/demo`, `/diagnostic`, ni au pipeline n8n.
- Ne pas modifier le wording, sauf suppression des mentions de maquette ci-dessus.

## Git

```bash
git add .
git commit -m "feat: homepage refonte maquette Lilian"
git pull origin refonte-lilian --no-rebase
git push origin refonte-lilian
```

## Définition de "done"

- [ ] `npm run build` passe sans erreur TypeScript
- [ ] La homepage est visuellement identique à `docs/maquette-lilian.html` (desktop et mobile)
- [ ] Aucun `mailto:` ni image base64 dans le code
- [ ] Aucun caractère Unicode décoratif restant ; icônes Lucide à la place
- [ ] Recherche : saisie libre et chips affichent la bonne piste ; "En parler avec KLS3" ouvre la modale pré-remplie
- [ ] Démo DocFlow : 4 étapes, barre de progression, "Recommencer" fonctionnent
- [ ] Simulateur : calcul identique à la maquette ; CTA ouvre la modale pré-remplie
- [ ] Formulaire : l'email arrive sur contact@kls3-dev.com avec la bonne `source` dans le sujet
- [ ] Preview Vercel en `noindex` ; production en `index`
- [ ] `/blog`, `/blog/[slug]`, `/demo/finance` et `/diagnostic` fonctionnent toujours
- [ ] Testé à 375, 768 et 1280 px
