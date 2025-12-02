export const metadata = {
  title: 'Contact Us - DreamPack',
  description: 'Get in touch with DreamPack for packaging solutions, custom orders, and wholesale inquiries.',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
        Contact Us
      </h1>
      <p className="text-lg text-neutral-600 text-center mb-12">
        We're here to help with all your packaging needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-neutral-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Get In Touch</h2>

            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Phone</h3>
                  <a href="tel:+19737277112" className="text-primary hover:underline block">
                    (973) 727-7112
                  </a>
                  <a href="tel:+19737277112" className="text-neutral-600 text-sm">
                    Cell: (973) 727-7112
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">WhatsApp</h3>
                  <a
                    href="https://wa.me/19737277112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Email</h3>
                  <a href="mailto:aipek@dreampackss.com" className="text-primary hover:underline">
                    aipek@dreampackss.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Location</h3>
                  <p className="text-neutral-600">New York, NY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-neutral-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Business Hours</h2>
            <dl className="space-y-2 text-neutral-600">
              <div className="flex justify-between">
                <dt>Monday - Friday</dt>
                <dd className="font-medium text-neutral-900">9:00 AM - 5:00 PM</dd>
              </div>
              <div className="flex justify-between">
                <dt>Saturday</dt>
                <dd className="font-medium text-neutral-900">By Appointment</dd>
              </div>
              <div className="flex justify-between">
                <dt>Sunday</dt>
                <dd className="font-medium text-neutral-500">Closed</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-primary rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Quick Contact</h2>
            <p className="text-white/90 mb-6">
              The fastest way to reach us is by phone. We're ready to help with your packaging needs.
            </p>
            <a
              href="tel:+19737277112"
              className="block w-full bg-white text-primary hover:bg-neutral-100 px-6 py-4 rounded-lg font-semibold transition-colors text-center text-lg"
            >
              Call (973) 727-7112
            </a>
          </div>

          <div className="bg-accent rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Request a Quote</h2>
            <p className="text-white/90 mb-6">
              Send us an email with your requirements and we'll get back to you with pricing.
            </p>
            <a
              href="mailto:aipek@dreampackss.com?subject=Quote Request"
              className="block w-full bg-white text-accent hover:bg-neutral-100 px-6 py-4 rounded-lg font-semibold transition-colors text-center"
            >
              Email for Quote
            </a>
          </div>

          <div className="bg-neutral-900 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Paper bags & shopping bags
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Food packaging & containers
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Gift boxes & tissue paper
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom printing services
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Wholesale pricing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
