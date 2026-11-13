import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import Analytics from "@/components/consent/Analytics";
import CookieConsent from "@/components/consent/CookieConsent";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

const DEFAULT_TITLE = "KLS3 — Moins de tâches manuelles. Plus de temps pour l'essentiel.";
const DEFAULT_DESCRIPTION =
  "KLS3 simplifie vos processus, automatise vos opérations et crée les outils qui vont avec.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kls3-dev.com"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | KLS3",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.kls3-dev.com",
    siteName: "KLS3",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  // Previews Vercel non indexées, production indexée
  robots:
    process.env.VERCEL_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
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
    <html lang="fr" className="antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@400..800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="bg-[#FAFAF8] text-[#12112d] min-h-screen flex flex-col">
        <OrganizationSchema />
        <WebSiteSchema />
        <SiteChrome>{children}</SiteChrome>
        {/* GA chargé uniquement après consentement ; bandeau affiché sur tout le site, /demo et /carte compris */}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
