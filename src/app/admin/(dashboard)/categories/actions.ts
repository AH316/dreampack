'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const imagesJson = formData.get('images') as string
  const images = imagesJson ? JSON.parse(imagesJson) : []

  if (!name) {
    return { error: 'Name is required' }
  }

  const slug = generateSlug(name)

  let success = false
  try {
    await db.insert(categories).values({
      name,
      slug,
      description: description || null,
      images,
    })

    revalidatePath('/admin/categories')
    success = true
  } catch (error: unknown) {
    console.error('Error creating category:', error)
    // Check for unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return { error: 'A category with this name already exists' }
    }
    return { error: 'Failed to create category' }
  }

  if (success) {
    redirect('/admin/categories')
  }
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const imagesJson = formData.get('images') as string
  const images = imagesJson ? JSON.parse(imagesJson) : []

  if (!name) {
    return { error: 'Name is required' }
  }

  const slug = generateSlug(name)

  let success = false
  try {
    await db
      .update(categories)
      .set({
        name,
        slug,
        description: description || null,
        images,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))

    revalidatePath('/admin/categories')
    success = true
  } catch (error: unknown) {
    console.error('Error updating category:', error)
    // Check for unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return { error: 'A category with this name already exists' }
    }
    return { error: 'Failed to update category' }
  }

  if (success) {
    redirect('/admin/categories')
  }
}

export async function deleteCategory(id: string) {
  try {
    await db.delete(categories).where(eq(categories.id, id))
    revalidatePath('/admin/categories')
  } catch (error) {
    console.error('Error deleting category:', error)
    return { error: 'Failed to delete category' }
  }
}
