'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { db } from '@/db'
import { siteSettings, type AboutPageContent } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function updateAboutPage(id: string, data: AboutPageContent) {
  try {
    await db
      .update(siteSettings)
      .set({
        aboutPage: data,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, id))

    revalidateTag('settings')
    revalidatePath('/admin/pages/about')
    revalidatePath('/about')
    return { success: true }
  } catch (error) {
    console.error('Error updating about page:', error)
    return { error: 'Failed to update about page' }
  }
}
