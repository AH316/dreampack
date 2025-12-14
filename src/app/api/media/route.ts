import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const mediaDir = path.join(process.cwd(), 'public', 'media')
    
    if (!fs.existsSync(mediaDir)) {
      return NextResponse.json({ images: [] })
    }

    const files = fs.readdirSync(mediaDir)
    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)
      })
      .map((file) => `/media/${file}`)
      .sort()

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error reading media directory:', error)
    return NextResponse.json({ images: [], error: 'Failed to read media' }, { status: 500 })
  }
}
