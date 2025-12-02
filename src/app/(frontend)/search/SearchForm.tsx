'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

interface SearchFormProps {
  initialQuery: string
  initialCategory: string
  categories: Array<{ id: string; name: string; slug: string }>
}

export default function SearchForm({
  initialQuery,
  initialCategory,
  categories,
}: SearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (category) params.set('category', category)

    startTransition(() => {
      router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`)
    })
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)

    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (newCategory) params.set('category', newCategory)

    startTransition(() => {
      router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, SKUs..."
            className="w-full px-4 py-3 pl-12 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
        >
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleCategoryChange('')}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            !category
              ? 'bg-primary text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              category === cat.slug
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </form>
  )
}
