import { type FrictionItem } from '../types/kls3'

export const frictions: FrictionItem[] = [
  {
    title: 'Reporting manuel',
    description: 'Des heures perdues à produire des données déjà disponibles.',
    icon: 'FileText',
  },
  {
    title: 'Données dispersées',
    description: 'Les informations critiques sont éparpillées.',
    icon: 'FolderTree',
  },
  {
    title: 'Relances répétitives',
    description: 'Certaines opérations avancent uniquement grâce à des relances humaines.',
    icon: 'RefreshCw',
  },
  {
    title: 'Dépendance humaine',
    description: 'Des opérations critiques reposent encore sur quelques personnes clés.',
    icon: 'Users',
  },
  {
    title: 'Manque de visibilité',
    description: 'Les problèmes opérationnels deviennent visibles trop tard.',
    icon: 'EyeOff',
  },
  {
    title: 'Validations lentes',
    description: 'Une validation manquante peut ralentir toute une chaîne opérationnelle.',
    icon: 'Hourglass',
  },
  {
    title: 'Onboarding fragile',
    description: 'Chaque onboarding repose encore sur des opérations manuelles.',
    icon: 'UserPlus',
  },
]
