import { Post } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {loading: false as boolean, posts: [] as Post[], error: null as unknown}

export const getPosts = createAsyncThunk('posts/getPosts', async ()=>{
    const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data);

    return data.Posts;
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
    }
})


export const postsReducer = postSlice.reducer;