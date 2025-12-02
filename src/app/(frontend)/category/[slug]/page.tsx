import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { getCardUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const category = docs[0]
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `${category.name} - DreamPack`,
    description: category.description || `Browse our ${category.name} products`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  // Fetch category
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const category = categories[0]
  if (!category) notFound()

  // Fetch subcategories for this category
  const { docs: subcategories } = await payload.find({
    collection: 'subcategories',
    where: { parentCategory: { equals: category.id } },
    sort: 'order',
  })

  // Fetch products in this category
  const { docs: products } = await payload.find({
    collection: 'products',
    where: { category: { equals: category.id } },
    sort: 'name',
    limit: 100,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center gap-2 text-neutral-500">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-primary">Products</Link></li>
          <li>/</li>
          <li className="text-neutral-900 font-medium">{category.name}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-lg text-neutral-600">{category.description}</p>
        )}
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Browse by Type</h2>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/category/${slug}?sub=${sub.slug}`}
                className="px-4 py-2 bg-neutral-100 hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
              >
                {sub.name}
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
                  {product.pricing?.minimumOrder && (
                    <p className="text-xs text-neutral-500">
                      Min. order: {product.pricing.minimumOrder}
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
          <p className="text-neutral-500">Products will appear here once added to this category.</p>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-12 bg-primary/10 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Need Help Choosing?</h2>
        <p className="text-neutral-600 mb-6">
          Our team can help you find the perfect packaging solution for your business.
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
            className="bg-white hover:bg-neutral-100 text-primary border border-primary px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
