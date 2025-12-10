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
  imageId: uuid('image_id').references(() => media.id),
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

// Site settings table (single row)
export const siteSettings = pgTable('site_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  siteName: varchar('site_name', { length: 255 }).notNull().default('DreamPack'),
  logoId: uuid('logo_id').references(() => media.id),
  contactInfo: jsonb('contact_info').$type<{
    email?: string
    phone?: string
    address?: string
  }>().default({}),
  socialLinks: jsonb('social_links').$type<{
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }>().default({}),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Relations
export const categoriesRelations = relations(categories, ({ one, many }) => ({
  image: one(media, {
    fields: [categories.imageId],
    references: [media.id],
  }),
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
