import Link from 'next/link'

export const metadata = {
  title: 'All Products - DreamPack',
  description: 'Browse our complete catalog of packaging products including paper bags, food containers, gift boxes, and more.',
}

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          All Products
        </h1>
        <p className="text-lg text-neutral-600">
          Browse our complete catalog of packaging solutions
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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

      <p className="text-center text-neutral-500 mt-8">
        Products will be displayed once added through the admin panel.
      </p>

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
