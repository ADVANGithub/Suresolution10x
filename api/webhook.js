export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).send("Method Not Allowed");

    }

    try {

        const body = req.body;

        console.log("Cashfree Webhook Received");

        console.log(JSON.stringify(body, null, 2));

        const event = body.type;

        const payment = body.data?.payment;

        const order = body.data?.order;

        if (
            body.type === "PAYMENT_SUCCESS_WEBHOOK" &&
            payment?.payment_status === "SUCCESS"
        ) {

            console.log("====================================");

            console.log("PAYMENT SUCCESS");

            console.log("Order ID :", order?.order_id);

            console.log("Payment ID :", payment?.cf_payment_id);

            console.log("Amount :", payment?.payment_amount);

            console.log("Customer :", order?.customer_details?.customer_name);

            console.log("====================================");

            /*
                SAVE PAYMENT TO DATABASE

                Example:

                await db.payment.create({

                    orderId: order.order_id,

                    paymentId: payment.cf_payment_id,

                    amount: payment.payment_amount,

                    email: order.customer_details.customer_email,

                    phone: order.customer_details.customer_phone,

                    status: "SUCCESS"

                });

            */

        }

        else if (

            payment?.payment_status === "FAILED"

        ) {

            console.log("Payment Failed");

        }

        else if (

            payment?.payment_status === "PENDING"

        ) {

            console.log("Payment Pending");

        }

        return res.status(200).json({

            success: true

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
