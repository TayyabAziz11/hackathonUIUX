'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ReactNode, useEffect, useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function StripeProvider({
  children,
  amount
}: {
  children: ReactNode
  amount: number
}) {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      })
      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
    }

    if (amount > 0) {
      createPaymentIntent()
    }
  }, [amount])

  if (!clientSecret) return <div>Loading payment details...</div>

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: { theme: 'stripe' } }}
    >
      {children}
    </Elements>
  )
}