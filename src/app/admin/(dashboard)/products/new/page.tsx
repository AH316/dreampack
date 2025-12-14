import { ProductForm } from '../product-form'
import { db } from '@/db'

export const dynamic = 'force-dynamic'
import { categories } from '@/db/schema'

async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name)
}

export default async function NewProductPage() {
  const allCategories = await getCategories()
  
  return <ProductForm categories={allCategories} />
}
