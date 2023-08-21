import { ReactNode } from 'react'
import Providers from 'app/utils/provider'
import './styles/globals.css'

export const metadata = {
  title: 'Adega Online',
  description: 'Sistema para Adega Online'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
