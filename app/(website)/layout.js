import "./resources/web-globals.css"
import { Outfit } from "next/font/google"

const font = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] })

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "Zoo de Rabat | Billetterie Officielle & E-Tickets",
    description: "Réservez vos billets en ligne pour le Jardin Zoologique de Rabat. Évitez les files d'attente et profitez d'une aventure sauvage en famille.",
    keywords: "zoo de rabat, billetterie zoo, achat ticket zoo, e-ticket rabat, jardin zoologique de rabat, safari rabat",
    authors: [{name: "Zoo de Rabat & Somayar"}]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" style={{ scrollBehavior: 'smooth' }}>
      <body className={font.className} style={{ margin: 0, overflowX: 'hidden' }}>{children}</body>
    </html>
  )
}