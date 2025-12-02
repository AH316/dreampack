import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { getCardUrl } from '@/lib/media'
import type { Media } from '@/payload-types'
import SearchForm from './SearchForm'

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q} - DreamPack` : 'Search Products - DreamPack',
    description: 'Search our catalog of packaging products',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category } = await searchParams
  const payload = await getPayloadClient()

  // Fetch all categories for filter
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'order',
  })

  // Build search query
  let products: any[] = []
  if (q || category) {
    const whereConditions: any[] = []

    // Text search on name, shortDescription, and sku (not richText description)
    if (q) {
      whereConditions.push({
        or: [
          { name: { contains: q } },
          { shortDescription: { contains: q } },
          { sku: { contains: q } },
        ],
      })
    }

    // Category filter
    if (category) {
      const categoryDoc = categories.find(c => c.slug === category)
      if (categoryDoc) {
        whereConditions.push({ category: { equals: categoryDoc.id } })
      }
    }

    const { docs } = await payload.find({
      collection: 'products',
      where: whereConditions.length > 0 ? { and: whereConditions } : {},
      sort: 'name',
      limit: 50,
    })
    products = docs
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Search Products</h1>

      {/* Search Form */}
      <SearchForm
        initialQuery={q || ''}
        initialCategory={category || ''}
        categories={categories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))}
      />

      {/* Results */}
      {(q || category) && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-neutral-700">
              {products.length} result{products.length !== 1 ? 's' : ''}
              {q && <span className="text-neutral-500"> for "{q}"</span>}
              {category && (
                <span className="text-neutral-500">
                  {' '}in {categories.find(c => c.slug === category)?.name}
                </span>
              )}
            </h2>
            {(q || category) && (
              <Link
                href="/search"
                className="text-sm text-primary hover:underline"
              >
                Clear filters
              </Link>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                    {product.images && product.images[0] && typeof product.images[0].image === 'object' && getCardUrl(product.images[0].image as Media) ? (
                      <Image
                        src={getCardUrl(product.images[0].image as Media)}
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
                  <div className="p-4">
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {product.sku && (
                      <p className="text-xs text-neutral-500 mt-1">SKU: {product.sku}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-50 rounded-xl">
              <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No products found</h3>
              <p className="text-neutral-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* No search yet */}
      {!q && !category && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-neutral-700 mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="bg-neutral-50 hover:bg-primary hover:text-white rounded-xl p-4 text-center transition-colors"
              >
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
