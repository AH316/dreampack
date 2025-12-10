import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Header, Footer, FloatingContact } from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </div>
      </body>
    </html>
  )
}
