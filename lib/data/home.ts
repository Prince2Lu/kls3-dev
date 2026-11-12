import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  BarChart3,
  CheckCircle2,
  FileText,
  LayoutGrid,
  ListChecks,
  Play,
  Plug,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import type { ContactSource } from '@/lib/home/contact'

// Contenu texte de la homepage — repris mot pour mot de docs/maquette-lilian.html

export const homeMeta = {
  title: "KLS3 — Moins de tâches manuelles. Plus de temps pour l'essentiel.",
  description:
    'KLS3 simplifie vos processus, automatise vos opérations et crée les outils qui vont avec.',
}

export const headerNav = [
  { href: '#solutions', label: 'Solutions' },
  { href: '#realisations', label: 'Projets' },
  { href: '#methode', label: 'Méthode' },
  { href: '#financements', label: 'Aides & financements' },
  { href: '#equipe', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
]

export const headerCtas = {
  outline: 'Nous contacter',
  primary: 'Prendre un rendez-vous ↗',
}

export const hero = {
  tag: 'PROCESSUS · AUTOMATISATION · OUTILS MÉTIER',
  titleLine1: 'Moins de tâches manuelles.',
  titleLine2: "Plus de temps pour l'essentiel.",
  text: 'Documents à traiter, informations à ressaisir, relances à effectuer, outils qui ne communiquent pas…',
  smalldesc:
    'KLS3 identifie ce qui ralentit votre entreprise et conçoit les solutions pour simplifier, automatiser et piloter vos opérations.',
  primaryCta: 'Découvrir nos solutions →',
  secondaryCta: 'Voir DocFlow en action',
  benefits: [
    { icon: CheckCircle2, label: 'Des opérations plus fluides' },
    { icon: CheckCircle2, label: "Moins d'erreurs" },
    { icon: Target, label: 'Des équipes plus efficaces' },
  ] satisfies { icon: LucideIcon; label: string }[],
  screen: {
    ariaLabel: "Illustration de l'interface DocFlow",
    name: 'DocFlow',
    subtitle: 'Dossiers entrants',
    title: 'Suivi des documents',
    columns: ['Dossier', 'Document', 'État'],
    rows: [
      { id: 'DS-0142', doc: "Pièce d'identité", status: 'Validé', tone: 'ok' },
      { id: 'DS-0143', doc: 'Justificatif', status: 'Validé', tone: 'ok' },
      { id: 'DS-0144', doc: 'Facture', status: 'À vérifier', tone: 'warn' },
      { id: 'DS-0145', doc: 'Contrat', status: 'En cours', tone: 'work' },
    ] as const,
    notice: 'Données fictives · Illustration du parcours cible',
  },
}

export const problemSearch = {
  title: "Qu'est-ce qui ralentit votre entreprise ?",
  text: 'Décrivez votre difficulté en quelques mots. Nous vous aidons à identifier les pistes pour la résoudre.',
  inputLabel: 'Décrire votre problème',
  placeholder: 'Ex. : trop de documents à traiter, des relances manuelles, des outils non connectés…',
  submit: 'Trouver une solution',
  submitIcon: Search,
  chipsLabel: 'Ou explorez une situation courante :',
  chips: [
    { icon: FileText, label: 'Gérer mes documents', query: 'Je dois collecter, contrôler et suivre de nombreux documents' },
    { icon: RefreshCw, label: 'Automatiser des tâches', query: 'Mes équipes passent beaucoup de temps sur des tâches répétitives et des relances' },
    { icon: Plug, label: 'Connecter mes outils', query: 'Nos logiciels et outils ne communiquent pas entre eux' },
    { icon: AppWindow, label: 'Créer un outil métier', query: "Nous avons besoin d'une application métier adaptée à notre activité" },
  ] satisfies { icon: LucideIcon; label: string; query: string }[],
  estimateCta: "Estimer l'impact →",
  talkCta: 'En parler avec KLS3',
  notice: 'Première orientation indicative, sans analyse approfondie de votre entreprise.',
}

export const solutions = {
  tag: 'NOS SOLUTIONS',
  titleLine1: 'Nous simplifions vos processus.',
  titleLine2: 'Nous créons les outils qui vont avec.',
  offers: [
    {
      icon: FileText,
      title: 'DocFlow',
      highlight: true,
      punchline: 'Vos documents traités, sans les tâches qui vont avec.',
      text: 'Collecte, lecture, contrôle des documents et relances automatisées pour des dossiers qui avancent plus facilement.',
      cta: 'Découvrir DocFlow →',
      href: '#docflow',
    },
    {
      icon: Workflow,
      title: 'Automatisation & agents IA',
      highlight: false,
      punchline: 'Vos processus qui tournent en arrière-plan.',
      text: 'Nous connectons vos outils et mettons en place des automatisations intelligentes pour exécuter vos tâches récurrentes sans intervention manuelle systématique.',
      cta: 'En savoir plus →',
      href: '#contact',
    },
    {
      icon: LayoutGrid,
      title: 'Applications sur mesure',
      highlight: false,
      punchline: "Des outils qui s'adaptent à votre métier.",
      text: 'CRM, applications internes, portails clients ou plateformes métier : nous concevons des solutions simples, utiles et évolutives, alignées avec vos besoins.',
      cta: 'Parlons de votre projet →',
      href: '#contact',
    },
  ] satisfies {
    icon: LucideIcon
    title: string
    highlight: boolean
    punchline: string
    text: string
    cta: string
    href: string
  }[],
}

export const docflow = {
  tag: 'ZOOM SUR DOCFLOW',
  titleLine1: 'Vos documents arrivent.',
  titleLine2Start: 'Vos dossiers ',
  titleLine2Accent: 'avancent.',
  text: 'DocFlow vous aide à collecter, lire et contrôler vos documents entrants, à identifier les informations manquantes et à automatiser les relances. Vos équipes gardent la main sur les validations importantes.',
  tryCta: 'Essayer DocFlow →',
  explainCta: 'Découvrir son fonctionnement',
  notice: 'Démo illustrative avec des documents fictifs. La solution réelle est en cours de développement.',
}

export const docflowDemo = {
  name: 'DocFlow',
  subtitle: 'Simulation interactive',
  folder: 'DOSSIER DEMO-024',
  steps: ['01 Réception', '02 Lecture', '03 Contrôle', '04 Suivi'],
  stages: [
    ['Le document est reçu', 'Une pièce est ajoutée au dossier fictif du client. La collecte des documents est centralisée.'],
    ['Les informations sont extraites', 'Les champs utiles du document sont identifiés et structurés pour préparer les contrôles.'],
    ['Une vérification est nécessaire', 'Une incohérence ou une pièce manquante est signalée pour validation humaine.'],
    ['Le dossier est suivi', 'Une relance peut être préparée puis envoyée selon les règles définies et les validations nécessaires.'],
  ] as const,
  next: 'Étape suivante →',
  restartLast: 'Recommencer',
  reset: 'Recommencer',
}

export const realisations = {
  tag: 'NOS RÉALISATIONS',
  titleLine1: 'Des solutions concrètes,',
  titleLine2: 'déjà en action.',
  lead: 'Nous concevons des applications autour de besoins métier réels. Voici deux projets qui illustrent notre capacité à transformer une problématique en outil fonctionnel.',
  placeholderNote: 'Illustration — à remplacer par une capture réelle',
  projects: [
    {
      image: '/realisations/sales-os.png',
      windowTitle: 'Sales OS · Tableau de bord',
      variant: 'default',
      tag: 'PROJET KLS3',
      title: 'KLS3 Sales OS',
      punchline: 'Un outil commercial conçu autour de nos propres besoins.',
      text: 'Un CRM développé pour organiser notre prospection, centraliser les contacts, suivre les opportunités et piloter notre activité commerciale.',
      cta: 'Découvrir le projet →',
    },
    {
      image: '/realisations/calymia.png',
      windowTitle: 'Calymia · Agenda & clients',
      variant: 'well',
      tag: 'APPLICATION MÉTIER',
      title: 'Calymia',
      punchline: 'Une application pensée pour simplifier la gestion des cabinets.',
      text: 'Un outil métier destiné aux praticiens pour gérer leurs clients, leurs rendez-vous, leurs suivis et certaines communications automatisées.',
      cta: 'Découvrir le projet →',
    },
  ] as const,
}

export const methode = {
  tag: 'NOTRE MÉTHODE',
  titleLine1: 'De votre problème',
  titleLine2Start: 'à une ',
  titleLine2Accent: 'solution qui fonctionne.',
  lead: "Pas besoin d'arriver avec un cahier des charges. Nous partons de votre fonctionnement actuel pour construire une solution adaptée.",
  steps: [
    { icon: Search, number: '01', title: 'Identifier', text: 'Nous comprenons vos opérations et repérons ce qui vous ralentit.' },
    { icon: ListChecks, number: '02', title: 'Simplifier', text: 'Nous éliminons les étapes inutiles avant de penser à la technologie.' },
    { icon: Zap, number: '03', title: 'Automatiser', text: 'Nous développons et connectons les solutions adaptées à votre métier.' },
    { icon: BarChart3, number: '04', title: 'Piloter', text: 'Nous suivons les résultats et faisons évoluer la solution avec vos besoins.' },
  ] satisfies { icon: LucideIcon; number: string; title: string; text: string }[],
  noteStrong: 'Un besoin précis, une première amélioration concrète.',
  noteText: 'Nous avançons à votre rythme, sans bouleverser vos outils existants.',
}

export const simulateur = {
  tag: 'SIMULATEUR KLS3',
  titleLine1: "Estimez l'impact de vos",
  titleLine2: 'frictions opérationnelles.',
  lead: "Identifiez les ressources mobilisées par vos tâches répétitives et découvrez les pistes d'amélioration possibles.",
  domainLabel: '1. Votre domaine principal',
  domains: [
    { value: 'administratif', label: 'Administratif & documents', example: 'Ex. : collecte et contrôle de documents, classement, suivi de dossiers, relances…' },
    { value: 'commercial', label: 'Commercial & prospection', example: 'Ex. : préparation des propositions, saisies CRM, relances commerciales, suivi des opportunités…' },
    { value: 'finance', label: 'Finance & comptabilité', example: 'Ex. : rapprochements, validation des factures, reporting, ressaisies…' },
    { value: 'rh', label: 'Ressources humaines', example: 'Ex. : arrivée des collaborateurs, collecte des pièces, suivi des demandes et congés…' },
    { value: 'production', label: 'Production & opérations', example: 'Ex. : planification, suivi des interventions, contrôles qualité, tableaux de bord…' },
    { value: 'support', label: 'Service client', example: 'Ex. : tri des demandes, réponses récurrentes, transmission et suivi des tickets…' },
  ],
  hoursLabel: '2. Temps consacré chaque semaine',
  hourlyLabel: '3. Coût horaire chargé estimé',
  advancedToggle: '+ Ajouter des coûts spécifiques (facultatif)',
  extraLabel: 'Coûts supplémentaires vérifiés par an (€)',
  extraHint: "N'ajoutez pas ici des heures déjà prises en compte ci-dessus.",
  totalLabel: 'CHARGE ANNUELLE ESTIMÉE',
  annualHoursSuffix: ' heures mobilisées par an',
  baseLabel: 'Temps consacré aux tâches',
  extraBreakdownLabel: 'Coûts supplémentaires déclarés',
  totalNote: 'Ce montant représente le coût du fonctionnement actuel, pas un gain financier garanti.',
  disclaimer:
    "Hypothèse de 52 semaines par an. L'estimation dépend des chiffres renseignés, sans taux de gain arbitraire. Un diagnostic peut déterminer les améliorations réellement envisageables.",
  cta: "Identifier mes pistes d'amélioration →",
}

export const financements = {
  tag: 'AIDES & FINANCEMENTS',
  titleStart: "Votre projet mérite d'explorer ",
  titleAccent: 'toutes les possibilités.',
  lead: 'Selon votre activité, votre localisation et la nature de votre projet, des dispositifs de financement peuvent accompagner votre transformation numérique.',
  cta: 'Étudier les possibilités de financement →',
  note: "Sous réserve des critères d'éligibilité et des dispositifs en vigueur. Aucune aide n'est garantie.",
  cards: [
    { icon: Plug, title: 'Aides régionales', text: 'Selon votre implantation et votre projet.' },
    { icon: LayoutGrid, title: 'Dispositifs nationaux', text: "Selon l'activité et la nature des investissements." },
    { icon: Sparkles, title: 'Programmes européens', text: 'Pour certains projets éligibles.' },
  ] satisfies { icon: LucideIcon; title: string; text: string }[],
}

export const pourquoi = {
  tag: 'POURQUOI CHOISIR KLS3 ?',
  titleLine1: 'Un partenaire opérationnel,',
  titleLine2Start: 'engagé ',
  titleLine2Accent: 'à vos côtés.',
  lead: 'Nous combinons compréhension métier, expertise technologique et accompagnement direct pour transformer vos besoins en solutions concrètes.',
  photo: '/equipe/eric-lilian.jpg',
  team: 'Éric & Lilian',
  teamTagline: 'Une équipe. Pas une agence.',
  photoPlaceholder: "Emplacement réservé aux vraies photos de l'équipe KLS3.",
  benefits: [
    { icon: Target, title: 'Une approche orientée résultats', text: "Nous partons de vos enjeux, pas d'une technologie à vendre." },
    { icon: LayoutGrid, title: 'Une expertise transversale', text: "Processus, automatisation, intelligence artificielle et développement d'applications." },
    { icon: Users, title: 'Une équipe directement impliquée', text: 'Vous échangez avec les personnes qui portent votre projet.' },
    { icon: ShieldCheck, title: 'Des solutions adaptées à votre environnement', text: 'Vos outils, vos contraintes et vos exigences de sécurité sont pris en compte dès la conception.' },
  ] satisfies { icon: LucideIcon; title: string; text: string }[],
}

export const contactSection = {
  tag: "PASSER À L'ACTION",
  titleStart: 'Et si on parlait de ',
  titleAccent: 'votre projet ?',
  text: "Un échange sans engagement pour comprendre vos enjeux, explorer les solutions possibles et identifier les premières pistes d'action.",
  cards: [
    {
      icon: AppWindow,
      title: 'Prendre un rendez-vous',
      text: 'Échangeons sur vos besoins et vos objectifs.',
      cta: 'Demander un rendez-vous →',
      source: 'rendez-vous',
      primary: true,
    },
    {
      icon: Play,
      title: 'Demander une démonstration',
      text: 'Découvrez DocFlow en action et ses possibilités.',
      cta: 'Demander une démo →',
      source: 'demo',
      primary: false,
    },
  ] satisfies {
    icon: LucideIcon
    title: string
    text: string
    cta: string
    source: ContactSource
    primary: boolean
  }[],
}

// Titres de la modale selon le bouton cliqué (repris des libellés de la maquette)
export const contactModal: Record<ContactSource, string> = {
  'rendez-vous': 'Prendre un rendez-vous',
  demo: 'Demander une démonstration',
  recherche: 'En parler avec KLS3',
  simulateur: "Identifier mes pistes d'amélioration",
}

export const contactForm = {
  tag: 'CONTACT',
  intro: contactSection.text,
  nom: 'Nom',
  societe: 'Société',
  email: 'Email',
  telephone: 'Téléphone',
  message: 'Message',
  submit: 'Envoyer →',
  loading: 'Envoi en cours…',
  success: 'Merci, nous revenons vers vous rapidement.',
  turnstileMissing: 'Veuillez confirmer que vous êtes humain.',
  genericError: 'Une erreur est survenue',
  close: 'Fermer',
}

export const homeFooter = {
  brand: 'KLS3',
  baseline: ' · Operational Intelligence',
  copyright: '© 2026 KLS3 · Tous droits réservés',
  links: [
    { href: '#solutions', label: 'Solutions' },
    { href: '#realisations', label: 'Projets' },
    { href: '#methode', label: 'Méthode' },
    { href: '#financements', label: 'Aides' },
    { href: '#contact', label: 'Contact' },
  ],
  legal: [
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  ],
}
