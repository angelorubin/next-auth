// These styles apply to every route in the application
import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export const metadata = {
  title: 'Next Auth',
  description: 'Boilerplate de Autenticação com Next'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <div className="flex h-screen w-full">{children}</div>
      </body>
    </html>
  )
}
