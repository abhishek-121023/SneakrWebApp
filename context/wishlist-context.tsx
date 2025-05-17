"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
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
  addItem: (product: Product) => void
  removeItem: (id: string) => void
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

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  const addItem = (product: Product) => {
    if (isInWishlist(product.id)) {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist`,
      })
      return
    }

    setItems((prevItems) => [
      ...prevItems,
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
      },
    ])

    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)

      if (itemToRemove) {
        toast({
          title: "Removed from wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist`,
        })
      }

      return prevItems.filter((item) => item.id !== id)
    })
  }

  const clearWishlist = () => {
    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
