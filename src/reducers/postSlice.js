import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, deletePost, addPost, updatePost } from "../APIs/postsApis";

export const postSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((posts) => posts.id !== action.payload);
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      ); //5
      if (postIndex !== -1) {
        state.posts[postIndex] = action.payload;
      }
    });
  },
});

export default postSlice.reducer;
