// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blogSlice";


const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

export default store;
