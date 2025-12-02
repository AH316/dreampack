import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { getThumbnailUrl, getCardUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

export default async function HomePage() {
  const payload = await getPayloadClient()

  // Fetch categories ordered by 'order' field
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 12,
  })

  // Fetch featured products
  const { docs: featuredProducts } = await payload.find({
    collection: 'products',
    where: {
      featured: { equals: true },
    },
    limit: 6,
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
            Smart Packaging Solutions
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Quality paper bags, food packaging, and custom printing for small businesses.
            Serving New York since 2010.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
              Browse Products
            </Link>
            <a
              href="tel:+19737277112"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
              Call (973) 727-7112
            </a>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Product Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.length > 0 ? (
              categories.map((category) => {
                const categoryImgUrl = category.image && typeof category.image === 'object'
                  ? getThumbnailUrl(category.image as Media)
                  : ''
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group bg-neutral-50 rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    {categoryImgUrl ? (
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200">
                        <Image
                          src={categoryImgUrl}
                          alt={category.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                    <h3 className="font-semibold text-neutral-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </Link>
                )
              })
            ) : (
              // Placeholder categories when database is empty
              ['Paper Bags', 'Reusable Bags', 'Plastic Bags', 'Food Packaging', 'Gift Boxes', 'Stretch Film'].map((name) => (
                <div
                  key={name}
                  className="bg-neutral-50 rounded-xl p-6 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-800">{name}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => {
                const productImgUrl = product.images && product.images[0] && typeof product.images[0].image === 'object'
                  ? getCardUrl(product.images[0].image as Media)
                  : ''
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square bg-neutral-100">
                      {productImgUrl ? (
                        <Image
                          src={productImgUrl}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
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
                      <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                      {product.pricing?.showPrice && product.pricing?.price && (
                        <p className="text-primary font-bold mt-1">
                          ${product.pricing.price.toFixed(2)}
                          {product.pricing.unit && <span className="text-sm text-neutral-500 font-normal"> / {product.pricing.unit}</span>}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose DreamPack?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-light mb-2">Quality Products</h3>
              <p className="text-neutral-400">Premium packaging materials that protect your products and impress your customers.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-light mb-2">Personal Service</h3>
              <p className="text-neutral-400">Direct phone support and personalized attention for every order, big or small.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-light mb-2">Wholesale Pricing</h3>
              <p className="text-neutral-400">Competitive prices designed for small businesses with flexible minimum orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Call us today or browse our catalogue to find the perfect packaging for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19737277112"
              className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
              Call (973) 727-7112
            </a>
            <a
              href="mailto:aipek@dreampackss.com"
              className="bg-primary-dark hover:bg-primary-dark/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg border border-white/20"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
