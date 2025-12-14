import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).notNull().default('user'), // 'admin' | 'editor' | 'user'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Media table
export const media = pgTable('media', {
  id: uuid('id').primaryKey().defaultRandom(),
  filename: varchar('filename', { length: 255 }).notNull(),
  url: text('url').notNull(),
  alt: varchar('alt', { length: 255 }),
  mimeType: varchar('mime_type', { length: 100 }),
  size: integer('size'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  images: jsonb('images').$type<string[]>().default([]), // Array of image paths
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Subcategories table
export const subcategories = pgTable('subcategories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Products table
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  sku: varchar('sku', { length: 100 }),
  description: text('description'),
  subcategoryId: uuid('subcategory_id').references(() => subcategories.id),
  categoryId: uuid('category_id').references(() => categories.id),
  images: jsonb('images').$type<string[]>().default([]), // Array of image paths
  specs: jsonb('specs').$type<Record<string, unknown>>().default({}),
  sizes: text('sizes'), // Comma-separated sizes
  pageNumber: integer('page_number'), // For mapping to catalog images
  featured: boolean('featured').default(false),
  price: text('price'), // Price as text (e.g., "$5.99", "From $10", etc.)
  showPrice: boolean('show_price').default(false), // false = "Contact for price"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Pages table
export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: jsonb('content'), // Rich text content as JSON
  status: varchar('status', { length: 50 }).notNull().default('draft'), // 'draft' | 'published'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Quotes table
export const quotes = pgTable('quotes', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }),
  companyName: varchar('company_name', { length: 255 }),
  items: jsonb('items').$type<{
    productId: string
    name: string
    size?: string
    quantity: number
  }[]>().notNull(),
  message: text('message'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // 'pending' | 'contacted' | 'completed'
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Contact info type
export type ContactInfo = {
  phone: string       // Main phone: (973) 836-1100
  cell: string        // Cell: (973) 727-7112
  email: string       // aipek@dreampackss.com
  whatsapp: string    // WhatsApp number
  address: string     // New Jersey
}

// Business hours type
export type BusinessHours = {
  weekdaysLabel: string  // "Monday - Friday"
  weekdays: string       // "9:00 AM - 5:00 PM"
  saturdayLabel: string  // "Saturday"
  saturday: string       // "By Appointment"
  sundayLabel: string    // "Sunday"
  sunday: string         // "Closed"
}

// Contact page content type
export type ContactPageContent = {
  title: string           // "Contact Us"
  subtitle: string        // "We're here to help with all your packaging needs"
  getInTouchTitle: string // "Get In Touch"
  quickContactTitle: string  // "Quick Contact"
  quickContactText: string   // "The fastest way to reach us..."
  quoteTitle: string         // "Request a Quote"
  quoteText: string          // "Send us an email with your requirements..."
  offeringsTitle: string     // "What We Offer"
}

// About page content type
export type AboutPageContent = {
  heroText: string
  storyTitle: string
  storyContent: string
  values: { title: string; description: string; icon: string }[]
  offerings: string[]
  ctaTitle: string
  ctaText: string
}

// Site settings table (single row)
export const siteSettings = pgTable('site_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  siteName: varchar('site_name', { length: 255 }).notNull().default('DreamPack'),
  logoId: uuid('logo_id').references(() => media.id),
  contactInfo: jsonb('contact_info').$type<ContactInfo>().default({
    phone: '(973) 836-1100',
    cell: '(973) 727-7112',
    email: 'aipek@dreampackss.com',
    whatsapp: '19737277112',
    address: 'New Jersey',
  }),
  businessHours: jsonb('business_hours').$type<BusinessHours>().default({
    weekdaysLabel: 'Monday - Friday',
    weekdays: '9:00 AM - 5:00 PM',
    saturdayLabel: 'Saturday',
    saturday: 'By Appointment',
    sundayLabel: 'Sunday',
    sunday: 'Closed',
  }),
  socialLinks: jsonb('social_links').$type<{
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }>().default({}),
  aboutPage: jsonb('about_page').$type<AboutPageContent>().default({
    heroText: 'Your trusted partner for quality packaging solutions, serving New York, New Jersey, and all of North America since 2010.',
    storyTitle: 'Our Story',
    storyContent: 'DreamPack has been a leading supplier of quality packaging products for over a decade. What started as a small family business has grown into a trusted partner for businesses across North America.\n\nWe take pride in offering a wide range of packaging solutions, from eco-friendly paper bags to elegant gift boxes. Our commitment to quality, competitive pricing, and exceptional customer service has made us the go-to choice for businesses of all sizes.',
    values: [
      { title: 'Quality Products', description: 'We source and provide only the highest quality packaging materials to ensure your products are presented at their best.', icon: 'shield' },
      { title: 'Competitive Pricing', description: 'As a wholesale supplier, we offer competitive bulk pricing without compromising on quality.', icon: 'dollar' },
      { title: 'Customer Service', description: 'Our dedicated team is always ready to help you find the perfect packaging solution for your needs.', icon: 'users' },
      { title: 'Fast Delivery', description: 'We maintain extensive inventory to ensure quick turnaround times for your orders.', icon: 'truck' },
    ],
    offerings: [
      'Paper Bags & Shopping Bags',
      'Food Packaging & Containers',
      'Gift Boxes & Tissue Paper',
      'Poly Bags & Plastic Packaging',
      'Custom Printing Services',
      'Eco-Friendly Options',
    ],
    ctaTitle: 'Ready to Get Started?',
    ctaText: 'Contact us today for a quote on your packaging needs.',
  }),
  contactPage: jsonb('contact_page').$type<ContactPageContent>().default({
    title: 'Contact Us',
    subtitle: 'We are here to help with all your packaging needs',
    getInTouchTitle: 'Get In Touch',
    quickContactTitle: 'Quick Contact',
    quickContactText: 'The fastest way to reach us is by phone. We are ready to help with your packaging needs.',
    quoteTitle: 'Request a Quote',
    quoteText: 'Send us an email with your requirements and we will get back to you with pricing.',
    offeringsTitle: 'What We Offer',
  }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
}))

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
  products: many(products),
}))

export const productsRelations = relations(products, ({ one }) => ({
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}))

export const siteSettingsRelations = relations(siteSettings, ({ one }) => ({
  logo: one(media, {
    fields: [siteSettings.logoId],
    references: [media.id],
  }),
}))

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Subcategory = typeof subcategories.$inferSelect
export type NewSubcategory = typeof subcategories.$inferInsert
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type Page = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert
export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert
export type SiteSettings = typeof siteSettings.$inferSelect
export type Quote = typeof quotes.$inferSelect
export type NewQuote = typeof quotes.$inferInsert
