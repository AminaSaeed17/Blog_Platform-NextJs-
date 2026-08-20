import { Post } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {loading: false as boolean, posts: [] as Post[],post: null as Post | null ,error: null as unknown}

export const getPosts = createAsyncThunk('posts/getPosts', async ()=>{
    const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data, 'posts');

    return data.Posts;
}) 
export const getUserPosts = createAsyncThunk('posts/getUserPosts', async (id: string)=>{
    const response = await fetch(`/api/users/${id}/posts?`, {
        method: 'GET',
        headers: {
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data, 'posts');

    return data.Posts;
}) 
export const getPost = createAsyncThunk('post/getPost', async (id : string)=>{
    const response = await fetch(`/api/posts/${id}`, {
        method: 'GET',
        headers: {
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data.post, 'post');

    return data.post;
}) 

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        } )
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        } )
        builder.addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )
        builder.addCase(getPost.pending, (state) => {
            state.loading = true;
        } )
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.post = action.payload;
        } )
        builder.addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )
        builder.addCase(getUserPosts.pending, (state) => {
            state.loading = true;
        } )
        builder.addCase(getUserPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        } )
        builder.addCase(getUserPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )
    }
})


export const postsReducer = postSlice.reducer;