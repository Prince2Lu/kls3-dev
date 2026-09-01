import { renderToBuffer } from '@react-pdf/renderer'
import { automationPacks } from '@/lib/data/automation-packs'
import { DiagnosticPdf } from '@/lib/pdf/diagnostic-pdf'

const PHONE = '06 12 34 56 78'

async function main() {
  const buffer = await renderToBuffer(
    DiagnosticPdf({
      nom: 'Claire Moreau',
      cabinet: 'Cabinet Lefevre',
      email: 'claire@exemple.fr',
      telephone: PHONE,
      score: 42,
      heuresMois: 12,
      coutAn: 18000,
      parametres: {
        clients: 40,
        outils: 5,
        relanceHeures: 6,
        dossiersDivergents: 8,
        tempsStatutMinutes: 12,
        tauxHoraire: 45,
      },
      allPacks: automationPacks,
      selectedPackIds: [],
      date: '1 septembre 2026',
    }),
  )

  const asLatin1 = buffer.toString('latin1')
  const hasPhone = asLatin1.includes(PHONE)
  const hasLabel = asLatin1.includes('T') && asLatin1.includes('l') // Helvetica encoding may split
  console.log(JSON.stringify({ bytes: buffer.length, hasPhone, sampleIncludesTelephoneWord: asLatin1.includes('Téléphone') || asLatin1.includes('Telephone') }))
  if (!hasPhone) process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
