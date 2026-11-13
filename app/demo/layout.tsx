// Garde l'ancien fond sombre de la page (le body du site est passé en clair avec le design V5)
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="kls-dark min-h-screen">{children}</div>
}
