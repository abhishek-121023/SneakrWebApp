"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/products"

export type WishlistItem = {
  id: string
  name: string
  brand: string
  price: number
  image: string
}

type WishlistContextType = {
  items: WishlistItem[]
  itemCount: number
  addItem: (product: Product, silent?: boolean) => void
  removeItem: (id: string, silent?: boolean) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const itemCount = items.length

  const isInWishlist = useCallback((id: string) => {
    return items.some((item) => item.id === id)
  }, [items])

  const addItem = useCallback((product: Product, silent = false) => {
    if (isInWishlist(product.id)) {
      if (!silent) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
        })
      }
      return
    }

    const newItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    }

    setItems((prevItems) => [...prevItems, newItem])

    if (!silent) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      })
    }
  }, [isInWishlist])

  const removeItem = useCallback((id: string, silent = false) => {
    const itemToRemove = items.find((item) => item.id === id)
    
    if (!itemToRemove) return

    setItems((prevItems) => prevItems.filter((item) => item.id !== id))

    if (!silent && itemToRemove) {
      toast({
        title: "Removed from wishlist",
        description: `${itemToRemove.name} has been removed from your wishlist`,
      })
    }
  }, [items])

  const clearWishlist = useCallback(() => {
    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }, [])

  const value = {
    items,
    itemCount,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
