import Link from 'next/link'
import { db } from '@/db'

export const dynamic = 'force-dynamic'
import { products, categories } from '@/db/schema'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ProductsTable } from './products-table'

async function getProductsWithCategories() {
  return await db.query.products.findMany({
    with: { category: true },
    orderBy: (products, { asc }) => [asc(products.name)],
  })
}

async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name)
}

export default async function ProductsPage() {
  const [allProducts, allCategories] = await Promise.all([
    getProductsWithCategories(),
    getCategories(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your product catalogue ({allProducts.length} total)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <ProductsTable products={allProducts} categories={allCategories} />
    </div>
  )
}
