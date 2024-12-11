import {resend} from "../../lib/resend";

import VerificationEmail from "../../../emails/verificationEmails";

import { ApiResponse } from "../types/ApiResponse";
// import { log } from "console";

export async function sendverificationemail(
    email: string,
    username: string,
    verifycode: string
): Promise<ApiResponse> {
    try{
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Mystry message | verification code",
            react: VerificationEmail({ username, otp: verifycode }) ,
          });
return {success:true,message:"Verification email sent successfully"}
    }
    catch(error){
console.log("error sending verification email",error);
return {success:false,message:"Error sending verification email"}
    }
}