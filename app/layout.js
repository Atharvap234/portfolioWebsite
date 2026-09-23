import './globals.css'

export const metadata = {
  title: 'Atharva Petkar | AI & Data Science Engineer',
  description: 'Professional portfolio of Atharva Petkar - AI, Data Science & Machine Learning Engineer',
  keywords: 'AI, Data Science, Machine Learning, Python, Flask, AWS, AutoML, Engineer, Portfolio, Atharva Petkar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
