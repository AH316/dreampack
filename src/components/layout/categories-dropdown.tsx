'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

export function CategoriesDropdown() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data)
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-neutral-700 hover:text-primary hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-48 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/products"
                    className={cn(
                      'block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors',
                      'hover:bg-neutral-100 hover:text-primary focus:bg-neutral-100'
                    )}
                  >
                    All Products
                  </Link>
                </NavigationMenuLink>
              </li>
              <li className="my-1 h-px bg-neutral-200" aria-hidden="true" />
              {isLoading ? (
                <li className="px-3 py-2 text-sm text-neutral-500">Loading...</li>
              ) : (
                categories.map((category) => (
                  <li key={category.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/category/${category.slug}`}
                        className={cn(
                          'block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors',
                          'hover:bg-neutral-100 hover:text-primary focus:bg-neutral-100'
                        )}
                      >
                        {category.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
