import Link from 'next/link'
import { getSettings } from '@/lib/settings'

export const metadata = {
  title: 'About Us - DreamPack',
  description: 'Learn about DreamPack - your trusted packaging partner serving New York, New Jersey, and North America since 2010.',
}

const iconMap: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  dollar: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  truck: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  check: (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default async function AboutPage() {
  const settings = await getSettings()
  const { aboutPage, contactInfo } = settings

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
        About DreamPack
      </h1>

      {/* Hero Text */}
      <div className="bg-primary/10 rounded-xl p-8 mb-12 text-center">
        <p className="text-xl text-neutral-700 leading-relaxed">
          {aboutPage.heroText}
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">{aboutPage.storyTitle}</h2>
        <div className="prose prose-lg text-neutral-600">
          {aboutPage.storyContent.split('\n\n').map((paragraph, index) => (
            <p key={index} className={index < aboutPage.storyContent.split('\n\n').length - 1 ? 'mb-4' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Values */}
      {aboutPage.values.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutPage.values.map((value, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  {iconMap[value.icon] || iconMap.check}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      {aboutPage.offerings.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">What We Offer</h2>
          <div className="bg-neutral-900 rounded-xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {aboutPage.offerings.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">{aboutPage.ctaTitle}</h2>
        <p className="text-white/90 mb-6">{aboutPage.ctaText}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
            className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Call {contactInfo.phone}
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
