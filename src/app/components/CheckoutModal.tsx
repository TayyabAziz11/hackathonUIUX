"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { CheckCircle } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutModalProps {
  amount: number
  onClose: () => void
  onPaymentSuccess: () => void
}

export default function CheckoutModal({ amount, onClose, onPaymentSuccess }: CheckoutModalProps) {
  const [clientSecret, setClientSecret] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "error">("pending")

  useEffect(() => {
    // Create PaymentIntent as soon as the modal opens
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(amount * 100) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])

  const handlePaymentSuccess = () => {
    setPaymentStatus("success")
    onPaymentSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        
        {paymentStatus === "success" ? (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="mb-6">Thank you for your purchase.</p>
            <button
              onClick={onClose}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm onPaymentSuccess={handlePaymentSuccess} onClose={onClose} />
              </Elements>
            )}

          </>
        )}
      </div>
    </div>
  )
}

