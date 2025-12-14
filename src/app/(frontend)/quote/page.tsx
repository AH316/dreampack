import { QuoteForm } from '@/components/quote/quote-form'

export const metadata = {
  title: 'Request Quote - DreamPack',
  description: 'Submit a quote request for DreamPack packaging products.',
}

export default function QuotePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Request a Quote
        </h1>
        <p className="text-lg text-neutral-600">
          Fill out your contact information and we'll get back to you with pricing.
        </p>
      </div>

      <QuoteForm />
    </div>
  )
}
