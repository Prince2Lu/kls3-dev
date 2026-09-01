import type { AutomationPack } from '@/lib/data/automation-packs'
import { kls3CompanyInfo } from '@/lib/data/company-info'

type DiagnosticEmailProps = {
  nom: string
  cabinet: string
  email: string
  telephone: string
  score: number
  heuresMois: number
  coutAn: number
  parametres: {
    clients: number
    outils: number
    relanceHeures: number
    dossiersDivergents: number
    tempsStatutMinutes: number
    tauxHoraire: number
  }
  allPacks: AutomationPack[]
  selectedPackIds: string[]
  audience: 'client' | 'interne'
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function contactRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:13px;color:#888780;">${label}</td>
      <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:13px;color:#111827;font-weight:600;text-align:right;">${escapeHtml(value)}</td>
    </tr>`
}

function contactDetailsBlock(
  nom: string,
  cabinet: string,
  email: string,
  telephone: string,
  audience: DiagnosticEmailProps['audience']
): string {
  const title = audience === 'interne' ? 'Coordonnées du contact' : 'Vos coordonnées'
  return `
        <div style="margin:24px 0;padding:20px;background:#F5F3EF;border-radius:8px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#111827;">${title}</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${contactRow('Nom et prénom', nom)}
            ${contactRow('Cabinet', cabinet)}
            ${contactRow('Email', email)}
            ${contactRow('Téléphone', telephone)}
          </table>
        </div>`
}

export function buildDiagnosticEmailHtml({
  nom,
  cabinet,
  email,
  telephone,
  score,
  heuresMois,
  coutAn,
  parametres,
  allPacks,
  selectedPackIds,
  audience,
}: DiagnosticEmailProps): string {
  const packsHtml = allPacks
    .map((pack) => {
      const isSelected = selectedPackIds.includes(pack.id)
      return `
        <tr>
          <td style="padding: 12px 16px; border: 1px solid ${isSelected ? '#4B7BF5' : '#E5E5E5'}; background: ${isSelected ? '#EEF2FF' : '#FFFFFF'}; border-radius: 6px;">
            <p style="margin: 0 0 4px; font-weight: 600; font-size: 13px; color: #111827;">
              ${escapeHtml(pack.numero)} — ${escapeHtml(pack.titre)}${isSelected ? ' <span style="color:#4B7BF5;">· Sélectionné</span>' : ''}
            </p>
            <p style="margin: 0; font-size: 12px; color: #555555; line-height: 1.5;">${escapeHtml(pack.description)}</p>
          </td>
        </tr>
        <tr><td style="height: 8px;"></td></tr>
      `
    })
    .join('')

  const intro =
    audience === 'client'
      ? `<p style="font-size:14px;color:#333333;">Bonjour ${escapeHtml(nom)},</p>
         <p style="font-size:14px;color:#333333;">Voici votre diagnostic de friction opérationnelle. Le détail complet est joint en PDF.</p>`
      : `<p style="font-size:14px;color:#333333;">Nouvelle soumission diagnostic — ${escapeHtml(cabinet)} (${escapeHtml(nom)}).</p>`

  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#F5F3EF; padding:32px;">
    <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E5E5E5;">
      <div style="background:#0D0D0D;padding:24px 32px;">
        <table cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="vertical-align:middle;padding-right:10px;">
              <img src="${kls3CompanyInfo.logoUrl}" alt="KLS3" width="32" height="32" style="display:block;" />
            </td>
            <td style="vertical-align:middle;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:700;">
              <span style="color:#F0EDE8;">KLS</span><span style="color:#4B7BF5;">3</span>
            </td>
          </tr>
        </table>
      </div>
      <div style="padding:32px;">
        ${intro}
        ${contactDetailsBlock(nom, cabinet, email, telephone, audience)}

        <div style="margin:24px 0;padding:20px;background:#F5F3EF;border-radius:8px;">
          <p style="margin:0;font-size:32px;font-weight:700;color:#4B7BF5;">${score}<span style="font-size:14px;color:#888780;">/100</span></p>
          <p style="margin:4px 0 16px;font-size:12px;color:#888780;">Score de friction opérationnelle</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:13px;color:#888780;">Temps mobilisé</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:13px;color:#111827;font-weight:600;text-align:right;">${heuresMois} h / mois</td>
            </tr>
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:13px;color:#888780;">Capacité administrative mobilisée</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:13px;color:#111827;font-weight:600;text-align:right;">${coutAn.toLocaleString('fr-FR')} € / an</td>
            </tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#888780;">Clients actifs</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#111827;font-weight:600;text-align:right;">${parametres.clients}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#888780;">Outils / logiciels au quotidien</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#111827;font-weight:600;text-align:right;">${parametres.outils}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#888780;">Heures / semaine relances</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#111827;font-weight:600;text-align:right;">${parametres.relanceHeures} h</td>
            </tr>
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#888780;">Dossiers divergents / mois</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#111827;font-weight:600;text-align:right;">${parametres.dossiersDivergents}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#888780;">Temps moyen retrouver un dossier</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#111827;font-weight:600;text-align:right;">${parametres.tempsStatutMinutes} min</td>
            </tr>
            <tr>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#888780;">Coût horaire chargé moyen</td>
              <td style="padding:6px 0;border-top:1px solid #E5E5E5;font-size:12px;color:#111827;font-weight:600;text-align:right;">${parametres.tauxHoraire} €</td>
            </tr>
          </table>
        </div>

        <p style="font-size:13px;font-weight:600;color:#111827;margin-bottom:8px;">Les Automation Packs KLS3</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${packsHtml}
        </table>

        <p style="font-size:11px;font-style:italic;color:#888780;margin-top:16px;">
          Estimation indicative de modélisation, à affiner lors d'un diagnostic approfondi avec votre cabinet.
        </p>
      </div>
      <div style="background:#F5F3EF;padding:20px 32px;border-top:1px solid #E5E5E5;">
        <p style="margin:0;font-size:11px;color:#888780;">${kls3CompanyInfo.nom} — ${kls3CompanyInfo.adresse}</p>
        <p style="margin:2px 0 0;font-size:11px;color:#888780;">${kls3CompanyInfo.site} · ${kls3CompanyInfo.email}</p>
      </div>
    </div>
  </div>
  `
}
