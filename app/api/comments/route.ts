import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";
import { users } from "@/mocks/users";
import { Comment } from "@/types/posts";


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


  const user = users.find(
    user => user.token === token
  );


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


  const body = await req.json();


  const { content, post } = body;


  if (!content || !post) {

    return NextResponse.json(
      {
        message: "Content and post are required"
      },
      {
        status: 400
      }
    );

  }



  const postData = postsData.Posts.find(
    item => item._id === post
  );


  if (!postData) {

    return NextResponse.json(
      {
        message: "Post not found"
      },
      {
        status: 404
      }
    );

  }



  const newComment: Comment = {

    _id: `comment00${postData.comments.length + 1}`,

    content,

    commentCreator: {

      _id: user._id,

      name: user.name,

      photo: user.photo,

    },

    createdAt: new Date().toISOString(),

  };



  postData.comments.push(newComment);



  return NextResponse.json(
    {
      message: "success",
      comment: newComment,
    },
    {
      status: 201,
    }
  );

}