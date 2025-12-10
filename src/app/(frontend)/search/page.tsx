import Link from 'next/link'

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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams

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
            Showing results for: <span className="font-semibold">&quot;{q}&quot;</span>
          </p>
          <p className="text-neutral-500">
            Search functionality will be implemented once products are added through the admin panel.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-neutral-600 mb-8">
            Enter a search term to find products.
          </p>
          <h2 className="text-lg font-medium text-neutral-700 mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Paper Bags', 'Reusable Bags', 'Food Packaging', 'Gift Boxes', 'Stretch Film'].map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-neutral-50 hover:bg-primary hover:text-white rounded-xl p-4 text-center transition-colors"
              >
                <span className="font-medium">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
