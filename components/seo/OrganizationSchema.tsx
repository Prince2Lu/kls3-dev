import JsonLd from '@/components/seo/JsonLd'
import { kls3CompanyInfo } from '@/lib/data/company-info'
import { SITE_URL } from '@/lib/seo'

export default function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: kls3CompanyInfo.nom,
        url: SITE_URL,
        logo: kls3CompanyInfo.logoUrl,
        description:
          'KLS3 connecte les outils métier des structures pluridisciplinaires de professions réglementées pour éliminer les frictions opérationnelles.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '14, allée du fairway',
          postalCode: '57200',
          addressLocality: 'Sarreguemines',
          addressCountry: 'FR',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Grand Est' },
          { '@type': 'Country', name: 'Luxembourg' },
        ],
        email: kls3CompanyInfo.email,
        founder: [
          { '@type': 'Person', name: 'Éric Scarpino' },
          { '@type': 'Person', name: 'Lilian Scarpino' },
        ],
        sameAs: ['https://www.linkedin.com/company/kls3/'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: kls3CompanyInfo.email,
          contactType: 'customer service',
          availableLanguage: 'French',
        },
      }}
    />
  )
}
