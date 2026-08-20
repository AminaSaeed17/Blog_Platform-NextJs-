import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";
import { users } from "@/mocks/users";


export async function POST(req: Request) {

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


  // find logged user
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


  const body = formData.get("body") as string;

  const image = formData.get("image") as File;


  if (!body) {
    return NextResponse.json(
      {
        message: "Post body is required"
      },
      {
        status: 400
      }
    );
  }


  const newPost = {
    _id: `post00${postsData.Posts.length + 1}`,

    body,

    image: image
      ? `https://mock-storage.com/${image.name}`
      : "",


    user: {
      _id: user._id,
      name: user.name,
      photo: user.photo
    },


    createdAt: new Date().toISOString(),

    comments: []
  };


  postsData.Posts.unshift(newPost);


  return NextResponse.json(
    {
      message: "success",
      post: newPost
    },
    {
      status: 201
    }
  );
}