import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/lib/products"
import { AnimatedLogo, ArtisticLogo } from "@/components/logo"

export default function Home() {
  const featuredProducts = getFeaturedProducts(4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 hero-gradient overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center relative">
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
            <div className="relative lg:ml-10 animate-float">
              <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl animate-pulse-glow"></div>
              <Image
                src="/images/nike-travis-scott.png"
                alt="Featured Sneaker"
                width={600}
                height={600}
                className="mx-auto object-cover rounded-xl relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Showcase */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="font-heading text-2xl md:text-3xl text-center">OUR BRAND</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <AnimatedLogo />
              </div>
              <div className="flex justify-center">
                <ArtisticLogo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="section-title">FEATURED SNEAKERS</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our most popular styles, handpicked for you
              </p>
            </div>
          </div>
          <div className="product-grid mt-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="product-card group">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="product-image object-cover w-full aspect-square"
                  />
                  {product.isNew && <Badge className="badge-new absolute top-2 right-2">New</Badge>}
                  <div className="product-actions">
                    <Button className="w-full">Add to Cart</Button>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="product-title group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="rating-stars">
                      <Star className="star-filled w-4 h-4" />
                      <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <p className="price-text">${product.price.toFixed(2)}</p>
                    <Button size="sm" variant="ghost" className="rounded-full p-0 w-9 h-9 hover:bg-primary/20">
                      <ShoppingBag className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="section-title">SHOP BY CATEGORY</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find your perfect pair in our curated collections
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="category-card group">
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
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-muted">
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
