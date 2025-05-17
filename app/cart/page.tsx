"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [shippingMethod, setShippingMethod] = useState("standard")

  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="font-heading text-3xl mb-8">SHOPPING CART</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="font-heading text-2xl mb-4">YOUR CART IS EMPTY</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row gap-4 py-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-muted-foreground">{item.brand}</p>
                        <p className="text-muted-foreground">Size: {item.size}</p>
                      </div>
                      <p className="font-bold text-lg mt-2 sm:mt-0">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <div className="flex justify-between items-center">
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <div className="bg-secondary rounded-lg p-6 sticky top-6">
              <h2 className="font-heading text-xl mb-4">ORDER SUMMARY</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="promo-code" className="text-sm font-medium">
                      Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        id="promo-code"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="shipping-method" className="text-sm font-medium">
                      Shipping Method
                    </label>
                    <Select value={shippingMethod} onValueChange={setShippingMethod}>
                      <SelectTrigger id="shipping-method">
                        <SelectValue placeholder="Select shipping method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Shipping (3-5 days)</SelectItem>
                        <SelectItem value="express">Express Shipping (1-2 days)</SelectItem>
                        <SelectItem value="overnight">Overnight Shipping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
