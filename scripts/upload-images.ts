import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

// Image to product mapping based on visual analysis
const imageMapping: Record<string, string[]> = {
  // Paper Bags (Custom Print)
  'page-000.png': ['Custom Print Flat Handle Paper Bags', 'Custom Print Twisted Handle Paper Bags'],
  'page-018.png': ['Unprinted Flat Handle Paper Bags', 'Unprinted Twisted Handle Paper Bags'],

  // Paper Bags (Stock) - Thank You bags
  'page-004.png': ['Thank You Printed Paper Bags'],

  // Reusable Bags
  'page-046.png': ['Eco-Friendly Non-Woven Reusable Bags'],
  'page-062.png': ['Laminated Reusable Grocery Bag'],

  // Stretch Film & Wrap
  'page-088.png': ['Industrial Stretch Film', 'Clear Pallet Shrink Film - 18" x 1000\''],
  'page-104.png': ['5" x 1000\' Stretch Wrap Roll - 80 Gauge', 'Black Stretch Wrap - 18" x 1000\' - 80 Gauge'],

  // Garbage Bags
  'page-116.png': ['56-60 Gallon Heavy Duty Trash Bags', '45-48 Gallon Heavy Duty Trash Bags', '32 Gallon Heavy Duty Trash Bags'],

  // Plastic Bags & Mailers
  'page-129.png': ['Custom Printed Plastic T-Shirt Bags', 'LDPE & HDPE Produce Bags on Roll'],
  'page-157.png': ['Poly Mailer Envelopes - Self Sealing', 'Self Seal Clear Poly Bags'],

  // Shrink Film
  'page-165.png': ['PVC Shrink Film Rolls'],

  // Food Packaging
  'page-178.png': ['EarthGuard Compostable Cups'],

  // Pizza Boxes
  'page-195.png': ['Kraft Custom Print Pizza Boxes'],

  // Gift Bags / General
  'page-206.png': ['Gloss Paper Gift Bags'],
}

// Category images for the category listings
const categoryImageMapping: Record<string, string> = {
  'page-000.png': 'paper-bags-custom',
  'page-018.png': 'paper-bags-stock',
  'page-062.png': 'reusable-bags',
  'page-088.png': 'stretch-film',
  'page-116.png': 'garbage-bags',
  'page-129.png': 'plastic-bags-mailers',
  'page-178.png': 'food-packaging',
  'page-165.png': 'shrink-film',
  'page-195.png': 'pizza-boxes',
}

async function uploadImages() {
  console.log('Starting image upload...')

  const payload = await getPayload({ config })
  const imagesDir = path.join(process.cwd(), 'extracted-images')

  // Track uploaded media IDs
  const uploadedMedia: Record<string, string> = {}

  // Upload each mapped image
  for (const [imageName, productNames] of Object.entries(imageMapping)) {
    const imagePath = path.join(imagesDir, imageName)

    if (!fs.existsSync(imagePath)) {
      console.log(`  Skipping ${imageName} - file not found`)
      continue
    }

    try {
      // Check if already uploaded
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { contains: imageName.replace('.png', '') } },
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
            alt: productNames[0] || 'Product image',
          },
          file: {
            data: fileBuffer,
            mimetype: 'image/png',
            name: imageName,
            size: fileBuffer.length,
          },
        })

        mediaId = uploaded.id
        console.log(`  Uploaded: ${imageName}`)
      }

      uploadedMedia[imageName] = mediaId

      // Associate with products
      for (const productName of productNames) {
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
      }
    } catch (error) {
      console.error(`  Error processing ${imageName}:`, error)
    }
  }

  // Update category images
  console.log('\nUpdating category images...')
  for (const [imageName, categorySlug] of Object.entries(categoryImageMapping)) {
    const mediaId = uploadedMedia[imageName]
    if (!mediaId) continue

    try {
      const categories = await payload.find({
        collection: 'categories',
        where: { slug: { equals: categorySlug } },
        limit: 1,
      })

      if (categories.docs.length > 0) {
        const category = categories.docs[0]
        if (!category.image) {
          await payload.update({
            collection: 'categories',
            id: category.id,
            data: { image: mediaId },
          })
          console.log(`  Updated category: ${category.name}`)
        } else {
          console.log(`  Category ${category.name} already has image`)
        }
      }
    } catch (error) {
      console.error(`  Error updating category ${categorySlug}:`, error)
    }
  }

  console.log('\nImage upload complete!')
  process.exit(0)
}

uploadImages().catch(console.error)
