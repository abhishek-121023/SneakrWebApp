"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Heart, LogOut, MapPin, Package, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=64&width=64" alt="Profile picture" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Alex Johnson</h2>
                <p className="text-gray-500">alex.johnson@example.com</p>
              </div>
            </div>

            <Separator />

            <nav className="flex flex-col space-y-1">
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="w-4 h-4 mr-2" />
                My Orders
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "addresses" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "payment" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "account" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("account")}
              >
                <User className="w-4 h-4 mr-2" />
                Account Details
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>

              <Separator />

              <Button variant="ghost" className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Orders</h1>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">Order #{order.id}</CardTitle>
                          <CardDescription>{order.date}</CardDescription>
                        </div>
                        <Badge
                          className={
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">My Wishlist</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white rounded-full">
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500">{item.brand}</p>
                      <p className="font-bold mt-2">${item.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Account Details</h1>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" defaultValue="Johnson" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm new password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const orders = [
  {
    id: "ORD-12345",
    date: "May 12, 2023",
    status: "Delivered",
    total: 279.98,
    items: [
      {
        name: "Air Max Pulse",
        size: "US 9",
        quantity: 1,
        price: 149.99,
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "RS-X Reinvention",
        size: "US 10",
        quantity: 1,
        price: 129.99,
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "April 28, 2023",
    status: "Shipped",
    total: 189.99,
    items: [
      {
        name: "Ultra Boost 23",
        size: "US 9.5",
        quantity: 1,
        price: 189.99,
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    id: "ORD-12347",
    date: "April 15, 2023",
    status: "Processing",
    total: 219.99,
    items: [
      {
        name: "Jordan 4 Retro",
        size: "US 10",
        quantity: 1,
        price: 219.99,
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
]

const wishlistItems = [
  {
    id: "1",
    name: "Dunk Low",
    brand: "Nike",
    price: 109.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Yeezy Boost 350",
    brand: "Adidas",
    price: 229.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Old Skool",
    brand: "Vans",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]
