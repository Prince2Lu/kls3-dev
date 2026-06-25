import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
