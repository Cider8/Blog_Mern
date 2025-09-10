import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/blogs";
//fetch all blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

//Autosave Blog
export const saveBlog = createAsyncThunk("blogs/saveBlog", async (blog) => {
  if (blog._id) {
    const res = await axios.put(`${API_URL}/${blog._id}`, blog);
    return res.data;
  } else {
    const res = await axios.post(API_URL, blog);
    return res.data;
  }
});

//Delete Blog
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveBlog.fulfilled, (state, action) => {
        const idx = state.items.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
        else state.items.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
