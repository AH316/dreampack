'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import { AddToCartButton } from '@/components/cart'

export interface ProductCardProps {
  id: string
  name: string
  slug: string
  images: string[] | null
  category?: {
    id: string
    name: string
    slug: string
  } | null
  sizes?: string | null
  onQuickView?: (productId: string) => void
}

export function ProductCard({
  id,
  name,
  slug,
  images,
  category,
  sizes,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const firstImage = images && images.length > 0 ? images[0] : null

  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${slug}`}>
        <div className="aspect-square bg-neutral-100 relative overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-neutral-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Hover Actions */}
      <div
        className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onQuickView(id)
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-primary hover:text-white text-neutral-700 shadow-md transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
        )}
        <AddToCartButton
          variant="icon"
          productId={id}
          productSlug={slug}
          name={name}
          image={firstImage}
          category={category?.name || null}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium text-neutral-900 line-clamp-2 mb-1 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="text-sm text-neutral-500 hover:text-primary transition-colors"
          >
            {category.name}
          </Link>
        )}
      </div>
    </div>
  )
}
