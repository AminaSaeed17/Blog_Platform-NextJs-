import { users } from "@/mocks/users";
import { NextResponse } from "next/server";


export async function PATCH(req: Request) {

  const token = req.headers.get("token");


  if (!token) {
    return NextResponse.json(
      {
        message: "Token is required"
      },
      {
        status: 401
      }
    );
  }


  const user = users.find(
    user => user.token === token
  );


  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid token"
      },
      {
        status: 401
      }
    );
  }


  const body = await req.json();


  const {
    password,
    newPassword
  } = body;



  if (!password || !newPassword) {
    return NextResponse.json(
      {
        message:"Password fields are required"
      },
      {
        status:400
      }
    );
  }



  // check old password

  if (user.password !== password) {

    return NextResponse.json(
      {
        message:"Current password is incorrect"
      },
      {
        status:400
      }
    );

  }



  // update password

  user.password = newPassword;



  return new Response(null,{
    status:204
  });


}