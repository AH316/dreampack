export interface CartItem {
  productId: string
  productSlug: string
  name: string
  image: string | null
  category: string | null
  size?: string
  quantity: number
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  updatedAt: string
}

export interface CartContextType {
  cart: Cart
  addItem: (item: Omit<CartItem, 'addedAt' | 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string, size?: string) => void
  updateQuantity: (productId: string, quantity: number, size?: string) => void
  clearCart: () => void
  itemCount: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}
