import 'dotenv/config'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URI

if (!connectionString) {
  throw new Error('DATABASE_URI environment variable is not set')
}

const sql = postgres(connectionString)

async function resetDatabase() {
  console.log('Dropping all tables...')

  // Drop all tables in the public schema
  await sql`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS "' || r.tablename || '" CASCADE';
      END LOOP;
    END $$;
  `

  console.log('All tables dropped successfully!')
  await sql.end()
}

resetDatabase().catch(console.error)
