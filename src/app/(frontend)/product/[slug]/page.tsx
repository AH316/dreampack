import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return {
    title: `${slug.replace(/-/g, ' ')} - DreamPack`,
    description: `View details for ${slug.replace(/-/g, ' ')}`,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center gap-2 text-neutral-500 flex-wrap">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-primary">Products</Link></li>
          <li>/</li>
          <li className="text-neutral-900 font-medium capitalize">{slug.replace(/-/g, ' ')}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Placeholder */}
        <div className="aspect-square bg-neutral-100 rounded-xl flex items-center justify-center">
          <svg className="w-24 h-24 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 capitalize">
            {slug.replace(/-/g, ' ')}
          </h1>

          <p className="text-neutral-600 mb-6">
            Product details will be displayed here once the product is added through the admin panel.
          </p>

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
