'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const categoryId = formData.get('categoryId') as string
  const sku = formData.get('sku') as string
  const price = formData.get('price') as string
  const showPrice = formData.get('showPrice') === 'on'
  const sizes = formData.get('sizes') as string
  const imagesJson = formData.get('images') as string

  if (!name) {
    return { error: 'Name is required' }
  }

  const slug = generateSlug(name)
  const images = imagesJson ? JSON.parse(imagesJson) : []

  try {
    await db.insert(products).values({
      name,
      slug,
      description: description || null,
      categoryId: categoryId || null,
      sku: sku || null,
      price: price || null,
      showPrice,
      sizes: sizes || null,
      images,
    })

    revalidatePath('/admin/products')
    redirect('/admin/products')
  } catch (error) {
    console.error('Error creating product:', error)
    return { error: 'Failed to create product' }
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const categoryId = formData.get('categoryId') as string
  const sku = formData.get('sku') as string
  const price = formData.get('price') as string
  const showPrice = formData.get('showPrice') === 'on'
  const sizes = formData.get('sizes') as string
  const imagesJson = formData.get('images') as string

  if (!name) {
    return { error: 'Name is required' }
  }

  const slug = generateSlug(name)
  const images = imagesJson ? JSON.parse(imagesJson) : []

  try {
    await db
      .update(products)
      .set({
        name,
        slug,
        description: description || null,
        categoryId: categoryId || null,
        sku: sku || null,
        price: price || null,
        showPrice,
        sizes: sizes || null,
        images,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))

    revalidatePath('/admin/products')
    redirect('/admin/products')
  } catch (error) {
    console.error('Error updating product:', error)
    return { error: 'Failed to update product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.delete(products).where(eq(products.id, id))
    revalidatePath('/admin/products')
  } catch (error) {
    console.error('Error deleting product:', error)
    return { error: 'Failed to delete product' }
  }
}
