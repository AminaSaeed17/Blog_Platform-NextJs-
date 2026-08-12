import { NextResponse } from "next/server";
import { users } from "@/mocks/users";
import { ChangePasswordRequest } from "@/types/auth";


export async function PATCH(req: Request) {

  const body: ChangePasswordRequest = await req.json();


  // get token from headers
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


  // find user by token
  const user = users.find(
    (user) => user.token === token
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


  // check old password
  if (user.password !== body.password) {

    return NextResponse.json(
      {
        message: "Incorrect old password"
      },
      {
        status: 400
      }
    );

  }


  // update password
  user.password = body.newPassword;


  return NextResponse.json(
    {
      message: "Password changed successfully"
    },
    {
      status: 200
    }
  );
}