# Claude Code — Appliquer le design system V5 (validé Eric & Lilian)

> Branche : `refonte-lilian`. Ne pas toucher à `main`.
> Référence visuelle : `docs/maquette-v5.html` (maquette validée, format x-dc : lire le HTML et les styles inline, ignorer la syntaxe `{{…}}`, `<sc-for>`, `<sc-if>` et le script DCLogic).

## Objectif

Appliquer à la homepage **et aux 3 pages solutions** (`/solutions/docflow`, `/solutions/agents-ia`, `/solutions/sur-mesure`) le design system V5 : même structure, même wording, même comportement qu'aujourd'hui, mais avec la nouvelle charte. Le wording actuel (`lib/data/home.ts`, `lib/data/solutions.ts`) ne change pas, sauf l'ajout du bandeau « virage » (§4).

## 1. Tokens

Ajouter dans `components/home/home.module.css` (variables sur `.root`) et dans `tailwind.config.ts` (namespace `kls`) :

| Token | Valeur | Usage |
|---|---|---|
| `--ink` | `#12112d` | texte principal, bandeaux sombres, hero |
| `--ink-deep` | `#0b0b1f` | footer |
| `--paper` | `#FAFAF8` | fond de page |
| `--paper-2` | `#F3F3F7` | sections alternées (Méthode, Pourquoi), fonds de placeholders |
| `--line` | `#E6E5EE` | bordures de cartes et séparateurs |
| `--line-strong` | `#C9CAD6` / `#D7D6E2` | bordures de champs, boutons outline |
| `--text-2` | `#4F5368` | texte secondaire |
| `--text-3` | `#6B6E85` | mentions, notes |
| `--on-dark` | `#B9BBD3` | texte secondaire sur fond sombre |
| `--blue` | `#4B7BF5` | **couleur de sens** : ce qui avance / est gagné / validé |
| `--blue-text` | `#3A63D8` | bleu pour texte et liens sur fond clair (contraste) |
| `--warn` | `#9A5B00` | statut « à vérifier » |
| `--cta` | `linear-gradient(110deg,#7139fa,#4B7BF5)` | **uniquement** boutons principaux |

Règle : le violet n'existe plus que dans le dégradé des boutons principaux et dans le logo. Supprimer tous les autres violets (`#7139fa`, `#9c61ff`, `#eee4ff`, `#5725d7`, `#ac71ff`…), halos, `radial-gradient` décoratifs, ombres colorées, et le `transform: perspective(...)` du mockup hero.

## 2. Typographie

- **Syne** : titres. Charger en variable : `family=Syne:wght@400..800`.
- **Inter** : texte (inchangé).
- **JetBrains Mono** (nouveau, Google Fonts `wght@400;500;600`) : labels de section, numéros (01, 02…), identifiants (DS-0142), statuts, étapes de la démo DocFlow, valeurs et résultats du simulateur, légendes « Données fictives ».
- Labels de section : remplacer la pastille `.tag` par un label mono : `font-family: JetBrains Mono; 11.5px; 500; letter-spacing .12em; uppercase; color var(--text-2)` (sur fond sombre : `var(--on-dark)`), précédé du **motif logo** (§3).
- Tailles conservées (déjà −15 %) : h1 `clamp(34px,4.08vw,61px)`, h2 `clamp(26px,3.23vw,46px)`, letter-spacing titres `-.04em`.
- **Wordmark « KLS3 »** (header + footer + `HomeHeader` des pages solutions) : Syne **700**, `letter-spacing: -0.02em`, le **« 3 » en `#4B7BF5`**.

## 3. Motif logo

- Logo header : `components/ui/Logo.tsx` (le vrai logo, 1 nœud à gauche relié à 2 nœuds à droite, dégradé violet→bleu). Ne pas le modifier.
- Créer `components/ui/LogoMotif.tsx` : même géométrie que le logo (`viewBox 0 0 40 40`, cercles en (8,20), (28,7), (28,33), traits entre les 3), taille 16px, **sans dégradé** :
  - variante `light` : traits `#C9CAD6`, nœud gauche `#9496AE`, nœuds droits `#4B7BF5`
  - variante `dark` : traits `#6E70A0`, nœud gauche `#B9BBD3`, nœuds droits `#4B7BF5`
- Utilisation : devant chaque label de section, et en coin haut-droit (`position:absolute; top:18px; right:18px`) de la carte de recherche « Qu'est-ce qui ralentit votre entreprise ? ».

## 4. Composants et sections

- **Hero** : fond `--ink` en aplat (plus de halos ni d'ellipse décorative). « Plus de temps pour l'essentiel. » en blanc avec **surligneur** :
  `background: linear-gradient(transparent 62%, rgba(75,123,245,.55) 62%, rgba(75,123,245,.55) 92%, transparent 92%)`.
  Bénéfices du hero en mono 12px avec puce `●` bleue. Mockup DocFlow : carte blanche droite, statuts en mono (`✓ Validé` bleu, `! À vérifier` warn, `… En cours` gris).
- **Bandeau « virage »** (NOUVEAU), entre la recherche et Solutions, fond `--ink`, `margin-top: 72px`, padding 80px :
  - label (dark) : `Le virage est engagé`
  - titre (Syne 700, `clamp(26px,3vw,42px)`) : « L'IA ne remplacera pas votre entreprise. » + retour ligne + « Une entreprise qui s'en sert, si. » (surligneur)
  - texte à droite : « Le virage est déjà engagé. La question n'est plus de savoir si vous allez le prendre, mais quand, et avec quelle avance. Il faut du courage pour changer une organisation qui fonctionne. Il en faut moins pour commencer par une seule tâche. »
  - bouton principal : « Commencer par un diagnostic offert → » → ouvre `ContactModal` (`source: 'rendez-vous'`)
- **Bandeau manifeste 1** (après Solutions), fond `--ink` : « Nous partons de vos enjeux, » + « pas d'une technologie à vendre. » (surligneur) ; à droite : « Pas besoin d'arriver avec un cahier des charges. Nous partons de votre fonctionnement actuel pour construire une solution adaptée. »
- **Bandeau manifeste 2** (après Simulateur, avant Financements), fond `--ink` : « Un besoin précis, » + « une première amélioration concrète. » (surligneur) ; à droite : « Nous avançons à votre rythme, sans bouleverser vos outils existants. » — retirer la `method-note` de la section Méthode (même texte).
- **Cartes** : fond blanc, bordure `--line`, radius 14px, pas d'ombre. Carte DocFlow (Solutions) : bordure bleue + `box-shadow: inset 0 3px 0 #4B7BF5`. Remplacer les icônes des cartes Solutions, Financements et Pourquoi par des numéros mono (`01 · PRODUIT`, `02 · ACCOMPAGNEMENT`, `03 · SUR MESURE` ; `RÉG` / `NAT` / `EU` ; `01`…`04`).
- **Méthode** : fond `--paper-2`, ligne horizontale 2px `#C9CAD6` reliant 4 points de 14px (`--ink`, le dernier en `--blue`), numéros mono bleus.
- **Démo DocFlow** : en-tête de carte `--ink`, onglets d'étapes en mono (actif `--ink`, passés bordure bleue, à venir gris), barre de progression bleue 6px.
- **Simulateur** : panneau résultat fond `--ink`, montant et heures en mono, lignes de détail en mono ; exemple de domaine avec `border-left: 2px solid var(--blue)`.
- **Pourquoi** : bloc « Éric & Lilian / Une équipe. Pas une agence. » en fond `--ink`.
- **Contact** : fond `--ink`, « votre projet ? » surligné ; carte Rendez-vous blanche, carte Démo outline.
- **Boutons** : radius 10px ; principal = `--cta` blanc ; outline clair = bordure `--line-strong` ; outline sombre = bordure `#5A5C7A` texte blanc. Hover : `translateY(-1px)`.
- **Header** : fond `--paper`, bordure basse `--line`, liens `--ink` (hover `--blue-text`), CTA principal en dégradé.

## 5. Pages solutions

Le gabarit `components/solutions/SolutionPage.tsx` reprend les mêmes règles : hero `--ink` + surligneur sur une partie du H1 (la fin de phrase), labels mono + motif, cartes numérotées en mono (garder les icônes Lucide à 18px en `--blue-text` à côté du numéro), bloc « Vous gardez la main » / « Des agents sous contrôle » en bandeau `--ink`, FAQ sur `--paper-2`.

## Contraintes
- Aucun changement de wording hors bandeau « virage ».
- Accessibilité : texte bleu sur fond clair en `#3A63D8` (pas `#4B7BF5`), contraste ≥ 4.5:1 ; focus visibles conservés.
- Pas de nouvelle dépendance npm (fonts via le `<link>` Google Fonts existant).
- Ne pas toucher à `/blog`, `/demo`, `/diagnostic`, `/a-propos`, `/contact`.
- Mettre à jour `CLAUDE.md` : section « Design system » avec les tokens ci-dessus, la règle « bleu = couleur de sens », et le wordmark KLS3 (Syne 700, 3 en #4B7BF5).

## Vérification et git
- `npx next build --webpack`
- Vérifier à 375 / 768 / 1280 px : aucun débordement, home + 3 pages.
```bash
git add .
git commit -m "feat: design system V5 (charte validée) sur home et pages solutions"
git pull origin refonte-lilian --no-rebase
git push origin refonte-lilian
```

## Définition de "done"
- [ ] Plus aucun violet hors dégradé des CTA principaux et logo
- [ ] JetBrains Mono chargée et utilisée sur labels, numéros, statuts, simulateur
- [ ] Motif logo (bonne orientation : 1 nœud à gauche, 2 à droite) devant chaque label de section
- [ ] Wordmark KLS3 en Syne 700 avec le 3 bleu
- [ ] Bandeau « virage » + 2 bandeaux manifestes en place
- [ ] Rendu conforme à `docs/maquette-v5.html` sur la home et cohérent sur les 3 pages solutions
- [ ] CLAUDE.md mis à jour ; build OK ; push sur `refonte-lilian`
