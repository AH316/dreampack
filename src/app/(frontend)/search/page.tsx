import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/db'
import { products, categories } from '@/db/schema'
import { ilike, or } from 'drizzle-orm'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q} - DreamPack` : 'Search Products - DreamPack',
    description: 'Search our catalog of packaging products',
  }
}

async function searchProducts(query: string) {
  if (!query) return []

  return await db.query.products.findMany({
    where: or(
      ilike(products.name, `%${query}%`),
      ilike(products.description, `%${query}%`)
    ),
    with: {
      category: true,
    },
    orderBy: (products, { asc }) => [asc(products.name)],
  })
}

async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name)
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const [searchResults, allCategories] = await Promise.all([
    q ? searchProducts(q) : Promise.resolve([]),
    getCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Search Products</h1>

      {/* Search Form */}
      <form className="mb-8">
        <div className="flex gap-4">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search products..."
            className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {q ? (
        <div>
          <p className="text-neutral-600 mb-8">
            {searchResults.length > 0 ? (
              <>Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for: <span className="font-semibold">&quot;{q}&quot;</span></>
            ) : (
              <>No results found for: <span className="font-semibold">&quot;{q}&quot;</span></>
            )}
          </p>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
                    <h3 className="font-medium text-neutral-900 line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    {product.category && (
                      <p className="text-sm text-neutral-500">
                        {product.category.name}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">
                Try different keywords or browse our categories below.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-neutral-600 mb-8">
            Enter a search term to find products.
          </p>
          <h2 className="text-lg font-medium text-neutral-700 mb-4">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allCategories.map((cat) => (
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
