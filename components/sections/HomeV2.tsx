'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, FileText, Workflow, Blocks, Sparkles, ShieldCheck, Clock3, Mail, ClipboardCheck, AlertTriangle } from 'lucide-react'

const sectors = ['Services & conseil', 'Industrie', 'BTP', 'Transport & logistique', 'Cabinet juridique ou comptable', 'Autre activité']
const issues = [
  { id:'documents', title:'Documents à collecter et vérifier', solution:'DocFlow', detail:'Centralisez les documents, extrayez les informations et suivez les pièces manquantes.' },
  { id:'emails', title:'E-mails, relances et saisies répétitives', solution:'Automatisation & agents IA', detail:'Connectez les outils et automatisez les tâches qui se répètent chaque semaine.' },
  { id:'tools', title:'Outils dispersés ou logiciel inadapté', solution:'Applications sur mesure', detail:'Construisez un outil adapté à votre manière de travailler, et non l’inverse.' },
  { id:'visibility', title:'Manque de visibilité sur les opérations', solution:'Automatisation & pilotage', detail:'Rendez les étapes, délais et indicateurs visibles au bon endroit.' },
]
const stages = [
  { label:'Réception', description:'Une facture ou un justificatif arrive par e-mail ou dépôt.' },
  { label:'Lecture', description:'Les informations utiles sont extraites du document.' },
  { label:'Contrôle', description:'Une incohérence peut être signalée pour vérification.' },
  { label:'Suivi', description:'Un collaborateur valide et les pièces manquantes peuvent être relancées.' },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[.2em] font-semibold text-[#7ca4ff]">{children}</p>
}
function SectionHeading({label,title,children}:{label:string,title:string,children?:React.ReactNode}) {
  return <div className="max-w-[780px]"><Eyebrow>{label}</Eyebrow><h2 className="!text-[#F4F4F4] text-[clamp(29px,4vw,46px)] !leading-[1.15] !font-semibold mt-4 tracking-[-.03em]">{title}</h2>{children&&<p className="text-[#A6ACBA] text-base md:text-lg leading-relaxed mt-5">{children}</p>}</div>
}

export default function HomeV2() {
  const [sector,setSector]=useState('')
  const [issue,setIssue]=useState('')
  const [stage,setStage]=useState(0)
  const selected=issues.find(i=>i.id===issue)
  return <div className="bg-[#0D0D0D] text-[#F4F4F4] overflow-hidden">
    <section className="px-5 md:px-10 pt-32 md:pt-40 pb-24 border-b border-white/10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.35fr_.65fr] gap-14 items-center">
        <div>
          <Eyebrow>KLS3 · Operational Intelligence</Eyebrow>
          <h1 className="!text-[#F4F4F4] !font-semibold tracking-[-.045em] !leading-[1.08] text-[clamp(40px,6vw,76px)] mt-6">Moins de tâches manuelles.<br/><span className="text-[#7ca4ff]">Plus de temps pour l’essentiel.</span></h1>
          <p className="mt-8 max-w-2xl text-[#B4BBC8] text-lg leading-relaxed">Documents à traiter, données à ressaisir, relances à effectuer, outils qui ne communiquent pas… KLS3 conçoit des solutions pour simplifier, automatiser et piloter vos opérations.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#solutions" className="bg-[#4B7BF5] hover:bg-[#6994ff] rounded-full px-6 py-3.5 !text-white font-semibold inline-flex items-center gap-2">Découvrir nos solutions <ArrowRight size={17}/></a>
            <Link href="/contact" className="border border-white/25 hover:border-white/60 rounded-full px-6 py-3.5 font-medium">Parlons de votre projet</Link>
          </div>
          <p className="mt-7 text-xs text-[#818895]">Une équipe de terrain, de l’analyse du besoin jusqu’à la réalisation · Grand Est & Luxembourg</p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-[#151922] p-6 md:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-5 border-b border-white/10"><span className="text-sm font-semibold">Vos opérations, simplifiées</span><span className="text-xs text-[#86aaff]">Exemple de flux</span></div>
          {[['01','Un document arrive','E-mail, scan ou dépôt'],['02','Les informations sont extraites','Moins de ressaisie'],['03','Une anomalie est signalée','Vérification par votre équipe'],['04','Le dossier continue d’avancer','Suivi et relances']].map(([n,t,d],i)=><div key={n} className="flex gap-4 py-4 border-b border-white/10 last:border-0"><div className="h-9 w-9 rounded-xl bg-[#25345c] text-[#a3baff] flex items-center justify-center text-sm font-semibold">{n}</div><div><p className="text-sm font-medium">{t}</p><p className="text-xs text-[#959eaf] mt-1">{d}</p></div>{i===3&&<CheckCircle2 size={18} className="ml-auto text-[#77c6aa]"/>}</div>)}
          <p className="text-[11px] text-[#8B94A3] mt-3">Illustration du fonctionnement envisagé de DocFlow.</p>
        </div>
      </div>
    </section>

    <section className="px-5 md:px-10 py-24 border-b border-white/10" id="problemes">
      <div className="max-w-6xl mx-auto"><SectionHeading label="Vous reconnaissez ces situations ?" title="Le vrai coût, ce sont les petites frictions accumulées.">Des tâches qui paraissent anodines peuvent immobiliser plusieurs personnes, ralentir les dossiers et créer des erreurs évitables.</SectionHeading>
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[['La même information, saisie trois fois','Entre vos mails, fichiers et outils métier, vos équipes perdent du temps à faire circuler les données.'],['Des dossiers qui restent incomplets','Une pièce manquante, une relance oubliée, et un traitement qui n’avance plus.'],['Des outils qui ne suivent plus','Vos processus ont évolué, mais vos logiciels restent rigides ou déconnectés.']].map(([t,d])=><div className="rounded-2xl border border-white/10 bg-[#141414] p-7" key={t}><div className="text-[#7ca4ff] mb-5"><AlertTriangle size={23}/></div><h3 className="!text-white !text-xl !font-semibold">{t}</h3><p className="text-[#A6ACBA] text-sm leading-relaxed mt-4">{d}</p></div>)}
        </div>
      </div>
    </section>

    <section id="solutions" className="px-5 md:px-10 py-24 border-b border-white/10"><div className="max-w-6xl mx-auto">
      <SectionHeading label="Ce que l’on fait" title="Trois façons de faire avancer votre entreprise.">Pas de technologie pour la technologie : on part de votre besoin et on construit la réponse adaptée.</SectionHeading>
      <div className="grid lg:grid-cols-3 gap-4 mt-12">
        {[
          {num:'01',icon:<FileText/>,title:'DocFlow',tag:'Notre solution documentaire',desc:'Vos documents lus, contrôlés et suivis sans multiplier les manipulations.',points:['Collecte des documents entrants','Extraction des informations','Signalement d’anomalies et validation','Relances automatiques des pièces manquantes'],href:'#docflow',cta:'Découvrir DocFlow'},
          {num:'02',icon:<Workflow/>,title:'Automatisation & agents IA',tag:'Vos processus fluidifiés',desc:'Les tâches répétitives s’exécutent avec les bons contrôles, sans ressaisies inutiles.',points:['Connexion de vos outils','Traitement d’e-mails et de données','Assistants IA pour des tâches ciblées','Suivi et supervision'],href:'/contact',cta:'Parler d’une automatisation'},
          {num:'03',icon:<Blocks/>,title:'Applications sur mesure',tag:'Des outils faits pour votre métier',desc:'Quand un logiciel standard ne correspond pas à votre activité, on construit le bon.',points:['Applications métier et portails','CRM et gestion de dossiers','Tableaux de bord','Interfaces et intégrations'],href:'/contact',cta:'Parler de votre application'},
        ].map(o=><article className="rounded-2xl border border-white/15 bg-[#151515] p-7 flex flex-col" key={o.num}><div className="flex justify-between"><span className="text-[#7ca4ff]">{o.icon}</span><span className="text-[#6E7583] text-xs">{o.num}</span></div><p className="text-xs text-[#8994aa] uppercase tracking-wider mt-7">{o.tag}</p><h3 className="!text-white !text-2xl !font-semibold mt-2">{o.title}</h3><p className="text-[#B5BECD] mt-4 text-sm leading-relaxed">{o.desc}</p><ul className="mt-6 space-y-3 flex-1">{o.points.map(p=><li key={p} className="text-sm text-[#C7CDDA] flex gap-2"><Check size={15} className="shrink-0 text-[#7ca4ff] mt-1"/>{p}</li>)}</ul><a href={o.href} className="mt-9 pt-4 border-t border-white/10 text-[#9fbbff] text-sm font-semibold flex items-center gap-2">{o.cta}<ArrowUpRight size={16}/></a></article>)}
      </div>
    </div></section>

    <section id="docflow" className="px-5 md:px-10 py-24 border-b border-white/10"><div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
      <div><Eyebrow>Focus produit · DocFlow</Eyebrow><h2 className="!text-white !font-semibold tracking-tight text-[clamp(32px,4vw,49px)] mt-5">Recevoir un document ne devrait pas créer une nouvelle tâche.</h2><p className="mt-6 text-[#B4BBC8] leading-relaxed">Factures, contrats, attestations et justificatifs : DocFlow vise à centraliser les arrivées, lire les informations, repérer les incohérences, organiser la validation et relancer les pièces manquantes.</p><div className="mt-8 space-y-3 text-sm text-[#D1D6E1]"><p className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#8dadff]"/>Contrôle humain des documents sensibles</p><p className="flex items-center gap-2"><Clock3 size={18} className="text-[#8dadff]"/>Traçabilité des traitements et relances</p><p className="flex items-center gap-2"><Mail size={18} className="text-[#8dadff]"/>Connexion envisagée à vos outils existants</p></div><p className="text-[#8F97A7] text-xs mt-8">Produit en développement. Les capacités de détection de fraude ne sont pas garanties à ce stade.</p></div>
      <div className="rounded-3xl p-5 md:p-8 border border-[#38425d] bg-[#131824]"><div className="flex items-center justify-between"><span className="font-semibold text-sm">DocFlow / Parcours de démonstration</span><span className="text-xs text-[#8fadff]">Simulation</span></div><div className="flex flex-wrap gap-2 mt-6">{stages.map((s,i)=><button type="button" key={s.label} onClick={()=>setStage(i)} className={`text-xs px-3 py-2 rounded-lg border transition ${stage===i?'bg-[#4B7BF5] border-[#4B7BF5] text-white':'border-white/15 text-[#AEB6C4] hover:border-white/40'}`}>{i+1}. {s.label}</button>)}</div><div className="bg-[#1d2637] rounded-2xl mt-6 p-6 min-h-52"><div className="flex gap-3 items-center"><FileText size={25} className="text-[#9CB6FC]"/><div><p className="text-sm font-semibold">Dossier DEMO-024</p><p className="text-xs text-[#8D98AD]">Document fictif · aucun fichier envoyé</p></div></div><div className="h-px bg-white/10 my-6"/><p className="text-xs text-[#8EAAFF] uppercase tracking-wide">{stages[stage].label}</p><p className="text-base font-medium mt-3">{stages[stage].description}</p></div><button type="button" onClick={()=>setStage((stage+1)%stages.length)} className="w-full mt-5 bg-[#4B7BF5] hover:bg-[#688ffc] rounded-xl py-3 text-sm font-semibold flex justify-center gap-2 items-center">Étape suivante <ArrowRight size={15}/></button><p className="text-xs text-[#8E98A8] mt-4">Cette animation illustre le parcours cible. Elle ne traite aucun document réel.</p></div>
    </div></section>

    <section id="diagnostic" className="px-5 md:px-10 py-24 border-b border-white/10"><div className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12">
      <div><SectionHeading label="Diagnostic express" title="Quel problème vous fait perdre le plus de temps ?">Deux réponses suffisent pour identifier une première piste. Pas de formulaire obligatoire ni de promesse chiffrée inventée.</SectionHeading></div>
      <div className="rounded-2xl bg-[#151922] border border-white/15 p-6 md:p-8"><label htmlFor="kls-sector" className="block text-sm font-semibold mb-3">1. Votre secteur d’activité</label><select id="kls-sector" value={sector} onChange={e=>setSector(e.target.value)} className="w-full rounded-xl bg-[#252c38] text-white border border-white/20 p-3.5 outline-none"><option value="">Sélectionnez votre secteur</option>{sectors.map(s=><option key={s}>{s}</option>)}</select><p className="text-sm font-semibold mt-8 mb-3">2. Votre principale difficulté</p><div className="grid sm:grid-cols-2 gap-3">{issues.map(i=><button type="button" key={i.id} onClick={()=>setIssue(i.id)} className={`rounded-xl p-4 text-left text-sm border transition ${issue===i.id?'border-[#7FA3FF] bg-[#263b69] text-white':'border-white/15 bg-[#202532] text-[#C1C9D5] hover:border-white/30'}`}>{i.title}</button>)}</div>{selected&&sector&&<div aria-live="polite" className="bg-[#26354b] border border-[#5372a9] rounded-xl p-5 mt-6"><p className="text-xs uppercase tracking-wide text-[#A9C3FF]">Première orientation pour votre activité</p><h3 className="!text-white !text-xl !font-semibold mt-2">{selected.solution}</h3><p className="text-sm text-[#C6D1E2] mt-3">{selected.detail}</p><Link href={`/contact?secteur=${encodeURIComponent(sector)}&besoin=${encodeURIComponent(selected.title)}`} className="inline-flex gap-2 items-center mt-5 text-sm text-[#A9C3FF] font-semibold">Échanger sur ce besoin <ArrowRight size={16}/></Link></div>}{(!selected||!sector)&&<p className="text-xs text-[#8A94A6] mt-5">Choisissez un secteur et une difficulté pour découvrir une orientation.</p>}</div>
    </div></section>

    <section id="realisations" className="px-5 md:px-10 py-24 border-b border-white/10"><div className="max-w-6xl mx-auto"><SectionHeading label="Projets développés" title="Des projets concrets, pas seulement des promesses.">Ces applications illustrent notre capacité à concevoir des outils métiers. Elles ne sont pas présentées ici comme des produits commercialisés.</SectionHeading><div className="grid md:grid-cols-2 gap-5 mt-12">{[['KLS3 Sales OS','Pilotage de l’activité commerciale','Centraliser les prospects, activités, opportunités et relances dans un outil adapté à notre organisation.','CRM métier · Gestion commerciale'],['Calymia','Une application pensée pour les praticiens','Structurer les rendez-vous, les fiches clients et le suivi de l’activité dans une même interface.','Application métier · Gestion de cabinet']].map(([name,title,desc,tags])=><article key={name} className="rounded-2xl bg-[#151515] border border-white/15 overflow-hidden"><div className="bg-[#1d2532] p-7 h-44 flex flex-col justify-between"><span className="text-xs uppercase tracking-widest text-[#8DACFF]">{tags}</span><div className="flex items-center gap-3 text-white"><Blocks size={27}/><span className="font-semibold text-2xl">{name}</span></div></div><div className="p-7"><h3 className="!text-white !text-xl !font-semibold">{title}</h3><p className="text-sm text-[#AEB7C7] leading-relaxed mt-4">{desc}</p><p className="text-xs text-[#87909F] mt-5">Projet KLS3 · Présentation détaillée à venir</p></div></article>)}</div></div></section>

    <section className="px-5 md:px-10 py-24 border-b border-white/10"><div className="max-w-6xl mx-auto"><SectionHeading label="Notre méthode" title="Identifier. Simplifier. Automatiser. Piloter.">On commence par comprendre ce qui vous freine, pas par vous imposer un logiciel.</SectionHeading><div className="grid md:grid-cols-4 gap-4 mt-12">{[['01','Identifier','Observer les opérations, repérer les blocages et établir une base mesurable.'],['02','Simplifier','Supprimer les étapes inutiles avant d’automatiser.'],['03','Automatiser','Construire et connecter les outils adaptés aux usages réels.'],['04','Piloter','Suivre les résultats et améliorer le fonctionnement dans la durée.']].map(([n,t,d])=><div key={n} className="border-t border-[#4B7BF5] pt-5"><span className="text-xs text-[#8BA8F6]">{n}</span><h3 className="!text-white !text-xl !font-semibold mt-4">{t}</h3><p className="text-sm text-[#A4ADBB] leading-relaxed mt-3">{d}</p></div>)}</div></div></section>

    <section className="px-5 md:px-10 py-20 border-b border-white/10"><div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center"><div><Eyebrow>Financement des projets</Eyebrow><h2 className="!text-white !text-3xl md:!text-4xl !font-semibold mt-4">Votre transformation peut-elle bénéficier d’une aide ?</h2><p className="text-[#AEB6C6] mt-5 leading-relaxed">Selon votre implantation, la nature du projet et les critères en vigueur, des dispositifs d’accompagnement ou de financement peuvent exister, notamment dans le Grand Est. On peut examiner les pistes pertinentes avant de lancer le projet.</p><p className="text-xs text-[#929CAB] mt-4">Les aides sont soumises à conditions et ne sont jamais garanties.</p></div><div className="bg-[#151b28] rounded-2xl border border-white/15 p-8"><Sparkles size={28} className="text-[#8FB0FF]"/><h3 className="!text-white !text-xl !font-semibold mt-5">Un projet utile avant tout.</h3><p className="text-[#B2BCCD] mt-4 text-sm">Une subvention ne rend pas un mauvais projet rentable. On identifie d’abord un problème réel, puis on évalue son coût, sa solution et les possibilités d’aide.</p><Link href="/contact" className="inline-flex items-center gap-2 mt-7 text-[#A9C1FF] font-semibold text-sm">Étudier votre projet <ArrowRight size={16}/></Link></div></div></section>

    <section className="px-5 md:px-10 py-24"><div className="max-w-6xl mx-auto bg-[#19233b] border border-[#3e527c] rounded-3xl p-8 md:p-14 text-center"><Eyebrow>Une équipe. Pas une agence.</Eyebrow><h2 className="!text-white !font-semibold text-[clamp(32px,4vw,49px)] mt-5">Et si on commençait par votre problème ?</h2><p className="text-[#C3CCDB] max-w-2xl mx-auto mt-6">Vous n’avez pas besoin de connaître la bonne technologie. Expliquez-nous ce qui vous ralentit : on regardera ensemble si une solution est pertinente.</p><div className="flex justify-center gap-3 flex-wrap mt-9"><Link href="/contact" className="bg-[#4B7BF5] hover:bg-[#6d96fa] !text-white px-7 py-3.5 rounded-full font-semibold inline-flex gap-2 items-center">Parlons de votre projet <ArrowRight size={17}/></Link><a href="#diagnostic" className="border border-white/30 px-7 py-3.5 rounded-full font-medium">Faire le diagnostic express</a></div></div></section>
  </div>
}
