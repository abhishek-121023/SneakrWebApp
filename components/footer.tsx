import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="brand-logo text-gradient">
              SNEAKR
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Discover the latest in sneaker innovation. Limited editions, exclusive drops, and timeless classics.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="footer-link">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/running" className="footer-link">
                  Running
                </Link>
              </li>
              <li>
                <Link href="/categories/lifestyle" className="footer-link">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/categories/basketball" className="footer-link">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="/categories/limited-edition" className="footer-link">
                  Limited Edition
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="footer-link">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="footer-link">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="footer-link">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="footer-link">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="footer-link">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="footer-link">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="footer-link">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-muted pt-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-heading text-xl">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground">Get the latest updates on new products and upcoming sales</p>
              <div className="flex max-w-md">
                <Input
                  placeholder="Your email address"
                  className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>

            <div className="flex flex-col justify-end space-y-4 sm:items-end">
              <div className="flex flex-wrap gap-4 sm:justify-end">
                <Link href="/terms" className="footer-link">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
                <Link href="/accessibility" className="footer-link">
                  Accessibility
                </Link>
              </div>
              <p className="text-muted-foreground">© 2023 SNEAKR. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
