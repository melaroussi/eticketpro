import "../../resources/web-globals.css"
import { Roboto } from "next/font/google"

const font = Roboto({ subsets: ["greek"], weight:"400" })

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "Accsellium Privacy Policy",
    description: "Privacy Policy Terms",
    keywords: "item.artcleKeywords",
    authors: [{name: "Dr. Smail Tigani"}]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}