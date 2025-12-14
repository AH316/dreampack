'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/lib/cart/cart-context'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  productId: string
  productSlug: string
  name: string
  image: string | null
  category: string | null
  size?: string
  className?: string
  variant?: 'default' | 'icon' | 'small'
}

export function AddToCartButton({
  productId,
  productSlug,
  name,
  image,
  category,
  size,
  className,
  variant = 'default',
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      productId,
      productSlug,
      name,
      image,
      category,
      size,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-full transition-all',
          added
            ? 'bg-green-500 text-white'
            : 'bg-white/90 hover:bg-accent hover:text-white text-neutral-700 shadow-md',
          className
        )}
        aria-label={added ? 'Added to cart' : 'Add to cart'}
      >
        {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
      </button>
    )
  }

  if (variant === 'small') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-sm transition-all',
          added
            ? 'bg-green-500 text-white'
            : 'bg-accent hover:bg-accent-dark text-white',
          className
        )}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" />
            Added
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Add
          </>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all',
        added
          ? 'bg-green-500 text-white'
          : 'bg-accent hover:bg-accent-dark text-white',
        className
      )}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </>
      )}
    </button>
  )
}
