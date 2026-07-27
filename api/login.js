export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        /*
        STEP 1 (Temporary MVP)

        Replace this later with your database lookup.

        Example:
        const student = await supabase
            .from("students")
            .select("*")
            .eq("email", email)
            .eq("payment_status","SUCCESS")
            .single();

        */

        const allowedEmails = [
            "ajay@example.com"
        ];

        if (allowedEmails.includes(email.toLowerCase())) {

            return res.status(200).json({

                success: true,

                message: "Login Successful"

            });

        }

        return res.status(401).json({

            success: false,

            message:
                "No paid course found with this email."

        });

    } catch (err) {

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

}
