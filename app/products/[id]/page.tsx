"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, Share2, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { products as allProducts, getRelatedProducts } from "@/lib/products"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"

const products = allProducts

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id) || products[0]
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const isWishlisted = isInWishlist(product.id)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
    }
  }

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity)
  }

  const relatedProducts = getRelatedProducts(params.id, 4)

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl bg-secondary/30">
            <Image
              src={product.images?.[selectedImage] || product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full aspect-square transition-all duration-300 hover:scale-105"
            />
          </div>
          <div className="flex space-x-2 overflow-auto pb-2">
            {product.images?.map((image, index) => (
              <button
                key={index}
                className={`relative rounded-lg overflow-hidden flex-shrink-0 w-20 h-20 transition-all duration-200 ${
                  selectedImage === index
                    ? "border-2 border-primary ring-2 ring-primary/20"
                    : "border-2 border-transparent hover:border-primary/50"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                {product.category}
              </Badge>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleWishlist}
                  className={`hover:bg-primary/10 ${isWishlisted ? "text-primary" : ""}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
                  <span className="sr-only">{isWishlisted ? "Remove from wishlist" : "Add to wishlist"}</span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            <h1 className="font-heading text-3xl tracking-wide">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="rating-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "star-filled" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <p className="price-text text-primary">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="size-select" className="block font-medium">
                Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size-select" className="bg-secondary/50">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes?.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href="#size-guide" className="text-sm text-primary hover:underline">
                Size Guide
              </Link>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= 10}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1 btn-hover-effect" size="lg" disabled={!selectedSize} onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={toggleWishlist}
              >
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-primary" : ""}`} />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>

          <Separator className="bg-muted" />

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-success" />
              <span className="text-sm">In Stock - Ready to Ship</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border border-muted" />
              <span className="text-sm text-muted-foreground">Free Shipping on Orders Over $100</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border border-muted" />
              <span className="text-sm text-muted-foreground">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
            <TabsTrigger value="description" className="data-[state=active]:text-primary">
              Description
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:text-primary">
              Details & Care
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:text-primary">
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none text-muted-foreground">
              <p>{product.fullDescription}</p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {product.details?.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {product.care?.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="rating-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? "star-filled" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Based on {product.reviews} reviews</span>
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Write a Review</Button>
              </div>

              <Separator className="bg-muted" />

              <div className="space-y-6">
                {reviewsData.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="rating-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "star-filled" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <Separator className="bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="font-heading text-2xl tracking-wide mb-8">YOU MIGHT ALSO LIKE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="product-card group">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="product-image object-cover w-full aspect-square"
                />
                <div className="product-actions">
                  <Button size="sm" className="w-full">
                    Quick View
                  </Button>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="product-title group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-muted-foreground">{product.brand}</p>
                <p className="font-bold text-primary mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const reviewsData = [
  {
    id: "1",
    name: "Michael T.",
    rating: 5,
    date: "May 10, 2023",
    comment: "These are the most comfortable running shoes I've ever owned. Great cushioning and they look amazing!",
  },
  {
    id: "2",
    name: "Sarah J.",
    rating: 4,
    date: "April 22, 2023",
    comment: "Love the style and comfort. Runs slightly small, so I'd recommend sizing up half a size.",
  },
  {
    id: "3",
    name: "David L.",
    rating: 5,
    date: "March 15, 2023",
    comment: "Perfect for both running and casual wear. The air cushion really makes a difference on long runs.",
  },
]
