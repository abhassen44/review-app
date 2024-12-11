import {getServerSession} from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; 
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/app/model/User";
import {User} from "next-auth"


export async function POST(request: Request) {
    await dbconnect();

    const session=await getServerSession(authOptions)
    const user: User =session?.user as User

    if(!session || !session.user){
        return Response.json({success:false,message:"not authenticated"},
            {status:400}
        );
    } 

    const userId=user._id;
    const {acceptMessages} = await request.json();


    try {
       const updatedUser = await UserModel.findByIdAndUpdate(userId, {isAcceptingMessages:acceptMessages},{new : true});

       if(!updatedUser){
return Response.json({success:false,message:"failed to update user"},
    {status:401}
);
       }
       else {
return Response.json({success:true,message:"updated user successfully",
    updatedUser},
    {status:200}
);
       }

        
    } catch (error) {
       console.log("failed to update user status to accept messages",error); 
       return Response.json({success:false,message:"failed to update user"},
        {status:500}
       );
    }
}
export async function GET(request: Request) {
    await dbconnect();

    const session=await getServerSession(authOptions)
    const user: User =session?.user as User

    if(!session || !session.user){
        return Response.json({success:false,message:"not authenticated"},
            {status:400}
        );
    } 

    const userId=user._id;

  try {
     const founduser= await UserModel.findById(userId);
  
     if(!founduser){  
         return Response.json({success:false,message:"user not found"},
             {status:400}
         );
     }
     else {
         return Response.json({success:true,message:"user found",
             isAcceptingMessages:founduser.isAcceptingMessages},
             {status:200}
         );
     } 
  } catch (error) {
    console.log("failed to update user status to accept messages",error); 
    return Response.json({success:false,message:"error in getting message accepting status"},
     {status:500}
    );
  }

}