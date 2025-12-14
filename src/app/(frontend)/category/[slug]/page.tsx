import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { categories, products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ProductGrid } from '@/components/product'

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
      <ProductGrid
        products={categoryProducts.map((p) => ({
          ...p,
          category: {
            id: category.id,
            name: category.name,
            slug: category.slug,
          },
        }))}
      />

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
            href="tel:+19738361100"
            className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Call (973) 836-1100
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
