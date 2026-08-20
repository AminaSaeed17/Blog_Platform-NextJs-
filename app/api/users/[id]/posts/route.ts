import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";
import { users } from "@/mocks/users";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id: userId } = await params;


  // check token
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


  // get limit from query params
  const { searchParams } = new URL(req.url);

  const limit = Number(
    searchParams.get("limit")
  ) || 10;


  // filter user posts
  const userPosts = postsData.Posts.filter(
    (post) => post.user._id === userId
  );


  // pagination
  const posts = userPosts.slice(
    0,
    limit
  );


  return NextResponse.json(
    {
      message: "success",

      paginationInfo: {
        currentPage: 1,
        numberOfPage: Math.ceil(
          userPosts.length / limit
        ),
        limit,
        total: userPosts.length
      },

      posts
    },
    {
      status: 200
    }
  );
}