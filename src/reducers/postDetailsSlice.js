import { createSlice } from "@reduxjs/toolkit";
import { fetchPostById, fetchPostComments } from "../APIs/postsApis";

const initialState = {
  post: null,
  loading: false,
  error: null,
  comments: [],
};

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(fetchPostComments.pending, (state) => { 
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
  },
});

export default postDetailsSlice.reducer;
