'use client'

import { FormEvent, useMemo, useState } from 'react'
import {
  BellRing,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FolderOpen,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

type View = 'dashboard' | 'dossiers' | 'relances' | 'gains'
type ScenarioKey = 'prudent' | 'median' | 'haut'

type DocumentItem = {
  id: string
  label: string
  received: boolean
}

type Dossier = {
  id: string
  client: string
  subject: string
  clerk: string
  lastContact: string
  documents: DocumentItem[]
}

type GainInputs = {
  dossiers: number
  share: number
  reminders: number
  minutes: number
  automated: number
}

const initialDossiers: Dossier[] = [
  {
    id: 'V-2026-184',
    client: 'M. et Mme Laurent',
    subject: 'Vente immobilière · Sarreguemines',
    clerk: 'Camille R.',
    lastContact: 'Aujourd’hui, 09:10',
    documents: [
      { id: 'identite-vendeur', label: "Pièce d'identité du vendeur", received: true },
      { id: 'identite-acquereur', label: "Pièce d'identité de l'acquéreur", received: true },
      { id: 'domicile', label: 'Justificatif de domicile', received: false },
      { id: 'dpe', label: 'Diagnostic de performance énergétique', received: false },
      { id: 'amiante', label: 'Diagnostic amiante', received: true },
      { id: 'titre', label: 'Titre de propriété', received: false },
    ],
  },
  {
    id: 'S-2026-091',
    client: 'Famille Perrin',
    subject: 'Succession · Forbach',
    clerk: 'Julie M.',
    lastContact: 'Hier, 16:40',
    documents: [
      { id: 'acte-deces', label: 'Acte de décès', received: true },
      { id: 'livret', label: 'Livret de famille', received: true },
      { id: 'testament', label: 'Testament ou dispositions connues', received: false },
      { id: 'releves', label: 'Relevés bancaires', received: false },
    ],
  },
  {
    id: 'D-2026-047',
    client: 'SCI Bellevue',
    subject: 'Donation · Bitche',
    clerk: 'Thomas L.',
    lastContact: '26 sept., 11:25',
    documents: [
      { id: 'statuts', label: 'Statuts à jour', received: true },
      { id: 'kbis', label: 'Extrait Kbis', received: true },
      { id: 'pv', label: "Procès-verbal d'assemblée", received: true },
      { id: 'evaluation', label: 'Évaluation du bien', received: true },
    ],
  },
]

const scenarios: Record<ScenarioKey, GainInputs> = {
  prudent: { dossiers: 80, share: 40, reminders: 1.5, minutes: 8, automated: 40 },
  median: { dossiers: 150, share: 60, reminders: 2.5, minutes: 10, automated: 60 },
  haut: { dossiers: 300, share: 75, reminders: 4, minutes: 10, automated: 75 },
}

const navItems: Array<{
  id: View
  label: string
  icon: typeof LayoutDashboard
}> = [
  { id: 'dashboard', label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: 'dossiers', label: 'Dossiers incomplets', icon: FolderOpen },
  { id: 'relances', label: 'Relances et exceptions', icon: BellRing },
  { id: 'gains', label: 'Estimation des gains', icon: Calculator },
]

function Brand() {
  return (
    <span className="font-display text-xl font-semibold tracking-tight text-[#F0EDE8]">
      KLS<span className="text-[#4B7BF5]">3</span>
    </span>
  )
}

function DemoNotice() {
  return (
    <div className="border-b border-[#4B7BF5]/20 bg-[#4B7BF5]/10 px-4 py-2 text-center text-xs font-medium text-[#AFC4FF]">
      Prototype KLS3 · données entièrement fictives · aucune connexion à Signature de Fiducial
    </div>
  )
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('demo@kls3.fr')
  const [password, setPassword] = useState('demo')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim() && password.trim()) onLogin()
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#0D0D0D]">
      <DemoNotice />
      <div className="mx-auto grid min-h-[680px] max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
              <ShieldCheck className="h-5 w-5 text-[#4B7BF5]" />
            </div>
            <Brand />
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#4B7BF5]">
            Démonstration personnalisée
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] text-[#F0EDE8] md:text-5xl">
            Étude PEFFERKORN, BAILLOT &amp; THINES
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#F0EDE8]/60">
            Une simulation concrète du suivi des pièces manquantes, des relances clients et du
            temps qui pourrait être rendu aux clercs.
          </p>
          <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              ['1', 'Vision immédiate'],
              ['2', 'Relances préparées'],
              ['3', 'Gains mesurables'],
            ].map(([number, label]) => (
              <div key={number} className="rounded-xl border border-white/[0.07] bg-[#111111] p-4">
                <span className="text-xs font-semibold text-[#4B7BF5]">0{number}</span>
                <p className="mt-2 text-sm text-[#F0EDE8]/75">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl shadow-black/30 md:p-8"
        >
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4B7BF5]/12">
            <LockKeyhole className="h-5 w-5 text-[#4B7BF5]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#F0EDE8]">Accéder à la présentation</h2>
          <p className="mt-2 text-sm leading-6 text-[#F0EDE8]/45">
            Cette connexion est simulée et ne constitue pas une protection d’accès.
          </p>
          <label className="mt-7 block text-sm font-medium text-[#F0EDE8]/70" htmlFor="demo-email">
            Adresse e-mail
          </label>
          <input
            id="demo-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#0D0D0D] px-4 py-3 text-base text-[#F0EDE8] outline-none transition focus:border-[#4B7BF5]"
          />
          <label className="mt-5 block text-sm font-medium text-[#F0EDE8]/70" htmlFor="demo-password">
            Mot de passe
          </label>
          <input
            id="demo-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#0D0D0D] px-4 py-3 text-base text-[#F0EDE8] outline-none transition focus:border-[#4B7BF5]"
          />
          <button
            type="submit"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4B7BF5] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5D89F6] focus:outline-none focus:ring-2 focus:ring-[#4B7BF5] focus:ring-offset-2 focus:ring-offset-[#111111]"
          >
            Ouvrir la démonstration
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5">
      <p className="text-sm text-[#F0EDE8]/45">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold text-[#F0EDE8]">{value}</p>
      <p className="mt-2 text-xs text-[#F0EDE8]/40">{detail}</p>
    </div>
  )
}

function DashboardView({ dossiers, onOpen }: { dossiers: Dossier[]; onOpen: () => void }) {
  const incomplete = dossiers.filter((dossier) => dossier.documents.some((doc) => !doc.received))
  const missing = dossiers.flatMap((dossier) => dossier.documents).filter((doc) => !doc.received).length

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4B7BF5]">Vendredi 2 octobre</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#F0EDE8] md:text-4xl">Les dossiers à traiter, sans recherche manuelle</h1>
      <p className="mt-3 max-w-3xl text-base text-[#F0EDE8]/50">
        La vue rassemble les pièces attendues, les relances prévues et les situations qui demandent une intervention humaine.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Dossiers suivis" value="24" detail="Données de démonstration" />
        <MetricCard label="Dossiers incomplets" value={`${incomplete.length}`} detail="Dans l’échantillon affiché" />
        <MetricCard label="Pièces attendues" value={`${missing}`} detail="Toutes catégories confondues" />
        <MetricCard label="À reprendre aujourd’hui" value="2" detail="Après réponse ou exception" />
      </div>

      <div className="mt-7 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[#F0EDE8]">Priorités du jour</h2>
              <p className="mt-1 text-sm text-[#F0EDE8]/45">Classées par délai et blocage du dossier</p>
            </div>
            <button onClick={onOpen} className="text-sm font-medium text-[#4B7BF5] hover:text-[#7BA0FF]">
              Voir les dossiers
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {incomplete.map((dossier, index) => {
              const received = dossier.documents.filter((doc) => doc.received).length
              return (
                <button
                  key={dossier.id}
                  onClick={onOpen}
                  className="flex w-full items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 text-left transition hover:border-[#4B7BF5]/40"
                >
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? 'bg-amber-400' : 'bg-[#4B7BF5]'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-[#F0EDE8]">{dossier.client}</span>
                    <span className="mt-1 block truncate text-xs text-[#F0EDE8]/40">{dossier.subject}</span>
                  </span>
                  <span className="text-sm text-[#F0EDE8]/55">{received}/{dossier.documents.length}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[#4B7BF5]/25 bg-[#4B7BF5]/[0.07] p-5 md:p-6">
          <Clock3 className="h-6 w-6 text-[#4B7BF5]" />
          <h2 className="mt-5 text-xl font-semibold text-[#F0EDE8]">Hypothèse médiane</h2>
          <p className="mt-3 text-4xl font-semibold text-[#F0EDE8]">22,5 h</p>
          <p className="mt-1 text-sm text-[#F0EDE8]/45">potentiellement récupérables par mois</p>
          <p className="mt-6 text-xs leading-5 text-[#F0EDE8]/40">
            Estimation réglable, à confronter aux volumes et temps réels de l’étude.
          </p>
        </section>
      </div>
    </div>
  )
}

function DossiersView({ dossiers, setDossiers }: { dossiers: Dossier[]; setDossiers: (value: Dossier[]) => void }) {
  const [selectedId, setSelectedId] = useState(dossiers[0].id)
  const selected = dossiers.find((dossier) => dossier.id === selectedId) ?? dossiers[0]
  const received = selected.documents.filter((doc) => doc.received).length
  const progress = Math.round((received / selected.documents.length) * 100)

  const toggleDocument = (documentId: string) => {
    setDossiers(
      dossiers.map((dossier) =>
        dossier.id === selected.id
          ? {
              ...dossier,
              documents: dossier.documents.map((doc) =>
                doc.id === documentId ? { ...doc, received: !doc.received } : doc,
              ),
            }
          : dossier,
      ),
    )
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4B7BF5]">Dossiers incomplets</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#F0EDE8] md:text-4xl">Une seule liste des pièces attendues</h1>
      <p className="mt-3 max-w-3xl text-base text-[#F0EDE8]/50">
        Cliquez sur une pièce pour simuler sa réception. Le statut et les relances s’adaptent immédiatement.
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="space-y-3">
          {dossiers.map((dossier) => {
            const count = dossier.documents.filter((doc) => doc.received).length
            const complete = count === dossier.documents.length
            return (
              <button
                key={dossier.id}
                onClick={() => setSelectedId(dossier.id)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selected.id === dossier.id
                    ? 'border-[#4B7BF5]/55 bg-[#4B7BF5]/[0.08]'
                    : 'border-white/[0.07] bg-[#111111] hover:border-white/15'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#F0EDE8]">{dossier.client}</p>
                    <p className="mt-1 text-xs text-[#F0EDE8]/40">{dossier.id}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${complete ? 'bg-emerald-400/10 text-emerald-300' : 'bg-amber-400/10 text-amber-300'}`}>
                    {complete ? 'Complet' : `${count}/${dossier.documents.length}`}
                  </span>
                </div>
                <p className="mt-4 text-sm text-[#F0EDE8]/55">{dossier.subject}</p>
                <p className="mt-2 text-xs text-[#F0EDE8]/35">Clerc référent · {dossier.clerk}</p>
              </button>
            )
          })}
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4B7BF5]">{selected.id}</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#F0EDE8]">{selected.client}</h2>
              <p className="mt-1 text-sm text-[#F0EDE8]/45">{selected.subject}</p>
            </div>
            <span className="rounded-xl border border-white/[0.07] px-3 py-2 text-xs text-[#F0EDE8]/50">
              Dernier contact · {selected.lastContact}
            </span>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-[#F0EDE8]/65">{received}/{selected.documents.length} pièces reçues</span>
              <span className="font-medium text-[#4B7BF5]">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full rounded-full bg-[#4B7BF5] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {selected.documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => toggleDocument(doc.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3 text-left transition hover:border-[#4B7BF5]/35"
              >
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${doc.received ? 'border-[#4B7BF5] bg-[#4B7BF5]' : 'border-white/20'}`}>
                  {doc.received && <Check className="h-3.5 w-3.5 text-white" />}
                </span>
                <span className={`text-sm ${doc.received ? 'text-[#F0EDE8]/45 line-through' : 'text-[#F0EDE8]/75'}`}>{doc.label}</span>
              </button>
            ))}
          </div>

          <div className={`mt-6 rounded-xl border p-4 ${progress === 100 ? 'border-emerald-400/20 bg-emerald-400/[0.06]' : 'border-[#4B7BF5]/20 bg-[#4B7BF5]/[0.05]'}`}>
            <div className="flex gap-3">
              {progress === 100 ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /> : <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-[#4B7BF5]" />}
              <div>
                <p className="text-sm font-medium text-[#F0EDE8]">
                  {progress === 100 ? 'Dossier complet : les relances sont arrêtées.' : 'Prochaine relance préparée à J+3.'}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#F0EDE8]/40">
                  {progress === 100 ? 'Le clerc référent peut reprendre le dossier.' : 'Le message reprend uniquement les pièces encore attendues.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function RelancesView() {
  const [sent, setSent] = useState(false)
  const steps = [
    { delay: 'J+3', title: 'Première relance', channel: 'E-mail personnalisé', icon: Mail },
    { delay: 'J+7', title: 'Deuxième relance', channel: 'E-mail et notification interne', icon: BellRing },
    { delay: 'J+14', title: 'Intervention du clerc', channel: 'Appel proposé si nécessaire', icon: Phone },
  ]

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4B7BF5]">Relances et exceptions</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#F0EDE8] md:text-4xl">Automatiser le répétitif, garder la main sur le sensible</h1>
      <p className="mt-3 max-w-3xl text-base text-[#F0EDE8]/50">
        Les relances simples sont préparées automatiquement. Les situations sensibles reviennent au clerc avec le contexte utile.
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5 md:p-7">
          <h2 className="text-xl font-semibold text-[#F0EDE8]">Parcours proposé · M. et Mme Laurent</h2>
          <div className="mt-6 space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.delay} className="flex gap-4 rounded-xl border border-white/[0.07] p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#4B7BF5]/10">
                    <Icon className="h-4 w-4 text-[#4B7BF5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-[#F0EDE8]">{step.title}</p>
                      <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-[#F0EDE8]/50">{step.delay}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#F0EDE8]/40">{step.channel}</p>
                    {index === 0 && <p className="mt-3 text-xs leading-5 text-[#F0EDE8]/55">Objet : pièces encore attendues pour votre dossier V-2026-184</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5 md:p-7">
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-amber-300" />
            <h2 className="text-xl font-semibold text-[#F0EDE8]">Intervention requise</h2>
          </div>
          <div className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] p-4">
            <p className="text-sm font-medium text-[#F0EDE8]">Famille Perrin · Succession</p>
            <p className="mt-2 text-sm leading-6 text-[#F0EDE8]/50">Le client a répondu sans joindre les relevés bancaires. Une réponse personnalisée est conseillée.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#F0EDE8]/45">
              <span className="rounded-full border border-white/[0.08] px-3 py-1">Assigné à Julie M.</span>
              <span className="rounded-full border border-white/[0.08] px-3 py-1">Réponse reçue aujourd’hui</span>
            </div>
          </div>
          <button
            onClick={() => setSent(true)}
            disabled={sent}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4B7BF5] px-4 py-3 text-sm font-semibold text-white transition enabled:hover:bg-[#5D89F6] disabled:bg-emerald-500/70"
          >
            {sent ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {sent ? 'Intervention enregistrée' : 'Marquer comme pris en charge'}
          </button>
          <p className="mt-4 text-center text-xs text-[#F0EDE8]/35">Action simulée, aucune donnée n’est envoyée.</p>
        </section>
      </div>
    </div>
  )
}

function NumberField({ label, value, suffix, onChange }: { label: string; value: number; suffix?: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm text-[#F0EDE8]/60">{label}</span>
      <div className="mt-2 flex items-center rounded-xl border border-white/[0.08] bg-[#0D0D0D] focus-within:border-[#4B7BF5]">
        <input
          type="number"
          min="0"
          step="0.5"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-[#F0EDE8] outline-none"
        />
        {suffix && <span className="pr-4 text-sm text-[#F0EDE8]/35">{suffix}</span>}
      </div>
    </label>
  )
}

function GainsView() {
  const [scenario, setScenario] = useState<ScenarioKey>('median')
  const [inputs, setInputs] = useState<GainInputs>(scenarios.median)

  const results = useMemo(() => {
    const dossiersRelances = inputs.dossiers * (inputs.share / 100)
    const manualHours = (dossiersRelances * inputs.reminders * inputs.minutes) / 60
    const recoveredHours = manualHours * (inputs.automated / 100)
    return { dossiersRelances, manualHours, recoveredHours, yearly: recoveredHours * 12 }
  }, [inputs])

  const chooseScenario = (key: ScenarioKey) => {
    setScenario(key)
    setInputs(scenarios[key])
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4B7BF5]">Estimation des gains</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#F0EDE8] md:text-4xl">Partir d’abaques, puis remplacer chaque hypothèse</h1>
      <p className="mt-3 max-w-3xl text-base text-[#F0EDE8]/50">
        L’étude ne mesure pas encore ses volumes ni son temps de relance. Ces scénarios servent à cadrer le potentiel, pas à annoncer un gain acquis.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {(['prudent', 'median', 'haut'] as ScenarioKey[]).map((key) => (
          <button
            key={key}
            onClick={() => chooseScenario(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${scenario === key ? 'bg-[#4B7BF5] text-white' : 'border border-white/10 bg-[#111111] text-[#F0EDE8]/55 hover:text-[#F0EDE8]'}`}
          >
            {key === 'median' ? 'Médian' : key}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5 md:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField label="Dossiers ouverts par mois" value={inputs.dossiers} onChange={(value) => setInputs({ ...inputs, dossiers: value })} />
            <NumberField label="Dossiers nécessitant une relance" value={inputs.share} suffix="%" onChange={(value) => setInputs({ ...inputs, share: value })} />
            <NumberField label="Relances moyennes par dossier" value={inputs.reminders} onChange={(value) => setInputs({ ...inputs, reminders: value })} />
            <NumberField label="Temps moyen par relance" value={inputs.minutes} suffix="min" onChange={(value) => setInputs({ ...inputs, minutes: value })} />
            <div className="sm:col-span-2">
              <NumberField label="Part estimée automatisable" value={inputs.automated} suffix="%" onChange={(value) => setInputs({ ...inputs, automated: value })} />
            </div>
          </div>
          <button
            onClick={() => { setScenario('median'); setInputs(scenarios.median) }}
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#F0EDE8]/45 transition hover:text-[#F0EDE8]"
          >
            <RotateCcw className="h-4 w-4" />
            Revenir à l’hypothèse médiane
          </button>
        </section>

        <section className="rounded-2xl border border-[#4B7BF5]/30 bg-gradient-to-br from-[#4B7BF5]/15 to-[#111111] p-5 md:p-7">
          <p className="text-sm text-[#F0EDE8]/50">Temps potentiellement récupérable</p>
          <p className="mt-3 font-display text-5xl font-semibold text-[#F0EDE8]">{results.recoveredHours.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} h</p>
          <p className="mt-2 text-sm text-[#F0EDE8]/45">par mois, soit {results.yearly.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} heures par an</p>

          <div className="mt-8 space-y-3 border-t border-white/[0.08] pt-6">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#F0EDE8]/45">Dossiers à relancer</span>
              <span className="font-medium text-[#F0EDE8]">{results.dossiersRelances.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}/mois</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#F0EDE8]/45">Temps manuel estimé</span>
              <span className="font-medium text-[#F0EDE8]">{results.manualHours.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} h/mois</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#F0EDE8]/45">Part conservée pour l’humain</span>
              <span className="font-medium text-[#F0EDE8]">{100 - inputs.automated}%</span>
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-white/[0.08] bg-black/15 p-4 text-xs leading-5 text-[#F0EDE8]/45">
            Prochaine étape proposée : mesurer un type de dossier avec un clerc référent sur 20 à 30 dossiers pendant quatre semaines.
          </div>
        </section>
      </div>
    </div>
  )
}

function AppShell({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<View>('dashboard')
  const [dossiers, setDossiers] = useState(initialDossiers)

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <DemoNotice />
      <div className="mx-auto flex max-w-[1500px] flex-col lg:min-h-[calc(100vh-33px)] lg:flex-row">
        <aside className="border-b border-white/[0.07] bg-[#0F0F0F] p-4 lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex items-center justify-between gap-4">
            <Brand />
            <button onClick={onLogout} aria-label="Quitter la démonstration" className="rounded-lg p-2 text-[#F0EDE8]/40 hover:bg-white/[0.05] hover:text-[#F0EDE8] lg:hidden">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#111111] p-4">
            <p className="text-xs font-semibold text-[#F0EDE8]">Étude notariale</p>
            <p className="mt-1 text-xs leading-5 text-[#F0EDE8]/40">PEFFERKORN, BAILLOT &amp; THINES</p>
          </div>
          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" aria-label="Navigation de la démonstration">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition lg:w-full ${view === item.id ? 'bg-[#4B7BF5] text-white' : 'text-[#F0EDE8]/50 hover:bg-white/[0.04] hover:text-[#F0EDE8]'}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
          <div className="mt-7 hidden border-t border-white/[0.07] pt-5 lg:block">
            <button onClick={onLogout} className="flex items-center gap-3 text-sm text-[#F0EDE8]/40 transition hover:text-[#F0EDE8]">
              <LogOut className="h-4 w-4" />
              Quitter la démo
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 md:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            {view === 'dashboard' && <DashboardView dossiers={dossiers} onOpen={() => setView('dossiers')} />}
            {view === 'dossiers' && <DossiersView dossiers={dossiers} setDossiers={setDossiers} />}
            {view === 'relances' && <RelancesView />}
            {view === 'gains' && <GainsView />}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5 text-xs text-[#F0EDE8]/30">
              <span>Présentation KLS3 · 2 octobre 2026</span>
              <span className="inline-flex items-center gap-2"><FileCheck2 className="h-3.5 w-3.5" /> Données fictives, sans stockage</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DemoEtudeClient() {
  const [authenticated, setAuthenticated] = useState(false)

  return authenticated ? (
    <AppShell onLogout={() => setAuthenticated(false)} />
  ) : (
    <LoginScreen onLogin={() => setAuthenticated(true)} />
  )
}
