import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
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

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
