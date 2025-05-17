"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { products } from "@/lib/products"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()

  // State to track selected sizes for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }))
  }

  const handleAddToCart = (productId: string) => {
    const size = selectedSizes[productId]
    if (!size) return

    const product = products.find((p) => p.id === productId)
    if (product) {
      addItem(product, size, 1)
    }
  }

  const getProductSizes = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    return product?.sizes || []
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="font-heading text-3xl tracking-wide">MY WISHLIST</h1>
          <p className="text-muted-foreground">
            Items you've saved for later. Add them to your cart when you're ready to purchase.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="bg-muted rounded-full p-8">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2 max-w-md">
              <h2 className="font-heading text-2xl">YOUR WISHLIST IS EMPTY</h2>
              <p className="text-muted-foreground">
                Browse our collection and add your favorite items to your wishlist.
              </p>
            </div>
            <Button asChild className="mt-4">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
              <Button variant="outline" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="product-card group relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>

                  <Link href={`/products/${item.id}`}>
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="product-image object-cover w-full aspect-square"
                      />
                    </div>
                  </Link>

                  <div className="p-4 space-y-3">
                    <div>
                      <Link href={`/products/${item.id}`}>
                        <h3 className="product-title group-hover:text-primary transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-muted-foreground">{item.brand}</p>
                      <p className="font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="space-y-3">
                      <Select
                        value={selectedSizes[item.id] || ""}
                        onValueChange={(value) => handleSizeChange(item.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {getProductSizes(item.id).map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        className="w-full"
                        disabled={!selectedSizes[item.id]}
                        onClick={() => handleAddToCart(item.id)}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator className="my-8" />

        <div className="text-center">
          <h2 className="font-heading text-2xl mb-4">RECENTLY VIEWED</h2>
          <p className="text-muted-foreground mb-8">Continue exploring your recently viewed products</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
