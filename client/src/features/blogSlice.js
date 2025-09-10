
// export default blogSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Use environment variable for API base URL
// Local:  VITE_API_URL=http://localhost:5000/blogs
// Render: VITE_API_URL=https://blog-mern-b3s2.onrender.com/blogs
const API_URL = import.meta.env.VITE_API_URL;

// Fetch all blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Save (create or update) a blog
export const saveBlog = createAsyncThunk("blogs/saveBlog", async (blog) => {
  if (blog._id) {
    const res = await axios.put(`${API_URL}/${blog._id}`, blog);
    return res.data;
  } else {
    const res = await axios.post(API_URL, blog);
    return res.data;
  }
});

// Delete a blog
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

