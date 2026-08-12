import { NextResponse } from "next/server";
import { users } from "@/mocks/users";


export async function PUT(req: Request) {

  // get token
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


  // find user
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


  // get form data
  const formData = await req.formData();


  const photo = formData.get("photo") as File;


  if (!photo) {
    return NextResponse.json(
      {
        message: "Photo is required"
      },
      {
        status: 400
      }
    );
  }


  // check size (4 MB)
  const maxSize = 4 * 1024 * 1024;


  if (photo.size > maxSize) {

    return NextResponse.json(
      {
        message: "Maximum file size is 4MB"
      },
      {
        status: 400
      }
    );

  }


  // mock uploaded image URL
  user.photo = `https://mock-storage.com/${photo.name}`;


  return NextResponse.json(
    {
      message: "success",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo
      }
    },
    {
      status: 200
    }
  );
}