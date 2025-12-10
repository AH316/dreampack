import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      category: true,
    },
  })
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found - DreamPack',
    }
  }

  return {
    title: `${product.name} - DreamPack`,
    description: product.description || `View details for ${product.name}`,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const specs = product.specs as Record<string, string> | null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center gap-2 text-neutral-500 flex-wrap">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-primary">Products</Link></li>
          {product.category && (
            <>
              <li>/</li>
              <li>
                <Link href={`/category/${product.category.slug}`} className="hover:text-primary">
                  {product.category.name}
                </Link>
              </li>
            </>
          )}
          <li>/</li>
          <li className="text-neutral-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-neutral-100 rounded-xl relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-24 h-24 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {product.category && (
            <Link
              href={`/category/${product.category.slug}`}
              className="text-sm text-primary font-medium hover:underline"
            >
              {product.category.name}
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            {product.name}
          </h1>

          {product.sku && (
            <p className="text-sm text-neutral-500 mb-4">SKU: {product.sku}</p>
          )}

          {product.description && (
            <p className="text-neutral-600 mb-6 text-lg">
              {product.description}
            </p>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-900 mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.split(',').map((size: string) => (
                  <span
                    key={size}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium"
                  >
                    {size.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Specifications */}
          {specs && Object.keys(specs).length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-900 mb-3">Specifications</h3>
              <dl className="grid grid-cols-1 gap-2">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex">
                    <dt className="w-1/3 text-neutral-500 capitalize">
                      {key.replace(/_/g, ' ')}:
                    </dt>
                    <dd className="w-2/3 text-neutral-900">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-neutral-900 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-2">Ready to Order?</h2>
            <p className="text-neutral-300 mb-4">
              Contact us for pricing, bulk orders, and custom printing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+19737277112"
                className="flex-1 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Call (973) 727-7112
              </a>
              <a
                href="mailto:aipek@dreampackss.com"
                className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
