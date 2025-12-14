// DreamPack WhatsApp number
export const WHATSAPP_NUMBER = '19738361100'

interface ProductInfo {
  name: string
  sku?: string | null
  size?: string
}

interface CartItem {
  name: string
  size?: string
  quantity: number
}

/**
 * Build a WhatsApp message URL for a single product inquiry
 */
export function buildProductWhatsAppUrl(product: ProductInfo): string {
  let message = `Hi DreamPack! I'm interested in:\n\n`
  message += `Product: ${product.name}\n`
  if (product.sku) {
    message += `SKU: ${product.sku}\n`
  }
  if (product.size) {
    message += `Size: ${product.size}\n`
  }
  message += `\nPlease provide pricing and availability.`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Build a WhatsApp message URL for cart items (quote request)
 */
export function buildCartWhatsAppUrl(items: CartItem[]): string {
  const itemsList = items
    .map((item) => `- ${item.name}${item.size ? ` (${item.size})` : ''} x ${item.quantity}`)
    .join('\n')

  const message =
    `Hi DreamPack! I'd like to request a quote for:\n\n` +
    `${itemsList}\n\n` +
    `Please contact me with pricing. Thank you!`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Build a general inquiry WhatsApp URL
 */
export function buildGeneralWhatsAppUrl(): string {
  const message = `Hi DreamPack! I have a question about your packaging products.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
