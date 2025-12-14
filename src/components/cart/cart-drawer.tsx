'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart/cart-context'
import { CartItem } from './cart-item'
import { buildCartWhatsAppUrl } from '@/lib/whatsapp'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

export function CartDrawer() {
  const { cart, isOpen, closeCart, clearCart, itemCount } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
            {itemCount > 0 && (
              <span className="text-sm font-normal text-neutral-500">
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            Review your items and request a quote
          </SheetDescription>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Your cart is empty</h3>
            <p className="text-sm text-neutral-500 mb-6">
              Browse our products and add items to your cart
            </p>
            <Link
              href="/products"
              onClick={closeCart}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              {cart.items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.size || 'default'}`}
                  item={item}
                />
              ))}
            </div>

            {/* Cart Actions */}
            <div className="border-t border-neutral-200 pt-4 mt-4 space-y-3">
              <Link
                href="/quote"
                onClick={closeCart}
                className="block w-full bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Request Quote
              </Link>

              <div className="flex gap-3">
                <a
                  href={buildCartWhatsAppUrl(cart.items)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-center text-sm"
                >
                  Order via WhatsApp
                </a>
                <button
                  onClick={clearCart}
                  className="px-4 py-2.5 border border-neutral-300 hover:bg-neutral-100 rounded-lg font-medium transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
