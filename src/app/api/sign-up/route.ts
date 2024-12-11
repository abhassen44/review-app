import dbconnect from "@/lib/dbconnect";
import UserModel from "@/app/model/User";
import bcrypt from "bcryptjs";

import { sendverificationemail } from "@/app/helpers/sendverificationemail";


export async function POST(req: Request) {
await dbconnect();
try{
const body = await req.json();
const { username, email, password } = body;

const existingUserVerifiedByUsername=await UserModel.findOne({username:username,isVerified:true});

if(existingUserVerifiedByUsername){
    return Response.json({ 
        success: false, message: "Username already exists" 
        },    
        {
        status: 400,
        }
    );
}

const existingUserByemail=await UserModel.findOne({email:email});
const verifycode=(Math.floor(Math.random() * 900000) + 100000).toString();

if(existingUserByemail){
    if(existingUserByemail.isVerified){
        return Response.json({ 
            success: false, message: "Email already exists" 
            },    
            {
            status: 400,
            }
        );
    }
    else {
const hashedPassword = await bcrypt.hash(password, 10);
existingUserByemail.password=hashedPassword;
existingUserByemail.verifycode=verifycode;
existingUserByemail.verifycodeexpire=new Date(Date.now()+3600000);
// existingUserByemail.isVerified=false;
await existingUserByemail.save();
}
}
else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const expirydate=new Date();
    expirydate.setHours(expirydate.getHours()+1);
    

   const newuser= new UserModel({
        username,
        email,
        password: hashedPassword,
        verifycode:verifycode,
        verifycodeexpire:expirydate,
        isVerified:false,
        isAcceptingMessages:true,
        messages:[]
    })
    await newuser.save();
}

//send verification email
const emailresponse=await sendverificationemail(email,username,verifycode);

if(!emailresponse.success){
    return Response.json({ 
        success: false, message: emailresponse.message
        },    
        {
        status: 500,
        }
    );
}
else {
    return Response.json({ 
        success: true, message: "User registered successfully" 
        },    
        {
        status: 200,
        }
    );
}

}catch(error){
    console.log("error registering user",error);

    return Response.json({ 
        success: false, message: "Error registering user" 
        },    
        {
        status: 500,
        }
    );

    
}
}