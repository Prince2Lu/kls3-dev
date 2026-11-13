# Claude Code — Pages solutions + ajustements homepage

> Branche : `refonte-lilian` (ne pas toucher à `main`).
> Si la correction des deux débordements mobiles (375 px « + Ajouter des coûts spécifiques », 768 px CTA du header) n'est pas encore commitée, l'inclure dans ce lot.

## Contexte

Homepage = maquette de Lilian, déjà intégrée :
- composants dans `components/home/`, styles scopés dans `components/home/home.module.css` (classe `.root`)
- textes dans `lib/data/home.ts`
- `components/layout/HideOnHome.tsx` masque l'ancien header/footer sur `/`
- `ContactModal` (Turnstile + `/api/contact` avec `source`)

Il existe déjà une ancienne page `app/solutions/page.tsx` (ancien positionnement). Ne pas la supprimer dans ce lot ; ne pas la lier depuis la nouvelle homepage.

## 1. Ajustements homepage

1. **Menu** : remplacer le libellé « Projets » par « Réalisations » dans `headerNav` et dans `footer.links` (`lib/data/home.ts`). L'ancre reste `#realisations`.
2. **Paragraphe du hero** (`hero.smalldesc` / classe `.smalldesc`) : même taille et même interlignage que le paragraphe au-dessus (`.hero p` : 17px, line-height 1.8). Garder le gras (600) et la couleur blanche. Ne rien changer d'autre.
3. **H1 et H2 −15 %** dans `home.module.css`, y compris les surcharges :
   - `.root h1` : `clamp(40px,4.8vw,72px)` → `clamp(34px,4.08vw,61px)`
   - `.root h2` : `clamp(31px,3.8vw,54px)` → `clamp(26px,3.23vw,46px)`
   - `.root .searchbox h2` : `29px` → `25px`
   - mobile (≤760px) : `.root .hero h1` `42px` → `36px` ; `.root .searchbox h2` `24px` → `20px` ; `.root .dialog h2` `24px` → `20px`
   - Les mêmes réductions s'appliquent aux 3 nouvelles pages (elles utilisent le même module CSS).

## 2. Trois pages solutions

Routes :
- `app/solutions/docflow/page.tsx`
- `app/solutions/agents-ia/page.tsx`
- `app/solutions/sur-mesure/page.tsx`

### Règles communes
- Même langage visuel que la homepage : `HomeHeader`, `HomeFooter`, `ContactModal`, wrapper `.root` de `home.module.css`, mêmes classes (`section`, `wrap`, `tag`, `title-space`, `lead`, `card`, `grid3`, `btn`…). Pas de nouveau design system.
- Créer un composant de gabarit réutilisable `components/solutions/SolutionPage.tsx` + contenu dans `lib/data/solutions.ts` (un objet par page). Les 3 pages ne font qu'appeler le gabarit avec leur contenu.
- Structure du gabarit (sections dans cet ordre) :
  1. **Hero** sombre (même style que le hero home, sans le mockup) : tag, H1, intro, 2 boutons
  2. **Le problème** : titre + paragraphe
  3. **Ce que nous mettons en place** : grille de cartes (icône Lucide + titre + texte)
  4. **Pour quels besoins / Cas d'usage** : liste ou grille
  5. **Comment ça se passe** : 4 étapes (même rendu que la section Méthode de la home)
  6. **Bloc spécifique** (optionnel selon la page, voir contenu)
  7. **Questions fréquentes** : accordéon `<details>/<summary>` accessible
  8. **Bandeau CTA** final (même rendu que la section Contact de la home)
- Les boutons « Demander un rendez-vous » / « Demander une démonstration » ouvrent `ContactModal` avec `source` = `'rendez-vous'` ou `'demo'`.
- **Navigation depuis ces pages** : les ancres du header/footer doivent pointer vers la home (`/#solutions`, `/#realisations`, etc.). Ajouter à `HomeHeader` et `HomeFooter` une prop `base` (`''` sur la home, `'/'` ailleurs) pour préfixer les ancres. Le logo renvoie vers `/`.
- **Menu Solutions** : transformer l'entrée « Solutions » du header en menu déroulant (desktop : au survol et au clic, accessible clavier ; mobile : sous-liste dépliée) avec : DocFlow → `/solutions/docflow`, Agents IA → `/solutions/agents-ia`, Sur mesure → `/solutions/sur-mesure`, et « Toutes nos solutions » → `/#solutions`.
- **Liens depuis la home** (`solutions.offers` dans `lib/data/home.ts`) :
  - DocFlow : CTA « Découvrir DocFlow → » → `/solutions/docflow`
  - Automatisation & agents IA : « En savoir plus → » → `/solutions/agents-ia`
  - Applications sur mesure : « Parlons de votre projet → » → `/solutions/sur-mesure`
  - Le bouton hero « Voir DocFlow en action » reste sur `#docflow`.
- `HideOnHome` : masquer aussi l'ancien header/footer sur `/solutions/docflow`, `/solutions/agents-ia`, `/solutions/sur-mesure`.
- SEO : `pageMetadata(title, description, { path })` pour chaque page ; ajouter les 3 URLs dans `app/sitemap.ts`. Ajouter un JSON-LD `Service` par page (même pattern que l'existant s'il y en a un, sinon `@type: Service`, `provider: Organization KLS3`).
- Texte **mot pour mot** comme ci-dessous. Les passages marqués `[À VALIDER]` sont à mettre tels quels dans le code avec un commentaire `// TODO: à valider par Eric/Lilian` (sans le marqueur visible à l'écran).
- Aucun chiffre, statistique ou témoignage inventé.

---

### Page DocFlow — `/solutions/docflow`

- **Meta title** : DocFlow — Collecte, contrôle et relance de vos documents | KLS3
- **Meta description** : DocFlow collecte, lit et contrôle vos documents entrants, repère les pièces manquantes et automatise les relances. Vos équipes gardent la main sur les validations.

**Hero**
- Tag : SOLUTION · DOCFLOW
- H1 : Vos documents traités, sans les tâches qui vont avec.
- Intro : DocFlow collecte, lit et contrôle les documents que vous recevez, repère ce qui manque et relance à votre place. Vos équipes ne gardent que les validations qui comptent.
- Boutons : « Demander une démonstration » (modale, source demo) · « Voir la démo interactive » (→ `/#docflow`)

**Le problème**
- Titre : Un dossier n'avance que si quelqu'un pense à le relancer.
- Texte : Pièces manquantes, justificatifs périmés, documents mal nommés, relances envoyées à la main, vérifications ligne par ligne… La collecte de documents mobilise vos équipes sur des tâches sans valeur ajoutée, et chaque oubli retarde le dossier.

**Ce que fait DocFlow** (4 cartes)
1. `Inbox` — **Réception** — Un espace unique où vos clients déposent leurs pièces. La collecte est centralisée, chaque document est rattaché au bon dossier.
2. `ScanText` — **Lecture** — Les informations utiles sont extraites et structurées automatiquement : noms, dates, montants, références.
3. `ShieldCheck` — **Contrôle** — Pièces manquantes, dates dépassées, incohérences : les anomalies sont signalées pour validation humaine.
4. `RefreshCw` — **Suivi** — Les relances partent selon les règles que vous définissez, jusqu'à ce que le dossier soit complet.

**Pour quels dossiers ?** (liste)
- Ouverture de dossier client et onboarding
- Conformité et KYC : pièces d'identité, justificatifs, documents de société
- Dossiers récurrents : clôtures, déclarations, renouvellements
- Arrivée de nouveaux collaborateurs
- Tout processus où vous attendez des documents de vos clients, fournisseurs ou équipes

**Comment ça se passe** (4 étapes)
1. **Diagnostic** — Nous analysons avec vous un type de dossier et les pièces qu'il exige. *(Mention : Offert)*
2. **Paramétrage** — Nous configurons les pièces attendues, les contrôles et le rythme des relances.
3. **Pilote** — DocFlow traite vos premiers dossiers réels, vos équipes valident les résultats.
4. **Déploiement** — Nous étendons à d'autres types de dossiers et ajustons dans le temps.

**Bloc spécifique — Vous gardez la main** (3 points)
- Validation humaine sur les points sensibles : rien n'est accepté ou rejeté sans règle claire.
- Autour de vos outils existants : DocFlow s'intègre à votre environnement, sans tout remplacer.
- Traçabilité : chaque pièce reçue et chaque relance envoyée sont historisées.
- Note sous le bloc : `[À VALIDER]` DocFlow est en cours de développement. Nous le déployons avec nos premières entreprises pilotes.

**FAQ**
- *Faut-il changer de logiciel ?* — Non. DocFlow s'ajoute à vos outils actuels et prend en charge la collecte, le contrôle et les relances.
- *Qui valide les documents ?* — Vos équipes. DocFlow prépare et signale ; les décisions importantes restent humaines.
- *Comment démarrer ?* — Par un diagnostic offert sur un type de dossier. Nous identifions ensemble ce que DocFlow peut prendre en charge.

**CTA final**
- Titre : Voyons DocFlow sur vos propres dossiers.
- Texte : Une démonstration à partir d'un cas concret de votre activité.
- Boutons : « Demander une démonstration » (modale, demo) · « Prendre un rendez-vous » (modale, rendez-vous)

---

### Page Agents IA — `/solutions/agents-ia`

- **Meta title** : Agents IA et automatisation des tâches récurrentes | KLS3
- **Meta description** : KLS3 connecte vos outils et met en place des agents IA et des automatisations qui exécutent vos tâches récurrentes, avec des contrôles adaptés.

**Hero**
- Tag : SOLUTION · AGENTS IA
- H1 : Vos processus qui tournent en arrière-plan.
- Intro : Nous connectons vos outils et mettons en place des agents IA et des automatisations pour exécuter vos tâches récurrentes, sans intervention manuelle systématique.
- Boutons : « Prendre un rendez-vous » (modale, rendez-vous) · « Estimer l'impact » (→ `/#simulateur`)

**Le problème**
- Titre : Vos équipes passent leurs journées à faire le lien entre vos outils.
- Texte : Copier une information d'un logiciel à l'autre, trier les e-mails, relancer, compiler des chiffres pour le reporting… Ces tâches sont nécessaires, mais elles ne demandent pas votre expertise. Elles peuvent tourner sans vous.

**Ce qu'un agent peut faire pour vous** (6 cartes)
1. `Mail` — **Trier vos e-mails entrants** — Classer les demandes, extraire les informations utiles et préparer les réponses. Vous validez avant envoi.
2. `Plug` — **Synchroniser vos outils** — Une information saisie une fois, mise à jour partout : CRM, comptabilité, agenda, tableurs.
3. `RefreshCw` — **Relancer automatiquement** — Clients, fournisseurs ou collaborateurs : les relances partent au bon moment, selon vos règles.
4. `BarChart3` — **Produire vos reportings** — Les chiffres sont collectés et mis en forme sans compilation manuelle.
5. `MessageSquare` — **Répondre aux questions récurrentes** — Un assistant qui s'appuie sur vos documents pour répondre à vos clients ou à vos équipes.
6. `FileText` — **Préparer vos documents** — Propositions, comptes rendus, courriers : générés à partir de vos modèles et de vos données.

**Pour quels besoins ?** (liste)
- Administratif et gestion des dossiers
- Commercial et suivi des prospects
- Finance : factures, rapprochements, reporting
- Ressources humaines : arrivées, demandes, suivis
- Service client : tri et réponses aux demandes récurrentes

**Comment ça se passe** (4 étapes)
1. **Identifier** — Nous repérons les tâches répétitives qui mobilisent le plus de temps. *(Mention : Diagnostic offert)*
2. **Simplifier** — Nous supprimons les étapes inutiles avant d'automatiser.
3. **Installer** — Nous mettons en place l'agent sur vos outils et le testons avec vos équipes.
4. **Suivre** — Nous surveillons, ajustons et faisons évoluer l'agent avec vos besoins.

**Bloc spécifique — Des agents sous contrôle** (3 points)
- Validation humaine là où c'est nécessaire : l'agent prépare, vous décidez.
- Accès limités au strict nécessaire sur vos outils.
- Chaque action est tracée et peut être vérifiée.
- Note sous le bloc : `[À VALIDER]` Mise en place, puis abonnement mensuel incluant le suivi, la maintenance et les évolutions.

**FAQ**
- *Faut-il des compétences techniques en interne ?* — Non. Nous installons, paramétrons et suivons l'agent. Vos équipes l'utilisent dans leurs outils habituels.
- *Que se passe-t-il si l'agent se trompe ?* — Les étapes sensibles passent par une validation humaine, et chaque action est tracée pour être corrigée rapidement.
- *Par quoi commencer ?* — Par une tâche précise, fréquente et chronophage. Un premier résultat concret avant d'aller plus loin.

**CTA final**
- Titre : Quelle tâche aimeriez-vous ne plus faire ?
- Texte : Un échange sans engagement pour identifier ce qu'un agent peut prendre en charge chez vous.
- Boutons : « Prendre un rendez-vous » (modale, rendez-vous) · « Estimer l'impact » (→ `/#simulateur`)

---

### Page Sur mesure — `/solutions/sur-mesure`

- **Meta title** : Applications métier sur mesure : CRM, portails, outils internes | KLS3
- **Meta description** : CRM, applications internes, portails clients ou plateformes métier : KLS3 conçoit des solutions simples, utiles et évolutives, alignées avec vos besoins.

**Hero**
- Tag : SOLUTION · SUR MESURE
- H1 : Des outils qui s'adaptent à votre métier.
- Intro : CRM, applications internes, portails clients ou plateformes métier : quand aucun logiciel du marché ne colle à votre façon de travailler, nous concevons celui qui vous manque.
- Boutons : « Parlons de votre projet » (modale, rendez-vous) · « Voir nos réalisations » (→ `/#realisations`)

**Le problème**
- Titre : Vos outils vous imposent leur façon de travailler.
- Texte : Tableurs empilés, logiciels qui ne couvrent qu'une partie du besoin, informations dispersées, contournements à chaque étape… Quand l'outil ne correspond pas au métier, ce sont vos équipes qui compensent.

**Ce que nous construisons** (4 cartes)
1. `Users` — **CRM et outils commerciaux** — Suivi des contacts, des opportunités et de l'activité commerciale, adapté à votre cycle de vente.
2. `AppWindow` — **Applications internes** — Les outils qui structurent vos opérations quotidiennes : planification, suivi des dossiers, gestion des demandes.
3. `LayoutGrid` — **Portails clients** — Un espace où vos clients déposent leurs documents, suivent leur dossier et échangent avec vous.
4. `BarChart3` — **Tableaux de bord de pilotage** — Vos indicateurs réunis au même endroit, à jour, sans compilation manuelle.

**Quand le sur mesure a du sens** (liste)
- Votre activité repose sur des tableurs devenus difficiles à maintenir
- Aucun logiciel du marché ne couvre vos processus sans contournements
- Vos clients ou partenaires ont besoin d'un accès dédié à leurs informations
- Vous voulez réunir plusieurs outils en un seul

**Bloc spécifique — Nos réalisations** : réutiliser les 2 projets de `realisations.projects` (Sales OS, Calymia) avec le même rendu que la home, sans le lien « Découvrir le projet ».

**Comment ça se passe** (4 étapes)
1. **Cadrer** — Nous partons de vos usages réels, pas d'une liste de fonctionnalités. *(Mention : Diagnostic offert)*
2. **Prototyper** — Une première version cliquable pour valider avec vos équipes avant de développer.
3. **Développer** — Livraison par étapes, chaque étape testée avec les utilisateurs.
4. **Faire évoluer** — Maintenance, évolutions et accompagnement dans la durée.

**FAQ**
- *Faut-il un cahier des charges ?* — Non. Nous construisons le besoin avec vous à partir de votre fonctionnement actuel.
- *Combien coûte un projet sur mesure ?* — Chaque projet est chiffré après le diagnostic, en fonction du périmètre. Nous privilégions une première version utile rapidement, puis des évolutions par étapes.
- *L'outil peut-il se connecter à nos logiciels existants ?* — Oui, c'est même l'objectif : s'intégrer à votre environnement plutôt que tout remplacer.

**CTA final**
- Titre : Et si on parlait de votre projet ?
- Texte : Un échange sans engagement pour comprendre vos enjeux et identifier la bonne solution.
- Boutons : « Parlons de votre projet » (modale, rendez-vous) · « Demander une démonstration » (modale, demo)

---

## Contraintes
- Ne pas toucher à `/blog`, `/demo`, `/diagnostic`, `/a-propos`, `/contact`, ni au pipeline n8n.
- `'use client'` uniquement là où il y a de l'interaction (menu déroulant, modale, FAQ si besoin).
- Responsive : vérifier à 375, 768 et 1280 px, aucun débordement horizontal.
- Pas de nouvelle dépendance.

## Vérification et git
- Build : `npx next build --webpack` (Turbopack ne tourne pas sur ce Mac).
- Puis :
```bash
git add .
git commit -m "feat: pages solutions DocFlow, Agents IA, Sur mesure + ajustements homepage"
git pull origin refonte-lilian --no-rebase
git push origin refonte-lilian
```

## Définition de "done"
- [ ] « Réalisations » remplace « Projets » dans le header et le footer
- [ ] Le paragraphe « KLS3 identifie… » a la même taille que le texte au-dessus, en gras
- [ ] H1 et H2 réduits de 15 % (desktop et mobile), sur la home et les 3 pages
- [ ] `/solutions/docflow`, `/solutions/agents-ia`, `/solutions/sur-mesure` répondent, avec le wording ci-dessus mot pour mot
- [ ] Menu « Solutions » déroulant fonctionnel (souris, clavier, mobile)
- [ ] Les 3 cartes Solutions de la home pointent vers leur page
- [ ] Depuis une page solution, les liens du menu ramènent aux bonnes sections de la home
- [ ] Modale de contact fonctionnelle sur les 3 pages avec la bonne `source`
- [ ] 3 URLs ajoutées au sitemap ; metadata et JSON-LD présents
- [ ] Build OK, push sur `refonte-lilian`
