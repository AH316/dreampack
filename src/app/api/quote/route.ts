import { NextResponse } from 'next/server'
import { db } from '@/db'
import { quotes } from '@/db/schema'

interface QuoteItem {
  productId: string
  name: string
  size?: string
  quantity: number
}

interface QuoteRequest {
  customerName: string
  customerEmail: string
  customerPhone?: string
  companyName?: string
  items: QuoteItem[]
  message?: string
}

export async function POST(request: Request) {
  try {
    const body: QuoteRequest = await request.json()

    // Basic validation
    if (!body.customerName || !body.customerEmail || !body.items?.length) {
      return NextResponse.json(
        { error: 'Name, email, and at least one item are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.customerEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Insert quote into database
    const [quote] = await db.insert(quotes).values({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone || null,
      companyName: body.companyName || null,
      items: body.items,
      message: body.message || null,
      status: 'pending',
    }).returning()

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      message: 'Quote request submitted successfully',
    })
  } catch (error) {
    console.error('Failed to create quote:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}
