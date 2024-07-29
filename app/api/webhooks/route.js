import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const buf = await buffer(request);
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("Session ID: ", session.id);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
      const dateTime = new Date(event.created * 1000).toLocaleDateString(
        "en-US",
        {}
      );
      console.log("Event created at: ", dateTime);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
