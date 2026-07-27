import jwt from "jsonwebtoken";

export default async function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    try {

        const auth = req.headers.authorization;

        if (!auth) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }

        const token = auth.replace("Bearer ", "");

        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return res.status(200).json({

            success: true,

            id: user.id,

            name: user.name,

            email: user.email

        });

    } catch {

        return res.status(401).json({

            success: false,

            message: "Session Expired"

        });

    }

}
