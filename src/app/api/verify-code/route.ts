import dbconnect from "@/lib/dbconnect";
import UserModel from "@/app/model/User";
// import { verify } from "crypto";


export async function POST(request: Request) {
    await dbconnect();

    try {
        const { username,code } = await request.json();

      const decoded =  decodeURIComponent(username);

      const user=await UserModel.findOne({username:decoded})

      if(!user){

        return Response.json({success:false,message:"User not found"},
            {status:400}
        );

      }
     const iscodevalid=user.verifycode===code;
     const iscodeexpired=new Date(user.verifycodeexpire) > new Date();

     if(iscodevalid && iscodeexpired){
        user.isVerified=true;
        await user.save();
        return Response.json({success:true,message:"User verified successfully"},
            {status:200}
        );

     }
     else if(!iscodevalid){
        return Response.json({success:false,message:"Code expired"},
            {status:400}
        );
     }
     else{
        return Response.json({success:false,message:"invalid code"},
            {status:400}
        );
     }



    } catch (error) {
        console.log("error verifying code",error);
        return Response.json({success:false,message:"Error verifying code"},
            {status:400}
        );
    }


}