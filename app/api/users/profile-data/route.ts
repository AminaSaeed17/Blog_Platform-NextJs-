import { NextResponse } from "next/server";
import { users } from "@/mocks/users";


export async function GET(req: Request) {

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


  return NextResponse.json(
    {
      message: "success",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        photo: user.photo
      }
    },
    {
      status: 200
    }
  );
}