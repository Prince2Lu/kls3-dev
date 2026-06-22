# Changelog — kls3.dev

## 2026-06-20 — Refonte design Homepage

### 🎨 Changements visuels majeurs

#### 1. Arrière-plan
- ❌ **Supprimé** : 3 orbes flous violet/cyan/vert
- ✅ **Ajouté** : Grille géométrique subtile (lignes fines rgba(255,255,255,0.04))
- ✅ **Conservé** : 1 petit orbe cyan discret en haut à droite (64px, opacity 15%)

#### 2. Hero Layout
**Avant** : Layout centré, colonnes simples
**Après** : Layout 2 colonnes (desktop)

**Colonne gauche** :
- Contenu aligné à gauche (plus centré)
- Badge "Disponible"
- H1 avec font-weight 700
- Taille H1 : 64px sur desktop (4rem)
- Sous-titre et CTAs alignés à gauche
- Stats avec chiffres en vert (#10b981)

**Colonne droite** (hidden sur mobile) :
- Carte glassmorphism flottante
- Preview des 3 offres avec icônes et couleurs
- Effet hover scale sur la carte
- Animation stagger sur les items

#### 3. Badge "Disponible"
- ❌ **Avant** : Bordure grise subtle, texte gris
- ✅ **Après** :
  - Bordure cyan (#0ea5e9) avec opacity 40%
  - Texte cyan (#0ea5e9)
  - Point pulsant cyan (au lieu de violet)

#### 4. Typographie H1
- Font-weight : 700 (au lieu de bold standard)
- Taille desktop : 64px (4rem) vs 56px avant
- Line-height : 1.1 (plus serré)

#### 5. CTA principal
- ❌ **Avant** : `rounded-full` (pill shape)
- ✅ **Après** : `rounded-lg` (8px, plus carré)

#### 6. Stats (10+, 30+, 3)
- ❌ **Avant** : Texte blanc (`text-foreground`)
- ✅ **Après** : Vert (#10b981) via classe `text-brand-green`
- Taille augmentée : `text-4xl` au lieu de `text-3xl`

#### 7. Navbar
- ✅ **Ajouté** : Border-bottom avec gradient violet→cyan→vert
- Position : absolute en bas de la nav
- Hauteur : 1px
- Opacité : 60%

### 📁 Fichiers modifiés

1. **`components/sections/Hero.tsx`**
   - Layout passé de centré à grid 2 colonnes
   - Arrière-plan avec grid pattern géométrique
   - Ajout carte preview offres (colonne droite)
   - Stats en vert avec classe `text-brand-green`

2. **`components/ui/GradientBadge.tsx`**
   - Border : `border-brand-cyan/40` au lieu de `border-dark-border-subtle`
   - Texte : `text-brand-cyan` au lieu de `text-foreground/80`
   - Point pulsant : `bg-brand-cyan` au lieu de `bg-brand-purple`

3. **`components/layout/Navbar.tsx`**
   - Ajout div gradient en absolute bottom
   - Classes : `bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-green opacity-60`

### ✅ Tests effectués

- ✅ Build production sans erreurs
- ✅ TypeScript strict mode OK
- ✅ Animations Framer Motion fonctionnelles
- ✅ Layout responsive (mobile/tablet/desktop)

### 🎯 Impact design

**Différenciation** :
- Design plus épuré avec grid pattern vs orbes
- Asymétrie gauche/droite plus moderne
- Vert plus présent (stats)
- Cyan comme couleur d'accent principale (badge)
- Gradient tricolore sur navbar (signature visuelle)

**Améliorations UX** :
- Carte preview offres = appel à l'action visuel
- Layout left-aligned = lecture plus naturelle
- CTAs moins "pill" = look plus pro/corporate

---

## Version précédente (2026-06-19)

### Création initiale
- Site vitrine complet 7 pages
- Design dark avec glassmorphism
- Intégration Notion + Resend
- Animations Framer Motion
- SEO optimisé
