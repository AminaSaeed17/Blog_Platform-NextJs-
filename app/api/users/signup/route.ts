import { NextResponse } from "next/server";
import { users } from "@/mocks/users";
import { SignupRequest } from "@/types/auth";


export async function POST(req: Request) {

  const body: SignupRequest = await req.json();


  // check email already exists
  const userExists = users.find(
    (user) => user.email === body.email
  );


  if (userExists) {
    return NextResponse.json(
      {
        message: "Email already exists"
      },
      {
        status: 400
      }
    );
  }


  // check password match
  if (body.password !== body.rePassword) {
    return NextResponse.json(
      {
        message: "Passwords do not match"
      },
      {
        status: 400
      }
    );
  }


  const newUser = {
    _id: `user00${users.length + 1}`,
    name: body.name,
    email: body.email,
    password: body.password,
    dateOfBirth: body.dateOfBirth,
    gender: body.gender,
    photo: "https://randomuser.me/api/portraits/lego/1.jpg",
    token: `mock-token-${Date.now()}`
  };


  users.push(newUser);


  return NextResponse.json(
    {
      message: "success",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        dateOfBirth: newUser.dateOfBirth,
        gender: newUser.gender
      }
    },
    {
      status: 201
    }
  );
}