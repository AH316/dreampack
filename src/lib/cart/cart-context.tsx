'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import type { Cart, CartItem, CartContextType } from './cart-types'

const CART_STORAGE_KEY = 'dreampack-cart'

const emptyCart: Cart = {
  items: [],
  updatedAt: new Date().toISOString(),
}

const CartContext = createContext<CartContextType | null>(null)

function loadCartFromStorage(): Cart {
  if (typeof window === 'undefined') return emptyCart

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load cart from storage:', e)
  }
  return emptyCart
}

function saveCartToStorage(cart: Cart): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (e) {
    console.error('Failed to save cart to storage:', e)
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart)
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(loadCartFromStorage())
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(cart)
    }
  }, [cart, isHydrated])

  const addItem = useCallback((newItem: Omit<CartItem, 'addedAt' | 'quantity'> & { quantity?: number }) => {
    setCart((prev) => {
      const existingIndex = prev.items.findIndex(
        (item) => item.productId === newItem.productId && item.size === newItem.size
      )

      let newItems: CartItem[]

      if (existingIndex >= 0) {
        // Update quantity of existing item
        newItems = prev.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        )
      } else {
        // Add new item
        newItems = [
          ...prev.items,
          {
            ...newItem,
            quantity: newItem.quantity || 1,
            addedAt: new Date().toISOString(),
          },
        ]
      }

      return {
        items: newItems,
        updatedAt: new Date().toISOString(),
      }
    })

    // Open cart drawer when item is added
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string, size?: string) => {
    setCart((prev) => ({
      items: prev.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      ),
      updatedAt: new Date().toISOString(),
    }))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeItem(productId, size)
      return
    }

    setCart((prev) => ({
      items: prev.items.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
      updatedAt: new Date().toISOString(),
    }))
  }, [removeItem])

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      updatedAt: new Date().toISOString(),
    })
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
