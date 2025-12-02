import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { getCardUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

export const metadata = {
  title: 'All Products - DreamPack',
  description: 'Browse our complete catalog of packaging products including paper bags, food containers, gift boxes, and more.',
}

export default async function ProductsPage() {
  const payload = await getPayloadClient()

  // Fetch all categories
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'order',
  })

  // Fetch all products
  const { docs: products } = await payload.find({
    collection: 'products',
    sort: 'name',
    limit: 100,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          All Products
        </h1>
        <p className="text-lg text-neutral-600">
          Browse our complete catalog of packaging solutions
        </p>
      </div>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-4 py-2 bg-neutral-100 hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const imgUrl = product.images && product.images[0] && typeof product.images[0].image === 'object'
              ? getCardUrl(product.images[0].image as Media)
              : ''
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                {product.sku && (
                  <p className="text-xs text-neutral-500 mt-1">SKU: {product.sku}</p>
                )}
                {product.pricing?.showPrice && product.pricing?.price && (
                  <p className="text-primary font-bold mt-2">
                    ${product.pricing.price.toFixed(2)}
                    {product.pricing.unit && (
                      <span className="text-sm text-neutral-500 font-normal"> / {product.pricing.unit}</span>
                    )}
                  </p>
                )}
              </div>
            </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-xl">
          <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-lg font-medium text-neutral-600 mb-2">No products yet</h3>
          <p className="text-neutral-500">Products will appear here once added to the catalog.</p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-12 bg-neutral-900 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Can't Find What You Need?</h2>
        <p className="text-neutral-300 mb-6">
          We offer custom packaging solutions and can source products not listed in our catalog.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+19737277112"
            className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Call (973) 727-7112
          </a>
          <a
            href="mailto:aipek@dreampackss.com"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
