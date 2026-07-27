import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
                message: "Email is required"
            });
        }

        const { data: student, error } = await supabase
            .from("students")
            .select("*")
            .eq("email", email.toLowerCase())
            .eq("payment_status", "SUCCESS")
            .single();

        if (error || !student) {
            return res.status(401).json({
                success: false,
                message: "No active course found."
            });
        }

        const token = jwt.sign(
            {
                id: student.id,
                name: student.name,
                email: student.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d"
            }
        );

        return res.status(200).json({
            success: true,
            token,
            student: {
                id: student.id,
                name: student.name,
                email: student.email
            }
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

}
