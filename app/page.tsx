'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./_loading/page";
import { useDispatch, useSelector } from "react-redux";
import { dispatch, State } from "./_redux/store";
import { getPosts } from "./_redux/postSlice";
import PostDetails from "./_postDetails/page";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const {loading, posts} = useSelector((state: State) => state.postsReducer);
  const dispatch = useDispatch<dispatch>();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

     async function fetchPosts() {
    await dispatch(getPosts());
    setIsLoading(false);
  }

  fetchPosts();

  }, [router, dispatch]);

  return <>
    {isLoading || loading? <Loading/> :  posts.map((post) => <PostDetails key={post._id} post={post}/>) } 
  </>
}
