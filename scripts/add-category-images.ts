import 'dotenv/config'
import postgres from 'postgres'

async function migrate() {
  const sql = postgres(process.env.DATABASE_URI!)

  try {
    // Check if column exists
    const columnExists = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'categories' AND column_name = 'images'
    `

    if (columnExists.length > 0) {
      console.log('Column "images" already exists in categories table')
    } else {
      // Add the images column
      await sql`
        ALTER TABLE categories
        ADD COLUMN images jsonb DEFAULT '[]'::jsonb
      `
      console.log('Successfully added "images" column to categories table')
    }

    // Check if image_id column exists and drop it if so
    const imageIdExists = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'categories' AND column_name = 'image_id'
    `

    if (imageIdExists.length > 0) {
      await sql`
        ALTER TABLE categories
        DROP COLUMN image_id
      `
      console.log('Dropped old "image_id" column from categories table')
    }

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await sql.end()
  }

  console.log('Migration complete!')
}

migrate()
