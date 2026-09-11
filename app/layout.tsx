import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kls3-dev.com"),
  title: {
    default: "KLS3 — Operational Intelligence",
    template: "%s | KLS3",
  },
  description:
    "KLS3 identifie les frictions invisibles qui ralentissent vos opérations et les transforme en systèmes fluides, pilotables et automatisés.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.kls3-dev.com",
    siteName: "KLS3",
    title: "KLS3 — Operational Intelligence",
    description:
      "KLS3 identifie les frictions invisibles qui ralentissent vos opérations et les transforme en systèmes fluides, pilotables et automatisés.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KLS3 — Operational Intelligence",
    description:
      "KLS3 identifie les frictions invisibles qui ralentissent vos opérations et les transforme en systèmes fluides, pilotables et automatisés.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased">
      <body className="bg-[#0D0D0D] text-[#F0EDE8] min-h-screen flex flex-col">
        <Navbar />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'KLS3',
            url: 'https://www.kls3-dev.com',
            logo: 'https://www.kls3-dev.com/logo-kls3-512.png',
            description:
              'KLS3 identifie les frictions invisibles qui ralentissent vos opérations et les transforme en systèmes fluides, pilotables et automatisés.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '14, allée du fairway',
              addressLocality: 'Sarreguemines',
              postalCode: '57200',
              addressCountry: 'FR',
            },
            sameAs: ['https://www.linkedin.com/company/kls3/'],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@kls3-dev.com',
              contactType: 'customer service',
              availableLanguage: 'French',
            },
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'KLS3',
            url: 'https://www.kls3-dev.com',
            description:
              'KLS3 identifie les frictions invisibles qui ralentissent vos opérations et les transforme en systèmes fluides, pilotables et automatisés.',
            inLanguage: 'fr-FR',
            publisher: {
              '@type': 'Organization',
              name: 'KLS3',
              url: 'https://www.kls3-dev.com',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://www.kls3-dev.com/blog?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
