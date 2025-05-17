"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
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
  addItem: (product: Product, size: string, quantity: number) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  removeItem: (id: string, size: string) => void
  clearCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const addItem = (product: Product, size: string, quantity: number) => {
    if (!size) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive",
      })
      return
    }

    setItems((prevItems) => {
      // Check if the item with the same id and size already exists
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id && item.size === size)

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity

        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated in your cart`,
        })

        return updatedItems
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        })

        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            size,
            quantity,
            image: product.image,
          },
        ]
      }
    })
  }

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item)),
    )
  }

  const removeItem = (id: string, size: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id && item.size === size)

      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        })
      }

      return prevItems.filter((item) => !(item.id === id && item.size === size))
    })
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
