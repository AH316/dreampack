'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { AddToCartButton } from '@/components/cart'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Product {
  id: string
  name: string
  slug: string
  description?: string | null
  images: string[] | null
  sizes?: string | null
  sku?: string | null
  specs?: Record<string, unknown> | null
  category?: {
    id: string
    name: string
    slug: string
  } | null
}

interface QuickViewModalProps {
  product: Product
  onClose: () => void
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()

  const images = product.images || []
  const sizes = product.sizes
    ? product.sizes.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative bg-neutral-100 aspect-square md:aspect-auto md:h-full">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? 'bg-primary'
                              : 'bg-white/70 hover:bg-white'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-neutral-300"
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

          {/* Details Section */}
          <div className="p-6 flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-neutral-900 pr-8">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {product.category && (
              <Link
                href={`/category/${product.category.slug}`}
                onClick={onClose}
                className="text-sm text-primary hover:underline mt-1"
              >
                {product.category.name}
              </Link>
            )}

            {product.sku && (
              <p className="text-sm text-neutral-500 mt-2">SKU: {product.sku}</p>
            )}

            {product.description && (
              <p className="text-neutral-600 mt-4 line-clamp-4">
                {product.description}
              </p>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-neutral-900 mb-2">
                  Available Sizes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size === selectedSize ? undefined : size)}
                      className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto pt-6 space-y-3">
              <AddToCartButton
                productId={product.id}
                productSlug={product.slug}
                name={product.name}
                image={images[0] || null}
                category={product.category?.name || null}
                size={selectedSize}
                className="w-full"
              />
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="block w-full text-center px-6 py-3 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
