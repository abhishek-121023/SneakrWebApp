"use client"

import type React from "react"
import { createContext, useContext, useEffect, useLayoutEffect, useState, useCallback } from "react"
import type { Product } from "@/lib/products"

export type CartItem = {
  id: string
  name: string
  brand: string
  price: number
  size: string
  quantity: number
  image: string
}

type CartContextType = {
  items: CartItem[]
  itemCount: number
  addItem: (product: Product, size: string, quantity: number) => boolean
  updateQuantity: (id: string, size: string, quantity: number) => void
  removeItem: (id: string, size: string) => void
  clearCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const MAX_QUANTITY_PER_ITEM = 10
const MIN_QUANTITY = 1

// Use this for SSR to avoid hydration mismatch
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage only on client-side
  useIsomorphicLayoutEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useIsomorphicLayoutEffect(() => {
    if (items.length > 0 || localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  const validateQuantity = useCallback((quantity: number): number => {
    return Math.min(Math.max(Math.round(quantity), MIN_QUANTITY), MAX_QUANTITY_PER_ITEM)
  }, [])

  const addItem = useCallback((product: Product, size: string, quantity: number) => {
    if (!size) {
      return false
    }

    const validQuantity = validateQuantity(quantity)
    const existingItemIndex = items.findIndex((item) => item.id === product.id && item.size === size)

    if (existingItemIndex > -1) {
      const currentQuantity = items[existingItemIndex].quantity
      const newQuantity = validateQuantity(currentQuantity + validQuantity)

      if (newQuantity === MAX_QUANTITY_PER_ITEM) {
        return false
      }

      setItems((prevItems) => {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity = newQuantity
        return updatedItems
      })
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        size,
        quantity: validQuantity,
        image: product.image,
      }

      setItems((prevItems) => [...prevItems, newItem])
    }
    return true
  }, [items, validateQuantity])

  const updateQuantity = useCallback((id: string, size: string, quantity: number) => {
    const validQuantity = validateQuantity(quantity)

    setItems((prevItems) =>
      prevItems.map((item) => 
        item.id === id && item.size === size 
          ? { ...item, quantity: validQuantity }
          : item
      )
    )
  }, [validateQuantity])

  const removeItem = useCallback((id: string, size: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const value = {
    items,
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
