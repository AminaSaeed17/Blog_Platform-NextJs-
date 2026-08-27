// app/api/users/me/route.ts

import { users } from "@/mocks/users";
import { NextResponse } from "next/server";


export async function GET(req:Request){

 const userId = req.headers.get("userId");


 const user = users.find(
   user => user._id === userId
 );


 if(!user){
   return NextResponse.json(
    {message:"User not found"},
    {status:404}
   )
 }


 return NextResponse.json({
   user
 });

}