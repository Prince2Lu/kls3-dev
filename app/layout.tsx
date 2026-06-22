import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'kls3.dev — Chef de projet, IA & SaaS',
    template: '%s | kls3.dev'
  },
  description: 'Chef de projet freelance, agents IA sur-mesure et développement SaaS pour cabinets d\'avocats, experts-comptables et corporate services.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://kls3-dev.com',
    siteName: 'kls3.dev',
    title: 'kls3.dev — Chef de projet, IA & SaaS',
    description: 'Chef de projet freelance, agents IA sur-mesure et développement SaaS pour cabinets d\'avocats, experts-comptables et corporate services.',
  },
  robots: {
    index: true,
    follow: true
  },
  metadataBase: new URL('https://kls3-dev.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="relative min-h-screen flex flex-col">
        {/* Orbes globaux */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          {/* Orbe violet — haut gauche */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: '#6d28d9',
            filter: 'blur(120px)',
            opacity: 0.15,
            top: '-100px',
            left: '-100px',
          }} />
          {/* Orbe cyan — haut droite */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: '#0ea5e9',
            filter: 'blur(120px)',
            opacity: 0.10,
            top: '-80px',
            right: '-80px',
          }} />
          {/* Orbe vert — bas centre */}
          <div style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: '#10b981',
            filter: 'blur(120px)',
            opacity: 0.07,
            bottom: '-80px',
            left: '40%',
          }} />
        </div>
        <div className="relative z-10 flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
