export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_CLIENT_ID,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
        "x-api-version": "2025-01-01"
      },
      body: JSON.stringify({
        order_id: "ORDER_" + Date.now(),
        order_amount: 229,
        order_currency: "INR",

        customer_details: {
          customer_id: "CUS_" + Date.now(),
          customer_name: "Customer",
          customer_email: "customer@example.com",
          customer_phone: "9999999999"
        },

        order_meta: {
          return_url:
            "https://suresolutions10x.vercel.app/success.html?order_id={order_id}"
        }
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
