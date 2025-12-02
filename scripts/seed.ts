import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Clean category structure (approved earlier)
const categories = [
  { name: 'Paper Bags (Custom Print)', slug: 'paper-bags-custom', prefix: 'PBC', order: 1, description: 'Custom printed paper shopping bags with your logo and branding' },
  { name: 'Paper Bags (Stock)', slug: 'paper-bags-stock', prefix: 'PBS', order: 2, description: 'Ready-to-ship unprinted and pre-printed paper bags' },
  { name: 'Reusable Bags', slug: 'reusable-bags', prefix: 'RB', order: 3, description: 'Eco-friendly reusable shopping bags' },
  { name: 'Stretch Film & Wrap', slug: 'stretch-film', prefix: 'SF', order: 4, description: 'Industrial stretch film and wrap for pallets and packages' },
  { name: 'Garbage Bags', slug: 'garbage-bags', prefix: 'GB', order: 5, description: 'Heavy duty trash bags for commercial and industrial use' },
  { name: 'Plastic Bags & Mailers', slug: 'plastic-bags-mailers', prefix: 'PM', order: 6, description: 'Poly mailers, produce bags, and plastic packaging' },
  { name: 'Food Packaging', slug: 'food-packaging', prefix: 'FP', order: 7, description: 'Cups, containers, and food service packaging' },
  { name: 'Custom Labels & Stickers', slug: 'custom-labels', prefix: 'CL', order: 8, description: 'Custom printed roll labels and stickers' },
  { name: 'Shrink Film', slug: 'shrink-film', prefix: 'SH', order: 9, description: 'PVC shrink film for product packaging' },
  { name: 'Pizza Boxes', slug: 'pizza-boxes', prefix: 'PZ', order: 10, description: 'Custom print kraft pizza and bakery boxes' },
]

// Map CSV categories to our clean categories
function mapCategory(csvCategory: string): string {
  const categoryMap: Record<string, string> = {
    'Paper Bags': 'paper-bags-custom',
    'Unprinted Paper Bags': 'paper-bags-stock',
    'ECO FRIENDLY REUSABLE NON WOVEN BAGS': 'reusable-bags',
    'LAMINATED REUSABLE GROCERY BAG': 'reusable-bags',
    'CARRIER BAGS': 'paper-bags-custom', // Gift bags go with custom paper
    'STRETCH FILM': 'stretch-film',
    'STRETCH WRAP': 'stretch-film',
    'GARBAGE BAGS': 'garbage-bags',
    'BIODEGRADABLE AND ECO FRIENDLY PLASTIC BAGS': 'plastic-bags-mailers',
    'LDPE & HDPE PRODUCE ROLL': 'plastic-bags-mailers',
    'POLY MAILERS & POLY BAGS': 'plastic-bags-mailers',
    'MEGA PVC SHRINK FILM ROLLS': 'shrink-film',
    'PLASTIC CUPS & PAPER CUPS': 'food-packaging',
    'CUSTOM PRINTED LABELS & STICKERS': 'custom-labels',
    'CUSTOM PRINT PIZZA BOXES': 'pizza-boxes',
  }
  return categoryMap[csvCategory] || 'paper-bags-stock'
}

// Product data from CSV (cleaned up)
const products = [
  {
    name: 'Custom Print Flat Handle Paper Bags',
    category: 'paper-bags-custom',
    description: 'Custom printed heavy duty paper shopping bags with flat paper handles.',
    material: 'paper',
    sizes: ['8x4x10', '10x5x13', '10x7x12', '13x7x17', '18x7x18'],
    specs: [
      { label: 'Handles', value: 'Flat paper handles' },
      { label: 'Printing', value: 'Custom logo and text' },
      { label: 'Colors', value: '7 bag colors, 7 ink colors' },
      { label: 'Lead Time', value: '4 business days after proof approval' },
    ],
  },
  {
    name: 'Custom Print Twisted Handle Paper Bags',
    category: 'paper-bags-custom',
    description: 'Custom printed heavy duty paper shopping bags with twisted paper handles.',
    material: 'paper',
    sizes: ['8x4x10', '10x5x13', '10x7x12', '13x7x17', '18x7x18'],
    specs: [
      { label: 'Handles', value: 'Twisted paper handles' },
      { label: 'Printing', value: 'Custom logo and text' },
      { label: 'Colors', value: '7 bag colors, 7 ink colors' },
      { label: 'Lead Time', value: '4 business days after proof approval' },
    ],
  },
  {
    name: 'Unprinted Twisted Handle Paper Bags',
    category: 'paper-bags-stock',
    description: 'Unprinted kraft paper shopping bags with twisted handles for everyday retail use.',
    material: 'paper',
    sizes: ['8x4x10', '10x5x13', '10x7x12', '13x7x17', '18x7x18'],
    specs: [
      { label: 'Handles', value: 'Twisted paper handles' },
      { label: 'Finish', value: 'Unprinted kraft' },
      { label: 'Usage', value: 'Retail carryout and groceries' },
    ],
  },
  {
    name: 'Unprinted Flat Handle Paper Bags',
    category: 'paper-bags-stock',
    description: 'Unprinted kraft paper shopping bags with flat handles for cost-effective carryout packaging.',
    material: 'paper',
    sizes: ['8x4x10', '10x5x13', '10x7x12', '12x7x17', '18x7x18'],
    specs: [
      { label: 'Handles', value: 'Flat paper handles' },
      { label: 'Finish', value: 'Unprinted kraft' },
      { label: 'Usage', value: 'Retail carryout and groceries' },
    ],
  },
  {
    name: 'Thank You Printed Paper Bags',
    category: 'paper-bags-stock',
    description: 'Paper shopping bags with "Thank You" design, available with flat or twisted handles.',
    material: 'paper',
    sizes: ['8x4x10', '10x5x13', '10x7x12', '13x7x17', '18x7x18'],
    specs: [
      { label: 'Handles', value: 'Flat or twisted handles' },
      { label: 'Printing', value: 'Preprinted Thank You design' },
      { label: 'Usage', value: 'Retail and takeaway packaging' },
    ],
  },
  {
    name: 'Eco-Friendly Non-Woven Reusable Bags',
    category: 'reusable-bags',
    description: 'Eco-friendly reusable non-woven shopping bags in multiple colors for grocery and retail use.',
    material: 'other',
    sizes: ['15x7x15', '12x6x15', '17x7x22'],
    specs: [
      { label: 'Material', value: 'Non woven fabric' },
      { label: 'Colors', value: 'Cream, White, Brown' },
      { label: 'Features', value: 'Eco friendly, reusable' },
    ],
  },
  {
    name: 'Laminated Reusable Grocery Bag',
    category: 'reusable-bags',
    description: 'Heavy duty laminated polypropylene reusable grocery bag with large capacity and reinforced handles.',
    material: 'plastic',
    sizes: ['14x14x8.25'],
    specs: [
      { label: 'Material', value: 'Laminated polypropylene' },
      { label: 'Features', value: 'Double reinforced handles, foldable' },
      { label: 'Benefits', value: 'Replaces many disposable bags' },
    ],
  },
  {
    name: 'Gloss Paper Gift Bags',
    category: 'paper-bags-custom',
    description: 'Gloss finish custom paper gift bags suitable for retail, gifts and merchandise packaging.',
    material: 'paper',
    sizes: ['Assorted sizes'],
    specs: [
      { label: 'Finish', value: 'Luxury gloss' },
      { label: 'Printing', value: 'Customizable with branding' },
      { label: 'Usage', value: 'Gift bags, retail, merchandise' },
    ],
  },
  {
    name: 'Industrial Stretch Film',
    category: 'stretch-film',
    description: 'Industrial stretch film for hand and machine application to secure pallets and products.',
    material: 'plastic',
    sizes: ['18x80', '18x80x1500 FT', '20x70', '20x70x5000 FT'],
    specs: [
      { label: 'Gauge Options', value: 'Various including 80 gauge' },
      { label: 'Types', value: 'Hand roll, machine roll' },
      { label: 'Features', value: 'Weather resistant, transparent' },
    ],
  },
  {
    name: '5" x 1000\' Stretch Wrap Roll - 80 Gauge',
    category: 'stretch-film',
    description: '5 inch wide clear stretch wrap roll for bundling and protecting small packages during moving and storage.',
    material: 'plastic',
    sizes: ['5x1000 FT'],
    specs: [
      { label: 'Width', value: '5 inches' },
      { label: 'Length', value: '1000 FT' },
      { label: 'Gauge', value: '80 gauge' },
      { label: 'Features', value: 'Self-dispenser, self-adhering' },
    ],
  },
  {
    name: 'Clear Pallet Shrink Film - 18" x 1000\'',
    category: 'stretch-film',
    description: 'Clear cling shrink film for wrapping pallets and packages with industrial strength.',
    material: 'plastic',
    sizes: ['18x1000 FT'],
    specs: [
      { label: 'Gauge', value: '80 gauge' },
      { label: 'Features', value: 'Self-adhering, industrial strength' },
      { label: 'Usage', value: 'Pallet wrap, shipping protection' },
    ],
  },
  {
    name: 'Black Stretch Wrap - 18" x 1000\' - 80 Gauge',
    category: 'stretch-film',
    description: 'Black industrial strength stretch wrap for concealing and securing palletized loads.',
    material: 'plastic',
    sizes: ['18x1000 FT'],
    specs: [
      { label: 'Length', value: '1000 FT' },
      { label: 'Gauge', value: '80 gauge' },
      { label: 'Color', value: 'Black' },
      { label: 'Features', value: 'Superior load retention' },
    ],
  },
  {
    name: '56-60 Gallon Heavy Duty Trash Bags',
    category: 'garbage-bags',
    description: 'Extra large 56–60 gallon industrial trash bags for outdoor and commercial cans.',
    material: 'plastic',
    sizes: ['56-60 gallon (58x38)'],
    specs: [
      { label: 'Capacity', value: '56-60 gallons' },
      { label: 'Thickness', value: '1.2 mil' },
      { label: 'Color', value: 'Opaque black' },
      { label: 'Quantity', value: '50 bags per carton' },
    ],
  },
  {
    name: '45-48 Gallon Heavy Duty Trash Bags',
    category: 'garbage-bags',
    description: '45–48 gallon extra heavy strength black industrial trash bags for heavy loads.',
    material: 'plastic',
    sizes: ['45-48 gallon (47x42)'],
    specs: [
      { label: 'Capacity', value: '45-48 gallons' },
      { label: 'Thickness', value: '1.3 mil' },
      { label: 'Color', value: 'Opaque black' },
      { label: 'Quantity', value: '100 bags per carton' },
    ],
  },
  {
    name: '32 Gallon Heavy Duty Trash Bags',
    category: 'garbage-bags',
    description: '32 gallon heavy duty trash bags sized to fit standard 32 gallon cans.',
    material: 'plastic',
    sizes: ['32 gallon (33x44)'],
    specs: [
      { label: 'Capacity', value: '32 gallons' },
      { label: 'Thickness', value: '1.1 mil' },
      { label: 'Color', value: 'Black' },
      { label: 'Quantity', value: '100 bags per case' },
    ],
  },
  {
    name: 'Custom Printed Plastic T-Shirt Bags',
    category: 'plastic-bags-mailers',
    description: 'Printed plastic t-shirt and handle bags for promoting businesses and events.',
    material: 'plastic',
    sizes: ['Assorted sizes'],
    specs: [
      { label: 'Material', value: 'Biodegradable plastic' },
      { label: 'Printing', value: 'Custom printed designs' },
      { label: 'Usage', value: 'Trade shows, retail, takeout' },
    ],
  },
  {
    name: 'LDPE & HDPE Produce Bags on Roll',
    category: 'plastic-bags-mailers',
    description: 'Clear LDPE and HDPE produce bags on roll for fruit shops, butchers and fish shops.',
    material: 'plastic',
    sizes: ['12x20', '10x15'],
    specs: [
      { label: 'Material', value: 'LDPE or HDPE' },
      { label: 'Color', value: 'Clear' },
      { label: 'Features', value: 'Perforated on roll, suitable for freezing' },
    ],
  },
  {
    name: 'Poly Mailer Envelopes - Self Sealing',
    category: 'plastic-bags-mailers',
    description: 'White or gray self-sealing poly mailer envelopes for shipping non-fragile items.',
    material: 'plastic',
    sizes: ['6x9', '9x12', '10x13', '12x15.5', '14.5x19'],
    specs: [
      { label: 'Thickness', value: '2.0 mil' },
      { label: 'Colors', value: 'White or gray' },
      { label: 'Adhesive', value: 'Pressure sensitive self seal' },
    ],
  },
  {
    name: 'Self Seal Clear Poly Bags',
    category: 'plastic-bags-mailers',
    description: 'Clear self seal polypropylene bags with suffocation warning for retail and FBA packaging.',
    material: 'plastic',
    sizes: ['4x6', '5x7', '6x9', '8x10', '9x12', '11x14'],
    specs: [
      { label: 'Material', value: 'Polypropylene (PP)' },
      { label: 'Thickness', value: '1.5 mil' },
      { label: 'Features', value: 'Crystal clear, suffocation warning printed' },
      { label: 'Usage', value: 'Amazon FBA, retail packaging' },
    ],
  },
  {
    name: 'PVC Shrink Film Rolls',
    category: 'shrink-film',
    description: 'PVC shrink film rolls designed for portable or automatic systems with centerfold film.',
    material: 'plastic',
    sizes: ['Assorted widths and lengths'],
    specs: [
      { label: 'Material', value: 'PVC shrink film' },
      { label: 'Features', value: 'Centerfold, shrinks at lower temperatures' },
      { label: 'Usage', value: 'Beverages, glass, ceramics, metals' },
    ],
  },
  {
    name: 'EarthGuard Compostable Cups',
    category: 'food-packaging',
    description: 'Compostable and biodegradable paper coffee cups lined with plant-based PLA film.',
    material: 'paper',
    sizes: ['Assorted cup sizes'],
    specs: [
      { label: 'Material', value: 'Paper with PLA cornstarch film' },
      { label: 'Features', value: 'Fully compostable in 90-120 days' },
      { label: 'Usage', value: 'Hot beverages and coffee' },
    ],
  },
  {
    name: 'Square Paper Roll Labels',
    category: 'custom-labels',
    description: 'Custom printed square paper roll labels for branding and product packaging.',
    material: 'paper',
    sizes: ['Assorted label sizes'],
    specs: [
      { label: 'Shape', value: 'Square' },
      { label: 'Format', value: 'Roll labels' },
      { label: 'Usage', value: 'Custom product labels, branding' },
    ],
  },
  {
    name: 'Circle Paper Roll Labels',
    category: 'custom-labels',
    description: 'Custom printed circular paper roll labels for product and packaging decoration.',
    material: 'paper',
    sizes: ['Assorted label sizes'],
    specs: [
      { label: 'Shape', value: 'Circle' },
      { label: 'Format', value: 'Roll labels' },
      { label: 'Usage', value: 'Custom product labels, branding' },
    ],
  },
  {
    name: 'Oval Glossy Waterproof Labels',
    category: 'custom-labels',
    description: 'Glossy waterproof oval roll labels for durable custom product labeling.',
    material: 'other',
    sizes: ['Assorted label sizes'],
    specs: [
      { label: 'Shape', value: 'Oval' },
      { label: 'Finish', value: 'Glossy waterproof' },
      { label: 'Usage', value: 'Products needing moisture resistance' },
    ],
  },
  {
    name: 'Kraft Custom Print Pizza Boxes',
    category: 'pizza-boxes',
    description: 'Natural kraft corrugated pizza and bakery boxes customizable with your branding.',
    material: 'cardboard',
    sizes: ['8x8', '10x10', '12x12', '14x14', '16x16', '18x18'],
    specs: [
      { label: 'Material', value: 'Corrugated cardboard' },
      { label: 'Finish', value: 'Natural kraft' },
      { label: 'Usage', value: 'Pizzas, calzones, cakes, bakery items' },
    ],
  },
]

async function seed() {
  console.log('Starting seed...')

  const payload = await getPayload({ config })

  // Create categories
  console.log('Creating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of categories) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        categoryMap[cat.slug] = existing.docs[0].id
        console.log(`  Category "${cat.name}" already exists`)
      } else {
        const created = await payload.create({
          collection: 'categories',
          data: {
            name: cat.name,
            slug: cat.slug,
            prefix: cat.prefix,
            order: cat.order,
            description: cat.description,
          },
        })
        categoryMap[cat.slug] = created.id
        console.log(`  Created category: ${cat.name}`)
      }
    } catch (error) {
      console.error(`  Error creating category ${cat.name}:`, error)
    }
  }

  // Create products
  console.log('\nCreating products...')
  let productCount = 0

  for (const product of products) {
    try {
      const existing = await payload.find({
        collection: 'products',
        where: { name: { equals: product.name } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  Product "${product.name}" already exists`)
        continue
      }

      const categoryId = categoryMap[product.category]
      if (!categoryId) {
        console.log(`  Skipping "${product.name}" - category not found: ${product.category}`)
        continue
      }

      // Generate SKU
      const categoryInfo = categories.find(c => c.slug === product.category)
      const skuNumber = String(productCount + 1).padStart(3, '0')
      const sku = `${categoryInfo?.prefix || 'XX'}-${skuNumber}`

      await payload.create({
        collection: 'products',
        data: {
          name: product.name,
          slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
          sku,
          description: product.description,
          category: categoryId,
          filterableAttributes: {
            material: product.material as any,
            sizes: product.sizes.map(s => ({ size: s })),
          },
          specifications: product.specs,
          stockStatus: 'in_stock',
          pricing: {
            showPrice: false, // Prices to be added via admin
          },
        },
      })

      productCount++
      console.log(`  Created product: ${product.name} (${sku})`)
    } catch (error) {
      console.error(`  Error creating product ${product.name}:`, error)
    }
  }

  console.log(`\nSeed complete! Created ${productCount} products.`)
  process.exit(0)
}

seed().catch(console.error)
