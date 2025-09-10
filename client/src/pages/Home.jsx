import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../features/blogSlice";
import BlogList from "../components/BlogList";
import BlogEditor from "../components/BlogEditor";
import BlogView from "../components/BlogView";
//import Navbar from "../components/Navbar";


export default function Home() {
  const dispatch = useDispatch();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
     
    <div className="p-6 max-w-7xl mx-auto flex gap-6 h-screen">
      
      <BlogList
        onSelect={(blog) => {
          setSelectedBlog(blog);
          setIsEditing(false);
        }}
        onEdit={(blog) => {
          setSelectedBlog(blog);
          setIsEditing(true);
        }}
        selectedBlog={selectedBlog}
      />
      
      {isEditing ? (
        <BlogEditor blog={selectedBlog} />
      ) : (
        <BlogView blog={selectedBlog} />
      )}
      
    </div>
  );
}

