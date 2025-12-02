import { ReactNode } from 'react'
import '../globals.css'
import { Header, Footer, FloatingContact } from '@/components/layout'

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  )
}
