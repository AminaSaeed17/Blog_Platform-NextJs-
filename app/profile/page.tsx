
'use client'
import { useDispatch, useSelector } from 'react-redux'
import { dispatch, State } from '../_redux/store'
import { useEffect } from 'react';
import { getUserPosts } from '../_redux/postSlice';
import { jwtDecode } from 'jwt-decode';
import Loading from '../_loading/page';
import PostDetails from '../_postDetails/page';

export default function Profile() {


  const {loading, posts} = useSelector((state: State) => state.postsReducer);
  const dispatch = useDispatch<dispatch>();
  
  useEffect(() =>{
    const token = localStorage.getItem('token')

    if (!token) {
      console.log("Token not found")
      return
    }
    const x = jwtDecode<{ user: string }>(`${localStorage.getItem('token')}`)
    dispatch(getUserPosts(x.user));
  } ,[dispatch])

  return <>
    {loading? <Loading/> : posts.map((post) => <PostDetails key={post._id} post={post}/>)}
  </>
}
