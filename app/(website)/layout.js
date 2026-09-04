import "./resources/web-globals.css"
import { Outfit } from "next/font/google"

const font = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] })

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "Musée National des Arts & Civilisations | Billetterie Officielle & E-Tickets",
    description: "Réservez vos billets en ligne pour le Musée National des Arts & Civilisations. Découvrez des siècles de patrimoine, collections antiques et chefs-d'œuvre mondiaux sans file d'attente.",
    keywords: "musée national, musée des arts et civilisations, billetterie musée, ticket musée en ligne, exposition temporaire, visite guidée musée",
    authors: [{name: "Musée National des Arts & Civilisations & Somayar"}]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" style={{ scrollBehavior: 'smooth' }}>
      <body className={font.className} style={{ margin: 0, overflowX: 'hidden' }}>{children}</body>
    </html>
  )
}