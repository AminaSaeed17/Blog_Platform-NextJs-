

import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("id:", id);

  const post = postsData.Posts.find(
    (post) => post._id === id
  );

  console.log("found:", post);

  if (!post) {
    return NextResponse.json(
      {
        message: "Post not found"
      },
      {
        status: 404
      }
    );
  }

  return NextResponse.json(
    {
      message: "success",
      post
    },
    {
      status: 200
    }
  );
}