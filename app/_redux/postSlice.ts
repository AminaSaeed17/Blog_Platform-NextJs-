import { Post } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false as boolean,
  posts: [] as Post[],
  post: null as Post | null,
  error: null as unknown,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await fetch("/api/posts", {
    method: "GET",
    headers: {
      token: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data, "posts");

  return data.posts;
});
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (id: string) => {
    const response = await fetch(`/api/users/${id}/posts?`, {
      method: "GET",
      headers: {
        token: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data, "posts");

    return data.posts ?? [];
  },
);
export const getPost = createAsyncThunk("post/getPost", async (id: string) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "GET",
    headers: {
      token: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data.post, "post");

  return data.post;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",

  async (
    {
      id,
      body,
      image,
    }: {
      id: string;
      body: string;
      image?: File;
    },

    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("body", body);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",

        headers: {
          token: token || "",
        },

        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();

        return rejectWithValue(data.message);
      }

      return {
        id,
        body,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to update post");
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",

        headers: {
          token: token || "",
        },
      });

      if (!response.ok) {
        const data = await response.json();

        return rejectWithValue(data.message);
      }

      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to delete post");
    }
  },
);

export const createComment = createAsyncThunk(
  "posts/createComment",

  async (
    {
      content,
      postId,
    }: {
      content: string;
      postId: string;
    },

    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/comments", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },

        body: JSON.stringify({
          content,
          post: postId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return {
        postId,
        comment: data.comment,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to create comment");
    }
  },
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",

  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",

        headers: {
          token: token || "",
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed");
      }

      return id;
    } catch (error) {
      console.log(error);

      return rejectWithValue("Failed");
    }
  },
);

export const updateComment = createAsyncThunk(
  "posts/updateComment",

  async (
    {
      id,
      content,
    }: {
      id: string;
      content: string;
    },

    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },

        body: JSON.stringify({
          content,
        }),
      });

      if (!response.ok) {
        return rejectWithValue("Failed");
      }

      return {
        id,
        content,
      };
    } catch (error) {
      console.log(error);

      return rejectWithValue("Failed");
    }
  },
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(
      updatePost.fulfilled,

      (state, action) => {
        const post = state.posts.find((post) => post._id === action.payload.id);

        if (post) {
          post.body = action.payload.body;
        }
      },
    );
    builder.addCase(
      deletePost.fulfilled,

      (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      },
    );
    builder.addCase(
      createComment.fulfilled,

      (state, action) => {
        // لو في صفحة single post

        if (state.post && state.post._id === action.payload.postId) {
          state.post.comments.push(action.payload.comment);
        }

        // لو في صفحة كل البوستات

        const post = state.posts.find(
          (post) => post._id === action.payload.postId,
        );

        if (post) {
          post.comments.push(action.payload.comment);
        }
      },
    );
  },
});

export const postsReducer = postSlice.reducer;
