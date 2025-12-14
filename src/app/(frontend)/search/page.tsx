import Link from 'next/link'
import { db } from '@/db'
import { products, categories } from '@/db/schema'
import { ilike, or, and, eq, desc, asc } from 'drizzle-orm'
import { ProductGrid } from '@/components/product'
import { SearchFilters } from '@/components/search/search-filters'

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q} - DreamPack` : 'Search Products - DreamPack',
    description: 'Search our catalog of packaging products',
  }
}

async function searchProducts(query: string, categorySlug?: string, sort?: string) {
  const conditions = []

  // Text search condition
  if (query) {
    conditions.push(
      or(
        ilike(products.name, `%${query}%`),
        ilike(products.description, `%${query}%`)
      )
    )
  }

  // Category filter
  if (categorySlug) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    })
    if (category) {
      conditions.push(eq(products.categoryId, category.id))
    }
  }

  // Determine sort order
  let orderBy
  switch (sort) {
    case 'name-desc':
      orderBy = [desc(products.name)]
      break
    case 'newest':
      orderBy = [desc(products.createdAt)]
      break
    default:
      orderBy = [asc(products.name)]
  }

  return await db.query.products.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    with: {
      category: true,
    },
    orderBy: () => orderBy,
  })
}

async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name)
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category, sort } = await searchParams
  const [searchResults, allCategories] = await Promise.all([
    (q || category) ? searchProducts(q || '', category, sort) : Promise.resolve([]),
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

      {(q || category) ? (
        <div>
          {/* Filters */}
          <SearchFilters
            categories={allCategories}
            currentCategory={category}
            currentSort={sort}
          />

          <p className="text-neutral-600 mb-6">
            {searchResults.length > 0 ? (
              <>
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                {q && <> for: <span className="font-semibold">&quot;{q}&quot;</span></>}
                {category && (
                  <span className="text-primary ml-1">
                    in {allCategories.find((c) => c.slug === category)?.name}
                  </span>
                )}
              </>
            ) : (
              <>
                No results found
                {q && <> for: <span className="font-semibold">&quot;{q}&quot;</span></>}
              </>
            )}
          </p>

          {searchResults.length > 0 ? (
            <ProductGrid products={searchResults} />
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
