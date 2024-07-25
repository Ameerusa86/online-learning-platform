"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout({ course }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course }),
    });

    const { id } = await response.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
    setLoading(false);
  };

  return (
    <div>
      {/* <h1>{course.title}</h1> */}
      <h1>course.title</h1>
      {/* <p>{course.description}</p> */}
      <p>course.description</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
}
