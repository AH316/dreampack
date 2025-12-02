import Link from 'next/link'

export const metadata = {
  title: 'About Us - DreamPack',
  description: 'Learn about DreamPack - your trusted packaging partner in New York since 2010.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
        About DreamPack
      </h1>

      {/* Hero Text */}
      <div className="bg-primary/10 rounded-xl p-8 mb-12 text-center">
        <p className="text-xl text-neutral-700 leading-relaxed">
          DreamPack is your trusted partner for quality packaging solutions.
          We serve small businesses across New York with premium paper bags,
          food packaging, and custom printing services.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Story</h2>
        <div className="prose prose-lg text-neutral-600">
          <p className="mb-4">
            Founded with a simple mission: to provide small businesses with access to quality
            packaging at wholesale prices. We understand that packaging is more than just a
            container - it's the first impression your customers have of your brand.
          </p>
          <p>
            Based in New York, we've built lasting relationships with businesses of all sizes,
            from local delis and bakeries to retail stores and restaurants. Our commitment to
            quality products and personal service has made us a trusted name in the packaging industry.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Quality Products</h3>
            <p className="text-neutral-600">
              We source only premium materials that meet our strict quality standards.
              Every product is inspected to ensure it meets your expectations.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Personal Service</h3>
            <p className="text-neutral-600">
              When you call DreamPack, you talk to a real person who understands your needs.
              We're here to help you find the right solution for your business.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Competitive Pricing</h3>
            <p className="text-neutral-600">
              Wholesale pricing designed for small businesses. We believe quality packaging
              shouldn't break the bank, with flexible minimum orders.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Fast Turnaround</h3>
            <p className="text-neutral-600">
              We keep popular items in stock for quick delivery. Custom orders are
              processed efficiently to get you what you need when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">What We Offer</h2>
        <div className="bg-neutral-900 rounded-xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Paper Shopping Bags',
              'Kraft Paper Bags',
              'Reusable Bags',
              'Food Containers',
              'Deli Containers',
              'Gift Boxes',
              'Tissue Paper',
              'Stretch Film',
              'Garbage Bags',
              'Custom Printing',
              'Plastic Bags',
              'Specialty Packaging',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-white/90 mb-6">
          Contact us today to discuss your packaging needs and get a custom quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+19737277112"
            className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Call (973) 727-7112
          </a>
          <Link
            href="/products"
            className="bg-primary-dark hover:bg-primary-dark/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors border border-white/20"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  )
}
