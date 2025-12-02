import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

const labelImages = [
  { file: 'oval-labels.png', product: 'Oval Glossy Waterproof Labels', alt: 'Oval Labels on Bakery Boxes' },
  { file: 'circle-labels.png', product: 'Circle Paper Roll Labels', alt: 'Circle Labels on Packaging' },
  { file: 'label-rolls.png', product: 'Square Paper Roll Labels', alt: 'Printed Label Rolls' },
]

async function uploadLabelImages() {
  const payload = await getPayload({ config })
  const mediaDir = path.join(process.cwd(), 'public', 'media')

  // Upload product images
  for (const item of labelImages) {
    const imagePath = path.join(mediaDir, item.file)

    if (!fs.existsSync(imagePath)) {
      console.log('File not found:', item.file)
      continue
    }

    try {
      const fileBuffer = fs.readFileSync(imagePath)

      // Upload to Payload
      const uploaded = await payload.create({
        collection: 'media',
        data: { alt: item.alt },
        file: {
          data: fileBuffer,
          mimetype: 'image/png',
          name: item.file,
          size: fileBuffer.length,
        },
      })

      console.log('Uploaded:', item.file, '-> id:', uploaded.id)

      // Associate with product
      const { docs: products } = await payload.find({
        collection: 'products',
        where: { name: { equals: item.product } },
        limit: 1,
      })

      if (products.length > 0) {
        await payload.update({
          collection: 'products',
          id: products[0].id,
          data: { images: [{ image: uploaded.id }] },
        })
        console.log('  -> Assigned to:', item.product)
      } else {
        console.log('  -> Product not found:', item.product)
      }

      // Clean up the temp file
      fs.unlinkSync(imagePath)
    } catch (error) {
      console.error('Error with', item.file, error)
    }
  }

  // Update category with label-rolls image
  console.log('\nUpdating Custom Labels category...')
  const { docs: labelRollsMedia } = await payload.find({
    collection: 'media',
    where: { filename: { contains: 'label-rolls' } },
    limit: 1,
  })

  if (labelRollsMedia.length > 0) {
    const { docs: categories } = await payload.find({
      collection: 'categories',
      where: { slug: { equals: 'custom-labels' } },
      limit: 1,
    })

    if (categories.length > 0) {
      await payload.update({
        collection: 'categories',
        id: categories[0].id,
        data: { image: labelRollsMedia[0].id },
      })
      console.log('Updated Custom Labels category with label-rolls image')
    }
  }

  console.log('\nDone!')
  process.exit(0)
}

uploadLabelImages().catch(console.error)
