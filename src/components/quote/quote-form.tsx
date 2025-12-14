'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart/cart-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/components/cart/cart-item'

export function QuoteForm() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.get('name'),
          customerEmail: formData.get('email'),
          customerPhone: formData.get('phone'),
          companyName: formData.get('company'),
          items: cart.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
          })),
          message: formData.get('message'),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to submit quote')
        setIsSubmitting(false)
        return
      }

      setSuccess(true)
      clearCart()

      // Redirect to confirmation after short delay
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Quote Request Submitted!
        </h2>
        <p className="text-neutral-600 mb-4">
          Thank you for your interest. We'll get back to you within 24 hours with pricing.
        </p>
        <p className="text-sm text-neutral-500">Redirecting to home page...</p>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
        <p className="text-neutral-600 mb-4">
          Add products to your cart to request a quote.
        </p>
        <Button onClick={() => router.push('/products')}>Browse Products</Button>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Cart Items */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Your Items</h2>
        <div className="bg-neutral-50 rounded-xl p-4">
          {cart.items.map((item) => (
            <CartItem key={`${item.productId}-${item.size || 'default'}`} item={item} />
          ))}
        </div>
        <p className="text-sm text-neutral-500 mt-2">
          {cart.items.reduce((sum, item) => sum + item.quantity, 0)} items total
        </p>
      </div>

      {/* Quote Form */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Contact Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="Company name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Notes</Label>
            <Textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Any special requirements, quantities, or questions..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent-dark"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </Button>

          <p className="text-sm text-neutral-500 text-center">
            We'll contact you within 24 hours with pricing information.
          </p>
        </form>
      </div>
    </div>
  )
}
