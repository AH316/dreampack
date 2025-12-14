import { ReactNode } from 'react'
import { Header, Footer, FloatingContact } from '@/components/layout'
import { CartProvider } from '@/lib/cart/cart-context'
import { CartDrawer } from '@/components/cart'

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}
