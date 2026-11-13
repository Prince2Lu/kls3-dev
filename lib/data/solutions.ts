import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  BarChart3,
  CodeXml,
  FileText,
  FlaskConical,
  Inbox,
  LayoutGrid,
  ListChecks,
  Mail,
  MessageSquare,
  PenTool,
  Plug,
  RefreshCw,
  Rocket,
  ScanText,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import type { ContactSource } from '@/lib/home/contact'

// Contenu des pages /solutions/* — repris mot pour mot du prompt « pages solutions »

export type SolutionAction =
  | { label: string; source: ContactSource }
  | { label: string; href: string }

export type SolutionPageContent = {
  slug: 'docflow' | 'agents-ia' | 'sur-mesure'
  meta: { title: string; description: string }
  service: { name: string; serviceType: string }
  hero: { tag: string; title: string; intro: string; actions: [SolutionAction, SolutionAction] }
  problem: { title: string; text: string }
  features: {
    title: string
    cards: { icon: LucideIcon; title: string; text: string }[]
  }
  needs: { title: string; items: string[] }
  steps: { icon: LucideIcon; number: string; title: string; text: string; mention?: string }[]
  // Bloc spécifique : liste de points (DocFlow, Agents IA) ou réalisations (Sur mesure)
  specific?:
    | { kind: 'points'; title: string; points: string[]; note?: string }
    | { kind: 'realisations'; title: string }
  faq: { question: string; answer: string }[]
  cta: { title: string; text: string; actions: [SolutionAction, SolutionAction] }
}

export const solutionSections = {
  problemTag: 'LE PROBLÈME',
  stepsTitle: 'Comment ça se passe',
  faqTitle: 'Questions fréquentes',
}

export const docflowPage: SolutionPageContent = {
  slug: 'docflow',
  meta: {
    title: 'DocFlow — Collecte, contrôle et relance de vos documents | KLS3',
    description:
      'DocFlow collecte, lit et contrôle vos documents entrants, repère les pièces manquantes et automatise les relances. Vos équipes gardent la main sur les validations.',
  },
  service: { name: 'DocFlow', serviceType: 'Collecte, contrôle et relance de documents' },
  hero: {
    tag: 'SOLUTION · DOCFLOW',
    title: 'Vos documents traités, sans les tâches qui vont avec.',
    intro:
      'DocFlow collecte, lit et contrôle les documents que vous recevez, repère ce qui manque et relance à votre place. Vos équipes ne gardent que les validations qui comptent.',
    actions: [
      { label: 'Demander une démonstration', source: 'demo' },
      { label: 'Voir la démo interactive', href: '/#docflow' },
    ],
  },
  problem: {
    title: "Un dossier n'avance que si quelqu'un pense à le relancer.",
    text: 'Pièces manquantes, justificatifs périmés, documents mal nommés, relances envoyées à la main, vérifications ligne par ligne… La collecte de documents mobilise vos équipes sur des tâches sans valeur ajoutée, et chaque oubli retarde le dossier.',
  },
  features: {
    title: 'Ce que fait DocFlow',
    cards: [
      {
        icon: Inbox,
        title: 'Réception',
        text: 'Un espace unique où vos clients déposent leurs pièces. La collecte est centralisée, chaque document est rattaché au bon dossier.',
      },
      {
        icon: ScanText,
        title: 'Lecture',
        text: 'Les informations utiles sont extraites et structurées automatiquement : noms, dates, montants, références.',
      },
      {
        icon: ShieldCheck,
        title: 'Contrôle',
        text: 'Pièces manquantes, dates dépassées, incohérences : les anomalies sont signalées pour validation humaine.',
      },
      {
        icon: RefreshCw,
        title: 'Suivi',
        text: "Les relances partent selon les règles que vous définissez, jusqu'à ce que le dossier soit complet.",
      },
    ],
  },
  needs: {
    title: 'Pour quels dossiers ?',
    items: [
      'Ouverture de dossier client et onboarding',
      "Conformité et KYC : pièces d'identité, justificatifs, documents de société",
      'Dossiers récurrents : clôtures, déclarations, renouvellements',
      'Arrivée de nouveaux collaborateurs',
      'Tout processus où vous attendez des documents de vos clients, fournisseurs ou équipes',
    ],
  },
  steps: [
    {
      icon: Search,
      number: '01',
      title: 'Diagnostic',
      text: "Nous analysons avec vous un type de dossier et les pièces qu'il exige.",
      mention: 'Offert',
    },
    {
      icon: SlidersHorizontal,
      number: '02',
      title: 'Paramétrage',
      text: 'Nous configurons les pièces attendues, les contrôles et le rythme des relances.',
    },
    {
      icon: FlaskConical,
      number: '03',
      title: 'Pilote',
      text: 'DocFlow traite vos premiers dossiers réels, vos équipes valident les résultats.',
    },
    {
      icon: Rocket,
      number: '04',
      title: 'Déploiement',
      text: "Nous étendons à d'autres types de dossiers et ajustons dans le temps.",
    },
  ],
  specific: {
    kind: 'points',
    title: 'Vous gardez la main',
    points: [
      'Validation humaine sur les points sensibles : rien n\'est accepté ou rejeté sans règle claire.',
      "Autour de vos outils existants : DocFlow s'intègre à votre environnement, sans tout remplacer.",
      'Traçabilité : chaque pièce reçue et chaque relance envoyée sont historisées.',
    ],
    // TODO: à valider par Eric/Lilian
    note: 'DocFlow est en cours de développement. Nous le déployons avec nos premières entreprises pilotes.',
  },
  faq: [
    {
      question: 'Faut-il changer de logiciel ?',
      answer:
        "Non. DocFlow s'ajoute à vos outils actuels et prend en charge la collecte, le contrôle et les relances.",
    },
    {
      question: 'Qui valide les documents ?',
      answer: 'Vos équipes. DocFlow prépare et signale ; les décisions importantes restent humaines.',
    },
    {
      question: 'Comment démarrer ?',
      answer:
        'Par un diagnostic offert sur un type de dossier. Nous identifions ensemble ce que DocFlow peut prendre en charge.',
    },
  ],
  cta: {
    title: 'Voyons DocFlow sur vos propres dossiers.',
    text: "Une démonstration à partir d'un cas concret de votre activité.",
    actions: [
      { label: 'Demander une démonstration', source: 'demo' },
      { label: 'Prendre un rendez-vous', source: 'rendez-vous' },
    ],
  },
}

export const agentsIaPage: SolutionPageContent = {
  slug: 'agents-ia',
  meta: {
    title: 'Agents IA et automatisation des tâches récurrentes | KLS3',
    description:
      'KLS3 connecte vos outils et met en place des agents IA et des automatisations qui exécutent vos tâches récurrentes, avec des contrôles adaptés.',
  },
  service: { name: 'Agents IA et automatisation', serviceType: 'Automatisation des tâches récurrentes' },
  hero: {
    tag: 'SOLUTION · AGENTS IA',
    title: 'Vos processus qui tournent en arrière-plan.',
    intro:
      'Nous connectons vos outils et mettons en place des agents IA et des automatisations pour exécuter vos tâches récurrentes, sans intervention manuelle systématique.',
    actions: [
      { label: 'Prendre un rendez-vous', source: 'rendez-vous' },
      { label: "Estimer l'impact", href: '/#simulateur' },
    ],
  },
  problem: {
    title: 'Vos équipes passent leurs journées à faire le lien entre vos outils.',
    text: "Copier une information d'un logiciel à l'autre, trier les e-mails, relancer, compiler des chiffres pour le reporting… Ces tâches sont nécessaires, mais elles ne demandent pas votre expertise. Elles peuvent tourner sans vous.",
  },
  features: {
    title: "Ce qu'un agent peut faire pour vous",
    cards: [
      {
        icon: Mail,
        title: 'Trier vos e-mails entrants',
        text: 'Classer les demandes, extraire les informations utiles et préparer les réponses. Vous validez avant envoi.',
      },
      {
        icon: Plug,
        title: 'Synchroniser vos outils',
        text: 'Une information saisie une fois, mise à jour partout : CRM, comptabilité, agenda, tableurs.',
      },
      {
        icon: RefreshCw,
        title: 'Relancer automatiquement',
        text: 'Clients, fournisseurs ou collaborateurs : les relances partent au bon moment, selon vos règles.',
      },
      {
        icon: BarChart3,
        title: 'Produire vos reportings',
        text: 'Les chiffres sont collectés et mis en forme sans compilation manuelle.',
      },
      {
        icon: MessageSquare,
        title: 'Répondre aux questions récurrentes',
        text: "Un assistant qui s'appuie sur vos documents pour répondre à vos clients ou à vos équipes.",
      },
      {
        icon: FileText,
        title: 'Préparer vos documents',
        text: 'Propositions, comptes rendus, courriers : générés à partir de vos modèles et de vos données.',
      },
    ],
  },
  needs: {
    title: 'Pour quels besoins ?',
    items: [
      'Administratif et gestion des dossiers',
      'Commercial et suivi des prospects',
      'Finance : factures, rapprochements, reporting',
      'Ressources humaines : arrivées, demandes, suivis',
      'Service client : tri et réponses aux demandes récurrentes',
    ],
  },
  steps: [
    {
      icon: Search,
      number: '01',
      title: 'Identifier',
      text: 'Nous repérons les tâches répétitives qui mobilisent le plus de temps.',
      mention: 'Diagnostic offert',
    },
    {
      icon: ListChecks,
      number: '02',
      title: 'Simplifier',
      text: "Nous supprimons les étapes inutiles avant d'automatiser.",
    },
    {
      icon: Zap,
      number: '03',
      title: 'Installer',
      text: "Nous mettons en place l'agent sur vos outils et le testons avec vos équipes.",
    },
    {
      icon: BarChart3,
      number: '04',
      title: 'Suivre',
      text: "Nous surveillons, ajustons et faisons évoluer l'agent avec vos besoins.",
    },
  ],
  specific: {
    kind: 'points',
    title: 'Des agents sous contrôle',
    points: [
      "Validation humaine là où c'est nécessaire : l'agent prépare, vous décidez.",
      'Accès limités au strict nécessaire sur vos outils.',
      'Chaque action est tracée et peut être vérifiée.',
    ],
    // TODO: à valider par Eric/Lilian
    note: 'Mise en place, puis abonnement mensuel incluant le suivi, la maintenance et les évolutions.',
  },
  faq: [
    {
      question: 'Faut-il des compétences techniques en interne ?',
      answer:
        "Non. Nous installons, paramétrons et suivons l'agent. Vos équipes l'utilisent dans leurs outils habituels.",
    },
    {
      question: "Que se passe-t-il si l'agent se trompe ?",
      answer:
        'Les étapes sensibles passent par une validation humaine, et chaque action est tracée pour être corrigée rapidement.',
    },
    {
      question: 'Par quoi commencer ?',
      answer:
        "Par une tâche précise, fréquente et chronophage. Un premier résultat concret avant d'aller plus loin.",
    },
  ],
  cta: {
    title: 'Quelle tâche aimeriez-vous ne plus faire ?',
    text: "Un échange sans engagement pour identifier ce qu'un agent peut prendre en charge chez vous.",
    actions: [
      { label: 'Prendre un rendez-vous', source: 'rendez-vous' },
      { label: "Estimer l'impact", href: '/#simulateur' },
    ],
  },
}

export const surMesurePage: SolutionPageContent = {
  slug: 'sur-mesure',
  meta: {
    title: 'Applications métier sur mesure : CRM, portails, outils internes | KLS3',
    description:
      'CRM, applications internes, portails clients ou plateformes métier : KLS3 conçoit des solutions simples, utiles et évolutives, alignées avec vos besoins.',
  },
  service: { name: 'Applications métier sur mesure', serviceType: "Développement d'applications métier" },
  hero: {
    tag: 'SOLUTION · SUR MESURE',
    title: "Des outils qui s'adaptent à votre métier.",
    intro:
      'CRM, applications internes, portails clients ou plateformes métier : quand aucun logiciel du marché ne colle à votre façon de travailler, nous concevons celui qui vous manque.',
    actions: [
      { label: 'Parlons de votre projet', source: 'rendez-vous' },
      { label: 'Voir nos réalisations', href: '/#realisations' },
    ],
  },
  problem: {
    title: 'Vos outils vous imposent leur façon de travailler.',
    text: "Tableurs empilés, logiciels qui ne couvrent qu'une partie du besoin, informations dispersées, contournements à chaque étape… Quand l'outil ne correspond pas au métier, ce sont vos équipes qui compensent.",
  },
  features: {
    title: 'Ce que nous construisons',
    cards: [
      {
        icon: Users,
        title: 'CRM et outils commerciaux',
        text: "Suivi des contacts, des opportunités et de l'activité commerciale, adapté à votre cycle de vente.",
      },
      {
        icon: AppWindow,
        title: 'Applications internes',
        text: 'Les outils qui structurent vos opérations quotidiennes : planification, suivi des dossiers, gestion des demandes.',
      },
      {
        icon: LayoutGrid,
        title: 'Portails clients',
        text: 'Un espace où vos clients déposent leurs documents, suivent leur dossier et échangent avec vous.',
      },
      {
        icon: BarChart3,
        title: 'Tableaux de bord de pilotage',
        text: 'Vos indicateurs réunis au même endroit, à jour, sans compilation manuelle.',
      },
    ],
  },
  needs: {
    title: 'Quand le sur mesure a du sens',
    items: [
      'Votre activité repose sur des tableurs devenus difficiles à maintenir',
      'Aucun logiciel du marché ne couvre vos processus sans contournements',
      'Vos clients ou partenaires ont besoin d\'un accès dédié à leurs informations',
      'Vous voulez réunir plusieurs outils en un seul',
    ],
  },
  steps: [
    {
      icon: Target,
      number: '01',
      title: 'Cadrer',
      text: "Nous partons de vos usages réels, pas d'une liste de fonctionnalités.",
      mention: 'Diagnostic offert',
    },
    {
      icon: PenTool,
      number: '02',
      title: 'Prototyper',
      text: 'Une première version cliquable pour valider avec vos équipes avant de développer.',
    },
    {
      icon: CodeXml,
      number: '03',
      title: 'Développer',
      text: 'Livraison par étapes, chaque étape testée avec les utilisateurs.',
    },
    {
      icon: TrendingUp,
      number: '04',
      title: 'Faire évoluer',
      text: 'Maintenance, évolutions et accompagnement dans la durée.',
    },
  ],
  specific: { kind: 'realisations', title: 'Nos réalisations' },
  faq: [
    {
      question: 'Faut-il un cahier des charges ?',
      answer: 'Non. Nous construisons le besoin avec vous à partir de votre fonctionnement actuel.',
    },
    {
      question: 'Combien coûte un projet sur mesure ?',
      answer:
        'Chaque projet est chiffré après le diagnostic, en fonction du périmètre. Nous privilégions une première version utile rapidement, puis des évolutions par étapes.',
    },
    {
      question: "L'outil peut-il se connecter à nos logiciels existants ?",
      answer: "Oui, c'est même l'objectif : s'intégrer à votre environnement plutôt que tout remplacer.",
    },
  ],
  cta: {
    title: 'Et si on parlait de votre projet ?',
    text: 'Un échange sans engagement pour comprendre vos enjeux et identifier la bonne solution.',
    actions: [
      { label: 'Parlons de votre projet', source: 'rendez-vous' },
      { label: 'Demander une démonstration', source: 'demo' },
    ],
  },
}
