import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import postgres from 'postgres'
import { categories, products } from '../src/db/schema'
import * as schema from '../src/db/schema'

const connectionString = process.env.DATABASE_URI
if (!connectionString) {
  throw new Error('DATABASE_URI environment variable is required')
}

const client = postgres(connectionString)
const db = drizzle(client, { schema })

// Clean category structure (from original seed)
const categoryData = [
  { name: 'Paper Bags (Custom Print)', slug: 'paper-bags-custom', description: 'Custom printed paper shopping bags with your logo and branding' },
  { name: 'Paper Bags (Stock)', slug: 'paper-bags-stock', description: 'Ready-to-ship unprinted and pre-printed paper bags' },
  { name: 'Reusable Bags', slug: 'reusable-bags', description: 'Eco-friendly reusable shopping bags' },
  { name: 'Stretch Film & Wrap', slug: 'stretch-film', description: 'Industrial stretch film and wrap for pallets and packages' },
  { name: 'Garbage Bags', slug: 'garbage-bags', description: 'Heavy duty trash bags for commercial and industrial use' },
  { name: 'Plastic Bags & Mailers', slug: 'plastic-bags-mailers', description: 'Poly mailers, produce bags, and plastic packaging' },
  { name: 'Food Packaging', slug: 'food-packaging', description: 'Cups, containers, and food service packaging' },
  { name: 'Custom Labels & Stickers', slug: 'custom-labels', description: 'Custom printed roll labels and stickers' },
  { name: 'Shrink Film', slug: 'shrink-film', description: 'PVC shrink film for product packaging' },
  { name: 'Pizza Boxes', slug: 'pizza-boxes', description: 'Custom print kraft pizza and bakery boxes' },
]

// Image mapping (from original upload-images script)
const imageMapping: Record<string, string[]> = {
  'page-000.png': ['Custom Print Flat Handle Paper Bags', 'Custom Print Twisted Handle Paper Bags'],
  'page-018.png': ['Unprinted Flat Handle Paper Bags', 'Unprinted Twisted Handle Paper Bags'],
  'page-004.png': ['Thank You Printed Paper Bags'],
  'page-046.png': ['Eco-Friendly Non-Woven Reusable Bags'],
  'page-062.png': ['Laminated Reusable Grocery Bag'],
  'page-088.png': ['Industrial Stretch Film', 'Clear Pallet Shrink Film - 18" x 1000\''],
  'page-104.png': ['5" x 1000\' Stretch Wrap Roll - 80 Gauge', 'Black Stretch Wrap - 18" x 1000\' - 80 Gauge'],
  'page-116.png': ['56-60 Gallon Heavy Duty Trash Bags', '45-48 Gallon Heavy Duty Trash Bags', '32 Gallon Heavy Duty Trash Bags'],
  'page-129.png': ['Custom Printed Plastic T-Shirt Bags', 'LDPE & HDPE Produce Bags on Roll'],
  'page-157.png': ['Poly Mailer Envelopes - Self Sealing', 'Self Seal Clear Poly Bags'],
  'page-165.png': ['PVC Shrink Film Rolls'],
  'page-178.png': ['EarthGuard Compostable Cups'],
  'page-195.png': ['Kraft Custom Print Pizza Boxes'],
  'page-206.png': ['Gloss Paper Gift Bags'],
  'circle-labels-1.png': ['Circle Paper Roll Labels'],
  'label-rolls-1.png': ['Square Paper Roll Labels'],
  'oval-labels-1.png': ['Oval Glossy Waterproof Labels'],
}

// Create reverse mapping: product name -> image
function getImageForProduct(productName: string): string[] {
  for (const [image, productNames] of Object.entries(imageMapping)) {
    if (productNames.includes(productName)) {
      return [`/media/${image}`]
    }
  }
  return []
}

// Product data (from original seed script with full data)
const productData = [
  {
    name: 'Custom Print Flat Handle Paper Bags',
    category: 'paper-bags-custom',
    description: 'Custom printed heavy duty paper shopping bags with flat paper handles.',
    sizes: '8x4x10,10x5x13,10x7x12,13x7x17,18x7x18',
    specs: {
      handles: 'Flat paper handles',
      printing: 'Custom logo and text',
      colors: '7 bag colors, 7 ink colors',
      lead_time: '4 business days after proof approval',
    },
  },
  {
    name: 'Custom Print Twisted Handle Paper Bags',
    category: 'paper-bags-custom',
    description: 'Custom printed heavy duty paper shopping bags with twisted paper handles.',
    sizes: '8x4x10,10x5x13,10x7x12,13x7x17,18x7x18',
    specs: {
      handles: 'Twisted paper handles',
      printing: 'Custom logo and text',
      colors: '7 bag colors, 7 ink colors',
      lead_time: '4 business days after proof approval',
    },
  },
  {
    name: 'Unprinted Twisted Handle Paper Bags',
    category: 'paper-bags-stock',
    description: 'Unprinted kraft paper shopping bags with twisted handles for everyday retail use.',
    sizes: '8x4x10,10x5x13,10x7x12,13x7x17,18x7x18',
    specs: {
      handles: 'Twisted paper handles',
      finish: 'Unprinted kraft',
      usage: 'Retail carryout and groceries',
    },
  },
  {
    name: 'Unprinted Flat Handle Paper Bags',
    category: 'paper-bags-stock',
    description: 'Unprinted kraft paper shopping bags with flat handles for cost-effective carryout packaging.',
    sizes: '8x4x10,10x5x13,10x7x12,12x7x17,18x7x18',
    specs: {
      handles: 'Flat paper handles',
      finish: 'Unprinted kraft',
      usage: 'Retail carryout and groceries',
    },
  },
  {
    name: 'Thank You Printed Paper Bags',
    category: 'paper-bags-stock',
    description: 'Paper shopping bags with "Thank You" design, available with flat or twisted handles.',
    sizes: '8x4x10,10x5x13,10x7x12,13x7x17,18x7x18',
    specs: {
      handles: 'Flat or twisted handles',
      printing: 'Preprinted Thank You design',
      usage: 'Retail and takeaway packaging',
    },
  },
  {
    name: 'Eco-Friendly Non-Woven Reusable Bags',
    category: 'reusable-bags',
    description: 'Eco-friendly reusable non-woven shopping bags in multiple colors for grocery and retail use.',
    sizes: '15x7x15,12x6x15,17x7x22',
    specs: {
      material: 'Non woven fabric',
      colors: 'Cream, White, Brown',
      features: 'Eco friendly, reusable',
    },
  },
  {
    name: 'Laminated Reusable Grocery Bag',
    category: 'reusable-bags',
    description: 'Heavy duty laminated polypropylene reusable grocery bag with large capacity and reinforced handles.',
    sizes: '14x14x8.25',
    specs: {
      material: 'Laminated polypropylene',
      features: 'Double reinforced handles, foldable',
      benefits: 'Replaces many disposable bags',
    },
  },
  {
    name: 'Gloss Paper Gift Bags',
    category: 'paper-bags-custom',
    description: 'Gloss finish custom paper gift bags suitable for retail, gifts and merchandise packaging.',
    sizes: 'Assorted sizes',
    specs: {
      finish: 'Luxury gloss',
      printing: 'Customizable with branding',
      usage: 'Gift bags, retail, merchandise',
    },
  },
  {
    name: 'Industrial Stretch Film',
    category: 'stretch-film',
    description: 'Industrial stretch film for hand and machine application to secure pallets and products.',
    sizes: '18x80,18x80x1500 FT,20x70,20x70x5000 FT',
    specs: {
      gauge_options: 'Various including 80 gauge',
      types: 'Hand roll, machine roll',
      features: 'Weather resistant, transparent',
    },
  },
  {
    name: '5" x 1000\' Stretch Wrap Roll - 80 Gauge',
    category: 'stretch-film',
    description: '5 inch wide clear stretch wrap roll for bundling and protecting small packages during moving and storage.',
    sizes: '5x1000 FT',
    specs: {
      width: '5 inches',
      length: '1000 FT',
      gauge: '80 gauge',
      features: 'Self-dispenser, self-adhering',
    },
  },
  {
    name: 'Clear Pallet Shrink Film - 18" x 1000\'',
    category: 'stretch-film',
    description: 'Clear cling shrink film for wrapping pallets and packages with industrial strength.',
    sizes: '18x1000 FT',
    specs: {
      gauge: '80 gauge',
      features: 'Self-adhering, industrial strength',
      usage: 'Pallet wrap, shipping protection',
    },
  },
  {
    name: 'Black Stretch Wrap - 18" x 1000\' - 80 Gauge',
    category: 'stretch-film',
    description: 'Black industrial strength stretch wrap for concealing and securing palletized loads.',
    sizes: '18x1000 FT',
    specs: {
      length: '1000 FT',
      gauge: '80 gauge',
      color: 'Black',
      features: 'Superior load retention',
    },
  },
  {
    name: '56-60 Gallon Heavy Duty Trash Bags',
    category: 'garbage-bags',
    description: 'Extra large 56-60 gallon industrial trash bags for outdoor and commercial cans.',
    sizes: '56-60 gallon (58x38)',
    specs: {
      capacity: '56-60 gallons',
      thickness: '1.2 mil',
      color: 'Opaque black',
      quantity: '50 bags per carton',
    },
  },
  {
    name: '45-48 Gallon Heavy Duty Trash Bags',
    category: 'garbage-bags',
    description: '45-48 gallon extra heavy strength black industrial trash bags for heavy loads.',
    sizes: '45-48 gallon (47x42)',
    specs: {
      capacity: '45-48 gallons',
      thickness: '1.3 mil',
      color: 'Opaque black',
      quantity: '100 bags per carton',
    },
  },
  {
    name: '32 Gallon Heavy Duty Trash Bags',
    category: 'garbage-bags',
    description: '32 gallon heavy duty trash bags sized to fit standard 32 gallon cans.',
    sizes: '32 gallon (33x44)',
    specs: {
      capacity: '32 gallons',
      thickness: '1.1 mil',
      color: 'Black',
      quantity: '100 bags per case',
    },
  },
  {
    name: 'Custom Printed Plastic T-Shirt Bags',
    category: 'plastic-bags-mailers',
    description: 'Printed plastic t-shirt and handle bags for promoting businesses and events.',
    sizes: 'Assorted sizes',
    specs: {
      material: 'Biodegradable plastic',
      printing: 'Custom printed designs',
      usage: 'Trade shows, retail, takeout',
    },
  },
  {
    name: 'LDPE & HDPE Produce Bags on Roll',
    category: 'plastic-bags-mailers',
    description: 'Clear LDPE and HDPE produce bags on roll for fruit shops, butchers and fish shops.',
    sizes: '12x20,10x15',
    specs: {
      material: 'LDPE or HDPE',
      color: 'Clear',
      features: 'Perforated on roll, suitable for freezing',
    },
  },
  {
    name: 'Poly Mailer Envelopes - Self Sealing',
    category: 'plastic-bags-mailers',
    description: 'White or gray self-sealing poly mailer envelopes for shipping non-fragile items.',
    sizes: '6x9,9x12,10x13,12x15.5,14.5x19',
    specs: {
      thickness: '2.0 mil',
      colors: 'White or gray',
      adhesive: 'Pressure sensitive self seal',
    },
  },
  {
    name: 'Self Seal Clear Poly Bags',
    category: 'plastic-bags-mailers',
    description: 'Clear self seal polypropylene bags with suffocation warning for retail and FBA packaging.',
    sizes: '4x6,5x7,6x9,8x10,9x12,11x14',
    specs: {
      material: 'Polypropylene (PP)',
      thickness: '1.5 mil',
      features: 'Crystal clear, suffocation warning printed',
      usage: 'Amazon FBA, retail packaging',
    },
  },
  {
    name: 'PVC Shrink Film Rolls',
    category: 'shrink-film',
    description: 'PVC shrink film rolls designed for portable or automatic systems with centerfold film.',
    sizes: 'Assorted widths and lengths',
    specs: {
      material: 'PVC shrink film',
      features: 'Centerfold, shrinks at lower temperatures',
      usage: 'Beverages, glass, ceramics, metals',
    },
  },
  {
    name: 'EarthGuard Compostable Cups',
    category: 'food-packaging',
    description: 'Compostable and biodegradable paper coffee cups lined with plant-based PLA film.',
    sizes: 'Assorted cup sizes',
    specs: {
      material: 'Paper with PLA cornstarch film',
      features: 'Fully compostable in 90-120 days',
      usage: 'Hot beverages and coffee',
    },
  },
  {
    name: 'Square Paper Roll Labels',
    category: 'custom-labels',
    description: 'Custom printed square paper roll labels for branding and product packaging.',
    sizes: 'Assorted label sizes',
    specs: {
      shape: 'Square',
      format: 'Roll labels',
      usage: 'Custom product labels, branding',
    },
  },
  {
    name: 'Circle Paper Roll Labels',
    category: 'custom-labels',
    description: 'Custom printed circular paper roll labels for product and packaging decoration.',
    sizes: 'Assorted label sizes',
    specs: {
      shape: 'Circle',
      format: 'Roll labels',
      usage: 'Custom product labels, branding',
    },
  },
  {
    name: 'Oval Glossy Waterproof Labels',
    category: 'custom-labels',
    description: 'Glossy waterproof oval roll labels for durable custom product labeling.',
    sizes: 'Assorted label sizes',
    specs: {
      shape: 'Oval',
      finish: 'Glossy waterproof',
      usage: 'Products needing moisture resistance',
    },
  },
  {
    name: 'Kraft Custom Print Pizza Boxes',
    category: 'pizza-boxes',
    description: 'Natural kraft corrugated pizza and bakery boxes customizable with your branding.',
    sizes: '8x8,10x10,12x12,14x14,16x16,18x18',
    specs: {
      material: 'Corrugated cardboard',
      finish: 'Natural kraft',
      usage: 'Pizzas, calzones, cakes, bakery items',
    },
  },
]

// SKU prefixes for categories
const skuPrefixes: Record<string, string> = {
  'paper-bags-custom': 'PBC',
  'paper-bags-stock': 'PBS',
  'reusable-bags': 'RB',
  'stretch-film': 'SF',
  'garbage-bags': 'GB',
  'plastic-bags-mailers': 'PM',
  'food-packaging': 'FP',
  'custom-labels': 'CL',
  'shrink-film': 'SH',
  'pizza-boxes': 'PZ',
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function seed() {
  console.log('Starting seed...')

  // Create categories
  console.log('\nCreating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of categoryData) {
    try {
      const [created] = await db.insert(categories).values({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      }).returning()

      categoryMap[cat.slug] = created.id
      console.log(`  Created category: ${cat.name}`)
    } catch (error: any) {
      if (error.code === '23505') { // Unique violation
        console.log(`  Category "${cat.name}" already exists, skipping`)
        // Get existing category
        const existing = await db.select().from(categories).where(eq(categories.slug, cat.slug)).limit(1)
        if (existing.length > 0) {
          categoryMap[cat.slug] = existing[0].id
        }
      } else {
        console.error(`  Error creating category ${cat.name}:`, error)
      }
    }
  }

  // Create products
  console.log('\nCreating products...')
  let productCount = 0
  const skuCounter: Record<string, number> = {}

  for (const product of productData) {
    try {
      const categoryId = categoryMap[product.category]
      if (!categoryId) {
        console.log(`  Skipping "${product.name}" - category not found: ${product.category}`)
        continue
      }

      // Generate SKU
      const prefix = skuPrefixes[product.category] || 'XX'
      skuCounter[prefix] = (skuCounter[prefix] || 0) + 1
      const sku = `${prefix}-${String(skuCounter[prefix]).padStart(3, '0')}`

      // Get images for this product
      const productImages = getImageForProduct(product.name)

      const [created] = await db.insert(products).values({
        name: product.name,
        slug: generateSlug(product.name),
        sku,
        description: product.description,
        categoryId,
        sizes: product.sizes,
        specs: product.specs,
        images: productImages,
        featured: false,
      }).returning()

      productCount++
      console.log(`  Created product: ${product.name} (${sku})${productImages.length ? ` with image` : ''}`)
    } catch (error: any) {
      if (error.code === '23505') { // Unique violation
        console.log(`  Product "${product.name}" already exists, skipping`)
      } else {
        console.error(`  Error creating product ${product.name}:`, error)
      }
    }
  }

  console.log(`\nSeed complete! Created ${productCount} products.`)
  await client.end()
  process.exit(0)
}

seed().catch(error => {
  console.error('Seed failed:', error)
  process.exit(1)
})
