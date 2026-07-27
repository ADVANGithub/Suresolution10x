export default async function handler(req, res) {

    if (req.method !== "GET") {

        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });

    }

    try {

        const { order_id } = req.query;

        if (!order_id) {

            return res.status(400).json({

                success: false,

                message: "Order ID Missing"

            });

        }

        const response = await fetch(

            `https://api.cashfree.com/pg/orders/${order_id}`,

            {

                method: "GET",

                headers: {

                    "x-client-id": process.env.CASHFREE_CLIENT_ID,

                    "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,

                    "x-api-version": "2025-01-01",

                    "Accept": "application/json"

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            return res.status(response.status).json(data);

        }

        return res.status(200).json({

            success: true,

            order_id: data.order_id,

            order_status: data.order_status,

            order_amount: data.order_amount,

            customer_name: data.customer_details?.customer_name,

            customer_email: data.customer_details?.customer_email,

            customer_phone: data.customer_details?.customer_phone

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}
