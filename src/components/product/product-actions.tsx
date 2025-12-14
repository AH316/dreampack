'use client'

import { useState } from 'react'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { AddToCartButton } from '@/components/cart'
import { buildProductWhatsAppUrl } from '@/lib/whatsapp'

interface ProductActionsProps {
  product: {
    id: string
    name: string
    slug: string
    sku?: string | null
    images: string[] | null
    category?: {
      name: string
    } | null
    sizes?: string | null
  }
}

export function ProductActions({ product }: ProductActionsProps) {
  const sizes = product.sizes
    ? product.sizes.split(',').map((s) => s.trim()).filter(Boolean)
    : []
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes.length === 1 ? sizes[0] : undefined
  )

  const whatsAppUrl = buildProductWhatsAppUrl({
    name: product.name,
    sku: product.sku,
    size: selectedSize,
  })

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <h3 className="font-semibold text-neutral-900 mb-3">
            {sizes.length > 1 ? 'Select Size' : 'Available Size'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <AddToCartButton
        productId={product.id}
        productSlug={product.slug}
        name={product.name}
        image={product.images?.[0] || null}
        category={product.category?.name || null}
        size={selectedSize}
        className="w-full"
      />

      {/* Contact CTA */}
      <div className="bg-neutral-900 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Ready to Order?</h2>
        <p className="text-neutral-300 mb-4">
          Contact us for pricing, bulk orders, and custom printing options.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <a
              href="tel:+19738361100"
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
          <a
            href="mailto:aipek@dreampackss.com"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
