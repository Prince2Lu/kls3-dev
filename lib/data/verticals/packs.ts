import * as financeAffectation from './finance/affectation-pilotage'
import * as financeDocuments from './finance/documents-manquants'
import * as financeEvents from './finance/evenements-clients'
import * as financeOnboarding from './finance/onboarding'
import * as financeReporting from './finance/reporting'
import * as financeSync from './finance/synchronisation'
import * as notaireAffectation from './notaire/affectation-pilotage'
import * as notaireDocuments from './notaire/documents-manquants'
import * as notaireEvents from './notaire/evenements-clients'
import * as notaireOnboarding from './notaire/onboarding'
import * as notaireReporting from './notaire/reporting'
import * as notaireSync from './notaire/synchronisation'

type PackMap<T> = Record<string, T>

function resolvePack<T>(map: PackMap<T>, verticalId: string | undefined | null, fallback: T): T {
  if (!verticalId) return fallback
  return map[verticalId] ?? fallback
}

const onboardingByVertical = {
  finance: financeOnboarding,
  notaire: notaireOnboarding,
}

const documentsByVertical = {
  finance: financeDocuments,
  notaire: notaireDocuments,
}

const eventsByVertical = {
  finance: financeEvents,
  notaire: notaireEvents,
}

const syncByVertical = {
  finance: financeSync,
  notaire: notaireSync,
}

const reportingByVertical = {
  finance: financeReporting,
  notaire: notaireReporting,
}

const affectationByVertical = {
  finance: financeAffectation,
  notaire: notaireAffectation,
}

export function getOnboardingPack(verticalId?: string | null) {
  return resolvePack(onboardingByVertical, verticalId, financeOnboarding)
}

export function getDocumentsManquantsPack(verticalId?: string | null) {
  return resolvePack(documentsByVertical, verticalId, financeDocuments)
}

export function getEvenementsClientsPack(verticalId?: string | null) {
  return resolvePack(eventsByVertical, verticalId, financeEvents)
}

export function getSynchronisationPack(verticalId?: string | null) {
  return resolvePack(syncByVertical, verticalId, financeSync)
}

export function getReportingPack(verticalId?: string | null) {
  return resolvePack(reportingByVertical, verticalId, financeReporting)
}

export function getAffectationPilotagePack(verticalId?: string | null) {
  return resolvePack(affectationByVertical, verticalId, financeAffectation)
}
