'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Search, FolderTree, ArrowUpDown } from 'lucide-react'
import { DeleteButton } from '@/components/admin/delete-button'
import { deleteCategory } from './actions'

interface Category {
  id: string
  name: string
  slug: string
  images: string[] | null
  productCount: number
}

interface CategoriesTableProps {
  categories: Category[]
}

type SortField = 'name' | 'slug' | 'products'
type SortDirection = 'asc' | 'desc'

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const filteredCategories = useMemo(() => {
    let result = categories

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.slug.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'slug':
          comparison = a.slug.localeCompare(b.slug)
          break
        case 'products':
          comparison = a.productCount - b.productCount
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [categories, search, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
    >
      {children}
      <ArrowUpDown className={`h-3 w-3 ${sortField === field ? 'opacity-100' : 'opacity-40'}`} />
    </button>
  )

  return (
    <div className="space-y-4">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 max-w-md"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCategories.length} of {categories.length} categories
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">Image</TableHead>
              <TableHead>
                <SortButton field="name">Name</SortButton>
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                <SortButton field="slug">Slug</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="products">Products</SortButton>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <FolderTree className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">No categories found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {search
                        ? 'Try adjusting your search'
                        : 'Get started by creating your first category'}
                    </p>
                    {!search && (
                      <Button asChild size="sm">
                        <Link href="/admin/categories/new">Add Category</Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {category.images && category.images.length > 0 ? (
                      <div className="relative w-12 h-12 rounded-md overflow-hidden border bg-muted">
                        <Image
                          src={category.images[0]}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                        <FolderTree className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground sm:hidden">
                        /{category.slug}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-muted-foreground font-mono text-sm">
                      /{category.slug}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.productCount > 0 ? 'secondary' : 'outline'}>
                      {category.productCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/categories/${category.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteButton
                        itemName={category.name}
                        itemType="Category"
                        deleteAction={() => deleteCategory(category.id)}
                        disabled={category.productCount > 0}
                        disabledReason={
                          category.productCount > 0
                            ? `Cannot delete: ${category.productCount} products in this category`
                            : undefined
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
