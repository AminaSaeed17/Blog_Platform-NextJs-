import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";
import { users } from "@/mocks/users";

export async function POST(req: Request) {
  const token = req.headers.get("token");

  if (!token) {
    return NextResponse.json(
      {
        message: "Token is required",
      },
      {
        status: 401,
      }
    );
  }

  const user = users.find((user) => user.token === token);

  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }

  const formData = await req.formData();

  const body = formData.get("body") as string;
  const image = formData.get("image") as File;

  if (!body) {
    return NextResponse.json(
      {
        message: "Post body is required",
      },
      {
        status: 400,
      }
    );
  }

  let imageUrl = "";

  if (image && image.size > 0) {
    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    imageUrl = `data:${image.type};base64,${base64}`;
  }

  const newPost = {
    _id: `post00${postsData.Posts.length + 1}`,

    body,

    image: imageUrl,

    user: {
      _id: user._id,
      name: user.name,
      photo: user.photo,
    },

    createdAt: new Date().toISOString(),

    comments: [],
  };

  postsData.Posts.unshift(newPost);

  return NextResponse.json(
    {
      message: "success",
      post: newPost,
    },
    {
      status: 201,
    }
  );
}