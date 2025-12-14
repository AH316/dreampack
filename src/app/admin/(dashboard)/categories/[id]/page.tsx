import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/db'

export const dynamic = 'force-dynamic'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { CategoryForm } from '../category-form'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getCategory(id: string) {
  if (id === 'new') return null
  return await db.query.categories.findFirst({
    where: eq(categories.id, id),
  })
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params
  const category = await getCategory(id)

  if (!category) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/categories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Category</h1>
      </div>

      <CategoryForm category={{
        ...category,
        images: category.images || [],
      }} />
    </div>
  )
}
