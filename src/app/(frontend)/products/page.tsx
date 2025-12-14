import Link from 'next/link'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { ProductGrid } from '@/components/product'

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
      <ProductGrid products={allProducts} />

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
            href="tel:+19738361100"
            className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Call (973) 836-1100
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
