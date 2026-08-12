import { NextResponse } from "next/server";
import { users } from "@/mocks/users";
import { SigninRequest } from "@/types/auth";


export async function POST(req: Request) {

  const body: SigninRequest = await req.json();


  const user = users.find(
    (user) =>
      user.email === body.email &&
      user.password === body.password
  );


  if (!user) {

    return NextResponse.json(
      {
        message: "Incorrect email or password"
      },
      {
        status: 401
      }
    );

  }


  return NextResponse.json(
    {
      message: "success",

      token: "mock-token-123456789",

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