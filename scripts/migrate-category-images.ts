import 'dotenv/config'
import { db } from '../src/db'
import { categories } from '../src/db/schema'
import { eq } from 'drizzle-orm'

// Category image mapping from the homepage (frontend/page.tsx)
const categoryImageMapping: Record<string, string> = {
  'paper-bags-custom': '/media/page-000.png',
  'paper-bags-stock': '/media/page-018.png',
  'reusable-bags': '/media/page-062.png',
  'stretch-film': '/media/page-088.png',
  'garbage-bags': '/media/page-116.png',
  'plastic-bags-mailers': '/media/page-129.png',
  'food-packaging': '/media/page-178.png',
  'shrink-film': '/media/page-165.png',
  'pizza-boxes': '/media/page-195.png',
  'custom-labels': '/media/labels-category.jpg',
}

async function migrateImages() {
  console.log('Migrating category images to database...')

  const allCategories = await db.select().from(categories)

  for (const category of allCategories) {
    const mappedImage = categoryImageMapping[category.slug]

    if (mappedImage) {
      // Only update if the category doesn't already have images
      if (!category.images || category.images.length === 0) {
        await db
          .update(categories)
          .set({ images: [mappedImage] })
          .where(eq(categories.id, category.id))
        console.log(`  Updated ${category.name}: ${mappedImage}`)
      } else {
        console.log(`  Skipped ${category.name}: already has images`)
      }
    } else {
      console.log(`  No mapping for ${category.name} (${category.slug})`)
    }
  }

  console.log('Migration complete!')
  process.exit(0)
}

migrateImages().catch(console.error)
