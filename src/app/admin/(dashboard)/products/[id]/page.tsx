import { notFound } from 'next/navigation'
import { db } from '@/db'

export const dynamic = 'force-dynamic'
import { products, categories } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ProductForm } from '../product-form'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  if (id === 'new') return null
  return await db.query.products.findFirst({
    where: eq(products.id, id),
  })
}

async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name)
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const [product, allCategories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ])

  if (!product) {
    notFound()
  }

  return <ProductForm product={product} categories={allCategories} />
}
