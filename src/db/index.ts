import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URI

if (!connectionString) {
  throw new Error('DATABASE_URI environment variable is not set')
}

// Create postgres connection
const client = postgres(connectionString)

// Create drizzle database instance
export const db = drizzle(client, { schema })

// Export schema for use elsewhere
export * from './schema'
