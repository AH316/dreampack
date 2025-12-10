import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { categories, products } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getCategoryWithProducts(slug: string) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  })

  if (!category) return null

  const categoryProducts = await db.query.products.findMany({
    where: eq(products.categoryId, category.id),
    orderBy: (products, { asc }) => [asc(products.name)],
  })

  return { category, products: categoryProducts }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const data = await getCategoryWithProducts(slug)

  if (!data) {
    return {
      title: 'Category Not Found - DreamPack',
    }
  }

  return {
    title: `${data.category.name} - DreamPack`,
    description: data.category.description || `Browse our ${data.category.name} products`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const data = await getCategoryWithProducts(slug)

  if (!data) {
    notFound()
  }

  const { category, products: categoryProducts } = data

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
          <p className="text-lg text-neutral-600">
            {category.description}
          </p>
        )}
        <p className="text-neutral-500 mt-2">
          {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categoryProducts.map((product) => (
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
              <h3 className="font-medium text-neutral-900 line-clamp-2">
                {product.name}
              </h3>
              {product.sizes && (
                <p className="text-sm text-neutral-500 mt-1">
                  {product.sizes.split(',').length} size{product.sizes.split(',').length !== 1 ? 's' : ''} available
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {categoryProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">
            No products in this category yet.
          </p>
          <Link href="/products" className="text-primary hover:underline mt-2 inline-block">
            Browse all products
          </Link>
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
