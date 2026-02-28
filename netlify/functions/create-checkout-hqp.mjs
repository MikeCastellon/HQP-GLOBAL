import Stripe from "stripe";

const PRODUCT_ID = "prod_U3iCIoP6ag9ZiE";
const UNIT_AMOUNT = 397500; // $3,975.00

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const secretKey = Netlify.env.get("HQP_STRIPE_SECRET_KEY");
  if (!secretKey) {
    return new Response(JSON.stringify({ error: "Stripe not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stripe = new Stripe(secretKey);

  try {
    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: PRODUCT_ID,
            unit_amount: UNIT_AMOUNT,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/thank-you-hqp.html`,
      cancel_url: `${origin}/hqp-cris-gold.html#pricing`,
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "GB", "AU", "DE", "FR", "NL", "BE", "AT", "CH",
          "IT", "ES", "PT", "IE", "NZ", "SE", "NO", "DK", "FI", "JP",
          "SG", "HK", "MX", "BR", "IL", "ZA", "AE", "IN",
        ],
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/checkout-hqp",
};
