import Link from 'next/link'
import { db } from '@/db'

export const dynamic = 'force-dynamic'
import { categories, products } from '@/db/schema'
import { eq, count } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CategoriesTable } from './categories-table'

async function getCategoriesWithProductCount() {
  const allCategories = await db.select().from(categories).orderBy(categories.name)

  const categoriesWithCount = await Promise.all(
    allCategories.map(async (category) => {
      const [result] = await db
        .select({ count: count() })
        .from(products)
        .where(eq(products.categoryId, category.id))
      return {
        ...category,
        images: category.images || [],
        productCount: result?.count || 0,
      }
    })
  )

  return categoriesWithCount
}

export default async function CategoriesPage() {
  const allCategories = await getCategoriesWithProductCount()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Organize your products ({allCategories.length} total)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoriesTable categories={allCategories} />
    </div>
  )
}
