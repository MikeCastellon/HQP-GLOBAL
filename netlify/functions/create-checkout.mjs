import Stripe from "stripe";

const BULK_PRICE_ID = "price_1T5VU5D6qFcGq2yvlCCotn5R";
const SINGLE_PRICE_ID = "price_1RGQzfD6qFcGq2yvTvH2h8d2";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const secretKey = Netlify.env.get("STRIPE_SECRET_KEY");
  if (!secretKey) {
    return new Response(JSON.stringify({ error: "Stripe not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stripe = new Stripe(secretKey);

  try {
    const { tier, quantity } = await req.json();

    let priceId;
    let qty;

    if (tier === "bulk") {
      priceId = BULK_PRICE_ID;
      qty = Math.max(3, parseInt(quantity) || 3);
    } else {
      priceId = SINGLE_PRICE_ID;
      qty = 1;
    }

    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: qty,
          ...(tier === "bulk" ? { adjustable_quantity: { enabled: true, minimum: 3 } } : {}),
        },
      ],
      success_url: `${origin}/neurovizr.html?checkout=success`,
      cancel_url: `${origin}/neurovizr.html?checkout=cancelled`,
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
  path: "/api/checkout",
};
