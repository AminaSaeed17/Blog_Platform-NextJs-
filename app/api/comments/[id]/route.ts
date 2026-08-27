import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;


  const token = req.headers.get("token");


  if(!token){

    return NextResponse.json(
      {
        message:"Token is required"
      },
      {
        status:401
      }
    );

  }


  const { content } = await req.json();



  let updatedComment = null;


  for(const post of postsData.Posts){

    const comment = post.comments.find(
      comment => comment._id === id
    );


    if(comment){

      comment.content = content;

      updatedComment = comment;

      break;

    }

  }



  if(!updatedComment){

    return NextResponse.json(
      {
        message:"Comment not found"
      },
      {
        status:404
      }
    );

  }


  return new Response(null,{
    status:204
  });

}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id:string }> }
){

 const {id} = await params;


 const token = req.headers.get("token");


 if(!token){

  return NextResponse.json(
   {
    message:"Token is required"
   },
   {
    status:401
   }
  );

 }



 let deleted = false;



 postsData.Posts.forEach(post=>{


  const oldLength = post.comments.length;



  post.comments = post.comments.filter(
    comment => comment._id !== id
  );



  if(oldLength !== post.comments.length){

    deleted = true;

  }


 });



 if(!deleted){

  return NextResponse.json(
   {
    message:"Comment not found"
   },
   {
    status:404
   }
  );

 }



 return new Response(null,{
  status:204
 });


}