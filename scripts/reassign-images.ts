import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Correct image mappings based on visual analysis
const correctMappings: Record<string, string> = {
  // Paper Bags
  'Custom Print Flat Handle Paper Bags': 'page-004.png',      // Custom printed bags with logos
  'Custom Print Twisted Handle Paper Bags': 'page-000.png',   // Woman with twisted handle bags
  'Unprinted Flat Handle Paper Bags': 'page-018.png',         // Unprinted flat handle bag
  'Unprinted Twisted Handle Paper Bags': 'page-000.png',      // Same woman image (has twisted handles)
  'Thank You Printed Paper Bags': 'page-004.png',             // Has Thank You bags visible

  // Reusable Bags
  'Eco-Friendly Non-Woven Reusable Bags': 'page-046.png',     // White canvas/non-woven bag
  'Laminated Reusable Grocery Bag': 'page-062.png',           // Kraft laminated bag

  // Stretch Wrap & Film
  'Clear Pallet Shrink Film - 18" x 1000\'': 'page-088.png',  // Clear wrap on food
  'Industrial Stretch Film': 'page-165.png',                   // Warehouse with shrink-wrapped pallets
  '5" x 1000\' Stretch Wrap Roll - 80 Gauge': 'page-104.png', // Woman with stretch wrap rolls
  'Black Stretch Wrap - 18" x 1000\' - 80 Gauge': 'page-104.png', // Same (no black wrap image available)
  'PVC Shrink Film Rolls': 'page-088.png',                     // Clear wrap being applied

  // Trash Bags
  '32 Gallon Heavy Duty Trash Bags': 'page-116.png',
  '45-48 Gallon Heavy Duty Trash Bags': 'page-116.png',
  '56-60 Gallon Heavy Duty Trash Bags': 'page-116.png',

  // Plastic Bags & Poly
  'Custom Printed Plastic T-Shirt Bags': 'page-129.png',      // White T-shirt bag
  'LDPE & HDPE Produce Bags on Roll': 'page-129.png',         // Same (no produce roll image)
  'Poly Mailer Envelopes - Self Sealing': 'page-157.png',     // Poly mailer
  'Self Seal Clear Poly Bags': 'page-157.png',                // Same (no clear poly bag image)

  // Food Packaging
  'EarthGuard Compostable Cups': 'page-178.png',              // Kraft eco cups/utensils
  'Kraft Custom Print Pizza Boxes': 'page-195.png',           // Pizza in kraft box
  'Gloss Paper Gift Bags': 'page-206.png',                    // Kraft packaging collection
}

async function reassignImages() {
  const payload = await getPayload({ config })

  // Get all media files by filename
  const mediaMap = new Map<string, string>()
  const { docs: allMedia } = await payload.find({
    collection: 'media',
    limit: 100,
  })

  for (const m of allMedia) {
    if (m.filename) {
      mediaMap.set(m.filename, m.id)
    }
  }

  let updated = 0
  let correct = 0
  let notFound = 0

  // Update each product
  for (const [productName, imageFilename] of Object.entries(correctMappings)) {
    const mediaId = mediaMap.get(imageFilename)
    if (!mediaId) {
      console.log('No media found for:', imageFilename)
      notFound++
      continue
    }

    const { docs: products } = await payload.find({
      collection: 'products',
      where: { name: { equals: productName } },
      limit: 1,
    })

    if (products.length === 0) {
      console.log('Product not found:', productName)
      notFound++
      continue
    }

    const product = products[0]
    const currentImg = product.images?.[0]
    const currentFilename = typeof currentImg?.image === 'object' ? currentImg.image.filename : null

    if (currentFilename === imageFilename) {
      console.log('Already correct:', productName)
      correct++
      continue
    }

    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        images: [{ image: mediaId }],
      },
    })

    console.log('Updated:', productName, '| from:', currentFilename, '-> to:', imageFilename)
    updated++
  }

  console.log('\n=== SUMMARY ===')
  console.log('Updated:', updated)
  console.log('Already correct:', correct)
  console.log('Not found:', notFound)

  process.exit(0)
}

reassignImages().catch(console.error)
