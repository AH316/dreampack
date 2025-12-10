import 'dotenv/config'
import { hash } from 'bcryptjs'
import { db } from '../src/db'
import { users } from '../src/db/schema'

async function seedAdmin() {
  const email = 'admin@dreampack.com'
  const password = 'admin123' // Change this in production!

  console.log('Creating admin user...')

  const passwordHash = await hash(password, 12)

  await db.insert(users).values({
    email,
    passwordHash,
    name: 'Admin',
    role: 'admin',
  }).onConflictDoNothing()

  console.log('Admin user created!')
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)

  process.exit(0)
}

seedAdmin().catch(console.error)
