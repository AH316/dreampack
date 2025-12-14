'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { siteSettings, type ContactInfo, type BusinessHours, type ContactPageContent } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function updateContactInfo(id: string, data: ContactInfo) {
  try {
    await db
      .update(siteSettings)
      .set({
        contactInfo: data,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, id))

    revalidatePath('/admin/settings')
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error) {
    console.error('Error updating contact info:', error)
    return { error: 'Failed to update contact info' }
  }
}

export async function updateBusinessHours(id: string, data: BusinessHours) {
  try {
    await db
      .update(siteSettings)
      .set({
        businessHours: data,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, id))

    revalidatePath('/admin/settings')
    revalidatePath('/contact')
    return { success: true }
  } catch (error) {
    console.error('Error updating business hours:', error)
    return { error: 'Failed to update business hours' }
  }
}

export async function updateSocialLinks(id: string, data: {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
}) {
  try {
    await db
      .update(siteSettings)
      .set({
        socialLinks: data,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, id))

    revalidatePath('/admin/settings')
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error) {
    console.error('Error updating social links:', error)
    return { error: 'Failed to update social links' }
  }
}

export async function updateContactPage(id: string, data: ContactPageContent) {
  try {
    await db
      .update(siteSettings)
      .set({
        contactPage: data,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, id))

    revalidatePath('/admin/settings')
    revalidatePath('/contact')
    return { success: true }
  } catch (error) {
    console.error('Error updating contact page:', error)
    return { error: 'Failed to update contact page' }
  }
}
