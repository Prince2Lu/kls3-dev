// Reprise telle quelle de la fonction classify() de docs/maquette-lilian.html
export function classify(query: string): [string, string] {
  const s = query.toLowerCase()
  if (/document|facture|justificatif|contrat|pi[eè]ce|classement|dossier|ocr/.test(s))
    return [
      'DocFlow — Gestion documentaire',
      'Une première piste consiste à structurer la collecte, la lecture, les contrôles et le suivi des pièces. Selon votre activité, DocFlow ou une automatisation dédiée pourrait être pertinent.',
    ]
  if (/crm|logiciel|application|outil m[eé]tier|plateforme|portail|tableau de bord/.test(s))
    return [
      'Applications métier sur mesure',
      'Votre problématique pourrait justifier un outil dédié ou l’évolution de vos logiciels actuels. L’objectif est de partir de vos usages avant de choisir l’architecture.',
    ]
  if (/email|e-mail|relance|répétiti|repetiti|automatis|connect|saisie|reporting|support|service client/.test(s))
    return [
      'Automatisation & agents IA',
      'Il pourrait être utile de simplifier les étapes, connecter les outils et automatiser certaines tâches avec des contrôles adaptés.',
    ]
  return [
    'Analysons votre situation',
    'Votre besoin peut relever d’une simplification de processus, d’une automatisation ou d’un outil sur mesure. Un échange permettrait de choisir une piste réellement adaptée.',
  ]
}
