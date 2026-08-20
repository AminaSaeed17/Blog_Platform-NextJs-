'use client'
import Loading from '@/app/_loading/page';
import PostDetails from '@/app/_postDetails/page';
import { getPost } from '@/app/_redux/postSlice';
import { dispatch, State } from '@/app/_redux/store'
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'



export default function SinglePost() {

  const {postId} = useParams();
  const {loading, post} = useSelector((state: State) => state.postsReducer);
  const dispatch = useDispatch<dispatch>();
  useEffect(() => {
    dispatch(getPost(`${postId}`))
  }, [dispatch, postId])

   console.log(post, "single post");

  return <>
    {loading? <Loading/> : post && <PostDetails post={post} isComment={true}/>}
  </>
}
