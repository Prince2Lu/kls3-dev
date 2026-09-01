export interface FrictionItem {
  title: string
  description: string
  icon?: string // nom icône Lucide
}

export interface TransformationStep {
  number: string // "01", "02", "03", "04"
  title: string
  description: string
}

export interface SystemItem {
  title: string
  description: string
}

export interface ResultItem {
  symbol: string // "−", "+", "×"
  title: string
  description: string
}

export interface CaseStudy {
  id: string
  category: string // "Reporting", "Relances", "Onboarding"
  title: string
  avant: string
  friction: string
  transformation: string
  resultat: string
}

export interface ContactFormData {
  nom: string
  societe: string
  email: string
  telephone: string
  friction: string // description libre de l'opération qui ralentit
}
