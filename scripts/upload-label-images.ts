import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

// Label product to image mapping
const labelProductMapping: Record<string, string> = {
  'oval-labels.jpg': 'Oval Glossy Waterproof Labels',
  'square-labels.jpg': 'Square Paper Roll Labels',
  'circle-labels.jpg': 'Circle Paper Roll Labels',
}

async function uploadLabelImages() {
  console.log('Starting label image upload...')

  const payload = await getPayload({ config })
  const mediaDir = path.join(process.cwd(), 'public', 'media')

  // Upload product images
  for (const [imageName, productName] of Object.entries(labelProductMapping)) {
    const imagePath = path.join(mediaDir, imageName)

    if (!fs.existsSync(imagePath)) {
      console.log(`  Skipping ${imageName} - file not found`)
      continue
    }

    try {
      // Check if already uploaded
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { contains: imageName.replace('.jpg', '') } },
        limit: 1,
      })

      let mediaId: string

      if (existing.docs.length > 0) {
        mediaId = existing.docs[0].id
        console.log(`  Image ${imageName} already exists`)
      } else {
        // Read the file
        const fileBuffer = fs.readFileSync(imagePath)

        // Upload to Payload
        const uploaded = await payload.create({
          collection: 'media',
          data: {
            alt: productName,
          },
          file: {
            data: fileBuffer,
            mimetype: 'image/jpeg',
            name: imageName,
            size: fileBuffer.length,
          },
        })

        mediaId = uploaded.id
        console.log(`  Uploaded: ${imageName}`)
      }

      // Associate with product
      const products = await payload.find({
        collection: 'products',
        where: { name: { equals: productName } },
        limit: 1,
      })

      if (products.docs.length > 0) {
        const product = products.docs[0]

        // Check if product already has images
        const existingImages = product.images || []
        const hasThisImage = existingImages.some(
          (img: any) => img.image === mediaId || (typeof img.image === 'object' && img.image?.id === mediaId)
        )

        if (!hasThisImage) {
          await payload.update({
            collection: 'products',
            id: product.id,
            data: {
              images: [...existingImages, { image: mediaId }],
            },
          })
          console.log(`    -> Associated with: ${productName}`)
        } else {
          console.log(`    -> Already associated with: ${productName}`)
        }
      } else {
        console.log(`    -> Product not found: ${productName}`)
      }
    } catch (error) {
      console.error(`  Error processing ${imageName}:`, error)
    }
  }

  // Upload category image
  console.log('\nUpdating Custom Labels and Stickers category image...')
  const categoryImagePath = path.join(mediaDir, 'labels-category.jpg')

  if (fs.existsSync(categoryImagePath)) {
    try {
      // Check if already uploaded
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { contains: 'labels-category' } },
        limit: 1,
      })

      let categoryMediaId: string

      if (existing.docs.length > 0) {
        categoryMediaId = existing.docs[0].id
        console.log('  Category image already exists')
      } else {
        const fileBuffer = fs.readFileSync(categoryImagePath)

        const uploaded = await payload.create({
          collection: 'media',
          data: {
            alt: 'Custom Labels and Stickers',
          },
          file: {
            data: fileBuffer,
            mimetype: 'image/jpeg',
            name: 'labels-category.jpg',
            size: fileBuffer.length,
          },
        })

        categoryMediaId = uploaded.id
        console.log('  Uploaded: labels-category.jpg')
      }

      // Find and update the category
      const categories = await payload.find({
        collection: 'categories',
        where: { slug: { equals: 'custom-labels-stickers' } },
        limit: 1,
      })

      if (categories.docs.length > 0) {
        const category = categories.docs[0]
        if (!category.image) {
          await payload.update({
            collection: 'categories',
            id: category.id,
            data: { image: categoryMediaId },
          })
          console.log(`  Updated category: ${category.name}`)
        } else {
          console.log(`  Category ${category.name} already has image`)
        }
      } else {
        console.log('  Category "custom-labels-stickers" not found')
      }
    } catch (error) {
      console.error('  Error updating category image:', error)
    }
  }

  console.log('\nLabel image upload complete!')
  process.exit(0)
}

uploadLabelImages().catch(console.error)
