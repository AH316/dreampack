'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart/cart-context'
import type { CartItem as CartItemType } from '@/lib/cart/cart-types'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleIncrement = () => {
    updateQuantity(item.productId, item.quantity + 1, item.size)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1, item.size)
    } else {
      removeItem(item.productId, item.size)
    }
  }

  const handleRemove = () => {
    removeItem(item.productId, item.size)
  }

  return (
    <div className="flex gap-3 py-4 border-b border-neutral-200 last:border-0">
      {/* Product Image */}
      <Link
        href={`/product/${item.productSlug}`}
        className="flex-shrink-0 w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden relative"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-neutral-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.productSlug}`}
          className="font-medium text-neutral-900 hover:text-primary transition-colors line-clamp-2"
        >
          {item.name}
        </Link>
        {item.size && (
          <p className="text-sm text-neutral-500 mt-0.5">Size: {item.size}</p>
        )}
        {item.category && (
          <p className="text-xs text-neutral-400 mt-0.5">{item.category}</p>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-medium">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
