export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    const orderId = "ORDER_" + Date.now();

    const response = await fetch("https://api.cashfree.com/pg/orders", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_CLIENT_ID,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
        "x-api-version": "2025-01-01"
      },

      body: JSON.stringify({

        order_id: orderId,

        order_amount: 229,

        order_currency: "INR",

        customer_details: {

          customer_id: "CUS_" + Date.now(),

          customer_name: name,

          customer_email: email,

          customer_phone: phone

        },

        order_meta: {

          return_url:
            "https://suresolutions10x.vercel.app/success.html?order_id={order_id}"

        }

      })

    });

    const data = await response.json();

    if (!response.ok) {

      return res.status(response.status).json(data);

    }

    return res.status(200).json({

      success: true,

      order_id: data.order_id,

      payment_session_id: data.payment_session_id

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error"

    });

  }
}
