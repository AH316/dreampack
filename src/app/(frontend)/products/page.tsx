import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/db'
import { products, categories } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const metadata = {
  title: 'All Products - DreamPack',
  description: 'Browse our complete catalog of packaging products including paper bags, food containers, gift boxes, and more.',
}

async function getProducts() {
  return await db.query.products.findMany({
    with: {
      category: true,
    },
    orderBy: (products, { asc }) => [asc(products.name)],
  })
}

async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name)
}

export default async function ProductsPage() {
  const [allProducts, allCategories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          All Products
        </h1>
        <p className="text-lg text-neutral-600">
          Browse our complete catalog of {allProducts.length} packaging solutions
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm"
          >
            All
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium text-sm transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {allProducts.map((product) => (
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

      {allProducts.length === 0 && (
        <p className="text-center text-neutral-500 mt-8">
          No products found.
        </p>
      )}

      {/* Contact CTA */}
      <div className="mt-12 bg-neutral-900 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Can&apos;t Find What You Need?</h2>
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
