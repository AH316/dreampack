import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl, getCardUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = docs[0]
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} - DreamPack`,
    description: product.description || `View details for ${product.name}`,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  // Fetch product with related data
  const { docs: products } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = products[0]
  if (!product) notFound()

  // Get category info
  const category = typeof product.category === 'object' ? product.category : null

  // Fetch related products from same category
  const { docs: relatedProducts } = category
    ? await payload.find({
        collection: 'products',
        where: {
          and: [
            { category: { equals: category.id } },
            { id: { not_equals: product.id } },
          ],
        },
        limit: 4,
      })
    : { docs: [] }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center gap-2 text-neutral-500 flex-wrap">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-primary">Products</Link></li>
          {category && (
            <>
              <li>/</li>
              <li>
                <Link href={`/category/${category.slug}`} className="hover:text-primary">
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <li>/</li>
          <li className="text-neutral-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-4">
            {product.images && product.images[0] && typeof product.images[0].image === 'object' && getMediaUrl(product.images[0].image as Media) ? (
              <Image
                src={getMediaUrl(product.images[0].image as Media)}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
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

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => {
                const imgUrl = typeof img.image === 'object' ? getCardUrl(img.image as Media) : ''
                return imgUrl ? (
                  <div key={index} className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null
              })}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            {product.name}
          </h1>

          {product.sku && (
            <p className="text-neutral-500 mb-4">SKU: {product.sku}</p>
          )}

          {/* Pricing */}
          {product.pricing?.showPrice && product.pricing?.price && (
            <div className="bg-primary/10 rounded-lg p-4 mb-6">
              <p className="text-3xl font-bold text-primary">
                ${product.pricing.price.toFixed(2)}
                {product.pricing.unit && (
                  <span className="text-lg text-neutral-600 font-normal"> / {product.pricing.unit}</span>
                )}
              </p>
              {product.pricing.minimumOrder && (
                <p className="text-neutral-600 mt-1">
                  Minimum order: {product.pricing.minimumOrder}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Description</h2>
              <p className="text-neutral-600 whitespace-pre-wrap">{product.description}</p>
            </div>
          )}

          {/* Sizes */}
          {product.filterableAttributes?.sizes && product.filterableAttributes.sizes.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Available Sizes</h2>
              <div className="flex flex-wrap gap-2">
                {product.filterableAttributes.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 rounded-full text-sm"
                  >
                    {size.size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Material */}
          {product.filterableAttributes?.material && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Material</h2>
              <p className="text-neutral-600 capitalize">{product.filterableAttributes.material}</p>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Specifications</h2>
              <dl className="grid grid-cols-2 gap-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="bg-neutral-50 p-3 rounded-lg">
                    <dt className="text-sm text-neutral-500">{spec.label}</dt>
                    <dd className="font-medium text-neutral-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Stock Status */}
          <div className="mb-6">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
              product.stockStatus === 'in_stock'
                ? 'bg-green-100 text-green-800'
                : product.stockStatus === 'low_stock'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stockStatus === 'in_stock' && 'In Stock'}
              {product.stockStatus === 'low_stock' && 'Low Stock'}
              {product.stockStatus === 'out_of_stock' && 'Out of Stock'}
            </span>
          </div>

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
                href={`mailto:aipek@dreampackss.com?subject=Inquiry: ${encodeURIComponent(product.name)}`}
                className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      {product.faq && product.faq.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {product.faq.map((item, index) => (
              <details
                key={index}
                className="bg-neutral-50 rounded-lg overflow-hidden group"
              >
                <summary className="p-4 cursor-pointer font-medium text-neutral-900 hover:bg-neutral-100 transition-colors">
                  {item.question}
                </summary>
                <div className="px-4 pb-4 text-neutral-600">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => {
              const relatedImgUrl = relatedProduct.images && relatedProduct.images[0] && typeof relatedProduct.images[0].image === 'object'
                ? getCardUrl(relatedProduct.images[0].image as Media)
                : ''
              return (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                    {relatedImgUrl ? (
                      <Image
                        src={relatedImgUrl}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-neutral-900 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                      {relatedProduct.name}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
