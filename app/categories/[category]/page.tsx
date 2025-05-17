import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductsByCategory, getCategoryBySlug } from "@/lib/products"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category
  const category = getCategoryBySlug(categorySlug)
  const products = getProductsByCategory(category?.name || "")

  if (!category) {
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8 text-muted-foreground">The category you're looking for doesn't exist.</p>
        <Link href="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="font-heading text-3xl md:text-5xl tracking-wide mb-4 animate-fade-in">
            {category.name} SNEAKERS
          </h1>
          <p className="max-w-2xl text-lg md:text-xl animate-slide-up">{category.description}</p>
        </div>
      </div>

      <div className="container px-4 py-12 md:px-6">
        <div className="flex flex-col space-y-12">
          {/* Category Description */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl tracking-wide mb-4">
              EXPLORE OUR {category.name.toUpperCase()} COLLECTION
            </h2>
            <p className="text-muted-foreground">
              {category.name === "Running" &&
                "Discover our premium selection of running shoes designed for performance, comfort, and durability. Whether you're training for a marathon or enjoying a casual jog, find the perfect pair to match your stride."}
              {category.name === "Lifestyle" &&
                "Step up your everyday style with our curated collection of lifestyle sneakers. From classic silhouettes to modern designs, these versatile shoes blend comfort and fashion for any occasion."}
              {category.name === "Basketball" &&
                "Elevate your game with our high-performance basketball sneakers. Engineered for explosive movements, superior traction, and ankle support, these shoes help you dominate the court."}
              {category.name === "Limited Edition" &&
                "Own a piece of sneaker history with our exclusive limited edition releases. Featuring rare collaborations, special colorways, and unique designs that stand out from the crowd."}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="rounded-full">
              All
            </Button>
            <Button variant="outline" className="rounded-full">
              New Arrivals
            </Button>
            <Button variant="outline" className="rounded-full">
              Best Sellers
            </Button>
            <Button variant="outline" className="rounded-full">
              Price: Low to High
            </Button>
            <Button variant="outline" className="rounded-full">
              Price: High to Low
            </Button>
          </div>

          {/* Products Grid */}
          <div className="product-grid">
            {products.map((product) => (
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
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="rating-stars">
                      <Star className="star-filled w-4 h-4" />
                      <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <p className="price">${product.price.toFixed(2)}</p>
                    <Button size="sm" variant="ghost" className="rounded-full p-0 w-9 h-9 hover:bg-primary/20">
                      <ShoppingBag className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No products found in this category</h3>
              <p className="text-muted-foreground mb-6">Check back soon as we're constantly updating our inventory.</p>
              <Link href="/products">
                <Button>Browse All Products</Button>
              </Link>
            </div>
          )}

          {/* Category Features */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {category.name === "Running" && (
                <>
                  <div className="glass-card p-6 text-center">
                    <h3 className="font-heading text-xl mb-2">PERFORMANCE ENGINEERED</h3>
                    <p className="text-muted-foreground">
                      Advanced cushioning and support technologies for optimal running performance.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="font-heading text-xl mb-2">LIGHTWEIGHT DESIGN</h3>
                    <p className="text-muted-foreground">
                      Engineered to be lightweight without sacrificing durability or support.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="font-heading text-xl mb-2">RESPONSIVE CUSHIONING</h3>
                    <p className="text-muted-foreground">
                      Energy-returning materials that help propel you forward with each stride.
                    </p>
                  </div>
                </>
              )}

              {category.name === "Lifestyle" && (
                <>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Everyday Comfort</h3>
                    <p className="text-muted-foreground">
                      Designed for all-day wear with premium cushioning and support.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Versatile Style</h3>
                    <p className="text-muted-foreground">
                      Effortlessly transition from casual to semi-formal occasions.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Iconic Designs</h3>
                    <p className="text-muted-foreground">
                      Classic silhouettes and contemporary styles that stand the test of time.
                    </p>
                  </div>
                </>
              )}

              {category.name === "Basketball" && (
                <>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Court Grip</h3>
                    <p className="text-muted-foreground">
                      Specialized outsole patterns designed for maximum traction on indoor courts.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Ankle Support</h3>
                    <p className="text-muted-foreground">
                      Strategic support systems to help prevent injuries during quick cuts and jumps.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Responsive Cushioning</h3>
                    <p className="text-muted-foreground">
                      Impact protection and energy return for explosive jumps and hard landings.
                    </p>
                  </div>
                </>
              )}

              {category.name === "Limited Edition" && (
                <>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Collector's Value</h3>
                    <p className="text-muted-foreground">Rare releases that often appreciate in value over time.</p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Exclusive Collaborations</h3>
                    <p className="text-muted-foreground">
                      Unique designs created with artists, athletes, and cultural icons.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Premium Materials</h3>
                    <p className="text-muted-foreground">
                      Crafted with high-quality materials and exceptional attention to detail.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
