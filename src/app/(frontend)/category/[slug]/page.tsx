import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const categoryName = slug.replace(/-/g, ' ')
  return {
    title: `${categoryName} - DreamPack`,
    description: `Browse our ${categoryName} products`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const categoryName = slug.replace(/-/g, ' ')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center gap-2 text-neutral-500">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-primary">Products</Link></li>
          <li>/</li>
          <li className="text-neutral-900 font-medium capitalize">{categoryName}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 capitalize">
          {categoryName}
        </h1>
        <p className="text-lg text-neutral-600">
          Products in this category will be displayed once added through the admin panel.
        </p>
      </div>

      {/* Products Grid Placeholder */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden border border-neutral-200">
            <div className="aspect-square bg-neutral-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="p-4">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-neutral-100 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

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
