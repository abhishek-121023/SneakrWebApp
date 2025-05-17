import type React from "react"
import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ImageAttribution from "@/components/image-attribution"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { Toaster } from "@/components/ui/toaster"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SNEAKR - Premium Sneaker Store",
  description:
    "Discover the latest in sneaker innovation. Limited editions, exclusive drops, and timeless classics from Nike, Adidas, Jordan and more.",
  keywords: "sneakers, shoes, Nike, Adidas, Jordan, running shoes, basketball shoes, limited edition sneakers",
  generator: "v0.dev",
  metadataBase: new URL("https://sneakr.store"),
  openGraph: {
    type: "website",
    title: "SNEAKR - Premium Sneaker Store",
    description: "Discover the latest in sneaker innovation. Limited editions, exclusive drops, and timeless classics.",
    siteName: "SNEAKR",
  },
  twitter: {
    card: "summary_large_image",
    title: "SNEAKR - Premium Sneaker Store",
    description: "Discover the latest in sneaker innovation. Limited editions, exclusive drops, and timeless classics.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${plusJakartaSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CartProvider>
            <WishlistProvider>
              <div className="relative flex min-h-screen flex-col">
                <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                  <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
                </div>
                <Header />
                <main className="flex-1">{children}</main>
                <ImageAttribution />
                <Footer />
              </div>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
