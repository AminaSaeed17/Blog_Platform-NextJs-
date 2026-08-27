'use client'

import Loading from '@/app/_loading/page';
import PostDetails from '@/app/_postDetails/page';
import { createComment, getPost } from '@/app/_redux/postSlice';
import { dispatch, State } from '@/app/_redux/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


export default function SinglePost() {


  const {postId} = useParams();


  const {loading, post} = useSelector(
    (state: State) => state.postsReducer
  );


  const [comment, setComment] = useState("");


  const dispatch = useDispatch<dispatch>();



  useEffect(() => {

    dispatch(
      getPost(`${postId}`)
    );

  }, [dispatch, postId]);



  async function handleAddComment(){


    if(!comment.trim()){

      toast.error("Write a comment first");

      return;

    }



    const result = await dispatch(
      createComment({
        content: comment,
        postId: `${postId}`
      })
    );



    if(createComment.fulfilled.match(result)){


      toast.success(
        "Comment added successfully"
      );


      setComment("");


    }else{


      toast.error(
        "Failed to add comment"
      );


    }


  }



  return (
    <>
      {
        loading 
        ? 
        <Loading/>
        :
        post && 
        <>
          <input
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            placeholder="Write a comment..."
          />

          <button onClick={handleAddComment}>
            Add Comment
          </button>


          <PostDetails
            post={post}
            isComment={true}
          />

        </>
      }
    </>
  );

}