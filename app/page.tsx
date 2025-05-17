"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/lib/products"
import { ScrollReveal } from "@/components/scroll-reveal"
import type { Product } from "@/lib/products"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Fetch products on client side
      const products = getFeaturedProducts(6)
      setFeaturedProducts(products)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full min-h-screen py-16 md:py-24 lg:py-32 hero-gradient overflow-hidden flex items-center" 
      style={{ background: 'transparent' }}>
        <div className="container px-4 md:px-6 relative">
          <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Badge variant="outline" className="border-primary text-primary bg-primary/10 backdrop-blur-sm">
                  New Collection
                </Badge>
                <h1 className="font-heading text-4xl tracking-wide sm:text-5xl xl:text-6xl/none">
                  Step Into <span className="text-gradient">THE FUTURE</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover the latest in sneaker innovation. Limited editions, exclusive drops, and timeless classics.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/products">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 btn-hover-effect">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/collections/new-arrivals">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    New Arrivals
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative lg:ml-10 sneaker-3d-container">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-3xl animate-pulse-slow"></div>
              <div className="sneaker-3d-wrapper">
                <Image
                  src="/images/nike-travis-scott.png"
                  alt="Featured Sneaker"
                  width={600}
                  height={600}
                  className="sneaker-3d"
                  priority
                />
                <div className="sneaker-shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-background">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="section-title">FEATURED SNEAKERS</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our most popular styles, handpicked for you
                </p>
              </div>
            </div>
          </ScrollReveal>

          {error ? (
            <div className="text-center mt-8 text-red-500">
              <p>{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-secondary/50 rounded-xl aspect-square mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-secondary/50 rounded w-3/4"></div>
                    <div className="h-4 bg-secondary/50 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {featuredProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 200}>
                  <Link 
                    href={`/products/${product.id}`} 
                    className="group relative overflow-hidden rounded-xl bg-background shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        priority={index < 3}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <Badge variant="outline" className="mb-2 border-white/20 text-white bg-white/10 backdrop-blur-sm">
                        {product.category}
                      </Badge>
                      <h3 className="text-xl font-heading mb-1">{product.name}</h3>
                      <p className="text-sm text-white/80 mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-heading">${product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="section bg-secondary">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="section-title">SHOP BY CATEGORY</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find your perfect pair in our curated collections
                </p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {categories.map((category, index) => (
              <ScrollReveal key={category.id} delay={index * 200}>
                <Link 
                  href={`/categories/${category.slug}`} 
                  className="category-card group"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="object-cover w-full aspect-[4/3] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl">PREMIUM QUALITY</h3>
              <p className="text-muted-foreground">
                Crafted with the finest materials and attention to detail for superior comfort and durability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl">AUTHENTICITY GUARANTEED</h3>
              <p className="text-muted-foreground">
                Every pair is 100% authentic, verified and guaranteed to meet the highest standards.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl">MEMBER BENEFITS</h3>
              <p className="text-muted-foreground">
                Join our community for exclusive access to limited releases, special discounts, and events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section hero-gradient">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="font-heading text-3xl tracking-wide md:text-4xl">STAY IN THE LOOP</h2>
                <p className="text-muted-foreground md:text-xl">
                  Subscribe to our newsletter for exclusive drops, special offers, and sneaker news.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-foreground placeholder:text-foreground/60"
                />
                <Button className="bg-white text-background hover:bg-white/90">Subscribe</Button>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <h3 className="text-2xl font-heading text-primary">10%</h3>
                  <p className="text-muted-foreground">First Order Discount</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <h3 className="text-2xl font-heading text-primary">24/7</h3>
                  <p className="text-muted-foreground">Customer Support</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <h3 className="text-2xl font-heading text-primary">FREE</h3>
                  <p className="text-muted-foreground">Shipping Over $100</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <h3 className="text-2xl font-heading text-primary">EASY</h3>
                  <p className="text-muted-foreground">Returns & Exchanges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const categories = [
  {
    id: "1",
    name: "Running",
    slug: "running",
    image: "/images/category-running.png",
  },
  {
    id: "2",
    name: "Lifestyle",
    slug: "lifestyle",
    image: "/images/category-lifestyle.png",
  },
  {
    id: "3",
    name: "Basketball",
    slug: "basketball",
    image: "/images/category-basketball.png",
  },
  {
    id: "4",
    name: "Limited Edition",
    slug: "limited-edition",
    image: "/images/category-limited.png",
  },
]
