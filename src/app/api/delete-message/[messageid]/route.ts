import dbConnect from '@/lib/dbconnect';
import UserModel from '@/app/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(request: Request,{params}:{params:{messageid:string}}) {
  const messsageid=params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user :User=session?.user as User

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: 'Not authenticated' }),
      { status: 401 }
    );
  }

  try {
   const updateResult= await UserModel.updateOne(
      {_id:user._id},
      {$pull:{messages:{_id:messsageid}}}
    )

    if(updateResult.modifiedCount==0){
      return new Response(
        JSON.stringify({ success: false, message: 'Message not found' }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ success: true, message: 'Message deleted successfully' }), { status: 200 });
  }
  catch (error) {
    console.log("error in deleting message",error);
return Response.json({success:false,message:"failed to delete message"},{status:401})
  }

  
}
