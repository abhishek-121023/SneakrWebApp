"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Menu, Search, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { CartSheet } from "@/components/cart-sheet"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { itemCount: cartItemCount } = useCart()
  const { itemCount: wishlistItemCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background">
            <nav className="flex flex-col gap-6">
              <Link href="/" className="text-2xl font-bold text-gradient" passHref>
                <SheetClose>SNEAKR</SheetClose>
              </Link>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Shop</p>
                <div className="space-y-3 pl-1">
                  <Link href="/products" className="block text-lg hover:text-primary transition-colors" passHref>
                    <SheetClose>All Products</SheetClose>
                  </Link>
                  <Link
                    href="/categories/running"
                    className="block text-lg hover:text-primary transition-colors"
                    passHref
                  >
                    <SheetClose>Running</SheetClose>
                  </Link>
                  <Link
                    href="/categories/lifestyle"
                    className="block text-lg hover:text-primary transition-colors"
                    passHref
                  >
                    <SheetClose>Lifestyle</SheetClose>
                  </Link>
                  <Link
                    href="/categories/basketball"
                    className="block text-lg hover:text-primary transition-colors"
                    passHref
                  >
                    <SheetClose>Basketball</SheetClose>
                  </Link>
                  <Link
                    href="/categories/limited-edition"
                    className="block text-lg hover:text-primary transition-colors"
                    passHref
                  >
                    <SheetClose>Limited Edition</SheetClose>
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Account</p>
                <div className="space-y-3 pl-1">
                  <Link href="/auth/login" className="block text-lg hover:text-primary transition-colors" passHref>
                    <SheetClose>Sign In</SheetClose>
                  </Link>
                  <Link href="/auth/register" className="block text-lg hover:text-primary transition-colors" passHref>
                    <SheetClose>Create Account</SheetClose>
                  </Link>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="brand-logo text-gradient">SNEAKR</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/products" className="nav-text nav-link">
            All Products
          </Link>
          <Link href="/categories/running" className="nav-text nav-link">
            Running
          </Link>
          <Link href="/categories/lifestyle" className="nav-text nav-link">
            Lifestyle
          </Link>
          <Link href="/categories/basketball" className="nav-text nav-link">
            Basketball
          </Link>
          <Link href="/categories/limited-edition" className="nav-text nav-link">
            Limited Edition
          </Link>
        </nav>

        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="relative w-full max-w-sm">
              <Input
                placeholder="Search for products..."
                className="pr-8 bg-secondary/50 border-secondary focus:border-primary"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          <CartSheet />
        </div>
      </div>
    </header>
  )
}
