'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold text-primary">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-neutral-600"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                onClick={onClose}
                className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Search */}
          <div className="mt-6 pt-6 border-t">
            <Link
              href="/search"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Products
            </Link>
          </div>

          {/* Contact Actions */}
          <div className="mt-6 pt-6 border-t space-y-3">
            <a
              href="tel:+19737277112"
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (973) 727-7112
            </a>
            <a
              href="mailto:aipek@dreampackss.com"
              className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
