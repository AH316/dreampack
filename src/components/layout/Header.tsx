'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import MobileNav from './MobileNav'
import { CartButton } from '@/components/cart'
import { CategoriesDropdown } from './categories-dropdown'

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/dreampack-logo.png"
                alt="DreamPack"
                width={180}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <CategoriesDropdown />
              <Link
                href="/about"
                className="text-neutral-700 hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-neutral-700 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Search, Cart & Contact */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/search" className="p-2 text-neutral-600 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              <CartButton />
              <a
                href="tel:+19738361100"
                className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-medium transition-colors ml-2"
              >
                Call Us
              </a>
            </div>

            {/* Mobile Cart & Menu Button */}
            <div className="flex md:hidden items-center gap-1">
              <CartButton />
              <button
                onClick={() => setMobileNavOpen(true)}
                className="p-2 text-neutral-700"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  )
}
