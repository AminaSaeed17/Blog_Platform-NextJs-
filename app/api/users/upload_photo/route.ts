import { users } from "@/mocks/users";
import { NextResponse } from "next/server";



export async function PUT(req: Request) {



 const token = req.headers.get("token");

console.log("TOKEN FROM API:", token);

console.log(
  "ALL HEADERS:",
  Array.from(req.headers.entries())
);
  const userId = req.headers.get("userId");


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


  // 4 MB limit
  if (photo.size > 4 * 1024 * 1024) {

    return NextResponse.json(
      {
        message: "Maximum file size is 4MB"
      },
      {
        status: 400
      }
    );

  }


  const user = users.find(
  user => user.token === token
);


  if (!user) {

    return NextResponse.json(
      {
        message: "User not found"
      },
      {
        status: 404
      }
    );

  }


  // Mock upload
  user.photo = URL.createObjectURL(photo);


  return new Response(null, {
    status: 204
  });

}