"use client"

import { useState } from "react"
import type { Card } from "@/sanity/lib/interface"
import CartModal from "./CardModel"
import { useCart } from "@/context/CartContext"
import { useClerk } from '@clerk/clerk-react'; 

interface AddToCartProps {
  product: Card & {
    imageUrl?: string;
  }
}

export default function AddToCart({ product }: AddToCartProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Access Clerk's hook
  const { user, openSignIn } = useClerk()

  const handleAddToCart = () => {
    if (!user) {
      openSignIn();
      return;
    }

    // Transform CategoryProduct to Card
    const cartProduct: Card = {
      ...product,
      title: product.name || product.title,
      image_url: product.imageUrl || "/placeholder.png",
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
      quantity: 1,
      name: product.name,
      description: product.description,
      tags: product.tags || [],
      rating: 0,  
      isNew: product.isNew || false,
      dicountPercentage: product.dicountPercentage || 0,
      category: '', 
    }

    addToCart(cartProduct)
    setIsCartOpen(true)
  }

  return (
    <div className="mt-6 space-y-4">

      <div className="flex items-center gap-4">

        <label className="text-sm text-gray-600">Quantity:</label>

        <div className="flex items-center border rounded-md">

          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 border-r hover:bg-gray-100 transition-colors"
          >
            -
          </button>

          <span className="px-6 py-2">{quantity}</span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 border-l hover:bg-gray-100 transition-colors"
          >
            +
          </button>

        </div>
        
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Add to Cart
      </button>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
