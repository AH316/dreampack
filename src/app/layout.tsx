import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'DreamPack - Smart Packaging Solutions',
    template: '%s | DreamPack',
  },
  description: 'Quality packaging products for businesses. Paper bags, plastic bags, stretch film, and more. Serving businesses with smart packaging solutions.',
  keywords: ['packaging', 'paper bags', 'plastic bags', 'wholesale packaging', 'B2B packaging'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
