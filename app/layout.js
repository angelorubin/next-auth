// These styles apply to every route in the application
import './globals.css'

export const metadata = {
  title: 'Next Auth',
  description: 'Boilerplate de Autenticação com Next'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
