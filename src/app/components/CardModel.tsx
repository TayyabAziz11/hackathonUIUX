"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  isFullPage?: boolean
}

export default function CartModal({ isOpen, onClose, isFullPage = false }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const router = useRouter()

  if (!isOpen && !isFullPage) return null

  const handleViewCart = () => {
    router.push("/cart")
    onClose()
  }

  return (
    <div
      className={`${isFullPage ? "" : "fixed inset-0 bg-black bg-opacity-50 z-50"} flex items-center justify-center`}
    >
      <div className={`bg-white rounded-lg shadow-lg ${isFullPage ? "w-full" : "max-w-2xl w-full mx-4 max-h-[80vh]"}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            {!isFullPage && (
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 border-b pb-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title || ""}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-green-600">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 border-r hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="px-2 py-1 border-l hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center text-lg mb-2">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span>Total Price:</span>
                  <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                  {!isFullPage && (
                    <button
                      onClick={handleViewCart}
                      className="flex-1 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                      View Cart
                    </button>
                  )}
                  <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}