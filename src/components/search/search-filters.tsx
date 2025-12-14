'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Category {
  id: string
  name: string
  slug: string
}

interface SearchFiltersProps {
  categories: Category[]
  currentCategory?: string
  currentSort?: string
}

export function SearchFilters({
  categories,
  currentCategory,
  currentSort,
}: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })

      return newParams.toString()
    },
    [searchParams]
  )

  const handleCategoryChange = (categorySlug: string | null) => {
    const queryString = createQueryString({ category: categorySlug })
    router.push(`/search?${queryString}`)
  }

  const handleSortChange = (sort: string) => {
    const queryString = createQueryString({ sort: sort === 'name-asc' ? null : sort })
    router.push(`/search?${queryString}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !currentCategory
              ? 'bg-primary text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currentCategory === cat.slug
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-neutral-600">
          Sort by:
        </label>
        <select
          id="sort"
          value={currentSort || 'name-asc'}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  )
}
