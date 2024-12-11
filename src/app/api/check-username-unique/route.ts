import dbconnect from "@/lib/dbconnect";
import UserModel from "@/app/model/User";
import { z } from "zod";
import { usernameValidation } from "@/app/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {
    await dbconnect();

    try {
        const searchParams = new URL(request.url).searchParams;
        const queryparam = {
            username: searchParams.get("username"),
        };

        const result = UsernameQuerySchema.safeParse(queryparam);
        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Invalid query parameter",
                    errors: usernameError,
                }),
                { status: 400 }
            );
        }

        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingVerifiedUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username already exists",
                }),
                { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Username is unique",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking username:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error checking username",
            }),
            { status: 500 }
        );
    }
}
