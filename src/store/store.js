import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counterSlice";
import postSlice from "../reducers/postSlice";
import postDetailsSlice from "../reducers/postDetailsSlice";
export default configureStore({
  reducer: {
    counterData: counterSlice,
    postsData: postSlice,
    postDetails: postDetailsSlice,
  },
});
