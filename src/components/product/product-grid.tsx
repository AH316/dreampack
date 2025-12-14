'use client'

import { useState } from 'react'
import { ProductCard } from './product-card'
import { QuickViewModal } from './quick-view-modal'

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

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const handleQuickView = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setQuickViewProduct(product)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            images={product.images}
            category={product.category}
            sizes={product.sizes}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  )
}
