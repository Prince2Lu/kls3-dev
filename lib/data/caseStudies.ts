import { type CaseStudy } from '../types/kls3'

export const caseStudies: CaseStudy[] = [
  {
    id: 'centralisation-reportings',
    category: 'Reporting',
    title: 'Centralisation des reportings multi-sources',
    avant: 'Managers consolidaient manuellement plusieurs reportings chaque semaine.',
    friction: 'Données réparties entre différents outils, fichiers et emails.',
    transformation: 'Mise en place d\'une centralisation automatisée des données opérationnelles.',
    resultat: 'Visibilité temps réel et plusieurs heures économisées chaque semaine.',
  },
  {
    id: 'automatisation-relances',
    category: 'Relances',
    title: 'Automatisation des relances opérationnelles',
    avant: 'Suivis reposaient principalement sur des tâches manuelles.',
    friction: 'Retards, oublis et faible visibilité.',
    transformation: 'Automatisation des suivis et notifications critiques.',
    resultat: 'Réduction des retards et amélioration de la fluidité opérationnelle.',
  },
  {
    id: 'standardisation-onboarding',
    category: 'Onboarding',
    title: 'Standardisation des processus d\'onboarding',
    avant: 'Chaque onboarding suivait un fonctionnement différent.',
    friction: 'Dépendance aux équipes et manque de visibilité.',
    transformation: 'Création d\'un processus structuré et pilotable.',
    resultat: 'Onboarding plus rapide, plus fiable et plus simple à suivre.',
  },
]
