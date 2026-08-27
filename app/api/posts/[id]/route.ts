import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";
import { users } from "@/mocks/users";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const post = postsData.Posts.find(
    (post) => post._id === id
  );


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




export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;


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



  // find logged user
  const user = users.find(
    user => user.token === token
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




  const post = postsData.Posts.find(
    post => post._id === id
  );


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



  // check post owner
  if (post.user._id !== user._id) {

    return NextResponse.json(
      {
        message: "You can't update this post"
      },
      {
        status: 403
      }
    );

  }




  const formData = await req.formData();


  const body = formData.get("body") as string;

  const image = formData.get("image") as File;



  // update body
  if(body){
    post.body = body;
  }



  // update image
  if(image && image.size > 0){

    const buffer = await image.arrayBuffer();

    const base64 = Buffer
      .from(buffer)
      .toString("base64");


    post.image = `data:${image.type};base64,${base64}`;

  }




  return new Response(null,{
    status:204
  });

}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;


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
    user => user.token === token
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



  const postIndex = postsData.Posts.findIndex(
    post => post._id === id
  );



  if(postIndex === -1){

    return NextResponse.json(
      {
        message:"Post not found"
      },
      {
        status:404
      }
    );

  }




  const post = postsData.Posts[postIndex];



  // only owner can delete
  if(post.user._id !== user._id){

    return NextResponse.json(
      {
        message:"You can't delete this post"
      },
      {
        status:403
      }
    );

  }




  // remove post
  postsData.Posts.splice(
    postIndex,
    1
  );



  return new Response(null,{
    status:204
  });

}